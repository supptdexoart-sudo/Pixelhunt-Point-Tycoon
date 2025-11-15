import React from 'react';

export const JournalIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 text-yellow-600 hover:text-yellow-500 ${className}`} viewBox="0 0 24 24" fill="currentColor" shapeRendering="crispEdges">
    <path d="M5 3h14v18H5z" fill="#a16207" />
    <path d="M7 5h10v14H7z" fill="#fef3c7" />
    <path d="M9 7h6v2H9z M9 11h6v2H9z M9 15h4v2H9z" fill="#78350f"/>
    <path d="M5 3h2v18H5z" fill="#78350f" />
  </svg>
);