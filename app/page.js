// Home.js
import HeroSection from "@/components/publicComponents/HomePackComponents/HeroSection";
import FeaturesSection from "@/components/publicComponents/HomePackComponents/FeatureSection";
import TrustSection from "@/components/publicComponents/HomePackComponents/TrustSection";

export default function Home() {
  return (
    <main className="min-h-screen text-white flex flex-col items-center px-2">
      <div className="w-full max-w-6xl flex flex-col gap-12">
        <HeroSection />
        <FeaturesSection />
        <TrustSection />
      </div>
    </main>
  );
}
