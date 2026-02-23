import { useState, useEffect, useRef } from "react";
import { Zap, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { dishes } from "@/data/zomatoData";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Deal {
  id: string;
  dishId: string;
  label: string;
  discountPercent: number;
  endsInSeconds: number;
}

const deals: Deal[] = [
  { id: "fl1", dishId: "d1", label: "Biryani Bonanza", discountPercent: 25, endsInSeconds: 7200 },
  { id: "fl2", dishId: "d7", label: "Butter Chicken Feast", discountPercent: 30, endsInSeconds: 3600 },
  { id: "fl3", dishId: "d14", label: "Royal Mutton Special", discountPercent: 20, endsInSeconds: 5400 },
  { id: "fl4", dishId: "d2", label: "Pizza Mania", discountPercent: 40, endsInSeconds: 1800 },
  { id: "fl5", dishId: "d15", label: "Dessert Hour", discountPercent: 35, endsInSeconds: 4500 },
  { id: "fl6", dishId: "d10", label: "Momos Madness", discountPercent: 15, endsInSeconds: 6000 },
];

const formatTime = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m ${sec.toString().padStart(2, "0")}s`;
};

const FlashDeals = () => {
  const [timers, setTimers] = useState<Record<string, number>>(
    Object.fromEntries(deals.map((d) => [d.id, d.endsInSeconds]))
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const next = { ...prev };
        for (const k in next) if (next[k] > 0) next[k]--;
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Rotate lightning deal every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % deals.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  const activeDeal = deals[activeIndex];
  const activeDish = dishes.find((d) => d.id === activeDeal.dishId);

  const handleGrab = (deal: Deal) => {
    const dish = dishes.find((d) => d.id === deal.dishId);
    if (dish) {
      addItem(dish);
      toast({ title: "🎉 Deal grabbed!", description: `${dish.name} added with ${deal.discountPercent}% off` });
    }
  };

  return (
    <section className="py-8" aria-label="Flash deals and daily offers">
      <div className="container mx-auto">
        {/* Lightning Deal Banner */}
        <div className="mb-6 rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-zomato-orange p-5 md:p-6 text-primary-foreground relative">
          <div className="absolute top-2 right-3 flex items-center gap-1 text-xs font-medium opacity-80">
            <span>Rotates every 30s</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-6 w-6 fill-current" />
            <h2 className="text-xl md:text-2xl font-bold">Lightning Deal</h2>
          </div>
          {activeDish && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img src={activeDish.image} alt={activeDish.name} className="w-20 h-20 rounded-xl object-cover border-2 border-primary-foreground/30" />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{activeDeal.label}</h3>
                <p className="text-sm opacity-90">{activeDish.name} from {activeDish.restaurant}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="line-through opacity-60 text-sm">₹{activeDish.price}</span>
                  <span className="text-xl font-bold">₹{Math.round(activeDish.price * (1 - activeDeal.discountPercent / 100))}</span>
                  <span className="bg-primary-foreground/20 px-2 py-0.5 rounded-full text-xs font-bold">{activeDeal.discountPercent}% OFF</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono font-semibold">{formatTime(timers[activeDeal.id] || 0)}</span>
                </div>
                <button onClick={() => handleGrab(activeDeal)} className="px-5 py-2 rounded-xl bg-primary-foreground text-primary font-bold text-sm hover:bg-primary-foreground/90 transition-colors">
                  Grab Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* All Flash Deals */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-zomato-gold fill-current" /> Daily Deals & Flash Sales
          </h3>
          <div className="flex gap-1">
            <button onClick={() => scroll("left")} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary" aria-label="Scroll left"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={() => scroll("right")} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary" aria-label="Scroll right"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {deals.map((deal) => {
            const dish = dishes.find((d) => d.id === deal.dishId);
            if (!dish) return null;
            const expired = (timers[deal.id] || 0) <= 0;
            return (
              <div key={deal.id} className={`shrink-0 w-72 rounded-2xl border border-border bg-card overflow-hidden zomato-shadow hover:zomato-shadow-hover transition-all ${expired ? "opacity-50" : ""}`}>
                <div className="relative h-32">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" loading="lazy" />
                  <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-lg">{deal.discountPercent}% OFF</span>
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-foreground text-sm">{deal.label}</h4>
                  <p className="text-xs text-muted-foreground">{dish.name} • {dish.restaurant}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
                      <Clock className="h-3.5 w-3.5" />
                      {expired ? "Expired" : formatTime(timers[deal.id])}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="line-through text-xs text-muted-foreground">₹{dish.price}</span>
                      <span className="font-bold text-foreground text-sm">₹{Math.round(dish.price * (1 - deal.discountPercent / 100))}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => !expired && handleGrab(deal)}
                    disabled={expired}
                    className="w-full mt-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {expired ? "Sold Out" : "Grab Deal"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlashDeals;
