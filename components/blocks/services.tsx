import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';
import { PageBlocksServices } from '@/tina/__generated__/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export const Services = ({ data }: { data: PageBlocksServices }) => {
  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2
            className="text-balance text-4xl font-semibold lg:text-5xl"
            data-tina-field={tinaField(data, 'title')}
          >
            {data.title}
          </h2>
          <p data-tina-field={tinaField(data, 'description')} className="mt-4">
            {data.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {data.services?.map((service, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:shadow-sacred transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="pb-4">
                <CardTitle
                  className="font-display text-2xl text-sacred flex items-center gap-3"
                  data-tina-field={tinaField(service, 'title')}
                >
                  <Clock className="w-6 h-6 text-sacred-gold" />
                  {service?.title}
                </CardTitle>
                <p
                  className="text-sacred-gold font-semibold text-lg"
                  data-tina-field={tinaField(service, 'time')}
                >
                  {service?.time}
                </p>
              </CardHeader>
              <CardContent>
                <p
                  className="text-muted-foreground mb-6 leading-relaxed"
                  data-tina-field={tinaField(service, 'description')}
                >
                  {service?.description}
                </p>
                {service?.features && service.features.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        data-tina-field={tinaField(
                          service,
                          'features',
                          featureIndex
                        )}
                      >
                        <div className="w-2 h-2 bg-sacred-gold rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};

export const servicesBlockSchema: Template = {
  name: 'services',
  label: 'Services',
  ui: {
    // TODO: update this
    previewSrc: '/blocks/stats.png',
    defaultItem: {
      title: 'Unsere Gottesdienste',
      description:
        'Kommen Sie und erleben Sie Gottes Gegenwart in unseren Gottesdiensten. Jeder ist herzlich willkommen!',
      services: [
        {
          title: 'Hauptgottesdienst',
          time: 'Sonntag 10:00 - 12:30 Uhr',
          description:
            'Unser wöchentlicher Hauptgottesdienst mit Anbetung, Predigt und Gemeinschaft für die ganze Familie.',
          features: [
            'Familienfreundlich',
            'Übersetzung verfügbar',
            'Kinder-Programm',
            'Herzliche Atmosphäre',
          ],
        },
        {
          title: 'Gebetsabend',
          time: 'Mittwoch 18:00 - 19:30 Uhr',
          description:
            'Ein intimerer Gottesdienst unter der Woche mit Gebet, Gemeinschaft und biblischer Lehre.',
          features: [
            'Gebetszeit',
            'Biblische Lehre',
            'Persönliche Gespräche',
            'Gemeinschaft',
          ],
        },
      ],
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
      type: 'string',
      label: 'Description',
      name: 'description',
    },
    {
      type: 'object',
      label: 'Services',
      name: 'services',
      list: true,
      ui: {
        defaultItem: {
          title: 'Gottesdienst',
          time: 'Sonntag 10:00 Uhr',
          description: 'Beschreibung des Gottesdienstes',
          features: ['Feature 1', 'Feature 2'],
        },
        itemProps: (item) => {
          return {
            label: `${item.title} - ${item.time}`,
          };
        },
      },
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Time',
          name: 'time',
        },
        {
          type: 'string',
          label: 'Description',
          name: 'description',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'string',
          label: 'Events',
          name: 'features',
          list: true,
          ui: {
            defaultItem: 'Feature',
          },
        },
      ],
    },
  ],
};
