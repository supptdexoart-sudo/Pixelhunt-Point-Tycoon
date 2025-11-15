import React from 'react';

export const LensIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Frame */}
    <path fill="#64748b" d="M8 6h8v1H8z M7 7h1v1H7z M16 7h1v1h-1z M6 8h1v8H6z M17 8h1v8h-1z M7 16h1v1H7z M16 16h1v1h-1z M8 17h8v1H8z" />
    {/* Lens */}
    <path fill="#a5f3fc" d="M8 7h8v10H8z" />
    <path fill="#e0f2fe" d="M9 8h6v8H9z" />
    {/* Glint */}
    <path fill="#ffffff" d="M10 9h2v2h-2z" />
  </svg>
);