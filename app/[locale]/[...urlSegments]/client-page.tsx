'use client';
import { useTina } from 'tinacms/dist/react';
import { Blocks } from '@/components/blocks';
import { PageQuery } from '@/tina/__generated__/types';
import ErrorBoundary from '@/components/error-boundary';

export interface PageClientPageProps {
  data: {
    page: PageQuery['page'];
  };
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function ClientPage(props: PageClientPageProps) {
  const { data } = useTina({ ...props });

  return (
    <ErrorBoundary>
      <Blocks {...data?.page} />
    </ErrorBoundary>
  );
}
