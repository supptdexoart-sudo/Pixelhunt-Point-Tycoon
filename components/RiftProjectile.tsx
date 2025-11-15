import React, { useMemo } from 'react';
import { RiftProjectile as RiftProjectileType } from '../types';

interface RiftProjectileProps {
  projectile: RiftProjectileType;
  onComplete: (id: number) => void;
}

export const RiftProjectile: React.FC<RiftProjectileProps> = ({ projectile, onComplete }) => {
  const style = useMemo((): React.CSSProperties & { [key: string]: any } => {
    return {
      top: `${projectile.startY}px`,
      left: `${projectile.startX}px`,
      '--tx': `${projectile.endX - projectile.startX}px`,
      '--ty': `${projectile.endY - projectile.startY}px`,
      animationDuration: `${projectile.duration}s`,
    };
  }, [projectile]);

  return (
    <div
      className="rift-projectile"
      style={style}
      onAnimationEnd={() => onComplete(projectile.id)}
    />
  );
};