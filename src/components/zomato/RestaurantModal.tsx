import { X, Star, Clock, MapPin, Plus, Leaf, Minus } from "lucide-react";
import type { Restaurant } from "@/data/zomatoData";
import { dishes, reviews } from "@/data/zomatoData";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Props {
  restaurant: Restaurant | null;
  onClose: () => void;
}

const RestaurantModal = ({ restaurant, onClose }: Props) => {
  const { items, addItem, updateQuantity } = useCart();
  const { toast } = useToast();

  if (!restaurant) return null;

  const menuItems = dishes.filter((d) => d.restaurantId === restaurant.id);
  // If no specific items, show all as "available"
  const displayItems = menuItems.length > 0 ? menuItems : dishes.slice(0, 4);

  const getCartQty = (id: string) => items.find((i) => i.id === id)?.quantity || 0;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-foreground/40 animate-fade-in" onClick={onClose} />
      <div className="fixed inset-4 md:inset-y-8 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50 bg-background rounded-2xl border border-border overflow-hidden flex flex-col animate-slide-up">
        {/* Hero */}
        <div className="relative h-48 shrink-0">
          <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold" style={{ color: 'white' }}>{restaurant.name}</h2>
            <p className="text-sm opacity-80" style={{ color: 'rgba(255,255,255,0.8)' }}>{restaurant.cuisines.join(", ")}</p>
          </div>
        </div>

        {/* Info bar */}
        <div className="flex items-center gap-4 px-5 py-3 border-b border-border text-sm">
          <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold text-primary-foreground ${
            restaurant.rating >= 4 ? "bg-zomato-green" : "bg-zomato-gold"
          }`}>
            {restaurant.rating} <Star className="h-3 w-3 fill-current" />
          </span>
          <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3.5 w-3.5" /> {restaurant.deliveryTime}</span>
          <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> 2.5 km</span>
          <span className="text-muted-foreground">₹{restaurant.priceForTwo} for two</span>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Menu */}
          <div className="p-5">
            <h3 className="font-bold text-foreground text-lg mb-4">Menu</h3>
            <div className="space-y-3">
              {displayItems.map((dish) => {
                const qty = getCartQty(dish.id);
                return (
                  <div key={dish.id} className="flex gap-3 p-3 rounded-xl border border-border hover:bg-secondary/50 transition-colors">
                    <img src={dish.image} alt={dish.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        {dish.veg ? (
                          <span className="w-4 h-4 border-2 border-zomato-green rounded-sm flex items-center justify-center">
                            <span className="w-2 h-2 bg-zomato-green rounded-full" />
                          </span>
                        ) : (
                          <span className="w-4 h-4 border-2 border-primary rounded-sm flex items-center justify-center">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                          </span>
                        )}
                        <h4 className="font-semibold text-foreground text-sm">{dish.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-1">{dish.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground">₹{dish.price}</span>
                        {qty === 0 ? (
                          <button
                            onClick={() => { addItem(dish); toast({ title: "Added!", description: dish.name }); }}
                            className="px-4 py-1.5 rounded-lg border-2 border-primary text-primary text-xs font-bold hover:bg-primary/5 transition-colors"
                          >
                            ADD
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQuantity(dish.id, qty - 1)} className="w-6 h-6 rounded bg-secondary flex items-center justify-center border border-border">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-bold text-primary">{qty}</span>
                            <button onClick={() => updateQuantity(dish.id, qty + 1)} className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                              <Plus className="h-3 w-3 text-primary-foreground" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews */}
          <div className="p-5 border-t border-border">
            <h3 className="font-bold text-foreground text-lg mb-4">Reviews</h3>
            <div className="space-y-4">
              {reviews.slice(0, 3).map((r, i) => (
                <div key={i} className="p-3 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {r.user[0]}
                    </div>
                    <div>
                      <span className="font-semibold text-foreground text-sm">{r.user}</span>
                      <span className="text-xs text-muted-foreground ml-2">{r.date}</span>
                    </div>
                    <div className="ml-auto flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`h-3 w-3 ${j < r.rating ? "fill-zomato-gold text-zomato-gold" : "text-muted-foreground/30"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantModal;
