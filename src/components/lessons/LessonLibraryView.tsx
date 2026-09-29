import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  HardDriveDownload, 
  Play, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { SAMPLE_LESSONS } from '../../data/sampleLessons';
import { Lesson } from '../../types';
import { LessonDetailModal } from './LessonDetailModal';

export const LessonLibraryView: React.FC = () => {
  const { selectedLessonForDetail, setSelectedLessonForDetail } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<number | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = ['All', 'Mathematics', 'Science', 'Language', 'Environmental Studies', 'General Knowledge'];
  const grades: Array<'All' | number> = ['All', 1, 2, 3];

  const filteredLessons = SAMPLE_LESSONS.filter((lesson) => {
    const matchesSubject = selectedSubject === 'All' || lesson.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'All' || lesson.grade === selectedGrade;
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lesson.titleTribal && lesson.titleTribal.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesGrade && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
            <BookOpen size={14} className="text-emerald-700" />
            <span>Primary Curriculum (Grades 1–3)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Lesson Library / पाठ सूची
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Standard primary school textbook lessons mapped directly to tribal mother-tongue equivalents.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search size={18} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lessons or topics..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white shadow-2xs font-medium"
          />
        </div>
      </div>

      {/* Subject Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {subjects.map((subj) => (
          <button
            key={subj}
            onClick={() => setSelectedSubject(subj)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedSubject === subj
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* Grade Selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Filter Grade:
        </span>
        {grades.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGrade(g)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedGrade === g
                ? 'bg-amber-500 text-white shadow-2xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {g === 'All' ? 'All Grades' : `Grade ${g}`}
          </button>
        ))}
      </div>

      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => setSelectedLessonForDetail(lesson)}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.99]"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {lesson.subject}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                  Grade {lesson.grade}
                </span>
              </div>

              {/* Title & Tribal Title */}
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {lesson.title}
              </h3>
              {lesson.titleTribal && (
                <p className="text-xs font-semibold text-emerald-800 font-olchiki mt-0.5">
                  {lesson.titleTribal}
                </p>
              )}

              {/* Learning Objective Brief */}
              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                {lesson.learningObjective}
              </p>
            </div>

            {/* Footer with meta and start action */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-medium">
                  <Clock size={13} />
                  {lesson.durationMinutes} min
                </span>
                {lesson.offlineAvailable && (
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                    <CheckCircle2 size={13} />
                    Offline
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                <span>View Lesson</span>
                <ChevronRight size={15} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
          <BookOpen size={36} className="mx-auto text-slate-300 mb-3" />
          <h4 className="font-bold text-slate-700">No lessons match your filter</h4>
          <p className="text-xs text-slate-400 mt-1">Try selecting "All" subjects or clearing your search.</p>
        </div>
      )}

      {/* Lesson Detail Modal */}
      <LessonDetailModal
        lesson={selectedLessonForDetail}
        onClose={() => setSelectedLessonForDetail(null)}
      />

    </div>
  );
};
