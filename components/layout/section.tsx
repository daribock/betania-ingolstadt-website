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
          fullWidth ? '' : 'container py-20 mx-auto max-w-7xl px-6',
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
  { label: 'Orange', value: 'bg-orange-50' },
];

export const sectionBlockSchemaField = {
  type: 'string',
  label: 'Background',
  name: 'background',
  options: tailwindBackgroundOptions,
};
