# Just Like Dad's BBQ

Lead generation landing page for a family BBQ catering business.

## What This Is

A full-stack MVP that turns QR code scans into catering leads:
- Landing page with menu and lead capture form
- Form submissions stored in Turso database
- Leads automatically pushed to Bonzo CRM (triggers SMS/email campaigns)
- Admin dashboard to view and manage leads
- QR code generation with scan tracking

## Stack

- **Frontend**: Next.js (App Router) on Vercel
- **Database**: Turso + libSQL with Drizzle ORM
- **CRM**: Bonzo API integration
- **Analytics**: DuckDB MCP + DigitalOcean Spaces

## Flow

```
Customer scans QR → Landing page → Form submit
                                      ↓
                              API route handler
                                      ↓
                    ┌─────────────────┼─────────────────┐
                    ↓                 ↓                 ↓
              Turso (lead)    Bonzo API (prospect)   Event log
                                      ↓
                          Auto SMS/email campaign
```

## Development

```bash
npm install
npm run dev
```

## Environment Variables

```
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
BONZO_API_KEY=
BONZO_PIPELINE_STAGE_ID=
```

## Deployment

### Vercel Deployment

This project is configured for deployment on [Vercel](https://vercel.com).

**Deployment Steps:**

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Next.js and apply optimal build settings
3. Configure environment variables in the Vercel dashboard (see below)
4. Deploy

**Required Environment Variables in Vercel Dashboard:**

| Variable | Description |
|----------|-------------|
| `TURSO_DATABASE_URL` | Turso database connection URL |
| `TURSO_AUTH_TOKEN` | Turso authentication token |
| `BONZO_API_KEY` | Bonzo CRM API key |
| `BONZO_PIPELINE_STAGE_ID` | Bonzo pipeline stage ID for new leads |

**Vercel Project:** [TBD - Add link after deployment]

### Build Verification

Before deploying, verify the build locally:

```bash
npm run build
npm run lint
```
