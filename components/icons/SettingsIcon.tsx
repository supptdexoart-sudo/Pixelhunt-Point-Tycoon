import React from 'react';

export const SettingsIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 hover:text-gray-300" viewBox="0 0 24 24" fill="currentColor" shapeRendering="crispEdges">
    {/* Panel Outline */}
    <path fill="#991b1b" d="M4 4h16v16H4z" />
    {/* Panel Face */}
    <path fill="#b91c1c" d="M5 5h14v14H5z" />
    
    {/* Slider 1 Track */}
    <path fill="#7f1d1d" d="M8 7h2v10H8z" />
    {/* Slider 1 Knob */}
    <path fill="#fca5a5" d="M7 9h4v2H7z" />
    <path fill="#f87171" d="M7 10h4v1H7z" />

    {/* Slider 2 Track */}
    <path fill="#7f1d1d" d="M14 7h2v10h-2z" />
    {/* Slider 2 Knob */}
    <path fill="#fca5a5" d="M13 13h4v2h-4z" />
    <path fill="#f87171" d="M13 14h4v1h-4z" />
  </svg>
);