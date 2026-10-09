'use client';

import { JSX, useState } from 'react';
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

type FooterLink = string | { label: string; href?: string; icon?: string };

const FOOTER_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Outages',
    links: ['Report & Track Service Problems', 'View Outage Map', 'File a Claim'],
  },
  {
    title: 'Safety',
    links: ['Gas Safety', 'Electric Safety', 'Steam Safety', 'Carbon Monoxide Safety', 'Beware of Scammers'],
  },
  {
    title: 'About Us',
    links: [
      'Company Information',
      'How We Source Our Energy',
      'News & Media Center',
      'Company Culture & Environment',
      'Sustainability Report',
      'Regulatory Guidance & Oversight',
      'Retirees',
      'Careers',
    ],
  },
  {
    title: 'Community Affairs',
    links: [
      'Community Partnerships',
      'Community Outreach and Updates',
      'Teachers & Students',
      'Our Outage Recovery Plan',
      'Resources for Municipalities',
      'Former Manufactured Gas Plants',
    ],
  },
  { title: 'Contact Us', links: ['Contact Us', 'FAQs'] },
  {
    title: 'Renters and Homeowners',
    links: [
      'Tips & Tools for Lowering Your Energy Bill',
      'Savings for Renters and Homeowners',
      'SmartCharge NY',
      'Request Past Energy Bills & Data',
      'Building & Remodeling Project Center',
    ],
  },
  {
    title: 'Multifamily Building Managers',
    links: [
      'Savings for Multifamily Building Managers',
      'Incentives for Installing & Operating Electric Vehicle Chargers',
      'Download & Share Your Data',
      'Leave on for Landlord',
      'Building & Remodeling Project Center',
      'Building Energy Usage Portal',
    ],
  },
  {
    title: 'Small Business & Nonprofit',
    links: [
      'Savings for Small Business & Nonprofits',
      'Incentives for Installing & Operating Electric Vehicle Chargers',
      'Supplier Enablement, Engagement, and Development (SEED)',
      'Download & Share Your Data',
      'Leave on for Landlord',
      'Building & Remodeling Project Center',
    ],
  },
  {
    title: 'Commercial & Industrial',
    links: [
      'Savings for Business Customers',
      'Incentives for Installing & Operating Electric Vehicle Chargers',
      'Steam Service',
      'Building Energy Usage History & Share Your Data',
      'Leave on for Landlord',
      'Building & Remodeling Project Center',
    ],
  },
  {
    title: 'Business Partners',
    links: [
      'Energy Service Company Partner',
      'Access Customer Data',
      'Vendor Services',
      'Telecom Application Management (TeAM)',
      'Transmission Planning',
      'Hosting Capacity',
      'Business Opportunities',
      'Clean Energy Professional Resources',
    ],
  },
  { title: 'Investors', links: ['Annual Reports', 'SEC Filing', 'Financial Press Releases', 'Stock Quotes'] },
  { title: 'Rates & Tariffs', links: ['Rates & Tariffs'] },
  {
    title: 'Social',
    links: [
      { label: 'Facebook', href: 'https://www.facebook.com/ConEdison', icon: '\uE927' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/con-edison', icon: '\uE938' },
      { label: 'X', href: 'https://x.com/conedison', icon: '\uE968' },
      { label: 'Youtube', href: 'http://www.youtube.com/conedisonny', icon: '\uE96D' },
      { label: 'Instagram', href: 'https://www.instagram.com/conedison/', icon: '\uE9A8' },
    ],
  },
];

const ConedFooter = (): JSX.Element => {
  const [openColumn, setOpenColumn] = useState<string | null>(null);

  return (
  <div className="coned-footer">
    <div className="coned-footer-primary">
      {FOOTER_COLUMNS.map((column) => {
        const isOpen = openColumn === column.title;

        return (
        <section key={column.title} className={`coned-footer-col${isOpen ? ' is-open' : ''}`}>
          <button
            type="button"
            className="coned-footer-toggle"
            aria-expanded={isOpen}
            onClick={() => setOpenColumn(isOpen ? null : column.title)}
          >
            {column.title}
          </button>
          <h2 className="coned-footer-heading">{column.title}</h2>
          <ul className="coned-footer-links">
            {column.links.map((entry) => {
              const link = typeof entry === 'string' ? { label: entry, href: 'https://www.coned.com/en' } : entry;

              return (
                <li key={link.label}>
                  <a href={link.href || 'https://www.coned.com/en'} className={link.icon ? 'coned-footer-social' : undefined}>
                    {link.icon && (
                      <span className="coned-footer-social-icon" aria-hidden="true">
                        {link.icon}
                      </span>
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
        );
      })}
    </div>
    <div className="coned-footer-secondary">
      <nav>
        <a href="https://www.coned.com/en">Corporate Policies & Practices</a>
        <a href="https://www.coned.com/en">Privacy Policy and Notice</a>
        <a href="https://www.coned.com/en">HomeNet</a>
        <a href="https://www.coned.com/en">Share Screen</a>
      </nav>
      <p>© 2016 - 2026 Consolidated Edison Company of New York, Inc. All Rights Reserved.</p>
    </div>
  </div>
  );
};

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

export const Default = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component footer ${sxaStyles}`} id={id ? id : undefined}>
      <ConedFooter />
    </div>
  );
};

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
