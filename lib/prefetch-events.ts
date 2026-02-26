import { PageBlocks } from '@/tina/__generated__/types';
import {
  getCachedAppointments,
  Appointment,
} from '@/lib/clients/churchtools/get-appointments';

export type AppointmentsMap = Record<number, Appointment[]>;

/**
 * Pre-fetches appointments for all Events blocks that have a calendarId configured.
 * Returns a map of block index -> appointments.
 */
export async function prefetchEventsAppointments(
  blocks: (PageBlocks | null)[] | null | undefined,
): Promise<AppointmentsMap> {
  if (!blocks) return {};

  const appointmentsMap: AppointmentsMap = {};
  const fetchPromises: Promise<void>[] = [];

  blocks.forEach((block, index) => {
    if (
      block &&
      block.__typename === 'PageBlocksEvents'
    ) {
      // calendarId is a new field that may not be in generated types yet
      const calendarId = (block as { calendarId?: number }).calendarId;
      if (calendarId) {
        fetchPromises.push(
          getCachedAppointments(calendarId, 3).then((appointments) => {
            appointmentsMap[index] = appointments;
          }),
        );
      }
    }
  });

  await Promise.all(fetchPromises);

  return appointmentsMap;
}
