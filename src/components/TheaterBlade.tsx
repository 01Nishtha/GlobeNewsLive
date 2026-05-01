'use client';

import { useState } from 'react';
import { Blade } from '@/components/ui/Blade';
import { Map, Plane, Ship, Activity, Globe } from 'lucide-react';
import { HoloCard } from '@/components/ui/HoloCard';

interface TheaterBladeProps {
  isOpen: boolean;
  onToggle: () => void;
}

type TheaterTab = 'theaters' | 'flights' | 'ships' | 'tracking';

export function TheaterBlade({ isOpen, onToggle }: TheaterBladeProps) {
  const [activeTab, setActiveTab] = useState<TheaterTab>('theaters');

  return (
    <Blade
      position="right"
      title="Theater"
      icon={<Globe className="w-4 h-4" />}
      isOpen={isOpen}
      onToggle={onToggle}
      width={380}
    >
      <div className="h-full flex flex-col">
        {/* Tabs */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-border-subtle">
          <TabButton active={activeTab === 'theaters'} onClick={() => setActiveTab('theaters')} icon={<Map className="w-3 h-3" />} label="Regions" />
          <TabButton active={activeTab === 'flights'} onClick={() => setActiveTab('flights')} icon={<Plane className="w-3 h-3" />} label="Flights" />
          <TabButton active={activeTab === 'ships'} onClick={() => setActiveTab('ships')} icon={<Ship className="w-3 h-3" />} label="Maritime" />
          <TabButton active={activeTab === 'tracking'} onClick={() => setActiveTab('tracking')} icon={<Activity className="w-3 h-3" />} label="Tracking" />
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          {activeTab === 'theaters' && (
            <div className="space-y-3">
              <TheaterCard name="Middle East" status="SEVERE" conflicts={4} intensity={98} />
              <TheaterCard name="Eastern Europe" status="HIGH" conflicts={2} intensity={87} />
              <TheaterCard name="East Asia" status="ELEVATED" conflicts={1} intensity={64} />
              <TheaterCard name="Sahel / Sudan" status="HIGH" conflicts={3} intensity={82} />
              <TheaterCard name="South Asia" status="GUARDED" conflicts={1} intensity={45} />
            </div>
          )}
          {activeTab === 'flights' && (
            <div className="space-y-2">
              <p className="text-caption text-text-tertiary">Flight tracking integration will appear here.</p>
            </div>
          )}
          {activeTab === 'ships' && (
            <div className="space-y-2">
              <p className="text-caption text-text-tertiary">Maritime tracking integration will appear here.</p>
            </div>
          )}
          {activeTab === 'tracking' && (
            <div className="space-y-2">
              <p className="text-caption text-text-tertiary">Multi-source tracking overlay controls.</p>
            </div>
          )}
        </div>
      </div>
    </Blade>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-mono font-medium transition-colors ${
        active
          ? 'bg-void-raised text-text-primary border border-border-default'
          : 'text-text-tertiary hover:text-text-secondary hover:bg-white/[0.03]'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function TheaterCard({
  name,
  status,
  conflicts,
  intensity,
}: {
  name: string;
  status: string;
  conflicts: number;
  intensity: number;
}) {
  const statusColor =
    status === 'SEVERE'
      ? 'text-critical-500 bg-critical-500/10 border-critical-500/20'
      : status === 'HIGH'
      ? 'text-high-500 bg-high-500/10 border-high-500/20'
      : status === 'ELEVATED'
      ? 'text-elevated-500 bg-elevated-500/10 border-elevated-500/20'
      : 'text-guarded-500 bg-guarded-500/10 border-guarded-500/20';

  return (
    <HoloCard hover className="p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="font-display text-heading text-text-primary">{name}</span>
        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${statusColor}`}>{status}</span>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <div className="text-display-hero text-text-primary">{conflicts}</div>
          <div className="text-label text-text-tertiary">CONFLICTS</div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-caption text-text-tertiary">Intensity</span>
            <span className="text-caption text-text-secondary font-mono">{intensity}%</span>
          </div>
          <div className="h-1.5 bg-void-mid rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${intensity}%`,
                background:
                  status === 'SEVERE'
                    ? 'linear-gradient(90deg, #ff1a1a, #ff4747)'
                    : status === 'HIGH'
                    ? 'linear-gradient(90deg, #ff9500, #ffb340)'
                    : status === 'ELEVATED'
                    ? 'linear-gradient(90deg, #f0c000, #f5d547)'
                    : 'linear-gradient(90deg, #00d4ff, #47dfff)',
              }}
            />
          </div>
        </div>
      </div>
    </HoloCard>
  );
}
