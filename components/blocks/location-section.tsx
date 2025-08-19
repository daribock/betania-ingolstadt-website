import type { Template } from 'tinacms';
import { PageBlocksLocation } from '@/tina/__generated__/types';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLayout } from '../layout/layout-context';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { Typography } from '../ui/Typography';

export const LocationSection = ({ data }: { data: PageBlocksLocation }) => {
  const contactT = useTranslations('Contact');
  const { globalSettings } = useLayout();
  const { services, contact } = globalSettings!;

  console.log(data.Image);

  if (!contact) {
    return null;
  }

  return (
    <Section id="visit">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Typography>
            <h2 data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
          </Typography>
          <div className="space-y-4 mt-8">
            {contact.street && contact.number && contact.ort && (
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <Typography size="sm">
                  <h3 className="!m-0">{contactT('Address')}</h3>
                  <div data-tina-field={tinaField(globalSettings, 'contact')}>
                    <Link
                      href="https://maps.app.goo.gl/w3A3ZUWggsQTQzJb7"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.street} {contact.number}
                      <br />
                      {contact.ort}
                      {/* TODO: Should we add this? <br />
                      Deutschland */}
                    </Link>
                  </div>
                </Typography>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-start space-x-3">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <Typography size="sm">
                  <h3 className="!m-0">{contactT('Telefon')}</h3>

                  <Link
                    href={`tel:${contact.phone}`}
                    className=" transition-colors"
                  >
                    {contact.phone}
                  </Link>
                </Typography>
              </div>
            )}
            {contact.email && (
              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <Typography size="sm">
                  <h3 className="!m-0">{contactT('Email')}</h3>
                  <Link
                    href={`mailto:${contact.email}`}
                    className=" transition-colors"
                  >
                    {contact.email}
                  </Link>
                </Typography>
              </div>
            )}
          </div>
          {services && (
            <div className="space-y-2 mt-8">
              <Typography size="sm">
                <h3 className="!m-0 text-xl ">{contactT('Services')}</h3>
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
              alt="Karte zu Betania Ingolstadt"
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
    previewSrc: '/blocks/cta.png',
    defaultItem: {
      title: 'Besuchen Sie uns',
    },
  },
  fields: [
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
  ],
};
