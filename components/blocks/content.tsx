import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { Template } from 'tinacms';
import { PageBlocksContent } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { Mermaid } from './mermaid';
import { sectionBlockSchemaField } from '../layout/section';
import {
  scriptCopyBlockSchema,
  ScriptCopyBtn,
} from '../magicui/script-copy-btn';

export const Content = ({ data }: { data: PageBlocksContent }) => {
  return (
    <Section background={data.background!}>
      <div
        data-tina-field={tinaField(data, 'body')}
        className="prose prose-lg dark:prose-dark w-full max-w-none"
      >
        <TinaMarkdown
          content={data.body}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mermaid: (props: any) => <Mermaid {...props} />,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            scriptCopyBlock: (props: any) => <ScriptCopyBtn {...props} />,
          }}
        />
      </div>
    </Section>
  );
};

export const contentBlockSchema: Template = {
  name: 'content',
  label: 'Content',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sectionBlockSchemaField as any,
    {
      type: 'rich-text',
      label: 'Body',
      name: 'body',
      templates: [scriptCopyBlockSchema],
    },
  ],
};
