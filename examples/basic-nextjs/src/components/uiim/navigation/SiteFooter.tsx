import React, { JSX } from 'react';
import {
  ImageField,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { ArrowRight, Facebook, Linkedin, Youtube } from 'lucide-react';
import { ComponentProps } from 'lib/component-props';
import { cn } from '@/lib/utils';

type SiteFooterProps = ComponentProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: any;
};

function getBrandLogo(props: SiteFooterProps): ImageField | undefined {
  const fields = props.fields;
  // Path 1: ComponentQuery → fields.data.datasource
  const fromFields = fields?.data?.datasource?.brandLogo?.jsonValue;
  if (fromFields) return fromFields;
  // Path 2: rendering.fields.data.datasource
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rendering = props.rendering as any;
  const fromRendering = rendering?.fields?.data?.datasource?.brandLogo?.jsonValue;
  if (fromRendering) return fromRendering;
  // Path 3: Direct datasource field access
  const fromDirect = rendering?.fields?.BrandLogo;
  if (fromDirect?.value?.src) return fromDirect;
  return undefined;
}

const SiteFooterDefaultComponent = (): JSX.Element => (
  <div className="component site-footer">
    <div className="component-content">
      <span className="is-empty-hint">SiteFooter</span>
    </div>
  </div>
);

const LINK_COLUMNS = [
  {
    title: 'Products',
    links: ['Overview', 'Features', 'Pricing', 'Integrations'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Blog', 'Press'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Contact', 'Documentation', 'Status'],
  },
];

const Logo = ({
  brandLogo,
  invert = false,
}: {
  brandLogo?: ImageField;
  invert?: boolean;
}) => {
  const hasImage = brandLogo?.value?.src;
  return (
    <Link
      href="/"
      className="flex items-center text-xl font-bold tracking-tight"
      style={{ color: 'var(--brand-footer-fg, #ffffff)' }}
    >
      {hasImage ? (
        <ContentSdkImage
          field={brandLogo}
          className={cn(
            'h-8 w-auto object-contain sm:h-10',
            invert && 'brightness-0 invert'
          )}
        />
      ) : (
        <>
          <span style={{ color: 'var(--brand-primary)' }}>Brand</span>Logo
        </>
      )}
    </Link>
  );
};

const SocialIcons = () => (
  <div className="flex items-center gap-4">
    {['X', 'Li', 'Fb', 'Ig'].map((label) => (
      <a
        key={label}
        href="#"
        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-opacity hover:opacity-70"
        style={{
          backgroundColor: 'var(--brand-footer-fg, #ffffff)',
          color: 'var(--brand-footer-bg, #111111)',
          opacity: 0.2,
        }}
        aria-label={label}
      >
        {label}
      </a>
    ))}
  </div>
);

const Copyright = () => (
  <p
    className="text-sm opacity-50 font-[var(--brand-body-font,inherit)]"
    style={{ color: 'var(--brand-footer-fg, #ffffff)' }}
  >
    &copy; {new Date().getFullYear()} BrandName. All rights reserved.
  </p>
);

const ALLEGRO_ORIGIN = 'https://www.allegromicro.com';

