import React from 'react';
import { 
  Building2, 
  Users, 
  BookOpen, 
  HardDriveDownload, 
  Languages, 
  ShieldCheck, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  MapPin,
  CheckCircle2
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const metrics = [
    { label: 'Total Schools', value: '120', sub: 'Across 5 tribal blocks', icon: Building2, color: 'text-blue-600 bg-blue-50' },
    { label: 'Active Teachers', value: '486', sub: 'Primary teachers trained', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Lessons Available', value: '340', sub: 'Grades 1 to 5 mapped', icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
    { label: 'Offline Resources', value: '1,240', sub: 'Packs cached in field', icon: HardDriveDownload, color: 'text-amber-600 bg-amber-50' },
    { label: 'Languages Supported', value: '4', sub: 'Hindi, Santhali, Ho, Mundari', icon: Languages, color: 'text-rose-600 bg-rose-50' },
  ];

  const subjectData = [
    { subject: 'Mathematics', count: 110, percentage: 32, color: 'bg-emerald-600' },
    { subject: 'Environmental Studies', count: 95, percentage: 28, color: 'bg-teal-500' },
    { subject: 'Science', count: 65, percentage: 19, color: 'bg-blue-500' },
    { subject: 'Language & Literature', count: 45, percentage: 13, color: 'bg-amber-500' },
    { subject: 'General Knowledge', count: 25, percentage: 8, color: 'bg-purple-500' },
  ];

  const languageUsage = [
    { lang: 'Santhali (Ol Chiki)', percentage: 62, count: '301 Teachers', color: 'bg-emerald-600' },
    { lang: 'Ho (Warang Chiti)', percentage: 22, count: '107 Teachers', color: 'bg-amber-500' },
    { lang: 'Mundari', percentage: 16, count: '78 Teachers', color: 'bg-blue-600' },
  ];

  const districts = [
    { name: 'Khunti District', schools: 34, teachers: 136, offlineRate: '98%' },
    { name: 'Ranchi (Rural)', schools: 28, teachers: 118, offlineRate: '94%' },
    { name: 'West Singhbhum', schools: 32, teachers: 124, offlineRate: '99%' },
    { name: 'Dumka District', schools: 26, teachers: 108, offlineRate: '96%' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 mb-2">
          <ShieldCheck size={14} className="text-purple-700" />
          <span>School Education & Literacy Department, Jharkhand</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Tribal District Administrator Dashboard
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Monitoring multilingual lesson deployment, offline synchronization, and teacher engagement across tribal primary schools.
        </p>
      </div>

      {/* 5 Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {m.label}
                </span>
                <div className={`p-2 rounded-xl ${m.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900">{m.value}</div>
              <div className="text-[11px] text-slate-500 mt-1 truncate">{m.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Lessons by Subject */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <BarChart3 size={16} className="text-emerald-700" />
              <span>Lessons by Subject / विषयवार पाठ</span>
            </h3>
            <span className="text-xs text-slate-400 font-semibold">Total 340 Lessons</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {subjectData.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{item.subject}</span>
                  <span>{item.count} lessons ({item.percentage}%)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Language Usage Distribution */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <PieChart size={16} className="text-purple-700" />
              <span>Mother Tongue Usage / भाषा वितरण</span>
            </h3>
            <span className="text-xs text-slate-400 font-semibold">486 Teachers</span>
          </div>

          {/* Large segmented bar */}
          <div className="pt-2">
            <div className="w-full h-6 rounded-xl overflow-hidden flex shadow-inner">
              <div style={{ width: '62%' }} className="bg-emerald-600 h-full flex items-center justify-center text-[11px] font-bold text-white">
                Santhali (62%)
              </div>
              <div style={{ width: '22%' }} className="bg-amber-500 h-full flex items-center justify-center text-[11px] font-bold text-white">
                Ho (22%)
              </div>
              <div style={{ width: '16%' }} className="bg-blue-600 h-full flex items-center justify-center text-[11px] font-bold text-white">
                Mundari (16%)
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              {languageUsage.map((lu, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-lg font-black text-slate-800">{lu.percentage}%</div>
                  <div className="text-xs font-bold text-slate-600 truncate">{lu.lang.split(' ')[0]}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{lu.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* District Deployment Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <MapPin size={16} className="text-rose-600" />
            <span>District Deployment & Offline Readiness Summary</span>
          </h4>
          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 size={13} />
            DIET Monitored
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-6">District Name</th>
                <th className="p-3.5">Schools Covered</th>
                <th className="p-3.5">Trained Teachers</th>
                <th className="p-3.5">Offline Content Readiness</th>
                <th className="p-3.5 pr-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {districts.map((d, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 pl-6 font-bold text-slate-900">{d.name}</td>
                  <td className="p-3.5">{d.schools} Primary Schools</td>
                  <td className="p-3.5">{d.teachers} Teachers</td>
                  <td className="p-3.5">
                    <span className="font-bold text-emerald-800">{d.offlineRate}</span> Cached
                  </td>
                  <td className="p-3.5 pr-6">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
