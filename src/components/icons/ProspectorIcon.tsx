import React from 'react';

export const ProspectorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Handle */}
    <path fill="#a16207" d="M6 6h2v12H6z" />
    <path fill="#ca8a04" d="M7 6h1v12H7z" />
    {/* Pickaxe Head */}
    <path fill="#9ca3af" d="M8 6h10v2H8z" />
    <path fill="#d1d5db" d="M9 6h8v1H9z" />
    {/* Points */}
    <path fill="#6b7280" d="M18 6h1v2h-1z M19 7h1v1h-1z" />
  </svg>
);