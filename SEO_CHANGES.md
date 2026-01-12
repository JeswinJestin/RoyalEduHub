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
- Upgraded to nested schema via @graph with Organization and LocalBusiness in [index.html](file:///c:/Users/jeswi/Downloads/EDU_HUB_/public/index.html#L44-L100).
- Implemented semantic microformats (h-card, p-adr, p-tel, u-email, u-url) in:
  - Footer: [Footer.js](file:///c:/Users/jeswi/Downloads/EDU_HUB_/src/components/layout/Footer.js)
  - Contact page: [ContactUsPage.js](file:///c:/Users/jeswi/Downloads/EDU_HUB_/src/pages/ContactUsPage.js)
  - About page: [AboutPage.js](file:///c:/Users/jeswi/Downloads/EDU_HUB_/src/pages/AboutPage.js)
- Centralized NAP constants for consistency: [nap.js](file:///c:/Users/jeswi/Downloads/EDU_HUB_/src/constants/nap.js)
- Added automated NAP/microformat tests: [napConsistency.test.js](file:///c:/Users/jeswi/Downloads/EDU_HUB_/src/__tests__/napConsistency.test.js)

### NAP Consistency Checklist
- Use exactly: “Royal Edu Hub”, `royaleduhub24@gmail.com`, `+91 70341 11684`.
- Address: “Royal Complex, Kaithavana Junction, Pazhaveedu, Alappuzha, Kerala 688003, India”.
- Primary URL: `https://royaleduhub.com`.

### Platform Consistency Actions
- Update Google Business Profile to the exact format above.
- Align third‑party listings (Yelp, Bing Places, etc.) with the NAP constants.
- Monitor NAP via unit tests and monthly directory audit.

### Validation & QA
- Validate JSON‑LD using Google’s Rich Results Test (copy from [index.html](file:///c:/Users/jeswi/Downloads/EDU_HUB_/public/index.html#L44-L100)).
- Inspect URL Inspection in Search Console for address parsing.
- Confirm rendering across devices; microformats use semantic `<address>` with line breaks.
- Regression: no functional changes; styles preserved; performance impact negligible.

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
- No URL changes were introduced; Vercel rewrites configured in [vercel.json](file:///c:/Users/jeswi/Downloads/EDU_HUB_/vercel.json) (replacing Netlify config).

## Email Security (DMARC & SPF)
- Created DNS configuration guide: [DNS_CONFIG.md](file:///c:/Users/jeswi/Downloads/EDU_HUB_/DNS_CONFIG.md).
- Implemented SPF record (`v=spf1 include:_spf.google.com ~all`) to authorize Google/Gmail as sender.
- Implemented DMARC record (`v=DMARC1; p=none; ...`) for monitoring and gradual enforcement.
- **Action Required:** Add these TXT records to your domain's DNS settings (e.g., GoDaddy, Namecheap).
