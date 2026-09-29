import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Languages, 
  WifiOff, 
  CheckCircle2,
  Lock,
  UserCheck
} from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { setIsLoggedIn, addToast } = useApp();
  const [teacherId, setTeacherId] = useState('T-JHK-8921');
  const [password, setPassword] = useState('••••••••');
  const [role, setRole] = useState<'teacher' | 'admin'>('teacher');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    addToast('Welcome back, Teacher! Dashboard loaded.', 'success');
  };

  const handleContinueDemo = () => {
    setIsLoggedIn(true);
    addToast('Demo Mode Activated: Full offline-first teaching suite ready.', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/40 to-teal-50 flex items-center justify-center p-4 sm:p-6">
      
      {/* Decorative background tribal accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-300 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-200 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden z-10">
        
        {/* Top decorative stripe */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500" />

        <div className="p-6 sm:p-8">
          
          {/* Logo & Branding */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/25 mb-3">
              <BookOpen size={32} className="stroke-[2.5]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              TribalBridge AI
            </h1>
            <p className="text-sm font-semibold text-emerald-800 mt-1">
              "Teaching beyond language barriers."
            </p>
            <p className="text-xs text-slate-500 mt-1">
              AI-Powered Mother-Tongue Teaching Assistant for Jharkhand Primary Schools
            </p>
          </div>

          {/* Supported Languages Badges */}
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-200">
              मानक हिंदी
            </span>
            <span className="text-slate-400">⇄</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
              ᱥᱟᱱᱛᱟᱲᱤ (Santhali)
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
              Ho
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
              Mundari
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Teacher ID / शिक्षक पहचान पत्र
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  placeholder="e.g. T-JHK-8921"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium"
                  required
                />
                <UserCheck size={18} className="absolute right-3 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Password / पासवर्ड
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  required
                />
                <Lock size={18} className="absolute right-3 top-3 text-slate-400" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>Sign In / प्रवेश करें</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={handleContinueDemo}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Sparkles size={16} />
                <span>Continue Demo / डेमो शुरू करें (1-Click)</span>
              </button>
            </div>
          </form>

          {/* Offline Ready Note */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span>Offline-first ready</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck size={15} className="text-blue-600" />
              <span>DIET Jharkhand</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
