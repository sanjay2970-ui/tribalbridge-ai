import { 
  LanguageCode, 
  TeachingContext, 
  TranslationItem, 
  Worksheet, 
  WorksheetQuestion, 
  QuestionType, 
  Flashcard 
} from '../types';
import { AUTHENTIC_VOCAB } from '../data/authenticVocab';

/**
 * AI Service Layer (Prototype & Extensible Architecture)
 * 
 * In production, these methods will make real API calls to:
 * - Google Gemini API (gemini-1.5-flash / gemini-2.0-flash) for generative worksheets, flashcards, pedagogical context
 * - Government of India Bhashini / IndicTrans2 API for specialized Santhali, Ho, and Mundari neural translation
 * - AI4Bharat / IndicWav2Vec for tribal Automatic Speech Recognition (ASR) and Text-to-Speech (TTS)
 */

export class AIService {
  private static instance: AIService;

  private constructor() {}

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Translates Hindi text into Santhali, Ho, or Mundari based on pedagogical context.
   */
  public async translateText(
    hindiText: string,
    targetLang: LanguageCode = 'sat',
    context: TeachingContext = 'lesson'
  ): Promise<TranslationItem> {
    // Simulate network / inference latency (400ms - 900ms)
    await new Promise((resolve) => setTimeout(resolve, 650));

    const cleanInput = hindiText.trim();
    if (!cleanInput) {
      throw new Error('Please enter text to translate.');
    }

    // 1. Check authentic verified vocabulary first
    const directMatch = AUTHENTIC_VOCAB.find(
      (v) => v.hindi.toLowerCase() === cleanInput.toLowerCase() ||
             cleanInput.includes(v.hindi) ||
             v.hindi.includes(cleanInput)
    );

    if (directMatch) {
      if (targetLang === 'sat') {
        return {
          id: `trans-${Date.now()}`,
          sourceText: cleanInput,
          sourceLang: 'hi',
          targetLang: 'sat',
          targetText: directMatch.santhali.latin,
          targetOlChiki: directMatch.santhali.olchiki,
          targetDevanagari: directMatch.santhali.devanagari,
          phonetic: directMatch.santhali.latin,
          confidence: 96,
          context,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          savedOffline: false,
          notes: 'Verified against primary education linguistic corpus.'
        };
      } else if (targetLang === 'hoc' && directMatch.ho) {
        return {
          id: `trans-${Date.now()}`,
          sourceText: cleanInput,
          sourceLang: 'hi',
          targetLang: 'hoc',
          targetText: directMatch.ho.latin,
          targetOlChiki: directMatch.ho.native,
          targetDevanagari: directMatch.ho.devanagari,
          phonetic: directMatch.ho.latin,
          confidence: 92,
          context,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          savedOffline: false,
          notes: 'Ho language prototype translation.'
        };
      } else if (targetLang === 'unr' && directMatch.mundari) {
        return {
          id: `trans-${Date.now()}`,
          sourceText: cleanInput,
          sourceLang: 'hi',
          targetLang: 'unr',
          targetText: directMatch.mundari.latin,
          targetOlChiki: directMatch.mundari.native,
          targetDevanagari: directMatch.mundari.devanagari,
          phonetic: directMatch.mundari.latin,
          confidence: 90,
          context,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          savedOffline: false,
          notes: 'Mundari language prototype translation.'
        };
      }
    }

    // 2. Intelligent linguistic synthesis for novel inputs
    // Build context-adapted translation simulation
    let prefixOlChiki = '';
    let prefixLatin = '';
    let prefixDevanagari = '';

    if (context === 'instruction') {
      prefixOlChiki = 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ: ';
      prefixLatin = 'Gidra ko: ';
      prefixDevanagari = 'गिदरा को: ';
    } else if (context === 'question') {
      prefixOlChiki = 'ᱠᱩᱠᱞᱤ: ';
      prefixLatin = 'Kukli: ';
      prefixDevanagari = 'कुकली: ';
    }

    // Realistic Santhali phrasing synthesis
    const words = cleanInput.split(' ');
    const isQuestion = cleanInput.endsWith('?') || cleanInput.includes('क्या') || cleanInput.includes('कहाँ') || cleanInput.includes('कैसे');

    let translatedLatin = '';
    let translatedOlChiki = '';
    let translatedDevanagari = '';

    if (targetLang === 'sat') {
      if (cleanInput.includes('बैठ') || cleanInput.includes('बैठो')) {
        translatedOlChiki = prefixOlChiki + 'ᱟᱯᱮ ᱟᱯᱱᱟᱨ ᱴᱷᱟᱶ ᱨᱮ ᱫᱩᱲᱩᱵ ᱯᱮ᱾';
        translatedLatin = prefixLatin + 'Ape apnar thaw re durup pe.';
        translatedDevanagari = prefixDevanagari + 'आपे आपनार ठाँव रे दुड़ुप पे।';
      } else if (cleanInput.includes('किताब') || cleanInput.includes('पढ़')) {
        translatedOlChiki = prefixOlChiki + 'ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱠᱟᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱯᱮ᱾';
        translatedLatin = prefixLatin + 'Apeyag puthi jhij kate parhaw pe.';
        translatedDevanagari = prefixDevanagari + 'आपेयाग पुथी झिज काते पाड़हाव पे।';
      } else if (cleanInput.includes('गिनती') || cleanInput.includes('संख्या') || cleanInput.includes('1')) {
        translatedOlChiki = prefixOlChiki + 'ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱚ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾';
        translatedLatin = prefixLatin + 'Teheñ do abo lekha bon ced-a.';
        translatedDevanagari = prefixDevanagari + 'तेहेञ दो आबो लेखा बोन चेद-आ।';
      } else if (cleanInput.includes('पानी') || cleanInput.includes('जल')) {
        translatedOlChiki = prefixOlChiki + 'ᱫᱟᱜ ᱫᱚ ᱟᱹᱰᱤ ᱜᱚᱱᱚᱝ-ᱟᱱ ᱡᱤᱱᱤᱥ ᱠᱟᱱᱟ᱾';
        translatedLatin = prefixLatin + 'Dak do adi gonong-an jinis kana.';
        translatedDevanagari = prefixDevanagari + 'दाक दो आडी गोनोंग-आन जिनिस काना।';
      } else if (isQuestion) {
        translatedOlChiki = prefixOlChiki + 'ᱱᱚᱣᱟ ᱨᱮᱭᱟᱜ ᱛᱮᱞᱟ ᱪᱮᱫ ᱦᱩᱭᱩᱜ-ᱟ?';
        translatedLatin = prefixLatin + 'Nowa reak tela ced huyug-a?';
        translatedDevanagari = prefixDevanagari + 'नोवा रेयाग तेला चेद हुयुग-आ?';
      } else {
        // Transparent demo synthesis with clear phonetic structure
        translatedOlChiki = prefixOlChiki + `[ᱥᱟᱱᱛᱟᱲᱤ ᱛᱚᱨᱡᱚᱢᱟ] ᱟᱵᱚ ᱥᱮᱪᱮᱫ ᱞᱟᱹᱜᱤᱫ ᱱᱚᱣᱟ ᱵᱟᱰᱟᱭ ᱞᱟᱹᱠᱛᱤ: "${cleanInput}"`;
        translatedLatin = prefixLatin + `[Santhali Demo] Abo seced lagit nowa baday lakti: "${cleanInput}"`;
        translatedDevanagari = prefixDevanagari + `[संथाली अनुवाद] आबो सेचेद लागिद नोवा बाडाय लाकती: "${cleanInput}"`;
      }
    } else if (targetLang === 'hoc') {
      translatedOlChiki = `[Ho] ᱟᱵᱩ ᱤᱛᱩ ᱞᱟᱹᱜᱤᱫ ᱱᱮᱱᱟ ᱤᱛᱩ ᱡᱟᱹᱨᱩᱨ: "${cleanInput}"`;
      translatedLatin = `[Ho Demo] Abu itu lagid nena itu jarur: "${cleanInput}"`;
      translatedDevanagari = `[हो अनुवाद] आबु इतु लागिद नेना इतु जारुर: "${cleanInput}"`;
    } else {
      translatedOlChiki = `[Mundari] ᱟᱵᱩ ᱪᱮᱫ ᱞᱟᱹᱜᱤᱫ ᱱᱮᱭᱟ ᱪᱮᱫ ᱡᱟᱹᱨᱩᱨ: "${cleanInput}"`;
      translatedLatin = `[Mundari Demo] Abu ched lagid neya ched jarur: "${cleanInput}"`;
      translatedDevanagari = `[मुंडारी अनुवाद] आबु चेद लागिद नेया चेद जारुर: "${cleanInput}"`;
    }

    return {
      id: `trans-${Date.now()}`,
      sourceText: cleanInput,
      sourceLang: 'hi',
      targetLang,
      targetText: translatedLatin,
      targetOlChiki: translatedOlChiki,
      targetDevanagari: translatedDevanagari,
      phonetic: translatedLatin,
      confidence: directMatch ? 95 : 84,
      context,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      savedOffline: false,
      notes: 'Linguistic prototype translation for classroom instruction.'
    };
  }

