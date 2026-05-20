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

export const Route = createFileRoute("/docs/self-host")({
  component: SelfHost,
});

function SelfHost() {
  return (
    <DocsPage
      title="Self-host"
      description="Run the envx API on your own infrastructure. One container, one Postgres, no external dependencies."
    >
      <section className="space-y-4">
        <H2 id="why">Why self-host?</H2>
        <Ul>
          <li>You want all secrets inside your own VPC.</li>
          <li>You need air-gapped or on-prem deployment.</li>
          <li>You don&apos;t want to depend on a startup&apos;s uptime SLA.</li>
          <li>
            You enjoy <code>docker compose up</code>.
          </li>
        </Ul>
        <Callout variant="info">
          The hosted version at <code>envx.sh</code> is a convenience &mdash; it
          runs the exact same open-source binary. The CLI is identical either
          way.
        </Callout>
        <Callout variant="good" title="No limits">
          Self-hosted instances have no built-in caps on variables, project
          size, or users &mdash; you control the database, so you control the
          limits. The hosted version&apos;s 256-variable / 20 MB caps don&apos;t
          apply here. If you want to set your own caps, configure{" "}
          <code>settings.max_variables_per_project</code> and{" "}
          <code>settings.max_project_bytes</code>.
        </Callout>
      </section>

      <section className="space-y-4">
        <H2 id="docker-compose">Option 1: Docker Compose</H2>
        <P>
          Clone the API repo and bring up Postgres + the API with the bundled
          compose file:
        </P>
        <Code lang="bash">{`git clone https://github.com/envx-project/api envx-api
cd envx-api

docker compose up -d postgres
cargo run --release
# ...or build the API container:
docker build -t envx-api .
docker run --rm -p 3000:3000 \\
  -e DATABASE_URL=postgres://postgres:postgres@host.docker.internal:5432/postgres \\
  envx-api`}</Code>
      </section>

      <section className="space-y-4">
        <H2 id="railway">Option 2: Railway</H2>
        <P>
          The repo ships with a <code>railway.json</code> that builds from the
          Dockerfile. One-click flow:
        </P>
        <Ol>
          <li>
            Fork <code>envx-project/api</code> on GitHub.
          </li>
          <li>Create a new Railway project, deploy from the fork.</li>
          <li>
            Add a Postgres plugin and connect <code>DATABASE_URL</code>.
          </li>
          <li>Add a public domain. Done.</li>
        </Ol>
      </section>

      <section className="space-y-4">
        <H2 id="config">Configuration</H2>
        <H3 id="env">Environment variables</H3>
        <Ul>
          <li>
            <code>DATABASE_URL</code> — Postgres connection string (required)
          </li>
          <li>
            <code>PORT</code> — defaults to <code>3000</code>
          </li>
          <li>
            <code>RUST_LOG</code> — log level, e.g. <code>info</code>
          </li>
        </Ul>
        <H3 id="migrations">Migrations</H3>
        <P>
          Migrations run automatically on boot via <code>sqlx</code>. No
          separate step needed.
        </P>
      </section>

      <section className="space-y-4">
        <H2 id="point-cli">Point your CLI at it</H2>
        <Code lang="bash">{`envx config set sdk_url https://envx.your-company.com
envx upload   # re-upload your public key to the new server`}</Code>
        <Callout variant="good" title="You're done">
          Your team can now <code>envx link</code> projects against your server.
          The server only ever sees ciphertext.
        </Callout>
      </section>

      <section className="space-y-4">
        <H2 id="backup">Backups</H2>
        <P>
          envx stores three things in Postgres: project metadata, encrypted
          variable blobs, and public keys. Standard <code>pg_dump</code> is all
          you need. Even a leaked database dump is useless without recipient
          private keys.
        </P>
      </section>
    </DocsPage>
  );
}
