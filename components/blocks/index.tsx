import { tinaField } from 'tinacms/dist/react';
import { Page, PageBlocks } from '../../tina/__generated__/types';
import { Hero } from './hero';
import { Content } from './content';
import { Events } from './events';
import { Video } from './video';
import { Services } from './services';
import { CallToAction } from './call-to-action';
import { PageHeader } from './page-header';
import { LocationSection } from './location-section';
import { ContactForm } from './contact-form';
import { InstagramSectionBlock } from './instagram-section-block';
import type { AppointmentsMap } from '@/lib/prefetch-events';

interface BlocksProps extends Omit<Page, 'id' | '_sys' | '_values'> {
  appointmentsMap?: AppointmentsMap;
}

export const Blocks = ({ appointmentsMap, ...props }: BlocksProps) => {
  if (!props.blocks) return null;

  return (
    <>
      {props.blocks.map(function (block, i) {
        if (!block) return null;
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block block={block} index={i} appointmentsMap={appointmentsMap} />
          </div>
        );
      })}
    </>
  );
};

interface BlockProps {
  block: PageBlocks;
  index: number;
  appointmentsMap?: AppointmentsMap;
}

const Block = ({ block, index, appointmentsMap }: BlockProps) => {
  switch (block.__typename) {
    case 'PageBlocksVideo':
      return <Video data={block} />;
    case 'PageBlocksHero':
      return <Hero data={block} />;
    case 'PageBlocksPageHeader':
      return <PageHeader data={block} />;
    case 'PageBlocksServices':
      return <Services data={block} />;
    case 'PageBlocksContent':
      return <Content data={block} />;
    case 'PageBlocksEvents':
      return <Events data={block} appointments={appointmentsMap?.[index]} />;
    case 'PageBlocksCta':
      return <CallToAction data={block} />;
    case 'PageBlocksLocation':
      return <LocationSection data={block} />;
    case 'PageBlocksContactForm':
      return <ContactForm data={block} />;
    case 'PageBlocksInstagramFeed':
      return <InstagramSectionBlock data={block} />;
    default:
      return null;
  }
};
