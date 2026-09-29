import { Worksheet } from '../types';

export const SAMPLE_WORKSHEETS: Worksheet[] = [
  {
    id: 'ws-1',
    title: 'गिनती और संख्या पहचान (Numbers 1–10 Practice)',
    subject: 'Mathematics',
    grade: 1,
    topic: 'Numbers 1–10',
    questionType: 'picture_based',
    questionCount: 5,
    languages: 'Hindi + Santhali',
    createdAt: 'Today, 09:15 AM',
    savedOffline: true,
    questions: [
      {
        id: 1,
        visualEmoji: '🍎 🍎 🍎',
        questionHindi: 'चित्र में कितने सेब हैं? सही संख्या चुनिए:',
        questionTribal: 'Chitər re tinạk seb menaga? Sạri lekhạ salaye pe:',
        questionOlChiki: 'ᱪᱤᱛᱟᱹᱨ ᱨᱮ ᱛᱤᱱᱟᱹᱜ ᱥᱮᱣ ᱢᱮᱱᱟᱜ-ᱟ? ᱥᱟᱹᱨᱤ ᱞᱮᱠᱷᱟ ᱵᱟᱪᱷᱟᱣ ᱯᱮ:',
        phonetic: 'Chitar re tinag seb menag-a? Sari lekha bachhaw pe:',
        options: ['A. 2 (Bar)', 'B. 3 (Pe)', 'C. 4 (Pon)'],
        answer: 'B. 3 (Pe)',
        explanation: 'There are 3 apples (Hindi: तीन, Santhali: ᱯᱮ / Pe).'
      },
      {
        id: 2,
        visualEmoji: '🐘 🐘',
        questionHindi: 'चित्र में कितने हाथी दिखाई दे रहे हैं?',
        questionTribal: 'Chitər re tinạk hathi ñelok kana?',
        questionOlChiki: 'ᱪᱤᱛᱟᱹᱨ ᱨᱮ ᱛᱤᱱᱟᱹᱜ ᱦᱟᱹᱛᱤ ᱧᱮᱞᱚᱜ ᱠᱟᱱᱟ?',
        phonetic: 'Chitar re tinag hati nyelog kana?',
        options: ['A. 1 (Mit\')', 'B. 2 (Bar)', 'C. 5 (Mõṛẽ)'],
        answer: 'B. 2 (Bar)',
        explanation: 'There are 2 elephants (Hindi: दो, Santhali: ᱵᱟᱨ / Bar).'
      },
      {
        id: 3,
        visualEmoji: '⭐ ⭐ ⭐ ⭐ ⭐',
        questionHindi: 'आकाश में कितने तारे चमक रहे हैं?',
        questionTribal: 'Serma re tinạk ipil jholok kana?',
        questionOlChiki: 'ᱥᱮᱨᱢᱟ ᱨᱮ ᱛᱤᱱᱟᱹᱜ ᱤᱯᱤᱞ ᱡᱷᱚᱞᱚᱜ ᱠᱟᱱᱟ?',
        phonetic: 'Serma re tinag ipil jholok kana?',
        options: ['A. 4 (Pon)', 'B. 5 (Mõṛẽ)', 'C. 6 (Turuy)'],
        answer: 'B. 5 (Mõṛẽ)',
        explanation: 'There are 5 stars (Hindi: पांच, Santhali: ᱢᱚᱬᱮ / More).'
      },
      {
        id: 4,
        visualEmoji: '🌳',
        questionHindi: 'चित्र में कितने पेड़ हैं?',
        questionTribal: 'Chitər re tinạk dare menaga?',
        questionOlChiki: 'ᱪᱤᱛᱟᱹᱨ ᱨᱮ ᱛᱤᱱᱟᱹᱜ ᱫᱟᱨᱮ ᱢᱮᱱᱟᱜ-ᱟ?',
        phonetic: 'Chitar re tinag dare menag-a?',
        options: ['A. 1 (Mit\')', 'B. 3 (Pe)', 'C. 2 (Bar)'],
        answer: 'A. 1 (Mit\')',
        explanation: 'There is 1 tree (Hindi: एक, Santhali: ᱢᱤᱫ / Mit).'
      },
      {
        id: 5,
        visualEmoji: '🐟 🐟 🐟 🐟',
        questionHindi: 'तालाब में कितनी मछलियाँ तैर रही हैं?',
        questionTribal: 'Pukhri re tinạk haku payra kanako?',
        questionOlChiki: 'ᱯᱩᱠᱷᱨᱤ ᱨᱮ ᱛᱤᱱᱟᱹᱜ ᱦᱟᱹᱠᱩ ᱯᱟᱭᱨᱟ ᱠᱟᱱᱟᱠᱳ?',
        phonetic: 'Pukhri re tinag haku payra kanako?',
        options: ['A. 3 (Pe)', 'B. 4 (Pon)', 'C. 7 (Eyay)'],
        answer: 'B. 4 (Pon)',
        explanation: 'There are 4 fishes (Hindi: चार, Santhali: ᱯᱳᱱ / Pon).'
      }
    ]
  },
  {
    id: 'ws-2',
    title: 'हमारे आस-पास के पशु (Animals Identification Worksheet)',
    subject: 'Environmental Studies',
    grade: 2,
    topic: 'Animals & Birds',
    questionType: 'mcq',
    questionCount: 5,
    languages: 'Hindi + Santhali',
    createdAt: 'Yesterday, 02:40 PM',
    savedOffline: true,
    questions: [
      {
        id: 1,
        visualEmoji: '🐅',
        questionHindi: 'बाघ को संथाली में क्या कहते हैं?',
        questionTribal: 'Bagh do Santhali te ced ko metaya?',
        questionOlChiki: 'ᱵᱟᱜᱷ ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱭᱟ?',
        options: ['A. ᱛᱟᱹᱨᱩᱵ (Tarup\')', 'B. ᱦᱟᱹᱛᱤ (Hati)', 'C. ᱢᱮᱨᱚᱢ (Merom)'],
        answer: 'A. ᱛᱟᱹᱨᱩᱵ (Tarup\')',
        explanation: 'Tiger is called Tarup (ᱛᱟᱹᱨᱩᱵ) in Santhali.'
      },
      {
        id: 2,
        visualEmoji: '🥛',
        questionHindi: 'हमें दूध देने वाला पशु कौन है?',
        questionTribal: 'Abo toa emog jib do okoe?',
        questionOlChiki: 'ᱟᱵᱚ ᱛᱳᱣᱟ ᱮᱢᱚᱜ ᱡᱤᱭᱟᱹᱞᱤ ᱫᱚ ᱚᱠᱚᱭ?',
        options: ['A. ᱜᱟᱹᱭ (Gại / Cow)', 'B. ᱛᱟᱹᱨᱩᱵ (Tarup\')', 'C. ᱛᱩᱭᱩ (Tuyu / Jackal)'],
        answer: 'A. ᱜᱟᱹᱭ (Gại / Cow)',
        explanation: 'Cow (Gại) provides milk.'
      }
    ]
  }
];
