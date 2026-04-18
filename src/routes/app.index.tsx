import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Mail, MessageSquare, Kanban, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard — Nothing" }] }),
  component: Dashboard,
});

const tools = [
  { num: "01", title: "RESUME BUILDER", desc: "Generate a tailored resume", to: "/app/resume", icon: FileText },
  { num: "02", title: "COVER LETTER", desc: "Match it to any job description", to: "/app/cover-letter", icon: Mail },
  { num: "03", title: "INTERVIEW PREP", desc: "Questions, gaps & resources", to: "/app/interview", icon: MessageSquare },
  { num: "04", title: "JOB TRACKER", desc: "Kanban for every application", to: "/app/tracker", icon: Kanban },
];

function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-primary pulse-dot" />
        <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
          DASHBOARD / V1.0
        </span>
      </div>
      <h1 className="font-display text-5xl md:text-7xl tracking-tight">
        WHAT&apos;S NEXT?
      </h1>
      <p className="mt-3 text-muted-foreground max-w-lg">
        Pick a tool. Or start with your resume — everything else builds on it.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.num}
              to={t.to as "/app/resume"}
              className="group relative bg-background p-6 hover:bg-surface transition-colors"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  [{t.num}]
                </span>
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h2 className="font-display text-2xl tracking-wide">{t.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
              <ArrowUpRight className="w-4 h-4 absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
            </Link>
          );
        })}
      </div>

      <div className="mt-12 glass p-6 rounded-md">
        <div className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2">
          [TIP]
        </div>
        <p className="font-display text-xl">
          Workflow: Build resume → Paste a job description in Cover Letter →
          Generate interview prep → Track in board.
        </p>
      </div>
    </div>
  );
}
