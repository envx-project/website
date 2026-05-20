import { createFileRoute } from "@tanstack/react-router";

import { Callout, Code, DocsPage, H2, H3, Ol, P, Ul } from "@/components/docs/page";

export const Route = createFileRoute("/docs/auth")({
  component: Auth,
});

function Auth() {
  return (
    <DocsPage
      title="Authentication"
      description="envx has no passwords, sessions, or JWTs on the server. Every request authenticates by signing a fresh timestamp with your OpenPGP key."
    >
      <section className="space-y-4">
        <H2 id="big-idea">The big idea</H2>
        <P>
          The same OpenPGP keypair that encrypts your secrets also{" "}
          <em>authenticates</em> you to the API. To prove who you are, the CLI
          signs the current UTC timestamp with your private key and ships that
          signature as the bearer token. The server, which holds only your
          public key, verifies the signature and checks the timestamp is
          recent.
        </P>
        <P>
          No passwords leave your machine. No session tokens are stored
          server-side. The server table has columns for{" "}
          <code>id</code>, <code>username</code>, and <code>public_key</code>{" "}
          &mdash; that&apos;s it.
        </P>
      </section>

      <section className="space-y-4">
        <H2 id="flow">The flow, end to end</H2>
        <H3 id="client">On the client (CLI)</H3>
        <Ol>
          <li>
            Read your unlocked OpenPGP private key from{" "}
            <code>~/.config/envx/keys/&lt;fingerprint&gt;</code> (unlocked via
            keyring or <code>primary_key_command</code>).
          </li>
          <li>
            Take the current UTC timestamp as a string, e.g.{" "}
            <code>2026-05-20 17:42:30.125405625 UTC</code>.
          </li>
          <li>
            Build an OpenPGP signed message over that timestamp using
            SHA3-512 and your primary key (via the bundled <code>rpgp</code>{" "}
            library).
          </li>
          <li>
            ASCII-armor the signed message and bundle it with your user UUID:
            <Code lang="json">{`{
  "token":     "<your-user-uuid>",
  "signature": "-----BEGIN PGP MESSAGE-----\\n...\\n-----END PGP MESSAGE-----"
}`}</Code>
          </li>
          <li>
            Serialize as JSON, prefix with <code>Bearer </code>, and send as the
            <code> Authorization</code> header on every request.
          </li>
        </Ol>

        <H3 id="server">On the server (API)</H3>
        <Ol>
          <li>
            Strip the <code>Bearer </code> prefix and parse the JSON. Recover
            the user UUID and the armored signature.
          </li>
          <li>
            Parse the PGP message and pull out the signed payload (the
            timestamp string).
          </li>
          <li>
            <strong>Time-window check.</strong> Parse the payload as a UTC
            datetime. Reject if the signature is more than 10 minutes old, or
            if it&apos;s in the future at all.
          </li>
          <li>
            Look up the user&apos;s stored public key from the database by
            UUID.
          </li>
          <li>
            Verify the PGP signature against that public key. If valid, the
            request is authenticated as that UUID.
          </li>
        </Ol>
        <Callout variant="info" title="Source">
          Client side lives in{" "}
          <code>cli/src/utils/key.rs::UnlockedKey::auth_token</code>. Server
          side lives in{" "}
          <code>api/src/extractors/user.rs::validate_challenge</code>. About
          200 lines of code, end to end.
        </Callout>
      </section>

      <section className="space-y-4">
        <H2 id="why">Why this is nice</H2>
        <Ul>
          <li>
            <strong>No password storage.</strong> The server has nothing worth
            stealing in a database leak &mdash; public keys are, by definition,
            public.
          </li>
          <li>
            <strong>No sessions.</strong> No session table, no refresh tokens,
            no &quot;logged out everywhere&quot; flow to write. There&apos;s
            nothing to log out from.
          </li>
          <li>
            <strong>Stateless verification.</strong> The API can be scaled
            horizontally with zero shared state for auth. Each request carries
            everything needed to verify itself.
          </li>
          <li>
            <strong>Same key, two jobs.</strong> The OpenPGP key that encrypts
            your secrets also signs your auth challenges. Lose the key, lose
            both; rotate the key, rotate both. Mental model stays small.
          </li>
          <li>
            <strong>Hard to MITM usefully.</strong> An attacker who steals the
            armored signature can replay it for up to ~10 minutes
            &mdash; <em>and</em> would have to defeat TLS to grab it. They can
            never extend the window because they don&apos;t have the private
            key to sign a fresh timestamp.
          </li>
        </Ul>
      </section>

      <section className="space-y-4">
        <H2 id="tradeoffs">Honest trade-offs</H2>
        <Ul>
          <li>
            <strong>Clock skew matters.</strong> The server rejects signatures
            more than 10 minutes old or any amount in the future. Run NTP on
            the server. If your laptop&apos;s clock is wildly wrong, every
            request 401s.
          </li>
          <li>
            <strong>10-minute replay window.</strong> A signature is reusable
            for up to ten minutes. The bar is roughly &quot;break TLS, then
            replay within ten minutes,&quot; but it&apos;s a real window. A
            future version could add a server-side nonce store to make tokens
            single-use, at the cost of statefulness.
          </li>
          <li>
            <strong>Per-request crypto.</strong> Every authenticated request
            does an OpenPGP signature verification. Fine for envx-scale
            traffic; would matter at high QPS.
          </li>
          <li>
            <strong>No granular scopes.</strong> The token authenticates the
            user. There&apos;s no concept of a read-only or
            single-project token. If you want CI to only read{" "}
            <code>project-x</code>, you have to trust CI with the full user
            key.
          </li>
        </Ul>
      </section>

      <section className="space-y-4">
        <H2 id="try-it">Try it</H2>
        <Code lang="bash">{`# print the armored signature and verify against the server
envx auth

# inspect what's actually being signed
envx auth --debug`}</Code>
        <P>
          On success, the server returns a small success body and your CLI
          prints <code>success</code>. On failure, you&apos;ll get a status
          code from the table below.
        </P>

        <div className="overflow-hidden rounded-lg border border-border/60">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-card/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Status</th>
                <th className="px-4 py-2 text-left font-medium">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["400 Invalid challenge", "The Authorization JSON didn't parse, or the UUID half wasn't a UUID."],
                ["401 Invalid signature", "The OpenPGP signature didn't verify against the user's stored public key."],
                ["401 Too old", "The signed timestamp is more than 10 minutes in the past."],
                ["401 Too young", "The signed timestamp is in the future. Check your clock."],
              ].map(([code, meaning]) => (
                <tr key={code} className="border-t border-border/60">
                  <td className="whitespace-nowrap bg-card/40 px-4 py-2 font-mono text-[13px]">
                    {code}
                  </td>
                  <td className="px-4 py-2 text-foreground/80">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DocsPage>
  );
}
