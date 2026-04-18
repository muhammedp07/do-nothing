import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { FileText, Mail, MessageSquare, Kanban, LayoutDashboard, Home } from "lucide-react";

type NavItem = { to: string; label: string; icon: typeof Home; exact?: boolean };

const nav: NavItem[] = [
  { to: "/", label: "HOME", icon: Home, exact: true },
  { to: "/app", label: "DASHBOARD", icon: LayoutDashboard, exact: true },
  { to: "/app/resume", label: "RESUME", icon: FileText },
  { to: "/app/cover-letter", label: "COVER LETTER", icon: Mail },
  { to: "/app/interview", label: "INTERVIEW", icon: MessageSquare },
  { to: "/app/tracker", label: "TRACKER", icon: Kanban },
];

export function AppShell() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 glass">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="grid grid-cols-3 gap-[2px]">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[3px] h-[3px] rounded-full bg-primary group-hover:bg-foreground transition-colors"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <span className="font-display text-2xl tracking-wider">NOTHING</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.slice(1).map((item) => {
              const active = item.exact ? path === item.to : path.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to as "/app"}
                  className={`px-3 py-1.5 text-[11px] font-mono tracking-widest transition-colors ${
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && <span className="mr-1">●</span>}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden sticky bottom-0 z-50 glass border-t border-border">
        <div className="flex items-center justify-around py-2">
          {nav.slice(1).map((item) => {
            const active = item.exact ? path === item.to : path.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to as "/app"}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] font-mono tracking-wider">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
