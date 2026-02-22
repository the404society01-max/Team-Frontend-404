import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Plus, Leaf } from "lucide-react";
import { dishes, type Dish } from "@/data/zomatoData";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const TrendingSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const { toast } = useToast();

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  const handleAdd = (dish: Dish) => {
    addItem(dish);
    toast({ title: "Added to cart!", description: `${dish.name} from ${dish.restaurant}` });
  };

  return (
    <section className="py-8 bg-zomato-light" aria-label="Trending dishes">
      <div className="container mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5">
          Trending Now 🔥
        </h2>
        <div className="relative group">
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-background border border-border rounded-full flex items-center justify-center zomato-shadow opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Scroll left">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto hide-scrollbar px-2 py-2">
            {dishes.map((dish) => (
              <div key={dish.id} className="shrink-0 w-56 bg-card rounded-2xl border border-border overflow-hidden zomato-shadow hover:zomato-shadow-hover transition-all group/card">
                <div className="relative h-36 overflow-hidden">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" loading="lazy" />
                  {dish.veg && (
                    <span className="absolute top-2 left-2 w-5 h-5 bg-background rounded flex items-center justify-center">
                      <Leaf className="h-3 w-3 text-zomato-green" />
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-foreground text-sm truncate">{dish.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{dish.restaurant}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground text-sm">₹{dish.price}</span>
                      <span className="flex items-center gap-0.5 text-xs text-zomato-green font-medium">
                        <Star className="h-3 w-3 fill-current" /> {dish.rating}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAdd(dish)}
                      className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                      aria-label={`Add ${dish.name} to cart`}
                    >
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

export default TrendingSection;
