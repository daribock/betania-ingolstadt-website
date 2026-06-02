import { iconSchema } from '@/tina/fields/icon';
import Link from 'next/link';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import {
  PageBlocksHero,
  PageBlocksHeroImage,
} from '../../tina/__generated__/types';
import { Icon } from '../icon';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { Button } from '../ui/button';

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  return (
    <Section
      fullWidth
      background={data.background!}
      id="home"
      className="relative h-screen overflow-hidden"
    >
      {data.image && <ImageBlock image={data.image} />}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <div className="max-w-4xl px-4">
          {data.headline && (
            <h1
              data-tina-field={tinaField(data, 'headline')}
              className="mt-8 text-balance text-6xl md:text-7xl xl:text-[5.25rem]"
            >
              {data.headline}
            </h1>
          )}

          {data.tagline && (
            <p
              data-tina-field={tinaField(data, 'tagline')}
              className="mx-auto mt-8 max-w-2xl text-balance text-lg"
            >
              {data.tagline}
            </p>
          )}

          {data.actions && (
            <ul className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              {data.actions.map((action) => (
                <li key={action!.label} data-tina-field={tinaField(action)}>
                  <Button
                    asChild
                    size="lg"
                    variant={action!.type === 'link' ? 'secondary' : 'default'}
                    className=" px-5 text-base"
                  >
                    <Link href={action!.link!}>
                      {action?.icon && <Icon data={action?.icon} decorative />}
                      <span className="text-nowrap">{action!.label}</span>
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksHeroImage }) => {
  if (!image.src) return null;

  return (
    <div className="absolute inset-0">
      <Image
        src={image.src}
        alt={image.alt || 'Hero background'}
        fill
        className="object-cover object-center"
        priority
        quality={75}
        sizes="100vw"
      />
    </div>
  );
};

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: 'This Big Text is Totally Awesome',
      text: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Headline',
      name: 'headline',
    },
    {
      type: 'string',
      label: 'Tagline',
      name: 'tagline',
    },
    {
      label: 'Actions',
      name: 'actions',
      type: 'object',
      list: true,
      ui: {
        defaultItem: {
          label: 'Action Label',
          type: 'button',
          icon: true,
          link: '/',
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: 'Label',
          name: 'label',
          type: 'string',
        },
        {
          label: 'Type',
          name: 'type',
          type: 'string',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
          ],
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        iconSchema as any,
        {
          label: 'Link',
          name: 'link',
          type: 'string',
        },
      ],
    },
    {
      type: 'object',
      label: 'Image',
      name: 'image',
      fields: [
        {
          name: 'src',
          label: 'Image Source',
          type: 'image',
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'string',
          description:
            'Describe the image for screen readers. Leave empty only if the image is decorative.',
          ui: {
            validate: (value: string) => {
              const trimmed = value?.trim() || '';
              if (!trimmed) {
                return undefined;
              }

              const generic = /^(hero|background|image|photo|picture)$/i;
              if (generic.test(trimmed)) {
                return 'Use descriptive alt text, not generic words like "image" or "background".';
              }

              return undefined;
            },
          },
        },
      ],
    },
  ],
};
