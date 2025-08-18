import { cn } from '@/lib/utils';

export const Typography = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn('prose prose-lg', className)}>{children}</div>;
};
