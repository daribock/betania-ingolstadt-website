'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { ReactNode, useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface LocaleSwitcherSelectProps {
  options: { key: string; label: ReactNode; value: string }[];
  defaultValue: string;
  label: string;
  className?: string;
}

export default function LocaleSwitcherSelect({
  options,
  defaultValue,
  label,
  className,
}: LocaleSwitcherSelectProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onValueChange(nextLocale: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error FIXME: fix later
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <div className="relative">
      <span className="sr-only">{label}</span>
      <Select
        defaultValue={defaultValue}
        disabled={isPending}
        onValueChange={onValueChange}
      >
        <SelectTrigger
          className={cn(
            'w-fit text-sm text-muted-foreground shadow-none bg-transparent',
            className
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            if (option) {
              return (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              );
            }
            return null;
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
