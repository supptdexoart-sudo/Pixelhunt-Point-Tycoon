import React from 'react';

export const HelmetIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <path fill="#6b7280" d="M4 5h8v1H4z M3 6h10v1H3z M3 7h1v3H3z M12 7h1v3h-1z M4 10h8v1H4z" />
    <path fill="#9ca3af" d="M4 6h8v4H4z" />
    <path fill="#d1d5db" d="M5 7h6v2H5z" />
    <path fill="#4b5563" d="M7 7h2v1H7z" />
  </svg>
);