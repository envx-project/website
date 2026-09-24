import { createFileRoute } from "@tanstack/react-router";
import { Callout, Code, DocsPage, H2, P } from "@/components/docs/page";
export const Route = createFileRoute("/docs/sharing")({ component: Sharing });
function Sharing() {
  return (
    <DocsPage
      title="Friends and messages"
      description="Exchange identities, pin a friend locally, and send signed encrypted text or variables."
    >
      <section className="space-y-4">
        <H2 id="connect">1. Exchange a friend link</H2>
        <P>
          Both people need a registered envx key on the same API. Create a link
          and send the complete output through a channel where your friend
          already knows you:
        </P>
        <Code>{`envx friend-link --expires 24h`}</Code>
        <P>Your friend accepts the full code and can give you a local alias:</P>
        <Code>{`envx add-friend '<full-friend-code>' --alias alex
envx friends --json`}</Code>
        <P>
          The code includes the API, creator identity, fingerprint, and a
          redemption token. Its memorable label alone does not establish
          identity. Treat the full code as a capability: share it with the
          intended person. You can target a registered user with{" "}
          <code>envx friend-link &lt;user-uuid&gt;</code>.
        </P>
        <P>
          For a link created on this machine, the CLI can pin the
          redeemer&apos;s presented key after checking a signed receipt. The
          receipt proves control of that private key, not that its holder is the
          person you intended. Initial redemption still trusts the API&apos;s
          account directory and enforcement of the first redeemer and any target
          restriction.
        </P>
        <Code>{`envx friend-link --list --json
envx friend-link --revoke <link-id>`}</Code>
      </section>
      <section className="space-y-4">
        <H2 id="verify">2. Keep identities pinned</H2>
        <P>
          Aliases and fingerprint pins are local to your account and machine. To
          confirm the person behind a key, compare full fingerprints through a
          trusted channel before sending sensitive content, including on your
          first connection. If a key changes or you use a new device, verify the
          full fingerprint before accepting it:
        </P>
        <Code>{`envx friends --accept-key <friend-uuid> --fingerprint <verified-full-fingerprint>
envx friends --rename <friend-uuid-or-alias> --alias sam`}</Code>
        <Callout variant="warn">
          Do not accept a replacement fingerprint merely because the API
          returned it. Removing a local friend or changing an alias does not
          revoke copies of messages already delivered.
        </Callout>
      </section>
      <section className="space-y-4">
        <H2 id="send">3. Send text or variables</H2>
        <P>
          With no input flag, <code>send</code> prompts for hidden text. You can
          also read a file or stdin. Secret contents are not passed as
          command-line arguments.
        </P>
        <Code>{`envx send sam --expires 24h
envx send sam --file ./handoff.txt --expires 24h
envx send sam --env --stdin < .env`}</Code>
        <P>
          <code>--env</code> accepts strict <code>KEY=VALUE</code> lines. The
          message is signed and encrypted before upload. To retry an interrupted
          delivery, use the pending message ID rather than creating a second
          message:
        </P>
        <Code>{`envx send --retry <message-id>`}</Code>
      </section>
      <section className="space-y-4">
        <H2 id="read">4. Read or import a message</H2>
        <Code>{`envx inbox --json
envx read <message-id>
# Write to a new file instead of displaying plaintext:
envx read <message-id> --output ./received.txt`}</Code>
        <P>
          The inbox lists sent and received metadata. Reading checks the
          signature, signed metadata, and the sender&apos;s pin before
          outputting plaintext. Text is printed as text; variable bundles are
          printed as JSON.
        </P>
        <P>
          To put a variable bundle into a project, preview its names and
          conflicts, then import it. The CLI re-encrypts the values to that
          project&apos;s recipient set:
        </P>
        <Code>{`envx import message <message-id> --project-id <project-id> --dry-run
envx import message <message-id> --project-id <project-id> --yes`}</Code>
        <Callout variant="info">
          Importing a verified message does not add signatures or local
          recipient pinning to the project-variable protocol. The project still
          trusts membership and public keys supplied by the API.
        </Callout>
      </section>
      <section className="space-y-4">
        <H2 id="lifetime">Expiry and deletion</H2>
        <Code>{`envx inbox --delete <message-id>`}</Code>
        <P>
          Deletion hides your own mailbox copy; the other participant may retain
          theirs. Expiry makes both server copies unavailable. Encrypted payload
          cleanup happens later, and neither operation erases plaintext,
          exported files, or ciphertext already retained by a recipient. Rotate
          the underlying credential if access must end.
        </P>
      </section>
    </DocsPage>
  );
}
