'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import LocaleSwitcher from '../../../locale-switcher/locale-switcher';
import { cn } from '@/lib/utils';
import { GlobalHeaderNav, Maybe } from '../../../../tina/__generated__/types';

interface HeaderMobileMenuProps {
  nav: Maybe<Array<Maybe<GlobalHeaderNav>>>;
}

export const HeaderMobileMenu = ({ nav }: HeaderMobileMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        className="relative z-20 -m-2.5 -mr-4 cursor-pointer p-2.5 lg:hidden h-12 w-12 flex items-center justify-center"
      >
        <Menu
          className={cn(
            'm-auto size-6 duration-200 motion-reduce:duration-0',
            isOpen && 'rotate-180 scale-0 opacity-0',
          )}
        />
        <X
          className={cn(
            'absolute inset-0 m-auto size-6 duration-200 motion-reduce:duration-0',
            isOpen
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-180 scale-0 opacity-0',
          )}
        />
      </button>

      {/* Mobile navigation menu */}
      <div
        id="mobile-nav-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className={cn(
          'bg-background z-20 mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap absolute top-16 left-0 right-0',
          isOpen ? 'flex' : 'hidden',
        )}
      >
        <div className="w-full">
          <ul className="space-y-6 text-base mb-6">
            {nav?.map((item, index) => (
              <li key={index}>
                <Link
                  href={item!.href!}
                  className="text-muted-foreground hover:text-accent-foreground block duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden rounded-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item!.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {process.env.NEXT_PUBLIC_ENABLE_LOCALE_SWITCHER === 'true' && (
            <div className="flex items-center justify-between pt-4 border-t">
              <LocaleSwitcher />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
