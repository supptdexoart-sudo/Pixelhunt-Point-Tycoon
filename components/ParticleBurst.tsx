import React, { useEffect, useRef } from 'react';

interface ParticleBurstProps {
  x: number;
  y: number;
  count?: number;
  spread?: number;
  colors?: string[];
  onComplete: () => void;
}

const DEFAULT_PARTICLE_COUNT = 30;
const DEFAULT_SPREAD = 100;
const DEFAULT_COLORS = ['#facc15', '#818cf8', '#22d3ee']; // yellow-400, indigo-400, cyan-400

export const ParticleBurst: React.FC<ParticleBurstProps> = ({ x, y, count = DEFAULT_PARTICLE_COUNT, spread = DEFAULT_SPREAD, colors = DEFAULT_COLORS, onComplete }) => {
    const particlesRef = useRef<HTMLDivElement[]>([]);
    
    useEffect(() => {
        let completed = 0;
        const total = particlesRef.current.length;
        if (total === 0) {
            onComplete();
            return;
        }

        const handleAnimationEnd = () => {
            completed++;
            if (completed === total) {
                onComplete();
            }
        };

        particlesRef.current.forEach(p => {
            if(p) p.addEventListener('animationend', handleAnimationEnd, { once: true });
        });

        return () => {
             particlesRef.current.forEach(p => {
                if(p) p.removeEventListener('animationend', handleAnimationEnd);
            });
        }
    }, [onComplete]);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = Math.random() * 2 * Math.PI;
        const midRadius = Math.random() * (spread / 2) + 10;
        const endRadius = Math.random() * spread + 20;
        const midX = Math.cos(angle) * midRadius;
        const midY = Math.sin(angle) * midRadius;
        const endX = Math.cos(angle) * endRadius;
        const endY = Math.sin(angle) * endRadius;
        
        const duration = Math.random() * 0.7 + 0.6;
        const delay = Math.random() * 0.1;

        const style: React.CSSProperties & { [key: string]: any } = {
            top: `${y}px`,
            left: `${x}px`,
            '--transform-mid': `translate(${midX}px, ${midY}px)`,
            '--transform-end': `translate(${endX}px, ${endY}px)`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
        };
        
        const isGlint = Math.random() < 0.35;
        const size = isGlint ? Math.random() * 6 + 4 : Math.random() * 12 + 12;
        const particleColor = colors[Math.floor(Math.random() * colors.length)];
        
        style.width = `${size}px`;
        style.height = `${size}px`;
        style.backgroundColor = particleColor;
        style.borderRadius = '50%';
        style.boxShadow = `0 0 ${isGlint ? 10 : 4}px ${particleColor}`;
        if (isGlint) style.animationDuration = `${duration * 0.6}s`;
        
        return <div key={i} ref={el => { if(el) particlesRef.current[i] = el }} className="particle" style={style} />;
      })}
    </>
  );
};
