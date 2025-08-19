/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import type { Template } from 'tinacms';
import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';
import { PageBlocksPageHeader } from '@/tina/__generated__/types';
import { Typography } from '../ui/Typography';

export const PageHeader = ({ data }: { data: PageBlocksPageHeader }) => {
  return (
    <Section className="relative overflow-hidden pt-40 m-0 max-w-none">
      {/* Background Image */}
      {data.backgroundImage && (
        <Image
          src={data.backgroundImage}
          alt="Church background"
          fill
          className="object-cover z-0"
          priority
          data-tina-field={tinaField(data, 'backgroundImage')}
        />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/80 to-orange-600/80 z-10" />
      
      {/* Content */}
      <div className="relative z-20 text-center">
        <Typography>
          <h1
            className="!text-white"
            data-tina-field={tinaField(data, 'title')}
          >
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
      backgroundImage: '/uploads/church/welcome-team.png',
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
      description: 'Background image with orange gradient overlay',
    },
  ],
};
