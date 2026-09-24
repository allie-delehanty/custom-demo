'use client';

import { JSX } from 'react';
import { usePathname } from 'next/navigation';
import {
  Field,
  ImageField,
  Placeholder,
  Text,
  RichText,
  RichTextField,
  NextImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { ParallaxBackgroundImage } from 'components/non-sitecore/ParallaxBackgroundImage';
import Head from 'next/head';

interface Fields {
  Title: Field<string>;
  Excerpt: Field<string>;
  Date?: Field<string>;
  Content: RichTextField;
  Thumbnail: ImageField;
  BackgroundImage: ImageField;
  Name: Field<string>;
  Photo: ImageField;
  Position: Field<string>;
}

export type PageBackgroundProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: PageBackgroundProps): JSX.Element => {
  return <Allegro {...props} />;
};

const formatCrumbLabel = (segment: string): string =>
  decodeURIComponent(segment)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const CalendarIcon = (): JSX.Element => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const ShareIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="18" cy="5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="6" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="18" cy="19" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

/* Allegro article — blue hero + 50/50 summary and image, then RTE body */
export const Allegro = (props: PageBackgroundProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const { Title, Excerpt, Date, Content, Thumbnail } = props.fields || {};
  const pathname = usePathname() || '';
  const crumbs = [
    { title: 'Home', href: '/' },
    ...pathname
      .split('/')
      .filter(Boolean)
      .map((segment, index, segments) => ({
        title:
          index === segments.length - 1 && Title?.value
            ? Title.value
            : formatCrumbLabel(segment),
        href: `/${segments.slice(0, index + 1).join('/')}`,
      })),
  ];
  const thumbnailValue = Thumbnail?.value as
    | { src?: string; alt?: string; thumbnailsrc?: string }
    | string
    | undefined;
  const imageSrc =
    typeof thumbnailValue === 'string'
      ? thumbnailValue.match(/src="([^"]+)"/)?.[1] ||
        thumbnailValue.match(/thumbnailsrc="([^"]+)"/)?.[1] ||
        ''
      : thumbnailValue?.src || thumbnailValue?.thumbnailsrc || '';
  const imageAlt =
    typeof thumbnailValue === 'string'
      ? thumbnailValue.match(/alt="([^"]*)"/)?.[1] || Title?.value || ''
      : thumbnailValue?.alt || Title?.value || '';
  const hasImage = Boolean(imageSrc);
  const dateValue = Date?.value?.trim() || '';
  const summaryValue = Excerpt?.value?.trim() || '';

  const handleShare = (): void => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && window.location?.href) {
      navigator.clipboard.writeText(window.location.href).catch(() => undefined);
    }
  };

  return (
    <>
      <Head>
        <meta property="og:description" content={Excerpt?.value} />
        <meta property="og:name" content={Title?.value} />
        <meta property="og:title" content={Title?.value} />
        <meta property="og:image" content={Thumbnail?.value?.src} />
        <meta property="og:type" content="article" />
      </Head>
      <div
        className={`component article-details allegro-article col-12 ${props.params?.styles?.trimEnd() || ''}`}
        id={id ? id : undefined}
      >
        <header className="allegro-article-hero">
          <div className="container">
            {isEditing ? (
              <Placeholder name="page-navigation" rendering={props.rendering} />
            ) : (
              <nav className="allegro-article-breadcrumb" aria-label="breadcrumbs">
                {crumbs.map((crumb, index) => (
                  <span key={crumb.href} className="allegro-article-crumb">
                    {index > 0 && <span className="allegro-article-crumb-sep"> / </span>}
                    {index === crumbs.length - 1 ? (
                      <span>{crumb.title}</span>
                    ) : (
                      <a href={crumb.href}>{crumb.title}</a>
                    )}
                  </span>
                ))}
              </nav>
            )}
            {(Title?.value || isEditing) && (
              <h1 className="allegro-article-title">
                <Text field={Title} />
              </h1>
            )}
            {Date && (dateValue || isEditing) && (
              <p className="allegro-article-date">
                <CalendarIcon />
                <Text field={Date} />
              </p>
            )}
          </div>
        </header>

        <article className="allegro-article-inner">
          <div className="container">
            <div className="allegro-article-summary">
              <div className="allegro-article-summary-copy">
                {(summaryValue || isEditing) && (
                  <p className="allegro-article-lede">
                    <Text field={Excerpt} />
                  </p>
                )}
              </div>
              <div className="allegro-article-summary-media">
                <button type="button" className="allegro-article-share" onClick={handleShare}>
                  <ShareIcon />
                  Share
                </button>
                {(hasImage || isEditing) && (
                  <div className="allegro-article-image-wrap">
                    {hasImage ? (
                      <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="allegro-article-image"
                      />
                    ) : (
                      <NextImage
                        field={Thumbnail}
                        className="allegro-article-image"
                        width={720}
                        height={480}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {(Content?.value || isEditing) && (
              <div className="allegro-article-content">
                <RichText field={Content} className="rich-text" />
              </div>
            )}

            <Placeholder name="background-page-content" rendering={props.rendering} />
            <Placeholder name="page-content" rendering={props.rendering} />
          </div>
        </article>
      </div>
    </>
  );
};

export const Financial = (props: PageBackgroundProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  return (
    <>
      <Head>
        <meta property="og:description" content={props.fields?.Excerpt.value} />
        <meta property="og:name" content={props.fields?.Title?.value} />
        <meta property="og:title" content={props.fields?.Title?.value} />
        <meta property="og:image" content={props.fields?.Thumbnail?.value?.src} />
        <meta property="og:type" content="article" />
      </Head>
      <div
        className={`component article-details page-background spaced-top col-12 ${props.params?.styles?.trimEnd()}`}
        id={id ? id : undefined}
      >
        <ParallaxBackgroundImage BackgroundImage={props.fields.BackgroundImage} />

        <div className="container">
          <Placeholder name="page-navigation" rendering={props.rendering} />
        </div>

        <div>
          <div className="background-content component-spaced container rounded-corners">
            <div className="p-3 p-sm-5">
              <div className="article-content">
                <div className="row row-gap-4 gx-5">
                  <div className="col-12 col-lg-6">
                    <NextImage
                      field={props.fields.Thumbnail}
                      className="article-img img-fluid"
                      width={600}
                      height={400}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="row">
                      <Placeholder name="article-meta" rendering={props.rendering} />
                    </div>
                    <h1 className="article-title">
                      <Text field={props.fields.Title} />
                    </h1>
                    <p className="article-excerpt">
                      <Text field={props.fields.Excerpt} />
                    </p>
                  </div>
                </div>
                <div className="article-content-body mt-5">
                  <RichText field={props.fields.Content} />
                </div>
              </div>
              <div className="row">
                <Placeholder name="background-page-content" rendering={props.rendering} />
              </div>
            </div>
          </div>
          <Placeholder name="page-content" rendering={props.rendering} />
        </div>
      </div>
    </>
  );
};

export const Simple = (props: PageBackgroundProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  return (
    <>
      <Head>
        <meta property="og:description" content={props.fields?.Excerpt.value} />
        <meta property="og:name" content={props.fields?.Title?.value} />
        <meta property="og:title" content={props.fields?.Title?.value} />
        <meta property="og:image" content={props.fields?.Thumbnail?.value?.src} />
        <meta property="og:type" content="article" />
      </Head>
      <div
        className={`component simple-article-details mt-4 ${props.params?.styles?.trimEnd()}`}
        id={id ? id : undefined}
      >
        <div className="container container-wide">
          <h1 className="article-title display-1 fw-bold">
            <Text field={props.fields.Title} />
          </h1>
        </div>
        <div className="container container-widest-fluid">
          <NextImage
            field={props.fields.Thumbnail}
            className="article-img img-fluid"
            width={1650}
            height={750}
          />
        </div>
        <div className="container">
          <div className="article-content">
            <div className="row">
              <div className="col-12 col-lg-6 mx-auto">
                <p className="article-excerpt fs-5">
                  <Text field={props.fields.Excerpt} />
                </p>
                <div className="article-content-body rich-text mt-5">
                  <RichText field={props.fields.Content} />
                </div>
                <div className="row article-meta-row">
                  <Placeholder name="article-meta" rendering={props.rendering} />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <Placeholder name="background-page-content" rendering={props.rendering} />
          </div>
        </div>
        <div className="row">
          <Placeholder name="page-content" rendering={props.rendering} />
        </div>
      </div>
    </>
  );
};
