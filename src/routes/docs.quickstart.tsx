import { createFileRoute } from "@tanstack/react-router";
import { Callout, Code, DocsPage, H2, P, Ul } from "@/components/docs/page";
export const Route = createFileRoute("/docs/quickstart")({
  component: Quickstart,
});
function Quickstart() {
  return (
    <DocsPage
      title="Quickstart"
      description="Install envx, create a project, and run a process with encrypted environment variables."
    >
      <section className="space-y-4">
        <H2 id="install">1. Install the CLI</H2>
        <P>On macOS, Linux, or WSL:</P>
        <Code>{`curl -fsSL https://get.envx.sh | bash
envx --version`}</Code>
        <P>
          On Windows, download the appropriate binary from{" "}
          <a
            href="https://github.com/envx-project/cli/releases/latest"
            target="_blank"
            rel="noreferrer"
          >
            GitHub releases
          </a>{" "}
          and follow the{" "}
          <a
            href="https://github.com/envx-project/cli/blob/main/windows-installation.md"
            target="_blank"
            rel="noreferrer"
          >
            Windows installation guide
          </a>
          .
        </P>
        <Callout variant="info" title="Upgrading an existing profile?">
          Keep using your current key and commands. Local operational state
          migrates to SQLite automatically. You do not need to generate a new
          key or re-upload it. See{" "}
          <a href="/docs/local-state">local state and upgrades</a>.
        </Callout>
      </section>
      <section className="space-y-4">
        <H2 id="key">2. Generate your first key</H2>
        <P>
          For a new profile, generate a passphrase-protected OpenPGP key. The
          prompts collect your username and passphrase, and envx registers the
          public key with the configured API.
        </P>
        <Code>{`envx gen
envx whoami`}</Code>
        <P>
          The default API is <code>https://api.envx.sh</code>. To use your own
          server, set <code>sdk_url</code> before generating the key. If you
          used <code>envx gen --no-upload</code>, register it later with{" "}
          <code>envx upload</code>.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="project">3. Create or link a project</H2>
        <Code>{`cd ~/work/api
envx project new --name api-development`}</Code>
        <P>
          A new project links to the current directory unless it already has a
          project link. To use an existing project instead, run{" "}
          <code>envx link</code> and select it. Links apply in child directories
          and are stored locally; no file is added to your checkout.
        </P>
        <Callout variant="info">
          Projects are flat sets of variables. For development, staging, and
          production, create a separate project for each environment.
        </Callout>
      </section>
      <section className="space-y-4">
        <H2 id="set">4. Set variables</H2>
        <P>
          Pass <code>KEY=VALUE</code> pairs or pipe an existing environment
          file. These examples use a dummy local URL; avoid putting real
          credentials into shell history.
        </P>
        <Code>{`envx set DATABASE_URL=postgres://localhost:5432/api
# Or read KEY=VALUE lines from an existing file:
envx set < .env`}</Code>
        <P>
          When replacing an existing variable through a pipe, use{" "}
          <code>envx set --yes &lt; .env</code> to explicitly approve the
          overwrite. Names and values are encrypted to the project&apos;s
          server-provided recipient list before upload.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="run">5. Run your process</H2>
        <Code>{`envx run -- bun dev
envx run -- cargo run --bin api
# Or open a shell with the same variables:
envx shell`}</Code>
        <P>
          <code>envx variables</code> displays decrypted values. Use it only
          where it is safe to show secrets.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="next">Next steps</H2>
        <Ul>
          <li>
            <a href="/docs/sharing">
              Add a friend and send a signed encrypted message
            </a>
            .
          </li>
          <li>
            <a href="/docs/security">
              Understand project trust and message verification
            </a>
            .
          </li>
          <li>
            <a href="/docs/self-host">Run your own API</a>.
          </li>
          <li>
            <a href="/docs/cli-reference">Browse command examples</a>, or run{" "}
            <code>envx &lt;command&gt; --help</code> for the installed version.
          </li>
        </Ul>
      </section>
    </DocsPage>
  );
}
