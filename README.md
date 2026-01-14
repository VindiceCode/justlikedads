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
