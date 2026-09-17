import type { NextjsContentSdkComponent } from '@sitecore-content-sdk/nextjs';

/**
 * Pages editing stores Headless Variant item IDs in FieldNames.
 * Published Edge layout often sends the variant *name* (Allegro).
 * Content SDK does `component[params.FieldNames]` and, on miss, renders
 * MissingComponent with isEmpty=true — which skips the client wrapper.
 */
const VARIANT_FIELD_NAMES: Record<
  string,
  { exportName: string; ids: string[]; fallback?: boolean }[]
> = {
  HeroBannerCarousel: [
    {
      exportName: 'Allegro',
      ids: [
        '{4CD693EF-4892-4E06-8916-922292789945}',
        '{4cd693ef-4892-4e06-8916-922292789945}',
        '4CD693EF-4892-4E06-8916-922292789945',
        'Allegro',
      ],
      fallback: true,
    },
  ],
  FeatureCardsGrid: [
    {
      exportName: 'AllegroFeaturedProducts',
      ids: [
        '{2733D5A8-DF25-4048-B640-3E5B20DD6B5E}',
        '{2733d5a8-df25-4048-b640-3e5b20dd6b5e}',
        '2733D5A8-DF25-4048-B640-3E5B20DD6B5E',
        'AllegroFeaturedProducts',
      ],
      fallback: true,
    },
    {
      exportName: 'AllegroStoryMosaic',
      ids: [
        '{A2988BBA-ABF8-4E91-AABC-711FEF43FD77}',
        '{a2988bba-abf8-4e91-aabc-711fef43fd77}',
        'A2988BBA-ABF8-4E91-AABC-711FEF43FD77',
        'AllegroStoryMosaic',
      ],
    },
  ],
};

function withUnknownFieldNameFallback(
  entry: NextjsContentSdkComponent,
  fallback: unknown
): NextjsContentSdkComponent {
  return new Proxy(entry as object, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (value !== undefined) {
        return value;
      }
      if (typeof prop === 'string' && prop !== 'componentType' && prop !== 'then') {
        return fallback;
      }
      return value;
    },
  }) as NextjsContentSdkComponent;
}

export function withHeadlessVariantFieldNames(
  source: Map<string, NextjsContentSdkComponent>
): Map<string, NextjsContentSdkComponent> {
  const map = new Map(source);

  for (const [componentName, variants] of Object.entries(VARIANT_FIELD_NAMES)) {
    const entry = map.get(componentName);
    if (!entry) continue;

    const extra: Record<string, unknown> = {};
    let fallback: unknown;
    const record = entry as unknown as Record<string, unknown>;

    for (const variant of variants) {
      const impl = record[variant.exportName];
      if (!impl) continue;
      if (variant.fallback) {
        fallback = impl;
      }
      for (const id of variant.ids) {
        extra[id] = impl;
      }
    }

    const merged = { ...entry, ...extra } as NextjsContentSdkComponent;
    map.set(
      componentName,
      fallback ? withUnknownFieldNameFallback(merged, fallback) : merged
    );
  }

  return map;
}
