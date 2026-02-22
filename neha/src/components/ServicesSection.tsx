import { motion } from "framer-motion";
import { Plane, Hotel, Train, Car, FileText, Shield } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    desc: "Best fares across 500+ airlines worldwide. Business, economy, or charter — we find the perfect seat for your journey.",
    tags: ["500+ Airlines", "Price Match", "Flexible Dates"],
  },
  {
    icon: Hotel,
    title: "Hotel Booking",
    desc: "Handpicked stays from boutique ryokans to luxury retreats. Every property personally vetted for quality and character.",
    tags: ["Curated Properties", "Best Rate Guarantee", "Early Check-in"],
  },
  {
    icon: Train,
    title: "Bus & Train Tickets",
    desc: "Scenic rail journeys and coach routes across continents. From the Orient Express to local mountain railways.",
    tags: ["Rail Passes", "Scenic Routes", "Group Bookings"],
  },
  {
    icon: Car,
    title: "Car Rental",
    desc: "Self-drive freedom with premium vehicles. Compact city cars to rugged 4x4s for off-road adventures.",
    tags: ["Premium Vehicles", "GPS Included", "24/7 Roadside"],
  },
  {
    icon: FileText,
    title: "Visa Assistance",
    desc: "Expert guidance through every visa application. We handle the paperwork so you can focus on the journey ahead.",
    tags: ["Document Review", "Fast Processing", "100+ Countries"],
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    desc: "Comprehensive coverage for peace of mind. Medical, cancellation, and adventure sports policies tailored to your trip.",
    tags: ["Medical Cover", "Trip Cancellation", "Adventure Sports"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-section-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">What We Offer</p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Every detail, handled</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            From the first flight to the final transfer, we take care of every element of your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card border-2 border-border rounded-lg p-8 hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300 group"
            >
              <svc.icon className="w-8 h-8 text-accent mb-6 group-hover:text-primary transition-colors duration-300" />
              <h3 className="text-xl font-serif text-foreground mb-3">{svc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{svc.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {svc.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-1 bg-secondary text-secondary-foreground rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <a href="#contact" className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
                Learn more
              </a>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 border border-foreground/30 text-xs tracking-[0.2em] uppercase text-foreground hover:bg-foreground/10 transition-all duration-300"
          >
            Plan Your Complete Trip
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
