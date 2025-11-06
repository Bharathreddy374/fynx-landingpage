import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CreatorBenefits } from '@/components/CreatorBenefits';
import { WaitlistForm } from '@/components/WaitlistForm';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';
import BrandBenefits from '@/components/BrandBenifits';

const Index = () => {
  useEffect(() => {
    // Add dark class to html element for consistent dark theme
    document.documentElement.classList.add('dark');
    
    // Hide default cursor
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Custom Cursor */}
      
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Creator Benefits */}
      <CreatorBenefits />

      <BrandBenefits />

      
      {/* Waitlist Form */}
      <WaitlistForm />
      
      {/* FAQ */}
      <FAQ />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
