import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import pkgKashmir from "@/assets/pkg-kashmir.jpg";

const tabs = ["All Packages", "Honeymoon", "Family Trips", "Adventure", "Student Tours"];

const packages = [
  {
    img: pkgKashmir,
    discount: "25% OFF",
    badge: "domestic",
    rating: 4.8,
    name: "Kashmir Paradise",
    location: "Srinagar, India",
    duration: "5 Nights / 6 Days",
    tags: ["Dal Lake Shikara Ride", "Gulmarg Gondola", "Mughal Gardens"],
    price: "₹28,999",
    oldPrice: "₹38,999",
    category: "Adventure",
  },
  {
    img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
    discount: "19% OFF",
    badge: "international",
    rating: 4.9,
    name: "Maldives Bliss",
    location: "Malé, Maldives",
    duration: "4 Nights / 5 Days",
    tags: ["Overwater Villa", "Snorkeling", "Sunset Cruise"],
    price: "₹72,999",
    oldPrice: "₹89,999",
    category: "Honeymoon",
  },
  {
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
    discount: "18% OFF",
    badge: "domestic",
    rating: 4.7,
    name: "Kerala Backwaters",
    location: "Alleppey, India",
    duration: "6 Nights / 7 Days",
    tags: ["Houseboat Stay", "Tea Plantations", "Kathakali Show"],
    price: "₹34,999",
    oldPrice: "₹42,999",
    category: "Family Trips",
  },
  {
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    discount: "17% OFF",
    badge: "international",
    rating: 4.6,
    name: "Dubai Family Fun",
    location: "Dubai, UAE",
    duration: "5 Nights / 6 Days",
    tags: ["Burj Khalifa", "Desert Safari", "Aquaventure Waterpark"],
    price: "₹54,999",
    oldPrice: "₹65,999",
    category: "Family Trips",
  },
  {
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
    discount: "24% OFF",
    badge: "domestic",
    rating: 4.8,
    name: "Ladakh Expedition",
    location: "Leh, India",
    duration: "7 Nights / 8 Days",
    tags: ["Pangong Lake", "Khardung La Pass", "River Rafting"],
    price: "₹24,999",
    oldPrice: "₹32,999",
    category: "Adventure",
  },
  {
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
    discount: "20% OFF",
    badge: "international",
    rating: 4.7,
    name: "Nepal Trekking",
    location: "Kathmandu, Nepal",
    duration: "8 Nights / 9 Days",
    tags: ["Annapurna Base Camp", "Pokhara", "Bungee Jumping"],
    price: "₹39,999",
    oldPrice: "₹49,999",
    category: "Adventure",
  },
  {
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
    discount: "36% OFF",
    badge: "domestic",
    rating: 4.5,
    name: "Goa Beach Break",
    location: "Goa, India",
    duration: "3 Nights / 4 Days",
    tags: ["Beach Hopping", "Water Sports", "Night Markets"],
    price: "₹8,999",
    oldPrice: "₹13,999",
    category: "Student Tours",
  },
  {
    img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80",
    discount: "28% OFF",
    badge: "international",
    rating: 4.6,
    name: "Thailand Explorer",
    location: "Bangkok & Phuket",
    duration: "5 Nights / 6 Days",
    tags: ["Grand Palace", "Phi Phi Island", "Street Food Tour"],
    price: "₹22,999",
    oldPrice: "₹31,999",
    category: "Student Tours",
  },
];

const PackagesSection = () => {
  const [activeTab, setActiveTab] = useState("All Packages");

  const filtered = activeTab === "All Packages"
    ? packages
    : packages.filter((p) => p.category === activeTab);

  return (
    <section id="packages" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Curated Packages</p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground">Journeys tailored for you</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs tracking-[0.1em] uppercase rounded-full border transition-all duration-300 ${
                activeTab === tab
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-card border-2 border-border rounded-lg overflow-hidden group hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={pkg.img}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] tracking-wider uppercase px-2 py-1 rounded">
                  {pkg.discount}
                </span>
                <span className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm text-foreground text-[10px] tracking-wider uppercase px-2 py-1 rounded">
                  {pkg.badge}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <Star size={12} className="fill-gold text-gold" />
                  <span className="text-xs text-foreground">{pkg.rating}</span>
                </div>
                <h3 className="font-serif text-lg text-foreground mb-1">{pkg.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{pkg.location}</p>
                <p className="text-xs text-muted-foreground mb-3">{pkg.duration}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {pkg.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-secondary text-secondary-foreground rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-lg font-semibold text-foreground">{pkg.price}</span>
                  <span className="text-xs line-through text-muted-foreground">{pkg.oldPrice}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mb-3">per person</p>

                <button className="w-full py-2.5 text-xs tracking-[0.15em] uppercase border border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-300 rounded">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
