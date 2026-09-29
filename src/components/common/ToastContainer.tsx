import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
  };

  const borderClasses = {
    success: 'border-emerald-300 bg-emerald-50 text-emerald-950',
    info: 'border-blue-300 bg-blue-50 text-blue-950',
    warning: 'border-amber-300 bg-amber-50 text-amber-950',
    error: 'border-rose-300 bg-rose-50 text-rose-950'
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg transition-all transform translate-y-0 duration-200 ${
            borderClasses[toast.type]
          }`}
          role="alert"
        >
          {icons[toast.type]}
          <div className="text-sm font-medium flex-1 leading-snug">
            {toast.message}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-700 p-0.5 rounded-md transition-colors"
            aria-label="Dismiss toast"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
