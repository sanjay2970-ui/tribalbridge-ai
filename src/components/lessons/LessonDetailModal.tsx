import React, { useState } from 'react';
import { Lesson } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Volume2, 
  HardDriveDownload, 
  BookmarkCheck, 
  Sparkles, 
  Play, 
  Layers, 
  X,
  Languages
} from 'lucide-react';
import { AudioButton } from '../common/AudioButton';
import { offlineStorage } from '../../services/offlineStorage';

interface LessonDetailModalProps {
  lesson: Lesson | null;
  onClose: () => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({ lesson, onClose }) => {
  const { addToast } = useApp();
  const [isTeachingMode, setIsTeachingMode] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSavedOffline, setIsSavedOffline] = useState(lesson?.offlineAvailable || false);

  if (!lesson) return null;

  const handleSaveOffline = () => {
    offlineStorage.addOfflineResource({
      id: lesson.id,
      name: lesson.title,
      type: 'lesson',
      sizeBytes: 14500000,
      sizeFormatted: '14.5 MB',
      language: lesson.language,
      offlineStatus: 'available',
      savedAt: 'Just now',
      category: lesson.subject
    });
    setIsSavedOffline(true);
    addToast(`"${lesson.title}" saved to Offline Library.`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8">
        
        {/* Top colored accent */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500" />

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {lesson.subject}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                Grade {lesson.grade}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                <Clock size={13} />
                {lesson.durationMinutes} mins
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {lesson.title}
            </h2>
            {lesson.titleTribal && (
              <p className="text-sm font-bold text-emerald-800 font-olchiki mt-0.5">
                {lesson.titleTribal}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[72vh] overflow-y-auto space-y-6">
          
          {/* Interactive Classroom "Start Teaching" Presentation Mode */}
          {isTeachingMode ? (
            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Live Classroom Presentation Mode
                  </span>
                </div>
                <button
                  onClick={() => setIsTeachingMode(false)}
                  className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded-lg"
                >
                  Exit Teaching Mode
                </button>
              </div>

              {/* Big Slide Card for Classroom Display */}
              <div className="text-center py-6 space-y-4">
                <div className="text-5xl mb-2">
                  {lesson.visualExample?.emoji || '📖'}
                </div>

                <div className="text-xl sm:text-2xl font-bold text-amber-300 font-hindi">
                  {lesson.content[currentSlideIndex].hindi}
                </div>

                {lesson.content[currentSlideIndex].tribalOlChiki && (
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-olchiki">
                    {lesson.content[currentSlideIndex].tribalOlChiki}
                  </div>
                )}

                <div className="text-base text-slate-300 italic font-medium">
                  "{lesson.content[currentSlideIndex].tribal}"
                </div>

                <div className="pt-4 flex items-center justify-center gap-3">
                  <AudioButton
                    text={lesson.content[currentSlideIndex].tribal}
                    phonetic={lesson.content[currentSlideIndex].phonetic}
                    label="Pronounce in Santhali"
                    size="lg"
                  />
                  <AudioButton
                    text={lesson.content[currentSlideIndex].hindi}
                    isHindi={true}
                    label="Pronounce in Hindi"
                    size="lg"
                  />
                </div>
              </div>

              {/* Navigation Slides */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-sm">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => setCurrentSlideIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white font-bold"
                >
                  Previous Sentence
                </button>
                <span className="text-slate-400 text-xs">
                  Sentence {currentSlideIndex + 1} of {lesson.content.length}
                </span>
                <button
                  disabled={currentSlideIndex === lesson.content.length - 1}
                  onClick={() => setCurrentSlideIndex(prev => prev + 1)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-white font-bold"
                >
                  Next Sentence
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Learning Objectives */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Learning Objectives / अधिगम उद्देश्य:</span>
                </h4>
                <p className="text-sm text-emerald-950 leading-relaxed font-medium">
                  {lesson.learningObjective}
                </p>
                {lesson.learningObjectiveTribal && (
                  <p className="text-xs text-emerald-800 font-olchiki mt-1.5 font-semibold">
                    {lesson.learningObjectiveTribal}
                  </p>
                )}
              </div>

              {/* Visual Aids / Examples */}
              {lesson.visualExample && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center gap-4">
                  <div className="text-4xl p-2 bg-white rounded-2xl shadow-xs">
                    {lesson.visualExample.emoji}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                      {lesson.visualExample.label}
                    </h5>
                    <p className="text-xs text-amber-900 mt-0.5">
                      {lesson.visualExample.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Structured Bilingual Content (Hindi side-by-side with Santhali) */}
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <BookOpen size={16} className="text-emerald-700" />
                  <span>Bilingual Classroom Content / द्विभाषी पाठ्य सामग्री</span>
                </h4>

                <div className="space-y-3">
                  {lesson.content.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          {/* Hindi */}
                          <div className="text-sm font-bold text-slate-900 font-hindi">
                            {item.hindi}
                          </div>

                          {/* Santhali Ol Chiki */}
                          {item.tribalOlChiki && (
                            <div className="text-base font-bold text-emerald-900 font-olchiki">
                              {item.tribalOlChiki}
                            </div>
                          )}

                          {/* Santhali Latin / Phonetic */}
                          <div className="text-xs text-slate-600 italic">
                            "{item.tribal}"
                          </div>
                        </div>

                        {/* Pronunciation Audio Button */}
                        <AudioButton
                          text={item.tribal}
                          phonetic={item.phonetic}
                          size="md"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between flex-wrap gap-3">
          
          <button
            type="button"
            onClick={handleSaveOffline}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              isSavedOffline
                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs'
            }`}
          >
            {isSavedOffline ? (
              <>
                <BookmarkCheck size={16} className="text-purple-700" />
                <span>Saved Offline (14.5 MB)</span>
              </>
            ) : (
              <>
                <HardDriveDownload size={16} className="text-emerald-700" />
                <span>Save Offline</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsTeachingMode(!isTeachingMode)}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/20 flex items-center gap-2 transition-all active:scale-95"
            >
              <Play size={15} className="fill-white" />
              <span>{isTeachingMode ? 'Return to Overview' : 'Start Teaching / कक्षा शुरू करें'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
