import { type Template } from 'tinacms';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { reasonKeys } from '@/lib/validations/contact';
import { ContactFormClient } from '../contact-form-client';
import { Section } from '../layout/section';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { Typography } from '@/components/ui/Typography';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksContactForm } from '@/tina/__generated__/types';

export const ContactForm = ({ data }: { data: PageBlocksContactForm }) => {
  return (
    <Section background={data.background!}>
      <Card className="shadow-lg col-span-2">
        <CardHeader>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <Typography>
              <h3
                className="!text-primary"
                data-tina-field={tinaField(data, 'title')}
              >
                {data.title}
              </h3>
              <p data-tina-field={tinaField(data, 'description')}>
                {data.description}
              </p>
            </Typography>
          </div>
        </CardHeader>
        <CardContent>
          <ContactFormClient data={data} />
        </CardContent>
      </Card>
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
    { type: 'string', label: 'Title', name: 'title' },
    { type: 'string', label: 'Description', name: 'description' },
    {
      type: 'object',
      label: 'Form fields',
      name: 'formFields',
      fields: [
        { type: 'string', label: 'First Name', name: 'firstName' },
        { type: 'string', label: 'Last Name', name: 'lastName' },
        { type: 'string', label: 'Email', name: 'email' },
        { type: 'string', label: 'Phone', name: 'phone' },
        {
          type: 'object',
          label: 'Reasons field',
          name: 'reasonsField',
          fields: [
            { type: 'string', label: 'Label', name: 'label' },
            {
              type: 'object',
              label: 'Reasons',
              name: 'reasons',
              list: true,
              ui: {
                max: 4,
                min: 2,
              },
              fields: [
                {
                  type: 'string',
                  label: 'Label',
                  name: 'label',
                },
                {
                  type: 'string',
                  label: 'Value',
                  name: 'value',
                  options: reasonKeys.map((key) => ({
                    label: key,
                    value: key,
                  })),
                },
              ],
            },
          ],
        },

        { type: 'string', label: 'Message', name: 'message' },
      ],
    },
    { type: 'string', label: 'Button Text', name: 'buttonText' },
  ],
};
