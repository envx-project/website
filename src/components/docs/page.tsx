import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

export function DocsPage({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <article className="min-w-0 flex-1">
      <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
        <Link to="/docs" className="hover:text-foreground">
          docs
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{title.toLowerCase()}</span>
      </div>
      <h1 className="font-mono text-3xl font-semibold tracking-tight">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 text-lg text-muted-foreground text-pretty">
          {description}
        </p>
      ) : null}
      <div className="mt-10 space-y-10">{children}</div>
    </article>
  );
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 font-mono text-xl font-semibold tracking-tight"
    >
      {children}
    </h2>
  );
}

export function H3({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3
      id={id}
      className="scroll-mt-24 font-mono text-base font-semibold tracking-tight text-foreground/90"
    >
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="leading-7 text-foreground/85 text-pretty [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.875em]">
      {children}
    </p>
  );
}

export function Ul({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc space-y-2 pl-6 leading-7 text-foreground/85 marker:text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.875em]">
      {children}
    </ul>
  );
}

export function Ol({ children }: { children: ReactNode }) {
  return (
    <ol className="list-decimal space-y-2 pl-6 leading-7 text-foreground/85 marker:text-muted-foreground marker:font-mono [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.875em]">
      {children}
    </ol>
  );
}

export function Code({
  children,
  lang = "bash",
  title,
  copy = true,
}: {
  children: string;
  lang?: string;
  title?: string;
  copy?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border/60 bg-[oklch(0.17_0_0)]">
      {(title || copy) && (
        <div className="flex items-center justify-between border-b border-border/60 bg-background/40 px-3 py-1.5">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            {title ?? lang}
          </div>
          {copy && <CopyButton value={children.trim()} />}
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-foreground/90">
        {children.trim()}
      </pre>
    </div>
  );
}

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: "info" | "warn" | "good";
  title?: string;
  children: ReactNode;
}) {
  const tone =
    variant === "warn"
      ? "border-amber/40 bg-amber/5"
      : variant === "good"
        ? "border-emerald/40 bg-emerald/5"
        : "border-sky/40 bg-sky/5";
  return (
    <aside className={cn("rounded-lg border p-4 text-sm", tone)}>
      {title && (
        <div className="mb-1 font-mono text-xs font-semibold uppercase tracking-wider text-foreground/80">
          {title}
        </div>
      )}
      <div className="text-foreground/85 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.875em]">
        {children}
      </div>
    </aside>
  );
}
