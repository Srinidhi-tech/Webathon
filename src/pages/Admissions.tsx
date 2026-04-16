import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle, Phone, Mail, Calendar, FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const bdsDetails = [
  { label: 'Duration', value: '4 Years + 1 Year Internship' },
  { label: 'Total Seats', value: '100 per batch' },
  { label: 'Eligibility', value: '10+2 with PCB, 50% marks' },
  { label: 'Entrance', value: 'NEET UG Qualified' },
  { label: 'Affiliation', value: 'Rajiv Gandhi University of Health Sciences' },
];

const mdsPrograms = [
  { name: 'Oral Medicine & Radiology', seats: 3 },
  { name: 'Conservative Dentistry & Endodontics', seats: 3 },
  { name: 'Oral & Maxillofacial Surgery', seats: 3 },
  { name: 'Orthodontics & Dentofacial Orthopaedics', seats: 3 },
  { name: 'Periodontics', seats: 3 },
  { name: 'Prosthodontics & Crown & Bridge', seats: 3 },
  { name: 'Pedodontics & Preventive Dentistry', seats: 2 },
  { name: 'Public Health Dentistry', seats: 2 },
];

const steps = [
  { step: '01', title: 'Register Online', desc: 'Fill out the online application form on our website' },
  { step: '02', title: 'Submit Documents', desc: 'Upload required documents including NEET scorecard' },
  { step: '03', title: 'Counselling', desc: 'Attend counselling as per CENTAC/University schedule' },
  { step: '04', title: 'Fee Payment', desc: 'Complete admission formalities and pay the fees' },
  { step: '05', title: 'Enrollment', desc: 'Collect ID card and begin your academic journey' },
];

export default function Admissions() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-maroon-950 to-maroon-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <GraduationCap size={44} className="mx-auto mb-4 text-maroon-300" />
            <h1 className="text-4xl font-bold mb-3">{t.admissions.title}</h1>
            <p className="text-maroon-200 text-xl">{t.admissions.subtitle}</p>
            <div className="mt-6 inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 rounded-full px-5 py-2 font-semibold text-sm">
              <Calendar size={16} />
              Admissions Open 2026-27 — Apply Before May 31st
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-clinical-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-maroon-800 px-6 py-4">
                <h2 className="text-white font-bold text-xl">{t.admissions.bds}</h2>
                <p className="text-maroon-200 text-sm">{t.admissions.bdsDesc}</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {bdsDetails.map(item => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500 text-sm">{item.label}</span>
                      <span className="font-medium text-gray-900 text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full bg-maroon-800 hover:bg-maroon-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <FileText size={17} />
                  {t.admissions.apply}
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-4">
                <h2 className="text-white font-bold text-xl">{t.admissions.mds}</h2>
                <p className="text-blue-100 text-sm">{t.admissions.mdsDesc}</p>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  {mdsPrograms.map(prog => (
                    <div key={prog.name} className="flex items-center gap-3 py-2 border-b border-gray-50">
                      <CheckCircle size={15} className="text-green-500 shrink-0" />
                      <span className="text-gray-700 text-sm flex-1">{prog.name}</span>
                      <span className="text-gray-400 text-xs">{prog.seats} seats</span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <FileText size={17} />
                  {t.admissions.apply}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.admissions.process}</h2>
          </motion.div>
          <div className="flex flex-col md:flex-row gap-4">
            {steps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex-1 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-maroon-800 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-lg">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h3>
                <p className="text-gray-400 text-xs">{step.desc}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex items-center absolute">
                    <ArrowRight size={16} className="text-maroon-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-maroon-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6">{t.admissions.contact}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-2">
              <Phone size={22} className="text-maroon-300" />
              <div className="font-medium">+91 80 2860 5678</div>
              <div className="text-maroon-300 text-sm">Admissions Office</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Mail size={22} className="text-maroon-300" />
              <div className="font-medium">admissions@rrdch.edu.in</div>
              <div className="text-maroon-300 text-sm">Email us anytime</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Calendar size={22} className="text-maroon-300" />
              <div className="font-medium">Mon–Sat, 9 AM–5 PM</div>
              <div className="text-maroon-300 text-sm">Office Hours</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
