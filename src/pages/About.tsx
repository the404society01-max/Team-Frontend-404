import { motion } from "framer-motion";
import { Heart, Target, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import chefImg from "@/assets/chef.jpg";
import interiorImg from "@/assets/restaurant-interior.jpg";
import kitchenImg from "@/assets/kitchen.jpg";

const values = [
  { icon: Heart, title: "Passion", desc: "Every dish is made with love and an unwavering commitment to excellence." },
  { icon: Target, title: "Quality", desc: "We source only the finest seasonal and locally-grown ingredients." },
  { icon: Sparkles, title: "Innovation", desc: "We blend tradition with modern techniques to surprise and delight." },
];

const About = () => (
  <div className="pt-20">
    {/* Story */}
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-accent font-medium text-sm tracking-widest uppercase mb-2 block">Our Story</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">A Journey of Flavor & Soul</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2010, Savoria was born from a simple dream: to create a space where food becomes an experience, where every ingredient is celebrated, and every guest feels like family.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              What started as a small neighborhood bistro has grown into one of the city's most beloved dining destinations. But our heart remains the same — honest cooking, warm hospitality, and an obsession with quality.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that great food has the power to bring people together, spark conversations, and create lasting memories. That's the promise of every meal at Savoria.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
            <img src={interiorImg} alt="Interior" className="rounded-2xl h-64 w-full object-cover shadow-lg" />
            <img src={kitchenImg} alt="Kitchen" className="rounded-2xl h-64 w-full object-cover shadow-lg mt-8" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="bg-secondary section-padding">
      <div className="container mx-auto">
        <SectionHeading subtitle="What Drives Us" title="Our Mission & Values" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass-card p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Chef */}
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
            <img src={chefImg} alt="Chef Marco Rossi" className="rounded-2xl shadow-2xl w-full max-w-md mx-auto h-[500px] object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 lg:order-2">
            <span className="text-accent font-medium text-sm tracking-widest uppercase mb-2 block">Meet Our Chef</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Chef Marco Rossi</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              With over 20 years of culinary experience spanning Michelin-starred kitchens in Italy, France, and New York, Chef Marco brings a rare blend of classical technique and creative vision to Savoria.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              His philosophy is simple: let the ingredients speak. Every menu is designed to honor seasonal produce while pushing the boundaries of flavor and presentation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
