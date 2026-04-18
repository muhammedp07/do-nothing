import { useState, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { generateInterviewPrep } from "@/lib/ai.functions";
import { Loader2, Copy, Check, MessageSquare } from "lucide-react";
import { Header, Field, TextArea, Skeleton } from "./app.resume";

export const Route = createFileRoute("/app/interview")({
  head: () => ({ meta: [{ title: "Interview Prep — Nothing" }] }),
  component: InterviewPage,
});

function InterviewPage() {
  const [form, setForm] = useState({ role: "", jobDescription: "", currentSkills: "" });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const setField = useCallback((field: string) => (v: string) => {
    setForm((prev) => ({ ...prev, [field]: v }));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOutput("");
    try {
      const res = await generateInterviewPrep.call(form);
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Header num="03" title="INTERVIEW PREP" icon={MessageSquare} />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border">
        <form onSubmit={submit} className="bg-background p-6 space-y-4">
          <Field label="TARGET ROLE" value={form.role} onChange={setField("role")} placeholder="Product Manager" required />
          <TextArea label="JOB DESCRIPTION" value={form.jobDescription} onChange={setField("jobDescription")} rows={6} required />
          <TextArea label="YOUR CURRENT SKILLS" value={form.currentSkills} onChange={setField("currentSkills")} rows={4} required />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 font-mono tracking-widest text-sm disabled:opacity-50 hover:bg-foreground transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> ANALYZING</> : "PREP ME →"}
          </button>
        </form>
        <div className="bg-background p-6 min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">[BRIEFING]</span>
            {output && (
              <button onClick={copy} className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary">
                {copied ? <><Check className="w-3 h-3" /> COPIED</> : <><Copy className="w-3 h-3" /> COPY</>}
              </button>
            )}
          </div>
          {error && <div className="text-destructive text-sm font-mono">{error}</div>}
          {!output && !loading && !error && (
            <div className="text-muted-foreground text-sm font-mono">// Questions, gaps, and learning roadmap will appear here.</div>
          )}
          {loading && <Skeleton />}
          {output && <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{output}</pre>}
        </div>
      </div>
    </div>
  );
}