'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Link,
  Text,
  RichTextField,
  RichText,
  NextImage,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  Image1: ImageField;
  Title1: Field<string>;
  Text1: RichTextField;
  Title2: Field<string>;
  Text2: RichTextField;
  Title3: Field<string>;
  Text3: RichTextField;
  Title4: Field<string>;
  Text4: RichTextField;
  Copyright: Field<string>;
  Link1: LinkField;
  Link2: LinkField;
  SocialsTitle: Field<string>;
  SocialLink1: LinkField;
  SocialIcon1: ImageField;
  SocialLink2: LinkField;
  SocialIcon2: ImageField;
  SocialLink3: LinkField;
  SocialIcon3: ImageField;
}

export type FooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FOOTER_COLUMNS = [
  {
    title: 'Products',
    href: 'https://www.allegromicro.com/en/products',
    links: [
      { label: 'Sensors', href: 'https://www.allegromicro.com/en/products/sense' },
      { label: 'Regulators', href: 'https://www.allegromicro.com/en/products/regulate' },
      { label: 'Drivers', href: 'https://www.allegromicro.com/en/products/motor-drivers' },
    ],
  },
  {
    title: 'Applications',
    href: 'https://www.allegromicro.com/en/applications',
    links: [
      { label: 'Automotive', href: 'https://www.allegromicro.com/en/applications/automotive' },
      { label: 'Industrial', href: 'https://www.allegromicro.com/en/applications/industrial' },
      { label: 'Consumer', href: 'https://www.allegromicro.com/en/applications/consumer' },
      { label: 'Technologies', href: 'https://www.allegromicro.com/en/insights-and-innovations/allegro-technology' },
    ],
  },
  {
    title: 'Design Support',
    href: 'https://www.allegromicro.com/en/design-support',
    links: [
      { label: 'Design and Development', href: 'https://www.allegromicro.com/en/design-support/design-and-development' },
      { label: 'Packaging', href: 'https://www.allegromicro.com/en/design-support/packaging' },
      { label: 'Quality and Environment', href: 'https://www.allegromicro.com/en/design-support/quality-and-environment' },
      { label: 'Software Portal', href: 'https://registration.allegromicro.com/login' },
    ],
  },
  {
    title: 'About Allegro',
    href: 'https://www.allegromicro.com/en/about-allegro',
    links: [
      { label: 'Our Company', href: 'https://www.allegromicro.com/en/about-allegro' },
      { label: 'Careers', href: 'https://www.allegromicro.com/en/about-allegro/careers' },
      { label: 'ESG', href: 'https://www.allegromicro.com/en/about-allegro/corporate-responsibility' },
      { label: 'Growth and Inclusion', href: 'https://www.allegromicro.com/en/about-allegro/corporate-responsibility/growth-and-inclusion' },
      { label: 'Contact Us', href: 'https://www.allegromicro.com/en/about-allegro/contact-us' },
    ],
  },
  {
    title: 'Investors',
    href: 'https://www.allegromicro.com/en/about-allegro/investor-relations',
    links: [],
  },
];

const LEGAL_LINKS = [
  { label: 'Privacy Notice', href: 'https://www.allegromicro.com/en/privacy-notice' },
  { label: 'Cookie Notice', href: 'https://www.allegromicro.com/en/privacy-notice' },
  { label: 'Legal', href: 'https://www.allegromicro.com/en/about-allegro/legal' },
  { label: 'UK Modern Slavery Act', href: 'https://www.allegromicro.com/en/about-allegro/legal' },
];

const FacebookIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const XIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 4l7.2 8.8L4.6 20H7l5.1-6.1L16.8 20H20l-7.4-9L19.2 4H16.8l-4.7 5.6L7.4 4H4z" fill="currentColor" />
  </svg>
);

const LinkedInIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 10.5V17M8 7.5h.01M12 17v-4c0-1.1.9-2 2-2s2 .9 2 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const YouTubeIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="7" width="18" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 10.5v3l3-1.5-3-1.5z" fill="currentColor" />
  </svg>
);

const AllegroFooterBar = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const logoSrc = props.fields?.Image1?.value?.src;

  return (
    <div className={`component footer allegro-footer ${sxaStyles}`} id={id ? id : undefined}>
      <div className="allegro-footer-inner">
        <div className="allegro-footer-top">
          <a href="/" className="allegro-footer-brand">
            {logoSrc ? (
              <img src={logoSrc} alt="Allegro MicroSystems" height={34} />
            ) : (
              <span>Allegro MicroSystems</span>
            )}
          </a>
          <div className="allegro-footer-socials">
            <a href="https://www.facebook.com/allegromicrosystems" aria-label="Facebook" target="_blank" rel="noreferrer">
              <FacebookIcon />
            </a>
            <a href="https://www.x.com/allegromicro" aria-label="X" target="_blank" rel="noreferrer">
              <XIcon />
            </a>
            <a href="https://www.linkedin.com/company/allegro-microsystems" aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <LinkedInIcon />
            </a>
            <a href="https://www.youtube.com/user/allegromicro" aria-label="YouTube" target="_blank" rel="noreferrer">
              <YouTubeIcon />
            </a>
          </div>
        </div>

        <div className="allegro-footer-grid">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="allegro-footer-col">
              <a className="allegro-footer-heading" href={column.href}>
                {column.title}
              </a>
              {column.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
          <div className="allegro-footer-col allegro-footer-newsletter">
            <div className="allegro-footer-heading">Newsletter</div>
            <p>Subscribe to our highlights to stay up to date with our latest products &amp; services</p>
            <a className="allegro-footer-subscribe" href="https://go.allegromicro.com/newsletter-signup-algm">
              SUBSCRIBE <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="allegro-footer-legal">
          <span>© 2026 Allegro MicroSystems, Inc. All Rights Reserved.</span>
          {LEGAL_LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Default = (props: FooterProps): JSX.Element => <AllegroFooterBar {...props} />;

export const WithSocials = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component component-spaced footer with-socials ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="content">
          <div className="logo">
            <NextImage
              field={props.fields?.Image1}
              width={200}
              height={200}
              className="img-fluid"
              unoptimized
            />
          </div>
          <div className="row row-cols-1 row-cols-md-3 row-gap-5 gx-5">
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.Title1} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text1} />
              </div>
            </div>
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.Title2} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text2} />
              </div>
            </div>
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.SocialsTitle} />
              </div>
              <div className="links links-socials">
                <Link field={props.fields?.SocialLink1}>
                  <NextImage field={props.fields?.SocialIcon1} width={16} height={16} />
                </Link>
                <Link field={props.fields?.SocialLink2}>
                  <NextImage field={props.fields?.SocialIcon2} width={16} height={16} />
                </Link>
                <Link field={props.fields?.SocialLink3}>
                  <NextImage field={props.fields?.SocialIcon3} width={16} height={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footnote">
          <Text field={props.fields?.Copyright} />
          <div className="privacy-links">
            <Link field={props.fields?.Link1} />
            <Link field={props.fields?.Link2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Allegro = (props: FooterProps): JSX.Element => <AllegroFooterBar {...props} />;
