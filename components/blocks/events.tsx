import { PageBlocksEvents } from '../../tina/__generated__/types';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Card } from '../ui/card';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';
import type { Appointment } from '@/lib/clients/churchtools/get-appointments';

interface EventsProps {
  data: PageBlocksEvents;
  appointments?: Appointment[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const Events = ({ data, appointments = [] }: EventsProps) => {
  const hasAppointments = appointments.length > 0;
  const hasIframe = !!data.churchToolsLink;

  return (
    <Section id="events" background={data.background!}>
      <div className="text-center prose prose-lg">
        <h2 data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
        <p data-tina-field={tinaField(data, 'description')}>
          {data.description}
        </p>
      </div>

      {hasAppointments && (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="p-6 flex flex-col">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  {appointment.title}
                </h3>
                {appointment.subtitle && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {appointment.subtitle}
                  </p>
                )}
                <div className="text-sm text-muted-foreground mb-3">
                  <p className="font-medium">
                    {formatDate(appointment.startDate)}
                  </p>
                  <p>
                    {formatTime(appointment.startDate)} -{' '}
                    {formatTime(appointment.endDate)}
                  </p>
                </div>
                {appointment.address?.meetingAt && (
                  <p className="text-sm text-muted-foreground">
                    📍 {appointment.address.meetingAt}
                  </p>
                )}
                {appointment.description && (
                  <p className="text-sm mt-3 line-clamp-3">
                    {appointment.description}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* {hasIframe && (
        <Card className="mt-8 w-full flex justify-center">
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full border-0"
              data-tina-field={tinaField(data, 'churchToolsLink')}
              src={data.churchToolsLink || ''}
            ></iframe>
          </div>
        </Card>
      )} */}
    </Section>
  );
};

export const eventsBlockSchema: Template = {
  name: 'events',
  label: 'Events',
  ui: {
    previewSrc: '/blocks/features.png',
    defaultItem: {
      title: 'Kommende Veranstaltungen',
      description:
        'Seien Sie dabei und erleben Sie Gemeinschaft bei unseren verschiedenen Veranstaltungen. Jeder ist herzlich willkommen!',
      churchToolsLink: '',
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
    },
    {
      type: 'number',
      label: 'Calendar ID',
      name: 'calendarId',
      description:
        'The ChurchTools calendar ID to fetch appointments from. Leave empty to skip fetching appointments.',
    },
    {
      type: 'string',
      label: 'Church Tools Link',
      name: 'churchToolsLink',
      description:
        'Link to the Church Tools event page for the embedded iframe. Optional if using Calendar ID above.',
    },
  ],
};
