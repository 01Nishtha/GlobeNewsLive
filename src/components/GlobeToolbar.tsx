'use client';

import React, { useState } from 'react';
import { Grid2x2, ImageIcon, ZoomIn, ZoomOut } from 'lucide-react';
import * as THREE from 'three';

export interface GlobeToolbarProps {
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
  globeRef: React.RefObject<THREE.Mesh>;
  sceneRef: React.RefObject<THREE.Scene>;
}

export const useGlobeControls = (
  cameraRef: React.RefObject<THREE.PerspectiveCamera>,
  globeRef: React.RefObject<THREE.Mesh>,
) => {
  const zoomIn = () => {
    const camera = cameraRef.current;
    if (!camera) return;
    camera.position.z = Math.max(1.5, camera.position.z - 0.3);
    camera.updateProjectionMatrix();
  };

  const zoomOut = () => {
    const camera = cameraRef.current;
    if (!camera) return;
    camera.position.z = Math.min(5.0, camera.position.z + 0.3);
    camera.updateProjectionMatrix();
  };

  const toggleWireframe = (enabled: boolean) => {
    const material = globeRef.current?.material;
    const materials = Array.isArray(material) ? material : material ? [material] : [];
    materials.forEach((entry) => {
      if ('wireframe' in entry) {
        entry.wireframe = enabled;
        entry.needsUpdate = true;
      }
    });
  };

  return { zoomIn, zoomOut, toggleWireframe };
};

function ToolbarButton({
  title,
  active = false,
  onClick,
  children,
}: {
  title: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center transition-all"
      style={{
        background: 'rgba(6,11,20,0.85)',
        border: `1px solid ${active ? '#00d4ff' : 'var(--border-dim)'}`,
        borderRadius: 6,
        color: active ? '#00d4ff' : 'var(--text-primary)',
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.boxShadow = '0 0 8px rgba(0,212,255,0.35)';
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </button>
  );
}

export default function GlobeToolbar({ cameraRef, globeRef, sceneRef }: GlobeToolbarProps) {
  const [arcsVisible, setArcsVisible] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const controls = useGlobeControls(cameraRef, globeRef);

  const toggleArcs = () => {
    const nextVisible = !arcsVisible;
    setArcsVisible(nextVisible);
    const overlay = sceneRef.current?.getObjectByName('missile-arc-overlay');
    if (overlay) overlay.visible = nextVisible;
  };

  const toggleWireframe = () => {
    const nextWireframe = !wireframe;
    setWireframe(nextWireframe);
    controls.toggleWireframe(nextWireframe);
  };

  return (
    <div
      className="absolute z-20 flex flex-col"
      style={{ right: 12, top: '50%', transform: 'translateY(-50%)', gap: 6 }}
    >
      <ToolbarButton title="Zoom in" onClick={controls.zoomIn}>
        <ZoomIn size={17} strokeWidth={1.8} />
      </ToolbarButton>
      <ToolbarButton title="Zoom out" onClick={controls.zoomOut}>
        <ZoomOut size={17} strokeWidth={1.8} />
      </ToolbarButton>
      <ToolbarButton title="Toggle missile arcs" active={arcsVisible} onClick={toggleArcs}>
        <Grid2x2 size={17} strokeWidth={1.8} />
      </ToolbarButton>
      <ToolbarButton title="Toggle wireframe globe" active={wireframe} onClick={toggleWireframe}>
        <ImageIcon size={17} strokeWidth={1.8} />
      </ToolbarButton>
    </div>
  );
}
