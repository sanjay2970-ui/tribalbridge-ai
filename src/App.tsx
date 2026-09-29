import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { BottomNav } from './components/common/BottomNav';
import { OfflineBanner } from './components/common/OfflineBanner';
import { ToastContainer } from './components/common/ToastContainer';
import { LoginScreen } from './components/landing/LoginScreen';

// Page Views
import { DashboardView } from './components/dashboard/DashboardView';
import { TranslatorView } from './components/translator/TranslatorView';
import { VoiceClassroomView } from './components/voice/VoiceClassroomView';
import { LessonLibraryView } from './components/lessons/LessonLibraryView';
import { WorksheetGeneratorView } from './components/worksheets/WorksheetGeneratorView';
import { FlashcardView } from './components/flashcards/FlashcardView';
import { OfflineLibraryView } from './components/offline/OfflineLibraryView';
import { SettingsView } from './components/settings/SettingsView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';

const MainContent: React.FC = () => {
  const { isLoggedIn, activeTab } = useApp();

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'translator':
        return <TranslatorView />;
      case 'voice':
        return <VoiceClassroomView />;
      case 'lessons':
        return <LessonLibraryView />;
      case 'worksheets':
        return <WorksheetGeneratorView />;
      case 'flashcards':
        return <FlashcardView />;
      case 'offline':
        return <OfflineLibraryView />;
      case 'settings':
        return <SettingsView />;
      case 'admin':
        return <AdminDashboardView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation */}
      <Navbar />

      {/* Prominent Offline Banner when connection is unavailable or simulated */}
      <OfflineBanner />

      {/* Main Workspace Layout: Sidebar + Dynamic View Content */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Toast Alert System */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
