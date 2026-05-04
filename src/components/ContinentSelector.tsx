'use client';

import React, { useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import * as THREE from 'three';

export interface ContinentSelectorProps {
  globeRef: React.RefObject<THREE.Mesh>;
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
}

const CONTINENTS = {
  Global: { lat: 0, lon: 0, zoom: 2.8 },
  Africa: { lat: 0, lon: 20, zoom: 2.4 },
  Americas: { lat: 15, lon: -90, zoom: 2.6 },
  Asia: { lat: 35, lon: 90, zoom: 2.3 },
  Europe: { lat: 52, lon: 15, zoom: 2.8 },
  'Middle East': { lat: 27, lon: 45, zoom: 2.5 },
  Oceania: { lat: -25, lon: 135, zoom: 2.6 },
} as const;

type ContinentName = keyof typeof CONTINENTS;

function lerp(current: number, target: number, amount: number): number {
  return current + (target - current) * amount;
}

export default function ContinentSelector({ globeRef, cameraRef }: ContinentSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ContinentName>('Global');
  const frameRef = useRef<number | null>(null);
  const names = useMemo(() => Object.keys(CONTINENTS) as ContinentName[], []);

  const focusContinent = (name: ContinentName) => {
    setSelected(name);
    setOpen(false);

    const globe = globeRef.current;
    const camera = cameraRef.current;
    if (!globe || !camera) return;

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);

    const target = CONTINENTS[name];
    const targetRotY = THREE.MathUtils.degToRad(-target.lon);
    const targetRotX = THREE.MathUtils.degToRad(target.lat * 0.55);

    const animate = () => {
      globe.rotation.y = lerp(globe.rotation.y, targetRotY, 0.05);
      globe.rotation.x = lerp(globe.rotation.x, targetRotX, 0.05);
      camera.position.z = lerp(camera.position.z, target.zoom, 0.05);
      camera.updateProjectionMatrix();

      const done =
        Math.abs(globe.rotation.y - targetRotY) < 0.001 &&
        Math.abs(globe.rotation.x - targetRotX) < 0.001 &&
        Math.abs(camera.position.z - target.zoom) < 0.001;

      if (!done) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="absolute left-3 top-3 z-20 font-mono text-[11px] uppercase tracking-[1.5px]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 px-3 py-2 font-semibold transition-colors"
        style={{
          background: 'rgba(6,11,20,0.88)',
          border: '1px solid var(--border-dim)',
          borderRadius: 6,
          color: 'var(--text-primary)',
        }}
      >
        <span>CONTINENT</span>
        <ChevronDown size={14} strokeWidth={1.8} />
      </button>

      {open && (
        <div
          className="absolute left-0 top-[calc(100%+6px)] min-w-[150px] overflow-hidden"
          style={{
            background: '#0a1020',
            border: '1px solid var(--border-dim)',
            borderRadius: 6,
          }}
        >
          {names.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => focusContinent(name)}
              className="block w-full px-3 py-2 text-left transition-colors hover:bg-[rgba(0,212,255,0.08)]"
              style={{
                color: selected === name ? '#00d4ff' : 'var(--text-primary)',
                fontWeight: selected === name ? 700 : 500,
              }}
            >
              {name.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
