import type { Collection } from 'tinacms';
import { seoFieldSchema } from '@/tina/fields/seo';
import { heroBlockSchema } from '@/components/blocks/hero';
import { contentBlockSchema } from '@/components/blocks/content';
import { eventsBlockSchema } from '@/components/blocks/events';
import { servicesBlockSchema } from '@/components/blocks/services';
import { ctaBlockSchema } from '@/components/blocks/call-to-action';
import { pageHeaderBlockSchema } from '@/components/blocks/page-header';
import { locationSectionBlockSchema } from '@/components/blocks/location-section';
import { contactFormBlockSchema } from '@/components/blocks/contact-form';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      // Custom router to prevent double locale
      const locale = document._sys.breadcrumbs[0];
      const path = document._sys.breadcrumbs.slice(1).join('/');

      if (document._sys.filename === 'home') {
        return `/${locale}`;
      }

      return `${locale}/${path}`;
    },
  },
  fields: [
    seoFieldSchema,
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      description: 'Add and arrange content blocks to build your page',
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        pageHeaderBlockSchema,
        locationSectionBlockSchema,
        contactFormBlockSchema,
        eventsBlockSchema,
        servicesBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
      ],
    },
  ],
};

export default Page;
