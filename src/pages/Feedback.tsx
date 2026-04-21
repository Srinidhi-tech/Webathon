import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import FeedbackForm from '../components/feedback/FeedbackForm';

export default function Feedback() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);

  const testimonials = [
    { name: 'Ramesh K.', role: 'Patient', rating: 5, message: 'Excellent dental care. The staff was very professional and the facilities are top-notch.', date: 'March 2026' },
    { name: 'Priya S.', role: 'Student', rating: 5, message: 'RRDCH has been an incredible learning environment. The faculty are world-class educators.', date: 'February 2026' },
    { name: 'Anil M.', role: 'Parent', rating: 4, message: 'My daughter is studying BDS here. Great hostel facilities and excellent academic support.', date: 'January 2026' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-maroon-950 to-maroon-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <MessageSquare size={44} className="mx-auto mb-4 text-maroon-300" />
            <h1 className="text-4xl font-bold mb-3">{t.feedback.title}</h1>
            <p className="text-maroon-200 text-xl">{t.feedback.subtitle}</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 inline-flex items-center gap-2 bg-white text-maroon-800 hover:bg-maroon-50 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <MessageSquare size={18} />
              Share Your Feedback
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-clinical-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-3">What People Say</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Hear from our patients, students, and community members about their experiences at RRDCH</p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {testimonials.map((test, idx) => (
                <motion.div
                  key={test.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">"{test.message}"</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{test.name}</div>
                      <div className="text-gray-400 text-xs">{test.role}</div>
                    </div>
                    <div className="text-gray-300 text-xs">{test.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center py-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-maroon-800 hover:bg-maroon-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg"
            >
              <MessageSquare size={20} />
              Share Your Feedback Now
            </motion.button>
          </div>
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="my-8">
            <FeedbackForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
