import { Star, Clock, Leaf } from "lucide-react";
import type { Restaurant } from "@/data/zomatoData";

interface Props {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantCard = ({ restaurant, onClick }: Props) => (
  <article
    onClick={onClick}
    className="bg-card rounded-2xl overflow-hidden border border-border zomato-shadow hover:zomato-shadow-hover transition-all duration-300 cursor-pointer group"
    role="button"
    tabIndex={0}
    aria-label={`${restaurant.name} - ${restaurant.cuisines.join(", ")}`}
  >
    {/* Image */}
    <div className="relative h-44 sm:h-48 overflow-hidden">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      {restaurant.discount && (
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold" style={{ background: 'hsl(210, 100%, 35%)', color: 'white' }}>
          {restaurant.discount}
        </div>
      )}
      {restaurant.promoted && (
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-semibold bg-background/90 text-muted-foreground uppercase tracking-wider">
          Promoted
        </div>
      )}
    </div>

    {/* Details */}
    <div className="p-3.5">
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-bold text-foreground text-base truncate">{restaurant.name}</h3>
        <span className={`shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-bold text-primary-foreground ${
          restaurant.rating >= 4 ? "bg-zomato-green" : restaurant.rating >= 3 ? "bg-zomato-gold" : "bg-zomato-orange"
        }`}>
          {restaurant.rating} <Star className="h-2.5 w-2.5 fill-current" />
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
        <span className="truncate">{restaurant.cuisines.join(", ")}</span>
        <span className="shrink-0 ml-2">₹{restaurant.priceForTwo} for two</span>
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> {restaurant.deliveryTime}
        </span>
        {restaurant.veg && (
          <span className="flex items-center gap-1 text-zomato-green">
            <Leaf className="h-3 w-3" /> Pure Veg
          </span>
        )}
      </div>
    </div>
  </article>
);

export default RestaurantCard;
