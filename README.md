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
