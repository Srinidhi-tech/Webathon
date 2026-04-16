import { motion } from 'framer-motion';
import { Stethoscope, User, Clock, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const mockSchedule = [
  { time: '9:00 AM', patient: 'Ramesh Kumar, 45M', procedure: 'Root Canal - Molar #36', dept: 'Endodontics', status: 'completed' },
  { time: '9:45 AM', patient: 'Priya Sharma, 32F', procedure: 'Scaling & Root Planing', dept: 'Periodontics', status: 'completed' },
  { time: '10:30 AM', patient: 'Anil Verma, 28M', procedure: 'Composite Restoration #11', dept: 'Conservative', status: 'in-progress' },
  { time: '11:15 AM', patient: 'Sunita Devi, 55F', procedure: 'Crown Preparation #24', dept: 'Prosthodontics', status: 'pending' },
  { time: '2:00 PM', patient: 'Kiran Reddy, 18M', procedure: 'Orthodontic Adjustment', dept: 'Orthodontics', status: 'pending' },
  { time: '2:45 PM', patient: 'Meena Pillai, 40F', procedure: 'Extraction #48', dept: 'Oral Surgery', status: 'pending' },
  { time: '3:30 PM', patient: 'Raj Patel, 65M', procedure: 'Complete Denture Fitting', dept: 'Prosthodontics', status: 'pending' },
];

const statusConfig = {
  completed: { color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: CheckCircle, label: 'Completed' },
  'in-progress': { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: Activity, label: 'In Progress' },
  pending: { color: 'text-gray-600', bg: 'bg-gray-50 border-gray-200', icon: Clock, label: 'Scheduled' },
};

export default function PGDoctorPortal() {
  const { t } = useLanguage();
  const completed = mockSchedule.filter(s => s.status === 'completed').length;
  const remaining = mockSchedule.filter(s => s.status === 'pending').length;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Schedule</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.pgPortal.title}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t.pgPortal.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: User, label: 'Total Patients Today', value: mockSchedule.length, color: 'text-maroon-700', bg: 'bg-maroon-50' },
            { icon: CheckCircle, label: 'Completed', value: completed, color: 'text-green-700', bg: 'bg-green-50' },
            { icon: Activity, label: 'In Progress', value: 1, color: 'text-blue-700', bg: 'bg-blue-50' },
            { icon: Clock, label: 'Remaining', value: remaining, color: 'text-gray-600', bg: 'bg-gray-50' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${stat.bg} rounded-xl p-4 flex items-center gap-4`}
            >
              <stat.icon size={22} className={stat.color} />
              <div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-500 text-xs">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Stethoscope size={18} className="text-maroon-700" />
              <span className="font-semibold text-gray-900">{t.pgPortal.schedule}</span>
              <span className="text-xs text-gray-400 ml-1">— April 15, 2026</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {mockSchedule.map((item, idx) => {
              const status = statusConfig[item.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex items-center gap-4 px-6 py-4 ${item.status === 'in-progress' ? 'bg-blue-50/50' : ''}`}
                >
                  {item.status === 'in-progress' && (
                    <div className="absolute left-0 w-1 h-full bg-blue-500 rounded-r" />
                  )}
                  <div className="w-16 shrink-0 text-sm font-mono text-gray-500">{item.time}</div>
                  <div className="w-9 h-9 rounded-full bg-maroon-100 flex items-center justify-center shrink-0">
                    <User size={16} className="text-maroon-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm">{item.patient}</div>
                    <div className="text-gray-500 text-xs">{item.procedure}</div>
                  </div>
                  <div className="hidden sm:block text-xs text-gray-400 shrink-0">{item.dept}</div>
                  <div className={`flex items-center gap-1.5 ${status.bg} border ${status.color} rounded-full px-3 py-1 text-xs font-medium shrink-0`}>
                    <StatusIcon size={12} />
                    {status.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <AlertCircle size={16} />
          <span>Emergency case added: Patient Suresh M, 52M — Acute Pericoronitis, OPD Room 4 — 4:00 PM</span>
        </div>
      </div>
    </section>
  );
}
