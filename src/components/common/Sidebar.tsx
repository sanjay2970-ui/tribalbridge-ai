import React from 'react';
import { useApp, NavTab } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Languages, 
  Mic, 
  BookOpen, 
  FileText, 
  Layers, 
  HardDriveDownload, 
  Settings, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface NavItem {
  id: NavTab;
  label: string;
  hindiLabel: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, isOffline } = useApp();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', hindiLabel: 'डैशबोर्ड', icon: LayoutDashboard },
    { id: 'translator', label: 'Translate', hindiLabel: 'पाठ अनुवादक', icon: Languages, badge: 'AI' },
    { id: 'voice', label: 'Voice Classroom', hindiLabel: 'ध्वनि कक्षा', icon: Mic, badge: 'Live' },
    { id: 'lessons', label: 'Lessons', hindiLabel: 'पाठ सूची', icon: BookOpen },
    { id: 'worksheets', label: 'Worksheets', hindiLabel: 'कार्यपत्रक', icon: FileText, badge: 'New' },
    { id: 'flashcards', label: 'Flashcards', hindiLabel: 'फ्लैशकार्ड्स', icon: Layers },
    { id: 'offline', label: 'Saved Offline', hindiLabel: 'ऑफ़लाइन सामग्री', icon: HardDriveDownload, badge: isOffline ? 'Active' : undefined },
    { id: 'settings', label: 'Settings', hindiLabel: 'सेटिंग्स', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-slate-200/90 h-[calc(100vh-65px)] sticky top-[65px] select-none">
      
      {/* Decorative tribal subtle line */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-700 opacity-90" />

      {/* Navigation menu list */}
      <div className="flex-1 px-3.5 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Teaching Workspace
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group text-left ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/20 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  size={19}
                  className={`flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-emerald-700'
                  }`}
                />
                <div className="truncate">
                  <div className="leading-tight">{item.label}</div>
                  <div className={`text-[10px] ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {item.hindiLabel}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${
                    isActive
                      ? 'bg-emerald-800/80 text-emerald-100'
                      : item.badge === 'Live'
                      ? 'bg-rose-100 text-rose-700 animate-pulse'
                      : item.badge === 'Active'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-4 px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          System Overview
        </div>

        {/* Admin Dashboard Navigation */}
        <button
          onClick={() => setActiveTab('admin')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group text-left ${
            activeTab === 'admin'
              ? 'bg-purple-700 text-white shadow-sm font-semibold'
              : 'text-slate-600 hover:bg-purple-50 hover:text-purple-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <ShieldCheck
              size={19}
              className={`flex-shrink-0 transition-transform group-hover:scale-110 ${
                activeTab === 'admin' ? 'text-white' : 'text-purple-600'
              }`}
            />
            <div>
              <div className="leading-tight">Admin Dashboard</div>
              <div className={`text-[10px] ${activeTab === 'admin' ? 'text-purple-200' : 'text-slate-400'}`}>
                स्कूल एवं जिला सांख्यिकी
              </div>
            </div>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
            Govt
          </span>
        </button>
      </div>

      {/* Bottom quick banner: Jharkhand Education Initiative */}
      <div className="p-3.5 border-t border-slate-200/80 m-3 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl border">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="p-1 rounded-md bg-emerald-600 text-white">
            <Sparkles size={12} />
          </div>
          <span className="text-xs font-bold text-emerald-950">Jharkhand NEP 2020</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-snug">
          Empowering tribal children through mother-tongue foundational learning.
        </p>
      </div>

    </aside>
  );
};
