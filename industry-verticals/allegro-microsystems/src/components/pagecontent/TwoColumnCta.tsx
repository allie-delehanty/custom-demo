'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  useSitecore,
  Placeholder,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Title1: Field<string>;
  Text1: Field<string>;
  Image1: ImageField;
  Link1: LinkField;
  Title2: Field<string>;
  Text2: Field<string>;
  Image2: ImageField;
  Link2: LinkField;
}

export type TwoColumnCtaProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

const isImageLeftRow = (fields?: Fields): boolean => {
  const titles = `${fields?.Title1?.value || ''} ${fields?.Title2?.value || ''}`;
  return /join our team|newsletter/i.test(titles);
};

const EditorialArrow = (): JSX.Element => (
  <span className="allegro-editorial-arrow" aria-hidden="true">
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
      <path
        d="M1 6h19M15.5 1.5 20.5 6l-5 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const AllegroEditorial = ({
  props,
  imagePosition,
}: {
  props: TwoColumnCtaProps;
  imagePosition: 'left' | 'right';
}): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Tile = ({
    image,
    title,
    text,
    link,
    placeholder,
  }: {
    image: ImageField;
    title: Field<string>;
    text: Field<string>;
    link: LinkField;
    placeholder: string;
  }) => {
    const copy = (
      <div className="allegro-editorial-copy">
        {(isPageEditing || title?.value) && (
          <h3>
            <Text field={title} />
          </h3>
        )}
        {(isPageEditing || text?.value) && (
          <p className="allegro-editorial-text">
            <Text field={text} />
          </p>
        )}
        <EditorialArrow />
      </div>
    );

    const media = (
      <div className="allegro-editorial-image">
        <NextImage field={image} width={640} height={400} />
      </div>
    );

    const inner = (
      <article className="allegro-editorial-tile">
        {imagePosition === 'left' ? (
          <>
            {media}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {media}
          </>
        )}
        <Placeholder name={placeholder} rendering={props.rendering} />
      </article>
    );

    return (
      <div className="col-sm-12 col-lg-6">
        {isPageEditing || link?.value?.href ? (
          <Link field={link} className="allegro-editorial-link">
            {inner}
          </Link>
        ) : (
          inner
        )}
      </div>
    );
  };

  return (
    <div
      className={`component two-column-cta allegro-editorial allegro-editorial-${imagePosition} ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row g-4">
          <Tile
            image={props.fields.Image1}
            title={props.fields.Title1}
            text={props.fields.Text1}
            link={props.fields.Link1}
            placeholder="two-col-placeholder-left"
          />
          <Tile
            image={props.fields.Image2}
            title={props.fields.Title2}
            text={props.fields.Text2}
            link={props.fields.Link2}
            placeholder="two-col-placeholder-right"
          />
        </div>
      </div>
    </div>
  );
};

export const ImageRight = (props: TwoColumnCtaProps): JSX.Element => (
  <AllegroEditorial props={props} imagePosition="right" />
);

export const ImageLeft = (props: TwoColumnCtaProps): JSX.Element => (
  <AllegroEditorial props={props} imagePosition="left" />
);

export const Allegro = (props: TwoColumnCtaProps): JSX.Element =>
  isImageLeftRow(props.fields) ? <ImageLeft {...props} /> : <ImageRight {...props} />;

export const Default = (props: TwoColumnCtaProps): JSX.Element => <Allegro {...props} />;
