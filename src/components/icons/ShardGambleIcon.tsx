import React from 'react';

export const ShardGambleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Shard */}
    <path d="M12 2L8 9h8L12 2z" fill="#a5f3fc" />
    <path d="M8 9l-5 3 5 10 4-12H8z" fill="#22d3ee" />
    <path d="M16 9l5 3-5 10-4-12h4z" fill="#06b6d4" />
    <path d="M8 9h8l-4 13L8 9z" fill="#0891b2" />
    {/* Question Mark */}
    <g transform="translate(0 -1)">
    <path fill="#facc15" d="M11 9h2v2h-2z M10 10h1v1h-1z M13 10h1v1h-1z M10 11h1v1h-1z M13 11h1v1h-1z M11 12h2v2h-2z M11 14h2v2h-2z"/>
    <path fill="#eab308" d="M12 9h1v1h-1z M11 10h1v1h-1z M12 11h1v1h-1z M12 13h1v1h-1z M12 15h1v1h-1z"/>
    </g>
  </svg>
);