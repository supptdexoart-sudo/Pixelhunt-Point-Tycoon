import React, { useState, useEffect } from 'react';

interface ToastNotificationProps {
  message: string | null;
  translationKey?: string;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message, translationKey }) => {
  const [visible, setVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(message);

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000); // Display for 4 seconds
      return () => clearTimeout(timer);
    }
  }, [message, translationKey]); // Depend on key to re-trigger for same message

  if (!currentMessage || !visible) {
    return null;
  }

  return (
    <div className="toast-notification pixel-box bg-green-700 text-white p-4 text-center text-sm fixed top-5">
      <p className="text-shadow-hard">{currentMessage}</p>
    </div>
  );
};
