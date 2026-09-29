import { Lesson } from '../types';

export const SAMPLE_LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'गिनती 1 से 10 (Numbers 1–10)',
    titleTribal: 'ᱞᱮᱠᱷᱟ ᱑ ᱠᱷᱚᱱ ᱑᱐ (Lekha 1 khon 10)',
    subject: 'Mathematics',
    grade: 1,
    language: 'Hindi → Santhali',
    durationMinutes: 30,
    offlineAvailable: true,
    learningObjective: 'Students will learn to recognize, pronounce, and count numbers 1 to 10 in both Hindi and their mother tongue (Santhali).',
    learningObjectiveTribal: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱑ ᱠᱷᱚᱱ ᱑᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱪᱤᱱᱦᱟᱹᱣ, ᱨᱚᱲ ᱟᱨ ᱞᱮᱠᱷᱟ ᱠᱚ ᱪᱮᱫ-ᱟ᱾',
    visualExample: {
      emoji: '🔢',
      label: 'गिनती के चित्र (Counting visual)',
      description: '1 सेब (Mit\') से लेकर 10 उँगलियों (Gel) तक की गिनती'
    },
    content: [
      {
        hindi: '1 (एक): हमारे पास एक सूर्य है।',
        tribal: 'Mit\': Abo then mit\' sing beṛa menaga.',
        tribalOlChiki: '᱑ (ᱢᱤᱫ): ᱟᱵᱚ ᱴᱷᱮᱱ ᱢᱤᱫ ᱥᱤᱧ ᱵᱮᱲᱟ ᱢᱮᱱᱟᱜ-ᱟ᱾',
        phonetic: 'Mit\': Abo then mit sing bera menag-a'
      },
      {
        hindi: '2 (दो): हमारी दो आँखें हैं।',
        tribal: 'Bar: Aboag bar met\' menaga.',
        tribalOlChiki: '᱒ (ᱵᱟᱨ): ᱟᱵᱚᱣᱟᱜ ᱵᱟᱨ ᱢᱮᱫ ᱢᱮᱱᱟᱜ-ᱟ᱾',
        phonetic: 'Bar: Aboag bar med menag-a'
      },
      {
        hindi: '3 (तीन): ऑटोरिक्शा के तीन पहिए होते हैं।',
        tribal: 'Pe: Autorickshaw reak\' pe caka tahẽkana.',
        tribalOlChiki: '᱓ (ᱯᱮ): ᱚᱴᱳᱨᱤᱠᱥᱟ ᱨᱮᱭᱟᱜ ᱯᱮ ᱪᱟᱠᱟ ᱛᱟᱦᱮᱸᱱᱟ᱾',
        phonetic: 'Pe: Autorickshaw reyag pe chaka tahena'
      },
      {
        hindi: '4 (चार): गाय के चार पैर होते हैं।',
        tribal: 'Pon: Gại reak\' pon jãṅga tahẽkana.',
        tribalOlChiki: '᱔ (ᱯᱳᱱ): ᱜᱟᱹᱭ ᱨᱮᱭᱟᱜ ᱯᱳᱱ ᱡᱟᱸᱜᱟ ᱛᱟᱦᱮᱸᱱᱟ᱾',
        phonetic: 'Pon: Gai reyag pon janga tahena'
      },
      {
        hindi: '5 (पाँच): हमारे एक हाथ में पाँच उंगलियाँ होती हैं।',
        tribal: 'Mõṛẽ: Aboak\' mit\' ti re mõṛẽ kaṭup\' menaga.',
        tribalOlChiki: '᱕ (ᱢᱚᱬᱮ): ᱟᱵᱚᱣᱟᱜ ᱢᱤᱫ ᱛᱤ ᱨᱮ ᱢᱚᱬᱮ ᱠᱟᱹᱴᱩᱵ ᱢᱮᱱᱟᱜ-ᱟ᱾',
        phonetic: 'More: Aboag mit ti re more katup menag-a'
      }
    ]
  },
  {
    id: 'lesson-2',
    title: 'हमारे आस-पास के जानवर (Animals Around Us)',
    titleTribal: 'ᱟᱵᱚ ᱟᱰᱮ-ᱯᱟᱥᱮ ᱨᱤᱱ ᱡᱤᱵᱽ-ᱡᱤᱭᱟᱹᱞᱤ (Abo ade-pase rin jib-jiyali)',
    subject: 'Environmental Studies',
    grade: 2,
    language: 'Hindi → Santhali',
    durationMinutes: 35,
    offlineAvailable: true,
    learningObjective: 'Identify domestic and wild animals in the local Jharkhand forest and village surroundings, and understand their sounds and roles.',
    learningObjectiveTribal: 'ᱟᱛᱳ ᱟᱨ ᱵᱤᱨ ᱨᱤᱱ ᱡᱤᱭᱟᱹᱞᱤ ᱠᱚ ᱪᱤᱱᱦᱟᱹᱣ ᱟᱨ ᱩᱱᱠᱩᱣᱟᱜ ᱥᱟᱰᱮ ᱵᱩᱡᱷᱟᱹᱣ᱾',
    visualExample: {
      emoji: '🐘',
      label: 'दलमा वन्यजीव (Dalma Wildlife)',
      description: 'हाथी (Hati), बाघ (Tarup), गाय (Gai), बकरी (Merom)'
    },
    content: [
      {
        hindi: 'हाथी झारखंड के जंगलों का सबसे बड़ा जानवर है।',
        tribal: 'Hati do Jharkhand bir reak\' sanam khon marang janwar kana.',
        tribalOlChiki: 'ᱦᱟᱹᱛᱤ ᱫᱚ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱵᱤᱨ ᱨᱮᱭᱟᱜ ᱥᱟᱱᱟᱢ ᱠᱷᱚᱱ ᱢᱟᱨᱟᱝ ᱡᱤᱭᱟᱹᱞᱤ ᱠᱟᱱᱟᱭ᱾',
        phonetic: 'Hati do Jharkhand bir reyag sanam khon marang jiyali kanaye.'
      },
      {
        hindi: 'गाय हमें मीठा दूध देती है।',
        tribal: 'Gại do abo sebil toa emabonaye.',
        tribalOlChiki: 'ᱜᱟᱹᱭ ᱫᱚ ᱟᱵᱚ ᱥᱤᱵᱤᱞ ᱛᱳᱣᱟ ᱮᱢᱟᱵᱚᱱᱟᱭ᱾',
        phonetic: 'Gai do abo sibil towa emabonaye.'
      },
      {
        hindi: 'पक्षी सुबह-सुबह मीठे गीत गाते हैं।',
        tribal: 'Cẽṛẽ ko seta-seta sebil seṛẽñ ko sereña.',
        tribalOlChiki: 'ᱪᱮᱸᱬᱮ ᱠᱚ ᱥᱮᱛᱟᱜ-ᱥᱮᱛᱟᱜ ᱥᱤᱵᱤᱞ ᱥᱮᱨᱮᱧ ᱠᱚ ᱥᱮᱨᱮᱧᱟ᱾',
        phonetic: 'Chere ko setag-setag sibil serenj ko serenja.'
      }
    ]
  },
  {
    id: 'lesson-3',
    title: 'पौधे के विभिन्न अंग (Parts of a Plant)',
    titleTribal: 'ᱫᱟᱨᱮ ᱨᱮᱭᱟᱜ ᱦᱟᱹᱴᱤᱧ ᱠᱚ (Dare reak\' hatiñ ko)',
    subject: 'Science',
    grade: 3,
    language: 'Hindi → Santhali',
    durationMinutes: 40,
    offlineAvailable: true,
    learningObjective: 'Understand the parts of a plant (root, stem, leaf, flower, fruit) through local sal and mahua trees.',
    learningObjectiveTribal: 'ᱫᱟᱨᱮ ᱨᱮᱭᱟᱜ ᱨᱮᱦᱮᱫ, ᱰᱟᱹᱨ, ᱥᱟᱠᱟᱢ, ᱵᱟᱦᱟ ᱟᱨ ᱡᱚ ᱵᱟᱵᱚᱛ ᱵᱟᱰᱟᱭ᱾',
    visualExample: {
      emoji: '🌱',
      label: 'पौधे का ढाँचा (Plant diagram)',
      description: 'जड़ (Rehed), तना (Dar), पत्ता (Sakam), फूल (Baha), फल (Jo)'
    },
    content: [
      {
        hindi: 'जड़ें पौधे को मिट्टी में मजबूती से पकड़ कर रखती हैं।',
        tribal: 'Rehed do dare hasa re get\' ket\'te sap\' dohoeya.',
        tribalOlChiki: 'ᱨᱮᱦᱮᱫ ᱫᱚ ᱫᱟᱨᱮ ᱦᱟᱥᱟ ᱨᱮ ᱠᱮᱴᱮᱡ ᱛᱮ ᱥᱟᱵ ᱫᱚᱦᱚᱭᱟᱭ᱾',
        phonetic: 'Rehed do dare hasa re ketej te sab dohoyaye.'
      },
      {
        hindi: 'पत्तियां पौधे के लिए धूप और पानी से भोजन बनाती हैं।',
        tribal: 'Sakam do dare lagit\' situṅ ar dak\' te jomag benawa.',
        tribalOlChiki: 'ᱥᱟᱠᱟᱢ ᱫᱚ ᱫᱟᱨᱮ ᱞᱟᱹᱜᱤᱫ ᱥᱤᱛᱩᱝ ᱟᱨ ᱫᱟᱜ ᱛᱮ ᱡᱚᱢᱟᱜ ᱵᱮᱱᱟᱣᱟ᱾',
        phonetic: 'Sakam do dare lagid situng ar dak te jomag benawa.'
      },
      {
        hindi: 'फूल खिलकर सुंदर फल बनते हैं।',
        tribal: 'Baha do baha katee cẽhra jo benag-a.',
        tribalOlChiki: 'ᱵᱟᱦᱟ ᱫᱚ ᱯᱷᱩᱴᱟᱹᱣ ᱠᱟᱛᱮ ᱪᱮᱦᱨᱟ ᱡᱚ ᱵᱮᱱᱟᱜ-ᱟ᱾',
        phonetic: 'Baha do phutau kate chehra jo benag-a.'
      }
    ]
  },
  {
    id: 'lesson-4',
    title: 'मूल आकार और आकृतियाँ (Basic Shapes)',
    titleTribal: 'ᱢᱩᱬᱩᱛ ᱜᱚᱲᱦᱚᱱ ᱠᱚ (Murut gorhon ko)',
    subject: 'Mathematics',
    grade: 1,
    language: 'Hindi → Santhali',
    durationMinutes: 25,
    offlineAvailable: true,
    learningObjective: 'Recognize circle, square, triangle, and rectangle in everyday village objects like roti, slate, and roofs.',
    learningObjectiveTribal: 'ᱜᱩᱞᱟᱹᱭ, ᱯᱳᱱ ᱠᱳᱬ, ᱯᱮ ᱠᱳᱬ ᱜᱚᱲᱦᱚᱱ ᱠᱚ ᱪᱤᱱᱦᱟᱹᱣ᱾',
    visualExample: {
      emoji: '🔺',
      label: 'आकृतियों की पहचान (Shapes identification)',
      description: 'गोल रोटी, चौकोर स्लेट, तिकोना घर का छप्पर'
    },
    content: [
      {
        hindi: 'गोल (वृत्त): हमारी माँ की रोटी और सूरज गोल है।',
        tribal: 'Gulay: Ayo reak\' ruti ar sing beṛa gulay gea.',
        tribalOlChiki: 'ᱜᱩᱞᱟᱹᱭ: ᱟᱭᱳ ᱨᱮᱭᱟᱜ ᱨᱩᱴᱤ ᱟᱨ ᱥᱤᱧ ᱵᱮᱲᱟ ᱜᱩᱞᱟᱹᱭ ᱜᱮᱭᱟ᱾',
        phonetic: 'Gulay: Ayo reyag ruti ar sing bera gulay geya.'
      },
      {
        hindi: 'तिकोना (त्रिभुज): समोसा और मंदिर की छत तिकोनी होती है।',
        tribal: 'Pekon: Samosa ar dewasthan carpek pekon gea.',
        tribalOlChiki: 'ᱯᱮᱠᱳᱬ: ᱥᱟᱢᱳᱥᱟ ᱟᱨ ᱢᱟᱹᱱᱫᱤᱨ ᱪᱷᱟᱛ ᱯᱮᱠᱳᱬ ᱜᱮᱭᱟ᱾',
        phonetic: 'Pekon: Samosa ar mandir chhat pekon geya.'
      },
      {
        hindi: 'चौकोर (वर्ग): हमारी कैरम बोर्ड और स्लेट चौकोर है।',
        tribal: 'Ponkon: Carrom board ar slate do ponkon gea.',
        tribalOlChiki: 'ᱯᱳᱱᱠᱳᱬ: ᱠᱮᱨᱟᱢ ᱵᱳᱨᱰ ᱟᱨ ᱥᱞᱮᱴ ᱫᱚ ᱯᱳᱱᱠᱳᱬ ᱜᱮᱭᱟ᱾',
        phonetic: 'Ponkon: Keram bord ar slet do ponkon geya.'
      }
    ]
  },
  {
    id: 'lesson-5',
    title: 'पानी का महत्व (Importance of Water)',
    titleTribal: 'ᱫᱟᱜ ᱨᱮᱭᱟᱜ ᱜᱚᱱᱚᱝ (Dak\' reak\' gonong)',
    subject: 'Environmental Studies',
    grade: 2,
    language: 'Hindi → Santhali',
    durationMinutes: 30,
    offlineAvailable: false,
    learningObjective: 'Understand why clean drinking water is vital for health, farming, and animals, and how to harvest rainwater in Jharkhand villages.',
    learningObjectiveTribal: 'ᱫᱟᱜ ᱫᱚ ᱡᱤᱣᱤ ᱠᱟᱱᱟ, ᱱᱚᱣᱟ ᱵᱟᱧᱪᱟᱣ ᱟᱨ ᱥᱟᱯᱷᱟ ᱫᱚᱦᱚ ᱨᱮᱭᱟᱜ ᱦᱚᱨ ᱪᱮᱫ᱾',
    visualExample: {
      emoji: '💧',
      label: 'स्वच्छ जल (Clean Water)',
      description: 'कुआँ (Kua), झरना (Jharana), वर्षा जल संचयन'
    },
    content: [
      {
        hindi: 'सभी प्राणियों को जीवित रहने के लिए पानी की आवश्यकता होती है।',
        tribal: 'Sanam jib-jiyali banchaw tahen lagit dak jarur geya.',
        tribalOlChiki: 'ᱥᱟᱱᱟᱢ ᱡᱤᱵᱽ-ᱡᱤᱭᱟᱹᱞᱤ ᱵᱟᱧᱪᱟᱣ ᱛᱟᱦᱮᱸᱱ ᱞᱟᱹᱜᱤᱫ ᱫᱟᱜ ᱡᱟᱹᱨᱩᱨ ᱜᱮᱭᱟ᱾',
        phonetic: 'Sanam jib-jiyali banchaw tahen lagid dak jarur geya.'
      },
      {
        hindi: 'हमें पानी उबालकर या छानकर पीना चाहिए।',
        tribal: 'Abo dak hedek kate se chhani kate nu hoy abona.',
        tribalOlChiki: 'ᱟᱵᱚ ᱫᱟᱜ ᱦᱮᱰᱮᱡ ᱠᱟᱛᱮ ᱥᱮ ᱪᱷᱟᱹᱱᱤ ᱠᱟᱛᱮ ᱧᱩ ᱦᱩᱭ ᱟᱵᱚᱱᱟ᱾',
        phonetic: 'Abo dak hedej kate se chhani kate nyu huy abona.'
      }
    ]
  },
  {
    id: 'lesson-6',
    title: 'रंग और हमारी दुनिया (Colors in Nature)',
    titleTribal: 'ᱨᱚᱝ ᱟᱨ ᱟᱵᱚᱣᱟᱜ ᱫᱷᱟᱹᱨᱛᱤ (Rong ar aboag dharti)',
    subject: 'Language',
    grade: 1,
    language: 'Hindi → Santhali',
    durationMinutes: 20,
    offlineAvailable: true,
    learningObjective: 'Learn basic primary colors by relating them to flowers, leaves, sky, and clay.',
    learningObjectiveTribal: 'ᱟᱨᱟᱜ, ᱦᱟᱹᱨᱤᱭᱟᱹᱲ, ᱞᱤᱞ ᱟᱨ ᱥᱟᱥᱟᱝ ᱨᱚᱝ ᱠᱚ ᱪᱤᱱᱦᱟᱹᱣ᱾',
    visualExample: {
      emoji: '🎨',
      label: 'रंगों की दुनिया (World of colors)',
      description: 'हरा पत्ता, लाल पलाश, नीला आकाश, पीला सूरजमुखी'
    },
    content: [
      {
        hindi: 'हरा: पेड़ों के पत्ते हरे होते हैं।',
        tribal: 'Hariyad: Dare reak sakam hariyad tahẽkana.',
        tribalOlChiki: 'ᱦᱟᱹᱨᱤᱭᱟᱹᱲ: ᱫᱟᱨᱮ ᱨᱮᱭᱟᱜ ᱥᱟᱠᱟᱢ ᱦᱟᱹᱨᱤᱭᱟᱹᱲ ᱛᱟᱦᱮᱸᱱᱟ᱾',
        phonetic: 'Hariyad: Dare reyag sakam hariyad tahena.'
      },
      {
        hindi: 'लाल: पलाश का फूल लाल होता है।',
        tribal: 'Arag: Palash baha arag geya.',
        tribalOlChiki: 'ᱟᱨᱟᱜ: ᱯᱚᱞᱟᱥ ᱵᱟᱦᱟ ᱟᱨᱟᱜ ᱜᱮᱭᱟ᱾',
        phonetic: 'Arag: Palash baha arag geya.'
      },
      {
        hindi: 'नीला: साफ आसमान नीला दिखाई देता है।',
        tribal: 'Lil: Sapha serma lil neloga.',
        tribalOlChiki: 'ᱞᱤᱞ: ᱥᱟᱯᱷᱟ ᱥᱮᱨᱢᱟ ᱞᱤᱞ ᱧᱮᱞᱚᱜ-ᱟ᱾',
        phonetic: 'Lil: Sapha serma lil nyelog-a.'
      }
    ]
  }
];
