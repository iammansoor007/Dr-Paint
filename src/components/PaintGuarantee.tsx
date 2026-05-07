import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShieldCheck, ArrowRight, Star, CheckCircle2, Sparkles } from "lucide-react";

/* ── Animated Counter ─────────────────────────────────── */
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const duration = 1600;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
};

/* ── Guarantee Feature Card ───────────────────────────── */
const FeatureCard = ({
  icon,
  title,
  body,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    className="group flex gap-4 p-4 sm:p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-400"
  >
    <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="font-bold text-foreground text-sm sm:text-[15px] leading-snug mb-1">{title}</p>
      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{body}</p>
    </div>
  </motion.div>
);

/* ── Main ─────────────────────────────────────────────── */
const PaintGuarantee = () => {
  const stats = [
    { target: 95,  suffix: "%",  label: "Satisfaction" },
    { target: 200, suffix: "+",  label: "5-Star Reviews" },
    { target: 5,   suffix: "yr", label: "Warranty" },
  ];

  const cards = [
    {
      icon: <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Free Paint — No Conditions",
      body: "If our work doesn't satisfy you, we cover the full cost of your paint. Zero fine print.",
      delay: 0.05,
    },
    {
      icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "5-Year Workmanship Warranty",
      body: "Every project backed by a five-year labor and materials guarantee.",
      delay: 0.12,
    },
    {
      icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Military-Grade Precision",
      body: "Veteran-owned and operated. Discipline and integrity in every brushstroke.",
      delay: 0.19,
    },
  ];

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Top accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[420px] h-[420px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 right-0 w-[320px] h-[320px] bg-primary/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10 sm:mb-14"
        >
          <div className="w-6 sm:w-8 h-[2px] bg-primary rounded-full flex-shrink-0" />
          <span className="text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] sm:tracking-[0.45em]">
            Our Promise
          </span>
        </motion.div>

        {/* ── Two-column grid — stacks on mobile ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Headline + body + stats + CTA ── */}
          <div className="space-y-8 sm:space-y-10">

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <h2 className="text-[2.6rem] leading-[0.9] xs:text-[3.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-foreground break-words">
                Free<br />
                <span className="text-primary italic">Paint</span><br />
                Guarantee
              </h2>
              <div className="w-14 sm:w-16 h-1.5 bg-primary rounded-full" />
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
                Dr. Paint has a{" "}
                <strong className="text-foreground font-bold">95% customer satisfaction rating</strong>{" "}
                and a FREE paint guarantee — because every promise we make is kept.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-md">
                If our best efforts haven't fully satisfied you,{" "}
                <strong className="text-primary">the cost of your paint is completely on us.</strong>
              </p>
            </motion.div>

            {/* Stat counters */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="grid grid-cols-3 gap-2 sm:gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 text-center"
                >
                  <p className="text-xl sm:text-3xl md:text-4xl font-bold text-primary leading-none mb-1 sm:mb-2">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </p>
                  <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-muted-foreground leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              {/* Primary CTA */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-primary text-white font-bold rounded-2xl px-6 sm:px-10 py-4 sm:py-5 text-sm sm:text-base shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 w-full sm:w-auto"
              >
                {/* Shimmer overlay */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
                <span className="relative z-10 flex items-center gap-3">
                  Get Your Free Estimate
                  <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </span>
                </span>
              </motion.a>

              {/* Ghost CTA */}
              <motion.a
                href="tel:+13862467999"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-3 bg-white text-foreground font-bold rounded-2xl px-6 sm:px-10 py-4 sm:py-5 text-sm sm:text-base border-2 border-border hover:border-primary hover:text-primary shadow-sm hover:shadow-primary/10 transition-all duration-300 w-full sm:w-auto"
              >
                Call Now: (386) 246-7999
              </motion.a>
            </motion.div>
          </div>

          {/* ── RIGHT: Badge + feature cards ── */}
          <div className="space-y-4 sm:space-y-5">

            {/* Shield badge card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-gradient-to-br from-primary to-primary/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden text-white shadow-2xl shadow-primary/25"
            >
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/5 rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-white/15 rounded-xl sm:rounded-2xl border border-white/20 flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-white/65 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-0.5">
                      Veteran Owned
                    </p>
                    <p className="text-white text-xl sm:text-2xl font-bold tracking-tight leading-tight">
                      DR. Paint<br />Guarantee
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-300 fill-yellow-300" />
                      ))}
                      <span className="text-white/65 text-[10px] sm:text-xs font-semibold ml-1.5">
                        200+ Reviews
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-5 sm:pt-6">
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed italic">
                    "We built Dr. Paint on trust, integrity, and military precision.
                    Every project gets our full commitment to excellence."
                  </p>
                  <p className="text-white font-bold text-xs sm:text-sm mt-3 tracking-wide">
                    — Omar Rivera, Founder & CEO
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature cards */}
            <div className="space-y-3">
              {cards.map((card) => (
                <FeatureCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

export default PaintGuarantee;
