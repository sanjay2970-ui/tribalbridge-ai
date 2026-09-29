import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Languages, 
  FileText, 
  Layers, 
  Mic, 
  HardDriveDownload, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Wifi, 
  Calendar,
  Volume2
} from 'lucide-react';
import { SAMPLE_LESSONS } from '../../data/sampleLessons';

export const DashboardView: React.FC = () => {
  const { 
    setActiveTab, 
    setSelectedLessonForDetail, 
    teacherProfile, 
    isOffline,
    addToast
  } = useApp();

  const handleStartTodayLesson = () => {
    const todayLesson = SAMPLE_LESSONS[0]; // Numbers 1-10
    setSelectedLessonForDetail(todayLesson);
    setActiveTab('lessons');
    addToast('Opening Today’s Lesson: Numbers 1–10 (Hindi → Santhali)', 'info');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* 1. Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 sm:p-8 shadow-xl">
        {/* Subtle decorative tribal geometric circle */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 rounded-l-full pointer-events-none" />
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full border-4 border-white/10 pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-700/60 text-emerald-200 border border-emerald-600/50 mb-3">
            <Sparkles size={14} className="text-amber-300" />
            <span>{teacherProfile.school}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good Morning, Teacher 👋
          </h1>
          <p className="text-base sm:text-lg text-emerald-100 font-medium mt-1">
            "Teach confidently in your students' mother tongue."
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-emerald-200">
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl backdrop-blur-xs">
              <Languages size={15} className="text-amber-300" />
              Primary: <strong>Santhali (ᱥᱟᱱᱛᱟᱲᱤ)</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl backdrop-blur-xs">
              <Calendar size={15} />
              Grade 1–3 Primary Wing
            </span>
          </div>
        </div>
      </div>

      {/* 2. 4 Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Lessons */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Today's Lessons
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <BookOpen size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-800">3</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-emerald-600">Numbers 1-10</span> next
          </div>
        </div>

        {/* Translations Used */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Translations Used
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Languages size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-800">24</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-blue-600">+8 today</span> in classroom
          </div>
        </div>

        {/* Worksheets Created */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Worksheets Created
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <FileText size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-800">5</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-amber-600">Bilingual</span> Math & EVS
          </div>
        </div>

        {/* Offline Content */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Offline Content
            </span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <HardDriveDownload size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-800">18</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-purple-600">420 MB</span> cached locally
          </div>
        </div>
      </div>

      {/* 3. Large "Quick Start" Section (4 Cards) */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
          <span>Quick Start / त्वरित शिक्षण कार्य</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Translate Lesson */}
          <button
            onClick={() => setActiveTab('translator')}
            className="flex flex-col text-left p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all group active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Languages size={24} />
            </div>
            <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-base">
              1. Translate Lesson
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Convert Hindi lesson text into Santhali, Ho, or Mundari with audio pronunciation.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-700">
              <span>Start Translating</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Start Voice Classroom */}
          <button
            onClick={() => setActiveTab('voice')}
            className="flex flex-col text-left p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-rose-400 hover:shadow-md transition-all group active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Mic size={24} />
            </div>
            <div className="font-bold text-slate-900 group-hover:text-rose-700 transition-colors text-base">
              2. Start Voice Classroom
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Real-time voice simulation: Speak in Hindi, children hear instructions in Santhali.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-rose-700">
              <span>Launch Voice Mic</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 3: Create Worksheet */}
          <button
            onClick={() => setActiveTab('worksheets')}
            className="flex flex-col text-left p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all group active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FileText size={24} />
            </div>
            <div className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors text-base">
              3. Create Worksheet
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Generate bilingual picture-based quizzes and worksheets ready to print or save offline.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-700">
              <span>Generate Sheet</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 4: Create Flashcards */}
          <button
            onClick={() => setActiveTab('flashcards')}
            className="flex flex-col text-left p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-purple-400 hover:shadow-md transition-all group active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Layers size={24} />
            </div>
            <div className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors text-base">
              4. Create Flashcards
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Interactive 3D visual cards with Ol Chiki script, phonetics, and audio for students.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-purple-700">
              <span>Open Flashcards</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

        </div>
      </div>

      {/* 4. Middle Section: Today's Lesson Spotlight + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* "Today's Lesson" Spotlight Card (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full pointer-events-none -mr-6 -mt-6" />

          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Today's Scheduled Lesson
            </span>
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Clock size={14} />
              Duration: 30 minutes
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Subject: Mathematics • Grade 1
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                Topic: Numbers 1–10 (संख्या 1 से 10)
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Languages: <strong>Hindi → Santhali (Ol Chiki ᱞᱮᱠᱷᱟ ᱑-᱑᱐)</strong>
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle2 size={13} />
                  Offline Ready
                </span>
                <span>• 5 Interactive Counting Sentences with Audio</span>
              </div>
            </div>

            <button
              onClick={handleStartTodayLesson}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-95 flex-shrink-0"
            >
              <Play size={16} className="fill-white" />
              <span>Start Lesson</span>
            </button>
          </div>

          {/* Quick Preview pills */}
          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="p-2 bg-slate-50 rounded-xl">
              <div className="font-bold text-emerald-800">1: Mit' (ᱢᱤᱫ)</div>
              <div className="text-[10px] text-slate-500">एक (सूर्य)</div>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <div className="font-bold text-emerald-800">2: Bar (ᱵᱟᱨ)</div>
              <div className="text-[10px] text-slate-500">दो (आँखें)</div>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <div className="font-bold text-emerald-800">3: Pe (ᱯᱮ)</div>
              <div className="text-[10px] text-slate-500">तीन (पहिए)</div>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <div className="font-bold text-emerald-800">4: Pon (ᱯᱳᱱ)</div>
              <div className="text-[10px] text-slate-500">चार (पैर)</div>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <div className="font-bold text-emerald-800">5: Mõṛẽ (ᱢᱚᱬᱮ)</div>
              <div className="text-[10px] text-slate-500">पाँच (उँगलियाँ)</div>
            </div>
          </div>
        </div>

        {/* "Recent Activity" Card (1 col) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-4">
              Recent Activity / हाल की गतिविधि
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Languages size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Hindi lesson translated to Santhali
                  </div>
                  <div className="text-[11px] text-slate-500">
                    "आज हम 1 से 10 तक की गिनती सीखेंगे।"
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">15 min ago</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Mathematics worksheet created
                  </div>
                  <div className="text-[11px] text-slate-500">
                    5 questions (Count the apples, stars)
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">45 min ago</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HardDriveDownload size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    5 flashcards saved offline
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Animals & Nature deck (Elephant, Tree, etc.)
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">1 hour ago</div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('offline')}
            className="w-full mt-4 py-2 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors text-center"
          >
            View Complete History
          </button>
        </div>

      </div>

      {/* 5. "Offline Ready" Status Card */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Offline Ready — झारखंड के सुदूर विद्यालयों के लिए अनुकूल
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              "Core teaching resources are available offline." All 6 primary lessons, flashcard decks, and voice audio packs operate without cellular connection.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('offline')}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50 transition-colors shadow-2xs whitespace-nowrap"
        >
          Check Offline Cache (420 MB)
        </button>
      </div>

    </div>
  );
};
