import { Link } from "@tanstack/react-router";

const SECTIONS = [
  {
    title: "Get started",
    items: [
      { to: "/docs", label: "Overview" },
      { to: "/docs/quickstart", label: "Quickstart" },
      { to: "/docs/cli-reference", label: "CLI reference" },
      { to: "/docs/sharing", label: "Friends and messages" },
      { to: "/docs/local-state", label: "Local state and upgrades" },
    ],
  },
  {
    title: "Deploy",
    items: [
      { to: "/docs/self-host", label: "Self-host" },
      { to: "/docs/hosted", label: "Hosted (envx.sh)" },
    ],
  },
  {
    title: "Concepts",
    items: [
      { to: "/docs/architecture", label: "Architecture" },
      { to: "/docs/auth", label: "Authentication" },
      { to: "/docs/security", label: "Security model" },
    ],
  },
] as const;

export function DocsSidebar() {
  return (
    <nav className="sticky top-20 hidden h-fit w-56 shrink-0 lg:block">
      <ul className="space-y-6 text-sm">
        {SECTIONS.map((s) => (
          <li key={s.title}>
            <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {s.title}
            </div>
            <ul className="space-y-1">
              {s.items.map((i) => (
                <li key={i.to}>
                  <Link
                    to={i.to}
                    className="block rounded-md px-2 py-1 text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
                    activeProps={{
                      className: "bg-accent/60 text-foreground",
                    }}
                    activeOptions={{ exact: true }}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
