import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  User, 
  Languages, 
  Volume2, 
  HardDriveDownload, 
  Eye, 
  Info, 
  Save, 
  Check, 
  BookOpen, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { LanguageCode } from '../../types';

export const SettingsView: React.FC = () => {
  const { 
    teacherProfile, 
    setTeacherProfile, 
    settings, 
    updateSettings, 
    currentLanguage, 
    setCurrentLanguage,
    addToast 
  } = useApp();

  const [name, setName] = useState(teacherProfile.name);
  const [school, setSchool] = useState(teacherProfile.school);
  const [district, setDistrict] = useState(teacherProfile.district);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherProfile(prev => ({
      ...prev,
      name,
      school,
      district
    }));
    addToast('Teacher profile updated successfully.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-800 mb-2">
          <Settings size={14} className="text-slate-600" />
          <span>System Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Settings & Preferences / सेटिंग्स
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Customize teacher profile, regional language priority, audio pronunciation, and accessibility modes.
        </p>
      </div>

      {/* 1. Teacher Profile Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <User size={16} className="text-emerald-700" />
          <span>Teacher Profile / शिक्षक विवरण</span>
        </h3>

        <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Teacher Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Teacher ID
            </label>
            <input
              type="text"
              value={teacherProfile.teacherId}
              disabled
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm font-medium cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              School Name
            </label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              District / ज़िला
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="Khunti District">Khunti District (खूंटी)</option>
              <option value="Ranchi District">Ranchi District (रांची)</option>
              <option value="West Singhbhum">West Singhbhum (पश्चिमी सिंहभूम)</option>
              <option value="Dumka District">Dumka District (दुमका)</option>
              <option value="East Singhbhum">East Singhbhum (पूर्वी सिंहभूम)</option>
            </select>
          </div>

          <div className="sm:col-span-2 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* 2. Target Tribal Language Selection */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Languages size={16} className="text-emerald-700" />
          <span>Target Tribal Language / मातृभाषा चयन</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { code: 'sat' as LanguageCode, name: 'Santhali', script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)', badge: 'Primary' },
            { code: 'hoc' as LanguageCode, name: 'Ho', script: 'Warang Chiti (𑢹𑣉𑣉)', badge: 'Kolhan' },
            { code: 'unr' as LanguageCode, name: 'Mundari', script: 'Mundari Bani (मुंडारी)', badge: 'Khunti' }
          ].map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setCurrentLanguage(lang.code);
                updateSettings({ selectedLanguage: lang.code });
                addToast(`Primary target language set to ${lang.name}`, 'info');
              }}
              className={`p-4 rounded-2xl text-left border transition-all ${
                currentLanguage === lang.code
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-sm text-slate-900">{lang.name}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                  {lang.badge}
                </span>
              </div>
              <div className="text-xs text-slate-500">{lang.script}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Audio & Voice Settings */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Volume2 size={16} className="text-emerald-700" />
          <span>Audio & Pronunciation / ध्वनि सेटिंग्स</span>
        </h3>

        <div className="space-y-4">
          {/* Voice Speed Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Voice Speed (गति)</span>
              <span>{settings.voiceSpeed}x</span>
            </div>
            <input
              type="range"
              min="0.6"
              max="1.3"
              step="0.1"
              value={settings.voiceSpeed}
              onChange={(e) => updateSettings({ voiceSpeed: parseFloat(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0.6x (Slow for kids)</span>
              <span>1.0x (Normal)</span>
              <span>1.3x (Fast)</span>
            </div>
          </div>

          {/* Auto-play Translation Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <div className="text-xs font-bold text-slate-800">Auto-play Translation Audio</div>
              <div className="text-[11px] text-slate-500">Automatically pronounce translated tribal phrases</div>
            </div>
            <input
              type="checkbox"
              checked={settings.autoPlayAudio}
              onChange={(e) => updateSettings({ autoPlayAudio: e.target.checked })}
              className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          {/* Speaker Volume Slider */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Classroom Speaker Volume</span>
              <span>{settings.speakerVolume}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={settings.speakerVolume}
              onChange={(e) => updateSettings({ speakerVolume: parseInt(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 4. Offline Sync Settings */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <HardDriveDownload size={16} className="text-emerald-700" />
          <span>Offline & Sync / ऑफ़लाइन सिंक</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800">Auto-save Lessons Offline</div>
              <div className="text-[11px] text-slate-500">Keep newly viewed lessons in local browser storage</div>
            </div>
            <input
              type="checkbox"
              checked={settings.autoSaveOffline}
              onChange={(e) => updateSettings({ autoSaveOffline: e.target.checked })}
              className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <div className="text-xs font-bold text-slate-800">Sync when Internet is Available</div>
              <div className="text-[11px] text-slate-500">Auto-refresh vocabulary models when cellular or Wi-Fi is detected</div>
            </div>
            <input
              type="checkbox"
              checked={settings.syncWhenOnline}
              onChange={(e) => updateSettings({ syncWhenOnline: e.target.checked })}
              className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 5. Accessibility Settings */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Eye size={16} className="text-emerald-700" />
          <span>Accessibility / सुगमता (Designed for Low-Cost Tablets)</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800">Large Text Mode (बड़ा टेक्स्ट)</div>
              <div className="text-[11px] text-slate-500">Increases font scales across all buttons and lesson cards</div>
            </div>
            <input
              type="checkbox"
              checked={settings.largeTextMode}
              onChange={(e) => {
                updateSettings({ largeTextMode: e.target.checked });
                addToast(e.target.checked ? 'Large Text Mode enabled.' : 'Large Text Mode disabled.', 'info');
              }}
              className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <div className="text-xs font-bold text-slate-800">High Contrast Mode (उच्च कंट्रास्ट)</div>
              <div className="text-[11px] text-slate-500">High-contrast borders for outdoor bright sunlight in village schools</div>
            </div>
            <input
              type="checkbox"
              checked={settings.highContrastMode}
              onChange={(e) => {
                updateSettings({ highContrastMode: e.target.checked });
                addToast(e.target.checked ? 'High Contrast Mode enabled.' : 'High Contrast Mode disabled.', 'info');
              }}
              className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <div className="text-xs font-bold text-slate-800">Simplified Interface (सरल दृश्य)</div>
              <div className="text-[11px] text-slate-500">Hides technical labels and prioritizes large touch icons</div>
            </div>
            <input
              type="checkbox"
              checked={settings.simplifiedInterface}
              onChange={(e) => updateSettings({ simplifiedInterface: e.target.checked })}
              className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 6. About TribalBridge AI Section */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 rounded-3xl p-6 border border-emerald-200 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
            <BookOpen size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-base">TribalBridge AI</h4>
            <p className="text-xs text-emerald-800 font-semibold">
              AI-powered mother-tongue teaching assistant • Version 1.0.0
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Developed to bridge language gaps in primary classrooms across tribal districts of Jharkhand (Khunti, Ranchi, West Singhbhum, Dumka). Supports NEP 2020 mother-tongue foundational learning through offline-first AI translation and speech tools.
        </p>

        <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
          <span>Target Languages: <strong>Hindi, Santhali, Ho, Mundari</strong></span>
          <span>•</span>
          <span>Offline Architecture: <strong>Service Worker + LocalStorage</strong></span>
        </div>
      </div>

    </div>
  );
};
