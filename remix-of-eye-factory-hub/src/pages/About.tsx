import { Link } from "react-router-dom";
import { GraduationCap, Target, Lightbulb, Sun, Linkedin, ArrowRight, Sparkles } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "Make solar inspection faster, safer, and smarter by replacing manual rooftop checks with autonomous AI vision.",
  },
  {
    icon: Lightbulb,
    title: "Our Vision",
    desc: "A future where every solar asset in the region is monitored continuously, surface defects detected early before they cost a single kilowatt.",
  },
  {
    icon: Sun,
    title: "Why Solar",
    desc: "Saudi Arabia is investing heavily in renewables. Reliable inspection is the foundation of that investment paying off.",
  },
];

const team = [
  { name: "Lamis Alzara", role: "Front-End Developer", linkedin: "https://www.linkedin.com/in/lamees-alzaree-22903134b" },
  { name: "Ghala Alshayb", role: "Back-End Developer", linkedin: "https://www.linkedin.com/in/ghala-alshayb-b31929353" },
  { name: "Rana Alghidani", role: "Back-End Developer", linkedin: "https://www.linkedin.com/in/rana-alghidani-84b024354" },
  { name: "Fay Alsalhi", role: "AI Engineer / Front-End Developer", linkedin: "https://www.linkedin.com/in/fay-alsalhi-b526372ab" },
  { name: "Deem Alnughmush", role: "AI Engineer", linkedin: "https://www.linkedin.com/in/deem-ali" },
];

const About = () => {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 sm:pt-20 pb-12 sm:pb-14 sm:pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium tracking-wider uppercase text-primary">About Qiyaf</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]">
          A Student-Built Platform for{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, hsl(184 75% 55%), hsl(28 95% 60%))" }}
          >
            Smarter Solar
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Qiyaf began as a graduation project at Qassim University, and grew into a full inspection platform that
          combines drones, computer vision, and analytics to support the Kingdom’s renewable-energy ambitions.
        </p>
      </section>

      {/* University card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20">
        <div
          className="rounded-2xl border border-primary/30 p-8 md:p-10"
          style={{ background: "radial-gradient(ellipse at top left, hsl(184 75% 48% / 0.15), transparent 70%)" }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                Affiliated With
              </p>
              <h3 className="text-2xl font-bold mb-2">Qassim University</h3>
              <p className="text-muted-foreground leading-relaxed">
                Qiyaf is developed by a team of computer-science students at Qassim University as part of our
                graduation project. The platform reflects months of research, prototyping, and field experiments ,
                guided by faculty advisors and inspired by the Kingdom’s Vision 2030 renewable-energy goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-16 sm:pb-24">
        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-6 hover:border-primary/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="border-y border-border/50 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">The team</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Meet the Builders</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              The students behind Qiyaf, engineers, designers, and researchers from Qassim University.
            </p>
          </div>

          {(() => {
            const renderCard = (m: typeof team[number]) => (
              <div
                key={m.name}
                className="group rounded-xl border border-border/60 bg-background/40 p-6 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-primary-foreground shrink-0"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    {m.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg leading-tight whitespace-nowrap">{m.name}</h3>
                    <p className="text-sm text-muted-foreground leading-snug mt-1">{m.role}</p>
                  </div>
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} on LinkedIn`}
                    className="w-10 h-10 rounded-md border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors shrink-0"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
            return (
              <div className="space-y-6 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {team.slice(0, 3).map(renderCard)}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:max-w-[66%] lg:mx-auto">
                  {team.slice(3).map(renderCard)}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Want to know more?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-7">
          Get in touch with the team, we’re always happy to discuss the project, the technology, or potential
          collaborations.
        </p>
        <Button
          asChild
          className="h-12 px-7 rounded-lg text-primary-foreground font-semibold border-0"
          style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-brand)" }}
        >
          <Link to="/contact">
            Contact the Team <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </section>
    </SiteLayout>
  );
};

export default About;
