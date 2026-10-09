# Con Edison — Build Plan

> **Source:** https://www.coned.com/
> **Analyzed:** 2026-10-08
> **Sections:** 6 (5 template, 1 custom)

---

## Page Sections (top to bottom)

| # | What's on the page | What we'll use | Variant | Confidence | Notes |
|---|-------------------|----------------|---------|------------|-------|
| 1 | _Thin dark bar with Contact Us and English_ | Announcement Bar | Highlight | Medium | Utility links, not a promo |
| 2 | _White header, logo, four menus, Search and Log In in blue_ | Navigation Header | Default | High | One CTA field; Search is the extra button |
| 3 | _Two photos side by side, each with a white headline_ | Hero Banner | DualPanelOverlay | Medium | Custom variant |
| 4 | _Six icon links; first three blue, last three white_ | Value Proposition Grid | SplitIconRow | Medium | Custom variant |
| 5 | _Gray link directory, then a dark legal and social bar_ | Site Footer | MegaFooter | Medium | Manual placement |
| 6 | _Feedback tab and Chat With Us button_ | Custom | — | Low | Skip unless the chat widget is required |

---

## Sections that need attention

> [!WARNING]
> These sections have low confidence or need custom work. Review before approving.

| # | What's on the page | Issue | Suggestion |
|---|-------------------|-------|------------|
| 3 | _Two photo panels with headlines_ | No hero variant is two image overlays | Add DualPanelOverlay on Hero Banner |
| 4 | _Six icon tiles with a blue/white split_ | Grid variants are three or four items on one background | Add SplitIconRow on Value Proposition Grid |
| 5 | _Many link columns_ | Footer datasource is a logo only, and the rendering is context-only | Place MegaFooter by hand; link columns are follow-up content |
| 6 | _Chat and Feedback_ | No template match | Leave out of the demo |

---

## Variant Decisions

| # | Component | Variant | Why this variant |
|---|-----------|---------|-----------------|
| 1 | Announcement Bar | Highlight | Dark high-contrast utility bar |
| 3 | Hero Banner | DualPanelOverlay | Two equal photo panels with text over each image |
| 4 | Value Proposition Grid | SplitIconRow | Six labels, blue on the left and white on the right |
| 5 | Site Footer | MegaFooter | Multi-column link index rather than a short footer |

---

## Components by type

### Will be added automatically (API-addable)

| # | Component | Datasource needed |
|---|-----------|------------------|
| 1 | Announcement Bar | Simple (1 item) |
| 2 | Navigation Header | List (parent + 5 links) |
| 3 | Hero Banner | Simple (1 item, two panels) |
| 4 | Value Proposition Grid | List (parent + 6 items) |

### Must be placed manually

| # | Component | Where it lives | What to do |
|---|-----------|---------------|------------|
| 5 | Site Footer | Footer | Assign MegaFooter in Content Editor. Link columns are not in the datasource template. |

### Custom components needed

None as new components. DualPanelOverlay and SplitIconRow are variants on existing components. Chat and Feedback stay out of the build.

---

## Build Order

```
Phase 1 — Sitecore content:
  1. AnnouncementBar
  2. NavigationHeader
  3. HeroBanner
  4. ValuePropositionGrid

Phase 2 — Apply the Con Edison theme

Manual:
  5. SiteFooter MegaFooter
```

---

## Approval Questions

1. **Does the section-to-component mapping look correct?**
2. **Do you want pixel-perfect custom variants** (DualPanelOverlay and SplitIconRow) or are the generic template variants sufficient?

> Reply "approved" to proceed, or describe any changes needed.
