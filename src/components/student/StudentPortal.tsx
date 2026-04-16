import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, MessageSquare, Download, ChevronRight, FileText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import HostelComplaintForm from './HostelComplaintForm';
import ScheduleView from './ScheduleView';

type Tab = 'syllabus' | 'schedule' | 'complaint';

const syllabusItems = [
  { title: 'BDS 1st Year Syllabus 2024-25', type: 'PDF', year: 'BDS 1st Year' },
  { title: 'BDS 2nd Year Syllabus 2024-25', type: 'PDF', year: 'BDS 2nd Year' },
  { title: 'BDS 3rd Year Syllabus 2024-25', type: 'PDF', year: 'BDS 3rd Year' },
  { title: 'BDS 4th Year Syllabus 2024-25', type: 'PDF', year: 'BDS 4th Year' },
  { title: 'MDS Orthodontics Syllabus', type: 'PDF', year: 'MDS' },
  { title: 'MDS Endodontics Syllabus', type: 'PDF', year: 'MDS' },
  { title: 'MDS Periodontics Syllabus', type: 'PDF', year: 'MDS' },
  { title: 'MDS Oral Surgery Syllabus', type: 'PDF', year: 'MDS' },
  { title: 'Internship Guidelines 2024', type: 'PDF', year: 'Internship' },
  { title: 'Clinical Protocol Manual', type: 'PDF', year: 'All Years' },
];

export default function StudentPortal() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('syllabus');
  const [yearFilter, setYearFilter] = useState('all');

  const tabs = [
    { key: 'syllabus' as Tab, label: t.studentPortal.syllabus, icon: BookOpen },
    { key: 'schedule' as Tab, label: t.studentPortal.schedule, icon: Clock },
    { key: 'complaint' as Tab, label: t.studentPortal.hostelComplaint, icon: MessageSquare },
  ];

  const years = ['all', 'BDS 1st Year', 'BDS 2nd Year', 'BDS 3rd Year', 'BDS 4th Year', 'MDS', 'Internship', 'All Years'];
  const filteredSyllabus = yearFilter === 'all' ? syllabusItems : syllabusItems.filter(s => s.year === yearFilter);

  return (
    <section className="py-16 bg-clinical-50" id="student-portal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-maroon-100 text-maroon-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <BookOpen size={15} />
            <span>Academic Resources</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.studentPortal.title}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t.studentPortal.subtitle}</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.key
                    ? 'border-maroon-700 text-maroon-700 bg-maroon-50'
                    : 'border-transparent text-gray-500 hover:text-maroon-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'syllabus' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex flex-wrap gap-2 mb-5">
                  {years.map(y => (
                    <button
                      key={y}
                      onClick={() => setYearFilter(y)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        yearFilter === y
                          ? 'bg-maroon-800 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-maroon-50 hover:text-maroon-700'
                      }`}
                    >
                      {y === 'all' ? 'All' : y}
                    </button>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {filteredSyllabus.map(item => (
                    <div key={item.title} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-maroon-200 hover:bg-maroon-50 transition-all group">
                      <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                        <FileText size={18} className="text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 text-sm truncate">{item.title}</div>
                        <div className="text-gray-400 text-xs">{item.year} • {item.type}</div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-maroon-100 text-maroon-700">
                        <Download size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'schedule' && <ScheduleView />}
            {activeTab === 'complaint' && <HostelComplaintForm />}
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {[
            { icon: BookOpen, title: t.studentPortal.syllabusDesc, action: () => setActiveTab('syllabus') },
            { icon: Clock, title: t.studentPortal.scheduleDesc, action: () => setActiveTab('schedule') },
            { icon: MessageSquare, title: t.studentPortal.complaintDesc, action: () => setActiveTab('complaint') },
          ].map((item, idx) => (
            <motion.button
              key={idx}
              onClick={item.action}
              whileHover={{ y: -2 }}
              className="bg-white border border-gray-100 rounded-xl p-4 text-left hover:border-maroon-200 hover:shadow-md transition-all flex items-center gap-3"
            >
              <item.icon size={18} className="text-maroon-600 shrink-0" />
              <span className="text-gray-600 text-sm">{item.title}</span>
              <ChevronRight size={14} className="ml-auto text-gray-400" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
