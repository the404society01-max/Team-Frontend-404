import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, Flame, Leaf, Award, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import heroImg from "@/assets/hero-food.jpg";
import foodStarters from "@/assets/food-starters.jpg";
import foodMain from "@/assets/food-main.jpg";
import foodDessert from "@/assets/food-dessert.jpg";
import interiorImg from "@/assets/restaurant-interior.jpg";

const specials = [
  { title: "Truffle Mushroom Bruschetta", desc: "Wild mushrooms, truffle oil, aged parmesan", price: "$14", img: foodStarters, tag: "Chef's Pick" },
  { title: "Grilled Wagyu Ribeye", desc: "Premium wagyu with red wine jus", price: "$48", img: foodMain, tag: "Signature" },
  { title: "Chocolate Lava Fondant", desc: "Molten center with vanilla gelato", price: "$14", img: foodDessert, tag: "Best Seller" },
];

const stats = [
  { icon: Award, value: "15+", label: "Years of Excellence" },
  { icon: Users, value: "50K+", label: "Happy Diners" },
  { icon: Star, value: "4.9", label: "Google Rating" },
  { icon: Flame, value: "200+", label: "Recipes" },
];

const reviews = [
  { name: "Sarah M.", text: "The most incredible dining experience I've ever had. Every dish was a masterpiece.", rating: 5 },
  { name: "James K.", text: "Savoria never disappoints. The wagyu ribeye is worth every penny.", rating: 5 },
  { name: "Priya D.", text: "Beautiful ambiance and the vegetarian options are genuinely creative, not afterthoughts.", rating: 5 },
];

const Index = () => (
  <div>
    {/* Hero */}
    <section className="relative h-screen min-h-[600px] flex items-center">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Gourmet dining" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6 backdrop-blur-sm border border-accent/30">
            ✨ Fine Dining Redefined
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-background leading-tight mb-6">
            Where Every Plate <br />
            <span className="italic text-accent">Tells a Story</span>
          </h1>
          <p className="text-background/70 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
            Discover culinary artistry crafted with passion, seasonal ingredients, and a touch of magic at Savoria.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors"
            >
              Explore Menu <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/reservation"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 border-background/30 text-background font-semibold hover:bg-background/10 transition-colors"
            >
              Reserve a Table
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Quick Links Strip */}
    <section className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium">
        {[
          [Clock, "Open Today: 11am–10pm"],
          [Leaf, "Vegan Friendly"],
          [Flame, "Live Kitchen"],
        ].map(([Icon, text], i) => (
          <span key={i} className="flex items-center gap-2 opacity-90">
            <Icon className="h-4 w-4" />
            {text as string}
          </span>
        ))}
      </div>
    </section>

    {/* Special Dishes */}
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading
          subtitle="Our Specials"
          title="Chef's Signature Dishes"
          description="Handcrafted with the finest seasonal ingredients, these dishes represent the soul of Savoria."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {specials.map((dish, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group glass-card overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={dish.img} alt={dish.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                  {dish.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-lg font-semibold text-foreground">{dish.title}</h3>
                  <span className="text-primary font-bold">{dish.price}</span>
                </div>
                <p className="text-muted-foreground text-sm">{dish.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/menu" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors">
            View Full Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="text-center"
          >
            <s.icon className="h-8 w-8 text-accent mx-auto mb-3" />
            <div className="font-display text-3xl md:text-4xl font-bold text-foreground">{s.value}</div>
            <div className="text-muted-foreground text-sm mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Ambiance Preview */}
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src={interiorImg} alt="Restaurant interior" className="rounded-2xl shadow-2xl w-full h-[400px] object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-medium text-sm tracking-widest uppercase mb-2 block">Our Space</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">An Atmosphere Worth Savoring</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Step into a world where rustic charm meets modern elegance. Our warm, intimate dining room sets the perfect stage for unforgettable meals and cherished conversations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/gallery" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
                View Gallery <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-secondary transition-colors">
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Reviews */}
    <section className="bg-secondary section-padding">
      <div className="container mx-auto">
        <SectionHeading subtitle="Testimonials" title="What Our Guests Say" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/80 italic mb-4">"{r.text}"</p>
              <p className="font-semibold text-foreground text-sm">— {r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="relative py-24">
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>
      <div className="relative container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-background mb-4">Ready for an Unforgettable Evening?</h2>
        <p className="text-background/70 text-lg mb-8 max-w-lg mx-auto">Reserve your table today and let us create a dining experience you'll remember forever.</p>
        <Link
          to="/reservation"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-accent-foreground font-semibold text-lg hover:bg-accent/90 transition-colors"
        >
          Book Now <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  </div>
);

export default Index;
