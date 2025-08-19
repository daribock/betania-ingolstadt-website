import { cn } from '@/lib/utils';

export const Typography = ({
  children,
  size = 'lg',
  className,
}: {
  children: React.ReactNode;
  size?: 'sm' | 'base' | 'lg' | 'xl';
  className?: string;
}) => {
  return (
    <div
      className={cn('prose', className, {
        'prose-sm': size === 'sm',
        'prose-lg': size === 'lg',
        'prose-xl': size === 'xl',
      })}
    >
      {children}
    </div>
  );
};
