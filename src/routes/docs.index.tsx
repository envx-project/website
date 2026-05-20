import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { DocsPage, H2, P } from "@/components/docs/page";

export const Route = createFileRoute("/docs/")({
  component: DocsHome,
});

const CARDS = [
  {
    to: "/docs/quickstart" as const,
    title: "Quickstart",
    body: "Install the CLI, generate a key, run your first encrypted command.",
  },
  {
    to: "/docs/architecture" as const,
    title: "Architecture",
    body: "How the GPG flow, the API, and your shell fit together.",
  },
  {
    to: "/docs/self-host" as const,
    title: "Self-host",
    body: "Run the API yourself with Docker, Railway, or bare metal.",
  },
  {
    to: "/docs/hosted" as const,
    title: "Hosted",
    body: "Point your CLI at envx.sh and let us run Postgres for you.",
  },
  {
    to: "/docs/cli-reference" as const,
    title: "CLI reference",
    body: "Every command, every flag, copy-pasteable.",
  },
  {
    to: "/docs/auth" as const,
    title: "Authentication",
    body: "OpenPGP-signed timestamps as bearer tokens. No passwords, no sessions, no JWTs.",
  },
  {
    to: "/docs/security" as const,
    title: "Security model",
    body: "Threat model, what the server can and cannot see, key rotation.",
  },
];

function DocsHome() {
  return (
    <DocsPage
      title="Documentation"
      description="Two installs, one CLI, three commands. Pick where you want to start."
    >
      <div>
        <H2>Browse</H2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {CARDS.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group rounded-lg border border-border/60 bg-card/40 p-4 transition-colors hover:bg-card"
            >
              <div className="flex items-center justify-between font-mono text-sm font-medium">
                {c.title}
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <H2>What is envx?</H2>
        <P>
          <strong>envx</strong> is an open-source environment variable manager
          that encrypts every secret on your machine with your GPG key before it
          leaves. The server is a dumb store of opaque blobs &mdash; it cannot
          read your secrets even if it wanted to. Pair it with <code>op</code>{" "}
          or any password command, link it to a project directory, and you have{" "}
          <code>dotenv</code> ergonomics with proper cryptography.
        </P>
      </div>
    </DocsPage>
  );
}
