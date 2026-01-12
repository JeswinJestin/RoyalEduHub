# SEO Implementation Summary

- Title tags are dynamically set per route via a central SEO manager: [seo.js](file:///c:/Users/jeswi/Downloads/EDU_HUB_/src/utils/seo.js).
- Titles are unique and 50–60 characters, including primary keywords.
- Canonical tags are injected and updated on route change, self-referencing authoritative URLs.
- A comprehensive XML sitemap is added: [sitemap.xml](file:///c:/Users/jeswi/Downloads/EDU_HUB_/public/sitemap.xml).
- Robots file references the sitemap: [robots.txt](file:///c:/Users/jeswi/Downloads/EDU_HUB_/public/robots.txt).
- Local Business JSON‑LD schema is added in head: [index.html](file:///c:/Users/jeswi/Downloads/EDU_HUB_/public/index.html#L1-L120).

## Title Tags (Route → Title)
- / → Royal Edu Hub — Online Classes | CBSE & ICSE Coaching
- /about → About Royal Edu Hub | Mission, Team, Vision & Story
- /courses → Courses | CBSE, ICSE, State Syllabus Live Classes
- /services → Services | Online Tuition, Doubt Support & Analytics
- /contact → Contact Royal Edu Hub India | Enquiries & Support Today
- /help-center → Help Center | FAQs, Policies & Technical Support Guide
- /privacy-policy → Privacy Policy | Data Protection at Royal Edu Hub India
- /terms → Terms of Service | Policies at Royal Edu Hub India
- /contact-us → Contact Us | Address, Phone & Social — Royal Edu Hub
- /careers → Careers at Royal Edu Hub India | Tutor & Staff Openings

## Canonical Tags
- Self-referencing canonical set to `https://royaleduhub.com{pathname}` in production.
- In development, canonical uses `window.location.origin{pathname}`.

## Sitemap and Robots
- Sitemap lists all primary pages; update when adding new routes.
- Robots.txt allows crawling and points to the sitemap.

## Local SEO
- JSON‑LD schema includes NAP: name, address, phone, email, sameAs social profiles.
- Ensure NAP consistency across directories (see checklist below).

### NAP Consistency Checklist
- Use exactly: “Royal Edu Hub”, `royaleduhub24@gmail.com`, `+91 70341 11684`.
- Address: “Royal Complex, Kaithavana Junction, Pazhaveedu, Alappuzha, Kerala 688003, India”.
- Primary URL: `https://royaleduhub.com`.

## Backlink Strategy
- Target high-authority, relevant domains: education portals, local news, ed‑tech blogs, academic forums.
- Tactics: guest posts, scholarship pages, resource page inclusion, partner listings.
- Anchor text: branded + partial‑match (avoid exact‑match overuse).
- Monitoring: use Google Search Console “Links” report; monthly audit; disavow only when clearly toxic.

## Monitoring & Submissions
- Submit sitemap in Google Search Console; request indexing for key pages.
- Track rankings with a lightweight rank checker weekly.
- Use Vercel Analytics and GSC performance reports to monitor clicks, impressions, CTR.

## Redirects
- No URL changes were introduced; Netlify SPA redirect remains in [netlify.toml](file:///c:/Users/jeswi/Downloads/EDU_HUB_/netlify.toml).

