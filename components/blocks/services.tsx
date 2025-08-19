import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';
import { iconSchema } from '@/tina/fields/icon';
import { PageBlocksServices } from '@/tina/__generated__/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { Typography } from '../ui/Typography';
import { Icon } from '../icon';
import { useLayout } from '../layout/layout-context';

export const Services = ({ data }: { data: PageBlocksServices }) => {
  const { globalSettings } = useLayout();
  const { services } = globalSettings!;

  if (!services) {
    return null;
  }

  return (
    <Section background={data.background!}>
      <div className="text-center prose prose-lg">
        <h2 data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
        <p data-tina-field={tinaField(data, 'description')}>
          {data.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle
                className="flex items-center gap-3"
                data-tina-field={tinaField(service, 'title')}
              >
                {service?.icon ? (
                  <Icon data={service.icon} className="w-6 h-6" />
                ) : (
                  <Clock className="w-6 h-6" />
                )}
                <Typography>
                  <h4 className="!m-0">{service?.title}</h4>
                </Typography>
              </CardTitle>
              <p data-tina-field={tinaField(service, 'time')}>
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
                <div className="grid sm:grid-cols-2 gap-2">
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
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export const servicesSchema = {
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
      icon: {
        name: 'BiClock',
        color: 'orange',
        style: 'float',
      },
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
      label: 'Features',
      name: 'features',
      list: true,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    iconSchema as any,
  ],
};

// Services are stored in globals
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
  ],
};
