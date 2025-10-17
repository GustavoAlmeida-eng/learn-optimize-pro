import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import Features from "@/components/Features";
import PricingPlans from "@/components/PricingPlans";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <VideoSection />
      <Features />
      <PricingPlans />
      <Footer />
    </div>
  );
};

export default Index;
