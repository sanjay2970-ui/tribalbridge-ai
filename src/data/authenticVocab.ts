import { LanguageInfo } from '../types';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'sat',
    name: 'Santhali',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ (Santhali)',
    script: 'Ol Chiki / Devanagari',
    region: 'Santhal Pargana & Chota Nagpur, Jharkhand',
    isPrimary: true,
  },
  {
    code: 'hoc',
    name: 'Ho',
    nativeName: '𑢹𑣉𑣉 (Ho)',
    script: 'Warang Chiti / Devanagari',
    region: 'Kolhan Division (West Singhbhum), Jharkhand',
    isPrimary: false,
  },
  {
    code: 'unr',
    name: 'Mundari',
    nativeName: 'मुंडारी (Mundari)',
    script: 'Mundari Bani / Devanagari',
    region: 'Khunti & Ranchi Districts, Jharkhand',
    isPrimary: false,
  }
];

export interface VocabEntry {
  hindi: string;
  santhali: {
    olchiki: string;
    latin: string;
    devanagari: string;
  };
  ho?: {
    native: string;
    latin: string;
    devanagari: string;
  };
  mundari?: {
    native: string;
    latin: string;
    devanagari: string;
  };
  category: 'classroom' | 'numbers' | 'nature' | 'animals' | 'food' | 'greeting';
  audioKey: string;
}

