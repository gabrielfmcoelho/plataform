import { X } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export default function Toast() {
  const { toasts, removeToast } = useToast();

  const getToastStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`${getToastStyles(toast.type)} text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-between min-w-[200px]`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-white hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}