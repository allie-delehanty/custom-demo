import { defineConfig } from '@sitecore-content-sdk/nextjs/config';
/**
 * @type {import('@sitecore-content-sdk/nextjs/config').SitecoreConfig}
 * See the documentation for `defineConfig`:
 * https://doc.sitecore.com/xmc/en/developers/content-sdk/the-sitecore-configuration-file.html
 */
export default defineConfig({
  // Allegro content lives on main-website-1. main-website still resolves to the
  // starter Home, and XM Cloud env vars often still send that name.
  defaultSite: 'main-website-1',
});
