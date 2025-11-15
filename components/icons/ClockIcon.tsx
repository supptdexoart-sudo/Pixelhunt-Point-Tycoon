import React from 'react';

export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Clock face */}
    <path fill="#d1d5db" d="M6 6h12v12H6z" />
    <path fill="#f9fafb" d="M7 7h10v10H7z" />
    {/* Hands */}
    <path fill="#111827" d="M11 7h2v6h-2z M11 12h5v2h-5z" />
    {/* Markings */}
    <path fill="#6b7280" d="M11 6h2v1h-2z M17 11h1v2h-1z M11 17h2v1h-2z M6 11h1v2H6z" />
  </svg>
);
