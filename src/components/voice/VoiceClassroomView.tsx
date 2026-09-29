import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Mic, 
  Square, 
  RotateCcw, 
  Trash2, 
  Volume2, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Info,
  ArrowDown,
  Layers,
  Activity
} from 'lucide-react';
import { VoiceChatMessage } from '../../types';
import { aiService } from '../../services/aiService';
import { speechService } from '../../services/speechService';
import { AudioButton } from '../common/AudioButton';

export const VoiceClassroomView: React.FC = () => {
  const { currentLanguage, addToast } = useApp();

  type VoiceStatus = 'idle' | 'listening' | 'translating' | 'speaking';
  const [status, setStatus] = useState<VoiceStatus>('idle');
  const [conversation, setConversation] = useState<VoiceChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'teacher',
      textHindi: 'अपनी किताब का पृष्ठ संख्या 5 खोलिए।',
      textTribal: 'Apeyag puthi reyag sahta 5 jhij pe.',
      textOlChiki: 'ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱨᱮᱭᱟᱜ ᱥᱟᱦᱴᱟ ᱕ ᱡᱷᱤᱡᱽ ᱯᱮ᱾',
      phonetic: 'Apeyag puthi reyag sahta 5 jhij pe.',
      timestamp: '09:25 AM',
      status: 'done'
    },
    {
      id: 'msg-2',
      sender: 'ai',
      textHindi: 'सभी बच्चे ध्यान से सुनें।',
      textTribal: 'Sanam gidra dheyan te anjom pe.',
      textOlChiki: 'ᱥᱟᱱᱟᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱫᱷᱮᱭᱟᱱ ᱛᱮ ᱟᱧᱡᱚᱢ ᱯᱮ᱾',
      phonetic: 'Sanam gidra dheyan te anjom pe.',
      timestamp: '09:26 AM',
      status: 'done'
    }
  ]);

  const [promptStep, setPromptStep] = useState(0);

  const startVoiceCycle = async () => {
    if (status !== 'idle') return;

    setStatus('listening');
    speechService.playEducationalChime('high');

    // 1. Simulate speech recognition (or capture speech)
    setTimeout(async () => {
      setStatus('translating');
      const recognizedHindi = await aiService.speechToText(promptStep);
      setPromptStep(prev => prev + 1);

      // 2. Translate with AI
      const translation = await aiService.translateText(recognizedHindi, currentLanguage, 'instruction');

      const newMessage: VoiceChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'teacher',
        textHindi: recognizedHindi,
        textTribal: translation.targetText,
        textOlChiki: translation.targetOlChiki,
        phonetic: translation.phonetic,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'done'
      };

      setConversation(prev => [...prev, newMessage]);
      setStatus('speaking');

      // 3. Play translated audio to the classroom
      await speechService.speakTribal(translation.targetText, translation.phonetic);
      setStatus('idle');
      addToast('Voice instruction translated and broadcast to classroom.', 'success');
    }, 1800);
  };

  const handleStop = () => {
    speechService.stop();
    setStatus('idle');
  };

  const handleReplayLast = () => {
    if (conversation.length === 0) return;
    const last = conversation[conversation.length - 1];
    speechService.speakTribal(last.textTribal, last.phonetic);
    addToast('Replaying last translated classroom instruction.', 'info');
  };

  const handleClear = () => {
    setConversation([]);
    addToast('Conversation history cleared.', 'info');
  };

  const getStatusText = () => {
    switch (status) {
      case 'listening': return 'Listening... Speak in Hindi';
      case 'translating': return 'Translating to Santhali via AI...';
      case 'speaking': return 'Playing translated audio for students...';
      default: return 'Tap microphone to speak';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 mb-2">
          <Activity size={14} className="text-rose-600 animate-pulse" />
          <span>Real-Time Voice Assistant</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Voice Classroom / ध्वनि कक्षा
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Bridge the speech gap in real-time. Speak in Hindi, let the AI announce instructions in Santhali.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Central Microphone & Audio Waveform Stage */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-between text-center relative overflow-hidden min-h-[440px]">
          
          {/* Top Language Indicator Bar */}
          <div className="w-full flex items-center justify-between border-b border-slate-100 pb-4 text-xs font-bold text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Teacher Language: <strong>मानक हिंदी (Hindi)</strong></span>
            </div>
            <span className="text-slate-300">➔</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Student Language: <strong>Santhali (ᱥᱟᱱᱛᱟᱲᱤ)</strong></span>
            </div>
          </div>

          {/* Central Pulsing Microphone Stage */}
          <div className="my-8 flex flex-col items-center">
            
            {/* Animated Ring & Mic Button */}
            <div className="relative flex items-center justify-center">
              {status === 'listening' && (
                <>
                  <div className="absolute w-36 h-36 rounded-full bg-rose-400/20 animate-ping" />
                  <div className="absolute w-44 h-44 rounded-full bg-rose-500/10 animate-pulse" />
                </>
              )}
              {status === 'speaking' && (
                <div className="absolute w-36 h-36 rounded-full bg-amber-400/30 animate-ping" />
              )}

              <button
                type="button"
                onClick={status === 'idle' ? startVoiceCycle : handleStop}
                className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-all transform active:scale-95 ${
                  status === 'listening'
                    ? 'bg-gradient-to-tr from-rose-600 to-rose-500 ring-8 ring-rose-100 scale-105'
                    : status === 'translating'
                    ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 ring-8 ring-blue-100 animate-pulse'
                    : status === 'speaking'
                    ? 'bg-gradient-to-tr from-amber-500 to-amber-600 ring-8 ring-amber-100'
                    : 'bg-gradient-to-tr from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:scale-105'
                }`}
                aria-label="Microphone button"
              >
                {status === 'idle' && <Mic size={38} />}
                {status === 'listening' && <Mic size={38} className="animate-pulse" />}
                {status === 'translating' && <Sparkles size={38} className="animate-spin" />}
                {status === 'speaking' && <Volume2 size={38} className="animate-bounce" />}
              </button>
            </div>

            {/* Status Text Indicator */}
            <h3 className="mt-6 text-lg font-bold text-slate-800">
              {getStatusText()}
            </h3>

            {/* Dynamic CSS Audio Waveform Animation */}
            {status === 'listening' && (
              <div className="flex items-center gap-1.5 mt-3 h-8">
                {[40, 70, 30, 90, 60, 100, 50, 80, 45, 95, 35].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-rose-500 rounded-full animate-wave"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            )}

            {status === 'speaking' && (
              <div className="flex items-center gap-1.5 mt-3 h-8">
                {[60, 90, 50, 100, 70, 85, 40].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-amber-500 rounded-full animate-pulse"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}

            {status === 'idle' && (
              <p className="text-xs text-slate-400 mt-2 max-w-sm">
                Press microphone to simulate teacher speaking in classroom: "अपनी किताब का पृष्ठ 5 खोलिए।"
              </p>
            )}
          </div>

          {/* Control Buttons */}
          <div className="w-full flex items-center justify-center gap-2 pt-4 border-t border-slate-100 flex-wrap">
            <button
              onClick={startVoiceCycle}
              disabled={status !== 'idle'}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white flex items-center gap-2 shadow-xs transition-colors"
            >
              <Mic size={15} />
              <span>Start Listening</span>
            </button>

            <button
              onClick={handleStop}
              disabled={status === 'idle'}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 disabled:opacity-40 flex items-center gap-2 border border-rose-200 transition-colors"
            >
              <Square size={14} />
              <span>Stop</span>
            </button>

            <button
              onClick={handleReplayLast}
              disabled={conversation.length === 0}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 disabled:opacity-40 flex items-center gap-2 border border-amber-200 transition-colors"
            >
              <RotateCcw size={14} />
              <span>Replay Last</span>
            </button>

            <button
              onClick={handleClear}
              disabled={conversation.length === 0}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
              title="Clear conversation"
            >
              <Trash2 size={15} />
            </button>
          </div>

        </div>

        {/* Right 1 Col: Performance Card & Conversation History */}
        <div className="space-y-6">
          
          {/* Performance Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-5 border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Demo Response Time
              </span>
              <Clock size={16} className="text-emerald-700" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-950">
              &lt; 3 seconds target
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Simulated latency: <strong>1.4s ASR + MT inference</strong>
            </p>
            <div className="mt-3 pt-3 border-t border-emerald-200/60 text-[11px] text-emerald-800 flex items-center gap-1.5">
              <Info size={13} className="flex-shrink-0" />
              <span>Prototype simulation for hackathon demonstration.</span>
            </div>
          </div>

          {/* Conversation History Stream */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col h-[340px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Classroom Log ({conversation.length})
              </span>
              <span className="text-[10px] text-slate-400">Live bilingual</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pt-3 pr-1">
              {conversation.map((msg) => (
                <div key={msg.id} className="space-y-2 text-xs">
                  {/* Teacher Hindi Bubble */}
                  <div className="p-3 rounded-2xl bg-slate-100 text-slate-800 rounded-tl-xs">
                    <div className="text-[10px] font-bold text-slate-500 mb-0.5">Teacher (Hindi):</div>
                    <div className="font-semibold text-slate-900">{msg.textHindi}</div>
                  </div>

                  {/* AI Santhali Bubble */}
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-tr-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-emerald-800">TribalBridge AI (Santhali):</span>
                      <AudioButton
                        text={msg.textTribal}
                        phonetic={msg.phonetic}
                        size="sm"
                      />
                    </div>
                    {msg.textOlChiki && (
                      <div className="font-bold text-sm text-emerald-900 font-olchiki mb-1">
                        {msg.textOlChiki}
                      </div>
                    )}
                    <div className="text-slate-600 italic">"{msg.textTribal}"</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* "How It Works" Mini Flow (5 Steps) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>How It Works / कार्यप्रणाली प्रवाह</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-2">
              1
            </div>
            <div className="text-xs font-bold text-slate-800">Hindi Voice</div>
            <div className="text-[11px] text-slate-500 mt-1">शिक्षक की ध्वनि</div>
          </div>

          <div className="hidden sm:flex items-center justify-center text-slate-300 font-bold">
            ➔
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-2">
              2
            </div>
            <div className="text-xs font-bold text-slate-800">Speech Recognition</div>
            <div className="text-[11px] text-slate-500 mt-1">वाक् पहचान (ASR)</div>
          </div>

          <div className="hidden sm:flex items-center justify-center text-slate-300 font-bold">
            ➔
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold mb-2">
              3
            </div>
            <div className="text-xs font-bold text-slate-800">AI Translation</div>
            <div className="text-[11px] text-slate-500 mt-1">भाषा अनुवाद इंजन</div>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center mt-3">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center sm:col-start-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-2">
              4
            </div>
            <div className="text-xs font-bold text-slate-800">Santhali Text</div>
            <div className="text-[11px] text-slate-500 mt-1">ᱚᱞ ᱪᱤᱠᱤ ᱞᱤᱯᱤ</div>
          </div>

          <div className="hidden sm:flex items-center justify-center text-slate-300 font-bold">
            ➔
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold mb-2">
              5
            </div>
            <div className="text-xs font-bold text-slate-800">Santhali Audio</div>
            <div className="text-[11px] text-slate-500 mt-1">ध्वनि प्रसारण (TTS)</div>
          </div>

        </div>
      </div>

    </div>
  );
};
