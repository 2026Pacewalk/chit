# Chitrangi — Personalized Gifts Ecommerce

A modern rebuild of [chitrangi.com](https://www.chitrangi.com) with Next.js 15 (App Router), React 19, Tailwind CSS 4, and a full backend (Prisma + SQLite). All products, collections, pages, images, and slugs mirror the original Shopify store.

## Getting Started

```bash
npm install
npx prisma db push   # create/update the SQLite database (prisma/dev.db)
npm run dev          # development server
npm run build        # production build
npm start            # serve production build
```

Copy `.env` values before deploying — **change `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `SESSION_SECRET`**.

## Structure

- `src/data/catalog.json` — products & collections scraped from the live store (prices, variants, images)
- `src/data/site.ts` — brand info, navigation, hero slides, testimonials, USPs
- `src/data/pages.ts` — about, policy pages, and blog article content
- `src/app/` — routes (same slugs as the original site):
  - `/products/[handle]`, `/collections/[handle]`, `/collections`
  - `/pages/about-us`, `/pages/contact`, `/pages/<policy>`
  - `/blogs/news`, `/blogs/[blog]/[article]`
  - `/cart`, `/wishlist`, `/search`
- `public/images/` — all product photos, banners, and logo (downloaded locally)

## Features

- Hero slider, category showcase, tabbed trending products, testimonial carousel
- Cart drawer + cart page with localStorage persistence and WhatsApp checkout
- Wishlist, client-side search, collection sort & sale filter
- Product pages with image gallery, variant selection, quantity, related products
- JSON-LD product schema, sitemap.xml, robots.txt, per-page metadata
- Fully responsive, accessible (aria labels, keyboard-friendly), premium gold/ivory design

## Backend

- **Database**: Prisma + SQLite (`prisma/dev.db`) — Orders, OrderItems, ContactMessages, Subscribers. Swap `datasource` to PostgreSQL/MySQL for production scale by editing `prisma/schema.prisma` and `DATABASE_URL`.
- **APIs**:
  - `POST /api/orders` — place an order (prices re-validated server-side against the catalog; carts can't tamper prices)
  - `POST /api/orders/track` — order lookup, requires order number **plus** the checkout email/phone
  - `POST /api/payments/verify` — Razorpay signature verification (marks order PAID + CONFIRMED)
  - `POST /api/contact`, `POST /api/newsletter`
  - `POST /api/admin/login|logout`, `PATCH /api/admin/orders/:id`, `PATCH /api/admin/messages/:id`
- **Checkout** (`/checkout`): shipping form + COD or Razorpay (online payment appears only when `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET` are set in `.env`). Free shipping, order confirmation page, session-aware `/track` page with a status progress bar.
- **Admin** (`/admin`): HMAC-signed cookie session (credentials in `.env`), protected by middleware. Dashboard stats, orders list with status filters, order detail with status/payment updates + WhatsApp-the-customer shortcut, contact messages inbox (read/unread), newsletter subscribers with BCC export.

## Notes

- Customers can also order via WhatsApp (+91 95177 22444) from the cart and product pages.
- To update the catalog, re-scrape `https://www.chitrangi.com/products.json` and regenerate `src/data/catalog.json`.
- Order status emails/SMS are not wired up (no SMTP credentials); add a provider like Resend or MSG91 in the order API if needed.
