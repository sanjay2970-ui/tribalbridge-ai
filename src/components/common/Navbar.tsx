import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../data/authenticVocab';
import { 
  Wifi, 
  WifiOff, 
  Bell, 
  ChevronDown, 
  BookOpen, 
  Sparkles, 
  User, 
  Check, 
  ShieldCheck, 
  Languages,
  X
} from 'lucide-react';
import { LanguageCode } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentLanguage, 
    setCurrentLanguage, 
    isOffline, 
    toggleOfflineMode, 
    teacherProfile,
    activeTab,
    setActiveTab,
    unreadNotificationsCount,
    markNotificationsAsRead,
    notificationsList,
    addToast
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const selectedLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const handleLanguageChange = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    setIsLangMenuOpen(false);
    const target = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name || lang;
    addToast(`Target language switched to ${target}`, 'info');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Left: Brand / Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                <BookOpen size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
                    TribalBridge AI
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    Jharkhand
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium hidden sm:block">
                  AI – Mother Tongue Teaching Assistant
                </p>
              </div>
            </button>
          </div>

          {/* Right: Actions, Language selector, Offline toggle, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-800 border border-slate-200 transition-colors"
                aria-expanded={isLangMenuOpen}
              >
                <Languages size={15} className="text-emerald-600" />
                <span className="font-medium text-slate-500 hidden md:inline">Language:</span>
                <span className="font-bold text-emerald-800">{selectedLangObj.name}</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setIsLangMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Select Target Mother Tongue
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors ${
                        currentLanguage === lang.code ? 'bg-emerald-50/70 text-emerald-900 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold">{lang.name}</span>
                          {lang.isPrimary && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">
                              Primary
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 font-normal">
                          {lang.nativeName} • {lang.script}
                        </div>
                      </div>
                      {currentLanguage === lang.code && (
                        <Check size={16} className="text-emerald-600 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Offline / Online Status Indicator & Interactive Simulator Toggle */}
            <button
              type="button"
              onClick={toggleOfflineMode}
              title={isOffline ? 'Click to switch to Online' : 'Click to test Offline Mode'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isOffline
                  ? 'bg-amber-100/90 text-amber-900 border-amber-300 hover:bg-amber-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {isOffline ? (
                <>
                  <WifiOff size={14} className="text-amber-700 animate-pulse" />
                  <span className="hidden sm:inline">Offline Mode</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <Wifi size={14} className="text-emerald-600" />
                  <span className="hidden sm:inline">Online Sync</span>
                </>
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  if (!isNotificationOpen) markNotificationsAsRead();
                }}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="View notifications"
              >
                <Bell size={18} />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <span className="font-bold text-sm text-slate-800">Notifications</span>
                    <button
                      onClick={() => setIsNotificationOpen(false)}
                      className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
                    >
                      <X size={15} />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    {notificationsList.map((item) => (
                      <div key={item.id} className="p-3 text-xs hover:bg-slate-50 transition-colors">
                        <div className="font-medium text-slate-800 leading-snug">{item.title}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{item.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Admin Quick Switcher */}
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'admin' ? 'dashboard' : 'admin')}
              className={`hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                activeTab === 'admin'
                  ? 'bg-purple-100 text-purple-900 border-purple-300'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/60'
              }`}
            >
              <ShieldCheck size={14} className={activeTab === 'admin' ? 'text-purple-700' : 'text-slate-500'} />
              <span>{activeTab === 'admin' ? 'Teacher View' : 'Admin'}</span>
            </button>

            {/* Teacher Profile Avatar */}
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                RK
              </div>
              <div className="text-left hidden xl:block">
                <div className="text-xs font-bold text-slate-800 leading-none">
                  {teacherProfile.name.replace('Shri ', '')}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">
                  {teacherProfile.school.split(',')[0]}
                </div>
              </div>
            </button>

          </div>
        </div>
      </header>

      {/* Profile quick modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5 border border-slate-200 relative">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                RK
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{teacherProfile.name}</h4>
                <p className="text-xs text-emerald-700 font-semibold">{teacherProfile.teacherId}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/70 mb-4">
              <div><strong>School:</strong> {teacherProfile.school}</div>
              <div><strong>District:</strong> {teacherProfile.district}</div>
              <div><strong>State:</strong> {teacherProfile.state}</div>
              <div><strong>Primary Language:</strong> Santhali (ᱥᱟᱱᱛᱟᱲᱤ)</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsProfileModalOpen(false);
                  setActiveTab('settings');
                }}
                className="w-full py-2 text-xs font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                Edit Profile in Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
