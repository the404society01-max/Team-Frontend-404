import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import BentoMetrics from "@/components/BentoMetrics";
import BodyMapSection from "@/components/BodyMapSection";
import DoctorCards from "@/components/DoctorCards";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <SectionDivider color="lavender" />
      <BentoMetrics />
      <SectionDivider color="blush" flip />
      <SectionDivider color="blush" />
      <BodyMapSection />
      <SectionDivider color="background" flip />
      <DoctorCards />
      <SectionDivider color="mint" />
      <BookingSection />
      <Footer />
    </div>
  );
};

export default Index;
