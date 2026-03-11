/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Collection } from 'tinacms';
import { servicesSchema } from '@/components/blocks/services';

const Global: Collection = {
  label: 'Global',
  name: 'global',
  path: 'content/global',
  format: 'json',
  ui: {
    global: true,
  },
  fields: [
    {
      type: 'object',
      label: 'Header',
      name: 'header',
      description: 'Site header configuration',
      fields: [
        {
          type: 'string',
          label: 'Name',
          name: 'name',
          description: 'Site name displayed in the header',
        },
        {
          type: 'string',
          label: 'Tagline',
          name: 'tagline',
          description: 'Short tagline shown below the site name',
        },
        {
          type: 'object',
          label: 'Nav Links',
          name: 'nav',
          list: true,
          description: 'Navigation menu links',
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: 'home',
              label: 'Home',
            },
          },
          fields: [
            {
              type: 'string',
              label: 'Link',
              name: 'href',
              description: 'URL path for the navigation link',
            },
            {
              type: 'string',
              label: 'Label',
              name: 'label',
              description: 'Text displayed for this link',
            },
          ],
        },
      ],
    },
    servicesSchema as any,
    {
      type: 'string',
      label: 'Footer',
      name: 'footer',
      description: 'Copyright text displayed in the footer',
    },
    {
      type: 'object',
      label: 'Legal Links',
      name: 'legal',
      list: true,
      description: 'Legal page links (Imprint, Privacy, etc.)',
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        },
        defaultItem: {
          href: '',
          label: '',
        },
      },
      fields: [
        {
          type: 'string',
          label: 'Link',
          name: 'href',
          description: 'URL path for this legal link',
        },
        {
          type: 'string',
          label: 'Label',
          name: 'label',
          description: 'Text displayed for this link',
        },
      ],
    },
  ],
};

export default Global;
