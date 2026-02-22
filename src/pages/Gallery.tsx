import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import heroImg from "@/assets/hero-food.jpg";
import foodStarters from "@/assets/food-starters.jpg";
import foodMain from "@/assets/food-main.jpg";
import foodDessert from "@/assets/food-dessert.jpg";
import foodBeverages from "@/assets/food-beverages.jpg";
import interiorImg from "@/assets/restaurant-interior.jpg";
import kitchenImg from "@/assets/kitchen.jpg";
import chefImg from "@/assets/chef.jpg";

const images = [
  { src: heroImg, alt: "Fine dining plating", category: "food" },
  { src: interiorImg, alt: "Restaurant ambiance", category: "ambiance" },
  { src: foodStarters, alt: "Appetizer spread", category: "food" },
  { src: kitchenImg, alt: "Kitchen action", category: "kitchen" },
  { src: foodMain, alt: "Main course", category: "food" },
  { src: chefImg, alt: "Chef Marco", category: "team" },
  { src: foodDessert, alt: "Dessert plating", category: "food" },
  { src: foodBeverages, alt: "Cocktail bar", category: "ambiance" },
];

const filterTabs = ["all", "food", "ambiance", "kitchen", "team"];

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = filter === "all" ? images : images.filter((img) => img.category === filter);

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading subtitle="Gallery" title="A Visual Feast" description="Explore our restaurant, food, and the people behind the magic." />

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                  filter === tab ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src + img.category}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`cursor-pointer rounded-xl overflow-hidden ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
                  onClick={() => setLightbox(img.src)}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 min-h-[200px]" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-background/80 hover:text-background" onClick={() => setLightbox(null)}>
              <X className="h-8 w-8" />
            </button>
            <img src={lightbox} alt="" className="max-w-full max-h-[85vh] rounded-xl object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
