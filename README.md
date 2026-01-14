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

## Environment Setup

### Quick Start

```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### Required Variables

| Variable | Description |
|----------|-------------|
| `TURSO_DATABASE_URL` | Turso database connection string (libsql://...) |
| `TURSO_AUTH_TOKEN` | Authentication token for Turso |
| `BONZO_API_KEY` | API key for Bonzo CRM integration |
| `BONZO_PIPELINE_STAGE_ID` | Pipeline stage ID for new leads |

### Getting Credentials

**Turso Database**
1. Sign up at [turso.tech](https://turso.tech)
2. Create a new database (or use existing)
3. Go to database settings → "Connect" tab
4. Copy the database URL and generate an auth token

**Bonzo CRM**
1. Log into Bonzo dashboard
2. Go to Settings → API
3. Generate or copy your API key
4. For pipeline stage ID: go to Pipelines → select your pipeline → the stage ID is in the URL when viewing a stage

## Deployment

### Vercel Deployment

This project is configured for deployment on [Vercel](https://vercel.com).

**Deployment Steps:**

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Next.js and apply optimal build settings
3. Configure environment variables in the Vercel dashboard
4. Deploy

**Vercel Project:** [TBD - Add link after deployment]

### Build Verification

Before deploying, verify the build locally:

```bash
npm run build
npm run lint
```
