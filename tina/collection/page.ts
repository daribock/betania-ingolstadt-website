import type { Collection } from 'tinacms';
import { heroBlockSchema } from '@/components/blocks/hero';
import { contentBlockSchema } from '@/components/blocks/content';
import { eventsBlockSchema } from '@/components/blocks/events';
import { videoBlockSchema } from '@/components/blocks/video';
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
      return `${locale}/${path}`;
    },
  },
  fields: [
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
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
        videoBlockSchema,
      ],
    },
  ],
};

export default Page;
