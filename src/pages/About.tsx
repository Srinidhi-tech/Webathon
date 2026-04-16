import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Building } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const leadership = [
  { name: 'Dr. K. Rajagopal', role: 'Principal & Dean', dept: 'Oral Surgery', image: 'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Dr. Meena Krishnan', role: 'Vice Principal', dept: 'Periodontics', image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Dr. Suresh Babu', role: 'Medical Superintendent', dept: 'Prosthodontics', image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { name: 'Dr. Anita Sharma', role: 'Head of Research', dept: 'Oral Medicine', image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

const milestones = [
  { year: '2000', event: 'RRDCH established under Rajya Vaidya Shala Trust' },
  { year: '2003', event: 'First batch of BDS students graduated' },
  { year: '2007', event: 'MDS programs launched across 6 specializations' },
  { year: '2012', event: 'NAAC A Grade Accreditation awarded' },
  { year: '2016', event: 'Research center and simulation lab inaugurated' },
  { year: '2019', event: '2 additional MDS specializations added' },
  { year: '2022', event: 'New hospital wing with 100 additional chairs opened' },
  { year: '2025', event: 'International collaborations with 3 universities' },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-maroon-950 to-maroon-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Building size={40} className="mx-auto mb-4 text-maroon-300" />
            <h1 className="text-4xl font-bold mb-3">{t.about.title}</h1>
            <p className="text-maroon-200 text-xl">{t.about.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-clinical-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-maroon-100 flex items-center justify-center">
                  <Eye size={20} className="text-maroon-700" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{t.about.vision}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{t.about.visionText}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Target size={20} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{t.about.mission}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{t.about.missionText}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.about.leadership}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person, idx) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow text-center"
              >
                <div className="h-48 bg-gradient-to-br from-maroon-100 to-clinical-200 overflow-hidden">
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <div className="p-4">
                  <div className="font-bold text-gray-900 text-sm mb-0.5">{person.name}</div>
                  <div className="text-maroon-700 text-xs font-medium mb-0.5">{person.role}</div>
                  <div className="text-gray-400 text-xs">{person.dept}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-clinical-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <Award size={32} className="mx-auto mb-3 text-maroon-700" />
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Journey</h2>
            <p className="text-gray-500">Milestones that define our legacy</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-maroon-200 -translate-x-1/2" />
            <div className="space-y-6">
              {milestones.map((m, idx) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-4 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm inline-block max-w-xs">
                      <div className="font-bold text-maroon-700 text-sm mb-1">{m.year}</div>
                      <div className="text-gray-600 text-sm">{m.event}</div>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-maroon-700 border-2 border-white shadow-md shrink-0 z-10" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
