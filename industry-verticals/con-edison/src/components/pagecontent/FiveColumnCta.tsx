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

const ACTION_ICONS: Record<string, string> = {
  bill: '\uE92C',
  person: '\uE93B',
  plus: '\uE944',
  bolt: '\uE923',
  dollar: '\uE93D',
  savings: '\uE922',
};

interface Fields {
  Text1: Field<string>;
  Image1: ImageField;
  Link1: LinkField;
  Text2: Field<string>;
  Image2: ImageField;
  Link2: LinkField;
  Text3: Field<string>;
  Image3: ImageField;
  Link3: LinkField;
  Text4: Field<string>;
  Image4: ImageField;
  Link4: LinkField;
  Text5: Field<string>;
  Image5: ImageField;
  Link5: LinkField;
}

export type FiveColumnCtaProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FiveColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    image,
    text,
    link,
    delay,
  }: {
    image: ImageField;
    text: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    return (
      <div
        className={`col ${!isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''} `}
        ref={domRef}
      >
        <Link field={link}>
          <div className="image-container">
            <NextImage field={image} className="d-block w-100 h-100" width={200} height={200} />
          </div>
        </Link>
        <div className="text-container">
          <Text field={text} />
        </div>
      </div>
    );
  };

  if (!isPageEditing) {
    const actions: { text: Field<string>; link?: LinkField; href?: string; tone: string; icon: string }[] = [
      { text: props.fields.Text1, link: props.fields.Link1, tone: 'blue', icon: 'bill' },
      { text: props.fields.Text2, link: props.fields.Link2, tone: 'blue', icon: 'person' },
      { text: props.fields.Text3, link: props.fields.Link3, tone: 'blue', icon: 'plus' },
      { text: props.fields.Text4, link: props.fields.Link4, tone: 'white', icon: 'bolt' },
      { text: props.fields.Text5, link: props.fields.Link5, tone: 'white', icon: 'dollar' },
      {
        text: { value: 'Explore More Bill Help Options' },
        href: 'https://www.coned.com/en/accounts-billing/bill-history-assistance',
        tone: 'white',
        icon: 'savings',
      },
    ];

    return (
      <div className={`component five-column-cta ${sxaStyles}`} id={id ? id : undefined}>
        <div className="coned-actions">
          {actions.map((action) => (
            <div key={action.icon} className={`coned-action coned-action--${action.tone}`}>
              {action.link ? (
                <Link field={action.link}>
                  <span className="coned-action-icon" aria-hidden="true">
                    {ACTION_ICONS[action.icon]}
                  </span>
                  <span className="coned-action-label">
                    <Text field={action.text} />
                  </span>
                </Link>
              ) : (
                <a href={action.href}>
                  <span className="coned-action-icon" aria-hidden="true">
                    {ACTION_ICONS[action.icon]}
                  </span>
                  <span className="coned-action-label">
                    <Text field={action.text} />
                  </span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`component component-spaced five-column-cta ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 row-gap-3 gx-5 justify-content-center">
          <Column image={props.fields.Image1} text={props.fields.Text1} link={props.fields.Link1} />
          <Column
            image={props.fields.Image2}
            text={props.fields.Text2}
            link={props.fields.Link2}
            delay={500}
          />
          <Column
            image={props.fields.Image3}
            text={props.fields.Text3}
            link={props.fields.Link3}
            delay={1000}
          />
          <Column
            image={props.fields.Image4}
            text={props.fields.Text4}
            link={props.fields.Link4}
            delay={1500}
          />
          <Column
            image={props.fields.Image5}
            text={props.fields.Text5}
            link={props.fields.Link5}
            delay={2000}
          />
        </div>
      </div>
    </div>
  );
};
