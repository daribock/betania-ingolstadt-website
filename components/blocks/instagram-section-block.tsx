import type { Template } from 'tinacms';
import { PageBlocksInstagramFeed } from '@/tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { Typography } from '../ui/Typography';
import { InstagramFeed } from '../instagram-feed';

export const InstagramSectionBlock = ({
  data,
}: {
  data: PageBlocksInstagramFeed;
}) => {
  return (
    <Section id="instagram-feed" background={data.background!}>
      <div className="grid gap-12 items-center">
        <Typography className="text-center">
          <h2 data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
          <p data-tina-field={tinaField(data, 'description')}>
            {data.description}
          </p>
        </Typography>

        <InstagramFeed
          username={data.instagramAccount || 'betaniaIngolstadt'}
        />
      </div>
    </Section>
  );
};

export const instagramSectionBlockSchema: Template = {
  name: 'instagramFeed',
  label: 'Instagram Feed',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      title: 'Die neusten Updates',
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
      type: 'string',
      label: 'Instagram Account',
      name: 'instagramAccount',
    },
  ],
};
