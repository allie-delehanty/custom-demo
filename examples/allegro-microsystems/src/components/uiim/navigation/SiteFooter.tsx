import React, { JSX } from "react";
import {
  ImageField,
  NextImage as ContentSdkImage,
} from "@sitecore-content-sdk/nextjs";
import Link from "next/link";
import { ComponentProps } from "lib/component-props";
import { cn } from "@/lib/utils";

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
  const fromRendering =
    rendering?.fields?.data?.datasource?.brandLogo?.jsonValue;
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
    title: "Products",
    links: ["Overview", "Features", "Pricing", "Integrations"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact", "Documentation", "Status"],
  },
];

const Logo = ({ brandLogo }: { brandLogo?: ImageField }) => {
  const hasImage = brandLogo?.value?.src;
  return (
    <Link
      href="/"
      className="flex items-center text-xl font-bold tracking-tight"
      style={{ color: "var(--brand-footer-fg, #ffffff)" }}
    >
      {hasImage ? (
        <ContentSdkImage
          field={brandLogo}
          className="h-8 w-auto object-contain brightness-0 invert sm:h-10"
        />
      ) : (
        <>
          <span style={{ color: "var(--brand-primary)" }}>Brand</span>Logo
        </>
      )}
    </Link>
  );
};

const SocialIcons = () => (
  <div className="flex items-center gap-4">
    {["X", "Li", "Fb", "Ig"].map((label) => (
      <a
        key={label}
        href="#"
        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-opacity hover:opacity-70"
        style={{
          backgroundColor: "var(--brand-footer-fg, #ffffff)",
          color: "var(--brand-footer-bg, #111111)",
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
    style={{ color: "var(--brand-footer-fg, #ffffff)" }}
  >
    &copy; {new Date().getFullYear()} BrandName. All rights reserved.
  </p>
);

/* ────────────────────────────────────────────
   Default — multi-column layout
   ──────────────────────────────────────────── */
export const Default = (props: SiteFooterProps): JSX.Element => {
  const { params } = props;
  const { styles, RenderingIdentifier } = params;
  const brandLogo = getBrandLogo(props);

  if (!params) return <SiteFooterDefaultComponent />;

  return (
    <div
      className={cn("component site-footer", styles)}
      id={RenderingIdentifier}
    >
      <footer
        className="w-full"
        style={{
          backgroundColor: "var(--brand-footer-bg, #111111)",
          color: "var(--brand-footer-fg, #ffffff)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <div className="grid gap-8 md:grid-cols-5">
            {/* Logo + description */}
            <div className="md:col-span-2 space-y-4">
              <Logo brandLogo={brandLogo} />
              <p className="max-w-xs text-sm opacity-60 font-[var(--brand-body-font,inherit)]">
                Building the future of digital experiences. Trusted by teams
                worldwide.
              </p>
              <SocialIcons />
            </div>

            {/* Link columns */}
            {LINK_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-70 font-[var(--brand-heading-font,inherit)]">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm opacity-60 transition-opacity hover:opacity-100 font-[var(--brand-body-font,inherit)]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <Copyright />
            <div className="flex gap-6 text-sm opacity-50">
              <a href="#" className="hover:opacity-100 transition-opacity">
                Privacy Policy
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
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
    <div
      className={cn("component site-footer", styles)}
      id={RenderingIdentifier}
    >
      <footer
        className="w-full"
        style={{
          backgroundColor: "var(--brand-footer-bg, #111111)",
          color: "var(--brand-footer-fg, #ffffff)",
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
          <Logo brandLogo={brandLogo} />
          <nav className="flex flex-wrap items-center gap-6 text-sm opacity-60">
            {["About", "Products", "Blog", "Contact", "Privacy"].map((link) => (
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
      title: "Resources",
      links: ["Webinars", "Case Studies", "White Papers", "API Docs"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
    },
  ];

  return (
    <div
      className={cn("component site-footer", styles)}
      id={RenderingIdentifier}
    >
      <footer
        className="w-full"
        style={{
          backgroundColor: "var(--brand-footer-bg, #111111)",
          color: "var(--brand-footer-fg, #ffffff)",
        }}
      >
        {/* Newsletter bar */}
        <div
          className="border-b"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
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
                  backgroundColor: "transparent",
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "var(--brand-footer-fg, #ffffff)",
                }}
              />
              <button
                type="button"
                className="shrink-0 rounded-[var(--brand-button-radius,0.375rem)] px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "var(--brand-primary)",
                  color: "var(--brand-primary-foreground)",
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
              <Logo brandLogo={brandLogo} />
              <p className="max-w-xs text-sm opacity-60 font-[var(--brand-body-font,inherit)]">
                Building the future of digital experiences. Trusted by teams
                worldwide.
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
                      <a
                        href="#"
                        className="text-sm opacity-60 transition-opacity hover:opacity-100 font-[var(--brand-body-font,inherit)]"
                      >
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
                      <a
                        href="#"
                        className="text-sm opacity-60 transition-opacity hover:opacity-100 font-[var(--brand-body-font,inherit)]"
                      >
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
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <Copyright />
            <div className="flex gap-6 text-sm opacity-50">
              <a href="#" className="hover:opacity-100 transition-opacity">
                Privacy Policy
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Terms of Service
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ALLEGRO_FOOTER_COLUMNS = [
  { title: "Products", links: ["Sensors", "Regulators", "Drivers"] },
  {
    title: "Applications",
    links: ["Automotive", "Industrial", "Consumer", "Technologies"],
  },
  {
    title: "Design Support",
    links: [
      "Design and Development",
      "Packaging",
      "Quality and Environment",
      "Software Portal",
    ],
  },
  {
    title: "About Allegro",
    links: [
      "Our Company",
      "Careers",
      "ESG",
      "Growth and Inclusion",
      "Contact Us",
    ],
  },
  { title: "Investors", links: [] },
];

const AllegroFooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: string[];
}): JSX.Element => (
  <div>
    <h3 className="mb-3 text-xs font-medium font-[var(--brand-heading-font,inherit)]">
      {title}
    </h3>
    {links.length > 0 && (
      <ul className="space-y-2">
        {links.map((label) => (
          <li key={label}>
            <a
              href="#"
              className="text-[11px] leading-4 transition-opacity hover:opacity-60 font-[var(--brand-body-font,inherit)]"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    )}
  </div>
);

/* AllegroMegaFooter variant — light mega footer with mobile accordion groups */
export const AllegroMegaFooter = (props: SiteFooterProps): JSX.Element => {
  const { params } = props;
  if (!params) return <SiteFooterDefaultComponent />;

  const { styles, RenderingIdentifier } = params;
  const brandLogo = getBrandLogo(props);

  return (
    <div
      className={cn("component site-footer", styles)}
      id={RenderingIdentifier}
    >
      <footer
        className="w-full border-t"
        style={{
          backgroundColor: "var(--brand-footer-bg)",
          color: "var(--brand-footer-fg)",
          borderColor: "var(--brand-border)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-8 md:py-10">
          <div className="mb-6 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center">
              {brandLogo?.value?.src ? (
                <ContentSdkImage
                  field={brandLogo}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <span className="font-semibold font-[var(--brand-heading-font,inherit)]">
                  Allegro MicroSystems
                </span>
              )}
            </Link>
            <div
              className="flex items-center gap-4 text-xs"
              aria-label="Social links"
            >
              {["F", "X", "Li", "Yt", "Mail"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="transition-opacity hover:opacity-60"
                  aria-label={label}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden grid-cols-6 gap-6 md:grid">
            {ALLEGRO_FOOTER_COLUMNS.map((column) => (
              <AllegroFooterColumn key={column.title} {...column} />
            ))}
            <div
              className="border-l pl-6"
              style={{ borderColor: "var(--brand-border)" }}
            >
              <h3 className="text-xs font-medium font-[var(--brand-heading-font,inherit)]">
                Newsletter
              </h3>
              <p className="mt-3 text-[11px] leading-4 font-[var(--brand-body-font,inherit)]">
                Subscribe to our highlights to stay up to date with our latest
                products and services
              </p>
              <a
                href="https://go.allegromicro.com/newsletter-signup-algm"
                className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
              >
                Subscribe <span aria-hidden="true">⊕</span>
              </a>
            </div>
          </div>

          <div
            className="divide-y md:hidden"
            style={{ borderColor: "var(--brand-border)" }}
          >
            {ALLEGRO_FOOTER_COLUMNS.map((column) => (
              <details key={column.title} className="group py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                  {column.title}
                  <span aria-hidden="true" className="group-open:rotate-45">
                    +
                  </span>
                </summary>
                {column.links.length > 0 && (
                  <ul className="space-y-2 pt-3">
                    {column.links.map((label) => (
                      <li key={label}>
                        <a href="#" className="text-xs">
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </details>
            ))}
            <details className="group py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                Newsletter
                <span aria-hidden="true" className="group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pt-3 text-xs leading-5">
                Subscribe to our highlights to stay up to date with our latest
                products and services
              </p>
              <a
                href="https://go.allegromicro.com/newsletter-signup-algm"
                className="mt-3 inline-flex text-xs font-semibold uppercase tracking-widest"
              >
                Subscribe
              </a>
            </details>
          </div>

          <div
            className="mt-7 flex flex-col gap-4 border-t pt-5 text-[10px] md:flex-row md:items-center md:justify-between"
            style={{ borderColor: "var(--brand-border)" }}
          >
            <p>© 2026 Allegro MicroSystems, Inc. All Rights Reserved.</p>
            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                "Privacy Notice",
                "Cookie Notice",
                "Legal",
                "UK Modern Slavery Act",
              ].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="transition-opacity hover:opacity-60"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};
