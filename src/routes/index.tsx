import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Box,
  GitBranch,
  KeyRound,
  Lock,
  Server,
  ShieldCheck,
  Terminal as TerminalIcon,
  Zap,
} from "lucide-react";

import { InstallTabs } from "@/components/install-tabs";
import { Terminal } from "@/components/terminal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <ComparisonTeaser />
      <CtaStrip />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Badge
              variant="outline"
              className="mb-5 gap-2 border-border/60 font-mono"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
              v2.13.0 · alpha
            </Badge>
            <h1 className="font-mono text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Your env vars,{" "}
              <span className="text-muted-foreground">
                end-to-end encrypted.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
              <span className="font-mono text-foreground">envx</span> is an
              open-source secrets manager backed by GPG. The server never sees
              plaintext. Self-host it in five minutes, or use the hosted
              version.
            </p>

            <div className="mt-8">
              <InstallTabs />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/docs/quickstart">
                  Quickstart
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href="https://github.com/envx-project/cli"
                  target="_blank"
                  rel="noreferrer"
                >
                  Star on GitHub
                </a>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" /> E2E encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <Server className="h-3.5 w-3.5" /> Self-hostable
              </span>
              <span className="flex items-center gap-1.5">
                <GitBranch className="h-3.5 w-3.5" /> GPL-3.0
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" /> Single Rust binary
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-br from-emerald/10 via-transparent to-sky/10 blur-2xl" />
            <Terminal
              title="~/work/api"
              lines={[
                { kind: "prompt", cwd: "~/work/api", cmd: "envx variables" },
                {
                  kind: "table",
                  title: "Variables",
                  rows: [
                    ["DATABASE_URL", "postgres://localhost:5432/api"],
                    ["REDIS_URL", "redis://localhost:6379"],
                    ["STRIPE_SECRET", "sk_live_4eC39HqLyjWDarjtT1zd"],
                    ["JWT_SECRET", "vG7sH2k9pL4mN8qR1tU6wX0aB3"],
                    ["OPENAI_API_KEY", "sk-proj-9F8w7xV3aB1cD2eF4gH"],
                  ],
                },
                { kind: "blank" },
                {
                  kind: "prompt",
                  cwd: "~/work/api",
                  cmd: "envx run -- bun start",
                },
                { kind: "out", text: "$ bun run dev", tone: "muted" },
                { kind: "out", text: "  ready in 142ms", tone: "muted" },
                { kind: "out", text: "  listening on http://localhost:3000" },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Zero-knowledge by design",
    body: "Vars are encrypted on your machine with your GPG key before they ever leave. The server is a dumb store of opaque blobs.",
  },
  {
    icon: KeyRound,
    title: "GPG-native key management",
    body: "Bring your existing GPG key or generate one with envx gen. Pair it with op or any password command for unlocked-by-1Password ergonomics.",
  },
  {
    icon: TerminalIcon,
    title: "One command from .env to prod",
    body: "envx run wraps any process with decrypted env vars. envx shell drops you into a subshell. Drop-in for dotenv-cli.",
  },
  {
    icon: Server,
    title: "Self-host or use ours",
    body: "Single Docker image + Postgres. Deploy to Railway, Fly, or your laptop. No daemon, no agent, no SaaS lock-in.",
  },
  {
    icon: Box,
    title: "Directory-aware",
    body: "Link a directory once. envx picks the right project automatically based on where you are.",
  },
  {
    icon: GitBranch,
    title: "Auditable, open, GPL-3.0",
    body: "Single Rust binary. ~6k LOC. Read every line that touches your secrets — and fork it if you want.",
  },
];

