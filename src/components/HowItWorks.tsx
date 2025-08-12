import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Search, Edit3, DollarSign } from 'lucide-react';
import howItWorksImage from '@/assets/how-it-works.jpg';
import { useIsMobile } from "@/hooks/use-mobile";

const steps = [
  {
    icon: Search,
    title: "Discover Brands",
    description: "Browse premium brand campaigns that match your niche and audience.",
    step: "01"
  },
  {
    icon: Edit3,
    title: "Create Content",
    description: "Craft authentic posts featuring brand products with your unique style.",
    step: "02"
  },
  {
    icon: DollarSign,
    title: "Earn Cashback",
    description: "Get paid real money for every engagement and conversion you drive.",
    step: "03"
  }
];

const HowItWorks = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 glow-text" style={{ fontFamily: 'var(--font-heading)' }}>
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto subheading">
            Join thousands of creators already earning with FYNX's simple three-step process
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="magnetic-card animated-border p-6 hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
                          <step.icon className="h-8 w-8 text-foreground" />
                        </div>
                        <div className="text-4xl font-bold text-muted-foreground/30" style={{ fontFamily: 'var(--font-heading)' }}>
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 subheading">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Image - Conditionally render for desktop only */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={howItWorksImage}
                  alt="Creator working with FYNX"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                
                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="absolute top-6 right-6 bg-card/90 backdrop-blur-lg border border-border rounded-2xl p-4"
                >
                  <div className="text-2xl font-bold text-green-400">+247%</div>
                  <div className="text-sm text-muted-foreground">Avg. Earnings</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-lg border border-border rounded-2xl p-4"
                >
                  <div className="text-2xl font-bold text-blue-400">10k+</div>
                  <div className="text-sm text-muted-foreground">Active Creators</div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
