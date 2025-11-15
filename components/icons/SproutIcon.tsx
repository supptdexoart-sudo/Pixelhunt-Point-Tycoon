import React from 'react';

export const SproutIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Stem */}
    <path fill="#22c55e" d="M11 10h2v8h-2z" />
    {/* Leaves */}
    <path fill="#4ade80" d="M11 12l-4-2v2h4z M13 12l4-2v2h-4z" />
    <path fill="#16a34a" d="M11 14l-3-1v1h3z M13 14l3-1v1h-3z" />
  </svg>
);
