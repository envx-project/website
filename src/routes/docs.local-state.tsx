import { createFileRoute } from "@tanstack/react-router";
import { Callout, Code, DocsPage, H2, P, Ul } from "@/components/docs/page";
export const Route = createFileRoute("/docs/local-state")({
  component: LocalState,
});
function LocalState() {
  return (
    <DocsPage
      title="Local state and upgrades"
      description="Automatic SQLite migration, settings, and recoverable local backups."
    >
      <section className="space-y-4">
        <H2 id="automatic">The upgrade is automatic</H2>
        <P>
          The first command that needs your configuration creates{" "}
          <code>~/.config/envx/state.sqlite</code> and imports existing project
          links. Released v2.0, v2.6, and v2.13 config layouts are recognized.
          Keep your current key and account; no migration command, regeneration,
          or re-upload is needed for an existing envx profile.
        </P>
        <P>
          Before migration, <code>config.pre-sqlite.json</code> saves the
          original config bytes. Legacy project entries,{" "}
          <code>version.json</code>, encrypted cache files, and key files are
          retained. Project links import once in a transaction, so subsequent
          commands do not restore links you have removed.
        </P>
        <Callout variant="info" title="First use after upgrading">
          Fetch project variables online once to populate the new cache. Legacy
          cache files cannot prove which server and account produced them, so
          they are retained but not imported. Existing expiring keyring sessions
          may ask for one unlock because old temporary expiry files are not
          trusted.
        </Callout>
      </section>
      <section className="space-y-4">
        <H2 id="files">What lives where</H2>
        <Ul>
          <li>
            <code>config.json</code>: human-editable settings, primary key
            metadata, and the configured password source.
          </li>
          <li>
            <code>state.sqlite</code>: project links, encrypted cache payloads,
            update information, local friend pins and aliases, and message
            operation state.
          </li>
          <li>
            <code>keys/&lt;fingerprint&gt;/</code>: your existing public and
            encrypted private key files.
          </li>
          <li>The OS keyring: your saved key passphrase, if you use it.</li>
        </Ul>
        <P>
          Operational records are scoped to the API origin, account UUID, and
          signing-key fingerprint. Settings remain JSON. SQLite itself is not
          encrypted; cached secret payloads are encrypted before storage.
        </P>
        <Code>{`envx config get sdk_url
envx config set settings.loud true
envx config edit`}</Code>
      </section>
      <section className="space-y-4">
        <H2 id="backup">Backup and downgrade</H2>
        <P>
          Keep <code>config.json</code>, <code>config.pre-sqlite.json</code>,{" "}
          <code>state.sqlite</code>, and the key directory together. Stop envx
          commands before copying the database, or use SQLite&apos;s online
          backup mechanism. Do not sync a live SQLite file between machines.
        </P>
        <P>
          Older binaries see the preserved pre-upgrade project links and caches.
          They do not read new SQLite state, and new link changes are not
          written back into their JSON. A downgrade therefore returns to the old
          operational snapshot.
        </P>
        <Callout variant="warn">
          Do not delete SQLite to refresh a cache. It also holds pinned
          identities, aliases, and pending operations. A malformed legacy config
          produces an error instead of being silently overwritten.
        </Callout>
      </section>
      <section className="space-y-4">
        <H2 id="envcli">Older envcli profiles</H2>
        <P>
          The historical <code>~/.config/envcli</code> directory still uses an
          explicit command because both old and current profiles may exist:
        </P>
        <Code>{`envx config migrate`}</Code>
        <P>
          This path preserves the source profile and refuses to overwrite a
          different established profile. It is separate from the automatic
          JSON-to-SQLite migration.
        </P>
      </section>
    </DocsPage>
  );
}
