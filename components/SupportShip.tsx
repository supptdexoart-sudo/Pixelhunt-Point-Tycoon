import React from 'react';

interface SupportShipProps {
    state: 'shooting' | 'cooldown';
}

export const SupportShip: React.FC<SupportShipProps> = ({ state }) => {
    const isShooting = state === 'shooting';

    return (
        <div className="support-ship-orbit">
            <div className="support-ship-container">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    className={`support-ship-svg ${state}`}
                    shapeRendering="crispEdges"
                >
                    {/* Ship Body */}
                    <path fill="#9ca3af" d="M8 2L6 5h4z M7 5h2v7H7z" />
                    <path fill="#e5e7eb" d="M8 3l-1 2h2z M8 5h1v6H8z" />
                    {/* Wings */}
                    <path fill="#6b7280" d="M5 6h1v4H5z M10 6h1v4h-1z" />
                    <path fill="#4b5563" d="M4 7h1v2H4z M11 7h1v2h-1z" />
                    {/* Cockpit */}
                    <path fill="#22d3ee" d="M7 6h2v1H7z" />
                    {/* Engine */}
                    <path className="ship-engine" fill="#facc15" d="M7 12h2v2H7z" />
                </svg>
                {isShooting && <div className="ship-laser"></div>}
            </div>
        </div>
    );
};
