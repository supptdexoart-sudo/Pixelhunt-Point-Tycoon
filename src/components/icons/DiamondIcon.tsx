import React from 'react';

export const DiamondIcon: React.FC = () => {
    const colors = ['#ffffff', '#a5f3fc', '#22d3ee', '#06b6d4', '#0891b2', '#164e63'];
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shapeRendering="crispEdges" className="w-full h-full">
            <path fill={colors[0]} d="M8 2h1v1H8z M7 3h1v1H7z M9 3h1v1H9z M8 4h1v1H8z" />
            <path fill={colors[1]} d="M7 2h1v1H7z M9 2h1v1H9z M8 3h1v1H8z M6 4h1v1H6z M10 4h1v1h-1z M7 5h1v1H7z M9 5h1v1H9z M5 6h1v1H5z M11 6h1v1h-1z M6 7h1v1H6z M10 7h1v1h-1z M7 9h1v1H7z M9 9h1v1H9z M8 11h1v1H8z" />
            <path fill={colors[2]} d="M6 3h1v1H6z M10 3h1v1H10z M5 5h1v1H5z M11 5h1v1h-1z M4 6h1v1H4z M12 6h1v1h-1z M5 7h1v1H5z M11 7h1v1h-1z M6 8h1v1H6z M10 8h1v1h-1z M7 10h1v1H7z M9 10h1v1H9z M8 12h1v1H8z" />
            <path fill={colors[3]} d="M8 5h1v1H8z M7 6h2v1H7z M9 6h1v1H9z M8 7h1v1H8z M7 8h2v1H7z M9 8h1v1H9z M8 9h1v1H8z M8 10h1v1H8z" />
            <path fill={colors[4]} d="M4 7h1v1H4z M12 7h1v1h-1z M5 8h1v1H5z M11 8h1v1h-1z M6 9h1v1H6z M10 9h1v1h-1z M7 11h1v1H7z M9 11h1v1H9z M8 13h1v1H8z" />
            <path fill={colors[5]} d="M3 8h2v2H3z M11 8h2v2h-2z M5 10h3v2H5z M8 12h3v2H8z" />
        </svg>
    );
};