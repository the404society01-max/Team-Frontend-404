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
import AIRecommendations from "@/components/zomato/AIRecommendations";
import GroupOrdering from "@/components/zomato/GroupOrdering";
import ScheduledOrder from "@/components/zomato/ScheduledOrder";
import SustainabilityTracker from "@/components/zomato/SustainabilityTracker";
import ARPreview from "@/components/zomato/ARPreview";
import VIPMembership from "@/components/zomato/VIPMembership";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [vegMode, setVegMode] = useState(false);

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
        vegMode={vegMode}
        onToggleVeg={() => setVegMode(!vegMode)}
      />

      <HeroBanner searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <CategoryChips onCategoryClick={setActiveCategory} activeCategory={activeCategory} />

      {/* 2026: AI Recommendations */}
      <AIRecommendations />

      {/* Flash Deals & Daily Offers */}
      <FlashDeals />

      <TrendingSection />

      {/* 2026: Group Order & Schedule */}
      <section className="py-4">
        <div className="container mx-auto flex flex-wrap gap-3">
          <GroupOrdering />
          <ScheduledOrder />
        </div>
      </section>

      <RestaurantGrid
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        onRestaurantClick={setSelectedRestaurant}
        vegMode={vegMode}
      />

      {/* 2026: AR Menu Preview */}
      <ARPreview />

      {/* Live Order Tracking */}
      <OrderTracking />

      {/* Customer Reviews */}
      <ReviewsSection />

      {/* 2026: Sustainability */}
      <SustainabilityTracker />

      {/* 2026: VIP Membership */}
      <VIPMembership />

      {/* Loyalty Program */}
      <LoyaltyProgram />

      {/* Restaurant Map */}
      <MapSection />

      <ZomatoFooter />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Modals & Drawers */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <RestaurantModal restaurant={selectedRestaurant} onClose={() => setSelectedRestaurant(null)} />
    </div>
  );
};

export default Index;
