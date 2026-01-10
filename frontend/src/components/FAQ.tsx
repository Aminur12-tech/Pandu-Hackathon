import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who can participate?",
    answer:
      "Hackathon is open to all students, professionals, and enthusiasts aged 18 and above. Whether you're a seasoned developer or just starting out, everyone is welcome!",
  },
  {
    question: "Do I need a team?",
    answer:
      "You can participate solo or in a team of up to 4 members.",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring your laptop, charger, and any hardware you want to hack with. We'll provide food, drinks, WiFi, power outlets, and a comfortable hacking environment.",
  },
  {
    question: "Is it free to participate?",
    answer:
      "No! Hackathon is charge 300 rupees for a team. We cover meals, swag, and everything you need for an amazing hackathon experience.",
  },
  {
    question: "What can I build?",
    answer:
      "You can build anything within our four tracks: AI & Machine Learning, Cybersecurity, Sustainability, or Health & Wellness.",
  },
  {
    question: "How are projects judged?",
    answer:
      "Projects are evaluated based on innovation, technical complexity, design, and real-world impact. Our panel of judges includes industry experts and mentors.",
  },
];

export const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest mb-4 block">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            <span className="text-foreground">Frequently Asked</span>{" "}
            <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