const ALLEGRO_COLUMNS = [
  {
    title: 'Products',
    href: `${ALLEGRO_ORIGIN}/en/products`,
    links: [
      { label: 'Sensors', href: `${ALLEGRO_ORIGIN}/en/products/sense` },
      { label: 'Regulators', href: `${ALLEGRO_ORIGIN}/en/products/regulate` },
      { label: 'Drivers', href: `${ALLEGRO_ORIGIN}/en/products/motor-drivers` },
    ],
  },
  {
    title: 'Applications',
    href: `${ALLEGRO_ORIGIN}/en/applications`,
    links: [
      { label: 'Automotive', href: `${ALLEGRO_ORIGIN}/en/applications/automotive` },
      { label: 'Industrial', href: `${ALLEGRO_ORIGIN}/en/applications/industrial` },
      { label: 'Consumer', href: `${ALLEGRO_ORIGIN}/en/applications/consumer` },
      { label: 'Technologies', href: `${ALLEGRO_ORIGIN}/en/insights-and-innovations/allegro-technology` },
    ],
  },
  {
    title: 'Design Support',
    href: `${ALLEGRO_ORIGIN}/en/design-support`,
    links: [
      { label: 'Design and Development', href: `${ALLEGRO_ORIGIN}/en/design-support/design-and-development` },
      { label: 'Packaging', href: `${ALLEGRO_ORIGIN}/en/design-support/packaging` },
      { label: 'Quality and Environment', href: `${ALLEGRO_ORIGIN}/en/design-support/quality-and-environment` },
      { label: 'Software Portal', href: 'https://registration.allegromicro.com/login' },
    ],
  },
  {
    title: 'About Allegro',
    href: `${ALLEGRO_ORIGIN}/en/about-allegro`,
    links: [
      { label: 'Our Company', href: `${ALLEGRO_ORIGIN}/en/about-allegro` },
      { label: 'Careers', href: `${ALLEGRO_ORIGIN}/en/about-allegro/careers` },
      { label: 'ESG', href: `${ALLEGRO_ORIGIN}/en/about-allegro/corporate-responsibility` },
      { label: 'Growth and Inclusion', href: `${ALLEGRO_ORIGIN}/en/about-allegro/corporate-responsibility/growth-and-inclusion` },
      { label: 'Contact Us', href: `${ALLEGRO_ORIGIN}/en/about-allegro/contact-us` },
    ],
  },
];

const ALLEGRO_LEGAL = [
  { label: 'Privacy Notice', href: `${ALLEGRO_ORIGIN}/en/privacy-notice` },
  { label: 'Cookie Notice', href: `${ALLEGRO_ORIGIN}/en/cookie-notice` },
  { label: 'Legal', href: `${ALLEGRO_ORIGIN}/en/about-allegro/legal` },
  {
    label: 'UK Modern Slavery Act',
    href: `${ALLEGRO_ORIGIN}/-/media/files/corporate-responsibility/allegro-modern-slavery-statement_fy26.pdf?sc_lang=en`,
  },
];

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const WeChatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M8.6 3.5c-3.9 0-7.1 2.6-7.1 5.9 0 1.9 1.1 3.6 2.8 4.7l-.7 2.1 2.4-1.2c.7.2 1.5.3 2.3.3.2 0 .5 0 .7 0-.2-.5-.3-1.1-.3-1.6 0-3.1 2.9-5.6 6.5-5.6.2 0 .4 0 .6 0C15.2 5.4 12.2 3.5 8.6 3.5Zm-2.3 3.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Zm4.6 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM16.8 9.8c-3.1 0-5.6 2.1-5.6 4.7s2.5 4.7 5.6 4.7c.6 0 1.2-.1 1.8-.2l1.9.9-.5-1.7c1.3-.9 2.2-2.2 2.2-3.7 0-2.6-2.5-4.7-5.4-4.7Zm-1.9 3.3a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4Zm3.8 0a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4Z" />
  </svg>
);

