import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  X,
  Menu,
  Star,
  Calendar,
  Building2,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Phone,
  FileText,
  Wrench,
  PaintBucket,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import logo from "../assets/drpaintlogo.png";
import logo2nd from "../assets/drpaintlogo.png";
import completeData from "../src/data/completeData.json";

const iconMap = {
  Home: () => <Home className="h-5 w-5" />,
  Briefcase: () => <Briefcase className="h-5 w-5" />,
  Users: () => <Users className="h-5 w-5" />,
  MessageSquare: () => <MessageSquare className="h-5 w-5" />,
  Phone: () => <Phone className="h-5 w-5" />,
  Star: () => <Star className="h-5 w-5" />,
  Shield: () => <ShieldCheck className="h-5 w-5" />,
  FileText: () => <FileText className="h-5 w-5" />,
};

const serviceIconMap = {
  Home: () => <Home className="h-6 w-6 text-primary" />,
  Building2: () => <Building2 className="h-6 w-6 text-primary" />,
  Wrench: () => <Wrench className="h-6 w-6 text-primary" />,
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isHoveringMegaMenu, setIsHoveringMegaMenu] = useState(false);
  const lastScrollY = useRef(0);

  const { services, companyLinks, cta } = completeData.navbar;

  // Scroll lock effect
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServicesMouseEnter = () => setActiveMegaMenu("services");
  const handleServicesMouseLeave = () => {
    setTimeout(() => {
      if (!isHoveringMegaMenu) setActiveMegaMenu(null);
    }, 150);
  };

  return (
    <>    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${hidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-xl py-1 border-b border-slate-100"
          : "bg-white/80 py-2 border-b border-white/10"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo Section */}
        <motion.a
          href="#"
          className="relative h-16 w-32 md:w-40"
          whileHover={{ scale: 1.02 }}
        >
          <img src={logo} alt="Logo" className="h-full w-full object-contain" />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="relative">
            <button
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase font-bold tracking-widest transition-all text-slate-900 hover:bg-slate-100"
            >
              <PaintBucket className="h-4 w-4" />
              Services
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeMegaMenu === "services" ? "rotate-180" : ""}`} />
            </button>

            {/* Crystal Mega Menu */}
            <AnimatePresence>
              {activeMegaMenu === "services" && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.98 }}
                  onMouseEnter={() => setIsHoveringMegaMenu(true)}
                  onMouseLeave={() => {
                    setIsHoveringMegaMenu(false);
                    setActiveMegaMenu(null);
                  }}
                  className="absolute left-0 top-full mt-4 w-[800px] bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-white/20 p-8 flex gap-8"
                >
                  {/* Visual Feature Sidebar */}
                  <div className="w-64 bg-gradient-to-br from-primary to-primary/80 rounded-[1.5rem] p-8 text-white flex flex-col justify-between overflow-hidden relative group">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] pointer-events-none" />
                    <div className="relative z-10">
                      <Star className="h-8 w-8 mb-6 text-white/50" />
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none mb-4">
                        Top Rated <br /> Excellence
                      </h3>
                      <p className="text-white/70 text-[10px] uppercase font-bold tracking-[0.2em] w-full">
                        Over 200 Five-Star <br /> Google Reviews
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="relative z-10 flex items-center gap-3 text-xs font-black uppercase tracking-widest"
                    >
                      View Gallery <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </div>

                  {/* Services Grid */}
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    {services.map((service) => {
                      const Icon = serviceIconMap[service.icon as keyof typeof serviceIconMap] || serviceIconMap.Home;
                      return (
                        <motion.a
                          key={service.title}
                          href="#services"
                          whileHover={{ x: 5 }}
                          className="p-5 rounded-[1.5rem] transition-all hover:bg-black/5 group"
                        >
                          <div className="flex items-center gap-4 mb-3">
                            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                              <Icon />
                            </div>
                            <h4 className="text-sm font-black uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                              {service.title}
                            </h4>
                          </div>
                          <p className="text-[10px] text-muted-foreground leading-relaxed uppercase font-bold tracking-widest">
                            Professional {service.title.split(' ')[0]} solutions for every project.
                          </p>
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {companyLinks.slice(1).map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap] || iconMap.Home;
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-xs uppercase font-bold tracking-widest transition-all text-slate-900 hover:bg-slate-100"
              >
                <Icon />
                {link.label}
              </a>
            );
          })}
        </div>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center gap-4">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-none text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20"
          >
            <Calendar className="h-4 w-4" />
            Free Quote
          </motion.a>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden group relative w-11 h-11 flex flex-col items-center justify-center rounded-2xl transition-all duration-500 bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200"
          >
            <div className="space-y-1.5">
              <span className="block w-6 h-0.5 bg-current transition-transform duration-300 rounded-full" />
              <span className="block w-4 h-0.5 bg-current transition-transform duration-300 rounded-full ml-auto" />
              <span className="block w-6 h-0.5 bg-current transition-transform duration-300 rounded-full" />
            </div>
          </button>
        </div>
      </div>
    </nav>

      {/* Premium Right-Side Mobile Drawer - COMPACT VERSION */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-md lg:hidden"
            />
            
            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-[70] h-full w-[85%] max-w-[400px] bg-white lg:hidden flex flex-col shadow-[-30px_0_60px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 flex justify-between items-center border-b border-slate-100 bg-slate-50/50">
                <img src={logo2nd} alt="Logo" className="h-8 w-auto" />
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="group p-2 bg-white shadow-sm border border-slate-100 rounded-xl hover:bg-red-50 hover:border-red-100 transition-all active:scale-90"
                >
                  <X className="h-5 w-5 text-slate-900 group-hover:text-red-500 transition-colors" />
                </button>
              </div>

              {/* Navigation Content - Simplified & Robust */}
              <div className="flex-1 overflow-y-auto px-6 py-8 scrollbar-hide bg-white">
                <div className="space-y-10">
                  {/* Services Section */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px flex-1 bg-slate-100" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary whitespace-nowrap">Expert Services</p>
                      <div className="h-px flex-1 bg-slate-100" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {completeData.services.services.map((s) => (
                        <a
                          key={s.title}
                          href="#services"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 bg-slate-50/50 active:scale-95 transition-all group"
                        >
                          <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-primary mb-3 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                             {s.icon === "Home" && <Home className="h-5 w-5" />}
                             {s.icon === "Building2" && <Building2 className="h-5 w-5" />}
                             {s.icon === "Wrench" && <Wrench className="h-5 w-5" />}
                             {s.icon === "Hammer" && <Zap className="h-5 w-5" />}
                             {s.icon === "Droplets" && <PaintBucket className="h-5 w-5" />}
                             {s.icon === "Car" && <ShieldCheck className="h-5 w-5" />}
                             {s.icon === "PaintBucket" && <PaintBucket className="h-5 w-5" />}
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 text-center leading-tight">
                            {s.title}
                          </span>
                        </a>
                      ))}
                    </div>
                  </section>

                  {/* Navigation Links Section */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px flex-1 bg-slate-100" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">Navigation</p>
                      <div className="h-px flex-1 bg-slate-100" />
                    </div>
                    <div className="flex flex-col gap-2">
                      {companyLinks.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between p-4 rounded-xl text-slate-900 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
                        >
                          <span className="text-sm font-black uppercase tracking-widest">{l.label}</span>
                          <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                        </a>
                      ))}
                    </div>
                  </section>

                  {/* Action Footer Button */}
                  <section className="pt-6">
                    <a
                      href="#contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full bg-primary text-white py-5 rounded-2xl text-center font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                    >
                      <Calendar className="h-5 w-5" />
                      Get Free Quote
                    </a>
                    <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-[0.3em] mt-6">
                      Serving Florida Since 2014
                    </p>
                  </section>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
