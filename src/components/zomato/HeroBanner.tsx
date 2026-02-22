import { Search, MapPin } from "lucide-react";
import heroImg from "@/assets/zomato-hero.jpg";

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const HeroBanner = ({ searchQuery, onSearchChange }: Props) => (
  <section className="relative overflow-hidden" aria-label="Hero banner">
    <div className="absolute inset-0">
      <img src={heroImg} alt="Delicious food spread" className="w-full h-full object-cover" loading="eager" />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
    </div>
    <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 animate-slide-up" style={{ color: 'white' }}>
        zomato
      </h1>
      <p className="text-lg md:text-xl mb-8 animate-slide-up opacity-90" style={{ color: 'rgba(255,255,255,0.85)', animationDelay: '0.1s' }}>
        Discover the best food & drinks in <span className="font-semibold">Shivamogga</span>
      </p>

      {/* Hero Search */}
      <div className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col sm:flex-row bg-background rounded-2xl overflow-hidden zomato-shadow-hover">
          <div className="flex items-center gap-2 px-4 py-3 border-b sm:border-b-0 sm:border-r border-border">
            <MapPin className="h-5 w-5 text-primary shrink-0" />
            <span className="text-sm text-foreground font-medium whitespace-nowrap">Shivamogga</span>
          </div>
          <div className="flex-1 flex items-center gap-2 px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for restaurant, cuisine or a dish"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              aria-label="Search food"
            />
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap justify-center gap-3 mt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        {["Delivery", "Dining Out", "Nightlife"].map((label) => (
          <button
            key={label}
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  </section>
);

export default HeroBanner;
