import React from 'react';

export const PriceTagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    <path fill="#dc2626" d="M5 9l4-4h10v10l-4 4H9L5 9z" />
    <path fill="#ef4444" d="M10 6h8v8l-3 3H9l-3-3V9l4-3z" />
    <path fill="#fee2e2" d="M16 8h2v2h-2z" />
    <path fill="#ffffff" d="M12 10h2v5h-2z M9 15h8v2H9z M10 14h1v1h-1z M15 14h1v1h-1z" />
  </svg>
);