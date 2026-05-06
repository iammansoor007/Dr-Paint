import { useRef, useEffect, useState, memo, useMemo, useCallback } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  Variants,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import completeData from "../src/data/completeData.json";
import SectionHeader from "@/components/SectionHeader";
import vectoroverlay from "../assets/vector1.png";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// Types
// ============================================================================

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface CTAButton {
  text: string;
  href: string;
  primary: boolean;
}

interface WhyChooseUsData {
  section: {
    badge: string;
    headline: string;
    description: string;
  };
  features: Feature[];
  cta: {
    title: string;
    description: string;
    buttons: CTAButton[];
  };
}

// ============================================================================
// Icon Components
// ============================================================================

interface IconProps {
  size?: number;
  className?: string;
}

const createIcon = (path: React.ReactNode, defaultSize: number = 24) => {
  return memo(({ size = defaultSize, className = "" }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  ));
};

const Icons = {
  HardHat: createIcon(
    <>
      <path d="M4 14h16v4H4v-4z" />
      <path d="M6 14v-3a6 6 0 0112 0v3" />
      <circle cx="12" cy="8" r="2" />
    </>
  ),

  Shield: createIcon(
    <path d="M12 2L3 7v7c0 5.5 9 8 9 8s9-2.5 9-8V7l-9-5z" />,
    32
  ),

  Award: createIcon(
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M8 14l-2 6 6-2 6 2-2-6" />
    </>,
    32
  ),

  Clock: createIcon(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>,
    32
  ),

  Users: createIcon(
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>,
    32
  ),

  Star: createIcon(
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
    32
  ),

  Check: createIcon(
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-5" />
    </>,
    32
  ),

  ArrowRight: createIcon(
    <path d="M5 12h14M12 5l7 7-7 7" />,
    18
  ),

  Sparkle: createIcon(
    <>
      <path d="M12 3L14 8L19 10L14 12L12 17L10 12L5 10L10 8L12 3Z" />
      <path d="M19 3L20 5L22 6L20 7L19 9L18 7L16 6L18 5L19 3Z" />
    </>,
    20
  ),
};

// ============================================================================
// Constants
// ============================================================================

const ICON_MAP: Record<string, React.ComponentType<IconProps>> = {
  Experience: Icons.Clock,
  Honest: Icons.Shield,
  Materials: Icons.Award,
  Communication: Icons.Users,
  Shield: Icons.Shield,
  Certified: Icons.Check,
};

const ANIMATION_VARIANTS: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  float: {
    initial: { y: 0, opacity: 1 },
    animate: {
      y: [0, -10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        },
      },
    },
  },
  cardReveal: {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    },
  },
};

