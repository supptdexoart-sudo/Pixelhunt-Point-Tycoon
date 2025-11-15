import React from 'react';

export const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <path fill="#4b5563" d="M3 3h10v10H3z" />
    <path fill="#6b7280" d="M4 4h8v8H4z" />
    <path fill="#9ca3af" d="M7 5h2v6H7z M5 7h6v2H5z"/>
  </svg>
);