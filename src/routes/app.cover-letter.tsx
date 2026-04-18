import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { generateCoverLetter } from "@/lib/ai.functions";
import { Loader2, Copy, Check, Mail } from "lucide-react";
import { Header, Field, TextArea, Skeleton } from "./app.resume";

export const Route = createFileRoute("/app/cover-letter")({
  head: () => ({ meta: [{ title: "Cover Letter — Nothing" }] }),
  component: CoverLetterPage,
});

function CoverLetterPage() {
  const [form, setForm] = useState({ name: "", resume: "", jobDescription: "", tone: "professional but warm" });
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
  const res = await generateCoverLetter.call(form);
  console.log("Response:", res);
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
      <Header num="02" title="COVER LETTER" icon={Mail} />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border">
        <form onSubmit={submit} className="bg-background p-6 space-y-4">
          <Field label="YOUR NAME" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <Field label="TONE" value={form.tone} onChange={(v) => setForm({ ...form, tone: v })} placeholder="professional but warm" />
          <TextArea label="YOUR RESUME / BACKGROUND" value={form.resume} onChange={(v) => setForm({ ...form, resume: v })} rows={6} required />
          <TextArea label="JOB DESCRIPTION" value={form.jobDescription} onChange={(v) => setForm({ ...form, jobDescription: v })} rows={6} required />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 font-mono tracking-widest text-sm disabled:opacity-50 hover:bg-foreground transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> WRITING</> : "WRITE LETTER →"}
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
            <div className="text-muted-foreground text-sm font-mono">// Your cover letter will appear here.</div>
          )}
          {loading && <Skeleton />}
          {output && <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{output}</pre>}
        </div>
      </div>
    </div>
  );
}