import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LocaleSwitcher from '../../../locale-switcher/locale-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { GlobalHeader } from '../../../../tina/__generated__/types';
import { HeaderMobileMenu } from './header-mobile-menu';

interface HeaderProps {
  header: GlobalHeader;
}

export const Header = ({ header }: HeaderProps) => {
  if (!header) {
    return null;
  }

  return (
    <header>
      <nav className="bg-white/95 dark:bg-black/95 backdrop-blur-md border-b fixed z-20 w-full h-16">
        <div className="mx-auto max-w-6xl px-6 h-full">
          <div className="relative flex items-center justify-between h-full">
            {/* Left side: Logo + Navigation */}
            <div className="flex items-center gap-8 h-full">
              {/* Logo */}
              <Link href="/">
                <Image
                  src="/uploads/logos/betania-logo-transparent-schwarz.svg"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="dark:invert"
                />
              </Link>

              {/* Navigation - Desktop */}
              <div className="hidden lg:block h-full">
                <ul className="flex gap-8 text-sm h-full items-center">
                  {header.nav?.map((item, index) => (
                    <li key={index} className="h-full flex items-center">
                      <Link
                        href={item!.href!}
                        className="text-muted-foreground hover:text-accent-foreground flex duration-150 h-full items-center"
                      >
                        <span>{item!.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side: Language Switcher & Theme Toggle */}
            <div className="hidden lg:flex items-center gap-4 h-full">
              {process.env.NEXT_PUBLIC_ENABLE_LOCALE_SWITCHER === 'true' && (
                <LocaleSwitcher className="border-none" />
              )}
              <ThemeToggle />
            </div>

            {/* Mobile menu (client component) */}
            <HeaderMobileMenu nav={header.nav ?? null} />
          </div>
        </div>
      </nav>
    </header>
  );
};
