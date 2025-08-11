import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import creatorBenefits from '@/assets/creator-benefits.jpg';

const benefits = [
  {
    title: "Authentic Partnerships",
    description: "Work with brands that match your values and aesthetic, ensuring genuine content creation.",
    icon: "🤝",
    stat: "95% Creator Satisfaction"
  },
  {
    title: "Instant Cashback",
    description: "Receive immediate cashback rewards for every post, story, and engagement milestone you hit.",
    icon: "⚡",
    stat: "Up to 15% Cashback"
  },
  {
    title: "Creative Freedom", 
    description: "Maintain your unique voice and style while promoting products you genuinely love.",
    icon: "🎨",
    stat: "100% Creative Control"
  },
  {
    title: "Performance Analytics",
    description: "Track your earnings, engagement rates, and audience growth with detailed insights.",
    icon: "📊",
    stat: "Real-time Data"
  }
];

export const CreatorBenefits = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section id="benefits" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${creatorBenefits})` }}
        />
        <div className="absolute inset-0 bg-gradient-primary" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
              Why Creators Relay On{' '}
              <span className="gradient-text">FYNX</span>
            </h2>
            
            <p className="font-body text-xl text-muted-foreground mb-12 leading-relaxed">
              Join thousands of micro-influencers who have transformed their social media 
              presence into a sustainable income stream through authentic brand partnerships.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 glass-effect rounded-lg flex items-center justify-center text-2xl">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="font-body text-muted-foreground mb-2">
                      {benefit.description}
                    </p>
                    <span className="font-body text-sm text-accent-foreground font-semibold">
                      {benefit.stat}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative animated-border"
              >
                <Card className="card-animated p-6 text-center h-full">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h4>
                  <div className="text-2xl font-bold text-accent-foreground">
                    {benefit.stat}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};