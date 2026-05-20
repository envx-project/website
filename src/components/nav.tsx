import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/docs", label: "Docs" },
  { to: "/compare", label: "Compare" },
] as const;

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
        >
          <Logo className="h-5 w-5" />
          <span>envx</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-normal text-muted-foreground">v2.13.0</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "text-foreground bg-accent/40" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <a
              href="https://github.com/envx-project"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
          <Button asChild size="sm">
            <Link to="/docs/quickstart">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
