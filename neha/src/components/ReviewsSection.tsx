import { motion } from "framer-motion";
import { Star, ThumbsUp } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    time: "2 weeks ago",
    trip: "Kashmir Paradise",
    text: "An absolutely transformative experience. The attention to detail was remarkable — from the shikara ride at dawn to the private garden tours. I've never felt so present on a trip. Serene Journeys truly understands the art of mindful travel.",
    helpful: 24,
    rating: 5,
  },
  {
    name: "James Mitchell",
    location: "London, UK",
    time: "1 month ago",
    trip: "Fjords, Norway",
    text: "The fjords trip exceeded every expectation. The unhurried pace let us truly absorb the landscape. Our guide was incredibly knowledgeable, and the boutique accommodations were perfectly chosen. Worth every penny.",
    helpful: 18,
    rating: 5,
  },
  {
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    time: "3 weeks ago",
    trip: "Bali, Indonesia",
    text: "I was looking for a retreat-style holiday and Serene Journeys delivered beautifully. The rice terrace meditation sessions and temple visits were deeply moving. The itinerary flowed naturally without ever feeling rushed.",
    helpful: 31,
    rating: 5,
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-section-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Customer Reviews</p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground">What our travelers say</h2>
        </div>

        <div className="flex items-center justify-center gap-6 mb-16">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2 tracking-wider uppercase">Google Reviews</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-serif text-foreground">4.8</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">6 reviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-serif text-secondary-foreground">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{review.name}</h4>
                  <p className="text-[11px] text-muted-foreground">{review.location}</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-2">{review.time} · {review.trip}</p>

              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={12} className="fill-gold text-gold" />
                ))}
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed mb-4">{review.text}</p>

              <div className="flex items-center gap-1 text-muted-foreground">
                <ThumbsUp size={12} />
                <span className="text-xs">Helpful ({review.helpful})</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
