import { motion } from "framer-motion";
import { Compass, Sun, ShieldCheck, Wallet, Heart, MapPin } from "lucide-react";

const tips = [
  { icon: Compass, title: "Plan, Don't Over-Plan", desc: "Leave room for spontaneity. The best memories often come from unscripted moments." },
  { icon: Sun, title: "Travel Off-Season", desc: "Fewer crowds, lower prices, and more authentic interactions with locals." },
  { icon: ShieldCheck, title: "Stay Safe Abroad", desc: "Keep digital copies of documents, share your itinerary, and trust your instincts." },
  { icon: Wallet, title: "Budget Wisely", desc: "Eat where locals eat, use public transport, and always have some local currency on hand." },
  { icon: Heart, title: "Respect Local Culture", desc: "Learn basic phrases, dress appropriately, and approach every interaction with curiosity." },
  { icon: MapPin, title: "Go Beyond Guidebooks", desc: "Ask hotel staff, chat with locals, and wander without a map for the richest experiences." },
];

const TravelTipsSection = () => {
  return (
    <section id="tips" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Travel Tips</p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Wisdom for the road</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Essential advice to make every journey smoother, richer, and more meaningful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4 p-6 bg-card border-2 border-border rounded-lg hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300"
            >
              <tip.icon className="w-6 h-6 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-lg text-foreground mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelTipsSection;
