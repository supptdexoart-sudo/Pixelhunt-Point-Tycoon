import React from 'react';

export const TransmuteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Flask */}
    <path fill="#a5f3fc" d="M9 10h6v8H9z M8 18h8v2H8z" />
    <path fill="#67e8f9" d="M10 11h4v6h-4z" />
    {/* Neck */}
    <path fill="#a5f3fc" d="M11 4h2v6h-2z" />
    {/* Liquid */}
    <path fill="#a855f7" d="M10 16h4v2h-4z" />
    {/* Input Relic */}
    <path fill="#c084fc" d="M11 6h2v1h-2z M10 7h1v1h-1z M12 7h1v1h-1z" />
    {/* Output Shards */}
    <path fill="#e9d5ff" d="M6 16h1v1H6z M7 15h1v1H7z M6 18h1v1H6z" />
    <path fill="#e9d5ff" d="M17 16h1v1h-1z M16 15h1v1h-1z M17 18h1v1h-1z" />
  </svg>
);
