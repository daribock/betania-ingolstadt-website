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
  const [feedbackMessage, setFeedbackMessage] = useState('');
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
    console.log('Form values:', values); // Debug log to check form values
    setLoading(true);
    setFeedbackMessage('');

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

      console.log('Response:', res); // Debug log to check response

      if (res.ok) {
        form.reset();
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
