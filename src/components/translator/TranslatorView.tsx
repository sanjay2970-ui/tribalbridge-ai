import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Languages, 
  ArrowLeftRight, 
  Copy, 
  Check, 
  Volume2, 
  HardDriveDownload, 
  RotateCcw, 
  Sparkles, 
  AlertCircle, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  CheckCircle2,
  BookmarkCheck
} from 'lucide-react';
import { LanguageCode, TeachingContext, TranslationItem } from '../../types';
import { SUPPORTED_LANGUAGES, DEMO_PROMPTS } from '../../data/authenticVocab';
import { aiService } from '../../services/aiService';
import { speechService } from '../../services/speechService';
import { offlineStorage } from '../../services/offlineStorage';
import { AudioButton } from '../common/AudioButton';

export const TranslatorView: React.FC = () => {
  const { 
    currentLanguage, 
    setCurrentLanguage, 
    activeTranslatorPrompt, 
    setActiveTranslatorPrompt,
    addToast 
  } = useApp();

  const [inputText, setInputText] = useState(
    activeTranslatorPrompt || 'आज हम 1 से 10 तक की गिनती सीखेंगे।'
  );
  const [sourceLang, setSourceLang] = useState<LanguageCode>('hi');
  const [targetLang, setTargetLang] = useState<LanguageCode>(currentLanguage);
  const [context, setContext] = useState<TeachingContext>('lesson');
  const [isLoading, setIsLoading] = useState(false);
  const [translationResult, setTranslationResult] = useState<TranslationItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Teaching context options
  const contexts: Array<{ id: TeachingContext; label: string; icon: string }> = [
    { id: 'lesson', label: 'Lesson / पाठ', icon: '📖' },
    { id: 'instruction', label: 'Classroom Instruction / निर्देश', icon: '🗣️' },
    { id: 'question', label: 'Question / प्रश्न', icon: '❓' },
    { id: 'activity', label: 'Activity / गतिविधि', icon: '🎨' },
    { id: 'assessment', label: 'Assessment / मूल्यांकन', icon: '📝' }
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      addToast('Please enter Hindi text to translate.', 'warning');
      return;
    }

    setIsLoading(true);
    setIsSaved(false);
    try {
      const res = await aiService.translateText(inputText, targetLang, context);
      setTranslationResult(res);
      addToast('Translation generated successfully.', 'success');
    } catch {
      addToast('Failed to generate translation.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setTranslationResult(null);
    setIsSaved(false);
    setActiveTranslatorPrompt('');
  };

  const handleUseExample = (prompt?: string) => {
    const selected = prompt || DEMO_PROMPTS[Math.floor(Math.random() * DEMO_PROMPTS.length)];
    setInputText(selected);
  };

  const handleSwap = () => {
    // Hindi <-> Tribal swap toggle
    if (sourceLang === 'hi') {
      setSourceLang(targetLang);
      setTargetLang('hi');
      addToast('Languages swapped for bidirectional classroom translation.', 'info');
    } else {
      setSourceLang('hi');
      setTargetLang('sat');
      addToast('Reset to standard Hindi → Tribal translation.', 'info');
    }
  };

  const handleCopy = () => {
    if (!translationResult) return;
    const textToCopy = `${translationResult.targetOlChiki || ''}\n${translationResult.targetText}\n(${translationResult.targetDevanagari || ''})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    addToast('Translation copied to clipboard.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveOffline = () => {
    if (!translationResult) return;
    offlineStorage.saveTranslation(translationResult);
    setIsSaved(true);
    addToast('Translation saved to Offline Library (available without internet).', 'success');
  };

  const targetLangInfo = SUPPORTED_LANGUAGES.find(l => l.code === targetLang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Title & Subtitle */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
          <Languages size={14} className="text-emerald-700" />
          <span>Multilingual Classroom Bridge</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI Lesson Translator / पाठ अनुवादक
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          "Translate teaching content into your students' mother tongue."
        </p>
      </div>

      {/* Teaching Context Selector */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Teaching Context / शिक्षण संदर्भ:
        </label>
        <div className="flex flex-wrap gap-2">
          {contexts.map((c) => (
            <button
              key={c.id}
              onClick={() => setContext(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                context === c.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Translation Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Language Selector Header */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between flex-wrap gap-3">
          
          {/* Source Language */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Source:</span>
            <span className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-800 shadow-2xs">
              {sourceLang === 'hi' ? 'मानक हिंदी (Hindi)' : targetLangInfo.name}
            </span>
          </div>

          {/* Swap Button */}
          <button
            type="button"
            onClick={handleSwap}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-emerald-700 transition-colors shadow-2xs"
            title="Swap source and target languages"
          >
            <ArrowLeftRight size={18} />
          </button>

          {/* Target Language Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Target:</span>
            <select
              value={targetLang}
              onChange={(e) => {
                const val = e.target.value as LanguageCode;
                setTargetLang(val);
                setCurrentLanguage(val);
              }}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-emerald-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name} ({l.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Input & Output Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          
          {/* Left: Input Text Area */}
          <div className="p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Enter Hindi lesson or classroom instruction:
                </label>
                <span className="text-[11px] text-slate-400">
                  {inputText.length} characters
                </span>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={5}
                placeholder="Example: आज हम 1 से 10 तक की गिनती सीखेंगे।"
                className="w-full p-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 text-sm sm:text-base font-medium resize-none leading-relaxed"
              />
            </div>

            {/* Quick Prompts Pills */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Quick Classroom Phrases (Click to test):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {DEMO_PROMPTS.slice(0, 3).map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleUseExample(prompt)}
                    className="text-left text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors truncate max-w-xs"
                    title={prompt}
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>

            {/* Input Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleTranslate}
                disabled={isLoading || !inputText.trim()}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Translating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Translate / अनुवाद करें</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="py-3 px-3.5 rounded-xl font-semibold text-xs border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                title="Clear input"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => handleUseExample()}
                className="py-3 px-3.5 rounded-xl font-semibold text-xs border border-emerald-200 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                title="Pick random example"
              >
                Use Example
              </button>
            </div>
          </div>

          {/* Right: Translation Result Area */}
          <div className="p-5 flex flex-col justify-between bg-slate-50/50">
            {translationResult ? (
              <div className="space-y-4">
                
                {/* Result header with AI confidence info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      {targetLangInfo.name} Output:
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Context: {context}
                    </span>
                  </div>

                  {/* Informational AI Confidence */}
                  <div 
                    className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs"
                    title="Informational model indicator, not scientifically certified benchmark"
                  >
                    <Sparkles size={12} className="text-amber-500" />
                    <span>AI Confidence: <strong>{translationResult.confidence}%</strong> (Demo)</span>
                  </div>
                </div>

                {/* Primary Script Output: Ol Chiki (if Santhali) */}
                {translationResult.targetOlChiki && (
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1 flex items-center justify-between">
                      <span>Ol Chiki Script / ᱚᱞ ᱪᱤᱠᱤ:</span>
                      <span className="text-[10px] text-slate-400 font-normal">Authentic script</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-emerald-950 font-olchiki leading-relaxed">
                      {translationResult.targetOlChiki}
                    </div>
                  </div>
                )}

                {/* Romanized Phonetic Pronunciation Guide */}
                <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/70 text-xs">
                  <span className="font-bold text-amber-900 block mb-0.5">
                    Phonetic Pronunciation (उच्चारण सहायता):
                  </span>
                  <p className="text-sm font-semibold text-amber-950 italic">
                    "{translationResult.targetText}"
                  </p>
                </div>

                {/* Devanagari Script Representation for Teachers */}
                {translationResult.targetDevanagari && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                    <span className="font-bold text-slate-500 block mb-0.5">
                      देवनागरी लिपि में उच्चारण (Devanagari script):
                    </span>
                    <p className="text-sm font-medium text-slate-800 font-hindi">
                      {translationResult.targetDevanagari}
                    </p>
                  </div>
                )}

                {/* Below Translation Action Buttons */}
                <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    {/* Copy Button */}
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-colors"
                    >
                      {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>

                    {/* Play Audio Button */}
                    <AudioButton
                      text={translationResult.targetText}
                      phonetic={translationResult.phonetic}
                      label="Play Audio"
                      size="sm"
                    />
                  </div>

                  {/* Save Offline Button */}
                  <button
                    type="button"
                    onClick={handleSaveOffline}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isSaved
                        ? 'bg-purple-100 text-purple-900 border border-purple-300'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck size={15} className="text-purple-700" />
                        <span>Saved Offline</span>
                      </>
                    ) : (
                      <>
                        <HardDriveDownload size={15} className="text-emerald-700" />
                        <span>Save Offline</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 min-h-[220px]">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <Languages size={24} className="text-slate-400" />
                </div>
                <h4 className="font-semibold text-slate-600 text-sm">No translation yet</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Type a Hindi lesson sentence or click "Use Example" and press <strong>Translate</strong>.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mandatory Native Speaker Review Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
        <AlertCircle size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Linguistic Advisory Note:</span> AI-generated translations should be reviewed by a native speaker or language expert before classroom deployment. The prototype draws from primary foundational language sets for Santhali, Ho, and Mundari.
        </div>
      </div>

    </div>
  );
};
