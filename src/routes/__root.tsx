import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <div className="flex min-h-full flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <div className="font-mono text-sm text-muted-foreground">404</div>
      <h1 className="mt-3 font-mono text-3xl font-semibold tracking-tight">
        $ envx get page <span className="text-rose">→ not_found</span>
      </h1>
      <p className="mt-4 text-muted-foreground">
        That route doesn't exist. Try the{" "}
        <a href="/docs" className="text-foreground underline">
          docs
        </a>
        .
      </p>
    </div>
  );
}
