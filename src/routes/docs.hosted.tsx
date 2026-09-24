import { createFileRoute } from "@tanstack/react-router";
import { Callout, Code, DocsPage, H2, P, Ul } from "@/components/docs/page";
export const Route = createFileRoute("/docs/hosted")({ component: Hosted });
function Hosted() {
  return (
    <DocsPage
      title="Hosted version"
      description="Use the default API at api.envx.sh without operating a server."
    >
      <section className="space-y-4">
        <H2 id="start">Start a new profile</H2>
        <Code>{`curl -fsSL https://get.envx.sh | bash
envx gen
envx whoami`}</Code>
        <P>
          The CLI defaults to <code>https://api.envx.sh</code>. Generating a key
          also registers its public key unless you use <code>--no-upload</code>.
          Existing users can keep their current keys and profiles when
          upgrading.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="data">What the service stores</H2>
        <Ul>
          <li>
            Public keys, account identifiers, usernames, project names, and
            membership.
          </li>
          <li>
            Encrypted variable payloads containing both the name and value.
          </li>
          <li>
            Friend relationships, encrypted messages, and message/link metadata.
          </li>
          <li>
            Operational metadata such as request timing, IP addresses, and
            upload sizes.
          </li>
        </Ul>
        <P>
          Private keys and passphrases remain on the client. Project membership
          and public keys are supplied by the API and trusted by the
          project-variable workflow. Standalone messages use signatures and
          local pins. See the <a href="/docs/security">security model</a> for
          that distinction.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="limits">Default project limits</H2>
        <Ul>
          <li>256 variables per project.</li>
          <li>128 KiB of ciphertext per variable.</li>
          <li>20 MiB of ciphertext per project.</li>
          <li>100 MiB across a user&apos;s projects.</li>
          <li>100 MiB uploaded per IP in a rolling 24-hour window.</li>
        </Ul>
        <P>
          These are the server&apos;s default limits; operators can change them.
          Additional message and friend-link limits apply. Self-hosting uses the
          same defaults, with environment variables to adjust or disable them.
        </P>
        <Callout variant="info">
          For the exact configuration knobs, see{" "}
          <a href="/docs/self-host#limits">self-host limits</a>. Encryption adds
          overhead, so a ciphertext limit is not a plaintext file-size
          allowance.
        </Callout>
      </section>
      <section className="space-y-4">
        <H2 id="pricing">Availability</H2>
        <P>
          The hosted service is free during alpha. There is no promised uptime
          SLA. Self-host if you need to control deployment, availability, and
          retention.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="switch">Using a different server</H2>
        <Code>{`envx config set sdk_url https://envx.example.com`}</Code>
        <P>
          This changes where future requests go. It does not migrate account
          identities, remote projects, recipients, friends, or messages. A
          registered key keeps its existing UUID; upload refuses to replace an
          identity that cannot authenticate on the new server. Follow the{" "}
          <a href="/docs/self-host#point-cli">registration guidance</a> for that
          server and verify identities there. Local state is scoped to the API,
          account UUID, and signing key.
        </P>
      </section>
    </DocsPage>
  );
}