  /**
   * Generates a pedagogically structured, bilingual worksheet for primary grades.
   */
  public async generateWorksheet(params: {
    subject: string;
    grade: number;
    topic: string;
    questionType: QuestionType;
    questionCount: number;
    language: string;
  }): Promise<Worksheet> {
    // Simulate AI generation time
    await new Promise((resolve) => setTimeout(resolve, 800));

    const questions: WorksheetQuestion[] = [];
    const count = params.questionCount || 5;

    if (params.subject === 'Mathematics') {
      const items = [
        { emoji: '🍎 🍎 🍎', hindi: 'चित्र में कितने सेब हैं?', satLatin: 'Tinạk seb menaga?', satOl: 'ᱛᱤᱱᱟᱹᱜ ᱥᱮᱣ ᱢᱮᱱᱟᱜ-ᱟ?', opts: ['A. 2 (Bar)', 'B. 3 (Pe)', 'C. 4 (Pon)'], ans: 'B. 3 (Pe)' },
        { emoji: '🐘 🐘', hindi: 'चित्र में कितने हाथी हैं?', satLatin: 'Tinạk hathi menak\'koa?', satOl: 'ᱛᱤᱱᱟᱹᱜ ᱦᱟᱹᱛᱤ ᱢᱮᱱᱟᱜ ᱠᱳᱣᱟ?', opts: ['A. 1 (Mit\')', 'B. 2 (Bar)', 'C. 3 (Pe)'], ans: 'B. 2 (Bar)' },
        { emoji: '⭐ ⭐ ⭐ ⭐ ⭐', hindi: 'आकाश में कितने तारे हैं?', satLatin: 'Tinạk ipil menak\'koa?', satOl: 'ᱛᱤᱱᱟᱹᱜ ᱤᱯᱤᱞ ᱢᱮᱱᱟᱜ ᱠᱳᱣᱟ?', opts: ['A. 5 (Mõṛẽ)', 'B. 4 (Pon)', 'C. 6 (Turuy)'], ans: 'A. 5 (Mõṛẽ)' },
        { emoji: '🌳', hindi: 'मैदान में कितने पेड़ हैं?', satLatin: 'Tinạk dare menaga?', satOl: 'ᱛᱤᱱᱟᱹᱜ ᱫᱟᱨᱮ ᱢᱮᱱᱟᱜ-ᱟ?', opts: ['A. 1 (Mit\')', 'B. 2 (Bar)', 'C. 3 (Pe)'], ans: 'A. 1 (Mit\')' },
        { emoji: '🐟 🐟 🐟 🐟', hindi: 'तालाब में कितनी मछलियाँ हैं?', satLatin: 'Tinạk haku menak\'koa?', satOl: 'ᱛᱤᱱᱟᱹᱜ ᱦᱟᱹᱠᱩ ᱢᱮᱱᱟᱜ ᱠᱳᱣᱟ?', opts: ['A. 3 (Pe)', 'B. 4 (Pon)', 'C. 5 (Mõṛẽ)'], ans: 'B. 4 (Pon)' },
        { emoji: '✏️ ✏️ ✏️ ✏️ ✏️ ✏️', hindi: 'मेज़ पर कितनी पेंसिलें हैं?', satLatin: 'Tinạk pensil menaga?', satOl: 'ᱛᱤᱱᱟᱹᱜ ᱯᱮᱱᱥᱤᱞ ᱢᱮᱱᱟᱜ-ᱟ?', opts: ['A. 5 (Mõṛẽ)', 'B. 6 (Turuy)', 'C. 7 (Eyay)'], ans: 'B. 6 (Turuy)' },
        { emoji: '🌸 🌸 🌸 🌸 🌸 🌸 🌸', hindi: 'बगीचे में कितने फूल हैं?', satLatin: 'Tinạk baha menaga?', satOl: 'ᱛᱤᱱᱟᱹᱜ ᱵᱟᱦᱟ ᱢᱮᱱᱟᱜ-ᱟ?', opts: ['A. 7 (Eyay)', 'B. 8 (Irəl)', 'C. 6 (Turuy)'], ans: 'A. 7 (Eyay)' },
        { emoji: '🐦 🐦 🐦 🐦 🐦 🐦 🐦 🐦', hindi: 'डाल पर कितनी चिड़ियाँ हैं?', satLatin: 'Tinạk cẽṛẽ menak\'koa?', satOl: 'ᱛᱤᱱᱟᱹᱜ ᱪᱮᱸᱬᱮ ᱢᱮᱱᱟᱜ ᱠᱳᱣᱟ?', opts: ['A. 8 (Irəl)', 'B. 9 (Are)', 'C. 7 (Eyay)'], ans: 'A. 8 (Irəl)' },
        { emoji: '🥭 🥭 🥭 🥭 🥭 🥭 🥭 🥭 🥭', hindi: 'टोकरी में कितने आम हैं?', satLatin: 'Tinạk ul menaga?', satOl: 'ᱛᱤᱱᱟᱹᱜ ᱩᱞ ᱢᱮᱱᱟᱜ-ᱟ?', opts: ['A. 9 (Are)', 'B. 8 (Irəl)', 'C. 10 (Gel)'], ans: 'A. 9 (Are)' },
        { emoji: '🖐️ 🖐️', hindi: 'दोनों हाथों में कुल कितनी उंगलियाँ हैं?', satLatin: 'Baria ti re tinạk kaṭup\' menaga?', satOl: 'ᱵᱟᱨᱭᱟ ᱛᱤ ᱨᱮ ᱛᱤᱱᱟᱹᱜ ᱠᱟᱹᱴᱩᱵ ᱢᱮᱱᱟᱜ-ᱟ?', opts: ['A. 8 (Irəl)', 'B. 9 (Are)', 'C. 10 (Gel)'], ans: 'C. 10 (Gel)' }
      ];

      for (let i = 0; i < Math.min(count, items.length); i++) {
        const item = items[i];
        questions.push({
          id: i + 1,
          visualEmoji: item.emoji,
          questionHindi: `${item.hindi} सही संख्या चुनिए:`,
          questionTribal: `${item.satLatin} Sạri lekhạ salaye pe:`,
          questionOlChiki: `${item.satOl} ᱥᱟᱹᱨᱤ ᱞᱮᱠᱷᱟ ᱵᱟᱪᱷᱟᱣ ᱯᱮ:`,
          phonetic: item.satLatin,
          options: item.opts,
          answer: item.ans,
          explanation: `Visual count corresponding to Hindi and Santhali number.`
        });
      }
    } else {
      // EVS / Science / Language questions
      const evsItems = [
        { emoji: '🐘', qH: 'हाथी को संथाली में क्या कहते हैं?', qT: 'Hathi do Santhali te ced ko metaya?', qOl: 'ᱦᱟᱹᱛᱤ ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱭᱟ?', opts: ['A. ᱦᱟᱹᱛᱤ (Hati)', 'B. ᱛᱟᱹᱨᱩᱵ (Tarup\')', 'C. ᱜᱟᱹᱭ (Gại)'], ans: 'A. ᱦᱟᱹᱛᱤ (Hati)' },
        { emoji: '🌳', qH: 'पेड़ को संथाली में क्या कहते हैं?', qT: 'Ped do Santhali te ced ko metaya?', qOl: 'ᱫᱟᱨᱮ ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱭᱟ?', opts: ['A. ᱫᱟᱨᱮ (Dare)', 'B. ᱫᱟᱜ (Dak\')', 'C. ᱵᱟᱦᱟ (Baha)'], ans: 'A. ᱫᱟᱨᱮ (Dare)' },
        { emoji: '💧', qH: 'पानी को संथाली में क्या कहते हैं?', qT: 'Pani do Santhali te ced ko metaya?', qOl: 'ᱫᱟᱜ ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱭᱟ?', opts: ['A. ᱫᱟᱜ (Dak\')', 'B. ᱥᱤᱧ (Siñ)', 'C. ᱦᱟᱥᱟ (Hasa)'], ans: 'A. ᱫᱟᱜ (Dak\')' },
        { emoji: '🌸', qH: 'फूल को संथाली में क्या कहते हैं?', qT: 'Phool do Santhali te ced ko metaya?', qOl: 'ᱵᱟᱦᱟ ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱭᱟ?', opts: ['A. ᱵᱟᱦᱟ (Baha)', 'B. ᱡᱚ (Jo)', 'C. ᱥᱟᱠᱟᱢ (Sakam)'], ans: 'A. ᱵᱟᱦᱟ (Baha)' },
        { emoji: '🐄', qH: 'गाय हमें क्या देती है?', qT: 'Gại do abo ced emabonaye?', qOl: 'ᱜᱟᱹᱭ ᱫᱚ ᱟᱵᱚ ᱪᱮᱫ ᱮᱢᱟᱵᱚᱱᱟᱭ?', opts: ['A. ᱛᱳᱣᱟ (Toa / Milk)', 'B. ᱫᱟᱜ (Dak\')', 'C. ᱫᱟᱨᱮ (Dare)'], ans: 'A. ᱛᱳᱣᱟ (Toa / Milk)' }
      ];

      for (let i = 0; i < Math.min(count, evsItems.length); i++) {
        const item = evsItems[i];
        questions.push({
          id: i + 1,
          visualEmoji: item.emoji,
          questionHindi: item.qH,
          questionTribal: item.qT,
          questionOlChiki: item.qOl,
          phonetic: item.qT,
          options: item.opts,
          answer: item.ans,
          explanation: `Vocabulary check for ${params.topic}.`
        });
      }
    }

    return {
      id: `ws-${Date.now()}`,
      title: `${params.topic} — द्विभाषी कार्यपत्रक (Bilingual Worksheet)`,
      subject: params.subject,
      grade: params.grade,
      topic: params.topic,
      questionType: params.questionType,
      questionCount: questions.length,
      languages: params.language || 'Hindi + Santhali',
      questions,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      savedOffline: false
    };
  }

