import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import brandbenifitsImage from '@/assets/brand-benifits.jpg';
import { useIsMobile } from "@/hooks/use-mobile";

import { TrendingUp, Shield, Clock, Users } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: "You Pay Only for Results",
    description: "Rewards go out only after someone buys and posts — no wasted marketing budget.",
    metric: "Average 3.2x increase"
  },
  {
    icon: Shield,
    title: "Free Social Content for Your Brand",
    description: "Customers create authentic posts you can reuse endlessly.",
    metric: "1K+ Creator Partners"
  },
  {
    icon: Clock,
    title: "Reach People Who Actually Care",
    description: "Real customer posts reach friends and followers, not random viewers.",
    metric: ""
  },
  {
    icon: Users,
    title: "Keeps Customers Coming Back",
    description: "Rewards turn one-time shoppers into loyal repeat buyers.",
    metric: "10,000+ Members"
  }
];

const BrandBenefits = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 glow-text" style={{ fontFamily: 'var(--font-heading)' }}>
            Why brands rely on Fynx
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto subheading">
            Real People, Real Recommendations. Instead of fake ads, your customers genuinely talk about your brand on their own social media.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image - Conditionally render for desktop only */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={brandbenifitsImage}
                  alt="Creators collaborating"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
              </div>
            </motion.div>
          )}

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="magnetic-card animated-border h-full p-6 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0 space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 subheading">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {benefit.description}
                      </p>
                      <div className="text-sm font-semibold text-primary">
                        {benefit.metric}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandBenefits;
