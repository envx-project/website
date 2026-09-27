import { createFileRoute } from "@tanstack/react-router";
import { Callout, Code, DocsPage, H2, Ol, P } from "@/components/docs/page";
export const Route = createFileRoute("/docs/windows")({
  component: Windows,
});
const INSTALL = `powershell -c "irm https://raw.githubusercontent.com/envx-project/cli/main/install.ps1 | iex"`;
function Windows() {
  return (
    <DocsPage
      title="Windows"
      description="Install, update, and move envx to the standard per-user location."
    >
      <section className="space-y-4">
        <H2 id="install">Install</H2>
        <P>Run this in PowerShell or Command Prompt:</P>
        <Code>{INSTALL}</Code>
        <P>
          The installer verifies the release checksum, places{" "}
          <code>envx.exe</code> in <code>%LOCALAPPDATA%\Programs\envx</code>{" "}
          without administrator rights, and adds that folder to your user{" "}
          <code>PATH</code>. Open a new terminal afterwards.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="update">Update</H2>
        <Code>{`envx update`}</Code>
        <P>
          This replaces <code>envx.exe</code> in the folder it runs from, even
          while it is in use.
        </P>
      </section>
      <section className="space-y-4">
        <H2 id="migrate">Move a manual install</H2>
        <P>
          If you previously downloaded <code>envx.exe</code> by hand (for
          example into <code>C:\envx</code>), <code>envx update</code> still
          works but warns that the binary is outside the standard location. To
          move it:
        </P>
        <Ol>
          <li>Run the install command above.</li>
          <li>
            Delete the old <code>envx.exe</code> and its folder if nothing else
            lives there.
          </li>
          <li>
            Open <em>Edit environment variables for your account</em> and remove
            the old folder from <code>Path</code>, in both the user and system
            lists if present.
          </li>
          <li>
            Open a new terminal and check that{" "}
            <code>(Get-Command envx).Source</code> points to{" "}
            <code>%LOCALAPPDATA%\Programs\envx\envx.exe</code>.
          </li>
        </Ol>
        <Callout variant="info" title="Your profile does not move">
          Keys, configuration, and project links live in your user profile, not
          next to the executable. Moving the binary keeps all of them.
        </Callout>
      </section>
      <section className="space-y-4">
        <H2 id="uninstall">Uninstall</H2>
        <Code>{`$env:ENVX_UNINSTALL = '1'; irm https://raw.githubusercontent.com/envx-project/cli/main/install.ps1 | iex`}</Code>
      </section>
    </DocsPage>
  );
}
