'use client';

import { ThreatLevel } from '@/types';
import { cn } from '@/lib/utils';

interface AmbientPulseProps {
  level: ThreatLevel;
}

export function AmbientPulse({ level }: AmbientPulseProps) {
  return (
    <div
      className={cn(
        'ambient-pulse active',
        level === 'SEVERE' && 'ambient-pulse-severe',
        level === 'HIGH' && 'ambient-pulse-high',
        level === 'ELEVATED' && 'ambient-pulse-elevated',
        level === 'GUARDED' && 'ambient-pulse-guarded',
        level === 'LOW' && 'ambient-pulse-low'
      )}
    />
  );
}
