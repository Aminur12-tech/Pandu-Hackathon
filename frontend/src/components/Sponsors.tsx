import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const sponsorTiers = [
  {
    tier: "",
    sponsors: [
      { name: "TechCorp", logo: "TC" },
      { name: "InnovateLabs", logo: "IL" },
    ],
  },
];

export const Sponsors = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-secondary text-sm font-medium uppercase tracking-widest mb-4 block">
            Our Partners
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            <span className="text-foreground">Backed by</span>{" "}
            <span className="gradient-text">Industry Leaders</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {sponsorTiers.map((tier, tierIndex) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: tierIndex * 0.15 }}
            >
              <h3 className="text-center text-muted-foreground text-sm uppercase tracking-widest mb-6">
                {tier.tier} Sponsors
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {tier.sponsors.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: tierIndex * 0.15 + index * 0.05 }}
                    className={`glass-card border border-border/50 hover:border-primary/50 transition-all duration-300 flex items-center justify-center group cursor-pointer ${
                      tier.tier === "Diamond"
                        ? "w-48 h-24"
                        : tier.tier === "Gold"
                        ? "w-40 h-20"
                        : "w-32 h-16"
                    }`}
                  >
                    <span
                      className={`font-display font-bold text-muted-foreground group-hover:text-primary transition-colors ${
                        tier.tier === "Diamond"
                          ? "text-3xl"
                          : tier.tier === "Gold"
                          ? "text-2xl"
                          : "text-xl"
                      }`}
                    >
                      {sponsor.logo}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-muted-foreground mt-12"
        >
          Interested in sponsoring?{" "}
          <a href="#" className="text-primary hover:underline">
            Contact us
          </a>
        </motion.p>
      </div>
    </section>
  );
};
