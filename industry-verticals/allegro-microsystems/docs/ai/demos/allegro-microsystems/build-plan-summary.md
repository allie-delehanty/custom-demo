# Allegro MicroSystems — Build Plan

> **Source:** https://www.allegromicro.com/en/
> **Analyzed:** 2026-09-23
> **Approved:** 2026-09-23 — section 5 is 2× Two Column CTA with specified hover; pixel-perfect Allegro variants required
> **Sections:** 7 (7 template, 0 custom)

---

## Environment note

This site is the **Financial starter**, not the UIIM template library the skill catalog describes. Header, Carousel, Heading CTA, Three Column CTA, Two Column CTA, and Footer already exist in Sitecore and in `industry-verticals/allegro-microsystems`. The Home page still has leftover financial content. The plan reuses those Financial components and rewires them to Allegro content under `/sitecore/content/manufacturing/allegro-microsystems`.

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _White bar with the Allegro rainbow logo, six text links, language, search, and utility icons_ | Header | Allegro | High | Already in the header partial — update content, do not re-add |
| 2 | _Dark navy full-width carousel: large white headline, outlined pill CTA, product photo, arrows and dots_ | Carousel | Allegro | High | Already on Home. 4 slides |
| 3 | _“Featured Products” heading and a one-sentence intro on white_ | Heading CTA | Allegro | High | Added after the carousel |
| 4 | _Three product photos with titles, short copy, and a small arrow_ | Three Column CTA | Allegro | High | Already on Home |
| 5 | _Who We Are + Innovations — 50/50 text+image tiles, white rest, blue hover_ | Two Column CTA | Allegro | High | Reused existing instance |
| 6 | _Join our Team + Newsletter — same 50/50 hover tiles_ | Two Column CTA | Allegro | High | Added after row 1 |
| 7 | _White footer with logo, four link columns, socials, copyright_ | Footer | Allegro | High | Already in the footer partial |

---

## Editorial tile hover (approved)

Rest (screenshot 1): white rounded tile, title + muted description on the left, photo on the right, small arrow at the bottom-left.

Hover (screenshot 2): text panel fills brand blue, description hides, title and arrow stay (white).

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 1 | Header | Allegro | Compact white bar, logo image left, nav right — hides PLAY! wordmark |
| 2 | Carousel | Allegro | Navy split + outlined pill CTA |
| 3 | Heading CTA | Allegro | Heading + body only — no eyebrow, no button |
| 4 | Three Column CTA | Allegro | Product-on-white with arrow links |
| 5–6 | Two Column CTA | Allegro | 50/50 editorial tiles with blue hover fill |
| 7 | Footer | Allegro | White mega footer, compact logo, four columns |

---

## Build Order

```
1. Header (partial — content only)
2. Carousel (4 slides)
3. Heading CTA (Featured Products)
4. Three Column CTA (3 featured products)
5. Two Column CTA row 1 (Who We Are / Innovations)
6. Two Column CTA row 2 (Join our Team / Newsletter)
7. Footer (partial — content only)
```

Leftover financial components on Home to remove manually: Promo CTA (×3), Five Column CTA, Article List, Documents List, App Promo. Do not remove the two Allegro Two Column CTA rows.
