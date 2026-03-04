/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Collection } from 'tinacms';
import { ColorPickerInput } from '../fields/color';
import { iconSchema } from '../fields/icon';
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
    {
      type: 'image',
      label: 'Logo',
      name: 'logo',
      description: 'Site logo image',
    },
    servicesSchema as any,
    {
      type: 'object',
      label: 'Social Links',
      name: 'social',
      list: true,
      description: 'Social media links displayed in footer',
      ui: {
        itemProps: (item) => {
          return { label: item?.icon?.name || 'undefined' };
        },
      },
      fields: [
        iconSchema as any,
        {
          type: 'string',
          label: 'Url',
          name: 'url',
          description: 'Full URL to the social media profile',
        },
      ],
    },
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
    {
      type: 'object',
      label: 'Theme',
      name: 'theme',
      description: 'Site theme and appearance settings',
      fields: [
        {
          type: 'string',
          label: 'Primary Color',
          name: 'color',
          description: 'Main accent color for the site',
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: 'string',
          name: 'font',
          label: 'Font Family',
          description: 'Typography style for the site',
          options: [
            {
              label: 'System Sans',
              value: 'sans',
            },
            {
              label: 'Nunito',
              value: 'nunito',
            },
            {
              label: 'Lato',
              value: 'lato',
            },
          ],
        },
        {
          type: 'string',
          name: 'darkMode',
          label: 'Dark Mode',
          description: 'Control dark mode behavior',
          options: [
            {
              label: 'System',
              value: 'system',
            },
            {
              label: 'Light',
              value: 'light',
            },
            {
              label: 'Dark',
              value: 'dark',
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
