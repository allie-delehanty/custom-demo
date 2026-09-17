import type { NextjsContentSdkComponent } from '@sitecore-content-sdk/nextjs';

/**
 * Pages stores Headless Variant item IDs in the FieldNames rendering parameter.
 * Content SDK looks up that value as a named export on the component map entry.
 * Variant definition items are named Allegro / AllegroFeaturedProducts (per Sitecore docs);
 * this maps those IDs onto the matching exports.
 */
const VARIANT_FIELD_NAMES: Record<
  string,
  { exportName: string; ids: string[] }[]
> = {
  HeroBannerCarousel: [
    {
      exportName: 'Allegro',
      ids: [
        '{4CD693EF-4892-4E06-8916-922292789945}',
        '{4cd693ef-4892-4e06-8916-922292789945}',
      ],
    },
  ],
  FeatureCardsGrid: [
    {
      exportName: 'AllegroFeaturedProducts',
      ids: [
        '{2733D5A8-DF25-4048-B640-3E5B20DD6B5E}',
        '{2733d5a8-df25-4048-b640-3e5b20dd6b5e}',
      ],
    },
    {
      exportName: 'AllegroStoryMosaic',
      ids: [
        '{A2988BBA-ABF8-4E91-AABC-711FEF43FD77}',
        '{a2988bba-abf8-4e91-aabc-711fef43fd77}',
      ],
    },
  ],
};

export function withHeadlessVariantFieldNames(
  source: Map<string, NextjsContentSdkComponent>
): Map<string, NextjsContentSdkComponent> {
  const map = new Map(source);

  for (const [componentName, variants] of Object.entries(VARIANT_FIELD_NAMES)) {
    const entry = map.get(componentName);
    if (!entry) continue;

    const extra: Record<string, unknown> = {};
    for (const variant of variants) {
      const impl = (entry as unknown as Record<string, unknown>)[variant.exportName];
      if (!impl) continue;
      for (const id of variant.ids) {
        extra[id] = impl;
      }
    }

    map.set(componentName, { ...entry, ...extra } as NextjsContentSdkComponent);
  }

  return map;
}
