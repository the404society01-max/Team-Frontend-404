import { useRef, useEffect, useState } from "react";
import { Sparkles, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { dishes } from "@/data/zomatoData";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const AIRecommendations = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const { toast } = useToast();
  const [userName, setUserName] = useState("Foodie");

  useEffect(() => {
    const stored = localStorage.getItem("food-user-name");
    if (stored) setUserName(stored);
    
    // Track viewed dishes
    const past = JSON.parse(localStorage.getItem("food-past-orders") || "[]");
    if (past.length === 0) {
      localStorage.setItem("food-past-orders", JSON.stringify(["d1", "d7", "d14"]));
    }
  }, []);

  const recommended = dishes.slice(0, 6);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" });
  };

  const handleAdd = (dish: typeof dishes[0]) => {
    addItem(dish);
    toast({ title: `${dish.name} added!`, description: `From ${dish.restaurant}` });
  };

  return (
    <section className="py-8" aria-label="AI recommendations">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Picked for You</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          {userName}, based on your orders — try these next! 🍽️
        </p>

        <div className="relative group">
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-background border border-border rounded-full flex items-center justify-center zomato-shadow opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Scroll left">
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div ref={scrollRef} className="flex gap-4 overflow-x-auto hide-scrollbar px-1 py-2">
            {recommended.map((dish) => (
              <div key={dish.id} className="shrink-0 w-56 rounded-xl border border-border bg-card overflow-hidden hover:zomato-shadow-hover transition-shadow">
                <div className="relative h-36">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" loading="lazy" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-bold flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> AI Pick
                  </span>
                  {dish.veg && (
                    <span className="absolute top-2 right-2 w-5 h-5 border-2 border-green-600 rounded-sm flex items-center justify-center bg-background">
                      <span className="w-2 h-2 rounded-full bg-green-600" />
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-foreground text-sm truncate">{dish.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{dish.restaurant}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-foreground text-sm">₹{dish.price}</span>
                    <button onClick={() => handleAdd(dish)} className="w-7 h-7 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors" aria-label={`Add ${dish.name}`}>
                      <Plus className="h-4 w-4 text-primary-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-background border border-border rounded-full flex items-center justify-center zomato-shadow opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Scroll right">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AIRecommendations;
