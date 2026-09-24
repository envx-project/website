import { createFileRoute } from "@tanstack/react-router";
import { Callout, Code, DocsPage, H2, Ol, P, Ul } from "@/components/docs/page";
export const Route = createFileRoute("/docs/auth")({ component: Auth });
function Auth() {
  return (
    <DocsPage
      title="Authentication"
      description="The CLI proves control of an OpenPGP key by signing a recent timestamp."
    >
      <section className="space-y-4">
        <H2 id="flow">How requests authenticate</H2>
        <Ol>
          <li>
            The CLI unlocks your local private key using the OS keyring, a
            configured password source, or a prompt.
          </li>
          <li>
            It signs the current UTC timestamp with that key and packages the
            signed OpenPGP message with your account UUID.
          </li>
          <li>
            It sends the package as the Authorization bearer token over HTTPS.
          </li>
          <li>
            The API checks the timestamp window and verifies the signature using
            the public key stored for that account.
          </li>
          <li>
            The route then checks access to the requested project or other
            resource.
          </li>
        </Ol>
        <P>
          Your private key and passphrase are not sent to the API. The signed
          timestamp is an authentication credential: anyone who obtains it may
          replay it during its validity window.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="limits">What this does and does not prove</H2>
        <Ul>
          <li>
            Tokens are accepted for approximately ten minutes. Keep client and
            server clocks synchronized.
          </li>
          <li>
            A token authenticates an account; it is not a read-only or
            single-project token.
          </li>
          <li>
            Verification uses the server&apos;s account/public-key records. It
            is not independent proof of a teammate&apos;s identity.
          </li>
          <li>
            Authentication signatures do not sign existing project-variable
            ciphertext. Signed standalone messages have their own verification
            and local pinning.
          </li>
        </Ul>
        <Callout variant="info">
          For a CI job that should access only one project, use a dedicated
          key/account with only that project&apos;s membership. Protect the
          private key and password source available to the job.
        </Callout>
      </section>
      <section className="space-y-4">
        <H2 id="check">Check your setup</H2>
        <Code>{`envx whoami
envx auth
# Include request/response diagnostic metadata:
envx auth --debug`}</Code>
        <P>
          The auth command tests the configured server without printing the
          bearer credential. An authentication error may indicate an
          unregistered key, an incorrect password, a mismatched server/account,
          or clock skew. Do not generate a replacement key as the first recovery
          step.
        </P>
        <P>
          Use <code>envx upload</code> to register a key generated with{" "}
          <code>--no-upload</code>. If an account UUID already exists, upload
          verifies that identity and refuses to replace it when authentication
          fails. Your project access belongs to the server-side account, so
          preserve its identity and your key backups.
        </P>
      </section>
    </DocsPage>
  );
}
