'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps {
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
  autoClose?: boolean;
}

const icons = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  error: XCircle
};

const styles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800'
};

export default function Notification({
  type,
  title,
  message,
  duration = 5000,
  onClose,
  autoClose = true
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = icons[type];

  useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`
            fixed top-4 right-4 z-50 max-w-md w-full
            border rounded-xl p-4 shadow-lg backdrop-blur-sm
            ${styles[type]}
          `}
        >
          <div className="flex items-start gap-3">
            <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{title}</h4>
              {message && (
                <p className="text-xs mt-1 opacity-80">{message}</p>
              )}
            </div>

            <button
              onClick={handleClose}
              className="ml-2 p-1 rounded-md hover:bg-black/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Notification Manager Hook
interface NotificationState {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationState[]>([]);

  const addNotification = (notification: Omit<NotificationState, 'id'>) => {
    const id = Math.random().toString(36).substring(2);
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const showSuccess = (title: string, message?: string) => {
    addNotification({ type: 'success', title, message });
  };

  const showInfo = (title: string, message?: string) => {
    addNotification({ type: 'info', title, message });
  };

  const showWarning = (title: string, message?: string) => {
    addNotification({ type: 'warning', title, message });
  };

  const showError = (title: string, message?: string) => {
    addNotification({ type: 'error', title, message });
  };

  const NotificationContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );

  return {
    showSuccess,
    showInfo,
    showWarning,
    showError,
    NotificationContainer
  };
}