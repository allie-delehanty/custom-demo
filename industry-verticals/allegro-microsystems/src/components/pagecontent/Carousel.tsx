'use client';

import { useState, JSX } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  RichTextField,
  LinkField,
  Text,
  Link,
  RichText,
  useSitecore,
  NextImage,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Link: LinkField;
  Video: ImageField;
}

export type CarouselItemProps = {
  id: string;
  fields: Fields;
};

interface CarouselComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    items: CarouselItemProps[];
  };
}

export const Default = (props: CarouselComponentProps): JSX.Element => {
  return <Allegro {...props} />;
};

/* Allegro variant — navy split hero, left-aligned copy, outlined pill CTA */
export const Allegro = (props: CarouselComponentProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [index, setIndex] = useState(0);
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const items = props.fields?.items || [];

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
  };

  return (
    <section className={`component carousel allegro-hero ${sxaStyles}`} id={id ? id : undefined}>
      <div className="carousel-inner">
        {items.map((item, i) => (
          <div key={item.id || i} className={'carousel-item ' + (i == index ? 'active' : '')}>
            <div className="allegro-hero-grid">
              <div className="allegro-hero-copy">
                {(isPageEditing || item.fields?.Title?.value) && (
                  <h1>
                    <Text field={item.fields.Title} />
                  </h1>
                )}
                {(isPageEditing || item.fields?.Text?.value) && (
                  <RichText field={item.fields.Text} />
                )}
                {(isPageEditing || item.fields?.Link?.value?.href) && (
                  <Link field={item.fields.Link} className="allegro-hero-cta" />
                )}
              </div>
              <div className="allegro-hero-media">
                {!isPageEditing && item.fields?.Video?.value?.src ? (
                  <video
                    className="object-fit-cover d-block w-100 h-100"
                    key={item.id}
                    autoPlay={true}
                    loop={true}
                    muted
                    playsInline
                    poster={item.fields.Image?.value?.src}
                  >
                    <source src={item.fields.Video.value.src} type="video/webm" />
                  </video>
                ) : (
                  <NextImage
                    field={item.fields.Image}
                    className="object-fit-cover d-block w-100 h-100"
                    width={1920}
                    height={800}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ol className="carousel-indicators">
        {items.map((_item, i) => (
          <li
            key={i}
            aria-label="Slide"
            className={i == index ? 'active' : ''}
            onClick={() => setIndex(i)}
          ></li>
        ))}
      </ol>
      <button className="carousel-control-prev" type="button" onClick={handlePrev}>
        <span className="carousel-control-prev-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 5L8 12l7 7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" onClick={handleNext}>
        <span className="carousel-control-next-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="visually-hidden">Next</span>
      </button>
    </section>
  );
};
