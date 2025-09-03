import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2Icon } from 'lucide-react';
import { tinaField } from 'tinacms/dist/react';
import { UseFormReturn } from 'react-hook-form';
import { ContactFormData } from '@/lib/validations/contact';
import { PageBlocksContactForm } from '@/tina/__generated__/types';
import { useTranslations } from 'next-intl';

interface ContactFormFieldsProps {
  form: UseFormReturn<ContactFormData>;
  onSubmit: (values: ContactFormData) => Promise<void>;
  loading: boolean;
  data: PageBlocksContactForm;
}

export const ContactFormFields = ({ form, onSubmit, loading, data }: ContactFormFieldsProps) => {
  const contactT = useTranslations('Contact');

  if (!data.formFields?.email || !data.formFields?.message || !data.formFields?.phone || 
      !data.formFields?.firstName || !data.formFields?.lastName || 
      !data.formFields?.reasonsField?.label || !data.formFields?.reasonsField?.reasons || 
      !data.buttonText) {
    return null;
  }

  return (
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
                    placeholder={data.formFields?.firstName || undefined}
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
                    placeholder={data.formFields?.lastName || undefined}
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
              <FormLabel>{data.formFields?.reasonsField?.label}</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                key={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={data.formFields?.reasonsField?.label} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.formFields?.reasonsField?.reasons?.map((reason) => {
                    if (!reason?.value || !reason?.label) {
                      return null;
                    }

                    return (
                      <SelectItem key={reason?.value} value={reason?.value}>
                        {reason?.label}
                      </SelectItem>
                    );
                  })}
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
          {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          {data.buttonText}
        </Button>
      </form>
    </Form>
  );
};
