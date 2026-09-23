# Manual Tasks — Allegro MicroSystems

Work through these in Pages editor / Content Editor.

## 1. Variant Selection (~3 min)

See `variant-checklist.md`. Set **Allegro** on Header, Carousel, Heading CTA, Three Column CTA, both Two Column CTAs, and Footer.

## 2. Context-only / partials

- [ ] **Header** — confirm the rainbow logo shows (datasource `bdb1be91-6a5a-43d6-91ac-a3e85778713c`). The Allegro variant hides the PLAY! RichText in `header-left`. Nav labels still come from the content tree (Products / Applications / etc. cannot be fully rewritten via datasource).
- [ ] **Footer** — confirm Allegro columns, logo, copyright. Datasource `3c03b8e5-e256-4968-a646-acff948b89eb`.

## 3. Link verification

Demo links point at allegromicro.com. Update any that should stay in-site:

- [ ] Carousel CTAs (webinar / ESG PDF / series)
- [ ] Product card links
- [ ] Who We Are → `/en/about-allegro`
- [ ] Join our Team → careers
- [ ] Newsletter → `go.allegromicro.com/newsletter-signup-algm`

## 4. Cleanup leftover Financial OOB on Home

These cannot be removed via API. In Pages: component → ⋮ → **Remove**.

- [ ] Promo CTA ×3
- [ ] Five Column CTA (“Available Services”)
- [ ] Article List
- [ ] Documents List
- [ ] App Promo

Do **not** remove the two Two Column CTA rows (Who We Are / Innovations and Join our Team / Newsletter).

Optional leftover datasources created during add: `Home/Data/Heading_CTA` (`04d312d1`) and `Home/Data/Allegro_Featured_Products` (`d380494b`) — unused after rewire.

## 5. Content notes

- [ ] Innovations image is the scraper isolation-table PNG, not the live hand-holding-PCB photo. Replace if a better asset is available.
- [ ] Footer has 4 columns (template limit). Investors + newsletter subscribe are not in the footer.
- [ ] AskAllegro / Contact Us chat widget is out of scope.

## 6. Personalization (optional)

Create extra datasources in the same folders:

| Component | Company datasource | Template |
|-----------|-------------------|----------|
| Carousel | Home/Data/Carousel - Default | Carousel |
| Three Column CTA | Data/Promos/Three Column CTA | Three Column CTA |
| Two Column CTA | Data/Promos/Two Column CTA | Two Column CTA |

Naming: `Allegro Microsystems - <Component> - <Segment>`
