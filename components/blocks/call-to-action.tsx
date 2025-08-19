import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { iconSchema } from '@/tina/fields/icon';
import { Button } from '@/components/ui/button';
import { PageBlocksCta } from '@/tina/__generated__/types';
import { Icon } from '../icon';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { Typography } from '../ui/Typography';

export const CallToAction = ({ data }: { data: PageBlocksCta }) => {
  return (
    <Section background="bg-gradient-to-l from-orange-400/80 to-orange-600/80">
      <div className=" text-center">
        <Typography>
          <h2
            className="!text-white"
            data-tina-field={tinaField(data, 'title')}
          >
            {data.title}
          </h2>
          <p
            className="!text-white"
            data-tina-field={tinaField(data, 'description')}
          >
            {data.description}
          </p>
        </Typography>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {data.actions &&
            data.actions.map((action) => (
              <div key={action!.label} data-tina-field={tinaField(action)}>
                <Button
                  asChild
                  size="lg"
                  variant={
                    action?.variant === 'secondary' ? 'cta-outline' : 'cta'
                  }
                >
                  <Link href={action!.link!}>
                    {action?.icon && <Icon data={action?.icon} />}
                    <span className="text-nowrap">{action!.label}</span>
                  </Link>
                </Button>
              </div>
            ))}
        </div>
      </div>
    </Section>
  );
};

export const ctaBlockSchema: Template = {
  name: 'cta',
  label: 'CTA',
  ui: {
    previewSrc: '/blocks/cta.png',
    defaultItem: {
      title: 'Start Building',
      description:
        'Get started with TinaCMS today and take your content management to the next level.',
      actions: [
        {
          label: 'Get Started',
          type: 'button',
          link: '/',
        },
        {
          label: 'Book Demo',
          type: 'link',
          link: '/',
        },
      ],
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
      ui: {
        component: 'textarea',
      },
    },
    {
      label: 'Actions',
      name: 'actions',
      type: 'object',
      list: true,
      ui: {
        defaultItem: {
          label: 'Action Label',
          type: 'button',
          icon: true,
          link: '/',
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: 'Label',
          name: 'label',
          type: 'string',
        },
        {
          label: 'Variant',
          name: 'variant',
          type: 'string',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        iconSchema as any,
        {
          label: 'Link',
          name: 'link',
          type: 'string',
        },
      ],
    },
  ],
};
