import { Link } from "react-router-dom";
import {
  Eye,
  Activity,
  Bell,
  FileText,
  ScanLine,
  Cpu,
  Cloud,
  Layers,
  Plane,
  Database,
  LineChart,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

const useCases = [
  {
    icon: Eye,
    title: "Surface Defect Detection",
    desc: "Identify cracks, dust, snow, bird droppings, and clean panels with high computer-vision precision, five visible classes supported.",
  },
  {
    icon: Activity,
    title: "Live Feed Analysis",
    desc: "Stream drone footage in real time and surface anomalies the moment they appear in the field.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    desc: "Route critical events to the right operator with severity-aware notifications across web and mobile.",
  },
  {
    icon: FileText,
    title: "Reports & Analytics",
    desc: "Quantify yield loss, prioritize O&M tickets, and track inspection ROI over time.",
  },
];

const techStack = [
  { icon: Cpu, title: "Deep Learning Models", desc: "Custom YOLO-based detectors fine-tuned exclusively on RGB imagery for visible surface conditions." },
  { icon: Plane, title: "Autonomous UAVs", desc: "Pre-planned flight paths covering hectares of solar fields without manual piloting." },
  { icon: Cloud, title: "Cloud Pipeline", desc: "Edge ingest, GPU inference, and storage scale elastically with mission size." },
  { icon: Database, title: "Asset Registry", desc: "Every panel mapped, indexed, and history-tracked across inspection cycles." },
  { icon: LineChart, title: "Maintenance Reports", desc: "Each detection generates a report with the defect class and panel location for the maintenance crew." },
  { icon: ShieldCheck, title: "Enterprise Security", desc: "Role-based access, encrypted transport, and audit-ready logging by default." },
];

const workflow = [
  { step: "01", title: "Plan the Mission", desc: "Define the site, panels, and inspection cadence inside Qiyaf." },
  { step: "02", title: "Capture in Flight", desc: "UAVs autonomously scan rows and stream RGB images of the panel surface to the cloud." },
  { step: "03", title: "AI Inference", desc: "The model classifies each panel into one of five surface classes: bird droppings, clean, cracks, dust, or snow, with bounding boxes." },
  { step: "04", title: "Act & Report", desc: "Operators receive alerts, dispatch crews, and download executive reports." },
];

const Solution = () => {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 sm:pt-12 sm:pt-20 pb-10 sm:pb-16 sm:pb-16 sm:pb-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium tracking-wider uppercase text-primary">The Qiyaf Solution</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]">
          From UAV Flight to{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, hsl(184 75% 55%), hsl(28 95% 60%))" }}
          >
            Actionable Insight
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Qiyaf turns aerial imagery into a measurable boost in solar performance, combining autonomous drones,
          purpose-built AI models, and an analytics layer your O&M team will actually use.
        </p>
      </section>

      {/* Use cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-16 sm:pb-24">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">What it solves</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Built for Real Solar Operations</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {useCases.map((c) => (
            <div
              key={c.title}
              className="group rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-6 hover:border-primary/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <c.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="border-y border-border/50 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">A Four-Step Workflow</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              From mission planning to executive reporting, every step runs inside one platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((w, i) => (
              <div key={w.step} className="relative">
                <div className="rounded-xl border border-border/60 bg-background/40 p-6 h-full">
                  <div
                    className="text-3xl font-bold mb-3 bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(135deg, hsl(184 75% 55%), hsl(28 95% 60%))" }}
                  >
                    {w.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{w.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                </div>
                {i < workflow.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 w-5 h-5 text-primary/60" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Under the hood</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The Technology Behind Qiyaf</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {techStack.map((t) => (
            <div
              key={t.title}
              className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-6 hover:border-accent/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <t.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-base font-semibold mb-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 pb-16 sm:pb-24">
        <div
          className="rounded-2xl border border-primary/30 p-10 md:p-14 text-center"
          style={{ background: "radial-gradient(ellipse at top, hsl(184 75% 48% / 0.18), transparent 70%)" }}
        >
          <Layers className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">See Qiyaf in Action</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-7">
            Explore the full inspection pipeline from a single dashboard.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              className="h-12 px-7 rounded-lg text-primary-foreground font-semibold border-0"
              style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-brand)" }}
            >
              <Link to="/?auth=signup">
                Get Started <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-7 rounded-lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Solution;
