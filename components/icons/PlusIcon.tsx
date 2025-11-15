import React from 'react';

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    <path fill="#fde047" d="M11 4h2v16h-2z M4 11h16v2H4z" />
  </svg>
);