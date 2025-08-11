import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import fynxxLogo from "../assets/fynxxlogo.png";

export const Footer = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative py-16 border-t border-border">
      <div className="absolute inset-0 bg-gradient-primary" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-4 gap-8"
        >
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={fynxxLogo} 
                alt="Fynxx" 
                className="h-8 w-auto filter"
              />
              <span className="font-display text-2xl font-bold text-foreground">
                FYNX
              </span>
            </div>
            <p className="font-body text-muted-foreground mb-6 max-w-md leading-relaxed">
              Empowering micro-influencers to turn their creativity into sustainable income 
              through authentic brand partnerships and social currency.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <motion.a
                href="https://instagram.com/getfynx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center text-foreground hover:text-background transition-colors duration-300"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
              
              <motion.a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center text-foreground hover:text-background transition-colors duration-300"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['How It Works', 'Creator Benefits', 'FAQ', 'Join Waitlist'].map((link, index) => (
                <li key={index}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="font-body text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:team@getfynxx.in"
                  className="font-body text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  team@getfynxx.in
                </a>
              </li>
              <li>
                <span className="font-body text-muted-foreground">
                  Beta launching Q2 2025
                </span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="font-body text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} FYNX. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a 
              href="/terms"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Terms & Conditions
            </a>
            <a 
              href="/privacy"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Privacy Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};