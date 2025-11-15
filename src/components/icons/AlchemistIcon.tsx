import React from 'react';

export const AlchemistIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Potion Bottle */}
    <path fill="#a5f3fc" d="M9 4h6v1H9z M8 5h8v8H8z" />
    <path fill="#67e8f9" d="M9 6h6v6H9z" />
    {/* Liquid */}
    <path fill="#a855f7" d="M9 10h6v2H9z" />
    <path fill="#c084fc" d="M10 10h4v1h-4z" />
    {/* Bubbles */}
    <path fill="#e9d5ff" d="M10 7h1v1h-1z M13 8h1v1h-1z M11 9h1v1h-1z" />
  </svg>
);