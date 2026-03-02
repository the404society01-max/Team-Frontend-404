import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "@/data/zomatoData";

interface Props {
  onCategoryClick: (name: string) => void;
  activeCategory: string;
}

const CategoryChips = ({ onCategoryClick, activeCategory }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8" aria-label="Food categories">
      <div className="container mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5">
          Eat what makes you happy
        </h2>
        <div className="relative group">
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-background border border-border rounded-full flex items-center justify-center zomato-shadow opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Scroll left">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar px-2 py-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => onCategoryClick(cat.name === activeCategory ? "" : cat.name)}
                className={`flex flex-col items-center gap-2 shrink-0 group/item transition-transform hover:scale-105 ${
                  activeCategory === cat.name ? "scale-105" : ""
                }`}
              >
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 transition-colors ${
                  activeCategory === cat.name ? "border-primary" : "border-transparent"
                }`}>
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <span className={`text-xs md:text-sm font-medium transition-colors ${
                  activeCategory === cat.name ? "text-primary" : "text-foreground"
                }`}>
                  {cat.name}
                </span>
              </button>
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

export default CategoryChips;
