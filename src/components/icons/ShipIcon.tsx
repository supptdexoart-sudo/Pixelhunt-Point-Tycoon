import React from 'react';

export const ShipIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Water */}
    <path fill="#22d3ee" d="M2 18h20v2H2z" />
    {/* Ship Hull */}
    <path fill="#a16207" d="M4 14h16v4H4z" />
    <path fill="#ca8a04" d="M5 15h14v2H5z" />
    {/* Mast */}
    <path fill="#78350f" d="M11 6h2v9h-2z" />
    {/* Sail */}
    <path fill="#fef3c7" d="M13 7h5v6h-5z" />
    <path fill="#fefce8" d="M14 8h3v4h-3z" />
  </svg>
);