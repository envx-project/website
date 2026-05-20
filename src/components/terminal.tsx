import { Fragment } from "react";

import { cn } from "@/lib/utils";

export type TerminalLine =
  | { kind: "prompt"; cmd: string; cwd?: string }
  | { kind: "out"; text: string; tone?: "muted" | "emerald" | "amber" | "rose" }
  | { kind: "blank" }
  | { kind: "table"; title?: string; rows: [string, string][] };

export function Terminal({
  title = "~/work/api",
  lines,
  className,
}: {
  title?: string;
  lines: TerminalLine[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/70 bg-[oklch(0.16_0_0)] shadow-2xl shadow-black/40",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 bg-[oklch(0.19_0_0)] px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.18_25)]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.15_75)]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.72_0.16_155)]/70" />
        </div>
        <div className="font-mono text-xs text-muted-foreground">{title}</div>
        <div className="h-2.5 w-12" />
      </div>
      <div className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-foreground/90">
        {lines.map((l, i) => {
          if (l.kind === "blank") return <div key={i}>&nbsp;</div>;
          if (l.kind === "prompt") {
            return (
              <div key={i} className="whitespace-pre">
                <span className="text-emerald">{l.cwd ?? "~"}</span>{" "}
                <span className="text-muted-foreground">$</span>{" "}
                <span>{l.cmd}</span>
              </div>
            );
          }
          if (l.kind === "table") {
            return (
              <div
                key={i}
                className="my-1 inline-block min-w-0 max-w-full overflow-hidden rounded-sm border border-foreground/25"
              >
                {l.title && (
                  <div className="border-b border-foreground/25 px-3 py-0.5 text-center text-[11px] uppercase tracking-wider text-muted-foreground">
                    {l.title}
                  </div>
                )}
                <div className="grid grid-cols-[auto_1fr]">
                  {l.rows.map(([k, v], ri) => (
                    <Fragment key={k}>
                      <div
                        className={cn(
                          "border-r border-foreground/20 px-3 py-0.5 text-foreground",
                          ri > 0 && "border-t border-foreground/20",
                        )}
                      >
                        {k}
                      </div>
                      <div
                        className={cn(
                          "truncate px-3 py-0.5 text-foreground/80",
                          ri > 0 && "border-t border-foreground/20",
                        )}
                      >
                        {v}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            );
          }
          const toneClass =
            l.tone === "muted"
              ? "text-muted-foreground"
              : l.tone === "emerald"
                ? "text-emerald"
                : l.tone === "amber"
                  ? "text-amber"
                  : l.tone === "rose"
                    ? "text-rose"
                    : "text-foreground/85";
          return (
            <div key={i} className={cn("whitespace-pre", toneClass)}>
              {l.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
