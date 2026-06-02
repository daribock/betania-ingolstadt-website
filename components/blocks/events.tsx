import { PageBlocksEvents } from '../../tina/__generated__/types';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Card } from '../ui/card';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';

export const Events = ({ data }: { data: PageBlocksEvents }) => {
  return (
    <Section id="events" background={data.background!}>
      <div className="text-center prose prose-lg">
        <h2 data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
        <p data-tina-field={tinaField(data, 'description')}>
          {data.description}
        </p>
      </div>

      <Card className="mt-8 w-full flex justify-center">
        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full border-0"
            data-tina-field={tinaField(data, 'churchToolsLink')}
            src={data.churchToolsLink || ''}
            loading="lazy"
            title={data.title ? `${data.title} calendar` : 'Events calendar'}
            aria-label={data.title ? `${data.title} calendar` : 'Events calendar'}
          ></iframe>
        </div>
      </Card>
    </Section>
  );
};

export const eventsBlockSchema: Template = {
  name: 'events',
  label: 'Events',
  ui: {
    defaultItem: {
      title: 'Kommende Veranstaltungen',
      description:
        'Seien Sie dabei und erleben Sie Gemeinschaft bei unseren verschiedenen Veranstaltungen. Jeder ist herzlich willkommen!',
      churchToolsLink: '',
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
      type: 'string',
      label: 'Church Tools Link',
      name: 'churchToolsLink',
      description:
        'Link to the Church Tools event page. If you leave this empty, the block will not be rendered.',
    },
  ],
};
