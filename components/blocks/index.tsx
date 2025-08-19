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

export const Blocks = (props: Omit<Page, 'id' | '_sys' | '_values'>) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block {...block} />
          </div>
        );
      })}
    </>
  );
};

const Block = (block: PageBlocks) => {
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
      return <Events data={block} />;
    case 'PageBlocksCta':
      return <CallToAction data={block} />;
    case 'PageBlocksLocation':
      return <LocationSection data={block} />;
    case 'PageBlocksContactForm':
      return <ContactForm data={block} />;
    default:
      return null;
  }
};
