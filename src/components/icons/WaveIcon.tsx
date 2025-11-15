import React from 'react';

export const WaveIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    <path fill="#60a5fa" d="M3 11h2v2H3z M5 9h2v6H5z M7 7h2v10H7z M9 9h2v6H9z M11 11h2v2h-2z M13 9h2v6H13z M15 7h2v10h-2z M17 9h2v6h-2z M19 11h2v2h-2z" />
  </svg>
);