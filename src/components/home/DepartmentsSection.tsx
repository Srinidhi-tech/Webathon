import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, ChevronRight, Microscope } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import { Department } from '../../types';

const deptIcons = ['🦷', '🔬', '🩺', '😁', '🦱', '🦮', '👶', '🌍'];

export default function DepartmentsSection() {
  const { language, t } = useLanguage();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('departments').select('*').order('name').then(({ data }) => {
      if (data) setDepartments(data);
    });
  }, []);

  return (
    <section className="py-16 bg-clinical-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-maroon-100 text-maroon-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Microscope size={15} />
            <span>Clinical Excellence</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.departments.title}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t.departments.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((dept, idx) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className={`bg-white border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                expanded === dept.id ? 'border-maroon-300 shadow-xl shadow-maroon-100' : 'border-gray-100 hover:border-maroon-200 hover:shadow-md'
              }`}
              onClick={() => setExpanded(expanded === dept.id ? null : dept.id)}
            >
              <div className="p-5">
                <div className="text-3xl mb-3">{deptIcons[idx % deptIcons.length]}</div>
                <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                  {language === 'kn' ? dept.name_kn : dept.name}
                </h3>
                <p className="text-gray-400 text-xs line-clamp-2">{dept.description}</p>
              </div>

              {expanded === dept.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t border-gray-100 px-5 pb-5 pt-3 bg-maroon-50/50"
                >
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600">
                      <span className="font-medium text-gray-800">HOD:</span> {dept.head_name}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MapPin size={11} className="text-maroon-400" />
                      {dept.room}
                    </div>
                    {dept.phone && (
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Phone size={11} className="text-maroon-400" />
                        {dept.phone}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              <div className="px-5 pb-4">
                <div className="flex items-center gap-1 text-xs font-medium text-maroon-600">
                  <span>{expanded === dept.id ? 'Less info' : 'More info'}</span>
                  <ChevronRight size={12} className={`transition-transform ${expanded === dept.id ? 'rotate-90' : ''}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
