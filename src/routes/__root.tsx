import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import "../styles.css";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center p-10">
        <h1 className="font-display text-7xl text-primary">404</h1>
        <h2 className="mt-4 text-xl font-display tracking-wider">NOTHING HERE</h2>
        <p className="mt-2 text-sm text-muted-foreground font-mono">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-mono tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            ← GO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
});