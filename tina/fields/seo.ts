import type { TinaField } from 'tinacms';

/**
 * Reusable SEO fields schema for pages and posts.
 * Contains title, description, and ogImage for meta tags and OpenGraph.
 */
export const seoFieldSchema: TinaField = {
  type: 'object',
  label: 'SEO',
  name: 'seo',
  description: 'Search engine optimization settings for this page',
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
      description: 'Page title for browser tab and search results (50-60 characters recommended)',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
      description: 'Short description for search results and social sharing (150-160 characters recommended)',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'image',
      label: 'OG Image',
      name: 'ogImage',
      description: 'Custom image for social media sharing (1200x630 px recommended). Falls back to the site default image.',
      uploadDir: () => 'seo',
    },
  ],
};
