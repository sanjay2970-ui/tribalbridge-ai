import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  LanguageCode, 
  TeacherProfile, 
  UserSettings, 
  ToastItem, 
  Lesson,
  Worksheet,
  Flashcard,
  TranslationItem
} from '../types';
import { offlineStorage } from '../services/offlineStorage';
import { SAMPLE_LESSONS } from '../data/sampleLessons';

export type NavTab = 
  | 'dashboard' 
  | 'translator' 
  | 'voice' 
  | 'lessons' 
  | 'worksheets' 
  | 'flashcards' 
  | 'offline' 
  | 'settings'
  | 'admin';

interface AppContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  toggleOfflineMode: () => void;
  teacherProfile: TeacherProfile;
  setTeacherProfile: React.Dispatch<React.SetStateAction<TeacherProfile>>;
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
  selectedLessonForDetail: Lesson | null;
  setSelectedLessonForDetail: (lesson: Lesson | null) => void;
  selectedWorksheetForDetail: Worksheet | null;
  setSelectedWorksheetForDetail: (ws: Worksheet | null) => void;
  activeTranslatorPrompt: string;
  setActiveTranslatorPrompt: (prompt: string) => void;
  toasts: ToastItem[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  unreadNotificationsCount: number;
  markNotificationsAsRead: () => void;
  notificationsList: Array<{ id: string; title: string; time: string; read: boolean }>;
}

const DEFAULT_TEACHER: TeacherProfile = {
  name: 'Shri Rajesh Kumar Mahato',
  teacherId: 'T-JHK-8921',
  school: 'Utkramit Madhya Vidyalaya, Torpa',
  district: 'Khunti District',
  state: 'Jharkhand'
};

const DEFAULT_SETTINGS: UserSettings = {
  selectedLanguage: 'sat',
  preferredScript: 'olchiki',
  voiceSpeed: 0.9,
  autoPlayAudio: true,
  speakerVolume: 90,
  autoSaveOffline: true,
  syncWhenOnline: true,
  largeTextMode: false,
  highContrastMode: false,
  simplifiedInterface: false
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('sat');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>(DEFAULT_TEACHER);
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem('tb_user_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [selectedLessonForDetail, setSelectedLessonForDetail] = useState<Lesson | null>(null);
  const [selectedWorksheetForDetail, setSelectedWorksheetForDetail] = useState<Worksheet | null>(null);
  const [activeTranslatorPrompt, setActiveTranslatorPrompt] = useState<string>('');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const [notificationsList, setNotificationsList] = useState([
    { id: 'n1', title: 'New Santhali Grade 1 Math audio lesson synced offline.', time: '10 min ago', read: false },
    { id: 'n2', title: 'Monthly DIET teacher training: Mother Tongue Pedagogy.', time: '2 hours ago', read: false },
    { id: 'n3', title: 'Offline storage refreshed: 420 MB resources ready.', time: 'Yesterday', read: true }
  ]);

  // Synchronize browser offline state
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      addToast('Internet connection restored. Synchronizing offline items...', 'info');
    };
    const handleOffline = () => {
      setIsOffline(true);
      addToast('Offline mode active. Using cached local learning resources.', 'warning');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    if (!navigator.onLine) {
      setIsOffline(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Synchronize accessibility styles on body element
  useEffect(() => {
    if (settings.largeTextMode) {
      document.body.classList.add('accessibility-large-text');
    } else {
      document.body.classList.remove('accessibility-large-text');
    }

    if (settings.highContrastMode) {
      document.body.classList.add('accessibility-high-contrast');
    } else {
      document.body.classList.remove('accessibility-high-contrast');
    }
  }, [settings.largeTextMode, settings.highContrastMode]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('tb_user_settings', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleOfflineMode = () => {
    const nextState = !isOffline;
    setIsOffline(nextState);
    if (nextState) {
      addToast('Simulated Offline Mode: All core teaching resources remain available without internet.', 'warning');
    } else {
      addToast('Online Mode: Cloud sync and updates enabled.', 'success');
    }
  };

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastItem = { id, type, message };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const unreadNotificationsCount = notificationsList.filter(n => !n.read).length;

  const markNotificationsAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentLanguage,
        setCurrentLanguage,
        isOffline,
        setIsOffline,
        toggleOfflineMode,
        teacherProfile,
        setTeacherProfile,
        settings,
        updateSettings,
        isLoggedIn,
        setIsLoggedIn,
        selectedLessonForDetail,
        setSelectedLessonForDetail,
        selectedWorksheetForDetail,
        setSelectedWorksheetForDetail,
        activeTranslatorPrompt,
        setActiveTranslatorPrompt,
        toasts,
        addToast,
        removeToast,
        unreadNotificationsCount,
        markNotificationsAsRead,
        notificationsList
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
