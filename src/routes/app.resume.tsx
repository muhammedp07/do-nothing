import { useState, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { generateResume } from "@/lib/ai.functions";
import { Loader2, Copy, Check, FileText } from "lucide-react";

export const Route = createFileRoute("/app/resume")({
  head: () => ({ meta: [{ title: "Resume Builder — Nothing" }] }),
  component: ResumePage,
});

function ResumePage() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    skills: "",
    experience: "",
    jobDescription: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOutput("");
    try {
      const res = await generateResume.call(form);
      setOutput(res.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setField = useCallback((field: string) => (v: string) => {
    setForm((prev) => ({ ...prev, [field]: v }));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Header num="01" title="RESUME BUILDER" icon={FileText} />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border">
        <form onSubmit={submit} className="bg-background p-6 space-y-4">
          <Field label="FULL NAME" value={form.name} onChange={setField("name")} placeholder="Jane Doe" required />
          <Field label="TARGET ROLE" value={form.role} onChange={setField("role")} placeholder="Frontend Engineer" required />
          <Field label="SKILLS" value={form.skills} onChange={setField("skills")} placeholder="React, TypeScript, Figma..." required />
          <TextArea label="EXPERIENCE / EDUCATION / PROJECTS" value={form.experience} onChange={setField("experience")} rows={6} required />
          <TextArea label="JOB DESCRIPTION (OPTIONAL)" value={form.jobDescription} onChange={setField("jobDescription")} rows={4} />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 font-mono tracking-widest text-sm disabled:opacity-50 hover:bg-foreground transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> GENERATING</> : "GENERATE RESUME →"}
          </button>
        </form>
        <div className="bg-background p-6 min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">[OUTPUT]</span>
            {output && (
              <button onClick={copy} className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary">
                {copied ? <><Check className="w-3 h-3" /> COPIED</> : <><Copy className="w-3 h-3" /> COPY</>}
              </button>
            )}
          </div>
          {error && <div className="text-destructive text-sm font-mono">{error}</div>}
          {!output && !loading && !error && (
            <div className="text-muted-foreground text-sm font-mono">// Your tailored resume will appear here.</div>
          )}
          {loading && <Skeleton />}
          {output && <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{output}</pre>}
        </div>
      </div>
    </div>
  );
}

export function Header({ num, title, icon: Icon }: { num: string; title: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-primary pulse-dot" />
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">[{num}]</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight">{title}</h1>
      </div>
      <Icon className="w-10 h-10 text-primary hidden md:block" />
    </div>
  );
}

export function Field({ label, value, onChange, placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-widest text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
      />
    </label>
  );
}

export function TextArea({ label, value, onChange, rows = 4, required }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-widest text-muted-foreground">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        required={required}
        className="mt-1 w-full bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary font-mono"
      />
    </label>
  );
}

// Fixed: no Math.random() in render
const SKELETON_WIDTHS = [72, 85, 63, 91, 78, 68, 88, 75];
export function Skeleton() {
  return (
    <div className="space-y-2">
      {SKELETON_WIDTHS.map((w, i) => (
        <div key={i} className="h-3 bg-muted animate-pulse" style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}