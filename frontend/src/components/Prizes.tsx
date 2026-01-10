import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Award, Medal, Star } from "lucide-react";

const prizes = [
  {
    place: "1st",
    title: "First Prize",
    amount: "₹8,000",
    perks: ["Trophy", "Certificate", "Recognition"],
    icon: Trophy,
    featured: true,
  },
  {
    place: "2nd",
    title: "Second Prize",
    amount: "₹6,000",
    perks: ["Trophy", "Certificate", "Recognition"],
    icon: Award,
    featured: false,
  },
];

export const Prizes = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="prizes" className="py-24 relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            Win Big
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            <span className="gradient-text">₹14,000+</span>{" "}
            <span className="text-foreground">in Prizes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Top projects take home cash prizes, trophies, and certificates.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {prizes.map((prize, index) => (
            <motion.div
              key={prize.title}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity ${
                prize.featured 
                  ? "bg-gradient-to-br from-primary via-secondary to-accent" 
                  : "bg-gradient-to-br from-secondary to-accent"
              }`} />
              
              {/* Circular card */}
              <div
                className={`relative w-48 h-48 md:w-56 md:h-56 rounded-full flex flex-col items-center justify-center text-center border-2 transition-all duration-500 group-hover:scale-105 ${
                  prize.featured
                    ? "border-primary bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-md"
                    : "border-secondary/50 bg-background/80 backdrop-blur-md hover:border-secondary"
                }`}
              >
                <prize.icon
                  className={`w-10 h-10 mb-2 ${
                    prize.featured ? "text-primary" : "text-secondary"
                  }`}
                />
                
                <span className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {prize.place}
                </span>
                
                <p className={`text-xl md:text-2xl font-display font-bold mt-1 ${
                  prize.featured ? "gradient-text" : "text-secondary"
                }`}>
                  {prize.amount}
                </p>
                
                <span className="text-xs text-muted-foreground mt-2">
                  + Trophy & Certificate
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
