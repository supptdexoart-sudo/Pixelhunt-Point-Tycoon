import React from 'react';

export const MetronomeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Base */}
    <path fill="#a16207" d="M8 18h8v2H8z" />
    <path fill="#ca8a04" d="M9 17h6v1H9z" />
    {/* Body */}
    <path fill="#fef3c7" d="M9 7h6v10H9z" />
    <path fill="#fde68a" d="M10 8h4v8h-4z" />
    {/* Arm */}
    <path fill="#422006" d="M11 5h2v10h-2z" />
    {/* Weight */}
    <path fill="#dc2626" d="M10 10h4v2h-4z" />
  </svg>
);