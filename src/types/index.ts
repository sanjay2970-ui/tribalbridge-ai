export type LanguageCode = 'sat' | 'hoc' | 'unr' | 'hi';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  script: string;
  region: string;
  isPrimary: boolean;
}

export type TeachingContext = 'lesson' | 'instruction' | 'question' | 'activity' | 'assessment';

export interface TranslationItem {
  id: string;
  sourceText: string;
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  targetText: string;
  targetOlChiki?: string;
  targetDevanagari?: string;
  phonetic?: string;
  confidence: number;
  context: TeachingContext;
  timestamp: string;
  savedOffline: boolean;
  notes?: string;
}

export interface LessonContentItem {
  hindi: string;
  tribal: string;
  tribalOlChiki?: string;
  phonetic?: string;
  audioKey?: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleTribal?: string;
  subject: 'Mathematics' | 'Science' | 'Language' | 'Environmental Studies' | 'General Knowledge';
  grade: number;
  language: string;
  durationMinutes: number;
  offlineAvailable: boolean;
  learningObjective: string;
  learningObjectiveTribal?: string;
  content: LessonContentItem[];
  visualExample?: {
    emoji: string;
    label: string;
    description: string;
  };
}

export type QuestionType = 'mcq' | 'fill_in_the_blank' | 'match' | 'true_false' | 'picture_based';

export interface WorksheetQuestion {
  id: number;
  questionHindi: string;
  questionTribal: string;
  questionOlChiki?: string;
  phonetic?: string;
  visualEmoji?: string;
  options?: string[];
  answer: string;
  explanation?: string;
}

export interface Worksheet {
  id: string;
  title: string;
  subject: string;
  grade: number;
  topic: string;
  questionType: QuestionType;
  questionCount: number;
  languages: string;
  questions: WorksheetQuestion[];
  createdAt: string;
  savedOffline: boolean;
}

export interface Flashcard {
  id: string;
  topic: string;
  grade: number;
  emoji: string;
  hindiWord: string;
  tribalWord: string;
  tribalOlChiki?: string;
  phonetic: string;
  sampleSentenceHindi: string;
  sampleSentenceTribal: string;
  sampleSentenceOlChiki?: string;
  audioKey?: string;
  savedOffline: boolean;
}

export interface OfflineResource {
  id: string;
  name: string;
  type: 'lesson' | 'worksheet' | 'flashcard' | 'audio' | 'translation';
  sizeBytes: number;
  sizeFormatted: string;
  language: string;
  offlineStatus: 'available' | 'syncing' | 'updated';
  savedAt: string;
  category: string;
}

export interface TeacherProfile {
  name: string;
  teacherId: string;
  school: string;
  district: string;
  state: string;
  avatarUrl?: string;
}

export interface UserSettings {
  selectedLanguage: LanguageCode;
  preferredScript: 'olchiki' | 'devanagari' | 'latin';
  voiceSpeed: number;
  autoPlayAudio: boolean;
  speakerVolume: number;
  autoSaveOffline: boolean;
  syncWhenOnline: boolean;
  largeTextMode: boolean;
  highContrastMode: boolean;
  simplifiedInterface: boolean;
}

export interface VoiceChatMessage {
  id: string;
  sender: 'teacher' | 'ai' | 'system';
  textHindi: string;
  textTribal: string;
  textOlChiki?: string;
  phonetic?: string;
  timestamp: string;
  status: 'listening' | 'translating' | 'done';
}

export interface ToastItem {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  duration?: number;
}
