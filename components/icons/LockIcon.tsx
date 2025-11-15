import React from 'react';

export const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    {/* Lock Body */}
    <path fill="#a3a3a3" d="M4 7h8v6H4z" />
    <path fill="#fde047" d="M5 7h6v5H5z" />
    {/* Lock Shackle */}
    <path fill="#a3a3a3" d="M6 4h4v3H6z" />
    <path fill="#737373" d="M5 4h1v3H5z M10 4h1v3h-1z" />
    <path fill="#d4d4d4" d="M6 3h4v1H6z" />
    {/* Keyhole */}
    <path fill="#404040" d="M7 9h2v2H7z" />
  </svg>
);
