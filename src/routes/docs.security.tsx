import { createFileRoute } from "@tanstack/react-router";

import { Callout, DocsPage, H2, P, Ul } from "@/components/docs/page";

export const Route = createFileRoute("/docs/security")({
  component: Security,
});

function Security() {
  return (
    <DocsPage
      title="Security model"
      description="What envx defends against, what it doesn't, and where the trust boundaries live."
    >
      <section className="space-y-4">
        <H2 id="goals">Design goals</H2>
        <Ul>
          <li>
            <strong>The server cannot read secrets.</strong> Not us, not your
            cloud provider, not a malicious admin with database access.
          </li>
          <li>
            <strong>Plaintext never crosses the network.</strong> Encryption
            happens on your machine before any HTTP request.
          </li>
          <li>
            <strong>Standard cryptography.</strong> GPG/OpenPGP. No home-rolled
            primitives.
          </li>
          <li>
            <strong>Auditable.</strong> ~6k LOC of Rust. You can read every line
            that handles a secret in an afternoon.
          </li>
        </Ul>
      </section>

      <section className="space-y-4">
        <H2 id="boundaries">Trust boundaries</H2>
        <Ul>
          <li>
            <strong>Trusted:</strong> your machine, your GPG private key, the
            <code> primary_key_command</code> binary (e.g. <code>op</code>).
          </li>
          <li>
            <strong>Untrusted:</strong> the envx API, the database, the network,
            and any logs or backups the host produces.
          </li>
        </Ul>
      </section>

      <section className="space-y-4">
        <H2 id="non-goals">Non-goals</H2>
        <Ul>
          <li>
            <strong>Anonymity.</strong> The server knows which keys belong to
            which projects. It can tell that a request happened, who made it,
            and what variable name was set &mdash; just not the value.
          </li>
          <li>
            <strong>Protecting against a malicious CLI.</strong> If you run a
            tampered binary, all bets are off. Install from source or verify the
            install script.
          </li>
          <li>
            <strong>Defending against your own teammates.</strong> Recipients on
            a project can decrypt every variable on it. envx does not yet do
            per-variable ACLs.
          </li>
        </Ul>
      </section>

      <section className="space-y-4">
        <H2 id="report">Reporting issues</H2>
        <P>
          Found a vulnerability? Open a private security advisory on the{" "}
          <a
            href="https://github.com/envx-project/cli/security/advisories"
            target="_blank"
            rel="noreferrer"
          >
            CLI repo
          </a>{" "}
          or the{" "}
          <a
            href="https://github.com/envx-project/api/security/advisories"
            target="_blank"
            rel="noreferrer"
          >
            API repo
          </a>
          . We&apos;ll triage within a couple of days.
        </P>
        <Callout variant="warn" title="Alpha software">
          envx is pre-1.0. Treat it accordingly: don&apos;t use it for the
          nuclear launch codes yet.
        </Callout>
      </section>
    </DocsPage>
  );
}
