'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

export type BladePosition = 'left' | 'right' | 'top' | 'bottom';

interface BladeProps {
  children: ReactNode;
  position: BladePosition;
  title?: string;
  titleAccent?: string;
  icon?: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  width?: number;
  height?: number;
  className?: string;
  headerAction?: ReactNode;
}

export function Blade({
  children,
  position,
  title,
  titleAccent,
  icon,
  isOpen,
  onToggle,
  width = 340,
  height = 200,
  className,
  headerAction,
}: BladeProps) {
  const isVertical = position === 'left' || position === 'right';
  const isHorizontal = position === 'top' || position === 'bottom';

  const positionClasses = {
    left: 'left-0 top-0 bottom-0 border-r border-void-mid/50',
    right: 'right-0 top-0 bottom-0 border-l border-void-mid/50',
    top: 'top-0 left-0 right-0 border-b border-void-mid/50',
    bottom: 'bottom-0 left-0 right-0 border-t border-void-mid/50',
  };

  const collapsedSize = isVertical ? 44 : 40;
  const sizeStyle = isVertical
    ? { width: isOpen ? width : collapsedSize }
    : { height: isOpen ? height : collapsedSize };

  const toggleIcon = {
    left: isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />,
    right: isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />,
    top: isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />,
    bottom: isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />,
  };

  return (
    <div
      className={cn(
        'fixed z-20 flex transition-all duration-500 ease-orbital',
        positionClasses[position],
        className
      )}
      style={sizeStyle}
    >
      {/* Collapsed Rail */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className={cn(
            'flex items-center justify-center bg-void-mid/90 backdrop-blur-xl hover:bg-void-raised/95 transition-colors',
            isVertical ? 'w-full h-full flex-col gap-2 py-4' : 'h-full w-full flex-row gap-2 px-4'
          )}
        >
          {icon && <div className="text-text-tertiary">{icon}</div>}
          {title && (
            <span
              className={cn(
                'font-mono text-[10px] font-semibold tracking-widest text-text-tertiary whitespace-nowrap',
                isVertical && 'writing-mode-vertical'
              )}
              style={isVertical ? { writingMode: 'vertical-rl', textOrientation: 'mixed' } : {}}
            >
              {title}
            </span>
          )}
        </button>
      )}

      {/* Expanded Panel */}
      {isOpen && (
        <div className="flex-1 flex flex-col bg-void-mid/85 backdrop-blur-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-border-subtle bg-white/[0.02]">
            <div className="flex items-center gap-2">
              {icon && <div className="text-text-tertiary">{icon}</div>}
              <div className="flex items-baseline gap-2">
                {title && (
                  <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-text-tertiary uppercase">
                    {title}
                  </span>
                )}
                {titleAccent && (
                  <span className="font-mono text-[10px] font-bold text-text-primary">
                    {titleAccent}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {headerAction}
              <button
                onClick={onToggle}
                className="p-1 rounded hover:bg-white/5 text-text-dim hover:text-text-secondary transition-colors"
              >
                {toggleIcon[position]}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden relative">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
