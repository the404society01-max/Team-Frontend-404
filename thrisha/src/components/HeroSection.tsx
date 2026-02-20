import { motion } from "framer-motion";

const trustPills = [
  { text: "120+ Specialists", icon: "🩺" },
  { text: "Same-day Appointments", icon: "⚡" },
  { text: "24/7 Support", icon: "💬" },
  { text: "100% Confidential", icon: "🔒" },
];

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.8 + i * 0.12, duration: 0.7, ease: "easeOut" },
  }),
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Organic blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-lavender/50 blur-[100px] animate-blob-1" />
        <div className="absolute top-[20%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-mint/40 blur-[120px] animate-blob-2" />
        <div className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-blush/45 blur-[100px] animate-blob-3" />
        <div className="absolute top-[50%] left-[40%] w-[35vw] h-[35vw] rounded-full bg-lavender/30 blur-[80px] animate-blob-4" />
      </div>

      {/* Breathing circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative mb-12"
      >
        <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-breathe" />
          <div className="absolute inset-[-12px] rounded-full border border-secondary/15 animate-breathe" style={{ animationDelay: "0.5s" }} />
          <div className="absolute inset-[-24px] rounded-full border border-primary/10 animate-breathe" style={{ animationDelay: "1s" }} />
          <span className="font-display italic text-lg text-primary/70">Breathe</span>
        </div>
      </motion.div>

      {/* Headline */}
      <div className="relative z-10 text-center max-w-4xl">
        <h1 className="font-display font-light leading-[1.1]" style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}>
          <div className="overflow-hidden">
            <motion.span custom={0} variants={wordVariants} initial="hidden" animate="visible" className="inline-block">
              Care&nbsp;
            </motion.span>
            <motion.span custom={1} variants={wordVariants} initial="hidden" animate="visible" className="inline-block">
              that&nbsp;
            </motion.span>
            <motion.span custom={2} variants={wordVariants} initial="hidden" animate="visible" className="inline-block">
              feels
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              custom={3}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="inline-block italic text-primary"
            >
              human.
            </motion.span>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7, ease: "easeOut" }}
          className="mt-6 text-lg md:text-xl text-muted-foreground font-body font-light max-w-xl mx-auto"
        >
          A wellness experience designed around you — not systems, not protocols. Just compassionate, world-class care.
        </motion.p>
      </div>

      {/* Trust pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-3 mt-10 relative z-10"
      >
        {trustPills.map((pill, i) => (
          <div
            key={pill.text}
            className="animate-float-pill bg-surface/80 backdrop-blur-sm border border-primary/10 rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-body text-foreground/80"
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            <span className="text-base">{pill.icon}</span>
            {pill.text}
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.7, ease: "easeOut" }}
        className="flex flex-col sm:flex-row gap-4 mt-12 relative z-10"
      >
        <a
          href="#booking"
          className="font-body font-medium bg-primary text-primary-foreground px-8 py-4 rounded-full text-base hover:shadow-glow transition-all duration-500"
        >
          Begin Your Health Journey
        </a>
        <a
          href="#doctors"
          className="font-body font-medium border border-primary/20 text-foreground px-8 py-4 rounded-full text-base hover:border-primary/40 transition-all duration-500"
        >
          Meet Our Specialists
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
