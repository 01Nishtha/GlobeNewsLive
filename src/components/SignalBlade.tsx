'use client';

import { Signal } from '@/types';
import { Blade } from '@/components/ui/Blade';
import SignalFeed from '@/components/SignalFeed';
import { Radio, Filter } from 'lucide-react';

interface SignalBladeProps {
  signals: Signal[];
  loading?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onSignalClick?: (signal: Signal) => void;
}

export function SignalBlade({
  signals,
  loading,
  isOpen,
  onToggle,
  onSignalClick,
}: SignalBladeProps) {
  const criticalCount = signals.filter(s => s.severity === 'CRITICAL').length;

  return (
    <Blade
      position="left"
      title="Signal Feed"
      titleAccent={criticalCount > 0 ? `${criticalCount} CRITICAL` : undefined}
      icon={<Radio className="w-4 h-4" />}
      isOpen={isOpen}
      onToggle={onToggle}
      width={360}
      headerAction={
        <button className="p-1.5 rounded hover:bg-white/5 text-text-dim hover:text-text-secondary transition-colors">
          <Filter className="w-3.5 h-3.5" />
        </button>
      }
    >
      <div className="h-full overflow-hidden">
        <SignalFeed signals={signals} loading={loading} onSignalClick={onSignalClick} />
      </div>
    </Blade>
  );
}
