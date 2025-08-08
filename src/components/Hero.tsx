import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HeroBackground } from './HeroBackground';
import { useInView } from 'react-intersection-observer';
import creatorHero from '@/assets/creator-hero.jpg';

export const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    waitlistSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: `url(${creatorHero})`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 " />
        <HeroBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <motion.h1 
            className="font-display text-5xl md:text-7xl font-bold text-foreground text-glow-strong leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Turn Your Content Into{' '}
            <span className="gradient-text">Cash</span>
          </motion.h1>
          
          <motion.p 
            className="font-body text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            The social currency platform that empowers micro-influencers to earn cashback 
            by posting authentic content from premium brands.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              onClick={scrollToWaitlist}
              size="lg"
              className="btn-glow loop-border font-body font-bold px-8 py-4 text-lg text-foreground hover:text-background animate-glow-pulse"
            >
              Join the Revolution
            </Button>
            
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-body text-sm">Coming Soon</span>
              </div>
            </div>
          </motion.div>

          {/* Platform Support */}
          <motion.div 
            className="flex items-center justify-center space-x-8 pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
              <span className="font-body text-sm text-foreground">Instagram</span>
            </div>
            <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full">
              <div className="w-6 h-6 bg-red-500 rounded"></div>
              <span className="font-body text-sm text-foreground">YouTube</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-foreground rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};