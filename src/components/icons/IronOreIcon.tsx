import React from 'react';

export const IronOreIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    {/* Rock Body Dark */}
    <path fill="#404040" d="M3 5h10v7H3z M5 4h6v1H5z M4 12h8v1H4z"/>
    {/* Rock Body Medium */}
    <path fill="#525252" d="M4 5h8v6H4z"/>
    {/* Rock Body Light highlights */}
    <path fill="#737373" d="M5 5h1v1H5z M10 5h1v1h-1z M4 7h1v1H4z M11 8h1v1h-1z M5 10h1v1H5z M10 10h1v1h-1z"/>
    {/* Iron Veins */}
    <path fill="#b91c1c" d="M6 6h1v2H6z M9 7h1v3H9z M7 9h1v1H7z"/>
    <path fill="#f87171" d="M7 6h1v1H7z M10 7h1v1h-1z M6 9h1v1H6z"/>
  </svg>
);