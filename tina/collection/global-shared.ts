/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Collection } from 'tinacms';
import { ColorPickerInput } from '../fields/color';
import { iconSchema } from '../fields/icon';
import { seoFieldSchema } from '../fields/seo';

const GlobalShared: Collection = {
  label: 'Global Shared',
  name: 'globalShared',
  path: 'content/global-shared',
  format: 'json',
  ui: {
    global: true,
  },
  fields: [
    {
      type: 'image',
      label: 'Logo',
      name: 'logo',
      description: 'Site logo image',
    },
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
            component: ColorPickerInput as any,
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
    {
      type: 'object',
      label: 'Contact Information',
      name: 'contact',
      fields: [
        {
          type: 'string',
          label: 'Street',
          name: 'street',
        },
        {
          type: 'string',
          label: 'Number',
          name: 'number',
        },
        {
          type: 'string',
          label: 'City/Postal',
          name: 'ort',
        },
        {
          type: 'string',
          label: 'Email',
          name: 'email',
        },
        {
          type: 'string',
          label: 'Phone',
          name: 'phone',
        },
      ],
    },
    seoFieldSchema,
  ],
};

export default GlobalShared;
