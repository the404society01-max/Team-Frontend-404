import { motion } from "framer-motion";

const pillars = [
  { title: "Intentional", desc: "Every detail is considered, nothing is accidental." },
  { title: "Unhurried", desc: "Slow itineraries that let moments unfold naturally." },
  { title: "Authentic", desc: "Deep connections with places and their cultures." },
];

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Our Philosophy</p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6 leading-tight">
            Less noise. <span className="inline-block w-8" /> More presence.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-16">
            We believe travel should be an act of attention, not consumption. Each journey is designed around spaciousness — room to notice, to reflect, to simply be where you are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <h3 className="text-xl font-serif text-foreground mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
