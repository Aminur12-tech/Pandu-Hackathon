import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Wifi, Utensils, Gamepad2, Headphones, Gift, Users2 } from "lucide-react";

const highlights = [
  {
    icon: Wifi,
    title: "Free WiFi & Power",
    description: "High-speed connectivity throughout the venue",
  },
  {
    icon: Utensils,
    title: "Food",
    description: "Meal, Snacks, and energy drinks",
  },
  {
    icon: Headphones,
    title: "Expert Mentors",
    description: "1-on-1 guidance from industry leaders",
  },
  {
    icon: Users2,
    title: "Networking",
    description: "Connect with recruiters and founders",
  }
];

export const Highlights = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="highlights" className="py-24 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-secondary text-sm font-medium uppercase tracking-widest mb-4 block">
            What to Expect
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            <span className="text-foreground">Event</span>{" "}
            <span className="gradient-text">Highlights</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We've got everything you need to hack in comfort and style.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="glass-card p-6 border border-border/50 hover:border-secondary/50 transition-all duration-300 h-full flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
