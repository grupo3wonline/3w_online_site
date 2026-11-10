
import { GradientGenerator } from "@/components/GradientGenerator";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <GradientGenerator />
      </div>
      <Features />
    </div>
  );
};

export default Index;
