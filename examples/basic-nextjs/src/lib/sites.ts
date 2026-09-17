import type { SiteInfo } from '@sitecore-content-sdk/nextjs';
import allSites from '.sitecore/sites.json';
import scConfig from 'sitecore.config';

/**
 * Hostname `*` is shared by main-website and main-website-1. Without a filter,
 * the first match wins and the Allegro Home is skipped.
 */
export function getSites(): SiteInfo[] {
  const sites = allSites as SiteInfo[];
  const preferred = scConfig.defaultSite;
  const matched = preferred
    ? sites.filter((site) => site.name === preferred)
    : sites;
  const list = matched.length ? matched : sites;
  const seen = new Set<string>();
  return list.filter((site) => {
    if (seen.has(site.name)) return false;
    seen.add(site.name);
    return true;
  });
}
