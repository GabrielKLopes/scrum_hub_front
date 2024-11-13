import React from 'react';

interface NotificationProps {
  visible: boolean;
  message: string;
  type: 'success' | 'error';
  onClose?: () => void;

}

const Notification: React.FC<NotificationProps> = ({ visible, message, type }) => {
  const textColor = type === 'error' ? 'text-red-500' : 'text-orange-500';

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-customBgLight4 ${textColor} px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        zIndex: 1000,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.19)',
      }}
    >
      {message}
    </div>
  );
};

export default Notification;