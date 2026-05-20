import { createFileRoute } from "@tanstack/react-router";

import { Callout, Code, DocsPage, H2, Ol, P, Ul } from "@/components/docs/page";

export const Route = createFileRoute("/docs/quickstart")({
  component: Quickstart,
});

function Quickstart() {
  return (
    <DocsPage
      title="Quickstart"
      description="From zero to running a process with encrypted env vars in under five minutes."
    >
      <section className="space-y-4">
        <H2 id="install">1. Install the CLI</H2>
        <P>macOS, Linux, or WSL:</P>
        <Code lang="bash">{`curl -fsSL get.envx.sh | bash`}</Code>
        <P>
          On Windows, grab the binary from{" "}
          <a
            href="https://github.com/envx-project/cli/releases/latest"
            target="_blank"
            rel="noreferrer"
          >
            the latest release
          </a>{" "}
          and add it to <code>PATH</code>. See the{" "}
          <a
            href="https://github.com/envx-project/cli/blob/main/windows-installation.md"
            target="_blank"
            rel="noreferrer"
          >
            Windows guide
          </a>{" "}
          for details.
        </P>
        <Callout variant="info" title="Verify">
          Run <code>envx version</code>. You should see a fancy banner with the
          version and build SHA.
        </Callout>
      </section>

      <section className="space-y-4">
        <H2 id="key">2. Get a key</H2>
        <P>
          envx uses GPG for asymmetric encryption. You can bring your own key or
          generate a fresh one:
        </P>
        <Code lang="bash">{`# generate a new GPG key and save it under ~/.config/envx/keys
envx gen

# OR import an existing armored key
envx import ./my-key.asc

# tell the server about your public key
envx upload`}</Code>
      </section>

      <section className="space-y-4">
        <H2 id="link">3. Link a project</H2>
        <P>
          Linking a directory tells envx which project to use when you&apos;re
          inside it. The link is stored in your global config at{" "}
          <code>~/.config/envx/config.json</code> &mdash; nothing is written to
          the project directory itself.
        </P>
        <Code lang="bash">{`cd ~/work/api
envx link`}</Code>
        <P>You&apos;ll be prompted to pick a project from your existing ones.</P>
        <Callout variant="info" title="Need a new project?">
          Run <code>envx project new</code> first. envx does not model
          environments &mdash; if you want a <code>staging</code>/
          <code>production</code> split, create one project per environment.
        </Callout>
      </section>

      <section className="space-y-4">
        <H2 id="set">4. Set some variables</H2>
        <Code lang="bash">{`envx set DATABASE_URL
# ? value › postgres://...

envx set API_KEY
# ? value › sk_live_...`}</Code>
        <P>
          Each value is encrypted to every authorized recipient key on the
          project before being uploaded.
        </P>
      </section>

      <section className="space-y-4">
        <H2 id="run">5. Run something with them</H2>
        <Code lang="bash">{`# wrap any process with decrypted env vars
envx run -- bun dev
envx run -- cargo run --bin api

# or drop into a subshell with vars set
envx shell

# or just dump them
envx variables`}</Code>
        <Callout variant="good" title="That's it">
          You now have end-to-end encrypted secrets management. No daemon. No
          plaintext on the wire. No SaaS lock-in.
        </Callout>
      </section>

      <section className="space-y-4">
        <H2 id="next">Next steps</H2>
        <Ul>
          <li>
            Configure a <code>primary_key_command</code> so envx unlocks your
            key via <code>op read</code> automatically.
          </li>
          <li>
            Self-host the API for your team: see <code>/docs/self-host</code>.
          </li>
          <li>Read the full CLI reference for every command and flag.</li>
        </Ul>
        <Ol>
          <li>
            <code>envx config get</code> — print your full config
          </li>
          <li>
            <code>envx list-projects</code> — list projects you have access to
          </li>
          <li>
            <code>envx project list-users</code> — see which users can decrypt
            the active project
          </li>
        </Ol>
      </section>
    </DocsPage>
  );
}
