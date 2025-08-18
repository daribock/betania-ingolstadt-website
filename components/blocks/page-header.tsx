/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';
import { PageBlocksPageHeader } from '@/tina/__generated__/types';
import { Typography } from '../ui/Typography';

export const PageHeader = ({ data }: { data: PageBlocksPageHeader }) => {
  return (
    <Section className="bg-gradient-to-r from-orange-400 to-orange-600 pt-40 m-0 max-w-none">
      <div className="text-center ">
        <Typography>
          <h1 className="!text-white" data-tina-field={tinaField(data, 'title')}>
            {data.title}
          </h1>
          {data.subtitle && (
            <p
              className="!text-white"
              data-tina-field={tinaField(data, 'subtitle')}
            >
              {data.subtitle}
            </p>
          )}
        </Typography>
      </div>
    </Section>
  );
};

export const pageHeaderBlockSchema: Template = {
  name: 'pageHeader',
  label: 'Page Header',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      title: 'Kontakt',
      subtitle: 'Nehmen Sie Kontakt mit uns auf',
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
      label: 'Subtitle',
      name: 'subtitle',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'image',
      label: 'Background Image',
      name: 'backgroundImage',
    },
  ],
};
