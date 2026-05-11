import { useState } from "react";
import { Play, ArrowRight, Sparkles, Activity, BarChart3, Shield, Eye, Bell, FileText, ScanLine } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import qiyafLogo from "@/assets/qiyaf-logo-new.png";
import heroComposition from "@/assets/hero-composition.jpg";
import dashboardPreview from "@/assets/dashboard-preview.png";

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const navItems = [
  { label: "Home", to: "/" },
  { label: "Solution", to: "/solution" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const heroFeatures = [
  { icon: ScanLine, title: "AI-Powered Accuracy", desc: "Deep learning models for high precision" },
  { icon: Activity, title: "Real-time Monitoring", desc: "Live analysis and instant alerts anywhere" },
  { icon: BarChart3, title: "Actionable Insights", desc: "Data-driven reports to optimize performance" },
  { icon: Shield, title: "Enterprise Ready", desc: "Secure, scalable, and built for large-scale operations" },
];


const capabilities = [
  { icon: Eye, title: "Surface Defect Detection", desc: "Identify cracks, dust, snow, bird droppings, and clean panels with high computer-vision precision — five visible classes supported." },
  { icon: Activity, title: "Live Feed Analysis", desc: "Monitor your sites in real-time with low-latency video streams." },
  { icon: Bell, title: "Smart Alerts", desc: "Get instant notifications for critical issues that matter." },
  { icon: FileText, title: "Reports & Analytics", desc: "Detailed insights and trends to drive better decisions." },
];

const LandingPage = ({ onGetStarted, onLogin }: LandingPageProps) => {
  const [demoOpen, setDemoOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/85 border-b border-border/50 shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
        <nav className="max-w-[1480px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-14 sm:h-16 lg:h-20 flex items-center justify-between gap-2">
          <div className="flex items-center gap-6 lg:gap-12 min-w-0">
            <Link to="/" aria-label="Qiyaf home" className="shrink-0">
              <img src={qiyafLogo} alt="Qiyaf" className="h-16 sm:h-20 md:h-28 lg:h-32 w-auto object-contain" />
            </Link>
            <ul className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={onLogin}
              className="h-9 sm:h-10 px-3 sm:px-5 bg-transparent border-border hover:bg-secondary/50 text-foreground rounded-lg text-sm"
            >
              Login
            </Button>
            <Button
              onClick={onGetStarted}
              className="h-9 sm:h-10 px-3 sm:px-5 rounded-lg text-primary-foreground font-medium border-0 text-sm"
              style={{ background: "var(--gradient-brand)" }}
            >
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        {/* Full-bleed background image */}
        <img
          src={heroComposition}
          alt="Qiyaf AI drone inspecting solar panels with live dashboard analytics"
          className="absolute inset-0 w-full h-full object-cover object-[70%_center] sm:object-center"
        />
        {/* Dark gradient overlay — vertical on mobile for legibility, horizontal on desktop */}
        <div
          aria-hidden
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,8,20,0.85) 0%, rgba(2,8,20,0.7) 40%, rgba(2,8,20,0.6) 70%, rgba(2,8,20,0.9) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,8,20,0.95) 0%, rgba(2,8,20,0.88) 30%, rgba(2,8,20,0.65) 50%, rgba(2,8,20,0.25) 75%, rgba(2,8,20,0.05) 100%)",
          }}
        />
        {/* Bottom fade for smooth section transition */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background: "linear-gradient(180deg, rgba(2,8,20,0) 0%, hsl(var(--background)) 100%)",
          }}
        />

        <div className="relative max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16 pb-16 sm:pb-24">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-5rem)]">
            {/* Left content */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 mb-5 sm:mb-7">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] sm:text-xs font-medium tracking-wider uppercase text-primary">
                  AI Powered Inspection Platform
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                AI Vision for{" "}
                <span className="block">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(90deg, hsl(184 75% 55%), hsl(28 95% 60%))" }}
                  >
                    Smarter Solar
                  </span>
                </span>
                <span className="block">Operations</span>
              </h1>

              <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
                Detect defects early, reduce downtime, and maximize solar performance with real-time AI insights.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Button
                  onClick={onGetStarted}
                  className="h-12 px-7 rounded-lg text-primary-foreground font-semibold border-0 shadow-lg group"
                  style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-brand)" }}
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setDemoOpen(true)}
                  className="h-12 px-7 rounded-lg bg-background/30 backdrop-blur-sm border-border/80 hover:bg-secondary/50 text-foreground"
                >
                  <Play className="w-4 h-4 mr-1 fill-current" />
                  Watch Demo
                </Button>
              </div>

              {/* Feature highlights */}
              <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
                {heroFeatures.map((f) => (
                  <div key={f.title}>
                    <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                      <f.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h4 className="text-sm font-semibold mb-1">{f.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side intentionally empty — image is the background */}
            <div aria-hidden />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
        <div className="mb-8 sm:mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3 sm:mb-4">
            Advanced AI for every panel
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">
            Powerful Capabilities Built for Solar Excellence
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl">
            Our platform combines computer vision, machine learning, and analytics to help you operate at peak efficiency.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left: capability cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="group rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-5 hover:border-primary/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <c.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-1.5">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.desc}</p>
                <Link to="/solution" className="text-xs font-medium text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>

          {/* Right: dashboard preview */}
          <div className="relative flex items-center justify-center min-h-[400px]">
            <img
              src={dashboardPreview}
              alt="Qiyaf dashboard preview"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-2">
              <img src={qiyafLogo} alt="Qiyaf" className="h-16 w-auto object-contain mb-4" />
              <p className="text-sm text-muted-foreground max-w-xs">
                AI-powered solar panel inspection platform built for enterprise scale.
              </p>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
              <ul className="flex flex-wrap gap-x-8 gap-y-2.5">
                {[
                  { label: "Home", to: "/" },
                  { label: "Solution", to: "/solution" },
                  { label: "About", to: "/about" },
                  { label: "Contact", to: "/contact" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Qiyaf. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-border/60">
          <DialogTitle className="sr-only">Qiyaf Demo Video</DialogTitle>
          <div className="aspect-video w-full">
            <iframe
              src="https://drive.google.com/file/d/1Plk_qtc11bV4pF_u7m1QFJ5-VlFjrB19/preview"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full border-0"
              title="Qiyaf Demo"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingPage;
