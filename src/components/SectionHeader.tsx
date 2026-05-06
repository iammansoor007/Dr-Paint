import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge: string;
  headline: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeader = ({
  badge,
  headline,
  description,
  centered = true,
  className = "",
}: SectionHeaderProps) => {
  return (
    <div
      className={`max-w-4xl mx-auto ${centered ? "text-center" : "text-left"} mb-12 md:mb-16 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-3 block">
          {badge}
        </span>
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
        {description && (
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div
          className={`w-16 h-1 bg-gradient-to-r from-primary to-primary/60 mt-6 rounded-full ${centered ? "mx-auto" : ""}`}
        />
      </motion.div>
    </div>
  );
};

export default SectionHeader;
