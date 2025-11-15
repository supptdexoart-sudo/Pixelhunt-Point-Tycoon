import React from 'react';

export const ShardClusterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    <path fill="#0891b2" d="M12 5L10 9h4L12 5z M10 9l-4 2 4 7 3-9H10z M14 9l4 2-4 7-3-9h3z M10 9h4l-2 8-2-8z" />
    <path fill="#22d3ee" d="M12 6L11 9h2L12 6z M11 9l-3 2 3 6 2-8H11z M13 9l3 2-3 6-2-8h2z M11 9h2l-1 6-1-6z" />
    <path fill="#a5f3fc" d="M12 7l-1 2h2l-1-2z M9 11l2 5-1-5H9z M15 11l-2 5 1-5h1z" />
  </svg>
);