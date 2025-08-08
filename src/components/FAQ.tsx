import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: "What makes Fynxx different from other influencer platforms?",
    answer: "Fynxx focuses specifically on micro-influencers and provides instant cashback rewards rather than traditional payment models. We emphasize authentic partnerships and give creators complete creative control over their content."
  },
  {
    question: "How much can I earn with Fynxx?",
    answer: "Earnings vary based on your engagement rates, follower count, and the brands you partner with. Our creators typically earn 5-15% cashback on brand partnerships, with top performers earning even more through bonus programs."
  },
  {
    question: "What are the requirements to join Fynxx?",
    answer: "We welcome micro-influencers with authentic engagement on Instagram or YouTube. While there's no strict follower minimum, we look for creators who produce quality content and have genuine audience interaction."
  },
  {
    question: "How does the cashback system work?",
    answer: "You earn cashback when you post content featuring partner brands and hit specific engagement milestones. Payments are processed automatically and can be withdrawn to your preferred payment method within 48 hours."
  },
  {
    question: "Can I choose which brands to work with?",
    answer: "Absolutely! You have complete control over which brand partnerships you accept. We provide detailed brand profiles so you can choose partnerships that align with your values and aesthetic."
  },
  {
    question: "When will Fynxx be available?",
    answer: "We're currently in beta development and expect to launch publicly in Q2 2024. Waitlist members will receive early access and exclusive launch perks."
  }
];

export const FAQ = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section id="faq" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-accent" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-xl text-muted-foreground">
            Everything you need to know about Fynxx and our creator program
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="glass-effect rounded-lg px-6 border-border"
                >
                  <AccordionTrigger className="font-heading text-left text-lg font-semibold text-foreground hover:text-muted-foreground py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-effect p-8 rounded-2xl">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Still have questions?
            </h3>
            <p className="font-body text-muted-foreground mb-6">
              Our team is here to help. Reach out and we'll get back to you within 24 hours.
            </p>
            <a 
              href="mailto:contact@fynxx.in"
              className="btn-glow inline-block font-body font-semibold px-8 py-3 text-foreground hover:text-background rounded-lg"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};