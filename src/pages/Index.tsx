import { useState } from "react";
import type { Restaurant } from "@/data/zomatoData";
import ZomatoNavbar from "@/components/zomato/ZomatoNavbar";
import HeroBanner from "@/components/zomato/HeroBanner";
import CategoryChips from "@/components/zomato/CategoryChips";
import RestaurantGrid from "@/components/zomato/RestaurantGrid";
import TrendingSection from "@/components/zomato/TrendingSection";
import FlashDeals from "@/components/zomato/FlashDeals";
import ReviewsSection from "@/components/zomato/ReviewsSection";
import OrderTracking from "@/components/zomato/OrderTracking";
import LoyaltyProgram from "@/components/zomato/LoyaltyProgram";
import MapSection from "@/components/zomato/MapSection";
import WhatsAppButton from "@/components/zomato/WhatsAppButton";
import ZomatoFooter from "@/components/zomato/ZomatoFooter";
import CartDrawer from "@/components/zomato/CartDrawer";
import AuthModal from "@/components/zomato/AuthModal";
import RestaurantModal from "@/components/zomato/RestaurantModal";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background">
      <ZomatoNavbar
        onCartClick={() => setCartOpen(true)}
        onLoginClick={() => setAuthOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        darkMode={darkMode}
        onToggleDark={toggleDark}
      />

      <HeroBanner searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <CategoryChips onCategoryClick={setActiveCategory} activeCategory={activeCategory} />

      {/* NEW: Flash Deals & Daily Offers */}
      <FlashDeals />

      <TrendingSection />

      <RestaurantGrid
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        onRestaurantClick={setSelectedRestaurant}
      />

      {/* NEW: Live Order Tracking */}
      <OrderTracking />

      {/* NEW: Customer Reviews */}
      <ReviewsSection />

      {/* NEW: Loyalty Program */}
      <LoyaltyProgram />

      {/* NEW: Restaurant Map */}
      <MapSection />

      <ZomatoFooter />

      {/* NEW: WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Modals & Drawers */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <RestaurantModal restaurant={selectedRestaurant} onClose={() => setSelectedRestaurant(null)} />
    </div>
  );
};

export default Index;
