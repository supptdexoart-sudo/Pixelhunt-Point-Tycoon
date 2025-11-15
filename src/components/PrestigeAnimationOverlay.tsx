import React from 'react';

interface PrestigeAnimationOverlayProps {
  isAnimating: boolean;
}

export const PrestigeAnimationOverlay: React.FC<PrestigeAnimationOverlayProps> = ({ isAnimating }) => {
  if (!isAnimating) {
    return null;
  }

  return <div className="prestige-animation-overlay" />;
};