  /**
   * Generates interactive flashcards for a specific topic and grade.
   */
  public async generateFlashcards(topic: string, grade: number = 1): Promise<Flashcard[]> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Return rich flashcards tailored to the topic
    const baseCards: Record<string, Flashcard[]> = {
      Animals: [
        {
          id: `fc-gen-1`,
          topic: 'Animals',
          grade,
          emoji: '🐘',
          hindiWord: 'हाथी (Elephant)',
          tribalWord: 'Hati',
          tribalOlChiki: 'ᱦᱟᱹᱛᱤ',
          phonetic: 'Haa-ti',
          sampleSentenceHindi: 'हाथी जंगल का सबसे बड़ा जानवर है।',
          sampleSentenceTribal: 'Hati do bir re sanam khon marang janwar kana.',
          sampleSentenceOlChiki: 'ᱦᱟᱹᱛᱤ ᱫᱚ ᱵᱤᱨ ᱨᱮ ᱥᱟᱱᱟᱢ ᱠᱷᱚᱱ ᱢᱟᱨᱟᱝ ᱡᱤᱭᱟᱹᱞᱤ ᱠᱟᱱᱟᱭ᱾',
          savedOffline: false
        },
        {
          id: `fc-gen-2`,
          topic: 'Animals',
          grade,
          emoji: '🐅',
          hindiWord: 'बाघ (Tiger)',
          tribalWord: 'Tarup\'',
          tribalOlChiki: 'ᱛᱟᱹᱨᱩᱵ',
          phonetic: 'Taa-roop',
          sampleSentenceHindi: 'बाघ एक ताकतवर जंगली जानवर है।',
          sampleSentenceTribal: 'Tarup\' do mit ketej bir janwar kana.',
          sampleSentenceOlChiki: 'ᱛᱟᱹᱨᱩᱵ ᱫᱚ ᱢᱤᱫ ᱠᱮᱴᱮᱡ ᱵᱤᱨ ᱡᱤᱭᱟᱹᱞᱤ ᱠᱟᱱᱟᱭ᱾',
          savedOffline: false
        },
        {
          id: `fc-gen-3`,
          topic: 'Animals',
          grade,
          emoji: '🐐',
          hindiWord: 'बकरी (Goat)',
          tribalWord: 'Merom',
          tribalOlChiki: 'ᱢᱮᱨᱚᱢ',
          phonetic: 'May-rom',
          sampleSentenceHindi: 'बकरी हरी पत्तियाँ खाती है।',
          sampleSentenceTribal: 'Merom do hariyad sakam jomaye.',
          sampleSentenceOlChiki: 'ᱢᱮᱨᱚᱢ ᱫᱚ ᱦᱟᱹᱨᱤᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ ᱡᱚᱢᱟᱭ᱾',
          savedOffline: false
        },
        {
          id: `fc-gen-4`,
          topic: 'Animals',
          grade,
          emoji: '🐕',
          hindiWord: 'कुत्ता (Dog)',
          tribalWord: 'Seta',
          tribalOlChiki: 'ᱥᱮᱛᱟ',
          phonetic: 'Say-taa',
          sampleSentenceHindi: 'कुत्ता घर की रखवाली करता है।',
          sampleSentenceTribal: 'Seta do orak reak rukhiya korawe.',
          sampleSentenceOlChiki: 'ᱥᱮᱛᱟ ᱫᱚ ᱚᱲᱟᱜ ᱨᱮᱭᱟᱜ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱠᱚᱨᱟᱣᱟᱭ᱾',
          savedOffline: false
        }
      ],
      Nature: [
        {
          id: `fc-gen-5`,
          topic: 'Nature',
          grade,
          emoji: '🌳',
          hindiWord: 'पेड़ (Tree)',
          tribalWord: 'Dare',
          tribalOlChiki: 'ᱫᱟᱨᱮ',
          phonetic: 'Daa-ray',
          sampleSentenceHindi: 'पेड़ हमें फल और छाया देते हैं।',
          sampleSentenceTribal: 'Dare do abo jo ar umul emabonaye.',
          sampleSentenceOlChiki: 'ᱫᱟᱨᱮ ᱫᱚ ᱟᱵᱚ ᱡᱚ ᱟᱨ ᱩᱢᱩᱞ ᱮᱢᱟᱵᱚᱱᱟᱭ᱾',
          savedOffline: false
        },
        {
          id: `fc-gen-6`,
          topic: 'Nature',
          grade,
          emoji: '🌧️',
          hindiWord: 'बारिश (Rain)',
          tribalWord: 'Dagi',
          tribalOlChiki: 'ᱫᱟᱹᱜᱤ / ᱡᱟᱹᱲᱤ',
          phonetic: 'Jari / Dak-jori',
          sampleSentenceHindi: 'बारिश से फसलें हरी-भरी होती हैं।',
          sampleSentenceTribal: 'Jari khon ghasa-pati hariyad kog-a.',
          sampleSentenceOlChiki: 'ᱡᱟᱹᱲᱤ ᱠᱷᱚᱱ ᱜᱷᱟᱸᱥ-ᱯᱟᱹᱛᱤ ᱦᱟᱹᱨᱤᱭᱟᱹᱲ ᱠᱚᱜ-ᱟ᱾',
          savedOffline: false
        }
      ]
    };

    return baseCards[topic] || baseCards['Animals'];
  }

  /**
   * Simulates classroom speech-to-text recognition with realistic teacher phrases.
   */
  public async speechToText(promptIndex: number = 0): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1400));
    const prompts = [
      "अपनी किताब का पृष्ठ संख्या 5 खोलिए।",
      "आज हम 1 से 10 तक की गिनती सीखेंगे।",
      "सभी बच्चे अपनी-अपनी जगह पर बैठ जाएं।",
      "ध्यान से सुनें और समझें।",
      "कृपया ब्लैकबोर्ड की तरफ देखें।"
    ];
    return prompts[promptIndex % prompts.length];
  }
}

export const aiService = AIService.getInstance();
