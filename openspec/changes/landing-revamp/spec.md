# Specification: Landing Page Revamp

## Functional Requirements

### 1. Hero Section (Above the Fold)
- **Given** a user lands on `asygnuz.com`,
- **When** the page loads,
- **Then** the main headline MUST communicate the unique value proposition (e.g., "Ingeniería Aplicada a las Ventas").
- **And** a clear, high-contrast Call to Action (CTA) must be visible immediately (e.g., "Agenda una Auditoría Gratuita").
- **And** it must load in under 1.5 seconds (LCP optimization).

### 2. Services Section (The "How")
- **Given** the user scrolls down,
- **When** they reach the services area,
- **Then** the system MUST display three distinct pillars: Software Development, AI Agents/Automation, and Performance Marketing.
- **And** each pillar must focus on the *benefit* (e.g., "Ahorra 40 horas a la semana con Agentes de IA") rather than just the feature.

### 3. SEO & AEO (Answer Engine Optimization)
- **Given** search engine bots (Googlebot) or AI crawlers (Perplexity/ChatGPT) scan the site,
- **When** parsing the HTML,
- **Then** the page MUST contain valid JSON-LD `Organization` and `Service` schema markup.
- **And** the content MUST include an FAQ section formatted to directly answer common B2B questions (AEO strategy).
- **And** the hierarchy MUST be strictly semantic (One `H1`, followed by logical `H2`s and `H3`s).

### 4. Lead Capture Mechanism (Form)
- **Given** a prospective client wants to get in touch,
- **When** they click the primary CTA,
- **Then** they should be directed to an optimized lead capture form (e.g., Typeform integration or native webhook to CRM).
- **And** the form MUST ask qualifying questions (e.g., "What is your current monthly revenue?") to filter High-Ticket leads.