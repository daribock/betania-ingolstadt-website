'use client';
import { useTina } from 'tinacms/dist/react';
import { Blocks } from '@/components/blocks';
import { PageQuery } from '@/tina/__generated__/types';
import ErrorBoundary from '@/components/error-boundary';
import type { AppointmentsMap } from '@/lib/prefetch-events';

export interface ClientPageProps {
  data: {
    page: PageQuery['page'];
  };
  variables: {
    relativePath: string;
  };
  query: string;
  appointmentsMap?: AppointmentsMap;
}

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({ ...props });
  return (
    <ErrorBoundary>
      <Blocks {...data?.page} appointmentsMap={props.appointmentsMap} />
    </ErrorBoundary>
  );
}
