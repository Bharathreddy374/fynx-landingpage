import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
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
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platform: '',
    instagramFollowers: '',
    youtubeSubscribers: '',
    instagramUsername: '', // New field for Instagram ID
    youtubeChannelName: ''  // New field for YouTube channel
  });

  useEffect(() => {
    if (showForm) {
      const timer = setTimeout(() => {
        document.getElementById('waitlist')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [showForm]);

  // Reset fields when platform changes
  useEffect(() => {
    if (formData.platform === 'instagram') {
      setFormData(prev => ({ 
        ...prev, 
        youtubeSubscribers: '',
        youtubeChannelName: ''
      }));
    } else if (formData.platform === 'youtube') {
      setFormData(prev => ({ 
        ...prev, 
        instagramFollowers: '',
        instagramUsername: ''
      }));
    }
  }, [formData.platform]);

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

    // Validate Instagram fields
    if (formData.platform === 'instagram' && (!formData.instagramFollowers || !formData.instagramUsername)) {
      toast({
        title: "Instagram details required",
        description: "Please enter your Instagram username and follower count.",
        variant: "destructive"
      });
      return;
    }

    // Validate YouTube fields
    if (formData.platform === 'youtube' && (!formData.youtubeSubscribers || !formData.youtubeChannelName)) {
      toast({
        title: "YouTube details required",
        description: "Please enter your YouTube channel name and subscriber count.",
        variant: "destructive"
      });
      return;
    }

    // Validate both platforms
    if (formData.platform === 'both' && (
      !formData.instagramFollowers || !formData.instagramUsername ||
      !formData.youtubeSubscribers || !formData.youtubeChannelName
    )) {
      toast({
        title: "All platform details required",
        description: "Please fill in all Instagram and YouTube details.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
      title: "🚀 Processing your application...",
      description: "Adding you to our exclusive creator waitlist!",
      duration: 3000
    });

      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 }
});
setTimeout(() => {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { x: 0.25, y: 0.6 }
  });
}, 200);
setTimeout(() => {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { x: 0.75, y: 0.6 }
  });
}, 400);
      toast({
      title: "🎉 You're In! Welcome to Fynxx!",
      description: `${formData.name}, you're now part of an exclusive group of ${
        formData.platform === 'instagram' ? 'Instagram creators' : 
        formData.platform === 'youtube' ? 'YouTube creators' : 
        'multi-platform creators'
      } ready to revolutionize content monetization!`,
      duration: 10000
    });

    // Follow-up toast with next steps
    setTimeout(() => {
      toast({
        title: "📧 Check your email!",
        description: "We've sent a welcome message with exclusive creator tips and beta updates.",
        duration: 6000
      });
    }, 2000);
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

  // Format username input (remove @ if user includes it)
  const handleUsernameInput = (field: string, value: string) => {
    const cleanValue = value.replace('@', '');
    handleInputChange(field, cleanValue);
  };

  // Format number with commas
  const formatNumber = (value: string) => {
    const number = value.replace(/,/g, '');
    if (!isNaN(Number(number)) && number !== '') {
      return Number(number).toLocaleString();
    }
    return value;
  };

  const handleNumberInput = (field: string, value: string) => {
    const cleanValue = value.replace(/[^0-9,]/g, '');
    handleInputChange(field, cleanValue);
  };

  const handleCtaClick = () => {
    setShowForm(true);
  };

  // Render platform-specific inputs
  const renderPlatformInputs = () => {
    if (!formData.platform) return null;

    return (
      <div className="space-y-6">
        {/* Instagram Section */}
        {(formData.platform === 'instagram' || formData.platform === 'both') && (
          <div className="space-y-4 p-4 glass-effect rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <div className="text-xl">📸</div>
              <h4 className="font-heading font-semibold text-foreground">Instagram Details</h4>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">
                  Instagram Username *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground font-body text-sm">
                    @
                  </span>
                  <Input
                    type="text"
                    placeholder="yourhandle"
                    value={formData.instagramUsername}
                    onChange={(e) => handleUsernameInput('instagramUsername', e.target.value)}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground pl-8"
                    required={formData.platform === 'instagram' || formData.platform === 'both'}
                  />
                </div>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Your Instagram username (without @)
                </p>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">
                  Instagram Followers *
                </label>
                <Input
                  type="text"
                  placeholder="e.g., 10,500"
                  value={formData.instagramFollowers}
                  onChange={(e) => handleNumberInput('instagramFollowers', e.target.value)}
                  onBlur={(e) => handleInputChange('instagramFollowers', formatNumber(e.target.value))}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  required={formData.platform === 'instagram' || formData.platform === 'both'}
                />
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Current follower count
                </p>
              </div>
            </div>
          </div>
        )}

        {/* YouTube Section */}
        {(formData.platform === 'youtube' || formData.platform === 'both') && (
          <div className="space-y-4 p-4 glass-effect rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <div className="text-xl">📺</div>
              <h4 className="font-heading font-semibold text-foreground">YouTube Details</h4>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">
                  YouTube Channel Name *
                </label>
                <Input
                  type="text"
                  placeholder="Your Channel Name"
                  value={formData.youtubeChannelName}
                  onChange={(e) => handleInputChange('youtubeChannelName', e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  required={formData.platform === 'youtube' || formData.platform === 'both'}
                />
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Your YouTube channel name or handle
                </p>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-foreground mb-2 block">
                  YouTube Subscribers *
                </label>
                <Input
                  type="text"
                  placeholder="e.g., 2,500"
                  value={formData.youtubeSubscribers}
                  onChange={(e) => handleNumberInput('youtubeSubscribers', e.target.value)}
                  onBlur={(e) => handleInputChange('youtubeSubscribers', formatNumber(e.target.value))}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  required={formData.platform === 'youtube' || formData.platform === 'both'}
                />
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Current subscriber count
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
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
              Welcome to the Revolution, {formData.name}!
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-6">
              You're now on the Fynxx waitlist with {
                formData.platform === 'both' 
                  ? `${formData.instagramFollowers} Instagram followers and ${formData.youtubeSubscribers} YouTube subscribers`
                  : formData.platform === 'instagram'
                  ? `${formData.instagramFollowers} Instagram followers`
                  : `${formData.youtubeSubscribers} YouTube subscribers`
              }. We'll send you early access when we launch.
            </p>
            <div className="glass-effect p-4 rounded-lg mb-6">
              <p className="font-body text-sm text-muted-foreground">
                🔥 You're creator #{Math.floor(Math.random() * 1000) + 1} on our exclusive waitlist!
              </p>
            </div>
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
          
          {!showForm && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8"
            >
              <div className="glass-effect p-8 rounded-2xl max-w-2xl mx-auto">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Start Earning Today
                </h3>
                <p className="font-body text-muted-foreground mb-6">
                  Join our exclusive beta program and be among the first creators to access Fynxx's revolutionary platform.
                </p>
                <motion.button
                  onClick={handleCtaClick}
                  className="btn-glow font-body font-semibold px-8 py-3 text-foreground hover:text-background"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Beta Program
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <Card className="card-animated p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
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

                {/* Platform Selection */}
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

                {/* Platform-specific inputs */}
                {renderPlatformInputs()}

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
        )}

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
        )}
      </div>
    </section>
  );
};
