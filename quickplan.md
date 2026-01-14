Workstream B: Dad's BBQ App
Repo: justlikedads

A lead generation system for Just Like Dad's Barbecue. Landing page, QR code, lead capture, simple admin. Dad hands out business cards, people scan, fill out the form, become leads he can follow up on.
Technical Review:

 Review formizee/formizee for form handling patterns

Stack:

Database: Turso + libSQL
Analytics: DuckDB MCP (not Clickhouse)
Logs: DigitalOcean Spaces bucket (S3-compatible), star schema log path
Mobile app secret keys for analytics access
AI-forward data architecture—natural language queries against structured logs

User Stories:
Customer

 I can scan a QR code and land on the page
 I can see the menu and what's offered
 I can fill out a form with my event details
 I get confirmation my request was submitted

Dad (Owner/Operator)

 I can see a list of incoming leads
 I can see basic analytics (visits, form submissions, QR scans)
 I can mark a lead as contacted / booked / closed
 I can update menu items and pricing without touching code
 I can generate new QR codes if needed

Output:

Landing page with menu carousel and lead capture form
QR code generation linked to analytics
Business cards with QR code
Simple backend for Dad to view and manage leads
Deployed to Vercel


Next Steps

Create repo for Dad's app on GitHub
Rebuild blog codebase in learngenblog (Vercel + learngen.io already wired)
Push landing page files to Dad's repo
Deploy Dad's site to Vercel
Wire up form submission (email or simple backend)
Generate QR code, order business cards
Document the build process for the blog post