// ============================================================================
// Premium Feature Card Component
// ============================================================================

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = memo(({ feature, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), springConfig);
  const z = useSpring(useTransform(mouseY, [0, 1], [0, 8]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFocused(true);
    }
  }, []);

  const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      setIsFocused(false);
    }
  }, []);

  const isActive = isHovered || isFocused;
  const FeatureIcon = ICON_MAP[feature.icon] || Icons.Star;

  const cardVariants = prefersReducedMotion ? {} : ANIMATION_VARIANTS.cardReveal;
  const animationProps = prefersReducedMotion
    ? {}
    : {
      initial: "hidden",
      animate: inView ? "visible" : "hidden",
      variants: cardVariants,
      transition: { delay: index * 0.1 },
    };

  const transformStyle = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${z}px)`;

  return (
    <motion.div
      ref={cardRef}
      {...animationProps}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      style={{ transformStyle: "preserve-3d", transform: transformStyle }}
      className="group relative h-full cursor-pointer"
      role="article"
      aria-labelledby={`feature-title-${index}`}
      tabIndex={0}
    >
      {/* Glow Effect */}
      <div
        className={`
                    absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/40 via-primary/50 to-primary/60 
                    opacity-0 blur-xl transition-all duration-500
                    ${isActive ? 'opacity-40' : 'group-hover:opacity-20'}
                `}
      />

      {/* Main Card */}
      <div
        className={`
                    relative h-full bg-background rounded-2xl p-8 transition-all duration-300
                    border border-border overflow-hidden
                    ${isActive
            ? 'shadow-2xl border-primary/30'
            : 'shadow-lg hover:shadow-xl'
          }
                `}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated Background Gradient */}
        <div
          className={`
                        absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10
                        opacity-0 transition-opacity duration-700
                        ${isActive ? 'opacity-100' : 'group-hover:opacity-60'}
                    `}
        />

        {/* Decorative Corner Elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-3xl -translate-y-12 translate-x-12 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/5 to-transparent rounded-tr-3xl -translate-x-8 translate-y-8 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" />

        {/* Content */}
        <div className="relative z-10" style={{ transformStyle: "preserve-3d" }}>
          {/* Icon Container */}
          <div className="relative mb-6" style={{ transform: "translateZ(20px)" }}>
            {/* Icon Glow */}
            <div
              className={`
                                absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/60 
                                rounded-2xl blur-xl opacity-0 transition-all duration-500
                                ${isActive ? 'opacity-40 scale-110' : 'group-hover:opacity-30'}
                            `}
            />

            {/* Main Icon Circle */}
            <div
              className={`
                                relative w-16 h-16 rounded-2xl flex items-center justify-center
                                transition-all duration-500 transform-gpu
                                ${isActive
                  ? 'bg-gradient-to-br from-primary to-primary/90 shadow-lg shadow-primary/30 scale-110'
                  : 'bg-gradient-to-br from-primary/5 to-primary/10 group-hover:shadow-md'
                }
                            `}
            >
              {/* Animated Ring */}
              <div
                className={`
                                    absolute inset-0 rounded-2xl border-2 border-primary/30
                                    transition-all duration-700
                                    ${isActive ? 'scale-125 opacity-0' : 'scale-100 opacity-100'}
                                `}
              />

              <div
                className={`
                                    transition-all duration-300 transform-gpu
                                    ${isActive ? 'text-primary-foreground scale-110' : 'text-primary group-hover:scale-105'}
                                `}
              >
                <FeatureIcon size={32} />
              </div>
            </div>

            {/* Sparkle Icon */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-2 -right-2 text-yellow-400"
                style={{ transform: "translateZ(30px)" }}
              >
                <Icons.Sparkle size={20} />
              </motion.div>
            )}
          </div>

          {/* Index Number */}
          <div
            className="text-6xl font-bold text-gray-100 absolute top-4 right-4 select-none"
            style={{ transform: "translateZ(10px)" }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Title */}
          <h3
            id={`feature-title-${index}`}
            className={`
                            text-xl font-bold mb-3 transition-all duration-300
                            ${isActive
                ? 'text-primary translate-x-1'
                : 'text-foreground group-hover:text-foreground/90'
              }
                        `}
            style={{ transform: "translateZ(25px)" }}
          >
            {feature.title}
          </h3>

          {/* Description */}
          <p
            className="text-muted-foreground leading-relaxed text-sm"
            style={{ transform: "translateZ(15px)" }}
          >
            {feature.description}
          </p>

          {/* Learn More Link */}
          <div
            className={`
                            flex items-center gap-2 mt-6 text-primary transition-all duration-300
                            ${isActive ? 'opacity-100 translate-x-2' : 'opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1'}
                        `}
            style={{ transform: "translateZ(30px)" }}
          >
            <span className="text-xs font-bold uppercase tracking-wider">
              Learn More
            </span>
            <Icons.ArrowRight size={16} />
          </div>

          {/* Bottom Gradient Line */}
          <div
            className={`
                            absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/80
                            transition-all duration-500 origin-left
                            ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                        `}
            style={{ transform: "translateZ(20px)" }}
          />
        </div>
      </div>
    </motion.div>
  );
});

FeatureCard.displayName = "FeatureCard";

// ============================================================================
// CTA Section Component
// ============================================================================

interface CTASectionProps {
  cta: WhyChooseUsData['cta'];
}

const CTASection = memo(({ cta }: CTASectionProps) => {
  const prefersReducedMotion = useReducedMotion();

  const floatAnimation = prefersReducedMotion
    ? {}
    : {
      initial: "initial",
      animate: "animate",
      variants: ANIMATION_VARIANTS.float,
    };

  return (
    <div className="relative mt-16 md:mt-24 lg:mt-32">
      {/* CTA Container */}
      <div className="relative rounded-3xl overflow-hidden">
        {/* Cinematic Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/90) 50%, hsl(var(--primary)/80) 100%)"
          }}
        />

        {/* Ambient Glow Effects - Desktop only */}
        <div className="hidden md:block absolute right-[10%] top-[10%] w-[400px] h-[400px] bg-background/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="hidden md:block absolute left-[5%] bottom-[20%] w-[250px] h-[250px] bg-black/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.3))]" />

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16 lg:py-20">

          {/* Desktop Layout - Two columns with floating image */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text Content */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6"
              >
                <span className="px-4 py-2 text-sm font-bold bg-background/10 border border-white/20 rounded-lg text-white backdrop-blur-sm">
                  READY TO BUILD
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] tracking-tight text-white"
                dangerouslySetInnerHTML={{ __html: cta.title }}
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 text-white/80 text-lg max-w-lg"
              >
                {cta.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                {cta.buttons.map((button, idx) => (
                  <motion.a
                    key={idx}
                    href={button.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                                            px-8 py-3.5 rounded-full font-bold transition-all duration-300 shadow-lg
                                            flex items-center gap-2
                                            ${button.primary
                        ? 'bg-background text-primary hover:bg-muted shadow-[0_10px_40px_rgba(0,0,0,0.3)]'
                        : 'bg-transparent text-white border-2 border-white/30 hover:bg-background/10 backdrop-blur-sm'
                      }
                                        `}
                  >
                    {button.text}
                    <Icons.ArrowRight />
                  </motion.a>
                ))}
              </motion.div>

              {/* Trust Badges */}
              <div className="mt-8 flex gap-4">
                <TrustBadge label="Licensed & Insured" color="green" />
                <TrustBadge label="Free Estimate" color="blue" />
                <TrustBadge label="24/7 Support" color="red" />
              </div>
            </div>

            {/* Right Column - Floating Image */}
            <div className="relative">
              <motion.div
                {...floatAnimation}
                className="absolute right-0 bottom-[-47rem] w-[115%] lg:w-[125%]"
                style={{ right: '-20%' }}
              >
                <img
                  src={vectoroverlay}
                  alt="Mega Contracting Professional"
                  className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                />
              </motion.div>
            </div>
          </div>

          {/* Mobile Layout - Centered text, no image */}
          <div className="md:hidden text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4"
            >
              <span className="px-3 py-1.5 text-xs font-semibold bg-background/20 border border-white/30 rounded-full text-white/90 backdrop-blur-sm">
                MEGA CONTRACTING
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold leading-[1.2] text-white"
              dangerouslySetInnerHTML={{ __html: cta.title }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-white/80 text-base max-w-md mx-auto"
            >
              {cta.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
            >
              {cta.buttons.map((button, idx) => (
                <motion.a
                  key={idx}
                  href={button.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                                        px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg
                                        flex items-center justify-center gap-2
                                        ${button.primary
                      ? 'bg-background text-primary hover:bg-gray-100'
                      : 'bg-transparent text-white border-2 border-white/30 hover:bg-background/10'
                    }
                                    `}
                >
                  {button.text}
                  <Icons.ArrowRight />
                </motion.a>
              ))}
            </motion.div>

            {/* Trust Badges - Mobile */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <TrustBadge label="Licensed & Insured" color="green" />
              <TrustBadge label="Free Estimate" color="blue" />
              <TrustBadge label="24/7 Support" color="red" />
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
});

CTASection.displayName = "CTASection";

// ============================================================================
// Trust Badge Component
// ============================================================================

interface TrustBadgeProps {
  label: string;
  color: 'green' | 'blue' | 'red';
}

const TrustBadge = memo(({ label, color }: TrustBadgeProps) => {
  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-primary',
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/5 backdrop-blur-sm border border-white/10">
      <div className={`w-1.5 h-1.5 ${colorClasses[color]} rounded-full animate-pulse`} />
      <span className="text-xs text-white/70 whitespace-nowrap">{label}</span>
    </div>
  );
});

TrustBadge.displayName = "TrustBadge";

// ============================================================================
// Diagonal Grid Background Component
// ============================================================================

const DiagonalGridBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="diagonalGrid"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" className="text-primary" strokeWidth="0.5" opacity="0.06" />
          <line x1="0" y1="0" x2="40" y2="0" stroke="currentColor" className="text-primary" strokeWidth="0.5" opacity="0.06" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diagonalGrid)" />
    </svg>
  </div>
));

DiagonalGridBackground.displayName = "DiagonalGridBackground";

// ============================================================================
// Main Component
// ============================================================================

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { section, features, cta } = completeData.whyChooseUs as WhyChooseUsData;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isClient, prefersReducedMotion]);



  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-16 md:py-20 lg:py-24 overflow-x-clip"
      aria-labelledby="why-choose-us-heading"
    >
      <DiagonalGridBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header */}
        <SectionHeader
          badge={section.badge}
          headline={section.headline}
          description={section.description}
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CTASection cta={cta} />
      </div>
    </section>
  );
};

export default WhyChooseUs;
