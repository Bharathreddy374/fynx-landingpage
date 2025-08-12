import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import fynxxLogo from '@/assets/fynxxlogo.png';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { href: 'how-it-works', label: 'How It Works' },
    { href: 'benefits', label: 'Benefits' },
    { href: 'faq', label: 'FAQ' },
  ];

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
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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

          {isMobile ? (
            // Mobile Menu
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-6 pt-12">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        onClick={() => scrollToSection(link.href)}
                        className="font-body text-lg text-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                     <Button
                        onClick={() => scrollToSection('waitlist')}
                        className="btn-glow font-body font-semibold px-6 py-2 text-foreground hover:text-background w-full mt-4"
                      >
                        Join Waitlist
                      </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            // Desktop Menu
            <>
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => (
                   <a 
                     key={link.href}
                     onClick={() => scrollToSection(link.href)}
                     className="font-body text-foreground hover:text-muted-foreground transition-colors duration-300 cursor-pointer"
                   >
                     {link.label}
                   </a>
                ))}
              </div>

              <Button
                onClick={() => scrollToSection('waitlist')}
                className="btn-glow font-body font-semibold px-6 py-2 text-foreground hover:text-background"
              >
                Join Waitlist
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
