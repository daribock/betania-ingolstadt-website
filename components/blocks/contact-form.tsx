'use client';

import { type Template } from 'tinacms';
import { Loader2Icon, Mail } from 'lucide-react';
import { Section } from '../layout/section';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { PageBlocksContactForm } from '@/tina/__generated__/types';
import { Typography } from '@/components/ui/Typography';
import { tinaField } from 'tinacms/dist/react';
import {
  contactSchema,
  type ContactFormData,
  reasonKeys,
} from '@/lib/validations/contact';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export const ContactForm = ({ data }: { data: PageBlocksContactForm }) => {
  const [loading, setLoading] = useState(false);
  const contactT = useTranslations('Contact');

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      number: '',
      reason: undefined,
      message: '',
      botField: '',
    },
  });

  const onSubmit = async (values: ContactFormData) => {
    setLoading(true);

    // Honeypot spam protection
    if (values.botField) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        form.reset();
        toast.success(contactT('toastMessages.success'));
      } else {
        toast.error(contactT('toastMessages.error'));
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(contactT('toastMessages.error'));
    } finally {
      setLoading(false);
    }
  };

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
          {data.formFields &&
            data.formFields.email &&
            data.formFields.message &&
            data.formFields.phone &&
            data.formFields.firstName &&
            data.formFields.lastName &&
            data.formFields.reasonsField?.label &&
            data.formFields.reasonsField?.reasons &&
            data.buttonText && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 space-y-4"
                  autoComplete="on"
                >
                  {/* Honeypot field (hidden from users) */}
                  <FormField
                    control={form.control}
                    name="botField"
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        style={{ display: 'none' }}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    )}
                  />

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem
                          data-tina-field={tinaField(data, 'formFields')}
                          className="w-full"
                        >
                          <FormLabel>{data.formFields?.firstName}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={
                                data.formFields?.firstName || undefined
                              }
                              autoComplete="given-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem
                          data-tina-field={tinaField(data, 'formFields')}
                          className="w-full"
                        >
                          <FormLabel>{data.formFields?.lastName}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={
                                data.formFields?.lastName || undefined
                              }
                              autoComplete="family-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem data-tina-field={tinaField(data, 'formFields')}>
                        <FormLabel>{data.formFields?.email}</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={data.formFields?.email || undefined}
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem data-tina-field={tinaField(data, 'formFields')}>
                        <FormLabel>{data.formFields?.phone}</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder={data.formFields?.phone || undefined}
                            autoComplete="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem data-tina-field={tinaField(data, 'formFields')}>
                        <FormLabel>
                          {data.formFields?.reasonsField?.label}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          key={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  data.formFields?.reasonsField?.label
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {data.formFields?.reasonsField?.reasons?.map(
                              (reason) => {
                                if (!reason?.value || !reason?.label) {
                                  return null;
                                }

                                return (
                                  <SelectItem
                                    key={reason?.value}
                                    value={reason?.value}
                                  >
                                    {reason?.label}
                                  </SelectItem>
                                );
                              }
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem data-tina-field={tinaField(data, 'formFields')}>
                        <FormLabel>{data.formFields?.message}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={data.formFields?.message || undefined}
                            className="min-h-[120px] resize-none"
                            maxLength={200}
                            {...field}
                          />
                        </FormControl>
                        <div className="flex justify-between items-center">
                          <FormMessage />
                          <div
                            className={`text-sm ${
                              field.value?.length > 180
                                ? 'text-orange-600'
                                : 'text-gray-600'
                            }`}
                          >
                            {contactT('characterCount', {
                              current: field.value?.length || 0,
                              max: 200,
                            })}
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    data-tina-field={tinaField(data, 'buttonText')}
                    type="submit"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading && (
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {data.buttonText}
                  </Button>
                </form>
              </Form>
            )}
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
