import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Drumstick, Vegan, Flame, ShoppingCart } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { menuItems, categories, type DietType, type MenuItem } from "@/data/menuData";
import { useToast } from "@/hooks/use-toast";

const dietIcons: Record<DietType, { icon: typeof Leaf; color: string; label: string }> = {
  veg: { icon: Leaf, color: "text-olive", label: "Veg" },
  "non-veg": { icon: Drumstick, color: "text-primary", label: "Non-Veg" },
  vegan: { icon: Vegan, color: "text-olive", label: "Vegan" },
};

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { toast } = useToast();
  const diet = dietIcons[item.diet];
  const DietIcon = diet.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="glass-card overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {item.popular && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
            Popular
          </span>
        )}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full bg-background/90 text-xs font-medium ${diet.color}`}>
            <DietIcon className="h-3 w-3" /> {diet.label}
          </span>
          {item.spice === "spicy" && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-background/90 text-xs font-medium text-destructive">
              <Flame className="h-3 w-3" /> Spicy
            </span>
          )}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-semibold text-foreground leading-tight">{item.name}</h3>
          <span className="text-primary font-bold text-lg shrink-0">${item.price}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>
        <button
          onClick={() => toast({ title: "Added to cart!", description: `${item.name} has been added to your cart.` })}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [dietFilter, setDietFilter] = useState<string>("all");

  const filtered = menuItems.filter((item) => {
    const catMatch = activeCategory === "all" || item.category === activeCategory;
    const dietMatch = dietFilter === "all" || item.diet === dietFilter;
    return catMatch && dietMatch;
  });

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading subtitle="Our Menu" title="Crafted With Passion" description="Every dish is a celebration of flavors, textures, and culinary tradition." />

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Diet Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[{ key: "all", label: "All" }, { key: "veg", label: "🥬 Veg" }, { key: "non-veg", label: "🍖 Non-Veg" }, { key: "vegan", label: "🌱 Vegan" }].map((d) => (
              <button
                key={d.key}
                onClick={() => setDietFilter(d.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  dietFilter === d.key
                    ? "border-accent bg-accent/10 text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-accent/50"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No items match your filters.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu;
