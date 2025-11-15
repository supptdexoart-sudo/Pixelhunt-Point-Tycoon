import React from 'react';

export const GoldenHandIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Hand */}
    <path fill="#facc15" d="M9 9h2v8H9z M11 9h2v6h-2z M13 9h2v5h-2z M15 10h1v3h-1z" />
    <path fill="#eab308" d="M8 17h8v2H8z" />
    {/* Sparkles */}
    <path fill="#fef08a" d="M7 8h1v1H7z M17 9h1v1h-1z M8 13h1v1H8z M16 15h1v1h-1z M12 5h1v1h-1z" />
  </svg>
);