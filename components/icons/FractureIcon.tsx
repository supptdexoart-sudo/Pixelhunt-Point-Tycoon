import React from 'react';

export const FractureIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Diamond Shape */}
    <path fill="#67e8f9" d="M12 4L4 12l8 8 8-8z" />
    <path fill="#a5f3fc" d="M12 4l-7 7h14z M12 20l-7-7h14z" />
    <path fill="#22d3ee" d="M12 4v16l7-7-7-9z" />
    <path fill="#06b6d4" d="M12 4v16l-7-7 7-9z" />
    {/* Crack */}
    <path fill="#111827" d="M11 4h1v6h-1z M11 9h1v1h-1z M8 13h4v1H8z M11 15h1v5h-1z M12 10h4v1h-4z" />
  </svg>
);
