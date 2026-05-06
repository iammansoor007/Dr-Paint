import { useState, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Lazy load heavy components
const PaintingExperts = lazy(() => import("@/components/PaintingExperts"));
const Services = lazy(() => import("@/components/Services"));
const TeamValues = lazy(() => import("@/components/TeamValues"));
const Portfolio = lazy(() => import("@/components/Portfolio"));
const HowWeWork = lazy(() => import("@/components/HowWeWork"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const PaintGuarantee = lazy(() => import("@/components/PaintGuarantee"));
const QAForm = lazy(() => import("@/components/QAForm"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Footer = lazy(() => import("@/components/Footer"));
const QuickQuote = lazy(() => import("@/components/QuickQuote"));

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative overflow-x-hidden transform-gpu">
      {/* Background gradients disabled for performance */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-background" />

      {/* All content with relative z-index to appear above grid */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Suspense fallback={<div className="h-96 bg-background" />}>
          <section id="paintingexperts" className="bg-background">
            <PaintingExperts />
          </section>

          <section id="services" className="bg-muted/50">
            <Services />
          </section>
          <TeamValues />
          <section id="portfolio">
            <Portfolio />
          </section>
          <PaintGuarantee />
          <Testimonials />
          <section id="about">
            <HowWeWork />
          </section>

          <section id="contact">
            <QAForm />
          </section>
          <section id="faq">
            <FAQ />
          </section>
          <Footer />

          {/* ✅ Quick Quote Widget - Only appears on Index page */}
          <QuickQuote />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
