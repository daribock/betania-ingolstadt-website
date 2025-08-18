import { type Template } from 'tinacms';
import { Mail } from 'lucide-react';
import { useLayout } from '../layout/layout-context';
import { useTranslations } from 'next-intl';
import { Section } from '../layout/section';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { sectionBlockSchemaField } from '../layout/section';
import Link from 'next/link';
import { PageBlocksContactForm } from '@/tina/__generated__/types';

export const ContactForm = ({ data }: { data: PageBlocksContactForm }) => {
  const contactT = useTranslations('Contact');
  const { globalSettings } = useLayout();

  if (!globalSettings || !globalSettings.contact) {
    return null;
  }

  const { contact } = globalSettings;

  return (
    <Section background={data.background!}>
      {/* Contact Form or Image */}
      {data.showContactForm && (
        <Card className="shadow-lg col-span-2">
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {contactT('ContactDirectly')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {contactT('ContactDirectlyDescription')}
              </p>
              <Button asChild>
                <Link href={`mailto:${contact.email}`}>
                  {contactT('SendEmail')}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </Section>
  );
};

export const contactFormBlockSchema: Template = {
  name: 'contactForm',
  label: 'Contact Form',
  ui: {
    previewSrc: '/blocks/contact.png',
    defaultItem: {
      title: 'Kontakt',
      description:
        'Nehmen Sie Kontakt mit uns auf. Wir freuen uns darauf, von Ihnen zu hören.',
      showContactForm: false,
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sectionBlockSchemaField as any,
    {
      type: 'boolean',
      label: 'Show Contact Form',
      name: 'showContactForm',
      description: 'Show contact form',
    },
  ],
};
