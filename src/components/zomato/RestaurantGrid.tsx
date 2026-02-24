import { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { restaurants, type Restaurant } from "@/data/zomatoData";
import RestaurantCard from "./RestaurantCard";

interface Props {
  searchQuery: string;
  activeCategory: string;
  onRestaurantClick: (r: Restaurant) => void;
  vegMode?: boolean;
}

type SortKey = "rating" | "deliveryTime" | "priceForTwo";

const RestaurantGrid = ({ searchQuery, activeCategory, onRestaurantClick, vegMode = false }: Props) => {
  const [sortBy, setSortBy] = useState<SortKey>("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const filtered = restaurants
    .filter((r) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || r.name.toLowerCase().includes(q) || r.cuisines.some((c) => c.toLowerCase().includes(q));
      const matchesCat = !activeCategory || r.cuisines.some((c) => c.toLowerCase().includes(activeCategory.toLowerCase()));
      const matchesVeg = !(vegOnly || vegMode) || r.veg;
      return matchesSearch && matchesCat && matchesVeg;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "priceForTwo") return a.priceForTwo - b.priceForTwo;
      return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
    });

  const visible = filtered.slice(0, visibleCount);

  return (
    <section className="py-8" aria-label="Restaurants near you">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Delivery Restaurants in Shivamogga
            {activeCategory && <span className="text-primary ml-2">• {activeCategory}</span>}
          </h2>
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-secondary transition-colors">
            <SlidersHorizontal className="h-4 w-4" /> Filters <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Filter Bar */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 mb-6 p-4 bg-secondary rounded-xl animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Sort by:</span>
              {([ ["rating", "Rating"], ["deliveryTime", "Delivery Time"], ["priceForTwo", "Cost"] ] as [SortKey, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    sortBy === key ? "bg-primary text-primary-foreground" : "bg-background text-foreground border border-border hover:border-primary/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={vegOnly}
                  onChange={(e) => setVegOnly(e.target.checked)}
                  className="w-4 h-4 rounded accent-zomato-green"
                />
                Pure Veg
              </label>
            </div>
          </div>
        )}

        {/* Grid */}
        {visible.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {visible.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} onClick={() => onRestaurantClick(r)} />
              ))}
            </div>
            {visibleCount < filtered.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount((p) => p + 8)}
                  className="px-8 py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No restaurants found matching your search.</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different keyword or category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantGrid;
