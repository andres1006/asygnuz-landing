# Technical Architecture & Implementation (Tech Squad)

## 1. Frontend Architecture (Ego / CTO)
**Stack Verification:**
- The repository (`asygnuz-landing`) is built on modern web standards (likely Astro/Next.js + Tailwind CSS).
- We will strictly adhere to the existing framework but enforce **Component-Driven Development**.
- **Performance:** Target <1.5s LCP. Use optimized images (`next/image` or Astro assets), lazy loading for the VSL, and minimal client-side JavaScript.

**Semantic HTML:**
- Ensure the hierarchy dictated by the SEO Specialist is respected: One `<header>`, one `<main>`, semantic `<section>` tags, and strict `<h1>`, `<h2>` nesting.

## 2. MarTech & Lead Capture (MarTech Engineer)
**The Conversion Engine:**
- Instead of a generic `mailto:` or static form, we will integrate a dynamic form.
- **Data Flow:** Web Form (React/Astro) -> Webhook -> CRM / Slack notification.
- **Qualifying Logic:** The form will have steps. E.g., Step 1: Name/Email. Step 2: "What describes your business best?" (Clinic, SaaS, E-commerce). Step 3: "Monthly Revenue?".
- Analytics tracking: Implement Google Tag Manager (GTM) or Meta Pixel natively to track "Lead" conversions accurately for the Trafficker.

## 3. DevOps & QA (DevOps & QA Tester)
**Deployment:**
- Ensure CI/CD pipelines (GitHub Actions) are intact.
- Pre-deploy checks must pass ESLint and TypeScript compilation.

**Quality Assurance:**
- **Automated Tests:** QA will write a Playwright script to verify the Lead Capture form submits correctly and that no console errors appear.
- **Lighthouse:** Enforce a CI rule where a Lighthouse score < 90 in SEO or Performance fails the build.