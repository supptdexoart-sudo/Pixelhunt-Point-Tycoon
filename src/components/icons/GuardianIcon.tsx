import React from 'react';

export const GuardianIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Blade */}
    <path fill="#e5e7eb" d="M11 4h2v10h-2z" />
    <path fill="#f9fafb" d="M12 4h1v9h-1z" />
    {/* Crossguard */}
    <path fill="#94a3b8" d="M8 12h8v2H8z" />
    {/* Hilt */}
    <path fill="#64748b" d="M10 14h4v4h-4z" />
    {/* Pommel */}
    <path fill="#475569" d="M11 18h2v1h-2z" />
  </svg>
);
