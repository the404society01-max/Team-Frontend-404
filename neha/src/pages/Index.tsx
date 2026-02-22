import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DestinationsSection from "@/components/DestinationsSection";
import PackagesSection from "@/components/PackagesSection";
import ServicesSection from "@/components/ServicesSection";
import WorldMapSection from "@/components/WorldMapSection";
import TravelTipsSection from "@/components/TravelTipsSection";
import WeatherSection from "@/components/WeatherSection";
import CurrencyConverterSection from "@/components/CurrencyConverterSection";
import PhilosophySection from "@/components/PhilosophySection";
import FAQSection from "@/components/FAQSection";
import ReviewsSection from "@/components/ReviewsSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  // Always scroll to top (destinations) when navigating to home
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DestinationsSection />
      <PackagesSection />
      <WorldMapSection />
      <ServicesSection />
      <TravelTipsSection />
      <WeatherSection />
      <CurrencyConverterSection />
      <PhilosophySection />
      <FAQSection />
      <ReviewsSection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
