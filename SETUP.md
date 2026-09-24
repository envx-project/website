# Website development and deployment

The site is a static Vite application with TanStack Router. Use Bun and the
committed lockfile; no API credentials are needed to build it.

## Local checks

```bash
bun install --frozen-lockfile
bun run build
bun run typecheck
bun run preview
```

Build before typecheck on a fresh checkout: the Vite router plugin generates
`src/routeTree.gen.ts`, which is intentionally ignored by Git. For development,
use `bun run dev`. Use `bun run build`, not Bun's separate `bun build` command.

Check `/`, `/docs`, `/docs/sharing`, `/docs/local-state`, and `/compare` in the
preview. `public/_redirects` sends deep links to `index.html` for client routing.

## Cloudflare Pages

The output directory is `dist`. `wrangler.toml` records that path and the Pages
project name `envx-website`.

For a Git-integrated project, choose the repository and production branch in
Cloudflare Pages. Configure the build as `bun install --frozen-lockfile && bun run
build`, with `dist` as output. Preview-branch deployment behavior is controlled in
Pages settings; a push may start a build if Git integration is enabled. See
[Cloudflare's Git integration guide](https://developers.cloudflare.com/pages/get-started/git-integration/).

For an authorized direct upload, build first, authenticate Wrangler, and choose
the intended branch explicitly:

```bash
bun run build
bunx wrangler login
# A preview deployment:
bunx wrangler pages deploy dist --project-name envx-website --branch docs-preview
# Production, when main is the configured production branch:
bunx wrangler pages deploy dist --project-name envx-website --branch main
```

These commands publish the built files. Building or previewing locally does not
publish them. See the [Wrangler Pages command reference](https://developers.cloudflare.com/workers/wrangler/commands/pages/)
for project creation and deployment options.

Add a custom domain through the Pages project's **Custom domains** settings and
follow its DNS instructions. There is no `wrangler pages domain add` step. See
[Cloudflare's custom domain guide](https://developers.cloudflare.com/pages/configuration/custom-domains/).

The CLI installer endpoint `https://get.envx.sh` is operated separately from this
static site. Verify that its response is the intended installer when publishing
installation instructions; changing this site's copy does not update that endpoint.
