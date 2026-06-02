import type { Template } from 'tinacms';
import { PageBlocksLocation } from '@/tina/__generated__/types';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLayout } from '../layout/layout-context';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { Typography } from '../ui/Typography';

export const LocationSection = ({ data }: { data: PageBlocksLocation }) => {
  const contactT = useTranslations('Contact');
  const { globalSettings } = useLayout();
  const { services, contact } = globalSettings!;
  const imageAlt = (data as PageBlocksLocation & { imageAlt?: string }).imageAlt;

  if (!contact) {
    return null;
  }

  return (
    <Section background={data.background || undefined} id="visit">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Typography>
            <h2 data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
          </Typography>
          <ul className="space-y-4 mt-8">
            {contact.street && contact.number && contact.ort && (
              <li className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-primary mt-1" aria-hidden="true" />
                <Typography size="sm">
                  <h3 className="m-0!">{contactT('Address')}</h3>
                  <div data-tina-field={tinaField(globalSettings, 'contact')}>
                    <Link
                      href="https://maps.app.goo.gl/w3A3ZUWggsQTQzJb7"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${contactT('Address')} (opens in a new tab)`}
                    >
                      {contact.street} {contact.number}
                      <br />
                      {contact.ort}
                      {/* TODO: Should we add this? <br />
                      Deutschland */}
                    </Link>
                  </div>
                </Typography>
              </li>
            )}
            {contact.phone && (
              <li className="flex items-start space-x-3">
                <Phone className="h-6 w-6 text-primary mt-1" aria-hidden="true" />
                <Typography size="sm">
                  <h3 className="m-0!">{contactT('Telefon')}</h3>

                  <Link
                    href={`tel:${contact.phone}`}
                    className=" transition-colors"
                  >
                    {contact.phone}
                  </Link>
                </Typography>
              </li>
            )}
            {contact.email && (
              <li className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-primary mt-1" aria-hidden="true" />
                <Typography size="sm">
                  <h3 className="m-0!">{contactT('Email')}</h3>
                  <Link
                    href={`mailto:${contact.email}`}
                    className=" transition-colors"
                  >
                    {contact.email}
                  </Link>
                </Typography>
              </li>
            )}
          </ul>
          {services && (
            <div className="space-y-2 mt-8">
              <Typography size="sm">
                <h3 className="m-0! text-xl">{contactT('Services')}</h3>
              </Typography>
              <ul className="">
                {services?.map((service, index: number) => (
                  <li key={index}>{service?.time}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {data.Image && (
          <div
            className="bg-gray-200 rounded-lg overflow-hidden h-96"
            data-tina-field={tinaField(data, 'Image')}
          >
            <Image
              src={data.Image}
              alt={imageAlt || 'Location map'}
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </Section>
  );
};

export const locationSectionBlockSchema: Template = {
  name: 'location',
  label: 'Location',
  ui: {
    defaultItem: {
      title: 'Besuchen Sie uns',
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      name: 'Image',
      label: 'Image Source',
      type: 'image',
    },
    {
      name: 'imageAlt',
      label: 'Image Alt Text',
      type: 'string',
      description:
        'Describe this image for screen readers. If the image is decorative, leave this empty.',
      ui: {
        validate: (value: string, data: { Image?: string }) => {
          if (!data?.Image) {
            return undefined;
          }

          const trimmed = value?.trim() || '';
          if (!trimmed) {
            return 'Provide alt text when an image is set.';
          }

          const generic = /^(map|image|photo|picture|location map)$/i;
          if (generic.test(trimmed)) {
            return 'Use descriptive alt text instead of generic terms.';
          }

          return undefined;
        },
      },
    },
  ],
};
