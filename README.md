# Nothing

> Do nothing. Get hired.

Nothing is an AI-powered job hunt platform built for students and job seekers. One place for everything — no switching tabs, no juggling tools.

## Features

- **Resume Builder** — Paste your skills and experience, get a tailored ATS-friendly resume in seconds
- **Cover Letter Generator** — Drop a job description, get a cover letter that actually fits
- **Interview Prep** — Likely questions, skill gaps, and a learning roadmap for any role
- **Job Tracker** — Kanban board to track every application in one place

## Tech Stack

- React + TypeScript + Vite
- TanStack Router
- Tailwind CSS
- Claude API (Anthropic) — powers all AI generation
- Express.js — lightweight API server
- Supabase — database and auth (coming soon)

## Getting Started

### Prerequisites
- Node.js v22+
- Anthropic API key

### Installation

```bash
git clone https://github.com/muhammedp07/do-nothing.git
cd do-nothing
npm install
```
### Running Locally

Terminal 1 — API server:
```bash
node server.js
```

Terminal 2 — Frontend:
```bash
npm run dev
```

Open `http://localhost:3000`

## Roadmap

- [ ] Auth + user accounts
- [ ] Job feed (matched to your resume)
- [ ] Networking suggestions
- [ ] Nearby events discovery
- [ ] Cloud-synced tracker

---

Built with Nothing.
