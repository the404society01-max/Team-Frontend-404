import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";

const blogPosts = [
  {
    id: "mindful-packing",
    title: "The Art of Mindful Packing",
    excerpt: "How to pack light and intentionally for a journey that feels free from the moment you leave home.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    author: "Serene Team",
    date: "Feb 15, 2026",
    readTime: "5 min read",
    category: "Travel Tips",
  },
  {
    id: "hidden-temples-kyoto",
    title: "Hidden Temples of Kyoto",
    excerpt: "Beyond Kinkaku-ji — discover the secret gardens and forgotten temples that most visitors never see.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    author: "Yuki Tanaka",
    date: "Feb 10, 2026",
    readTime: "8 min read",
    category: "Destinations",
  },
  {
    id: "slow-travel-movement",
    title: "Why Slow Travel Changes Everything",
    excerpt: "The case for staying longer, moving less, and experiencing more on every trip you take.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
    author: "James Mitchell",
    date: "Feb 5, 2026",
    readTime: "6 min read",
    category: "Philosophy",
  },
  {
    id: "street-food-guide-marrakech",
    title: "A Street Food Guide to Marrakech",
    excerpt: "Navigate the souks with confidence — from fragrant tagines to honey-drizzled pastries.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    author: "Priya Sharma",
    date: "Jan 28, 2026",
    readTime: "7 min read",
    category: "Food & Culture",
  },
  {
    id: "fjord-photography-tips",
    title: "Photographing the Norwegian Fjords",
    excerpt: "Capture the silence — tips for shooting dramatic landscapes in ever-changing Nordic light.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    author: "James Mitchell",
    date: "Jan 20, 2026",
    readTime: "6 min read",
    category: "Photography",
  },
  {
    id: "bali-wellness-retreats",
    title: "Wellness Retreats in Bali",
    excerpt: "From yoga shalas in Ubud to silent meditation centers — finding stillness on the Island of Gods.",
    image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=600&q=80",
    author: "Serene Team",
    date: "Jan 12, 2026",
    readTime: "5 min read",
    category: "Wellness",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Our Stories</p>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-4">Travel Blog</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Reflections, guides, and inspiration from our journeys around the world.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 group cursor-pointer"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card border-2 border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300">
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.2em] uppercase text-accent mb-4">{blogPosts[0].category}</span>
              <h2 className="text-3xl font-serif text-foreground mb-4 group-hover:text-primary transition-colors">{blogPosts[0].title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{blogPosts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User size={12} /> {blogPosts[0].author}</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {blogPosts[0].date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {blogPosts[0].readTime}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border-2 border-border rounded-lg overflow-hidden group cursor-pointer hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] tracking-[0.2em] uppercase text-accent">{post.category}</span>
                <h3 className="text-xl font-serif text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Home <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
