/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';
import { PageBlocksPageHeader } from '@/tina/__generated__/types';

export const PageHeader = ({ data }: { data: PageBlocksPageHeader }) => {
  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-5xl px-6 text-center">
        <h1
          className="mt-8 text-balance text-6xl md:text-7xl xl:text-[5.25rem]"
          data-tina-field={tinaField(data, 'title')}
        >
          {data.title}
        </h1>
        {data.subtitle && (
          <p
            className="text-xl max-w-3xl mx-auto"
            data-tina-field={tinaField(data, 'subtitle')}
          >
            {data.subtitle}
          </p>
        )}
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
