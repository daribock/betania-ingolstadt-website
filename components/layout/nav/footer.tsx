import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Icon } from '../../icon';
import LocaleSwitcher from '../../locale-switcher/locale-switcher';
import {
  GlobalHeader,
  GlobalServices,
  GlobalLegal,
  GlobalSharedSocial,
  GlobalSharedContact,
  Maybe,
} from '../../../tina/__generated__/types';

interface FooterProps {
  header?: Maybe<GlobalHeader>;
  services?: Maybe<Array<Maybe<GlobalServices>>>;
  legal?: Maybe<Array<Maybe<GlobalLegal>>>;
  social?: Maybe<Array<Maybe<GlobalSharedSocial>>>;
  contact?: Maybe<GlobalSharedContact>;
}

const getSocialLabel = (url?: string | null) => {
  if (!url) {
    return 'Open social media profile (opens in a new tab)';
  }

  if (url.includes('instagram.com')) {
    return 'Open Instagram profile (opens in a new tab)';
  }

  if (url.includes('facebook.com')) {
    return 'Open Facebook profile (opens in a new tab)';
  }

  if (url.includes('youtube.com')) {
    return 'Open YouTube channel (opens in a new tab)';
  }

  if (url.includes('x.com') || url.includes('twitter.com')) {
    return 'Open X profile (opens in a new tab)';
  }

  if (url.includes('linkedin.com')) {
    return 'Open LinkedIn profile (opens in a new tab)';
  }

  return 'Open social media profile (opens in a new tab)';
};

export const Footer = async ({
  header,
  services,
  legal,
  social,
  contact,
}: FooterProps) => {
  const t = await getTranslations();

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/uploads/logos/logo-transparent-weiss.png"
                alt="Logo"
                width={40}
                height={40}
              />
              <span className="text-lg font-bold">
                {header?.name || 'Betania Ingolstadt'}
              </span>
            </div>
            {header?.tagline && (
              <p className="text-gray-400">{header.tagline!}</p>
            )}
            {process.env.NEXT_PUBLIC_ENABLE_LOCALE_SWITCHER === 'true' && (
              <LocaleSwitcher />
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('Contact.quickLinks')}</h3>
            <ul className="space-y-2 text-gray-400">
              {header?.nav?.map((link) => (
                <li key={link?.href}>
                  <Link
                    className="hover:text-white transition-colors"
                    href={link!.href!}
                  >
                    <span className="text-nowrap">{link?.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="font-semibold mb-4">{t('Contact.Services')}</h3>
            <ul className="space-y-2 text-gray-400">
              {services?.map((service, index: number) => (
                <li key={index}>{service?.time}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          {contact && (
            <div>
              <h3 className="font-semibold mb-4">{t('Contact.title')}</h3>
              <ul className="space-y-2 text-gray-400">
                <>
                  {contact.street && contact.number && contact.ort && (
                    <li>
                      <Link
                        href="https://maps.app.goo.gl/w3A3ZUWggsQTQzJb7"
                        className="hover:text-white transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contact.street} {contact.number}, {contact.ort}
                      </Link>
                    </li>
                  )}
                  {contact.phone && (
                    <li>
                      <Link
                        href={`tel:${contact.phone}`}
                        className="hover:text-white transition-colors"
                      >
                        {contact.phone}
                      </Link>
                    </li>
                  )}
                  {contact.email && (
                    <li>
                      <Link
                        href={`mailto:${contact.email}`}
                        className="hover:text-white transition-colors"
                      >
                        {contact.email}
                      </Link>
                    </li>
                  )}
                </>
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
            {/* Logo and Copyright */}
            <div className="flex flex-col md:flex-row  gap-4">
              <span className="text-gray-400 text-sm">
                {t('footer.copyright', {
                  year: new Date().getFullYear(),
                })}
              </span>

              {/* Legal Links */}
              {legal && legal.length > 0 && (
                <div className="flex items-start gap-4 text-sm">
                  {legal.map((legal) => (
                    <Link
                      key={legal!.href!}
                      href={legal!.href!}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {legal?.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex  gap-6">
              {social?.map((link, index) => (
                <Link
                  key={`${link!.icon}${index}`}
                  href={link!.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={getSocialLabel(link?.url)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon
                    data={{ ...link!.icon, size: 'small' }}
                    className="block"
                    decorative
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
