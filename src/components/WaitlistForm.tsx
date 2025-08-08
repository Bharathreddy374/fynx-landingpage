import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const WaitlistForm = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platform: '',
    followers: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.platform) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and platform are required to join the waitlist.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast({
        title: "🎉 You're on the list!",
        description: "We'll notify you when Fynxx launches. Get ready to monetize your creativity!",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <section id="waitlist" ref={ref} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="card-animated p-12">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                Welcome to the Revolution!
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6">
                You're now on the Fynxx waitlist. We'll send you early access when we launch.
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Follow us on social media for updates and creator tips.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Join the Waitlist
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Be among the first creators to experience Fynxx. Limited spots available for our exclusive beta launch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="card-animated p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-2 block">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-2 block">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    placeholder="creator@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-2 block">
                    Primary Platform *
                  </label>
                  <Select onValueChange={(value) => handleInputChange('platform', value)}>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select your platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="both">Both Platforms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-2 block">
                    Follower Count
                  </label>
                  <Select onValueChange={(value) => handleInputChange('followers', value)}>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1k-5k">1K - 5K</SelectItem>
                      <SelectItem value="5k-10k">5K - 10K</SelectItem>
                      <SelectItem value="10k-50k">10K - 50K</SelectItem>
                      <SelectItem value="50k+">50K+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-glow font-body font-bold py-4 text-lg text-foreground hover:text-background disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                      <span>Joining Waitlist...</span>
                    </div>
                  ) : (
                    'Join the Revolution'
                  )}
                </Button>
              </div>

              <p className="font-body text-xs text-muted-foreground text-center">
                By joining, you agree to receive updates about Fynxx. Unsubscribe anytime.
              </p>
            </form>
          </Card>
        </motion.div>

        {/* Benefits Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {[
            { icon: '⚡', title: 'Early Access', desc: 'Be first to use Fynxx' },
            { icon: '🎁', title: 'Exclusive Perks', desc: 'Special launch bonuses' },
            { icon: '💎', title: 'VIP Support', desc: 'Priority customer service' }
          ].map((benefit, index) => (
            <div key={index} className="glass-effect p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h4 className="font-heading font-semibold text-foreground mb-2">{benefit.title}</h4>
              <p className="font-body text-sm text-muted-foreground">{benefit.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};