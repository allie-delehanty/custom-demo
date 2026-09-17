import type { NextjsContentSdkComponent } from '@sitecore-content-sdk/nextjs';

/**
 * Pages editing stores Headless Variant item IDs in FieldNames.
 * Published Edge layout often sends the variant *name* (Allegro).
 * Content SDK does `component[params.FieldNames]` with no Default fallback.
 *
 * Aliases must be own enumerable properties on a plain object. A Proxy is
 * stripped when the map crosses the RSC boundary.
 */
const VARIANT_FIELD_NAMES: Record<string, { exportName: string; ids: string[] }[]> = {
  HeroBannerCarousel: [
    {
      exportName: 'Allegro',
      ids: [
        '{4CD693EF-4892-4E06-8916-922292789945}',
        '{4cd693ef-4892-4e06-8916-922292789945}',
        '4CD693EF-4892-4E06-8916-922292789945',
        '4cd693ef-4892-4e06-8916-922292789945',
        'Allegro',
      ],
    },
  ],
  FeatureCardsGrid: [
    {
      exportName: 'AllegroFeaturedProducts',
      ids: [
        '{2733D5A8-DF25-4048-B640-3E5B20DD6B5E}',
        '{2733d5a8-df25-4048-b640-3e5b20dd6b5e}',
        '2733D5A8-DF25-4048-B640-3E5B20DD6B5E',
        '2733d5a8-df25-4048-b640-3e5b20dd6b5e',
        'AllegroFeaturedProducts',
      ],
    },
    {
      exportName: 'AllegroStoryMosaic',
      ids: [
        '{A2988BBA-ABF8-4E91-AABC-711FEF43FD77}',
        '{a2988bba-abf8-4e91-aabc-711fef43fd77}',
        'A2988BBA-ABF8-4E91-AABC-711FEF43FD77',
        'a2988bba-abf8-4e91-aabc-711fef43fd77',
        'AllegroStoryMosaic',
      ],
    },
  ],
  HeroBanner: [
    {
      exportName: 'BackgroundImage',
      ids: [
        '{948210B2-B8AF-47C1-A04F-E220071C0A63}',
        '{948210b2-b8af-47c1-a04f-e220071c0a63}',
        '948210B2-B8AF-47C1-A04F-E220071C0A63',
        'BackgroundImage',
      ],
    },
  ],
};

function copyOwnFunctions(entry: NextjsContentSdkComponent): Record<string, unknown> {
  const record: Record<string, unknown> = { ...entry };
  for (const key of Object.keys(entry as object)) {
    record[key] = (entry as Record<string, unknown>)[key];
  }
  return record;
}

export function withHeadlessVariantFieldNames(
  source: Map<string, NextjsContentSdkComponent>
): Map<string, NextjsContentSdkComponent> {
  const map = new Map(source);

  for (const [componentName, variants] of Object.entries(VARIANT_FIELD_NAMES)) {
    const entry = map.get(componentName);
    if (!entry) continue;

    const extra = copyOwnFunctions(entry);
    const record = extra as Record<string, unknown>;

    for (const variant of variants) {
      const impl = record[variant.exportName];
      if (!impl) continue;
      for (const id of variant.ids) {
        extra[id] = impl;
      }
    }

    map.set(componentName, extra as NextjsContentSdkComponent);
  }

  return map;
}
