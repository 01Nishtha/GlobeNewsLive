'use client';

import { MarketData } from '@/types';
import { Blade } from '@/components/ui/Blade';
import { TrendingUp } from 'lucide-react';

interface MarketBladeProps {
  markets: MarketData[];
  loading?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export function MarketBlade({ markets, loading, isOpen, onToggle }: MarketBladeProps) {
  return (
    <Blade
      position="bottom"
      title="Markets"
      icon={<TrendingUp className="w-4 h-4" />}
      isOpen={isOpen}
      onToggle={onToggle}
      height={180}
    >
      <div className="h-full flex items-center px-4 gap-6 overflow-x-auto custom-scrollbar">
        {loading && markets.length === 0 ? (
          <div className="flex items-center gap-6 animate-pulse">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-32 h-16 bg-void-raised rounded-lg" />
            ))}
          </div>
        ) : (
          markets.map(market => (
            <MarketPill key={market.symbol} market={market} />
          ))
        )}
      </div>
    </Blade>
  );
}

function MarketPill({ market }: { market: MarketData }) {
  const isUp = market.direction === 'up';
  const color = isUp ? 'text-low-500' : 'text-critical-500';
  const bg = isUp ? 'bg-low-500/8' : 'bg-critical-500/8';
  const border = isUp ? 'border-low-500/15' : 'border-critical-500/15';

  return (
    <div className={`flex flex-col justify-center px-4 py-2 rounded-lg border ${border} ${bg} min-w-[140px]`}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-caption text-text-tertiary font-mono">{market.symbol}</span>
        <span className={`text-caption font-mono font-semibold ${color}`}>
          {isUp ? '+' : ''}{market.change}
        </span>
      </div>
      <div className="text-mono-data text-text-primary font-mono mt-1">{market.value}</div>
      <div className="text-caption text-text-tertiary">{market.name}</div>
    </div>
  );
}
