import { createSitemapRouteHandler } from '@sitecore-content-sdk/nextjs/route-handler';
import client from 'lib/sitecore-client';
import { getSites } from 'src/lib/sites';

const sites = getSites();

export const dynamic = 'force-dynamic';

/**
 * API route for generating sitemap.xml
 *
 * This Next.js API route handler dynamically generates and serves the sitemap XML for your site.
 * The sitemap configuration can be managed within XM Cloud.
 */

export const { GET } = createSitemapRouteHandler({
  client,
  sites,
});
