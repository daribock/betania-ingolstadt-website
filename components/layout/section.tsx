import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLProps<HTMLElement> {
  fullWidth?: boolean;
  background?: string;
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  className,
  fullWidth,
  children,
  background,
  ...props
}) => {
  return (
    <div className={background || 'bg-default'}>
      <section
        className={cn(
          fullWidth ? '' : 'py-20 mx-auto max-w-7xl px-6',
          className
        )}
        {...props}
      >
        {children}
      </section>
    </div>
  );
};

export const tailwindBackgroundOptions = [
  { label: 'Default', value: 'bg-default' },
  { label: 'White', value: 'bg-white' },
  { label: 'Gray', value: 'bg-gray-50' },
  { label: 'Zinc', value: 'bg-zinc-50' },
  { label: 'Black', value: 'bg-black' },
  { label: 'Red', value: 'bg-red-50' },
  { label: 'Orange', value: 'bg-orange-50' },
  { label: 'Yellow', value: 'bg-yellow-50' },
  { label: 'Green', value: 'bg-green-50' },
  { label: 'Lime', value: 'bg-lime-50' },
  { label: 'Emerald', value: 'bg-emerald-50' },
  { label: 'Teal', value: 'bg-teal-50' },
  { label: 'Cyan', value: 'bg-cyan-50' },
  { label: 'Blue', value: 'bg-blue-50' },
  { label: 'Sky', value: 'bg-sky-50' },
  { label: 'Indigo', value: 'bg-indigo-50' },
  { label: 'Violet', value: 'bg-violet-50' },
  { label: 'Purple', value: 'bg-purple-50' },
  { label: 'Fuchsia', value: 'bg-fuchsia-50' },
  { label: 'Pink', value: 'bg-pink-50' },
  { label: 'Rose', value: 'bg-rose-50' },
];

export const sectionBlockSchemaField = {
  type: 'string',
  label: 'Background',
  name: 'background',
  options: tailwindBackgroundOptions,
};
