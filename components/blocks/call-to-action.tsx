import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { iconSchema } from '@/tina/fields/icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { PageBlocksCta } from '@/tina/__generated__/types';
import { Icon } from '../icon';
import { Section } from '../layout/section';
import { VariantProps } from 'class-variance-authority';

export const CallToAction = ({ data }: { data: PageBlocksCta }) => {
  return (
    <Section background="bg-orange-400">
      <div className="@container mx-auto max-w-5xl px-6 text-center text-white">
        <h2
          className="text-balance text-4xl font-semibold lg:text-5xl"
          data-tina-field={tinaField(data, 'title')}
        >
          {data.title}
        </h2>
        <p className="mt-4" data-tina-field={tinaField(data, 'description')}>
          {data.description}
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {data.actions &&
            data.actions.map((action) => (
              <div key={action!.label} data-tina-field={tinaField(action)}>
                <Button
                  asChild
                  size="lg"
                  variant={
                    [
                      'default',
                      'outline',
                      'link',
                      'ghost',
                      'secondary',
                      'destructive',
                    ].includes(action!.variant as string)
                      ? (action!.variant as VariantProps<
                          typeof buttonVariants
                        >['variant'])
                      : 'default'
                  }
                  className="text-base"
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
            { label: 'Default', value: 'default' },
            { label: 'Outline', value: 'outline' },
            { label: 'Link', value: 'link' },
            { label: 'Ghost', value: 'ghost' },
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
