import { motion } from "framer-motion";
import { ArrowRight, Calendar as CalendarIcon, User } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import foodStarters from "@/assets/food-starters.jpg";
import foodMain from "@/assets/food-main.jpg";
import foodDessert from "@/assets/food-dessert.jpg";
import kitchenImg from "@/assets/kitchen.jpg";

const posts = [
  { title: "The Art of Plating: How We Style Every Dish", excerpt: "Discover the creative process behind Savoria's iconic food presentations, from sketch to plate.", image: foodMain, date: "Feb 15, 2026", author: "Chef Marco", category: "Cooking Tips" },
  { title: "5 Secret Ingredients Every Home Cook Needs", excerpt: "Chef Marco reveals the pantry essentials that can transform everyday meals into extraordinary ones.", image: foodStarters, date: "Feb 8, 2026", author: "Chef Marco", category: "Recipes" },
  { title: "Farm to Table: Our Local Sourcing Story", excerpt: "Meet the farmers and artisans who supply the freshest ingredients for our seasonal menus.", image: kitchenImg, date: "Jan 28, 2026", author: "Savoria Team", category: "Food Stories" },
  { title: "The Health Benefits of Mediterranean Cooking", excerpt: "Why Mediterranean cuisine is one of the world's healthiest diets, and how we bring it to your plate.", image: foodDessert, date: "Jan 15, 2026", author: "Dr. Anna Costa", category: "Nutrition" },
];

const Blog = () => (
  <div className="pt-20">
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading subtitle="From Our Kitchen" title="Stories, Recipes & Tips" description="Dive into our world of flavors with articles, recipes, and behind-the-scenes stories." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">{post.category}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-muted-foreground text-xs mb-3">
                  <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm">
                  Read More <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
