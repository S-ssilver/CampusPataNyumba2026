
import React, { useEffect } from 'react';
import { AppNotification } from '../types';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface NotificationToastProps {
  notifications: AppNotification[];
  onDismiss: (id: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none w-full max-w-sm">
      {notifications.map(n => (
        <ToastItem key={n.id} notification={n} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ notification: AppNotification, onDismiss: (id: string) => void }> = ({ notification, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(notification.id), 5000);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  const icons = {
    success: <CheckCircle className="text-emerald-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
    warning: <AlertTriangle className="text-amber-500" size={20} />,
  };

  const bgColors = {
    success: 'bg-emerald-50 border-emerald-100',
    info: 'bg-blue-50 border-blue-100',
    warning: 'bg-amber-50 border-amber-100',
  };

  return (
    <div className={`pointer-events-auto flex items-start p-4 rounded-2xl shadow-lg border animate-in slide-in-from-right-10 duration-300 ${bgColors[notification.type]}`}>
      <div className="mr-3 mt-0.5">
        {icons[notification.type]}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-slate-800">{notification.title}</h4>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notification.message}</p>
      </div>
      <button 
        onClick={() => onDismiss(notification.id)}
        className="ml-4 p-1 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};
