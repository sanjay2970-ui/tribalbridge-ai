import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HardDriveDownload, 
  WifiOff, 
  RefreshCw, 
  Trash2, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  Layers, 
  Volume2, 
  Languages,
  Database,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { OfflineResource } from '../../types';
import { offlineStorage } from '../../services/offlineStorage';

export const OfflineLibraryView: React.FC = () => {
  const { isOffline, toggleOfflineMode, setActiveTab, addToast } = useApp();

  const [resources, setResources] = useState<OfflineResource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(offlineStorage.getLastSyncTime());
  const [storageStats, setStorageStats] = useState(offlineStorage.getStorageStats());

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = () => {
    setResources(offlineStorage.getOfflineResources());
    setStorageStats(offlineStorage.getStorageStats());
    setLastSync(offlineStorage.getLastSyncTime());
  };

  const categories = [
    { id: 'All', label: 'All Items' },
    { id: 'lesson', label: 'Lessons' },
    { id: 'worksheet', label: 'Worksheets' },
    { id: 'flashcard', label: 'Flashcards' },
    { id: 'audio', label: 'Audio Packs' },
    { id: 'translation', label: 'Translations' }
  ];

  const filteredResources = resources.filter((item) => {
    return selectedCategory === 'All' || item.type === selectedCategory;
  });

  const handleDelete = (id: string, name: string) => {
    offlineStorage.removeOfflineResource(id);
    loadResources();
    addToast(`"${name}" removed from local storage.`, 'info');
  };

  const handleSyncNow = async () => {
    setIsSyncing(true);
    try {
      const result = await offlineStorage.syncOfflineData();
      setLastSync(result.timestamp);
      loadResources();
      addToast(`Sync complete! ${result.syncedCount} packages refreshed with state repository.`, 'success');
    } catch {
      addToast('Sync failed.', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const getTypeIcon = (type: OfflineResource['type']) => {
    switch (type) {
      case 'lesson': return <BookOpen size={16} className="text-emerald-700" />;
      case 'worksheet': return <FileText size={16} className="text-amber-700" />;
      case 'flashcard': return <Layers size={16} className="text-purple-700" />;
      case 'audio': return <Volume2 size={16} className="text-blue-700" />;
      case 'translation': return <Languages size={16} className="text-rose-700" />;
      default: return <Database size={16} className="text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Top Banner: Offline Mode Active & Last Sync */}
      <div className="rounded-3xl p-6 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white flex-shrink-0">
            <WifiOff size={24} />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Offline Mode Active</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Available Without Internet / ऑफ़लाइन शिक्षण संसाधन
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 mt-0.5">
              Last Sync: <strong>{lastSync}</strong> • Designed for zero-network rural primary classrooms
            </p>
          </div>
        </div>

        {/* Sync Button */}
        <button
          onClick={handleSyncNow}
          disabled={isSyncing}
          className="px-5 py-3 rounded-2xl bg-white text-amber-950 font-bold text-xs shadow-md hover:bg-amber-50 disabled:opacity-50 flex items-center gap-2 transition-all flex-shrink-0 active:scale-95"
        >
          <RefreshCw size={15} className={isSyncing ? 'animate-spin' : ''} />
          <span>{isSyncing ? 'Syncing...' : 'Sync Cloud Update'}</span>
        </button>
      </div>

      {/* Storage Indicator Bar ("Used: 420 MB / 2 GB") */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database size={18} className="text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Local Storage Indicator / स्थानीय मेमोरी स्थिति
            </h3>
          </div>
          <span className="text-sm font-extrabold text-emerald-800">
            {storageStats.formatted} ({storageStats.percentage}% capacity)
          </span>
        </div>

        {/* Progress bar with segment colors */}
        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex">
          <div style={{ width: '12%' }} className="bg-emerald-600 h-full" title="Lessons (110 MB)" />
          <div style={{ width: '6%' }} className="bg-amber-500 h-full" title="Worksheets (45 MB)" />
          <div style={{ width: '4%' }} className="bg-purple-600 h-full" title="Flashcards (35 MB)" />
          <div style={{ width: '14%' }} className="bg-blue-600 h-full" title="Audio Packs (230 MB)" />
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            Lessons
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            Audio Pronunciation Pack (Santhali/Ho)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
            Flashcard Decks
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            Worksheets
          </span>
          <span className="ml-auto text-slate-400">
            1.58 GB free on local Android tablet
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Offline Items Table / List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-800">
            Cached Teaching Items ({filteredResources.length})
          </h4>
          <span className="text-xs text-slate-400">
            Encrypted & stored in device browser cache
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredResources.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-slate-100 flex-shrink-0 mt-0.5">
                  {getTypeIcon(item.type)}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 leading-snug">
                    {item.name}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                    <span className="font-semibold text-emerald-800">
                      {item.language}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-slate-600">
                      Size: <strong>{item.sizeFormatted}</strong>
                    </span>
                    <span>•</span>
                    <span>Cached: {item.savedAt}</span>
                  </div>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Available</span>
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if (item.type === 'lesson') setActiveTab('lessons');
                    else if (item.type === 'worksheet') setActiveTab('worksheets');
                    else if (item.type === 'flashcard') setActiveTab('flashcards');
                    else setActiveTab('translator');
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Open
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id, item.name)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Remove from offline cache"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Note */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
        <Sparkles size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Rural School Optimization:</strong> All items in this library can be demonstrated without cellular network. When teachers return to block headquarters or Wi-Fi connectivity, the application synchronizes automatically.
        </div>
      </div>

    </div>
  );
};
