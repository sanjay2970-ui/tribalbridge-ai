import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Sparkles, 
  Printer, 
  Download, 
  HardDriveDownload, 
  BookmarkCheck, 
  RotateCcw, 
  Edit3, 
  AlertCircle, 
  CheckCircle2,
  Check,
  ChevronDown
} from 'lucide-react';
import { QuestionType, Worksheet } from '../../types';
import { SAMPLE_WORKSHEETS } from '../../data/sampleWorksheets';
import { aiService } from '../../services/aiService';
import { offlineStorage } from '../../services/offlineStorage';

export const WorksheetGeneratorView: React.FC = () => {
  const { addToast } = useApp();

  const [subject, setSubject] = useState('Mathematics');
  const [grade, setGrade] = useState(1);
  const [topic, setTopic] = useState('Numbers 1–10');
  const [questionType, setQuestionType] = useState<QuestionType>('picture_based');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [language, setLanguage] = useState('Hindi + Santhali');
  const [isGenerating, setIsGenerating] = useState(false);
  const [worksheet, setWorksheet] = useState<Worksheet>(SAMPLE_WORKSHEETS[0]);
  const [isSaved, setIsSaved] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showAnswers, setShowAnswers] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setIsSaved(false);
    setSelectedAnswers({});
    setShowAnswers(false);

    try {
      const generated = await aiService.generateWorksheet({
        subject,
        grade,
        topic,
        questionType,
        questionCount,
        language
      });
      setWorksheet(generated);
      addToast('Bilingual worksheet generated successfully!', 'success');
    } catch {
      addToast('Failed to generate worksheet.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
    addToast('Opening print dialog. Select "Save as PDF" to download.', 'info');
  };

  const handleSaveOffline = () => {
    offlineStorage.saveWorksheet(worksheet);
    setIsSaved(true);
    addToast(`"${worksheet.title}" saved to Offline Library.`, 'success');
  };

  const handleSelectOption = (qId: number, opt: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Header */}
      <div className="no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-2">
          <Sparkles size={14} className="text-amber-700" />
          <span>Generative Bilingual Pedagogy</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI Worksheet Generator / कार्यपत्रक निर्माण
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Create culturally relevant, dual-language primary school worksheets for classroom teaching, homework, and assessment.
        </p>
      </div>

      {/* Generator Configuration Form (Hidden in print) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm no-print space-y-5">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <FileText size={16} className="text-emerald-700" />
          <span>Worksheet Configuration / निर्माण विकल्प</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Subject */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Subject / विषय
            </label>
            <select
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (e.target.value === 'Mathematics') setTopic('Numbers 1–10');
                else if (e.target.value === 'Environmental Studies') setTopic('Animals Around Us');
                else if (e.target.value === 'Science') setTopic('Parts of a Plant');
                else setTopic('Colors and Nature');
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="Mathematics">Mathematics (गणित)</option>
              <option value="Environmental Studies">Environmental Studies (पर्यावरण अध्ययन)</option>
              <option value="Science">Science (विज्ञान)</option>
              <option value="Language">Language (भाषा)</option>
            </select>
          </div>

          {/* Grade */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Grade / कक्षा
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value={1}>Grade 1 (कक्षा 1)</option>
              <option value={2}>Grade 2 (कक्षा 2)</option>
              <option value={3}>Grade 3 (कक्षा 3)</option>
              <option value={4}>Grade 4 (कक्षा 4)</option>
            </select>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Topic / उपविषय
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Numbers 1–10, Forest Animals"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Question Type / प्रश्न प्रकार
            </label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value as QuestionType)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="picture_based">Picture Based (चित्र आधारित)</option>
              <option value="mcq">Multiple Choice (बहुविकल्पी)</option>
              <option value="fill_in_the_blank">Fill in the Blank (रिक्त स्थान पूर्ति)</option>
              <option value="match">Match the Following (जोड़ी मिलाओ)</option>
              <option value="true_false">True / False (सही या गलत)</option>
            </select>
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Number of Questions / प्रश्नों की संख्या
            </label>
            <div className="flex gap-2">
              {[5, 10, 15].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setQuestionCount(cnt)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    questionCount === cnt
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cnt} Questions
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Languages / भाषाएं
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="Hindi + Santhali">Hindi + Santhali (Ol Chiki)</option>
              <option value="Hindi + Ho">Hindi + Ho (Warang Chiti)</option>
              <option value="Hindi + Mundari">Hindi + Mundari (Mundari)</option>
            </select>
          </div>

        </div>

        {/* Generate Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold text-sm shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating Bilingual Worksheet...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Generate Worksheet / कार्यपत्रक बनाएं</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Worksheet Preview Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden worksheet-printable">
        
        {/* Printable School Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                झारखंड प्राथमिक शिक्षा परिषद • District Khunti
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                {worksheet.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span>Subject: <strong>{worksheet.subject}</strong></span>
                <span>•</span>
                <span>Grade: <strong>Grade {worksheet.grade}</strong></span>
                <span>•</span>
                <span>Language: <strong>{worksheet.languages}</strong></span>
              </div>
            </div>

            {/* Print Header Blank Fields for Student */}
            <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200 space-y-1 min-w-[200px]">
              <div><strong>Student Name / नाम:</strong> ________________</div>
              <div><strong>Roll No / अनुक्रमांक:</strong> ______________</div>
              <div><strong>Date / दिनांक:</strong> ___________________</div>
            </div>
          </div>

          {/* Action Bar (Hidden in Print) */}
          <div className="no-print pt-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs transition-colors"
              >
                <Printer size={15} />
                <span>Print Worksheet</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 shadow-2xs transition-colors"
              >
                <Download size={15} />
                <span>Download PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAnswers(!showAnswers)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <span>{showAnswers ? 'Hide Answer Key' : 'Show Answer Key'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleGenerate}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors"
              >
                <RotateCcw size={14} />
                <span>Generate Again</span>
              </button>

              <button
                type="button"
                onClick={handleSaveOffline}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
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
        </div>

        {/* Questions Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {worksheet.questions.map((q, idx) => (
            <div
              key={q.id}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:bg-white transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  
                  {/* Question Number & Visual Emoji */}
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    {q.visualEmoji && (
                      <span className="text-2xl tracking-widest pl-1 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs">
                        {q.visualEmoji}
                      </span>
                    )}
                  </div>

                  {/* Hindi Question */}
                  <div className="text-sm font-bold text-slate-900 font-hindi">
                    {q.questionHindi}
                  </div>

                  {/* Santhali Ol Chiki Question */}
                  {q.questionOlChiki && (
                    <div className="text-base font-bold text-emerald-900 font-olchiki">
                      {q.questionOlChiki}
                    </div>
                  )}

                  {/* Santhali Latin / Phonetic */}
                  <div className="text-xs text-slate-500 italic">
                    "{q.questionTribal}"
                  </div>

                  {/* Multiple Choice Options */}
                  {q.options && (
                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = selectedAnswers[q.id] === opt;
                        const isCorrect = q.answer === opt;

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleSelectOption(q.id, opt)}
                            className={`p-2.5 rounded-xl text-xs font-bold text-left border transition-all ${
                              isChosen
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Optional Answer Explanation (for teacher) */}
                  {showAnswers && (
                    <div className="mt-3 p-3 rounded-xl bg-emerald-100/70 border border-emerald-200 text-xs text-emerald-950">
                      <strong>Answer Key:</strong> {q.answer}
                      {q.explanation && <span className="block text-slate-600 mt-0.5">{q.explanation}</span>}
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note Banner */}
        <div className="p-4 bg-amber-50 border-t border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Linguistic Quality Note:</strong> Generated tribal-language content (Santhali, Ho, Mundari) should be reviewed by a native speaker before formal school tests or printing for classroom distribution.
          </div>
        </div>

      </div>

    </div>
  );
};
