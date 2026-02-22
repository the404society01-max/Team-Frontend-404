import { motion } from "framer-motion";
import { Percent, Gift, Clock, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const offers = [
  { icon: Percent, title: "20% Off Weekday Lunch", desc: "Enjoy any main course at 20% off, Monday to Friday, 11am–3pm. Perfect for a midday escape.", tag: "Limited Time", color: "bg-primary/10 text-primary" },
  { icon: Gift, title: "Family Combo Deal", desc: "2 starters + 2 mains + 1 dessert for just $89. A feast for the whole family.", tag: "Best Value", color: "bg-accent/10 text-accent" },
  { icon: Clock, title: "Happy Hour: 5–7pm", desc: "Half-price on all cocktails and appetizers. The perfect way to unwind after work.", tag: "Daily", color: "bg-olive/10 text-olive" },
  { icon: Sparkles, title: "Festival Special Menu", desc: "Exclusive seasonal dishes celebrating local harvest festival. Available through March.", tag: "Seasonal", color: "bg-soft-terracotta/10 text-soft-terracotta" },
  { icon: Gift, title: "Birthday Special", desc: "Celebrate your birthday with us! Free dessert and a complimentary glass of champagne.", tag: "Always On", color: "bg-primary/10 text-primary" },
  { icon: Percent, title: "First Order 15% Off", desc: "New to Savoria? Get 15% off your entire first online order. Use code WELCOME15.", tag: "New Guests", color: "bg-accent/10 text-accent" },
];

const Offers = () => (
  <div className="pt-20">
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading subtitle="Deals & Specials" title="Irresistible Offers" description="Take advantage of our special deals designed to make your dining experience even sweeter." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${offer.color}`}>
                  <offer.icon className="h-6 w-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">{offer.tag}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{offer.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{offer.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Offers;
