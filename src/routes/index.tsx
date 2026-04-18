import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Mail, MessageSquare, Kanban, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nothing — Do nothing extra. Land your job." },
      {
        name: "description",
        content:
          "Resume, cover letter, interview prep, and job tracker — one platform powered by AI.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Top nav */}
      <header className="relative z-20 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="grid grid-cols-3 gap-[2px]">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-[3px] h-[3px] rounded-full bg-primary" />
              ))}
            </div>
            <span className="font-display text-2xl tracking-wider">NOTHING</span>
          </div>
          <Link
            to="/app"
            className="text-[11px] font-mono tracking-widest px-4 py-1.5 border border-border hover:border-primary hover:text-primary transition-colors"
          >
            ENTER →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary pulse-dot" />
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
              SYSTEM ONLINE / V1.0
            </span>
          </div>

          <h1 className="font-display text-[clamp(3rem,12vw,9rem)] leading-[0.9] tracking-tight">
  DO
  <br />
  <span className="text-primary">NOTHING</span>
  <br />
  EXTRA.
</h1>
<p className="mt-4 font-mono text-sm md:text-base tracking-widest text-primary">
  DO NOTHING. GET HIRED.
</p>

          <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            One platform. Resume, cover letter, interview prep, job tracker — all
            powered by AI. Built for students and anyone hunting their next role.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/app"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 font-mono tracking-widest text-sm hover:bg-foreground transition-colors"
            >
              START NOW
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/app/resume"
              className="inline-flex items-center gap-3 border border-border px-6 py-3 font-mono tracking-widest text-sm hover:border-primary hover:text-primary transition-colors"
            >
              BUILD RESUME
            </Link>
          </div>

          {/* Marquee */}
          <div className="mt-20 overflow-hidden border-y border-border py-4">
            <div className="flex marquee gap-12 whitespace-nowrap font-display text-2xl">
              {Array.from({ length: 2 }).map((_, k) => (
                <div key={k} className="flex gap-12">
                  {[
                    "RESUME",
                    "•",
                    "COVER LETTER",
                    "•",
                    "INTERVIEW PREP",
                    "•",
                    "JOB TRACKER",
                    "•",
                    "AI POWERED",
                    "•",
                    "ZERO FRICTION",
                    "•",
                  ].map((t, i) => (
                    <span
                      key={i}
                      className={t === "•" ? "text-primary" : "text-foreground"}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="relative py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-baseline gap-4 mb-12">
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
              [01]
            </span>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight">
              EVERYTHING. NOTHING ELSE.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {[
              {
                icon: FileText,
                num: "01",
                title: "RESUME",
                body: "Paste your skills. Get a tailored, ATS-friendly resume in seconds.",
                to: "/app/resume",
              },
              {
                icon: Mail,
                num: "02",
                title: "COVER LETTER",
                body: "Drop a job description. We write the cover letter that fits.",
                to: "/app/cover-letter",
              },
              {
                icon: MessageSquare,
                num: "03",
                title: "INTERVIEW PREP",
                body: "Likely questions, skill gaps, and a learning roadmap — for any role.",
                to: "/app/interview",
              },
              {
                icon: Kanban,
                num: "04",
                title: "JOB TRACKER",
                body: "Every application in one board. Never lose track again.",
                to: "/app/tracker",
              },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <Link
                  key={f.num}
                  to={f.to as "/app"}
                  className="group relative bg-background p-8 hover:bg-surface transition-colors"
                >
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
                      [{f.num}]
                    </span>
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-display text-3xl tracking-wide mb-3">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                    {f.body}
                  </p>
                  <div className="mt-8 flex items-center gap-2 font-mono text-[11px] tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    OPEN <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="relative py-20 border-t border-border dot-grid">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="w-6 h-6 text-primary mx-auto mb-6" />
          <p className="font-display text-3xl md:text-5xl leading-tight">
            The internet gave you{" "}
            <span className="text-primary">a thousand tabs</span>.
            <br />
            We give you one.
          </p>
          <Link
            to="/app"
            className="mt-10 inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-mono tracking-widest text-sm hover:bg-foreground transition-colors"
          >
            GET STARTED — IT'S FREE
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between font-mono text-[11px] tracking-widest text-muted-foreground">
          <span>© NOTHING / 2026</span>
          <span>BUILT WITH NOTHING</span>
        </div>
      </footer>
    </div>
  );
}
