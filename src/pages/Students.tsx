import StudentPortal from '../components/student/StudentPortal';
import PGDoctorPortal from '../components/doctor/PGDoctorPortal';
import { useState } from 'react';
import { GraduationCap, Stethoscope } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

type Role = 'student' | 'pg';

export default function Students() {
  const { t } = useLanguage();
  const [role, setRole] = useState<Role>('student');

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-maroon-950 to-maroon-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3">Academic Portals</h1>
            <p className="text-maroon-200">Dedicated tools for students and clinical faculty</p>
          </motion.div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setRole('student')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                role === 'student' ? 'bg-white text-maroon-800 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              <GraduationCap size={18} />
              {t.studentPortal.title}
            </button>
            <button
              onClick={() => setRole('pg')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                role === 'pg' ? 'bg-white text-maroon-800 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              <Stethoscope size={18} />
              {t.pgPortal.title}
            </button>
          </div>
        </div>
      </section>

      {role === 'student' ? <StudentPortal /> : <PGDoctorPortal />}
    </div>
  );
}
