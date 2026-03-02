import { MapPin, Navigation, Circle } from "lucide-react";
import { restaurants } from "@/data/zomatoData";

const MapSection = () => {
  const nearbyRestaurants = restaurants.slice(0, 6);

  return (
    <section className="py-8" aria-label="Restaurant locations map">
      <div className="container mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" /> Restaurants Near You
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Map Placeholder */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border bg-secondary relative h-80 md:h-96">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-48 h-48 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-primary/20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Navigation className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  {/* Restaurant markers */}
                  {[
                    { top: "10%", left: "30%" }, { top: "25%", left: "70%" },
                    { top: "60%", left: "20%" }, { top: "45%", left: "80%" },
                    { top: "75%", left: "55%" }, { top: "15%", left: "50%" },
                  ].map((pos, i) => (
                    <div key={i} className="absolute" style={{ top: pos.top, left: pos.left }}>
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
                        <MapPin className="h-3.5 w-3.5 text-primary-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-foreground">Shivamogga, Karnataka</p>
                <p className="text-xs text-muted-foreground mt-1">5km free delivery zone</p>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 bg-card rounded-xl px-3 py-2 border border-border zomato-shadow text-xs text-muted-foreground flex items-center gap-1.5">
              <Circle className="h-2.5 w-2.5 fill-zomato-green text-zomato-green" /> 
              <span className="text-zomato-green font-medium">Free delivery zone</span> • 5km radius
            </div>
          </div>

          {/* Nearby List */}
          <div className="bg-card rounded-2xl border border-border p-4 zomato-shadow overflow-y-auto max-h-96">
            <h3 className="font-bold text-foreground text-sm mb-3">Nearby Restaurants</h3>
            <div className="space-y-2">
              {nearbyRestaurants.map((r, i) => (
                <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors cursor-pointer">
                  <img src={r.image} alt={r.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{r.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{r.cuisines.slice(0, 2).join(", ")}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-zomato-green font-medium">⭐ {r.rating}</span>
                      <span className="text-xs text-muted-foreground">{r.deliveryTime}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{(i + 1) * 0.8}km</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
