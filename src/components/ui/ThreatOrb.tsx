'use client';

import { ThreatLevel } from '@/types';
import { cn } from '@/lib/utils';

interface ThreatOrbProps {
  level: ThreatLevel;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const THREAT_CONFIG: Record<ThreatLevel, { color: string; glow: string; pulseSpeed: string }> = {
  LOW: {
    color: '#00ff9d',
    glow: '0 0 20px rgba(0, 255, 157, 0.35), 0 0 40px rgba(0, 255, 157, 0.15), inset 0 0 12px rgba(0, 255, 157, 0.2)',
    pulseSpeed: '4s',
  },
  GUARDED: {
    color: '#00d4ff',
    glow: '0 0 20px rgba(0, 212, 255, 0.35), 0 0 40px rgba(0, 212, 255, 0.15), inset 0 0 12px rgba(0, 212, 255, 0.2)',
    pulseSpeed: '3.5s',
  },
  ELEVATED: {
    color: '#f0c000',
    glow: '0 0 24px rgba(240, 192, 0, 0.4), 0 0 48px rgba(240, 192, 0, 0.18), inset 0 0 14px rgba(240, 192, 0, 0.25)',
    pulseSpeed: '2.5s',
  },
  HIGH: {
    color: '#ff9500',
    glow: '0 0 28px rgba(255, 149, 0, 0.5), 0 0 56px rgba(255, 149, 0, 0.22), inset 0 0 16px rgba(255, 149, 0, 0.3)',
    pulseSpeed: '1.5s',
  },
  SEVERE: {
    color: '#ff1a1a',
    glow: '0 0 32px rgba(255, 26, 26, 0.6), 0 0 64px rgba(255, 26, 26, 0.28), 0 0 96px rgba(255, 26, 26, 0.12), inset 0 0 20px rgba(255, 26, 26, 0.35)',
    pulseSpeed: '0.8s',
  },
};

export function ThreatOrb({ level, size = 48, className, onClick }: ThreatOrbProps) {
  const config = THREAT_CONFIG[level];

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110',
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* Outer aura */}
      <div
        className="absolute inset-0 rounded-full animate-breathe"
        style={{
          background: `radial-gradient(circle, ${config.color}15 0%, transparent 70%)`,
          transform: 'scale(2)',
        }}
      />

      {/* Middle glow ring */}
      <div
        className="absolute inset-[-8px] rounded-full"
        style={{
          boxShadow: config.glow,
          animation: `breathe ${config.pulseSpeed} ease-in-out infinite`,
        }}
      />

      {/* Core orb */}
      <div
        className="relative rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 30% 30%, ${config.color} 0%, ${config.color}88 40%, ${config.color}44 100%)`,
          boxShadow: `inset -4px -4px 12px rgba(0,0,0,0.3), 0 0 16px ${config.color}66`,
        }}
      >
        {/* Specular highlight */}
        <div
          className="absolute top-[15%] left-[20%] w-[25%] h-[18%] rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)',
          }}
        />
      </div>

      {/* Particle dots for SEVERE */}
      {level === 'SEVERE' && (
        <>
          <div
            className="absolute w-1 h-1 rounded-full bg-critical-500 animate-float"
            style={{ top: '-20%', left: '10%', animationDelay: '0s' }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-critical-400 animate-float"
            style={{ top: '80%', right: '-15%', animationDelay: '0.5s' }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-critical-300 animate-float"
            style={{ bottom: '10%', left: '-20%', animationDelay: '1s' }}
          />
        </>
      )}
    </button>
  );
}
