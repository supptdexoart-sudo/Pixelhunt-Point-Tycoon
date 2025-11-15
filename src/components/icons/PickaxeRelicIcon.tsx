import React from 'react';

export const PickaxeRelicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} shapeRendering="crispEdges">
    {/* Relic in background */}
    <path fill="#a855f7" d="M12 11l-2 2v2l-2 2v1l4 4 4-4v-1l-2-2v-2l-2-2z" opacity="0.7"/>
    <path fill="#c084fc" d="M12 12.4L13 13.4h-2L12 12.4z M11 15h2v1.4l2-2h-1v-1l-2 2-2-2v1h-1l2 2V15z" opacity="0.7"/>
    {/* Pickaxe */}
    <path fill="#a16207" d="M4 14l1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1h1v1l-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1h-1v-1z" />
    <path fill="#ca8a04" d="M5 14l1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1h-1v1l-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1h-1v-1z" />
    <path fill="#9ca3af" d="M17 3h2v2h-2z M18 5h1v1h-1z M16 4h1v1h-1z M3 17h2v2H3z M4 16h1v1H4z M5 18h1v1h-1z" />
  </svg>
);