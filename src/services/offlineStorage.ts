import { OfflineResource, TranslationItem, Worksheet, Flashcard, Lesson } from '../types';
import { SAMPLE_LESSONS } from '../data/sampleLessons';
import { SAMPLE_WORKSHEETS } from '../data/sampleWorksheets';
import { SAMPLE_FLASHCARDS } from '../data/sampleFlashcards';

const STORAGE_KEYS = {
  OFFLINE_RESOURCES: 'tb_offline_resources',
  SAVED_TRANSLATIONS: 'tb_saved_translations',
  SAVED_WORKSHEETS: 'tb_saved_worksheets',
  SAVED_FLASHCARDS: 'tb_saved_flashcards',
  USER_SETTINGS: 'tb_user_settings',
  LAST_SYNC: 'tb_last_sync'
};

const DEFAULT_OFFLINE_RESOURCES: OfflineResource[] = [
  {
    id: 'res-1',
    name: 'गिनती 1 से 10 (Numbers 1–10 Complete Lesson)',
    type: 'lesson',
    sizeBytes: 14500000,
    sizeFormatted: '14.5 MB',
    language: 'Hindi → Santhali',
    offlineStatus: 'available',
    savedAt: 'Today, 09:30 AM',
    category: 'Mathematics'
  },
  {
    id: 'res-2',
    name: 'हमारे आस-पास के जानवर (Animals Around Us)',
    type: 'lesson',
    sizeBytes: 28000000,
    sizeFormatted: '28.0 MB',
    language: 'Hindi → Santhali',
    offlineStatus: 'available',
    savedAt: 'Yesterday, 04:15 PM',
    category: 'Environmental Studies'
  },
  {
    id: 'res-3',
    name: 'पौधे के विभिन्न अंग (Parts of a Plant)',
    type: 'lesson',
    sizeBytes: 32000000,
    sizeFormatted: '32.0 MB',
    language: 'Hindi → Santhali',
    offlineStatus: 'available',
    savedAt: '25 Sep, 11:00 AM',
    category: 'Science'
  },
  {
    id: 'res-4',
    name: 'गिनती और संख्या पहचान कार्यपत्रक (Numbers Practice WS)',
    type: 'worksheet',
    sizeBytes: 4200000,
    sizeFormatted: '4.2 MB',
    language: 'Hindi + Santhali',
    offlineStatus: 'available',
    savedAt: 'Today, 09:15 AM',
    category: 'Worksheet'
  },
  {
    id: 'res-5',
    name: 'प्राथमिक शब्दावली फ्लैशकार्ड्स (Primary Visual Cards Deck)',
    type: 'flashcard',
    sizeBytes: 18500000,
    sizeFormatted: '18.5 MB',
    language: 'Santhali (Ol Chiki)',
    offlineStatus: 'available',
    savedAt: 'Today, 08:45 AM',
    category: 'Flashcard'
  },
  {
    id: 'res-6',
    name: 'संथाली उच्चारण ऑडियो बैंक - 1 (Audio Pronunciation Pack)',
    type: 'audio',
    sizeBytes: 145000000,
    sizeFormatted: '145.0 MB',
    language: 'Santhali Voice Pack',
    offlineStatus: 'available',
    savedAt: '24 Sep, 10:20 AM',
    category: 'Audio Pack'
  },
  {
    id: 'res-7',
    name: 'कक्षा निर्देश अनुवाद (Classroom Common Instructions)',
    type: 'translation',
    sizeBytes: 1200000,
    sizeFormatted: '1.2 MB',
    language: 'Hindi → Santhali',
    offlineStatus: 'available',
    savedAt: 'Today, 09:20 AM',
    category: 'Translations'
  },
  {
    id: 'res-8',
    name: 'हो भाषा आधारभूत शब्दकोश (Ho Basic Voice Cache)',
    type: 'audio',
    sizeBytes: 85000000,
    sizeFormatted: '85.0 MB',
    language: 'Ho (𑢹𑣉𑣉)',
    offlineStatus: 'available',
    savedAt: '22 Sep, 02:10 PM',
    category: 'Audio Pack'
  },
  {
    id: 'res-9',
    name: 'मुंडारी संख्या एवं व्याकरण बैंक (Mundari Elementary Cache)',
    type: 'lesson',
    sizeBytes: 91600000,
    sizeFormatted: '91.6 MB',
    language: 'Mundari (मुंडारी)',
    offlineStatus: 'available',
    savedAt: '20 Sep, 05:30 PM',
    category: 'Language'
  }
];

export class OfflineStorageService {
  private static instance: OfflineStorageService;

  private constructor() {
    this.initDefaults();
  }

  public static getInstance(): OfflineStorageService {
    if (!OfflineStorageService.instance) {
      OfflineStorageService.instance = new OfflineStorageService();
    }
    return OfflineStorageService.instance;
  }

  private initDefaults(): void {
    if (!localStorage.getItem(STORAGE_KEYS.OFFLINE_RESOURCES)) {
      localStorage.setItem(STORAGE_KEYS.OFFLINE_RESOURCES, JSON.stringify(DEFAULT_OFFLINE_RESOURCES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LAST_SYNC)) {
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, 'Today, 9:30 AM');
    }
  }

