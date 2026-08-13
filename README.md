# Orli

The marketing website for [Orli](https://stayorli.com), a boutique hotel in La Jolla, San Diego. Built with Next.js as a **headless front end for WordPress** — editors manage content in WordPress, and this app renders it via WPGraphQL.

## Stack

- **[Next.js](https://nextjs.org/) 16** (Pages Router) + **React 19**
- **Headless WordPress** content via WPGraphQL, using ACF **Flexible Content** for page building
- **Sass/SCSS** and **styled-components** for styling
- **GSAP** + ScrollTrigger for animation; Flickity / Slick / Swiper for carousels
- Third-party APIs: Google Maps, OpenWeather, and Mews for booking

## How it works

Content is authored in WordPress and fetched at build time. Nearly every route is driven by a single catch-all page, [`pages/[slug].js`](pages/[slug].js):

- `getStaticPaths` queries WordPress for all published pages and posts.
- `getStaticProps` fetches a page's ACF **`flexibleContent.sections`** array.
- A `switch` on each section's `fieldGroupName` maps the section to a React component in [`components/`](components/) (hero, room slider, offers grid, FAQ, galleries, etc.).

This means most content and page structure is controlled from WordPress — adding a new section type generally means creating a component in `components/` and adding a `case` to the renderer in `pages/[slug].js`.

### Routes

| Route | Source |
| --- | --- |
| `/` | Re-exports the home page from `pages/[slug].js` |
| `/[slug]` | Any WordPress page or post (flexible content) |
| `/rooms/[room]` | Individual room pages |
| `/offers/[offer]` | Individual offer pages |
| `/email` | Standalone exit-intent email capture |
| `/sitemap.xml` | Generated sitemap |

Several legacy URLs and campaign links are handled via `redirects()` in [`next.config.js`](next.config.js), including booking hand-offs to Mews and the Shopify shop.

## Getting started

### Prerequisites

- Node.js (project pins `^23`; Node 20+ recommended)
- Access to the WordPress GraphQL endpoint and the required API keys

### Environment variables

Create a `.env` file in the project root:

```bash
WP_GQL_API=https://<your-wp-host>/graphql   # WordPress GraphQL endpoint (WPGraphQL)
GMAP_API=<google-maps-api-key>              # Maps / directions
OW_API=<openweather-api-key>                # Weather widget
```

Remote image hosts are allow-listed in `next.config.js` (`orlidev.wpengine.com`, `stayorli.com`, `orlistg.wpengine.com`) — add your WordPress host there if it differs.

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> This repo commits `.npmrc` with `legacy-peer-deps=true` to resolve peer-dependency conflicts (React 19 vs. some older carousel/masonry packages).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (`eslint-config-next`) |

## Project structure

```
components/        Section + UI components (mapped from ACF flexible content)
components/Modals/  Award/press modals (Michelin, Travel + Leisure, Condé Nast)
context/           React context (e.g. WeatherContext)
pages/             Routes + getStatic* data fetching
pages/api/         API routes
styles/            Global and per-component SCSS
utils/             Shared hooks and helpers
public/            Static assets
```

## Deployment

Deployed on [Vercel](https://vercel.com/). Set the environment variables above in the Vercel project settings. Content changes in WordPress require a rebuild/redeploy to appear, since pages are statically generated.
