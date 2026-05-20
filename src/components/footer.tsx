import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/logo";

type InternalLink = { label: string; to: string; href?: undefined };
type ExternalLink = { label: string; href: string; to?: undefined };
type Col = { title: string; links: (InternalLink | ExternalLink)[] };

const cols: Col[] = [
  {
    title: "Product",
    links: [
      { label: "Docs", to: "/docs" },
      { label: "Self-host", to: "/docs/self-host" },
      { label: "Compare", to: "/compare" },
    ],
  },
  {
    title: "Source",
    links: [
      { label: "CLI", href: "https://github.com/envx-project/cli" },
      { label: "API", href: "https://github.com/envx-project/api" },
      {
        label: "Releases",
        href: "https://github.com/envx-project/cli/releases",
      },
    ],
  },
  {
    title: "Reference",
    links: [
      { label: "Architecture", to: "/docs/architecture" },
      { label: "CLI reference", to: "/docs/cli-reference" },
      {
        label: "License (GPL-3.0)",
        href: "https://github.com/envx-project/cli/blob/main/LICENSE",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-sm font-semibold">
            <Logo className="h-5 w-5" />
            envx
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            End-to-end encrypted environment variables. Open source,
            self-hostable.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {col.title}
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.to ? (
                    <Link
                      to={l.to}
                      className="text-foreground/80 hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-foreground/80 hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <div>© {new Date().getFullYear()} envx-project. GPL-3.0.</div>
          <div className="font-mono">
            built by{" "}
            <a
              href="https://github.com/alexng353"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              @alexng353
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
