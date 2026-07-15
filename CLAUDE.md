# Chitrangi — Project Guide

Ecommerce site for chitrangi.com (personalized gifts, Zirakpur, Punjab).
Next.js 15 App Router + React 19 + Tailwind CSS 4 + Prisma/SQLite.

## First-time setup (fresh clone / cloud sandbox)

```bash
npm install
cp .env.example .env        # then set ADMIN_PASSWORD and SESSION_SECRET to any dev values
npx prisma db push          # creates prisma/dev.db
npm run dev
```

The dev server picks a free port automatically (`next dev`). Production build: `npm run build` — never run it while the dev server is running (they share `.next/`).

## Architecture

- `src/data/catalog.json` — product/collection catalog (source of truth for the storefront; scraped from the original Shopify store). `src/lib/catalog.ts` is the typed accessor.
- `src/data/site.ts` — brand info, nav, hero slides, testimonials. `src/data/pages.ts` — policy pages, about, blog content.
- `src/lib/orders.ts` — order validation; prices are ALWAYS resolved server-side from the catalog, never trusted from the client.
- `src/lib/auth.ts` + `src/middleware.ts` — admin session (HMAC-signed cookie, credentials from `.env`). Middleware protects `/admin/*` and `/api/admin/*`.
- Cart/wishlist state: `src/components/store/StoreProvider.tsx` (localStorage, client-side).
- Payments: COD works out of the box. Razorpay activates automatically when `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET` are set in `.env` (order creation + signature verify already implemented).

## Conventions

- URL slugs mirror the original Shopify store (`/products/[handle]`, `/collections/[handle]`, `/pages/*`, `/blogs/*`) — do not rename them; SEO depends on it.
- Design tokens live in `src/app/globals.css` (`@theme`: cream/ink/gold palette, Playfair Display + Jost). Keep new UI consistent with them.
- Prices in INR; format with `formatINR()` from `src/lib/catalog.ts`.
- `prisma/dev.db` and `.env` are gitignored — never commit them.

## Admin

- `/admin` — dashboard, orders (status management), messages, subscribers, settings.
- Login credentials come from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`.
