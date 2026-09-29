import React from 'react';
import { useApp, NavTab } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Languages, 
  Mic, 
  BookOpen, 
  HardDriveDownload,
  Menu
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, isOffline } = useApp();

  const mobileTabs: Array<{ id: NavTab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'translator', label: 'Translate', icon: Languages },
    { id: 'voice', label: 'Voice', icon: Mic },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'offline', label: 'Offline', icon: HardDriveDownload },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg bottom-nav">
      {mobileTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 ${
              isActive
                ? 'text-emerald-700 font-bold scale-105'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-100 text-emerald-800' : ''}`}>
              <Icon size={20} />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