export const AUTHENTIC_VOCAB: VocabEntry[] = [
  // Greetings & Classroom Commands
  {
    hindi: "नमस्ते, बच्चों!",
    santhali: {
      olchiki: "ᱡᱚᱦᱟᱨ, ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ!",
      latin: "Johar, gidra ko!",
      devanagari: "जोहार, गिद्रा को!"
    },
    ho: {
      native: "ᱡᱚᱦᱟᱨ, ᱦᱚᱯᱚᱱ ᱠᱚ!",
      latin: "Johar, hopon ko!",
      devanagari: "जोहार, होपोन् को!"
    },
    mundari: {
      native: "ᱡᱚᱦᱟᱨ, ᱦᱚᱱ ᱠᱚ!",
      latin: "Johar, hon ko!",
      devanagari: "जोहार, होन को!"
    },
    category: 'greeting',
    audioKey: 'johar_gidra'
  },
  {
    hindi: "आज हम 1 से 10 तक की गिनती सीखेंगे।",
    santhali: {
      olchiki: "ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱚ ᱑ ᱠᱷᱚᱱ ᱑᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾",
      latin: "Teheñ do abo 1 khon 10 dhabij lekha bon ced-a.",
      devanagari: "तेहेञ दो आबो १ खोन १० धाबिज लेखा बोन चेद-आ।"
    },
    ho: {
      native: "ᱛᱤᱥᱤᱝ ᱫᱚ ᱟᱵᱩ ᱑ ᱮᱛᱮ ᱑᱐ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱩ ᱤᱛᱩ-ᱟ᱾",
      latin: "Tising do abu 1 ete 10 habij lekha bu itu-a.",
      devanagari: "तिसिंग दो आबु १ एते १० हाबिज लेखा बु इतु-आ।"
    },
    mundari: {
      native: "ᱛᱤᱥᱤᱝ ᱫᱚ ᱟᱵᱩ ᱑ ᱟᱛᱮ ᱑᱐ ᱡᱟᱹᱠᱮᱫ ᱞᱮᱠᱷᱟ ᱵᱩ ᱪᱮᱫ-ᱟ᱾",
      latin: "Tising do abu 1 ate 10 jaked lekha bu ced-a.",
      devanagari: "तिसिंग दो आबु १ आते १० जाकेद लेखा बु चेद-आ।"
    },
    category: 'classroom',
    audioKey: 'today_learn_numbers'
  },
  {
    hindi: "अपनी किताब का पृष्ठ संख्या 5 खोलिए।",
    santhali: {
      olchiki: "ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱨᱮᱭᱟᱜ ᱥᱟᱦᱴᱟ ᱕ ᱡᱷᱤᱡᱽ ᱯᱮ᱾",
      latin: "Apeyag puthi reyag sahta 5 jhij pe.",
      devanagari: "आपेयाग पुथी रेयाग साहटा ५ झिज पे।"
    },
    category: 'classroom',
    audioKey: 'open_book_page_5'
  },
  {
    hindi: "कृपया अपनी किताबें खोलें।",
    santhali: {
      olchiki: "ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱯᱮ᱾",
      latin: "Daya kate apeyag puthi jhij pe.",
      devanagari: "दाया काते आपेयाग पुथी झिज पे।"
    },
    category: 'classroom',
    audioKey: 'open_books_please'
  },
  {
    hindi: "ध्यान से सुनें और समझें।",
    santhali: {
      olchiki: "ᱫᱷᱮᱭᱟᱱ ᱛᱮ ᱟᱧᱡᱚᱢ ᱯᱮ ᱟᱨ ᱵᱩᱡᱷᱟᱹᱣ ᱯᱮ᱾",
      latin: "Dheyan te anjom pe ar bujhau pe.",
      devanagari: "ध्यान ते आंजोम पे आर बुझाउ पे।"
    },
    category: 'classroom',
    audioKey: 'listen_carefully'
  },
  {
    hindi: "सभी बच्चे अपनी-अपनी जगह पर बैठ जाएं।",
    santhali: {
      olchiki: "ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱟᱯᱱᱟᱨ ᱟᱯᱱᱟᱨ ᱴᱷᱟᱶ ᱨᱮ ᱫᱩᱲᱩᱵ ᱯᱮ᱾",
      latin: "Joto gidra apnar apnar thaw re durup pe.",
      devanagari: "जोतो गिद्रा आपनार आपनार ठाँव रे दुड़ुप पे।"
    },
    category: 'classroom',
    audioKey: 'sit_down_all'
  },
  {
    hindi: "इसे अपनी कॉपी में लिखें।",
    santhali: {
      olchiki: "ᱱᱚᱣᱟ ᱫᱚ ᱟᱯᱮᱭᱟᱜ ᱠᱷᱟᱛᱟ ᱨᱮ ᱚᱞ ᱯᱮ᱾",
      latin: "Nowa do apeyag khata re ol pe.",
      devanagari: "नोवा दो आपेयाग खाता रे ओल पे।"
    },
    category: 'classroom',
    audioKey: 'write_in_copy'
  },
  {
    hindi: "जल ही जीवन है और हमें पानी बचाना चाहिए।",
    santhali: {
      olchiki: "ᱫᱟᱜ ᱜᱮ ᱡᱤᱣᱤ ᱠᱟᱱᱟ ᱟᱨ ᱟᱵᱚ ᱫᱚ ᱫᱟᱜ ᱵᱟᱧᱪᱟᱣ ᱦᱩᱭ ᱟᱵᱚᱱᱟ᱾",
      latin: "Dak' ge jiwi kana ar abo do dak' bañcaw huy abona.",
      devanagari: "दाक गे जीवी काना आर आबो दो दाक बांचाव हुय आबोना।"
    },
    category: 'nature',
    audioKey: 'water_is_life'
  },
  // Numbers 1 to 10
  {
    hindi: "एक (1)",
    santhali: {
      olchiki: "ᱢᱤᱫ (᱑)",
      latin: "Mit'",
      devanagari: "मिद"
    },
    category: 'numbers',
    audioKey: 'num_1'
  },
  {
    hindi: "दो (2)",
    santhali: {
      olchiki: "ᱵᱟᱨ (᱒)",
      latin: "Bar",
      devanagari: "बार"
    },
    category: 'numbers',
    audioKey: 'num_2'
  },
  {
    hindi: "तीन (3)",
    santhali: {
      olchiki: "ᱯᱮ (᱓)",
      latin: "Pe",
      devanagari: "पे"
    },
    category: 'numbers',
    audioKey: 'num_3'
  },
  {
    hindi: "चार (4)",
    santhali: {
      olchiki: "ᱯᱳᱱ (᱔)",
      latin: "Pon",
      devanagari: "पोन"
    },
    category: 'numbers',
    audioKey: 'num_4'
  },
  {
    hindi: "पाँच (5)",
    santhali: {
      olchiki: "ᱢᱚᱬᱮ (᱕)",
      latin: "Mõṛẽ",
      devanagari: "मोड़े"
    },
    category: 'numbers',
    audioKey: 'num_5'
  },
  {
    hindi: "छह (6)",
    santhali: {
      olchiki: "ᱛᱩᱨᱩᱭ (᱖)",
      latin: "Turuy",
      devanagari: "तुरुय"
    },
    category: 'numbers',
    audioKey: 'num_6'
  },
  {
    hindi: "सात (7)",
    santhali: {
      olchiki: "ᱮᱭᱟᱭ (᱗)",
      latin: "Eyay",
      devanagari: "एयाय"
    },
    category: 'numbers',
    audioKey: 'num_7'
  },
  {
    hindi: "आठ (8)",
    santhali: {
      olchiki: "ᱤᱨᱟᱹᱞ (᱘)",
      latin: "Irəl",
      devanagari: "इऱल"
    },
    category: 'numbers',
    audioKey: 'num_8'
  },
  {
    hindi: "नौ (9)",
    santhali: {
      olchiki: "ᱟᱨᱮ (᱙)",
      latin: "Are",
      devanagari: "आरे"
    },
    category: 'numbers',
    audioKey: 'num_9'
  },
  {
    hindi: "दस (10)",
    santhali: {
      olchiki: "ᱜᱮᱞ (᱑᱐)",
      latin: "Gel",
      devanagari: "गेल"
    },
    category: 'numbers',
    audioKey: 'num_10'
  }
];

export const DEMO_PROMPTS = [
  "आज हम 1 से 10 तक की गिनती सीखेंगे।",
  "अपनी किताब का पृष्ठ संख्या 5 खोलिए।",
  "कृपया अपनी किताबें खोलें।",
  "ध्यान से सुनें और समझें।",
  "जल ही जीवन है और हमें पानी बचाना चाहिए।"
];