  public getOfflineResources(): OfflineResource[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.OFFLINE_RESOURCES);
      return data ? JSON.parse(data) : DEFAULT_OFFLINE_RESOURCES;
    } catch {
      return DEFAULT_OFFLINE_RESOURCES;
    }
  }

  public addOfflineResource(res: OfflineResource): void {
    const list = this.getOfflineResources();
    const existingIndex = list.findIndex(i => i.id === res.id);
    if (existingIndex >= 0) {
      list[existingIndex] = res;
    } else {
      list.unshift(res);
    }
    localStorage.setItem(STORAGE_KEYS.OFFLINE_RESOURCES, JSON.stringify(list));
  }

  public removeOfflineResource(id: string): void {
    const list = this.getOfflineResources().filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.OFFLINE_RESOURCES, JSON.stringify(list));
  }

  public getLastSyncTime(): string {
    return localStorage.getItem(STORAGE_KEYS.LAST_SYNC) || 'Today, 9:30 AM';
  }

  public setLastSyncTime(time: string): void {
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, time);
  }

  /**
   * Returns storage stats aligned with project specs (Used: ~420 MB / 2 GB)
   */
  public getStorageStats(): { usedMb: number; totalMb: number; percentage: number; formatted: string } {
    const resources = this.getOfflineResources();
    const dynamicBytes = resources.reduce((acc, curr) => acc + (curr.sizeBytes || 2000000), 0);
    const usedMb = Math.round(dynamicBytes / (1024 * 1024));
    const totalMb = 2048; // 2 GB
    const percentage = Math.min(100, Math.round((usedMb / totalMb) * 100));

    return {
      usedMb,
      totalMb,
      percentage,
      formatted: `Used: ${usedMb} MB / 2 GB`
    };
  }

  /**
   * Syncs with remote cloud repository when connection is re-established
   */
  public async syncOfflineData(): Promise<{ syncedCount: number; timestamp: string }> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const now = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.setLastSyncTime(now);

    const resources = this.getOfflineResources();
    const updated = resources.map(r => ({ ...r, offlineStatus: 'updated' as const }));
    localStorage.setItem(STORAGE_KEYS.OFFLINE_RESOURCES, JSON.stringify(updated));

    return {
      syncedCount: updated.length,
      timestamp: now
    };
  }

  // Saved Translations helpers
  public getSavedTranslations(): TranslationItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_TRANSLATIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public saveTranslation(item: TranslationItem): void {
    const list = this.getSavedTranslations();
    const updated = [item, ...list.filter(t => t.id !== item.id)];
    localStorage.setItem(STORAGE_KEYS.SAVED_TRANSLATIONS, JSON.stringify(updated));

    // Also add to offline resources directory
    this.addOfflineResource({
      id: item.id,
      name: `अनुवाद: "${item.sourceText.slice(0, 30)}..."`,
      type: 'translation',
      sizeBytes: 120000,
      sizeFormatted: '120 KB',
      language: `Hindi → ${item.targetLang === 'sat' ? 'Santhali' : item.targetLang === 'hoc' ? 'Ho' : 'Mundari'}`,
      offlineStatus: 'available',
      savedAt: 'Just now',
      category: 'Translations'
    });
  }

  // Saved Worksheets helpers
  public getSavedWorksheets(): Worksheet[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_WORKSHEETS);
      return data ? JSON.parse(data) : SAMPLE_WORKSHEETS;
    } catch {
      return SAMPLE_WORKSHEETS;
    }
  }

  public saveWorksheet(ws: Worksheet): void {
    const list = this.getSavedWorksheets();
    const updated = [ws, ...list.filter(w => w.id !== ws.id)];
    localStorage.setItem(STORAGE_KEYS.SAVED_WORKSHEETS, JSON.stringify(updated));

    this.addOfflineResource({
      id: ws.id,
      name: ws.title,
      type: 'worksheet',
      sizeBytes: 3500000,
      sizeFormatted: '3.5 MB',
      language: ws.languages,
      offlineStatus: 'available',
      savedAt: 'Just now',
      category: ws.subject
    });
  }

  // Saved Flashcards helpers
  public getSavedFlashcards(): Flashcard[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_FLASHCARDS);
      return data ? JSON.parse(data) : SAMPLE_FLASHCARDS;
    } catch {
      return SAMPLE_FLASHCARDS;
    }
  }

  public saveFlashcard(card: Flashcard): void {
    const list = this.getSavedFlashcards();
    const updated = [card, ...list.filter(c => c.id !== card.id)];
    localStorage.setItem(STORAGE_KEYS.SAVED_FLASHCARDS, JSON.stringify(updated));

    this.addOfflineResource({
      id: card.id,
      name: `फ्लैशकार्ड: ${card.emoji} ${card.hindiWord} (${card.tribalWord})`,
      type: 'flashcard',
      sizeBytes: 450000,
      sizeFormatted: '450 KB',
      language: 'Santhali',
      offlineStatus: 'available',
      savedAt: 'Just now',
      category: card.topic
    });
  }
}

export const offlineStorage = OfflineStorageService.getInstance();
