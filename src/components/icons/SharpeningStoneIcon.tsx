import React from 'react';

export const SharpeningStoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Main body of the stone */}
    <path fill="#9ca3af" d="M6 10h12v4H6z" />
    {/* Darker bottom part */}
    <path fill="#6b7280" d="M6 12h12v2H6z" />
    {/* Highlight */}
    <path fill="#e5e7eb" d="M7 10h10v1H7z" />
    {/* Sparkle */}
    <path fill="#ffffff" d="M8 11h1v1H8z M15 11h1v1h-1z" />
  </svg>
);
