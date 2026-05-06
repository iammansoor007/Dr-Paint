import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Paintbrush, Palette, Droplets } from "lucide-react";
import PaintDivider from "./ui/PaintDivider";

import heroBg from "@/assets/drpaintbg.jpg";
import {
  FiArrowRight,
  FiChevronDown,
  FiStar,
  FiThumbsUp,
  FiMail,
  FiPhone,
  FiUser,
  FiHome,
  FiDollarSign,
  FiBriefcase,
  FiSend,
  FiCheckCircle,
  FiUsers,
  FiUserCheck,
  FiMessageSquare,
  FiSmartphone,
  FiZap,
  FiClock,
  FiShield,
  FiTool,
  FiSun,
  FiCloudRain,
  FiAward,
  FiDroplet,
} from "react-icons/fi";
import { RiBuildingLine, RiShieldCheckLine } from "react-icons/ri";
import completeData from "../src/data/completeData.json";



// MODERN PROFESSIONAL FORM COMPONENT - UPDATED FOR PAINTING SERVICES
const PaintingInquiryForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    serviceType: "residential-interior",
    serviceDetails: "",
    email: "",
    phone: "",
    address: "",
    urgency: "standard",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(520);

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.scrollHeight;
      setContainerHeight(Math.max(height, 500));
    }
  }, [step, isSubmitted]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Painting quote request:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        serviceType: "residential-interior",
        serviceDetails: "",
        email: "",
        phone: "",
        address: "",
        urgency: "standard",
      });
    }, 3000);
  };

  const serviceOptions = [
    {
      value: "residential-interior",
      label: "Residential Interior",
      icon: FiHome,
      desc: "Transform your living spaces with expert interior painting",
    },
    {
      value: "residential-exterior",
      label: "Residential Exterior",
      icon: FiHome,
      desc: "Protect and beautify your home's exterior",
    },
    {
      value: "commercial-painting",
      label: "Commercial Painting",
      icon: FiBriefcase,
      desc: "Professional solutions for business properties",
    },
    {
      value: "cabinet-painting",
      label: "Cabinet Painting",
      icon: FiTool,
      desc: "Give your kitchen a fresh look with refinished cabinets",
    },
    {
      value: "drywall-repair",
      label: "Drywall Repair",
      icon: FiTool,
      desc: "Patching and texture matching for a smooth finish",
    },
    {
      value: "pressure-washing",
      label: "Pressure Washing",
      icon: FiDroplet,
      desc: "Deep cleaning for exterior surfaces",
    },
  ];

  const urgencyOptions = [
    { value: "emergency", label: "🚨 Urgent (ASAP)" },
    { value: "soon", label: "⚡ Soon (1-2 weeks)" },
    { value: "planned", label: "📅 Planning (1-3 months)" },
  ];

  const stepIcons = [FiUserCheck, FiMessageSquare, FiSmartphone];
  const stepLabels = ["Your Info", "Project Details", "Contact"];

  const SelectedIcon =
    serviceOptions.find((opt) => opt.value === formData.serviceType)?.icon ||
    FiHome;

  return (
    <div className="w-full max-w-lg mx-auto lg:mx-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-border"
      >
        <div className="relative flex-shrink-0 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border">
          <div className="px-5 sm:px-6 md:px-8 py-5 sm:py-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FiZap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Free Painting Estimate
                  </h3>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    Get your quote in 3 easy steps
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1 bg-primary/10 rounded-full px-3 py-1.5">
                <div className="flex -space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= i
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground/60"
                        }`}
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-medium text-primary ml-1">
                  Steps
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          style={{ minHeight: `${containerHeight}px` }}
          className="transition-all duration-300 ease-in-out"
        >
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="px-4 sm:px-6 md:px-8 py-5 sm:py-8"
            >
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((s) => {
                    const StepIcon = stepIcons[s - 1];
                    const isActive = step === s;
                    const isCompleted = step > s;
                    return (
                      <div
                        key={s}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                            ? "bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/20"
                            : isCompleted
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground/60"
                            }`}
                        >
                          {isCompleted ? (
                            <FiCheckCircle className="w-6 h-6" />
                          ) : (
                            <StepIcon className="w-5 h-5" />
                          )}
                        </div>
                        <span
                          className={`text-xs font-semibold mt-2 transition-colors ${isActive
                            ? "text-primary"
                            : isCompleted
                              ? "text-foreground/80"
                              : "text-muted-foreground/60"
                            }`}
                        >
                          {stepLabels[s - 1]}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="relative mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((step - 1) / 2) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <div className="bg-primary/5 rounded-xl p-3 flex items-center gap-2 mb-2">
                        <FiUser className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Step 1 of 3 - Tell us who you are
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          First name
                        </label>
                        <div className="relative group">
                          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full border-2 border-border rounded-xl py-3.5 pl-11 pr-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                            placeholder="John"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Last name
                        </label>
                        <div className="relative group">
                          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full border-2 border-border rounded-xl py-3.5 pl-11 pr-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Property address
                        </label>
                        <div className="relative group">
                          <FiHome className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border-2 border-border rounded-xl py-3.5 pl-11 pr-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                            placeholder="123 Main St, Canton, MI"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={
                          !formData.firstName ||
                          !formData.lastName ||
                          !formData.address
                        }
                        className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold mt-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-md hover:shadow-lg"
                      >
                        Continue
                        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <div className="bg-primary/5 rounded-xl p-3 flex items-center gap-2 mb-2">
                        <FiTool className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Step 2 of 3 - What service do you need?
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Service needed
                        </label>
                        <div className="relative">
                          <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleChange}
                            className="w-full border-2 border-border rounded-xl py-3.5 pl-12 pr-10 text-foreground focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer bg-white"
                            style={{ height: "52px" }}
                          >
                            {serviceOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <SelectedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Urgency
                        </label>
                        <div className="relative">
                          <select
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            className="w-full border-2 border-border rounded-xl py-3.5 pl-4 pr-10 text-foreground focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer bg-white"
                          >
                            {urgencyOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Additional details{" "}
                          <span className="text-muted-foreground/60 font-normal">
                            (optional)
                          </span>
                        </label>
                        <textarea
                          name="serviceDetails"
                          value={formData.serviceDetails}
                          onChange={handleChange}
                          rows={3}
                          className="w-full border-2 border-border rounded-xl py-3 px-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
                          placeholder="Tell us about your project, colors, etc."
                          style={{ minHeight: "80px" }}
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex-1 bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-md"
                        >
                          Continue
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <div className="bg-primary/5 rounded-xl p-3 flex items-center gap-2 mb-2">
                        <FiShield className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Step 3 of 3 - How should we reach you?
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground/80 mb-2">
                          Email address
                        </label>
                        <div className="relative group">
                          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border-2 border-border rounded-xl py-3.5 pl-11 pr-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                            placeholder="hello@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground/80 mb-2">
                          Phone number
                        </label>
                        <div className="relative group">
                          <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border-2 border-border rounded-xl py-3.5 pl-11 pr-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                            placeholder="+1 (386) 246-7999"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 border-2 border-border text-muted-foreground py-3.5 rounded-xl font-semibold hover:bg-muted/50 transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={
                            isSubmitting || !formData.email || !formData.phone
                          }
                          className="flex-1 bg-primary text-white py-3.5 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-md"
                        >
                          {isSubmitting ? "Sending..." : "Get Free Estimate"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 py-12 text-center flex flex-col items-center justify-center"
              style={{ minHeight: `${containerHeight}px` }}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <FiCheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Estimate Request Sent!
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Thanks for contacting DR Paint. We'll reach out within 24 hours with your free estimate.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  const { badge, headlines, description, buttons, stats } = completeData.hero;



  const iconComponents = {
    FiArrowRight: FiArrowRight,
    RiBuildingLine: RiBuildingLine,
    FiStar: FiStar,
    FiThumbsUp: FiThumbsUp,
    RiShieldCheckLine: RiShieldCheckLine,
    FiDollarSign: FiDollarSign,
    FiClock: FiClock,
    FiShield: FiShield,
    FiHome: FiHome,
    FiTool: FiTool,
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-slate-900 isolate"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt="DR Paint - Professional painting services"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover absolute inset-0 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center pt-32 pb-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">
              <motion.div
                className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mx-auto lg:mx-0 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-white text-xs uppercase tracking-[0.2em] font-bold">
                  {badge}
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white lg:leading-[1.1] tracking-tight uppercase"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {headlines.join(" ")}
              </motion.h1>

              <motion.p
                className="text-base sm:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {description}
              </motion.p>

              <motion.div
                className=" w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
                  {buttons.map((button, idx) => {
                    const Icon = iconComponents[button.icon as keyof typeof iconComponents];
                    const isFirst = idx === 0;
                    const isHovered = hoveredButton !== null;

                    // Logic: Swap styles if any button is hovered
                    const useSecondaryStyle = (isFirst && isHovered) || (!isFirst && !isHovered);

                    return (
                      <motion.a
                        key={idx}
                        href={button.href}
                        onMouseEnter={() => setHoveredButton(idx)}
                        onMouseLeave={() => setHoveredButton(null)}
                        className={`
                          group relative overflow-hidden px-8 py-4 rounded-none sm:rounded-2xl w-full sm:w-auto 
                          inline-flex items-center justify-center gap-3 text-base font-bold transition-all duration-500
                          ${useSecondaryStyle
                            ? "bg-white text-primary shadow-xl"
                            : "bg-primary text-white shadow-xl shadow-primary/30"
                          }
                          hover:scale-105 active:scale-95
                        `}
                        whileHover={{ y: -4 }}
                      >
                        <span className="relative z-10">{button.text}</span>
                        {Icon && (
                          <Icon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 lg:flex lg:flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 pt-6 border-t border-border w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {stats.map((stat, idx) => {
                  const StatIcon =
                    iconComponents[stat.icon as keyof typeof iconComponents];
                  return (
                    <div key={stat.label} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
                        {StatIcon && (
                          <StatIcon className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white leading-none mb-1">
                          {stat.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative">
              <PaintingInquiryForm />
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Paint Divider - Transitions to the next section */}
      <div className="absolute bottom-0 left-0 w-full z-1 pointer-events-none">
        <PaintDivider color="hsl(var(--primary))" className="translate-y-[1px]" />
      </div>
    </section >
  );
};

export default Hero;
