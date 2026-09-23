# Variant Selection Checklist — Allegro MicroSystems

Open Home in Pages editor and set these variants. The Agent API cannot set SXA `FieldNames` variants (`set_component_datasource.variantId` is for personalization, not rendering variants).

| # | Component | Instance location | Current | Set to | Variant ID |
|---|-----------|-------------------|---------|--------|------------|
| 1 | Header | Header partial | WithLogoImage / Default | **Allegro** | `1742b59a-ebba-44ae-98d5-6a7e1bc4b83a` |
| 2 | Carousel | Home, first `headless-main` | Default | **Allegro** | `a57f8dc7-9d3e-4063-9802-e57da9eb2226` |
| 3 | Heading CTA | Home, after Carousel | Default | **Allegro** | `b106b6f9-d015-40f1-86ac-ccc2c9281ee5` |
| 4 | Three Column CTA | Home | Default | **Allegro** | `b6a216eb-51a6-4de7-82e0-68b119a5f111` |
| 5 | Two Column CTA (Who We Are / Innovations) | Home | Default | **Allegro** | `7d247f72-725f-4449-aefa-0bfe7d1080aa` |
| 6 | Two Column CTA (Join our Team / Newsletter) | Home | Default | **Allegro** | `7d247f72-725f-4449-aefa-0bfe7d1080aa` |
| 7 | Footer | Footer partial | Default | **Allegro** | `3161c883-d2ff-4cf6-b822-612282263b04` |

**Steps per component:**
1. Click the component on the canvas
2. In the right-hand pane, open the **Design** tab
3. Select **Allegro** from the variant dropdown
4. Repeat for the next component

Estimated time: ~3 minutes

Restart the Financial starter (`examples` / `industry-verticals/allegro-microsystems`) after pulling these exports so `.sitecore/component-map.ts` includes `Allegro`.