const ALLEGRO_SOCIAL = [
  { label: 'Facebook', href: 'https://www.facebook.com/AllegroMicro/', Icon: Facebook },
  { label: 'Twitter', href: 'https://www.twitter.com/allegromicro', Icon: XIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/allegro-microsystems/', Icon: Linkedin },
  { label: 'WeChat', href: `${ALLEGRO_ORIGIN}/en/qr-code-wechat`, Icon: WeChatIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCDLxaXxc2yv3hHiUkqEN3kA', Icon: Youtube },
];

const AllegroSocial = () => (
  <div className="flex items-center gap-4">
    {ALLEGRO_SOCIAL.map(({ label, href, Icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="flex h-8 w-8 items-center justify-center rounded-full border transition-opacity hover:opacity-70"
        style={{
          borderColor: 'var(--brand-border, #E5E7EB)',
          color: 'var(--brand-footer-fg, #111927)',
        }}
      >
        <Icon className="h-4 w-4" />
      </a>
    ))}
  </div>
);

const AllegroFooterInner = ({ brandLogo }: { brandLogo?: ImageField }): JSX.Element => {
  const hasImage = brandLogo?.value?.src;

  return (
    <footer
      className="w-full border-t-2 py-8"
      style={{
        backgroundColor: 'var(--brand-footer-bg, #F3F4F6)',
        color: 'var(--brand-footer-fg, #111927)',
        borderColor: 'var(--brand-muted-fg, #5A6573)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className="flex flex-col justify-between gap-4 border-b pb-4 md:flex-row md:items-center"
          style={{ borderColor: 'var(--brand-border, #E5E7EB)' }}
        >
          <Link href="/" className="flex items-center" aria-label="Allegro MicroSystems homepage">
            {hasImage ? (
              <ContentSdkImage field={brandLogo} className="h-8 w-auto object-contain sm:h-9" />
            ) : (
              <span className="text-xl font-bold tracking-tight font-[var(--brand-heading-font,inherit)]">
                ALLEGRO
              </span>
            )}
          </Link>
          <AllegroSocial />
        </div>

        <div className="grid gap-8 py-6 md:grid-cols-5 md:gap-8">
          <div className="grid gap-6 sm:grid-cols-2 md:col-span-3 md:grid-cols-4">
            {ALLEGRO_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3 text-base font-semibold font-[var(--brand-heading-font,inherit)]">
                  <a href={col.href} className="hover:underline">
                    {col.title}
                  </a>
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm opacity-80 transition-opacity hover:underline hover:opacity-100 font-[var(--brand-body-font,inherit)]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="md:border-l md:pl-4"
            style={{ borderColor: 'var(--brand-border, #E5E7EB)' }}
          >
            <h3 className="mb-3 text-base font-semibold font-[var(--brand-heading-font,inherit)]">
              <a
                href="https://investors.allegromicro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Investors
              </a>
            </h3>
          </div>

          <div
            className="md:border-l md:pl-4"
            style={{ borderColor: 'var(--brand-border, #E5E7EB)' }}
          >
            <h3 className="mb-4 text-base font-semibold font-[var(--brand-heading-font,inherit)]">
              Newsletter
            </h3>
            <p className="mb-4 text-sm leading-6 opacity-80 font-[var(--brand-body-font,inherit)]">
              Subscribe to our highlights to stay up to date with our latest products and services
            </p>
            <a
              href="https://go.allegromicro.com/newsletter-signup-algm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] hover:opacity-80"
              style={{ color: 'var(--brand-primary)' }}
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div
          className="flex flex-col gap-3 border-t pt-4 text-sm sm:flex-row sm:flex-wrap sm:items-center"
          style={{ borderColor: 'var(--brand-border, #E5E7EB)' }}
        >
          <p className="opacity-80">
            © {new Date().getFullYear()} Allegro MicroSystems, Inc. All Rights Reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {ALLEGRO_LEGAL.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="opacity-80 hover:underline hover:opacity-100">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

/* ────────────────────────────────────────────
   Default — Allegro homepage footer (color logo, live columns)
   The footer partial still uses FieldNames=Default, so this is the
   layout that renders on localhost.
   ──────────────────────────────────────────── */
export const Default = (props: SiteFooterProps): JSX.Element => {
  const { params } = props;
  const { styles, RenderingIdentifier } = params;
  const brandLogo = getBrandLogo(props);

  if (!params) return <SiteFooterDefaultComponent />;

  return (
    <div className={cn('component site-footer', styles)} id={RenderingIdentifier}>
      <AllegroFooterInner brandLogo={brandLogo} />
    </div>
  );
};

/* ────────────────────────────────────────────
   Minimal — single row
   ──────────────────────────────────────────── */
export const Minimal = (props: SiteFooterProps): JSX.Element => {
  const { params } = props;
  const { styles, RenderingIdentifier } = params;
  const brandLogo = getBrandLogo(props);

  if (!params) return <SiteFooterDefaultComponent />;

  return (
    <div className={cn('component site-footer', styles)} id={RenderingIdentifier}>
      <footer
        className="w-full"
        style={{
          backgroundColor: 'var(--brand-footer-bg, #111111)',
          color: 'var(--brand-footer-fg, #ffffff)',
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
          <Logo brandLogo={brandLogo} invert />
          <nav className="flex flex-wrap items-center gap-6 text-sm opacity-60">
            {['About', 'Products', 'Blog', 'Contact', 'Privacy'].map((link) => (
              <a
                key={link}
                href="#"
                className="transition-opacity hover:opacity-100 font-[var(--brand-body-font,inherit)]"
              >
                {link}
              </a>
            ))}
          </nav>
          <Copyright />
        </div>
      </footer>
    </div>
  );
};

/* ────────────────────────────────────────────
   MegaFooter — expanded with newsletter
   ──────────────────────────────────────────── */
export const MegaFooter = (props: SiteFooterProps): JSX.Element => {
  const { params } = props;
  const { styles, RenderingIdentifier } = params;
  const brandLogo = getBrandLogo(props);

  if (!params) return <SiteFooterDefaultComponent />;

  const extraColumns = [
    {
      title: 'Resources',
      links: ['Webinars', 'Case Studies', 'White Papers', 'API Docs'],
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
    },
  ];

  return (
    <div className={cn('component site-footer', styles)} id={RenderingIdentifier}>
      <footer
        className="w-full"
        style={{
          backgroundColor: 'var(--brand-footer-bg, #111111)',
          color: 'var(--brand-footer-fg, #ffffff)',
        }}
      >
        {/* Newsletter bar */}
        <div
          className="border-b"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
            <div>
              <h3 className="text-lg font-semibold font-[var(--brand-heading-font,inherit)]">
                Subscribe to our newsletter
              </h3>
              <p className="mt-1 text-sm opacity-60 font-[var(--brand-body-font,inherit)]">
                Get the latest updates delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-[var(--brand-button-radius,0.375rem)] border px-4 py-2 text-sm"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: 'var(--brand-footer-fg, #ffffff)',
                }}
              />
              <button
                type="button"
                className="shrink-0 rounded-[var(--brand-button-radius,0.375rem)] px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: 'var(--brand-primary)',
                  color: 'var(--brand-primary-foreground)',
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-6">
            <div className="md:col-span-2 space-y-4">
              <Logo brandLogo={brandLogo} invert />
              <p className="max-w-xs text-sm opacity-60 font-[var(--brand-body-font,inherit)]">
                Building the future of digital experiences. Trusted by teams worldwide.
              </p>
              <SocialIcons />
            </div>

            {LINK_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-70 font-[var(--brand-heading-font,inherit)]">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm opacity-60 transition-opacity hover:opacity-100 font-[var(--brand-body-font,inherit)]">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {extraColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-70 font-[var(--brand-heading-font,inherit)]">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm opacity-60 transition-opacity hover:opacity-100 font-[var(--brand-body-font,inherit)]">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <Copyright />
            <div className="flex gap-6 text-sm opacity-50">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ────────────────────────────────────────────
   Allegro — light gray mega footer matching allegromicro.com
   ──────────────────────────────────────────── */
export const Allegro = (props: SiteFooterProps): JSX.Element => {
  const { params } = props;
  const { styles, RenderingIdentifier } = params;
  const brandLogo = getBrandLogo(props);

  if (!params) return <SiteFooterDefaultComponent />;

  return (
    <div className={cn('component site-footer', styles)} id={RenderingIdentifier}>
      <AllegroFooterInner brandLogo={brandLogo} />
    </div>
  );
};
