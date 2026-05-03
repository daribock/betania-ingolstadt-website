'use client';

import * as BoxIcons from 'react-icons/bi';
import React from 'react';

interface BiIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export const BiIcon = ({ name, ...rest }: BiIconProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (BoxIcons as any)[name];

  if (!IconComponent) return null;

  return <IconComponent {...rest} />;
};
