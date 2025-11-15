import React from 'react';

export const ScoutIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    {/* Hood */}
    <path fill="#166534" d="M3 3h10v1H3z M3 4h1v8H3z M12 4h1v8h-1z M4 12h8v1H4z"/>
    <path fill="#22c55e" d="M4 4h8v1H4z M4 5h1v6H4z M11 5h1v6h-1z M5 11h6v1H5z"/>
    {/* Face Shadow */}
    <path fill="#a16207" d="M5 5h6v5H5z"/>
    {/* Face Skin */}
    <path fill="#fde047" d="M6 6h4v3H6z"/>
    {/* Eyes */}
    <path fill="#000000" d="M7 7h1v1H7z M9 7h1v1H9z"/>
  </svg>
);