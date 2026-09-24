import { createFileRoute } from "@tanstack/react-router";

import {
  Callout,
  Code,
  DocsPage,
  H2,
  H3,
  Ol,
  P,
  Ul,
} from "@/components/docs/page";

export const Route = createFileRoute("/docs/architecture")({
  component: Architecture,
});

function Architecture() {
  return (
    <DocsPage
      title="Architecture"
      description="How project encryption, signed messages, and local state fit together."
    >
      <section className="space-y-4">
        <H2 id="pieces">The pieces</H2>
        <Ul>
          <li>
            <strong>CLI</strong> &mdash; a single Rust binary you run locally.
            Bundles <code>rpgp</code> (a pure-Rust OpenPGP implementation) for
            all encryption and decryption. No external <code>gpg</code> binary
            is required or used.
          </li>
          <li>
            <strong>API</strong> &mdash; a thin Rust + axum service backed by
            Postgres. Stores opaque ciphertext blobs, public keys, and project
            metadata. The project workflow trusts its membership and public-key
            records.
          </li>
          <li>
            <strong>Postgres</strong> stores identities, projects, membership,
            encrypted variables, invitations, friend relationships, messages,
            and operational metadata. Local CLI state is stored separately in
            SQLite.
          </li>
        </Ul>
      </section>

      <section className="space-y-4">
        <H2 id="flow-set">Setting a variable</H2>
        <Ol>
          <li>
            CLI fetches the current project&apos;s recipient list from the API
            &mdash; this is the list of users on the project, each carrying a
            public key.
          </li>
          <li>
            CLI JSON-encodes the pair <code>{`{ key, value }`}</code> and
            encrypts that single JSON blob to every recipient public key, using
            the bundled <code>rpgp</code>. Both the variable name and its value
            live <em>inside</em> the resulting ciphertext.
          </li>
          <li>
            CLI POSTs an array of ciphertext blobs to the API alongside the
            project ID. The request contains encrypted variable names and
            values.
          </li>
          <li>
            API writes a row per blob to <code>variables</code>. No decryption
            happens server-side, ever.
          </li>
        </Ol>
        <Callout variant="info" title="What the API sees">
          The request body is literally{" "}
          <code>{`{ project_id: "<uuid>", variables: ["<rpgp blob>", "<rpgp blob>"] }`}</code>
          . Both variable names and values are encrypted. Membership and
          recipient keys still come from the API, so a malicious server can
          target future writes by changing that list.
        </Callout>
      </section>

      <section className="space-y-4">
        <H2 id="flow-get">Reading a variable</H2>
        <Ol>
          <li>
            CLI looks up the current working directory in local SQLite state at{" "}
            <code>~/.config/envx/state.sqlite</code> to find the linked
            <code> project_id</code>.
          </li>
          <li>
            CLI fetches every ciphertext blob for that project from the API.
          </li>
          <li>
            CLI decrypts each blob with your private key using the bundled{" "}
            <code>rpgp</code>. If you&apos;ve set a{" "}
            <code>primary_key_command</code>, it&apos;s used to unlock the key
            (e.g. <code>op read &quot;op://Personal/envx&quot;</code>).
          </li>
          <li>
            Decrypted <code>{`{ key, value }`}</code> pairs are injected into
            the child process spawned by <code>envx run</code>, exported in{" "}
            <code>envx shell</code>, or printed by <code>envx variables</code>.
          </li>
        </Ol>
      </section>

      <section className="space-y-4">
        <H2 id="recipients">Recipients &amp; rotation</H2>
        <P>
          A &quot;recipient&quot; on a project is a user whose public key is
          included when encrypting every variable on it. Adding a teammate means
          adding their user account to the project and re-encrypting every
          variable to the expanded recipient set.
        </P>
        <H3 id="add">Adding a user to a project</H3>
        <Code lang="bash">{`envx project add-user <user-uuid>
# (or 'add-users' for multiple)
# all variables in the project are re-encrypted to include the new user`}</Code>
        <P>
          The CLI fetches every variable, decrypts each one locally, re-encrypts
          to the expanded recipient list, and writes back. The server only ever
          sees ciphertext.
        </P>
        <H3 id="rotate">Rotating a leaked key</H3>
        <Ol>
          <li>Remove the compromised user from the project.</li>
          <li>Generate fresh values for any secrets that were exposed.</li>
          <li>
            envx re-encrypts everything to the remaining recipients
            automatically.
          </li>
        </Ol>
        <Callout variant="warn" title="Important">
          Rotation does not invalidate ciphertext the leaked party already
          downloaded. Always rotate the secrets themselves, not just the
          recipient list.
        </Callout>
      </section>

      <section className="space-y-4">
        <H2 id="link-file">How linking works</H2>
        <P>
          When you <code>envx link</code> a directory, envx records the
          association in <code>~/.config/envx/state.sqlite</code>, scoped to the
          API, account UUID, and signing key. Child directories inherit the
          link. Human settings remain in <code>config.json</code>; existing
          project links migrate automatically.
        </P>
        <P>
          envx <strong>does not</strong> write a <code>.envx</code> file or any
          other marker into your project directory. The link is purely
          local-to-your-machine. Teammates link the same project by running{" "}
          <code>envx link</code> in their own checkout and picking the project
          from the interactive picker.
        </P>
      </section>

      <section className="space-y-4">
        <H2 id="threat">Threat model summary</H2>
        <Ul>
          <li>
            <strong>API compromise:</strong> a malicious server can alter the
            recipient keys used for future project writes. Existing project
            ciphertext is unsigned, so decryption does not prove its author.
            Friend pins do not change this legacy project protocol.
          </li>
          <li>
            <strong>Postgres dump:</strong> exposes ciphertext, public
            identities, and relationship/usage metadata. Variable names and
            values are inside encrypted payloads.
          </li>
          <li>
            <strong>Standalone messages:</strong> signatures, signed metadata,
            and locally pinned sender keys are verified before plaintext is
            released. See <a href="/docs/sharing">friends and messages</a>.
          </li>
          <li>
            <strong>Stolen laptop:</strong> attacker has your private key under{" "}
            <code>~/.config/envx/keys/</code>. Remove your user from every
            project, rotate the underlying secrets, and re-issue keys.
          </li>
          <li>
            <strong>Malicious CLI binary:</strong> review the installation
            source and release provenance, or build from source with{" "}
            <code>
              cargo install --git https://github.com/envx-project/cli envx
            </code>
            .
          </li>
        </Ul>
      </section>
    </DocsPage>
  );
}
