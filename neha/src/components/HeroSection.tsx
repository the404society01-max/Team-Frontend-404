import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-travel.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Serene zen garden with misty mountains"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-background/40" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.35em] uppercase text-foreground/70 mb-6"
        >
          Mindful Travel
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal text-foreground leading-tight"
        >
          Travel with <em className="italic">intention</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-md text-foreground/70 text-base md:text-lg leading-relaxed"
        >
          Curated journeys that honor stillness, beauty, and the art of being somewhere fully.
        </motion.p>

        <motion.a
          href="#destinations"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 inline-flex items-center gap-3 px-8 py-4 border border-foreground/30 text-xs tracking-[0.2em] uppercase text-foreground hover:bg-foreground/10 transition-all duration-300"
        >
          Explore Destinations
          <ArrowRight size={16} />
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
