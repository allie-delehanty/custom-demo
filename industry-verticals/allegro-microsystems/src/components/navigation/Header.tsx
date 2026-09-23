'use client';

import { AppPlaceholder, ComponentMap, ImageField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX } from 'react';

export type HeaderProps = ComponentProps & {
  fields: {
    LogoImage: ImageField;
  };
  componentMap: ComponentMap;
};

const NAV_LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'Applications', href: '/applications' },
  { label: 'Design Support', href: '/design-support' },
  { label: 'Resources', href: '/resources' },
  { label: 'About Allegro', href: '/about-allegro' },
  { label: 'Investors', href: '/investors' },
];

const HeaderLogo = ({ field }: { field?: ImageField }): JSX.Element | null => {
  const src = field?.value?.src;
  if (!src) {
    return null;
  }

  return (
    <a href="/" className="allegro-header-logo">
      <img src={src} alt={field?.value?.alt?.toString() || 'Allegro MicroSystems'} height={36} />
    </a>
  );
};

const GlobeIcon = (): JSX.Element => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 12h18M12 3c2.8 2.4 4.2 5.6 4.2 9s-1.4 6.6-4.2 9c-2.8-2.4-4.2-5.6-4.2-9S9.2 5.4 12 3z" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const SearchIcon = (): JSX.Element => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M16 16l4.2 4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const AccountIcon = (): JSX.Element => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M5.5 19.2c1.2-3 3.5-4.4 6.5-4.4s5.3 1.4 6.5 4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const CartIcon = (): JSX.Element => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 6h2.1l1.2 11h11.4l1.6-8H7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="10" cy="19.2" r="1.2" fill="currentColor" />
    <circle cx="17" cy="19.2" r="1.2" fill="currentColor" />
  </svg>
);

const AllegroHeaderBar = ({
  props,
  showEditingPlaceholders,
}: {
  props: HeaderProps;
  showEditingPlaceholders?: boolean;
}): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const sxaStyles = `${props.params?.styles || ''}`;
  const logo = props.fields?.LogoImage;

  return (
    <div className={`component header allegro-header ${sxaStyles}`} id={id ? id : undefined}>
      <div className="allegro-header-inner">
        <HeaderLogo field={logo} />
        {!logo?.value?.src && showEditingPlaceholders && (
          <AppPlaceholder
            name="header-left"
            rendering={props.rendering}
            page={page}
            componentMap={props.componentMap}
          />
        )}
        <nav className="allegro-header-nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="allegro-header-utils">
          <button type="button" className="allegro-header-lang" aria-label="Language">
            <GlobeIcon />
            <span>EN</span>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          <button type="button" className="allegro-header-icon" aria-label="Search">
            <SearchIcon />
          </button>
          <button type="button" className="allegro-header-icon" aria-label="Account">
            <AccountIcon />
          </button>
          <button type="button" className="allegro-header-icon" aria-label="Cart">
            <CartIcon />
          </button>
        </div>
      </div>
      {showEditingPlaceholders && (
        <div className="d-none">
          <AppPlaceholder
            name="header-right"
            rendering={props.rendering}
            page={page}
            componentMap={props.componentMap}
          />
        </div>
      )}
    </div>
  );
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { page } = useSitecore();
  return <AllegroHeaderBar props={props} showEditingPlaceholders={page.mode.isEditing} />;
};

export const WithLogoImage = (props: HeaderProps): JSX.Element => {
  const { page } = useSitecore();
  return <AllegroHeaderBar props={props} showEditingPlaceholders={page.mode.isEditing} />;
};

export const Allegro = (props: HeaderProps): JSX.Element => {
  const { page } = useSitecore();
  return <AllegroHeaderBar props={props} showEditingPlaceholders={page.mode.isEditing} />;
};
