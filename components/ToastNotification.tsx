import React, { useState, useEffect } from 'react';

interface ToastNotificationProps {
  message: string | null;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000); // Display for 4 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message || !visible) {
    return null;
  }

  return (
    <div className="toast-notification pixel-box bg-green-700 text-white p-4 text-center text-sm fixed top-5">
      <p className="text-shadow-hard">{message}</p>
    </div>
  );
};
