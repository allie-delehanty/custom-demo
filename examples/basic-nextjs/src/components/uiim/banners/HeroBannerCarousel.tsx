import React, { JSX } from 'react';
import {
  Default as DefaultClient,
  WithThumbnails as WithThumbnailsClient,
  Allegro as AllegroClient,
} from './HeroBannerCarousel.client';

/**
 * Server-registered wrappers. Pages SSR looks up named exports on the server
 * map; a `'use client'` parent is skipped when FieldNames is not Default.
 */
export const Default = (props: React.ComponentProps<typeof DefaultClient>): JSX.Element => (
  <DefaultClient {...props} />
);
export const WithThumbnails = (
  props: React.ComponentProps<typeof WithThumbnailsClient>
): JSX.Element => <WithThumbnailsClient {...props} />;
export const Allegro = (props: React.ComponentProps<typeof AllegroClient>): JSX.Element => (
  <AllegroClient {...props} />
);
