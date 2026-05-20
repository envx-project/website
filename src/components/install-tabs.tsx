import { useState } from "react";

import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

const TABS = [
  {
    id: "unix",
    label: "macOS / Linux",
    cmd: "curl -fsSL get.envx.sh | bash",
  },
  {
    id: "cargo",
    label: "cargo",
    cmd: "cargo install --git https://github.com/envx-project/cli envx",
  },
  {
    id: "windows",
    label: "Windows",
    cmd: "# download from GitHub releases\nstart https://github.com/envx-project/cli/releases/latest",
  },
] as const;

export function InstallTabs() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("unix");
  const current = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-card/60 shadow-xl shadow-black/30 backdrop-blur">
      <div className="flex items-center gap-1 border-b border-border/60 bg-background/40 px-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={cn(
              "relative px-3 py-2 text-xs font-medium transition-colors",
              active === t.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
            {active === t.id && (
              <span className="absolute inset-x-2 -bottom-px h-px bg-foreground" />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="select-none font-mono text-sm text-muted-foreground">
          $
        </span>
        <code className="flex-1 overflow-x-auto whitespace-pre font-mono text-sm text-foreground">
          {current.cmd}
        </code>
        <CopyButton value={current.cmd} />
      </div>
    </div>
  );
}
