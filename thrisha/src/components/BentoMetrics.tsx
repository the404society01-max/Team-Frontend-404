import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const AnimatedCounter = ({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref} className="font-display font-bold tabular-nums">{count}{suffix}</span>;
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

const BentoMetrics = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 md:py-32 px-6 md:px-12 bg-lavender" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Numbers that <span className="italic text-primary">heal</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-lg mx-auto">
            Every metric reflects a patient whose life was changed.
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[200px]">
          {/* Cell 1 - Patient satisfaction */}
          <motion.div
            custom={0}
            variants={cardVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="col-span-12 md:col-span-5 row-span-2 rounded-3xl bg-gradient-violet-teal p-8 flex flex-col justify-between text-primary-foreground overflow-hidden relative"
          >
            <div>
              <p className="font-body text-sm opacity-80 mb-2">Patient Outcomes</p>
              {/* Radial bars */}
              <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto">
                <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="12" />
                <circle
                  cx="100" cy="100" r="80"
                  fill="none" stroke="white" strokeOpacity="0.9" strokeWidth="12"
                  strokeDasharray="502" strokeDashoffset={inView ? 10 : 502}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                  style={{ transition: "stroke-dashoffset 2s ease-out" }}
                />
                <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="10" />
                <circle
                  cx="100" cy="100" r="60"
                  fill="none" stroke="white" strokeOpacity="0.6" strokeWidth="10"
                  strokeDasharray="377" strokeDashoffset={inView ? 38 : 377}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                  style={{ transition: "stroke-dashoffset 2.2s ease-out 0.2s" }}
                />
              </svg>
            </div>
            <p className="font-display text-3xl md:text-4xl font-bold">
              <AnimatedCounter target={98} suffix="%" /> <span className="text-base font-body font-light opacity-80">satisfaction</span>
            </p>
          </motion.div>

          {/* Cell 2 - Specialists */}
          <motion.div
            custom={1}
            variants={cardVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="col-span-7 md:col-span-4 card-wellness p-8 flex flex-col justify-center"
          >
            <p className="font-body text-sm text-muted-foreground mb-2">Specialists</p>
            <p className="text-4xl md:text-5xl text-foreground">
              <AnimatedCounter target={120} suffix="+" />
            </p>
            <p className="font-body text-sm text-muted-foreground mt-2">World-class physicians</p>
          </motion.div>

          {/* Cell 3 - Wait time */}
          <motion.div
            custom={2}
            variants={cardVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="col-span-5 md:col-span-3 rounded-3xl bg-secondary p-6 flex flex-col justify-center items-center text-secondary-foreground"
          >
            <p className="font-body text-sm opacity-80 mb-1">Avg Wait</p>
            <p className="font-display text-4xl font-bold">15<span className="text-lg font-light">m</span></p>
            <div className="flex gap-1.5 mt-3">
              <span className="w-2 h-2 rounded-full bg-primary-foreground/80 animate-pulse-dot" />
              <span className="w-2 h-2 rounded-full bg-primary-foreground/60 animate-pulse-dot" style={{ animationDelay: "0.3s" }} />
              <span className="w-2 h-2 rounded-full bg-primary-foreground/40 animate-pulse-dot" style={{ animationDelay: "0.6s" }} />
            </div>
          </motion.div>

          {/* Cell 4 - Heartbeat wave */}
          <motion.div
            custom={3}
            variants={cardVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="col-span-12 md:col-span-7 card-wellness p-8 flex flex-col justify-center overflow-hidden"
          >
            <p className="font-body text-sm text-muted-foreground mb-4">Live System Health</p>
            <svg viewBox="0 0 600 80" className="w-full h-16">
              <path
                d="M0,40 L80,40 L100,10 L120,70 L140,25 L160,55 L180,40 L300,40 L320,15 L340,65 L360,30 L380,50 L400,40 L600,40"
                fill="none"
                stroke="hsl(261, 40%, 55%)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset={inView ? 0 : 1000}
                style={{ transition: "stroke-dashoffset 2.5s ease-out" }}
              />
            </svg>
          </motion.div>

          {/* Cell 5 - Recovery */}
          <motion.div
            custom={4}
            variants={cardVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="col-span-12 md:col-span-5 rounded-3xl bg-mint p-8 flex items-center gap-6"
          >
            <svg viewBox="0 0 120 120" className="w-24 h-24 shrink-0">
              <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(170, 41%, 42%)" strokeOpacity="0.2" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="50"
                fill="none" stroke="hsl(170, 41%, 42%)" strokeWidth="10"
                strokeDasharray="314" strokeDashoffset={inView ? 63 : 314}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                style={{ transition: "stroke-dashoffset 2s ease-out 0.3s" }}
              />
              <text x="60" y="65" textAnchor="middle" className="font-display text-2xl font-bold fill-foreground">80%</text>
            </svg>
            <div>
              <p className="font-display text-xl font-semibold text-foreground">Faster Recovery</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Compared to national average</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoMetrics;
