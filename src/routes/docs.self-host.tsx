import { createFileRoute } from "@tanstack/react-router";
import { Callout, Code, DocsPage, H2, P, Ul } from "@/components/docs/page";
export const Route = createFileRoute("/docs/self-host")({
  component: SelfHost,
});
function SelfHost() {
  return (
    <DocsPage
      title="Self-host"
      description="Run the Rust API with Postgres on your own infrastructure."
    >
      <section className="space-y-4">
        <H2 id="local">Local Docker setup</H2>
        <P>
          Clone the API, start the bundled development database, and build the
          API image. The image builds from committed SQLx metadata; it does not
          need access to your production database during the build.
        </P>
        <Code>{`git clone https://github.com/envx-project/api envx-api
cd envx-api
docker compose up -d postgres
docker build -t envx-api .
docker run --rm --network envx_api_default -p 3000:3000 \\
  -e DATABASE_URL=postgres://postgres:postgres@postgres:5432/postgres \\
  envx-api`}</Code>
        <P>
          The network name comes from the bundled Compose project{" "}
          <code>envx_api</code>. The API reaches Postgres by the service name{" "}
          <code>postgres</code>. If you change the Compose project name, adjust
          the network name too.
        </P>
        <Callout variant="warn" title="Development credentials">
          The bundled database uses local development credentials and publishes
          port 5432. For a public deployment, use your own database credentials
          and private network, and put HTTPS in front of the API.
        </Callout>
      </section>
      <section className="space-y-4">
        <H2 id="deploy">Deploy the image</H2>
        <P>
          Set <code>DATABASE_URL</code> to a reachable Postgres database. The
          API listens on <code>0.0.0.0:3000</code> by default; <code>PORT</code>{" "}
          changes that port. The container runs as a non-root user.
        </P>
        <Code>{`# DATABASE_URL is supplied by your deployment's environment
docker run --rm --env DATABASE_URL --env PORT=3000 \\
  -p 3000:3000 envx-api`}</Code>
        <P>
          On Railway, deploy the API repository, attach Postgres, and reference
          its <code>DATABASE_URL</code>. The repository&apos;s Railway
          configuration uses the Dockerfile and{" "}
          <code>/.well-known/health-check</code>. Add an HTTPS domain after the
          service is healthy.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="migrations">Database migrations</H2>
        <P>
          The API applies embedded migrations before it starts listening. A
          failed migration prevents startup. Back up an existing database before
          upgrading and keep the logs if startup fails.
        </P>
        <P>
          Upgrades from the old invitation schema preserve its records but
          expire the old-format invitations. Create new invitations after the
          upgrade. Already applied historical migration checksums are preserved.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="limits">Configure storage limits</H2>
        <P>
          Hosted and self-hosted deployments use the same defaults. Set these
          API environment variables to change a limit; <code>0</code> disables
          that limit:
        </P>
        <Ul>
          <li>
            <code>ENVX_MAX_VARIABLE_BYTES</code>: 131072 bytes per encrypted
            variable.
          </li>
          <li>
            <code>ENVX_MAX_VARIABLES_PER_PROJECT</code>: 256 variables.
          </li>
          <li>
            <code>ENVX_MAX_PROJECT_BYTES</code>: 20971520 encrypted bytes per
            project.
          </li>
          <li>
            <code>ENVX_MAX_USER_BYTES</code>: 104857600 encrypted bytes across a
            user&apos;s projects.
          </li>
          <li>
            <code>ENVX_MAX_IP_BYTES_PER_DAY</code>: 104857600 upload bytes per
            IP in a rolling 24-hour window.
          </li>
        </Ul>
        <P>
          These are server environment variables, not <code>envx config</code>{" "}
          settings. Public instances should retain abuse limits. Message and
          friend-link limits are listed below.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="sharing-limits">Friend and message limits</H2>
        <P>
          These limits are fixed in the current API, including self-hosted
          instances; they have no environment-variable overrides:
        </P>
        <Ul>
          <li>
            100 active friend links, 100 new links per UTC day, and 1000
            preview/redemption attempts per UTC day, including failed attempts.
          </li>
          <li>
            1000 friends per account. Links default to 24 hours and may live for
            up to 30 days.
          </li>
          <li>128 KiB per message ciphertext and per public-key snapshot.</li>
          <li>
            1000 sends per UTC day, and 1000 active messages per participant
            mailbox.
          </li>
          <li>
            20 MiB retained per participant mailbox, counting ciphertext and
            stored public-key snapshots.
          </li>
        </Ul>
        <P>
          Message expiry is optional. An expired message becomes unavailable
          immediately; payload cleanup runs in bounded batches on subsequent
          sends. Each party deletes their own copy. After both parties delete
          it, encrypted payloads and key snapshots are erased while identifiers
          and retry metadata remain.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="point-cli">Point the CLI at your server</H2>
        <Code>{`envx config set sdk_url https://envx.example.com`}</Code>
        <P>
          For a new profile, set the server before running <code>envx gen</code>
          . If you generated a key with <code>--no-upload</code> and it has no
          account UUID yet, register it with <code>envx upload</code>. Then
          create or link a project. Changing <code>sdk_url</code> does not copy
          projects, membership, or encrypted variables from another server.
          Local operational state is scoped to the server, account UUID, and
          signing key. An existing account UUID is not automatically remapped to
          another server: upload refuses to replace it if authentication fails.
          Preserve the original profile and resolve account migration before
          switching a registered key.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="backup">Backups and trust</H2>
        <P>
          Use normal Postgres backups for server data, including identities,
          membership, invitations, messages, and encrypted variables. Keep
          private keys and local trust state backed up separately on the client.
        </P>
        <P>
          A database dump exposes metadata. A malicious running server can
          change project recipient lists, even though stored values are
          encrypted. Read the <a href="/docs/security">security model</a> before
          choosing who operates the API.
        </P>
      </section>
    </DocsPage>
  );
}
