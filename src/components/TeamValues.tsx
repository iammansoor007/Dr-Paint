import { useRef, useEffect, useState, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ownerImg from "@/assets/drpaintowner.webp";
import completeData from "../src/data/completeData.json";
import { FiLinkedin, FiMail, FiCheck, FiAward, FiStar } from "react-icons/fi";
import { RiShieldFlashLine, RiDoubleQuotesL } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const Images = {
  Pattern:
    "https://images.unsplash.com/photo-1502691876148-a84978e59af8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  Studio:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
};

const ParallaxLayer = ({
  children,
  speed = 0.1,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`absolute inset-0 will-change-transform translate-z-0 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CeoPortrait = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const { ceo: ceoData } = completeData.leadership;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Glow behind the portrait */}
        <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000" />

        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-border ring-1 ring-primary/5">
          <motion.img
            src={ownerImg}
            alt={ceoData.alt}
            className="w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-[850px] object-cover transition-all duration-1000"
            style={{
              scale: isHovered ? 1.05 : 1,
              filter: isHovered ? "brightness(1.05)" : "brightness(1)",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />

          {/* Animated border lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none p-6">
            <motion.rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="32"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Floating Badges */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute -top-4 -left-2 sm:-top-6 sm:-left-6 z-20 scale-90 sm:scale-100"
        >
          <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl shadow-2xl border border-border flex items-center gap-2 sm:gap-3 group/badge">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center group-hover/badge:bg-primary transition-colors duration-500">
              <RiShieldFlashLine className="text-primary group-hover/badge:text-white text-lg sm:text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">Founder</span>
              <span className="text-xs sm:text-sm font-bold text-foreground">{ceoData.badges.top}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-8 z-20 scale-90 sm:scale-100"
        >
          <div className="bg-white/95 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl border border-border flex items-center gap-3 sm:gap-4 group/badge2">
            <div className="flex flex-col text-right">
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">Experience</span>
              <span className="text-xs sm:text-sm font-bold text-foreground">Since 2014</span>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover/badge2:scale-110 transition-transform">
              <FiAward className="text-white text-xl sm:text-2xl" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Leadership = () => {
  const sectionRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  const { section, ceo } = completeData.leadership;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".leadership-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isClient]);

  if (!isClient) return null;

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-16 md:py-24 lg:py-32 overflow-hidden isolate"
    >
      {/* Dynamic Background Elements - LIGHT MODE VERSION */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* CONTENT COLUMN */}
          <div className="lg:col-span-6 space-y-8 md:space-y-12 order-2 lg:order-1">
            <div className="leadership-reveal space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-full px-3 py-1.5 md:px-4 md:py-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-primary/80">
                  {section.badge}
                </span>
              </div>

              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight uppercase break-words"
                dangerouslySetInnerHTML={{ __html: section.headline }}
              />

              <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium">
                {section.description}
              </p>
            </div>

            <div className="leadership-reveal space-y-6 md:space-y-8 bg-card backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-3xl md:rounded-[2.5rem] border border-border relative overflow-hidden group shadow-xl shadow-primary/5">
              <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <RiDoubleQuotesL className="text-6xl md:text-8xl text-primary" />
              </div>

              <div className="space-y-4 md:space-y-6 relative z-10">
                {ceo.quotes.map((quote: string, idx: number) => (
                  <p
                    key={idx}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight"
                  >
                    "{quote}"
                  </p>
                ))}

                <div className="space-y-3 md:space-y-4">
                  {ceo.description.map((desc: string, idx: number) => (
                    <p
                      key={idx}
                      className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed"
                    >
                      {desc}
                    </p>
                  ))}
                </div>

                <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight uppercase">
                        {ceo.name}
                      </h3>
                      <p className="text-primary font-bold text-[10px] md:text-xs tracking-widest uppercase mt-0.5">
                        {ceo.title}
                      </p>
                    </div>
                    {/* Founder Signature Mockup */}
                    <div className="hidden sm:block">
                      <span className="font-['Italianno',_cursive] text-3xl md:text-4xl text-primary/30 -rotate-6 block select-none">
                        Omar Rivera
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:gap-3">
                    <motion.a
                      href={ceo.social.linkedin}
                      whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary))", color: "white" }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <FiLinkedin className="text-lg md:text-xl" />
                    </motion.a>
                    <motion.a
                      href={`mailto:${ceo.social.email}`}
                      whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary))", color: "white" }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary transition-all duration-300"
                      aria-label="Email"
                    >
                      <FiMail className="text-lg md:text-xl" />
                    </motion.a>
                    <div className="hidden sm:block h-8 w-[1px] bg-border mx-2" />
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <FiStar className="text-yellow-500 fill-yellow-500 text-sm md:text-base" />
                      <span className="text-foreground font-bold text-xs md:text-sm">200+ Reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PORTRAIT COLUMN */}
          <div className="lg:col-span-6 order-1 lg:order-2 leadership-reveal px-4 sm:px-0">
            <CeoPortrait />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Leadership;

