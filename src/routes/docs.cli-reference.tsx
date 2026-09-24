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
        cmd: "envx import pubkey <file>",
        desc: "Import an armored public key; does not replace your primary private key.",
      },
      {
        cmd: "envx export [--secret-key]",
        desc: "Export the primary public key, or its encrypted secret key.",
      },
      { cmd: "envx upload", desc: "Upload your public key to the server." },
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
      {
        cmd: "envx unlink",
        desc: "Remove the link for the current directory.",
      },
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
        cmd: "envx project remove-user --user-id <uuid>",
        desc: "Remove a user; re-encrypts variables to the remaining recipients.",
      },
      {
        cmd: "envx project rename --name <name>",
        desc: "Rename the active project.",
      },
      {
        cmd: "envx invite create",
        desc: "Generate a project invite; redeem it with envx invite accept <code>.",
      },
    ],
  },
  {
    title: "Variables",
    commands: [
      {
        cmd: "envx set KEY=VALUE [KEY=VALUE...]",
        desc: "Set variables from arguments or KEY=VALUE lines on stdin; --yes approves overwrites.",
      },
      { cmd: "envx unset <NAME>", desc: "Delete a variable." },
      {
        cmd: "envx variables",
        desc: "Print all decrypted variables for the current env.",
      },
      {
        cmd: "envx get variable --key <NAME>",
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
    title: "Friends & messages",
    commands: [
      {
        cmd: "envx friend-link [user-uuid]",
        desc: "Create a friend link; --expires sets its lifetime.",
      },
      {
        cmd: "envx add-friend <code> --alias <name>",
        desc: "Accept a full friend code and pin its identity locally.",
      },
      {
        cmd: "envx friends --json",
        desc: "List friends; aliases and accepted key pins are local.",
      },
      {
        cmd: "envx send <friend> [--file <path>]",
        desc: "Send signed encrypted text; use --stdin for a pipe or --env for KEY=VALUE lines.",
      },
      {
        cmd: "envx inbox --json",
        desc: "List sent and received message metadata.",
      },
      {
        cmd: "envx read <message-id>",
        desc: "Verify and decrypt a message; --output writes a new file.",
      },
      {
        cmd: "envx import message <id> --project-id <uuid>",
        desc: "Preview and import an encrypted variable bundle; --dry-run makes no project changes.",
      },
    ],
  },
  {
    title: "Config & misc",
    commands: [
      {
        cmd: "envx config get",
        desc: "Read a config field; omit the path to select interactively or list fields on piped output.",
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
      { cmd: "envx version", desc: "Print the CLI version and author." },
    ],
  },
];

function CliRef() {
  return (
    <DocsPage
      title="CLI reference"
      description="Common commands, grouped by task. Use --help for every option in your installed version."
    >
      <section className="space-y-4">
        <H2 id="global">Installed-version help</H2>
        <Code lang="bash">{`envx --help
envx --version
envx project --help
envx send --help`}</Code>
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
