import type { NextConfig } from 'next';

// A static site: `next build` writes plain files to out/, which any static host can serve.
// trailingSlash gives out/en/index.html, so /en/ works on hosts that don't rewrite /en to en.html.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Two root layouts (Arabic at /, English at /en), so the 404 page is app/global-not-found.tsx.
  experimental: { globalNotFound: true },
};

export default nextConfig;
