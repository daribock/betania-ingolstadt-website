/* eslint-disable react-hooks/static-components */
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const iconCache: Record<string, React.ElementType> = {};

export function getIconComponent(name: string): React.ElementType | null {
  if (iconCache[name]) return iconCache[name];

  let Comp: React.ElementType | null = null;
  if (name.startsWith('Bi')) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Comp = dynamic(() => import('react-icons/bi').then((mod) => mod[name as keyof typeof mod] as any));
  } else if (name.startsWith('Fa')) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Comp = dynamic(() => import('react-icons/fa6').then((mod) => mod[name as keyof typeof mod] as any));
  } else if (name.startsWith('Ai')) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Comp = dynamic(() => import('react-icons/ai').then((mod) => mod[name as keyof typeof mod] as any));
  }

  if (Comp) {
    iconCache[name] = Comp;
  }
  return Comp;
}

import { useLayout } from './layout/layout-context';
import { Maybe } from '@/tina/__generated__/types';
import { cn } from '@/lib/utils';

// TODO: Define types inside of the backend (tina folder)
// Define valid types for better type safety
type IconSize = 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'custom';
type IconColor =
  | 'primary'
  | 'blue'
  | 'teal'
  | 'green'
  | 'red'
  | 'pink'
  | 'purple'
  | 'orange'
  | 'yellow'
  | 'black'
  | 'white';

const iconColorClass: Record<IconColor, string> = {
  primary: 'text-primary',
  blue: 'text-blue-400',
  teal: 'text-teal-400',
  green: 'text-green-400',
  red: 'text-red-400',
  pink: 'text-pink-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400',
  yellow: 'text-yellow-400',
  black: 'text-black opacity-80',
  white: 'text-white opacity-80',
};

// TODO: move this to tina/fields/icon.tsx and add it to the schema so that its editable
const iconSizeClass: Record<IconSize, string> = {
  xs: 'w-6 h-6 shrink-0',
  small: 'w-8 h-8 shrink-0',
  medium: 'w-12 h-12 shrink-0',
  large: 'w-14 h-14 shrink-0',
  xl: 'w-16 h-16 shrink-0',
  custom: '',
};

type IconData = {
  name?: Maybe<string>;
  color?: Maybe<string>;
  size?: Maybe<string | number>;
  decorative?: Maybe<boolean>;
  ariaLabel?: Maybe<string>;
};

interface IconProps {
  data?: Maybe<IconData>;
  parentColor?: string;
  className?: string;
  tinaField?: string;
  decorative?: boolean;
  ariaLabel?: string;
}

// Helper functions for safe value extraction
const getValidIconName = (
  name?: Maybe<string>
): string | null => {
  if (!name || typeof name !== 'string') return null;
  return name;
};

const getValidIconColor = (color?: Maybe<string>): IconColor => {
  if (!color || typeof color !== 'string') return 'orange';
  return color in iconColorClass ? (color as IconColor) : 'orange';
};

const getValidIconSize = (size?: Maybe<string | number>): IconSize => {
  if (!size) return 'medium';

  if (typeof size === 'string') {
    return size in iconSizeClass ? (size as IconSize) : 'medium';
  }

  // Handle numeric size by converting to index
  const sizeKeys = Object.keys(iconSizeClass) as IconSize[];
  const index = Math.max(0, Math.min(size, sizeKeys.length - 1));
  return sizeKeys[index] || 'medium';
};

export const Icon = ({
  data,
  parentColor = '',
  className = '',
  tinaField = '',
  decorative,
  ariaLabel,
}: IconProps) => {
  const { theme } = useLayout();

  // Early return if no data provided
  if (!data) {
    return null;
  }

  // Extract and validate all values with safe defaults
  const iconName = getValidIconName(data.name);
  const iconColor = getValidIconColor(data.color);
  const iconSize = getValidIconSize(data.size);

  // Return null if icon name is invalid
  if (!iconName) {
    return null;
  }


  const IconSVG = getIconComponent(iconName);

  if (!IconSVG) {
    return null;
  }

  const iconSizeClasses = iconSizeClass[iconSize];
  const resolvedDecorative =
    decorative ?? (typeof data.decorative === 'boolean' ? data.decorative : true);
  const resolvedAriaLabel =
    ariaLabel ?? (typeof data.ariaLabel === 'string' ? data.ariaLabel : undefined);

  // Determine the final color based on parent color and theme
  const finalColor: IconColor = (() => {
    if (parentColor === 'primary' && iconColor === theme?.color) {
      return 'white';
    }
    return iconColor;
  })();

  // Common props for tina field
  const tinaProps = tinaField ? { 'data-tina-field': tinaField } : {};
  const a11yProps = resolvedDecorative
    ? { 'aria-hidden': true, focusable: false }
    : { role: 'img', 'aria-label': resolvedAriaLabel || undefined };

  return (
    <IconSVG
      {...tinaProps}
      {...a11yProps}
      className={cn(
        `${iconSizeClasses} ${iconColorClass[finalColor]} ${className}`
      )}
    />
  );
};
