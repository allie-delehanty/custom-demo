# Allegro MicroSystems — Demo Build Summary

> **Client:** Allegro MicroSystems
> **Source:** https://www.allegromicro.com/en/
> **Built:** 2026-09-23
> **Page:** /sitecore/content/manufacturing/allegro-microsystems/Home (`afc1c152-af3e-455b-968b-8a215d58ebe3`)

---

## Build Overview

| Metric | Count |
|--------|-------|
| Template components used | 7 |
| Custom components built | 0 |
| Custom variants created | 6 (Header, Carousel, HeadingCta, ThreeColumnCta, TwoColumnCta, Footer) |
| Datasource items created | 7 client items + 4 carousel children on the live parent |
| Images uploaded | 13 / 13 |

---

## Component Inventory

| # | Component | Variant | Datasource | Status |
|---|-----------|---------|------------|--------|
| 1 | Header | Allegro | Header (`bdb1be91`) | ✅ Wired — set variant in Pages |
| 2 | Carousel | Allegro | Carousel - Default (`9ba34d8b`) + 4 Allegro slides | ✅ Wired — set variant in Pages |
| 3 | Heading CTA | Allegro | Allegro Microsystems - Featured Products Heading (`08791425`) | ✅ Wired — set variant in Pages |
| 4 | Three Column CTA | Allegro | Featured Products (`171fc073` / fallback `89b6a7b7`) | ✅ Wired — set variant in Pages |
| 5 | Two Column CTA | Allegro | Editorial Row 1 (`99994b9e`) | ✅ Wired — set variant in Pages |
| 6 | Two Column CTA | Allegro | Editorial Row 2 (`0df35b57`) | ✅ Wired — set variant in Pages |
| 7 | Footer | Allegro | Allegro Microsystems - Footer (`3c03b8e5`) | ✅ Wired — set variant in Pages |

---

## Theme

| Property | Value |
|----------|-------|
| Primary color | `#0C4ECB` |
| Heading font | Outfit (Gibson substitute) |
| Body font | Inter |
| Delivery method | Inlined `:root` in `src/app/globals.scss` + remapped `body.site-financial` tokens |
| Google Fonts | Added in `src/app/layout.tsx` |

Theme takes effect on next dev server restart. Allegro variants also use `--brand-*` variables.

---

## Editorial tiles (section 5–6)

Two **Two Column CTA** rows, not Four Column.

**Rest:** white rounded tile, title + description left, photo right, blue arrow bottom-left.

**Hover:** text panel fills `--brand-primary`, description hides, title and arrow turn white.

---

## Image Upload Summary

**Content Hub:** `https://ad-ch-scai.sitecoresandbox.cloud/`

| Result | Count |
|--------|-------|
| Uploaded + approved | 13 |
| Failed | 0 |
| **Total** | **13** |

All 13 images uploaded and approved. Image fields are set on datasource items.

Innovations currently uses the scraper isolation-table PNG (`section4-img10`), not the live hand-holding-PCB photo.

---

## Manual Tasks

Full checklist: `manual-tasks.md`. Variant IDs: `variant-checklist.md`.

1. Set every listed component to the **Allegro** variant in Pages (~3 min).
2. Remove leftover Financial OOB: Promo CTA ×3, Five Column CTA, Article List, Documents List, App Promo.
3. Confirm header logo + footer columns. Nav labels still come from the content tree.
4. Optional: replace the Innovations image.

---

## Output Files

All files are under `docs/ai/demos/allegro-microsystems/`.

| File | What it contains |
|------|-----------------|
| `demo-progress.yaml` | Phase/section status |
| `build-plan.yaml` | Section → component map |
| `content-map.yaml` | Datasource IDs and fields |
| `build-plan-summary.md` | Approved plan |
| `demo-summary.md` | This file |
| `manual-tasks.md` | Pages editor checklist |
| `variant-checklist.md` | Variant IDs |
| `variant-specs.yaml` | Pixel-perfect layout notes |
| `images/` | Downloaded + uploaded assets |