function Features() {
  return (
    <section className="border-t border-border/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            features
          </div>
          <h2 className="mt-2 font-mono text-3xl font-semibold tracking-tight">
            What you actually get
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group relative bg-card/60 p-6 transition-colors hover:bg-card"
            >
              <f.icon className="h-5 w-5 text-foreground/70" />
              <h3 className="mt-4 font-mono text-base font-medium">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Generate a key",
      cmd: "envx gen",
      out: "→ created GPG key 4A11...C9B3",
    },
    {
      n: "02",
      title: "Link a project",
      cmd: "envx link",
      out: "→ linked ~/work/api → project api/production",
    },
    {
      n: "03",
      title: "Set & run",
      cmd: "envx run -- bun start",
      out: "→ injected 14 decrypted vars",
    },
  ];

  return (
    <section className="border-t border-border/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            how it works
          </div>
          <h2 className="mt-2 font-mono text-3xl font-semibold tracking-tight">
            Three commands, zero plaintext on the wire
          </h2>
          <p className="mt-3 text-muted-foreground">
            The server stores opaque ciphertext blobs keyed by project. Every
            user holds an OpenPGP key. Setting a variable encrypts the
            name+value pair to all authorized recipients; reading it decrypts
            locally with bundled rpgp.
          </p>
        </div>

        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative overflow-hidden rounded-xl border border-border/60 bg-card/50 p-6"
            >
              <div className="font-mono text-xs text-muted-foreground">
                {s.n}
              </div>
              <h3 className="mt-2 font-mono text-base font-medium">
                {s.title}
              </h3>
              <div className="mt-4 rounded-md border border-border/60 bg-background/60 p-3 font-mono text-xs">
                <div>
                  <span className="text-muted-foreground">$</span> {s.cmd}
                </div>
                <div className="mt-1 text-emerald">{s.out}</div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 text-sm">
          <Link
            to="/docs/architecture"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            Read the full architecture
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ComparisonTeaser() {
  type V = boolean | "partial";
  type R = {
    f: string;
    envx: V;
    doppler: V;
    infisical: V;
    dotenv: V;
    vault: V;
  };
  const rows: R[] = [
    {
      f: "End-to-end encrypted",
      envx: true,
      doppler: false,
      infisical: "partial",
      dotenv: false,
      vault: false,
    },
    {
      f: "Self-hostable (free)",
      envx: true,
      doppler: false,
      infisical: true,
      dotenv: false,
      vault: true,
    },
    {
      f: "No daemon required",
      envx: true,
      doppler: true,
      infisical: true,
      dotenv: true,
      vault: false,
    },
    {
      f: "Open source",
      envx: true,
      doppler: false,
      infisical: true,
      dotenv: true,
      vault: "partial",
    },
    {
      f: "Single static binary",
      envx: true,
      doppler: true,
      infisical: false,
      dotenv: true,
      vault: true,
    },
  ];

  return (
    <section className="border-t border-border/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              vs. the competition
            </div>
            <h2 className="mt-2 font-mono text-3xl font-semibold tracking-tight">
              Pick the row that matters to you
            </h2>
          </div>
          <Link
            to="/compare"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            Full matrix →
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-card/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Feature</th>
                <th className="px-4 py-3 text-left font-mono text-foreground">
                  envx
                </th>
                <th className="px-4 py-3 text-left font-medium">Doppler</th>
                <th className="px-4 py-3 text-left font-medium">Infisical</th>
                <th className="px-4 py-3 text-left font-medium">
                  dotenv-vault
                </th>
                <th className="px-4 py-3 text-left font-medium">Vault</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.f} className="border-t border-border/60">
                  <td className="px-4 py-3 text-foreground/90">{r.f}</td>
                  <Cell v={r.envx} highlight />
                  <Cell v={r.doppler} />
                  <Cell v={r.infisical} />
                  <Cell v={r.dotenv} />
                  <Cell v={r.vault} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Cell({
  v,
  highlight,
}: {
  v: boolean | "partial";
  highlight?: boolean;
}) {
  const label = v === true ? "yes" : v === "partial" ? "partial" : "no";
  const tone =
    v === true
      ? "text-emerald"
      : v === "partial"
        ? "text-amber"
        : "text-muted-foreground";
  return (
    <td
      className={
        "px-4 py-3 font-mono text-xs " +
        tone +
        (highlight ? " bg-emerald/5" : "")
      }
    >
      {label}
    </td>
  );
}

function CtaStrip() {
  return (
    <section className="border-t border-border/60 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-mono text-3xl font-semibold tracking-tight">
          Stop committing <span className="text-rose">.env</span> by accident
        </h2>
        <p className="mt-4 text-muted-foreground">
          Install once, link your projects, never paste a secret into Slack
          again.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/docs/quickstart">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/docs/self-host">Self-host guide</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
