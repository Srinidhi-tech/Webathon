import { motion } from 'framer-motion';
import { Trophy, Users, Heart, BookOpen, Star, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const stats = [
  { icon: Trophy, value: '25+', labelKey: 'years' as const, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { icon: Users, value: '5,000+', labelKey: 'students' as const, color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Heart, value: '50,000+', labelKey: 'patients' as const, color: 'text-red-600', bg: 'bg-red-50' },
  { icon: BookOpen, value: '120+', labelKey: 'faculty' as const, color: 'text-maroon-700', bg: 'bg-maroon-50' },
];

const recognitions = [
  { icon: Star, text: 'NAAC A Grade Accreditation', sub: 'National Assessment' },
  { icon: CheckCircle, text: 'DCI Recognized', sub: 'Dental Council of India' },
  { icon: Trophy, text: 'Best Dental College Karnataka 2023', sub: 'State Government Award' },
  { icon: Star, text: 'ISO 9001:2015 Certified', sub: 'Quality Management' },
  { icon: CheckCircle, text: 'NBA Accredited Programs', sub: 'National Board of Accreditation' },
  { icon: Trophy, text: '200+ Research Publications', sub: 'Indexed Journals' },
];

export default function AchievementsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-br from-maroon-950 to-maroon-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-3">{t.achievements.title}</h2>
          <p className="text-maroon-300 text-base max-w-xl mx-auto">{t.achievements.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <stat.icon size={22} className={stat.color} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-maroon-300 text-sm">{t.achievements[stat.labelKey]}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center text-xl font-semibold text-maroon-200 mb-6">Recognitions & Accreditations</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {recognitions.map((rec, idx) => (
              <motion.div
                key={rec.text}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-start gap-3 bg-white/6 border border-white/10 rounded-xl p-4"
              >
                <rec.icon size={18} className="text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white text-sm font-medium leading-tight">{rec.text}</div>
                  <div className="text-maroon-400 text-xs mt-0.5">{rec.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
