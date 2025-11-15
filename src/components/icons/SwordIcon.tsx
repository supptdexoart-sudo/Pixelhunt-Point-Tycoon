import React from 'react';

export const SwordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    {/* Blade */}
    <path fill="#9ca3af" d="M7 3h2v8H7z" />
    <path fill="#d1d5db" d="M8 3h1v7H8z" />
    <path fill="#6b7280" d="M6 10h4v1H6z" />
    {/* Hilt */}
    <path fill="#4b5563" d="M5 11h6v1H5z" />
    <path fill="#374151" d="M7 12h2v2H7z" />
  </svg>
);