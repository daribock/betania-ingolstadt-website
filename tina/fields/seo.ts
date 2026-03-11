import type { TinaField } from 'tinacms';

/**
 * Reusable SEO fields schema for pages and posts.
 * Contains title and description for meta tags and OpenGraph.
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
      description: 'Page title for browser tab and search results',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
      description: 'Short description for search results and social sharing',
      ui: {
        component: 'textarea',
      },
    },
  ],
};
