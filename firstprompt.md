I'm working on justlikedads - a lead generation landing page for Just Like Dad's Barbecue (my dad's catering business).

Read quickplan.md for user stories and README.md for architecture.

GitHub: https://github.com/VindiceCode/justlikedads
Run `gh issue list` to see the 14 open issues tracking all work.

Current state:
- Next.js 14 + Tailwind + TypeScript foundation is set up
- Turso/Drizzle database schema defined (leads + events tables)
- Bonzo CRM integration documented in .claude/skills/bonzo-api-integration-guide.md
- Landing page is minimal (just heading, no content yet)
- NOT deployed yet

Issues are sequenced:
1-4: Setup (init, drizzle, env vars, deploy skeleton)
5: Migrate landing page HTML to Next.js
6-8: Form submission flow (API endpoint → Turso → Bonzo)
9-11: Admin dashboard (auth, lead list, status updates)
12-14: QR code generation and tracking

Pick up by running `gh issue view 1` to see where we left off, then continue building.
