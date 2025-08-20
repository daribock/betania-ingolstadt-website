'use client';
import { iconSchema } from '@/tina/fields/icon';
import Link from 'next/link';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import {
  PageBlocksHero,
  PageBlocksHeroImage,
} from '../../tina/__generated__/types';
import { Icon } from '../icon';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { AnimatedGroup } from '../motion-primitives/animated-group';
import { TextEffect } from '../motion-primitives/text-effect';
import { Transition } from 'motion/react';
import { Button } from '../ui/button';
import { useEffect, useState, useCallback } from 'react';

const transitionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      } as Transition,
    },
  },
};

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  return (
    <Section
      fullWidth
      background={data.background!}
      id="home"
      className="relative h-screen overflow-hidden"
    >
      {data.image && <ImageBlock image={data.image} />}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <div className="max-w-4xl px-4">
          {data.headline && (
            <div data-tina-field={tinaField(data, 'headline')}>
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="mt-8 text-balance text-6xl md:text-7xl xl:text-[5.25rem]"
              >
                {data.headline!}
              </TextEffect>
            </div>
          )}
          {data.tagline && (
            <div data-tina-field={tinaField(data, 'tagline')}>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="h2"
                className="mx-auto mt-8 max-w-2xl text-balance text-lg"
              >
                {data.tagline!}
              </TextEffect>
            </div>
          )}

          <AnimatedGroup
            variants={transitionVariants}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            {data.actions &&
              data.actions.map((action) => (
                <div key={action!.label} data-tina-field={tinaField(action)}>
                  <Button
                    asChild
                    size="lg"
                    variant={action!.type === 'link' ? 'secondary' : 'default'}
                    className=" px-5 text-base"
                  >
                    <Link href={action!.link!}>
                      {action?.icon && <Icon data={action?.icon} />}
                      <span className="text-nowrap">{action!.label}</span>
                    </Link>
                  </Button>
                </div>
              ))}
          </AnimatedGroup>
        </div>
      </div>
    </Section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksHeroImage }) => {
  const [scrollY, setScrollY] = useState(0);
  const speed: number = 0.3; // Reduced speed for smoother effect

  const handleScroll = useCallback(() => {
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (image.src) {
    return (
      <div 
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * speed}px, 0)`,
        }}
      >
        <Image
          src={image.src}
          alt={image.alt || 'Hero background'}
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>
    );
  }
};

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: 'This Big Text is Totally Awesome',
      text: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Headline',
      name: 'headline',
    },
    {
      type: 'string',
      label: 'Tagline',
      name: 'tagline',
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
          label: 'Type',
          name: 'type',
          type: 'string',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
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
    {
      type: 'object',
      label: 'Image',
      name: 'image',
      fields: [
        {
          name: 'src',
          label: 'Image Source',
          type: 'image',
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'string',
        },
      ],
    },
  ],
};
