import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Specialists", href: "#doctors" },
  { label: "How It Works", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full py-6 px-6 md:px-12 flex items-center justify-between relative z-50">
      <a href="#" className="font-display text-2xl font-semibold text-primary tracking-tight">
        Puls.
      </a>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#booking"
          className="font-body text-sm font-medium bg-primary text-primary-foreground px-6 py-2.5 rounded-full hover:shadow-glow transition-all duration-500"
        >
          Book Now
        </a>
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
      >
        <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl p-6 flex flex-col gap-4 shadow-soft md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-body text-lg text-foreground py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setMobileOpen(false)}
              className="font-body text-sm font-medium bg-primary text-primary-foreground px-6 py-3 rounded-full text-center"
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
