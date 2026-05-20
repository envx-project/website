import { createFileRoute } from "@tanstack/react-router";

import { Callout, Code, DocsPage, H2, P, Ul } from "@/components/docs/page";

export const Route = createFileRoute("/docs/hosted")({
  component: Hosted,
});

function Hosted() {
  return (
    <DocsPage
      title="Hosted version"
      description="Skip the ops work. Point your CLI at envx.sh and we'll run Postgres for you."
    >
      <section className="space-y-4">
        <H2 id="default">Defaults</H2>
        <P>
          The CLI ships pre-configured to talk to the hosted API at{" "}
          <code>https://api.envx.sh</code>. After installing, just run{" "}
          <code>envx gen</code> and <code>envx upload</code> to get going.
        </P>
        <Code lang="bash">{`curl -fsSL get.envx.sh | bash
envx gen
envx upload`}</Code>
      </section>

      <section className="space-y-4">
        <H2 id="zero-knowledge">What we can see</H2>
        <P>
          The hosted version runs the same binary as the self-hosted one. That
          means even we can&apos;t read your secrets. The server stores:
        </P>
        <Ul>
          <li>
            Your public key (just the public half &mdash; never the private key)
          </li>
          <li>Project names and the list of users on each project</li>
          <li>
            Encrypted blobs containing variable name + value pairs (the name is
            inside the ciphertext, not stored in plaintext)
          </li>
        </Ul>
        <Callout variant="info">
          If our database ever leaks, the attacker gets a list of project names
          and encrypted blobs. Without your private GPG key, the blobs are
          useless.
        </Callout>
      </section>

      <section className="space-y-4">
        <H2 id="limits">Limits</H2>
        <P>
          The hosted version has abuse limits to keep the service usable for
          everyone. They&apos;re generous for normal use:
        </P>
        <div className="overflow-hidden rounded-lg border border-border/60">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-card/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Limit</th>
                <th className="px-4 py-2 text-left font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Variables per project", "256"],
                ["Bytes per variable", "128 KB"],
                ["Total bytes per project", "20 MB"],
                ["Users per project", "Unlimited"],
                ["Projects per user", "Unlimited"],
              ].map(([k, v]) => (
                <tr key={k} className="border-t border-border/60">
                  <td className="px-4 py-2 text-foreground/90">{k}</td>
                  <td className="whitespace-nowrap px-4 py-2 font-mono text-[13px]">
                    {v}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <P>
          A team of 100 engineers on one project fits well under these limits.
          The caps exist to stop someone from accidentally (or intentionally)
          using the hosted instance as cheap object storage.
        </P>
        <Callout variant="info" title="Need more?">
          If you genuinely need more than 256 variables or 20 MB on a single
          project, <strong>self-host</strong>. The self-hosted binary has no
          built-in caps (you can configure them via{" "}
          <code>settings.max_variables_per_project</code> and{" "}
          <code>settings.max_project_bytes</code> if you want them). See{" "}
          <a href="/docs/self-host">/docs/self-host</a>.
        </Callout>
      </section>

      <section className="space-y-4">
        <H2 id="pricing">Pricing</H2>
        <P>
          During alpha, the hosted version is free. We have not committed to a
          paid tier. If you want guaranteed uptime or higher limits, self-host.
        </P>
      </section>

      <section className="space-y-4">
        <H2 id="switch">Switching back to self-hosted later</H2>
        <Code lang="bash">{`envx config set sdk_url https://envx.your-company.com
envx upload   # publish your public key to the new server`}</Code>
        <P>
          Your local keys are unchanged. You can run two configs side by side if
          you want.
        </P>
      </section>
    </DocsPage>
  );
}
