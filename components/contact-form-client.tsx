'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { contactSchema, type ContactFormData } from '@/lib/validations/contact';
import { ContactFormFields } from './contact-form-fields';
import { PageBlocksContactForm } from '@/tina/__generated__/types';

export const ContactFormClient = ({ data }: { data: PageBlocksContactForm }) => {
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

  return <ContactFormFields form={form} onSubmit={onSubmit} loading={loading} data={data} />;
};
