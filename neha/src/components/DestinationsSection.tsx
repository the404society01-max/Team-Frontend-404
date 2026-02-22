import { motion } from "framer-motion";
import destKyoto from "@/assets/dest-kyoto.jpg";
import destNorway from "@/assets/dest-norway.jpg";
import destSantorini from "@/assets/dest-santorini.jpg";
import destPatagonia from "@/assets/dest-patagonia.jpg";
import destMarrakech from "@/assets/dest-marrakech.jpg";
import destBali from "@/assets/dest-bali.jpg";

const destinations = [
  { img: destKyoto, country: "Japan", days: "10 days", name: "Kyoto", desc: "Ancient temples, bamboo groves, and the gentle art of tea." },
  { img: destNorway, country: "Norway", days: "8 days", name: "Fjords", desc: "Silent waters reflecting infinite sky and ancient stone." },
  { img: destSantorini, country: "Greece", days: "7 days", name: "Santorini", desc: "White-washed stillness above the endless Aegean blue." },
  { img: destPatagonia, country: "Argentina", days: "12 days", name: "Patagonia", desc: "Glacial lakes and jagged peaks at the edge of the world." },
  { img: destMarrakech, country: "Morocco", days: "6 days", name: "Marrakech", desc: "Mosaic courtyards, spice-laden air, and golden light." },
  { img: destBali, country: "Indonesia", days: "9 days", name: "Bali", desc: "Emerald rice terraces cascading through misty silence." },
];

const DestinationsSection = () => {
  return (
    <section id="destinations" className="py-24 md:py-32 bg-section-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Destinations</p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground">Places that breathe</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-lg cursor-pointer border-2 border-border hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={dest.img}
                  alt={`${dest.name}, ${dest.country}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                  {dest.country} · {dest.days}
                </p>
                <h3 className="text-2xl font-serif text-foreground mb-2">{dest.name}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{dest.desc}</p>
                <span className="inline-block mt-4 text-xs tracking-[0.15em] uppercase text-primary hover:text-accent transition-colors">
                  Explore
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
