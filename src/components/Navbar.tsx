import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import fynxxLogo from '@/assets/fynxxlogo.png';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    waitlistSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-glow' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={fynxxLogo} 
              alt="Fynxx" 
              className="h-8 w-auto filter"
            />
            <span className="font-display text-2xl font-bold text-foreground">
              FYNX
            </span>
          </motion.div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#how-it-works" 
              className="font-body text-foreground hover:text-muted-foreground transition-colors duration-300"
            >
              How It Works
            </a>
            <a 
              href="#benefits" 
              className="font-body text-foreground hover:text-muted-foreground transition-colors duration-300"
            >
              Benefits
            </a>
            <a 
              href="#faq" 
              className="font-body text-foreground hover:text-muted-foreground transition-colors duration-300"
            >
              FAQ
            </a>
          </div>

          {/* CTA Button */}
          <Button
            onClick={scrollToWaitlist}
            className="btn-glow font-body font-semibold px-6 py-2 text-foreground hover:text-background"
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};