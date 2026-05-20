import { Outlet, createFileRoute } from "@tanstack/react-router";

import { DocsSidebar } from "@/components/docs/sidebar";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});

function DocsLayout() {
  return (
    <div className="mx-auto flex max-w-6xl gap-12 px-4 py-12 sm:px-6">
      <DocsSidebar />
      <Outlet />
    </div>
  );
}
