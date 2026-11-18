# wkil.store

The public landing page of the store platform at `wkil.store`: what a merchant gets, what it costs, and a button to the admin's sign-in. Arabic first (at `/`), English second (at `/en/`).

A static site: `pnpm build` writes plain files to `out/`.

```bash
pnpm install
pnpm dev        # http://localhost:3003
pnpm lint && pnpm typecheck && pnpm test
pnpm build      # static files in out/
pnpm preview    # serves out/ on :3003
```

Settings (both optional, read at build time):

- `NEXT_PUBLIC_SITE_URL`: where this site is served. Default `https://wkil.store`.
- `NEXT_PUBLIC_ADMIN_URL`: the merchants' admin, where the buttons lead. Default `https://admin.wkil.store`.

## Deploy (Vercel)

1. Vercel → **Add New → Project** → import `neutroon/wkil.store`. Framework: Next.js; the defaults are right (`pnpm install`, `pnpm build`; the site is a static export).
2. Environment variables: none needed (the defaults point at `wkil.store` and `admin.wkil.store`).
3. **Settings → Domains**: add `wkil.store`, and `www.wkil.store` redirecting to it. Put the records Vercel shows into Cloudflare's DNS for the `wkil.store` zone, **DNS only** (grey cloud). Every other name in the zone (stores, `admin`, `api`, `media`) stays on the platform's servers; see `docs/runbooks/deploy-production.md` in `store-platform`.
