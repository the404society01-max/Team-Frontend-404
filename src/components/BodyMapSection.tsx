import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";

const regions = [
  { id: "head", label: "Neurology", specialists: 14, path: "M200,35 C200,15 220,5 240,5 C260,5 280,15 280,35 C280,60 260,75 240,75 C220,75 200,60 200,35 Z", cx: 240, cy: 40 },
  { id: "chest", label: "Cardiology", specialists: 18, path: "M200,95 L280,95 L290,170 L250,180 L230,180 L190,170 Z", cx: 240, cy: 135 },
  { id: "lungs", label: "Pulmonology", specialists: 10, path: "M185,100 L200,100 L195,165 L175,155 Z M280,100 L295,100 L305,155 L285,165 Z", cx: 175, cy: 130 },
  { id: "stomach", label: "Gastroenterology", specialists: 12, path: "M210,185 L270,185 L275,240 L245,255 L235,255 L205,240 Z", cx: 240, cy: 215 },
  { id: "joints", label: "Orthopedics", specialists: 16, path: "M170,260 L210,260 L200,340 L160,340 Z M270,260 L310,260 L320,340 L280,340 Z", cx: 165, cy: 300 },
  { id: "skin", label: "Dermatology", specialists: 8, path: "M310,100 L340,110 L335,160 L305,150 Z", cx: 325, cy: 130 },
];

const BodyMapSection = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const selectedRegion = regions.find((r) => r.id === selected);

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-blush relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Where does it <span className="italic text-primary">hurt?</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-lg mx-auto">
            Tap any area to discover specialists ready to help.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <svg viewBox="140 0 200 360" className="w-64 md:w-80 h-auto">
              {/* Body outline */}
              <ellipse cx="240" cy="40" rx="35" ry="38" fill="none" stroke="hsl(258,38%,14%)" strokeWidth="1.5" opacity="0.2" />
              <line x1="240" y1="78" x2="240" y2="185" stroke="hsl(258,38%,14%)" strokeWidth="1.5" opacity="0.2" />
              <line x1="240" y1="100" x2="175" y2="160" stroke="hsl(258,38%,14%)" strokeWidth="1.5" opacity="0.2" />
              <line x1="240" y1="100" x2="305" y2="160" stroke="hsl(258,38%,14%)" strokeWidth="1.5" opacity="0.2" />
              <line x1="240" y1="185" x2="200" y2="340" stroke="hsl(258,38%,14%)" strokeWidth="1.5" opacity="0.2" />
              <line x1="240" y1="185" x2="280" y2="340" stroke="hsl(258,38%,14%)" strokeWidth="1.5" opacity="0.2" />

              {/* Interactive regions */}
              {regions.map((region) => (
                <motion.path
                  key={region.id}
                  d={region.path}
                  fill={hovered === region.id || selected === region.id ? "hsl(261,40%,55%,0.2)" : "transparent"}
                  stroke={hovered === region.id || selected === region.id ? "hsl(261,40%,55%)" : "hsl(261,40%,55%,0.15)"}
                  strokeWidth="1.5"
                  className="cursor-pointer"
                  onMouseEnter={() => setHovered(region.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(region.id === selected ? null : region.id)}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </svg>

            {/* Hover tooltip */}
            <AnimatePresence>
              {hovered && !selected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1/2 right-[-200px] hidden md:block bg-surface rounded-2xl shadow-soft p-4 min-w-[180px]"
                >
                  <p className="font-display text-base font-semibold text-foreground">
                    {regions.find((r) => r.id === hovered)?.label}
                  </p>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    {regions.find((r) => r.id === hovered)?.specialists} specialists available
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Selection panel */}
          <AnimatePresence>
            {selectedRegion && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-surface rounded-3xl shadow-soft p-8 max-w-sm w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl font-semibold">{selectedRegion.label}</h3>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close panel"
                  >
                    ✕
                  </button>
                </div>
                <p className="font-body text-muted-foreground mb-6">
                  {selectedRegion.specialists} world-class specialists ready to provide compassionate care.
                </p>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-sm font-display font-semibold">Dr</span>
                      </div>
                      <div>
                        <p className="font-body text-sm font-medium text-foreground">Dr. Specialist {i}</p>
                        <p className="font-body text-xs text-muted-foreground">{selectedRegion.label}</p>
                      </div>
                      <span className="ml-auto flex items-center gap-1 text-xs text-secondary font-body">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse-dot" />
                        Available
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href="#booking"
                  className="block mt-6 text-center font-body font-medium bg-primary text-primary-foreground py-3 rounded-full hover:shadow-glow transition-all duration-500"
                >
                  Book Appointment
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BodyMapSection;
