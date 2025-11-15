import React from 'react';

export const DaggerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Blade */}
    <path fill="#e5e7eb" d="M11 5h2v10h-2z" />
    <path fill="#f9fafb" d="M12 5h1v9h-1z" />
    <path fill="#9ca3af" d="M10 14h4v1h-4z" />
    {/* Crossguard */}
    <path fill="#4b5563" d="M8 15h8v2H8z" />
    {/* Hilt */}
    <path fill="#a16207" d="M10 17h4v2h-4z" />
    {/* Pommel */}
    <path fill="#ca8a04" d="M11 19h2v1h-2z" />
  </svg>
);