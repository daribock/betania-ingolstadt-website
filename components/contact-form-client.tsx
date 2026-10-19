'use client';

import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { contactSchema, type ContactFormData } from '@/lib/validations/contact';
import { ContactFormFields } from './contact-form-fields';
import { PageBlocksContactForm } from '@/tina/__generated__/types';

export const ContactFormClient = ({ data }: { data: PageBlocksContactForm }) => {
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const contactT = useTranslations('Contact');

  const baseResolver = zodResolver(contactSchema) as Resolver<ContactFormData>;
  // Schema errors are translation keys; translate them for display.
  const resolver: Resolver<ContactFormData> = async (values, ctx, opts) => {
    const result = await baseResolver(values, ctx, opts);
    for (const error of Object.values(result.errors)) {
      if (error && 'message' in error && error.message) {
        error.message = contactT(`validation.${error.message}`);
      }
    }
    return result;
  };

  const form = useForm<ContactFormData>({
    resolver,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      number: '',
      reason: undefined,
      message: '',
      website: '',
    },
  });

  useEffect(() => {
    form.setValue('startedAt', Date.now());
  }, [form]);

  const onSubmit = async (values: ContactFormData) => {
    setLoading(true);
    setFeedbackMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        form.reset();
        form.setValue('startedAt', Date.now());
        const message = contactT('toastMessages.success');
        toast.success(message);
        setFeedbackMessage(message);
      } else {
        const message = contactT('toastMessages.error');
        toast.error(message);
        setFeedbackMessage(message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const message = contactT('toastMessages.error');
      toast.error(message);
      setFeedbackMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactFormFields
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      data={data}
      feedbackMessage={feedbackMessage}
    />
  );
};
