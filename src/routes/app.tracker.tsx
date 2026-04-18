import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, X, Kanban, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/app/tracker")({
  head: () => ({ meta: [{ title: "Job Tracker — Nothing" }] }),
  component: TrackerPage,
});

type Status = "saved" | "applied" | "interview" | "offer" | "rejected";
type Job = {
  id: string;
  company: string;
  role: string;
  url?: string;
  notes?: string;
  status: Status;
  createdAt: number;
};

const COLUMNS: { key: Status; label: string }[] = [
  { key: "saved", label: "SAVED" },
  { key: "applied", label: "APPLIED" },
  { key: "interview", label: "INTERVIEW" },
  { key: "offer", label: "OFFER" },
  { key: "rejected", label: "REJECTED" },
];

const STORAGE_KEY = "nothing.jobs.v1";

function TrackerPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ company: "", role: "", url: "", notes: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setJobs(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.company || !draft.role) return;
    setJobs((j) => [
      ...j,
      { id: crypto.randomUUID(), ...draft, status: "saved", createdAt: Date.now() },
    ]);
    setDraft({ company: "", role: "", url: "", notes: "" });
    setAdding(false);
  };

  const move = (id: string, status: Status) => {
    setJobs((j) => j.map((job) => (job.id === id ? { ...job, status } : job)));
  };

  const remove = (id: string) => setJobs((j) => j.filter((job) => job.id !== id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-primary pulse-dot" />
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
              [04] / {jobs.length} TOTAL
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight">JOB TRACKER</h1>
        </div>
        <Kanban className="w-10 h-10 text-primary hidden md:block" />
      </div>

      <button
        onClick={() => setAdding(true)}
        className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 font-mono tracking-widest text-xs hover:bg-foreground transition-colors"
      >
        <Plus className="w-4 h-4" /> ADD JOB
      </button>

      {adding && (
        <form onSubmit={addJob} className="mt-4 glass p-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-3">
          <input value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} placeholder="Company" required className="bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary" />
          <input value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} placeholder="Role" required className="bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary" />
          <input value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} placeholder="URL (optional)" className="bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary md:col-span-2" />
          <input value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} placeholder="Notes (optional)" className="bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary md:col-span-2" />
          <div className="flex gap-2 md:col-span-2">
            <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 font-mono tracking-widest text-xs">SAVE</button>
            <button type="button" onClick={() => setAdding(false)} className="border border-border px-4 py-2 font-mono tracking-widest text-xs">CANCEL</button>
          </div>
        </form>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-3">
        {COLUMNS.map((col) => {
          const items = jobs.filter((j) => j.status === col.key);
          return (
            <div key={col.key} className="bg-surface border border-border p-3 min-h-[300px]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  {col.label}
                </span>
                <span className="font-mono text-[10px] text-primary">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map((job) => (
                  <div key={job.id} className="bg-background border border-border p-3 group">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-display text-lg leading-tight truncate">{job.company}</div>
                        <div className="text-xs text-muted-foreground truncate">{job.role}</div>
                      </div>
                      <button onClick={() => remove(job.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    {job.notes && <div className="mt-2 text-xs text-muted-foreground italic">{job.notes}</div>}
                    {job.url && (
                      <a href={job.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono text-primary hover:underline">
                        OPEN <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                    <select
                      value={job.status}
                      onChange={(e) => move(job.id, e.target.value as Status)}
                      className="mt-2 w-full bg-input border border-border px-2 py-1 text-[10px] font-mono tracking-widest focus:outline-none focus:border-primary"
                    >
                      {COLUMNS.map((c) => (
                        <option key={c.key} value={c.key}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="text-[10px] font-mono text-muted-foreground text-center py-6 opacity-50">
                    // empty
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-muted-foreground font-mono">
        // Stored locally in your browser. Cloud sync coming next.
      </p>
    </div>
  );
}
