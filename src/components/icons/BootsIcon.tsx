import React from 'react';

export const BootsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <path fill="#4b5563" d="M4 6h3v6H4z M9 6h3v6H9z" />
    <path fill="#374151" d="M4 12h3v1H4z M9 12h3v1H9z" />
    <path fill="#6b7280" d="M5 6h1v6H5z M10 6h1v6h-1z" />
  </svg>
);