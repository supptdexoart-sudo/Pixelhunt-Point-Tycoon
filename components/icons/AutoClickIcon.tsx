import React from 'react';

export const AutoClickIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Finger */}
    <path fill="#fde047" d="M9 9h2v8H9z M11 9h2v6h-2z M13 9h2v5h-2z M15 10h1v3h-1z" />
    {/* Hand */}
    <path fill="#eab308" d="M8 17h8v2H8z" />
    {/* Click Animation */}
    <path fill="#ffffff" d="M12 7h1v1h-1z M11 6h1v1h-1z M13 6h1v1h-1z M11 8h1v1h-1z M13 8h1v1h-1z" />
    <path fill="#ffffff" d="M15 4h1v1h-1z M14 3h1v1h-1z M16 3h1v1h-1z M14 5h1v1h-1z M16 5h1v1h-1z" />
  </svg>
);