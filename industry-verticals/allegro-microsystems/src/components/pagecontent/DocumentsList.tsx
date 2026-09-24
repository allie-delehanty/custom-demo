'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Link,
  Text,
  useSitecore,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import useVisibility from 'src/hooks/useVisibility';

interface Fields {
  Title1: Field<string>;
  Subtitle1: Field<string>;
  Image1: ImageField;
  Link1: LinkField;
  Subtitle2: Field<string>;
  Image2: ImageField;
  Link2: LinkField;
  Subtitle3: Field<string>;
  Image3: ImageField;
  Link3: LinkField;
  Subtitle4: Field<string>;
  Image4: ImageField;
  Link4: LinkField;
}

export type DocumentsListProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: DocumentsListProps): JSX.Element => {
  return <Allegro {...props} />;
};

const DocumentItem = ({
  image,
  subtitle,
  link,
  delay,
  isPageEditing,
}: {
  image: ImageField;
  subtitle: Field<string>;
  link: LinkField;
  delay?: number;
  isPageEditing: boolean;
}): JSX.Element => {
  const [isVisible, domRef] = useVisibility(delay);
  return (
    <div
      className={`col  ${!isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''}`}
      ref={domRef}
    >
      <div className="item">
        <NextImage field={image} width={30} height={40} />
        <div className="text-container">
          <Link field={link} />
          <span className="subtitle">
            <Text field={subtitle} />
          </span>
        </div>
      </div>
    </div>
  );
};

export const Financial = (props: DocumentsListProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component component-spaced documents-list ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="title display-6">
          <Text field={props.fields?.Title1} />
        </div>
        <div className="documents-container">
          <div className="row row-cols-1 row-cols-xl-2 gx-4 justify-content-center">
            <DocumentItem
              image={props.fields?.Image1}
              subtitle={props.fields?.Subtitle1}
              link={props.fields?.Link1}
              delay={0}
              isPageEditing={isPageEditing}
            />
            <DocumentItem
              image={props.fields?.Image2}
              subtitle={props.fields?.Subtitle2}
              link={props.fields?.Link2}
              delay={500}
              isPageEditing={isPageEditing}
            />
            <DocumentItem
              image={props.fields?.Image3}
              subtitle={props.fields?.Subtitle3}
              link={props.fields?.Link3}
              delay={1000}
              isPageEditing={isPageEditing}
            />
            <DocumentItem
              image={props.fields?.Image4}
              subtitle={props.fields?.Subtitle4}
              link={props.fields?.Link4}
              delay={1500}
              isPageEditing={isPageEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AllegroDocumentItem = ({
  image,
  subtitle,
  link,
  isPageEditing,
}: {
  image: ImageField;
  subtitle: Field<string>;
  link: LinkField;
  isPageEditing: boolean;
}): JSX.Element | null => {
  const href = link?.value?.href;
  const text = link?.value?.text;
  if (!isPageEditing && !href && !text && !subtitle?.value) {
    return null;
  }

  return (
    <div className="allegro-documents-item">
      <NextImage field={image} width={28} height={36} />
      <div className="allegro-documents-copy">
        <Link field={link} />
        {(subtitle?.value || isPageEditing) && (
          <span className="allegro-documents-subtitle">
            <Text field={subtitle} />
          </span>
        )}
      </div>
    </div>
  );
};

const AllegroDocuments = ({
  props,
  layout,
}: {
  props: DocumentsListProps;
  layout: 'list' | 'grid';
}): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const layoutClass = layout === 'grid' ? 'allegro-documents-grid' : '';

  return (
    <div
      className={`component documents-list allegro-documents ${layoutClass} ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        {(props.fields?.Title1?.value || isPageEditing) && (
          <h2 className="allegro-documents-title">
            <Text field={props.fields?.Title1} />
          </h2>
        )}
        <div className="allegro-documents-list">
          <AllegroDocumentItem
            image={props.fields?.Image1}
            subtitle={props.fields?.Subtitle1}
            link={props.fields?.Link1}
            isPageEditing={isPageEditing}
          />
          <AllegroDocumentItem
            image={props.fields?.Image2}
            subtitle={props.fields?.Subtitle2}
            link={props.fields?.Link2}
            isPageEditing={isPageEditing}
          />
          <AllegroDocumentItem
            image={props.fields?.Image3}
            subtitle={props.fields?.Subtitle3}
            link={props.fields?.Link3}
            isPageEditing={isPageEditing}
          />
          <AllegroDocumentItem
            image={props.fields?.Image4}
            subtitle={props.fields?.Subtitle4}
            link={props.fields?.Link4}
            isPageEditing={isPageEditing}
          />
        </div>
      </div>
    </div>
  );
};

export const Allegro = (props: DocumentsListProps): JSX.Element => (
  <AllegroDocuments props={props} layout="list" />
);

export const Grid = (props: DocumentsListProps): JSX.Element => (
  <AllegroDocuments props={props} layout="grid" />
);
