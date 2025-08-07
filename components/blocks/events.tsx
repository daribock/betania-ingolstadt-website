/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { PageBlocksFeatures } from '../../tina/__generated__/types';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Card } from '../ui/card';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';

export const Events = ({ data }: { data: PageBlocksFeatures }) => {
  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2
            data-tina-field={tinaField(data, 'title')}
            className="text-balance text-4xl font-semibold lg:text-5xl"
          >
            {data.title}
          </h2>
          <p data-tina-field={tinaField(data, 'description')} className="mt-4">
            {data.description}
          </p>
        </div>
        <Card className="mt-8"></Card>
      </div>
    </Section>
  );
};

export const eventsBlockSchema: Template = {
  name: 'events',
  label: 'Events',
  ui: {
    previewSrc: '/blocks/features.png',
    defaultItem: {
      title: 'Kommende Veranstaltungen',
      description:
        'Seien Sie dabei und erleben Sie Gemeinschaft bei unseren verschiedenen Veranstaltungen. Jeder ist herzlich willkommen!',
      churchToolsLink: '',
    },
  },
  fields: [
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
