import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, Minus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/compare")({
  component: Compare,
});

type Cell = boolean | "partial" | string;

const COLS = [
  "envx",
  "Doppler",
  "Infisical",
  "dotenv-vault",
  "HashiCorp Vault",
  "1Password Secrets",
] as const;

type Col = (typeof COLS)[number];

type Row = {
  feature: string;
  note?: string;
  vals: Record<Col, Cell>;
};

const SECTIONS: { title: string; rows: Row[] }[] = [
  {
    title: "Security model",
    rows: [
      {
        feature: "Client-side E2E encryption",
        note: "envx encrypts locally; project recipient keys are supplied by its API.",
        vals: {
          envx: true,
          Doppler: false,
          Infisical: "partial",
          "dotenv-vault": false,
          "HashiCorp Vault": false,
          "1Password Secrets": "partial",
        },
      },
      {
        feature: "Standard cryptography (GPG/OpenPGP)",
        vals: {
          envx: true,
          Doppler: false,
          Infisical: false,
          "dotenv-vault": false,
          "HashiCorp Vault": false,
          "1Password Secrets": false,
        },
      },
      {
        feature: "Per-recipient access control",
        vals: {
          envx: true,
          Doppler: "partial",
          Infisical: true,
          "dotenv-vault": false,
          "HashiCorp Vault": true,
          "1Password Secrets": true,
        },
      },
      {
        feature: "Auditable open source",
        vals: {
          envx: "GPL-3.0",
          Doppler: false,
          Infisical: "MIT (server)",
          "dotenv-vault": false,
          "HashiCorp Vault": "BSL",
          "1Password Secrets": false,
        },
      },
    ],
  },
  {
    title: "Deployment",
    rows: [
      {
        feature: "Self-hostable for free",
        vals: {
          envx: true,
          Doppler: false,
          Infisical: true,
          "dotenv-vault": false,
          "HashiCorp Vault": true,
          "1Password Secrets": false,
        },
      },
      {
        feature: "Single static binary",
        vals: {
          envx: true,
          Doppler: true,
          Infisical: false,
          "dotenv-vault": true,
          "HashiCorp Vault": true,
          "1Password Secrets": true,
        },
      },
      {
        feature: "No daemon / agent required",
        vals: {
          envx: true,
          Doppler: true,
          Infisical: true,
          "dotenv-vault": true,
          "HashiCorp Vault": false,
          "1Password Secrets": false,
        },
      },
      {
        feature: "Postgres-only persistence",
        vals: {
          envx: true,
          Doppler: false,
          Infisical: true,
          "dotenv-vault": false,
          "HashiCorp Vault": "various",
          "1Password Secrets": false,
        },
      },
    ],
  },
  {
    title: "Developer ergonomics",
    rows: [
      {
        feature: "envx run -- <cmd> wrapper",
        vals: {
          envx: true,
          Doppler: true,
          Infisical: true,
          "dotenv-vault": "partial",
          "HashiCorp Vault": "partial",
          "1Password Secrets": "partial",
        },
      },
      {
        feature: "Per-directory project linking",
        vals: {
          envx: true,
          Doppler: true,
          Infisical: true,
          "dotenv-vault": true,
          "HashiCorp Vault": false,
          "1Password Secrets": false,
        },
      },
      {
        feature: "Unlock via 1Password / pass",
        vals: {
          envx: true,
          Doppler: false,
          Infisical: false,
          "dotenv-vault": false,
          "HashiCorp Vault": "partial",
          "1Password Secrets": true,
        },
      },
    ],
  },
  {
    title: "Pricing",
    rows: [
      {
        feature: "Free tier",
        vals: {
          envx: "alpha, free",
          Doppler: "up to 5 users",
          Infisical: "self-host free",
          "dotenv-vault": "limited",
          "HashiCorp Vault": "self-host free",
          "1Password Secrets": "paid only",
        },
      },
    ],
  },
];

function Compare() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="max-w-3xl">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          comparison
        </div>
        <h1 className="mt-2 font-mono text-4xl font-semibold tracking-tight text-balance">
          envx vs. the secrets-manager landscape
        </h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">
          No tool is perfect for every team. Here&apos;s an honest look at where
          envx wins, where it loses, and what trade-offs you&apos;re making
          either way.
        </p>
      </header>

      <div className="mt-12 space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="mb-3 font-mono text-sm uppercase tracking-widest text-muted-foreground">
              {s.title}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border/60">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-card/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Feature</th>
                    {COLS.map((c) => (
                      <th
                        key={c}
                        className={cn(
                          "px-4 py-3 text-left font-medium",
                          c === "envx" && "font-mono text-foreground",
                        )}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.rows.map((r) => (
                    <tr
                      key={r.feature}
                      className="border-t border-border/60 align-top"
                    >
                      <td className="px-4 py-3 text-foreground/90">
                        {r.feature}
                        {r.note && (
                          <div className="mt-0.5 text-xs text-muted-foreground">
                            {r.note}
                          </div>
                        )}
                      </td>
                      {COLS.map((c) => (
                        <CompareCell
                          key={c}
                          val={r.vals[c]}
                          highlight={c === "envx"}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-xl border border-border/60 bg-card/40 p-8">
        <h2 className="font-mono text-xl font-semibold tracking-tight">
          When envx is the right call
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-foreground/85">
          <li>
            • You want client-side encryption and understand the project
            recipient trust model.
          </li>
          <li>• You already have a GPG workflow (or want one).</li>
          <li>• You prefer a single Rust binary over an agent + daemon.</li>
          <li>
            • You&apos;d rather{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
              docker compose up
            </code>{" "}
            than sign a SaaS contract.
          </li>
        </ul>
        <h2 className="mt-8 font-mono text-xl font-semibold tracking-tight">
          When it&apos;s not
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-foreground/85">
          <li>
            • You need dynamic secrets (database credentials issued
            per-session). Use Vault.
          </li>
          <li>
            • You want a polished UI for non-engineers. Try Doppler or 1Password
            Secrets.
          </li>
          <li>• You need SOC 2 paperwork today. envx is alpha software.</li>
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild>
            <Link to="/docs/quickstart">Try envx in 5 minutes</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/docs/architecture">Read the architecture</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function CompareCell({ val, highlight }: { val: Cell; highlight?: boolean }) {
  if (val === true) {
    return (
      <td className={cn("px-4 py-3", highlight && "bg-emerald/5")}>
        <Check className="h-4 w-4 text-emerald" />
      </td>
    );
  }
  if (val === false) {
    return (
      <td className="px-4 py-3">
        <X className="h-4 w-4 text-muted-foreground/60" />
      </td>
    );
  }
  if (val === "partial") {
    return (
      <td className="px-4 py-3">
        <div className="inline-flex items-center gap-1.5 font-mono text-xs text-amber">
          <Minus className="h-3.5 w-3.5" />
          partial
        </div>
      </td>
    );
  }
  return (
    <td
      className={cn(
        "px-4 py-3 font-mono text-xs text-foreground/80",
        highlight && "bg-emerald/5",
      )}
    >
      {val}
    </td>
  );
}
