import { createFileRoute } from "@tanstack/react-router";

import { Code, DocsPage, H2, P } from "@/components/docs/page";

export const Route = createFileRoute("/docs/cli-reference")({
  component: CliRef,
});

const GROUPS = [
  {
    title: "Auth & keys",
    commands: [
      {
        cmd: "envx auth",
        desc: "Test authentication against the configured server.",
      },
      {
        cmd: "envx gen",
        desc: "Generate a new GPG key and store it under ~/.config/envx/keys.",
      },
      {
        cmd: "envx import <file>",
        desc: "Import an ASCII-armored key from a file.",
      },
      {
        cmd: "envx export <fingerprint>",
        desc: "Export a public or secret key.",
      },
      { cmd: "envx upload", desc: "Upload your public key to the server." },
      { cmd: "envx list-keys", desc: "List every key in your local config." },
      {
        cmd: "envx whoami",
        desc: "Print your primary fingerprint and account UUID.",
      },
    ],
  },
  {
    title: "Projects",
    commands: [
      {
        cmd: "envx link",
        desc: "Link the current working directory to a project.",
      },
      { cmd: "envx unlink", desc: "Remove the link for the current directory." },
      { cmd: "envx list-projects", desc: "List projects you can access." },
      {
        cmd: "envx project new",
        desc: "Create a new project (and add yourself as a recipient).",
      },
      {
        cmd: "envx project add-user <uuid>",
        desc: "Add a user to the project; re-encrypts every variable to include them.",
      },
      {
        cmd: "envx project remove-user <uuid>",
        desc: "Remove a user; re-encrypts variables to the remaining recipients.",
      },
      {
        cmd: "envx project rename <name>",
        desc: "Rename the active project.",
      },
      {
        cmd: "envx invite",
        desc: "Generate / accept project invites.",
      },
    ],
  },
  {
    title: "Variables",
    commands: [
      {
        cmd: "envx set <NAME>",
        desc: "Set (or update) a variable interactively.",
      },
      { cmd: "envx unset <NAME>", desc: "Delete a variable." },
      {
        cmd: "envx variables",
        desc: "Print all decrypted variables for the current env.",
      },
      {
        cmd: "envx get key <NAME>",
        desc: "Get a single variable's decrypted value.",
      },
    ],
  },
  {
    title: "Running stuff",
    commands: [
      {
        cmd: "envx run -- <cmd> [args...]",
        desc: "Run a command with decrypted vars injected.",
      },
      { cmd: "envx shell", desc: "Drop into a subshell with vars exported." },
    ],
  },
  {
    title: "Config & misc",
    commands: [
      {
        cmd: "envx config get",
        desc: "Read a config field (lists all when path omitted).",
      },
      {
        cmd: "envx config set <path> <value>",
        desc: "Set a config field (interactive when args omitted).",
      },
      {
        cmd: "envx config unset <path>",
        desc: "Clear an optional config field.",
      },
      {
        cmd: "envx config edit",
        desc: "Open the config file in $EDITOR and validate on save.",
      },
      {
        cmd: "envx config set sdk_url <url>",
        desc: "Point the CLI at a different API.",
      },
      { cmd: "envx keyring", desc: "Interactive keyring commands." },
      {
        cmd: "envx completion <shell>",
        desc: "Generate a shell completion script.",
      },
      {
        cmd: "envx update",
        desc: "Re-run the install script to self-update (POSIX only).",
      },
      { cmd: "envx version", desc: "Print version + build SHA." },
    ],
  },
];

function CliRef() {
  return (
    <DocsPage
      title="CLI reference"
      description="Every command, grouped by what you're trying to do."
    >
      <section className="space-y-4">
        <H2 id="global">Global flags</H2>
        <Code lang="bash">{`--silent     suppress non-essential output
-h, --help   print help (also works per-subcommand)
-V, --version`}</Code>
      </section>

      {GROUPS.map((g) => (
        <section key={g.title} className="space-y-4">
          <H2 id={g.title.toLowerCase().replace(/\s+/g, "-")}>{g.title}</H2>
          <div className="overflow-hidden rounded-lg border border-border/60">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {g.commands.map((c) => (
                  <tr
                    key={c.cmd}
                    className="border-t border-border/60 first:border-t-0"
                  >
                    <td className="w-1/2 whitespace-nowrap bg-card/40 px-4 py-2 font-mono text-[13px] text-foreground">
                      {c.cmd}
                    </td>
                    <td className="px-4 py-2 text-foreground/80">{c.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section className="space-y-4">
        <H2 id="more">Want more?</H2>
        <P>
          Run <code>envx help &lt;cmd&gt;</code> for per-command flags. The
          source of truth lives in{" "}
          <a
            href="https://github.com/envx-project/cli"
            target="_blank"
            rel="noreferrer"
          >
            envx-project/cli
          </a>
          .
        </P>
      </section>
    </DocsPage>
  );
}
