# ValueBox — Headless Shopify Next.js Frontend

A production-quality headless e-commerce storefront built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and the **Shopify Storefront API**. ValueBox offers millions of products at unbeatable prices with member-exclusive pricing through ValueBox+.

## Features

- **Headless Shopify** — Full Storefront API integration with GraphQL
- **Server-Side Rendering** — Next.js App Router with ISR for optimal performance
- **Cart Management** — Shopify Cart API with cookie-based persistence
- **Search** — Predictive search with typeahead suggestions
- **Responsive Design** — Mobile-first, tested on iPhone SE through wide desktop
- **SEO Optimized** — Dynamic metadata, sitemap, robots.txt, JSON-LD structured data
- **Member Pricing** — Custom metafield support for ValueBox+ member discounts
- **Product Badges** — Dynamic badges (Top Pick, Best Seller, Flash Deal, etc.)
- **Loading States** — Skeleton loaders for all pages and components
- **Error Handling** — Error boundaries, 404 pages, and graceful API failure handling

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Shopify Storefront API | Product data, collections, cart |
| Lucide React | Icon library |
| Vercel | Hosting and deployment |

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm
- A Shopify store with Storefront API access

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Your Shopify store domain (e.g., `your-store.myshopify.com`) |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` | Storefront API access token |

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `pnpm dev` | Start Next.js development server |
| `build` | `pnpm build` | Create production build |
| `start` | `pnpm start` | Start production server |
| `lint` | `pnpm lint` | Run ESLint |
| `typecheck` | `pnpm typecheck` | Run TypeScript type checking |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (cart, search, recommended)
│   ├── cart/              # Cart page
│   ├── products/[handle]/ # Product detail pages
│   ├── search/            # Search results page
│   ├── shop/              # Shop and collection pages
│   │   └── [handle]/      # Dynamic collection pages
│   ├── error.tsx          # Error boundary
│   ├── not-found.tsx      # 404 page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt
├── components/
│   ├── cart/              # Cart line items, order summary
│   ├── home/              # Hero, category grid, testimonials, etc.
│   ├── layout/            # Header, Footer, MobileNav
│   ├── product/           # ProductCard, ProductGrid, Gallery, etc.
│   ├── shop/              # FilterSidebar, SortDropdown, Pagination
│   └── ui/                # Skeleton loaders
├── contexts/
│   └── CartProvider.tsx   # Cart context with Shopify Cart API
└── lib/
    ├── shopify/           # Shopify API client, queries, types
    ├── constants.ts       # Categories, collections, thresholds
    └── utils.ts           # Formatting, cookies, helpers
```

## Shopify Configuration

The store uses custom metafields under the `custom` namespace:

| Metafield | Type | Purpose |
|---|---|---|
| `member_price` | Money | ValueBox+ member pricing |
| `member_discount_percent` | Integer | Member discount percentage |
| `badge` | Single-line text | Product badge (e.g., "TOP PICK", "FLASH DEAL") |
| `is_hero` | Boolean | Featured on homepage hero |

## Deployment

### Vercel (Recommended)

1. Push to the `main` branch
2. Vercel auto-deploys from the linked repository
3. Set environment variables in Vercel dashboard

### Manual Deployment

```bash
pnpm build
pnpm start
```

## Pages and Routes

| Route | Description |
|---|---|
| `/` | Homepage with hero, carousels, categories |
| `/shop` | All products with filters and sorting |
| `/shop/[handle]` | Collection pages (35 collections) |
| `/products/[handle]` | Product detail pages (107 products) |
| `/cart` | Shopping cart with order summary |
| `/search?q=...` | Search results |
| `/api/cart` | Cart API (create, add, update, remove) |
| `/api/search` | Predictive search API |
| `/api/recommended` | Product recommendations |
| `/sitemap.xml` | Dynamic sitemap |
| `/robots.txt` | Robots configuration |

## License

Private — All rights reserved.
