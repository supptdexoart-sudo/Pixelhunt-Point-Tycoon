import React from 'react';

export const PathIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Post */}
    <path fill="#a16207" d="M11 8h2v12h-2z" />
    <path fill="#ca8a04" d="M12 8h1v12h-1z" />
    
    {/* Sign 1 (pointing left) */}
    <path fill="#fde047" d="M3 9h9v3H3z" />
    <path fill="#eab308" d="M3 10h8v1H3z" />
    <path fill="#422006" d="M4 10h1v1H4z M6 10h1v1H6z M8 10h1v1H8z" />
    
    {/* Sign 2 (pointing right) */}
    <path fill="#fde047" d="M12 13h9v3h-9z" />
    <path fill="#eab308" d="M13 14h8v1h-8z" />
    <path fill="#422006" d="M14 14h1v1h-1z M16 14h1v1h-1z M18 14h1v1h-1z" />
  </svg>
);
