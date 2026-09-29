import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Volume2, 
  HardDriveDownload, 
  BookmarkCheck, 
  Sparkles, 
  Shuffle, 
  LayoutGrid, 
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import { SAMPLE_FLASHCARDS } from '../../data/sampleFlashcards';
import { Flashcard } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { offlineStorage } from '../../services/offlineStorage';
import confetti from 'canvas-confetti';

export const FlashcardView: React.FC = () => {
  const { currentLanguage, addToast } = useApp();

  const [cards, setCards] = useState<Flashcard[]>(SAMPLE_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [isGridView, setIsGridView] = useState(false);

  const topics = ['All', 'Animals', 'Nature', 'Food', 'School'];

  const filteredCards = cards.filter((c) => {
    return selectedTopic === 'All' || c.topic === selectedTopic;
  });

  const activeCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed the deck! Trigger confetti delight
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
      addToast('🎉 Great job! You completed this flashcard deck.', 'success');
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    addToast('Flashcards shuffled for randomized classroom practice.', 'info');
  };

  const handleSaveOffline = (card: Flashcard) => {
    offlineStorage.saveFlashcard(card);
    addToast(`"${card.hindiWord}" flashcard saved to Offline Library.`, 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 mb-2">
            <Layers size={14} className="text-purple-700" />
            <span>Foundational Visual Learning</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Visual Flashcards / सचित्र फ़्लैशकार्ड
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Large, child-friendly visual cards bridging Hindi vocabulary with Santhali mother tongue.
          </p>
        </div>

        {/* View Switcher: Card View vs Grid View */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs self-start sm:self-auto">
          <button
            onClick={() => setIsGridView(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              !isGridView ? 'bg-purple-700 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Single Card
          </button>
          <button
            onClick={() => setIsGridView(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              isGridView ? 'bg-purple-700 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Grid Deck ({filteredCards.length})
          </button>
        </div>
      </div>

      {/* Controls: Topic Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
          Topic / विषय:
        </span>
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => {
              setSelectedTopic(t);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedTopic === t
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Main Flashcard Interactive Area */}
      {!isGridView ? (
        <div className="flex flex-col items-center">
          
          {/* Deck Counter & Shuffle */}
          <div className="w-full max-w-lg flex items-center justify-between text-xs text-slate-500 font-bold mb-3 px-2">
            <span>
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShuffle}
                className="flex items-center gap-1 text-purple-700 hover:text-purple-800 bg-purple-50 px-2.5 py-1 rounded-lg transition-colors"
              >
                <Shuffle size={13} />
                <span>Shuffle</span>
              </button>
              <button
                type="button"
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex items-center gap-1 text-slate-600 hover:text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg transition-colors"
              >
                <RotateCw size={13} />
                <span>Flip</span>
              </button>
            </div>
          </div>

          {/* 3D Interactive Flip Card */}
          <div
            className="w-full max-w-lg h-96 cursor-pointer perspective-1000 select-none"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d rounded-3xl shadow-xl border border-slate-200 ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              
              {/* FRONT OF CARD (Hindi + Large Visual) */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 flex flex-col justify-between items-center text-center">
                <div className="w-full flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                    Front: Hindi (हिंदी)
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Click to flip ↺
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="text-7xl sm:text-8xl drop-shadow-md animate-pulse-subtle">
                    {activeCard.emoji}
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-hindi">
                      {activeCard.hindiWord}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      {activeCard.sampleSentenceHindi}
                    </p>
                  </div>
                </div>

                <div className="w-full flex items-center justify-center gap-3">
                  <AudioButton
                    text={activeCard.hindiWord}
                    isHindi={true}
                    label="Hindi Audio"
                    size="sm"
                  />
                  <span className="text-xs text-purple-700 font-bold bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
                    Tap to see Santhali ➔
                  </span>
                </div>
              </div>

              {/* BACK OF CARD (Santhali Ol Chiki + Latin + Phonetic) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-8 flex flex-col justify-between items-center text-center shadow-2xl">
                <div className="w-full flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-700 text-emerald-100">
                    Back: Santhali (ᱥᱟᱱᱛᱟᱲᱤ)
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-200">
                    Click to flip ↺
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="text-6xl drop-shadow-sm">
                    {activeCard.emoji}
                  </div>

                  <div>
                    {activeCard.tribalOlChiki && (
                      <h2 className="text-4xl sm:text-5xl font-extrabold text-amber-300 font-olchiki tracking-wide">
                        {activeCard.tribalOlChiki}
                      </h2>
                    )}
                    <h3 className="text-2xl font-bold text-white mt-1">
                      "{activeCard.tribalWord}"
                    </h3>
                    <div className="mt-1 text-xs text-emerald-200 bg-black/20 px-3 py-1 rounded-full inline-block">
                      Phonetic: <strong>{activeCard.phonetic}</strong>
                    </div>
                  </div>

                  {activeCard.sampleSentenceOlChiki && (
                    <p className="text-sm font-semibold text-emerald-100 font-olchiki max-w-xs mx-auto">
                      {activeCard.sampleSentenceOlChiki}
                    </p>
                  )}
                </div>

                <div className="w-full flex items-center justify-center gap-3">
                  <AudioButton
                    text={activeCard.tribalWord}
                    phonetic={activeCard.phonetic}
                    label="Play Santhali Pronunciation"
                    size="md"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Navigation Controls Bar */}
          <div className="w-full max-w-lg flex items-center justify-between gap-3 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex-1 py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 disabled:opacity-30 border border-slate-200 font-bold text-xs text-slate-700 shadow-2xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <ChevronLeft size={16} />
              <span>Previous / पिछला</span>
            </button>

            <button
              onClick={() => handleSaveOffline(activeCard)}
              className="py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 font-bold text-xs text-emerald-800 shadow-2xs flex items-center justify-center gap-1.5 transition-colors"
              title="Save this card for offline classroom use"
            >
              <HardDriveDownload size={16} />
              <span className="hidden sm:inline">Save Offline</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-3 px-4 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md shadow-purple-700/20 flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
            >
              <span>Next / अगला</span>
              <ChevronRight size={16} />
            </button>
          </div>

        </div>
      ) : (
        /* Grid Deck View */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCards.map((card, idx) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between text-center"
            >
              <div>
                <div className="text-5xl mb-2">{card.emoji}</div>
                <div className="text-sm font-bold text-slate-800 font-hindi">
                  {card.hindiWord}
                </div>
                {card.tribalOlChiki && (
                  <div className="text-lg font-bold text-emerald-800 font-olchiki mt-1">
                    {card.tribalOlChiki}
                  </div>
                )}
                <div className="text-xs text-slate-500 italic mt-0.5">
                  "{card.tribalWord}"
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-2">
                <AudioButton
                  text={card.tribalWord}
                  phonetic={card.phonetic}
                  size="sm"
                />
                <button
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsGridView(false);
                  }}
                  className="text-xs font-bold text-purple-700 hover:underline"
                >
                  View Large
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
