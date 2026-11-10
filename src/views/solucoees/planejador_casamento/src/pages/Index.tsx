import { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { EnhancedWeddingCalculator } from '@/components/EnhancedWeddingCalculator';

const Index = () => {
  const [showCalculator, setShowCalculator] = useState(false);

  if (showCalculator) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <EnhancedWeddingCalculator 
            onBackToLanding={() => setShowCalculator(false)} 
          />
        </div>
      </div>
    );
  }

  return (
    <LandingPage 
      onStartCalculator={() => setShowCalculator(true)} 
    />
  );
};

export default Index;
