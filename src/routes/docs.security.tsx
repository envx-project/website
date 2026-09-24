import { createFileRoute } from "@tanstack/react-router";
import { Callout, DocsPage, H2, P, Ul } from "@/components/docs/page";
export const Route = createFileRoute("/docs/security")({ component: Security });
function Security() {
  return (
    <DocsPage
      title="Security model"
      description="Encryption, identity verification, and the trust each workflow requires."
    >
      <section className="space-y-4">
        <H2 id="projects">Project variables</H2>
        <P>
          The CLI encrypts each variable name and value together using OpenPGP
          before uploading it. Private keys and key passphrases stay on your
          machine. A database dump contains ciphertext and metadata, not
          plaintext variable names or values.
        </P>
        <Callout
          variant="warn"
          title="Project membership is trusted from the server"
        >
          The CLI obtains project membership and recipient public keys from the
          API. A malicious server can substitute or add a key and receive
          secrets on a subsequent write or re-encryption. Existing project
          ciphertext is unsigned: decryption does not authenticate who wrote a
          variable. Local friend pins do not change this project protocol.
        </Callout>
      </section>
      <section className="space-y-4">
        <H2 id="messages">Signed messages between friends</H2>
        <P>
          Standalone messages are signed by the sender and encrypted to the
          recipient. Before releasing plaintext, the CLI verifies the signature
          and message metadata against the sender&apos;s locally pinned
          identity. A changed key requires explicit fingerprint verification; a
          matching server username is not sufficient.
        </P>
        <P>
          Exchange friend links through a channel where you already know the
          person. The full link carries the trust information; its short
          memorable label is not a fingerprint. Pins and aliases are local to
          the current machine and account. See{" "}
          <a href="/docs/sharing">friends and messages</a> for the verification
          steps.
        </P>
        <P>
          The server can still withhold, delete, delay, or replay stored data. A
          recipient can retain plaintext or ciphertext after reading. Expiry,
          deletion, and removing a friend cannot revoke a copy already received.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="metadata">What the server can see</H2>
        <Ul>
          <li>
            Public keys, account identifiers, usernames, project names, and
            membership.
          </li>
          <li>
            Request timing, IP addresses, ciphertext sizes, and variable
            identifiers.
          </li>
          <li>
            Friend relationships and message sender, recipient, timestamps,
            expiry, and delivery metadata.
          </li>
        </Ul>
        <P>
          Variable names live inside the encrypted payload. Message contents are
          encrypted too. Metadata can still reveal relationships and usage
          patterns; envx does not provide anonymity.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="local">Your machine and recovery</H2>
        <Ul>
          <li>
            Trust the CLI binary, your operating system, and any{" "}
            <code>primary_key_command</code> used to unlock a key.
          </li>
          <li>
            Decrypted values are available to the process you run and to anyone
            you deliberately share them with.
          </li>
          <li>
            SQLite stores local operational state. It is not an encryption
            layer; cached secret payloads remain OpenPGP encrypted.
          </li>
          <li>
            After a key leak, remove that identity from projects and rotate the
            underlying credentials. Re-encryption cannot invalidate downloaded
            copies.
          </li>
        </Ul>
        <P>
          Use HTTPS for the API and installer. Back up your key files and local
          state using the <a href="/docs/local-state">recovery guidance</a>.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="report">Reporting issues</H2>
        <P>
          Report vulnerabilities privately through the{" "}
          <a
            href="https://github.com/envx-project/cli/security/advisories"
            target="_blank"
            rel="noreferrer"
          >
            CLI repository
          </a>{" "}
          or{" "}
          <a
            href="https://github.com/envx-project/api/security/advisories"
            target="_blank"
            rel="noreferrer"
          >
            API repository
          </a>
          .
        </P>
        <Callout variant="warn" title="Alpha software">
          Review the trust model and recovery process before relying on envx for
          production secrets.
        </Callout>
      </section>
    </DocsPage>
  );
}
