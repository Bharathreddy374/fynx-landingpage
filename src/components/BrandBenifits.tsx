import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import brandbenifitsImage from '@/assets/brand-benifits.jpg';

import { TrendingUp, Shield, Clock, Users } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: "Higher Earnings",
    description: "Earn 2-5x more than traditional affiliate marketing with our premium brand partnerships.",
    metric: "Average 3.2x increase"
  },
  {
    icon: Shield,
    title: "Verified Brands",
    description: "Work exclusively with vetted, premium brands that align with your values and audience.",
    metric: "100+ Partner Brands"
  },
  {
    icon: Clock,
    title: "Instant Payouts",
    description: "Get paid immediately when your content drives results. No waiting for monthly cycles.",
    metric: "Same-day payments"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join an exclusive community of successful creators sharing strategies and tips.",
    metric: "10,000+ Members"
  }
];

const BrandBenefits = () => {
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
            Creator Benefits
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto subheading">
            Why top micro-influencers choose Fynxx to monetize their content and grow their income
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
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

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { value: "₹25,000", label: "Avg Monthly Earnings" },
            { value: "4.8/5", label: "Creator Satisfaction" },
            { value: "48hrs", label: "Avg Campaign Setup" },
            { value: "95%", label: "Payout Success Rate" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-secondary/20 border border-border"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2 glow-text" style={{ fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground subheading">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandBenefits;