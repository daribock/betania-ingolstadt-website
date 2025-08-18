'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '../../icon';
import { useLayout } from '../layout-context';
import { Heart } from 'lucide-react';

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, social, services, contact } = globalSettings!;

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
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
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Schnelllinks</h3>
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
            <h3 className="font-semibold mb-4">Gottesdienste</h3>
            <ul className="space-y-2 text-gray-400">
              {services?.map((service, index: number) => (
                <li key={index}>{service?.time}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          {contact && (
            <div>
              <h3 className="font-semibold mb-4">Kontakt</h3>
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
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
            {/* Logo and Copyright */}
            <div className="flex items-center gap-4">
              <Link href="/" aria-label="go home">
                <Icon parentColor={header!.color!} data={header!.icon} />
              </Link>
              <span className="text-gray-400 text-sm">
                © {new Date().getFullYear()}{' '}
                {header?.name || 'Betania Ingolstadt'}. Alle Rechte vorbehalten.
              </span>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6">
              {social?.map((link, index) => (
                <Link
                  key={`${link!.icon}${index}`}
                  href={link!.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon
                    data={{ ...link!.icon, size: 'small' }}
                    className="block"
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
