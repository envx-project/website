# envx website — first-time setup

This is a one-time checklist for getting the site running locally and
deployed to Cloudflare Pages. Once you've done this, nothing else here
is needed — daily flow is just `bun run dev` / `git push`.

---

## 1. Install deps

```bash
cd ~/code/envx/website
bun install
```

Then verify the dev server boots:

```bash
bun run dev
# → http://localhost:5173
```

> Note: always use `bun run <script>` — `bun build` is Bun's own
> bundler command and would run instead of the `build` script.

Open the URL, click around: `/`, `/docs`, `/compare`. If everything
loads, you're good.

The first run will auto-generate `src/routeTree.gen.ts` — the
TanStack Router plugin produces this from the files under
`src/routes/`. It's gitignored.

---

## 2. Production build (sanity check)

```bash
bun run build
bun run preview
# → http://localhost:4173
```

If `bun run build` succeeds, you have a deployable `dist/` directory.

---

## 3. Cloudflare Pages — first deploy

You have two options. Pick one.

### Option A: connect the GitHub repo (recommended)

This is the lazy path: every push to `main` builds and deploys.

1. Push this repo to GitHub if you haven't already:

   ```bash
   gh repo create envx-project/website --public --source=. --remote=origin --push
   ```

   (or use whatever org/name you want)

2. Go to <https://dash.cloudflare.com> → **Workers & Pages** → **Create
   application** → **Pages** → **Connect to Git**.

3. Pick `envx-project/website` (or wherever you pushed it).

4. Build settings:
   - **Framework preset:** `None`
   - **Build command:** `bun install && bun run build`
   - **Build output directory:** `dist`
   - **Root directory:** _(blank)_
   - **Node version:** add an env var `NODE_VERSION` = `22` (or `20`)
   - Cloudflare Pages auto-detects `bun` from the lockfile (`bun.lock`),
     so the build will run under Bun without extra config.

5. Save & deploy. First build takes ~2 min.

6. Custom domain: Pages project → **Custom domains** → **Set up a
   custom domain** → `envx.sh`. Cloudflare handles the DNS if `envx.sh`
   is already on your Cloudflare account; otherwise it shows you the
   CNAME to add at your registrar.

### Option B: deploy from CLI with wrangler

If you'd rather push from your machine without GitHub in the loop:

1. Install wrangler globally (or use `bunx`):

   ```bash
   bun add -g wrangler
   wrangler login   # opens browser, OAuth flow
   ```

2. Create the project once:

   ```bash
   wrangler pages project create envx-website --production-branch main
   ```

3. Build + deploy:

   ```bash
   bun run build
   wrangler pages deploy dist --project-name envx-website --branch main
   ```

4. To add the `envx.sh` custom domain via CLI:
   ```bash
   wrangler pages domain add envx.sh --project-name envx-website
   ```

Either way: the `wrangler.toml` in the repo root already points
Cloudflare at `dist/` as the build output, so you don't need to
configure anything in the dashboard about output paths.

---

## 4. SPA routing — already handled

`public/_redirects` contains `/* /index.html 200`, which tells
Cloudflare Pages to serve `index.html` for any deep link (like
`/docs/quickstart`) and let TanStack Router handle routing on the
client. You don't need to touch this — it'll just work.

If you ever want true prerendered HTML per route (better SEO, no FOUC
on docs pages), the path is `vite-react-ssg` or `@tanstack/start`. Not
needed for v1.

---

## 5. Things I haven't done that you might want

- **Analytics:** drop in Plausible / Umami / Cloudflare Web Analytics
  by adding a `<script>` tag in `index.html`.
- **OG image:** the `<meta>` tags reference an OG title/description
  but no image. Generate one with Figma/Excalidraw and drop it in
  `public/og.png`, then add `<meta property="og:image" content="/og.png">`
  in `index.html`.
- **`get.envx.sh`:** the landing page assumes this resolves to the
  install script in the `cli` repo. If it doesn't yet, set up a
  Cloudflare Worker that proxies to
  `https://raw.githubusercontent.com/envx-project/cli/main/install.sh`.
- **Sitemap:** for SEO, add a `public/sitemap.xml` once the route list
  stabilizes.

---

## Questions to ping me about

- Want me to wire up a Cloudflare Worker for `get.envx.sh`?
- Want prerendered HTML for the docs (better SEO)?
- Want a darker/lighter palette tweak — the current one is neutral
  dark, somewhat Vercel-ish?
- Want to add a real OG image? I can make a simple one.

Just say the word and I'll do it.
