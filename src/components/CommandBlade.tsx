'use client';

import { useEffect, useState } from 'react';
import { ThreatLevel } from '@/types';
import { ThreatOrb } from '@/components/ui/ThreatOrb';
import { LayoutDashboard, Globe, Monitor, Sun, Moon, Search, Bell, BellOff } from 'lucide-react';

interface CommandBladeProps {
  threatLevel: ThreatLevel;
  signalCount: number;
  criticalCount: number;
  lastUpdate: Date;
  viewMode: 'dashboard' | 'warroom' | 'tv';
  onViewModeChange: (mode: 'dashboard' | 'warroom' | 'tv') => void;
  isDark: boolean;
  onThemeToggle: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  onSearchOpen: () => void;
  focusMode: boolean;
  onFocusToggle: () => void;
}

export function CommandBlade({
  threatLevel,
  signalCount,
  criticalCount,
  lastUpdate,
  viewMode,
  onViewModeChange,
  isDark,
  onThemeToggle,
  soundEnabled,
  onSoundToggle,
  onSearchOpen,
  focusMode,
  onFocusToggle,
}: CommandBladeProps) {
  const [time, setTime] = useState(new Date());
  const [updateAgo, setUpdateAgo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setUpdateAgo(Math.floor((Date.now() - lastUpdate.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [lastUpdate]);

  const utcTime = time.toISOString().substring(11, 19);

  return (
    <div className="fixed top-0 left-0 right-0 h-14 z-30 flex items-center justify-between px-4 bg-void-mid/80 backdrop-blur-xl border-b border-border-default">
      {/* Left: Logo + Threat Orb */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <ThreatOrb level={threatLevel} size={36} onClick={() => {}} />
          <div>
            <h1 className="font-mono text-sm font-bold tracking-[0.15em] text-text-primary flex items-center gap-2">
              ORBITAL
              <span className="px-1.5 py-0.5 bg-critical-500/15 text-[8px] rounded border border-critical-500/30 text-critical-500 font-bold">
                CMD
              </span>
            </h1>
            <p className="text-[9px] text-text-tertiary tracking-wide font-mono">
              {signalCount.toLocaleString()} SIGNALS
            </p>
          </div>
        </div>

        {criticalCount > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-critical-500/10 border border-critical-500/20 rounded-md">
            <div className="w-1.5 h-1.5 rounded-full bg-critical-500 animate-pulse" />
            <span className="font-mono text-[10px] font-bold text-critical-500">
              {criticalCount} CRITICAL
            </span>
          </div>
        )}
      </div>

      {/* Center: View Mode Switches */}
      <div className="hidden md:flex items-center gap-1 bg-void-raised/60 rounded-lg p-1 border border-border-subtle">
        <ModeButton
          active={viewMode === 'dashboard'}
          onClick={() => onViewModeChange('dashboard')}
          icon={<LayoutDashboard className="w-3.5 h-3.5" />}
          label="DASHBOARD"
        />
        <ModeButton
          active={viewMode === 'warroom'}
          onClick={() => onViewModeChange('warroom')}
          icon={<Globe className="w-3.5 h-3.5" />}
          label="WAR ROOM"
        />
        <ModeButton
          active={viewMode === 'tv'}
          onClick={() => onViewModeChange('tv')}
          icon={<Monitor className="w-3.5 h-3.5" />}
          label="TV MODE"
        />
      </div>

      {/* Right: Tools + Time */}
      <div className="flex items-center gap-3">
        <button
          onClick={onFocusToggle}
          className={`hidden lg:flex px-2.5 py-1.5 rounded-md text-[10px] font-mono font-semibold transition-colors ${
            focusMode
              ? 'bg-guarded-500/15 text-guarded-500 border border-guarded-500/30'
              : 'bg-void-raised/60 text-text-tertiary border border-border-subtle hover:border-border-default'
          }`}
        >
          {focusMode ? 'FOCUS ON' : 'FOCUS'}
        </button>

        <button
          onClick={onSearchOpen}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-void-raised/60 border border-border-subtle hover:border-border-default text-text-tertiary hover:text-text-secondary transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden xl:block font-mono text-[10px]">⌘K</span>
        </button>

        <button
          onClick={onSoundToggle}
          className={`p-2 rounded-md transition-colors ${
            soundEnabled
              ? 'bg-low-500/10 text-low-500'
              : 'bg-void-raised/60 text-text-dim hover:text-text-secondary'
          }`}
        >
          {soundEnabled ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={onThemeToggle}
          className="p-2 rounded-md bg-void-raised/60 text-text-dim hover:text-text-secondary transition-colors"
        >
          {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        <div className="hidden sm:flex flex-col items-end border-l border-border-subtle pl-3 ml-1">
          <div className="font-mono text-base text-text-primary tracking-wider">{utcTime}</div>
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${updateAgo < 120 ? 'bg-low-500 animate-pulse' : 'bg-elevated-500'}`} />
            <span className="font-mono text-[9px] text-text-tertiary">
              {updateAgo < 60 ? `${updateAgo}s` : `${Math.floor(updateAgo / 60)}m`} ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModeButton({
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
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-mono font-semibold transition-all ${
        active
          ? 'bg-guarded-500/15 text-guarded-500'
          : 'text-text-tertiary hover:text-text-secondary hover:bg-white/5'
      }`}
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}
