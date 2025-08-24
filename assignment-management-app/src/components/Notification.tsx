import React from 'react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    return (
        <div className={`notification ${type}`}>
            <span>{message}</span>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default Notification;