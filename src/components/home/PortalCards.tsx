import { motion } from 'framer-motion';
import { CircleUser as UserCircle, GraduationCap, Stethoscope, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Page } from '../../types';

interface PortalCardsProps {
  onNavigate: (page: Page) => void;
  onBookAppointment: () => void;
}

export default function PortalCards({ onNavigate, onBookAppointment }: PortalCardsProps) {
  const { t } = useLanguage();

  const portals = [
    {
      icon: UserCircle,
      title: t.portals.patientTitle,
      desc: t.portals.patientDesc,
      color: 'from-blue-600 to-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      action: onBookAppointment,
      features: ['Online Appointment', 'Track Status', 'Follow-up Care', 'OPD Timings'],
    },
    {
      icon: GraduationCap,
      title: t.portals.studentTitle,
      desc: t.portals.studentDesc,
      color: 'from-maroon-700 to-maroon-800',
      bg: 'bg-maroon-50',
      border: 'border-maroon-100',
      action: () => onNavigate('students'),
      features: ['Syllabus Access', 'Timetables', 'Hostel Complaints', 'Department Info'],
    },
    {
      icon: Stethoscope,
      title: t.portals.doctorTitle,
      desc: t.portals.doctorDesc,
      color: 'from-emerald-600 to-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      action: () => onNavigate('students'),
      features: ['Live Patient Schedules', 'Clinical Assignments', 'Case Reviews', 'Department Updates'],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Dedicated Portals for Every Need</h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">Streamlined access for patients, students, and clinical staff</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {portals.map((portal, idx) => (
            <motion.div
              key={portal.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className={`${portal.bg} ${portal.border} border rounded-2xl p-6 cursor-pointer group transition-shadow hover:shadow-xl`}
              onClick={portal.action}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${portal.color} flex items-center justify-center mb-4 shadow-md`}>
                <portal.icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{portal.title}</h3>
              <p className="text-gray-500 text-sm mb-5 leading-relaxed">{portal.desc}</p>
              <ul className="space-y-1.5 mb-5">
                {portal.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-maroon-700 group-hover:gap-2.5 transition-all">
                <span>Access Portal</span>
                <ArrowRight size={15} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
