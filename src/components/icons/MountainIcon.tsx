import React from 'react';

export const MountainIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    <rect fill="transparent" width="24" height="24" />
    {/* Snow cap */}
    <path fill="#ffffff" d="M12 6l-2 3h4z M11 7h2v1h-2z" />
    {/* Mountain body */}
    <path fill="#6b7280" d="M10 9l-5 8h14l-5-8h-4z" />
    {/* Mountain shadow */}
    <path fill="#4b5563" d="M12 9v8h6l-5-8h-1z" />
  </svg>
);