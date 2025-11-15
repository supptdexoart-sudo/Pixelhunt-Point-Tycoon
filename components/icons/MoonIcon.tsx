import React from 'react';

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    <path fill="#fef08a" d="M10 5h4v1h-4z M8 6h2v1H8z M14 6h2v1h-2z M7 7h1v2H7z M16 7h1v2h-1z M6 9h1v6H6z M17 9h1v6h-1z M7 15h1v2H7z M16 15h1v2h-1z M8 17h2v1H8z M14 17h2v1h-2z M10 18h4v1h-4z" />
    <path fill="#fde047" d="M9 6h1v1H9z M14 6h1v1h-1z M8 7h1v1H8z M15 7h1v1h-1z M7 8h1v1H7z M16 8h1v1h-1z M7 14h1v1H7z M16 14h1v1h-1z M8 16h1v1H8z M15 16h1v1h-1z M9 17h1v1H9z M14 17h1v1h-1z" />
  </svg>
);
