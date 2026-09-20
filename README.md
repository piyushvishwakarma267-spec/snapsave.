# SnapSave

Premium SaaS-style Next.js/TypeScript scaffold for an Instagram public-media downloader.

## Critical provider boundary
The included provider intentionally returns `NOT_CONFIGURED`. This is deliberate: the app must not fake downloads. Integrate only a compliant/authorized provider capable of retrieving public media under applicable law and platform terms. Do not implement credential scraping, private-account access, access-control bypasses, DRM circumvention, or security-mechanism circumvention.

## Setup
1. Node 20+, PostgreSQL 15+, Redis 7+.
2. `npm install`
3. `cp .env.example .env` and set secrets.
4. `npx prisma migrate dev --name init`
5. `npm run dev`
6. `npm test`
7. `npm run build && npm start`

## Architecture
UI → API routes → validation/rate limit → provider abstraction → short-lived provider result.
Database models cover anonymous sessions, media requests, downloads, rate limits, and system logs.

## Security
Only HTTPS Instagram hosts are accepted; embedded credentials and private address patterns are rejected. Never accept arbitrary fetch URLs. Keep all provider credentials server-side. Do not log tokens/cookies/signed URLs.

## Production checklist
Configure a real compliant provider, Redis-backed distributed rate limiting, Prisma-backed request state, real admin identity/OIDC, S3-compatible private temporary storage with lifecycle expiry if needed, monitoring/WAF, backups, and legally reviewed Privacy/Terms/DMCA/Acceptable Use pages.

## Deployment
Vercel can host the Next.js app. Use managed PostgreSQL and Redis. Add all environment variables in the deployment platform, run Prisma migrations in CI/deploy, attach a custom domain, enable HTTPS, and monitor `/api/health`.
