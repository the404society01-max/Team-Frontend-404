import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { X, Star, MapPin } from "lucide-react";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface Package {
  img: string;
  name: string;
  location: string;
  duration: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating: number;
  tags: string[];
}

const countryPackages: Record<string, Package[]> = {
  India: [
    {
      img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
      name: "Kashmir Paradise",
      location: "Srinagar, India",
      duration: "5 Nights / 6 Days",
      price: "₹28,999",
      oldPrice: "₹38,999",
      discount: "25% OFF",
      rating: 4.8,
      tags: ["Dal Lake Shikara Ride", "Gulmarg Gondola"],
    },
    {
      img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
      name: "Kerala Backwaters",
      location: "Alleppey, India",
      duration: "6 Nights / 7 Days",
      price: "₹34,999",
      oldPrice: "₹42,999",
      discount: "18% OFF",
      rating: 4.7,
      tags: ["Houseboat Stay", "Tea Plantations"],
    },
    {
      img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
      name: "Ladakh Expedition",
      location: "Leh, India",
      duration: "7 Nights / 8 Days",
      price: "₹24,999",
      oldPrice: "₹32,999",
      discount: "24% OFF",
      rating: 4.8,
      tags: ["Pangong Lake", "Khardung La Pass"],
    },
    {
      img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
      name: "Goa Beach Break",
      location: "Goa, India",
      duration: "3 Nights / 4 Days",
      price: "₹8,999",
      oldPrice: "₹13,999",
      discount: "36% OFF",
      rating: 4.5,
      tags: ["Beach Hopping", "Water Sports"],
    },
  ],
  Maldives: [
    {
      img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
      name: "Maldives Bliss",
      location: "Malé, Maldives",
      duration: "4 Nights / 5 Days",
      price: "₹72,999",
      oldPrice: "₹89,999",
      discount: "19% OFF",
      rating: 4.9,
      tags: ["Overwater Villa", "Snorkeling"],
    },
  ],
  "United Arab Emirates": [
    {
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
      name: "Dubai Family Fun",
      location: "Dubai, UAE",
      duration: "5 Nights / 6 Days",
      price: "₹54,999",
      oldPrice: "₹65,999",
      discount: "17% OFF",
      rating: 4.6,
      tags: ["Burj Khalifa", "Desert Safari"],
    },
  ],
  Nepal: [
    {
      img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
      name: "Nepal Trekking",
      location: "Kathmandu, Nepal",
      duration: "8 Nights / 9 Days",
      price: "₹39,999",
      oldPrice: "₹49,999",
      discount: "20% OFF",
      rating: 4.7,
      tags: ["Annapurna Base Camp", "Pokhara"],
    },
  ],
  Thailand: [
    {
      img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80",
      name: "Thailand Explorer",
      location: "Bangkok & Phuket",
      duration: "5 Nights / 6 Days",
      price: "₹22,999",
      oldPrice: "₹31,999",
      discount: "28% OFF",
      rating: 4.6,
      tags: ["Grand Palace", "Phi Phi Island"],
    },
  ],
  Indonesia: [
    {
      img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
      name: "Bali Retreat",
      location: "Ubud, Bali",
      duration: "6 Nights / 7 Days",
      price: "₹45,999",
      oldPrice: "₹58,999",
      discount: "22% OFF",
      rating: 4.8,
      tags: ["Rice Terraces", "Temple Tours"],
    },
  ],
  Japan: [
    {
      img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
      name: "Kyoto Cultural Immersion",
      location: "Kyoto, Japan",
      duration: "7 Nights / 8 Days",
      price: "₹72,500",
      oldPrice: "₹90,000",
      discount: "20% OFF",
      rating: 4.9,
      tags: ["Temples", "Cherry Blossoms"],
    },
  ],
  Norway: [
    {
      img: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&q=80",
      name: "Fjords Expedition",
      location: "Bergen, Norway",
      duration: "8 Nights / 9 Days",
      price: "₹89,999",
      oldPrice: "₹1,10,999",
      discount: "19% OFF",
      rating: 4.8,
      tags: ["Northern Lights", "Fjord Cruise"],
    },
  ],
  Greece: [
    {
      img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
      name: "Santorini Escape",
      location: "Santorini, Greece",
      duration: "5 Nights / 6 Days",
      price: "₹68,999",
      oldPrice: "₹85,999",
      discount: "20% OFF",
      rating: 4.9,
      tags: ["Sunset Views", "Island Hopping"],
    },
  ],
  Morocco: [
    {
      img: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&q=80",
      name: "Marrakech Magic",
      location: "Marrakech, Morocco",
      duration: "5 Nights / 6 Days",
      price: "₹42,999",
      oldPrice: "₹55,999",
      discount: "23% OFF",
      rating: 4.6,
      tags: ["Medina Tour", "Desert Camp"],
    },
  ],
  Argentina: [
    {
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
      name: "Patagonia Adventure",
      location: "El Calafate, Argentina",
      duration: "9 Nights / 10 Days",
      price: "₹1,15,999",
      oldPrice: "₹1,45,999",
      discount: "21% OFF",
      rating: 4.9,
      tags: ["Perito Moreno", "Torres del Paine"],
    },
  ],
};

const highlightedCountries = Object.keys(countryPackages);

const MapChart = memo(({ onCountryClick }: { onCountryClick: (name: string) => void }) => (
  <ComposableMap
    projectionConfig={{ scale: 150, center: [30, 10] }}
    className="w-full h-full"
    style={{ width: "100%", height: "100%" }}
  >
    <ZoomableGroup>
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const name = geo.properties.name;
            const isHighlighted = highlightedCountries.includes(name);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => isHighlighted && onCountryClick(name)}
                style={{
                  default: {
                    fill: isHighlighted
                      ? "hsl(var(--primary))"
                      : "hsl(var(--secondary))",
                    stroke: "hsl(var(--border))",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                  hover: {
                    fill: isHighlighted
                      ? "hsl(var(--accent))"
                      : "hsl(var(--secondary))",
                    stroke: "hsl(var(--border))",
                    strokeWidth: 0.5,
                    outline: "none",
                    cursor: isHighlighted ? "pointer" : "default",
                  },
                  pressed: {
                    fill: "hsl(var(--accent))",
                    outline: "none",
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ZoomableGroup>
  </ComposableMap>
));

MapChart.displayName = "MapChart";

const WorldMapSection = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const packages = selected ? countryPackages[selected] || [] : [];

  return (
    <section id="world-map" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Explore the World
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
            Click a country, discover packages
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Tap on any highlighted country to view available travel packages.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border-2 border-border rounded-lg p-4 md:p-8 mb-8"
        >
          <div className="aspect-[2/1] w-full">
            <MapChart onCountryClick={setSelected} />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="w-3 h-3 rounded-sm bg-primary inline-block" /> Packages Available
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="w-3 h-3 rounded-sm bg-secondary inline-block" /> Coming Soon
            </span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-serif text-foreground flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  {selected} — {packages.length} package{packages.length !== 1 ? "s" : ""}
                </h3>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
                  aria-label="Close packages"
                >
                  <X size={16} className="text-muted-foreground" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {packages.map((pkg, i) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-card border-2 border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300"
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
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={12} className="fill-gold text-gold" />
                        <span className="text-xs text-foreground">{pkg.rating}</span>
                      </div>
                      <h4 className="font-serif text-lg text-foreground mb-1">{pkg.name}</h4>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WorldMapSection;
