import React, { JSX } from 'react';
import {
  Default as DefaultClient,
  TwoColumn as TwoColumnClient,
  WithImages as WithImagesClient,
  Carousel as CarouselClient,
  AllegroFeaturedProducts as AllegroFeaturedProductsClient,
  AllegroStoryMosaic as AllegroStoryMosaicClient,
} from './FeatureCardsGrid.client';

/**
 * Server-registered wrappers. Pages SSR looks up named exports on the server
 * map; a `'use client'` parent is skipped when FieldNames is not Default.
 */
export const Default = (props: React.ComponentProps<typeof DefaultClient>): JSX.Element => (
  <DefaultClient {...props} />
);
export const TwoColumn = (props: React.ComponentProps<typeof TwoColumnClient>): JSX.Element => (
  <TwoColumnClient {...props} />
);
export const WithImages = (props: React.ComponentProps<typeof WithImagesClient>): JSX.Element => (
  <WithImagesClient {...props} />
);
export const Carousel = (props: React.ComponentProps<typeof CarouselClient>): JSX.Element => (
  <CarouselClient {...props} />
);
export const AllegroFeaturedProducts = (
  props: React.ComponentProps<typeof AllegroFeaturedProductsClient>
): JSX.Element => <AllegroFeaturedProductsClient {...props} />;
export const AllegroStoryMosaic = (
  props: React.ComponentProps<typeof AllegroStoryMosaicClient>
): JSX.Element => <AllegroStoryMosaicClient {...props} />;
