import React from 'react';

export const ReticleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Outer circle parts */}
    <path fill="#e5e7eb" d="M9 4h6v1H9z M16 5h1v2h-1z M7 5h1v2H7z M5 7h2v1H5z M17 7h2v1h-2z M4 9h1v6H4z M19 9h1v6h-1z M5 16h2v1H5z M17 16h2v1h-2z M7 17h1v2H7z M16 17h1v2h-1z M9 19h6v1H9z" />
    {/* Crosshairs */}
    <path fill="#e5e7eb" d="M11 8h2v8h-2z M8 11h8v2H8z" />
    {/* Center dot */}
    <path fill="#ef4444" d="M11 11h2v2h-2z" />
  </svg>
);