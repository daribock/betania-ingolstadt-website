import { unstable_cache } from 'next/cache';
import { ChurchToolsApiClient } from './churchtools-api';
import churchtoolsApiConfig from './config/churchtools-config';

// Singleton pattern to persist client across requests
const getClient = (): ChurchToolsApiClient => {
  const globalForChurchTools = globalThis as typeof globalThis & {
    churchtoolsClient?: ChurchToolsApiClient;
  };

  if (!globalForChurchTools.churchtoolsClient) {
    globalForChurchTools.churchtoolsClient = new ChurchToolsApiClient(
      churchtoolsApiConfig,
    );
  }

  return globalForChurchTools.churchtoolsClient;
};

export type Appointment = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  startDate: string;
  endDate: string;
  address?: {
    meetingAt?: string;
    street?: string;
    city?: string;
    zip?: string;
  };
  imageUrl?: string;
};

/**
 * Fetches upcoming appointments from ChurchTools with caching.
 * Cache is revalidated every 5 minutes (300 seconds) to match page-level revalidation.
 */
export const getCachedAppointments = unstable_cache(
  async (calendarId: number, limit: number = 3): Promise<Appointment[]> => {
    const client = getClient();

    const today = new Date().toISOString().split('T')[0];

    try {
      const response = await client.getAppointments({
        'calendar_ids[]': [calendarId],
        from: today,
      });

      console.log(response);

      if (!response.data.data) {
        return [];
      }

      // Sort by start date and limit results
      const appointments = response.data.data
        .map((item) => {
          const base = item.appointment?.base;
          const calculated = item.appointment?.calculated;

          return {
            id: base?.id?.toString() || '',
            title: base?.title || '',
            subtitle: base?.subtitle || undefined,
            description: base?.description || undefined,
            startDate: calculated?.startDate || base?.startDate || '',
            endDate: calculated?.endDate || base?.endDate || '',
            address: base?.address
              ? {
                  meetingAt: base.address.meetingAt || undefined,
                  street: base.address.street || undefined,
                  city: base.address.city || undefined,
                  zip: base.address.zip || undefined,
                }
              : undefined,
            imageUrl: undefined,
          };
        })
        .sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
        )
        .slice(0, limit);

      return appointments;
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      return [];
    }
  },
  ['churchtools-appointments'],
  { revalidate: 300 }, // 5 minutes, matching page-level revalidation
);
