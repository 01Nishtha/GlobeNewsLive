'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HoloCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  noPadding?: boolean;
}

export function HoloCard({ children, className, hover = true, noPadding = false }: HoloCardProps) {
  return (
    <div
      className={cn(
        'holo-card',
        hover && 'holo-card-hover',
        !noPadding && 'p-3',
        className
      )}
    >
      {children}
    </div>
  );
}
