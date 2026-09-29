import React from 'react';
import { useApp } from '../../context/AppContext';
import { WifiOff, RefreshCw, Database } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOffline, toggleOfflineMode, setActiveTab } = useApp();

  if (!isOffline) return null;

  return (
    <div className="bg-amber-500 text-amber-950 px-4 py-2.5 shadow-sm border-b border-amber-600/30 transition-all flex items-center justify-between flex-wrap gap-2 text-sm z-30">
      <div className="flex items-center gap-2.5 font-medium">
        <div className="p-1 bg-amber-600/20 rounded-md">
          <WifiOff size={18} className="text-amber-950 animate-pulse" />
        </div>
        <span>
          <strong>Offline Mode Active:</strong> You are offline. Saved lessons, audio, and learning resources are still available.
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('offline')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-amber-100 hover:bg-white text-amber-950 rounded-lg shadow-xs transition-colors"
        >
          <Database size={13} />
          View Offline Library (420 MB)
        </button>

        <button
          onClick={toggleOfflineMode}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-amber-900 text-amber-50 hover:bg-amber-950 rounded-lg shadow-xs transition-colors"
          title="Switch to Online Mode"
        >
          <RefreshCw size={13} />
          Go Online
        </button>
      </div>
    </div>
  );
};
