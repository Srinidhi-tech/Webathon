import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';

export default function Feedback() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', role: 'patient', message: '', rating: 5 });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase.from('feedback').insert([form]);
    setLoading(false);
    setSubmitted(true);
  };

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
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-clinical-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-maroon-800 to-maroon-700 p-6">
                  <h2 className="text-white font-bold text-xl">{t.feedback.title}</h2>
                  <p className="text-maroon-200 text-sm">{t.feedback.subtitle}</p>
                </div>
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-10"
                      >
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle size={32} className="text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{t.feedback.success}</h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto">{t.feedback.successMsg}</p>
                        <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', role: 'patient', message: '', rating: 5 }); }}
                          className="mt-5 px-5 py-2 bg-maroon-800 text-white rounded-xl text-sm font-medium hover:bg-maroon-700 transition-colors">
                          Submit Another
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.feedback.name} *</label>
                            <input type="text" name="name" required value={form.name} onChange={handleChange}
                              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-300" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.feedback.email}</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange}
                              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-300" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t.feedback.role} *</label>
                          <select name="role" value={form.role} onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-300">
                            {Object.entries(t.feedback.roles).map(([key, label]) => (
                              <option key={key} value={key}>{label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{t.feedback.rating}</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setForm(f => ({ ...f, rating: star }))}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="transition-transform hover:scale-110"
                              >
                                <Star
                                  size={28}
                                  className={`${star <= (hoverRating || form.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} transition-colors`}
                                />
                              </button>
                            ))}
                            <span className="text-gray-400 text-sm self-center ml-2">{form.rating}/5</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t.feedback.message} *</label>
                          <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                            placeholder="Share your experience with us..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-300 resize-none" />
                        </div>
                        <button type="submit" disabled={loading}
                          className="w-full bg-maroon-800 hover:bg-maroon-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                          {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                          {t.feedback.submit}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">What people say</h3>
              {testimonials.map((test, idx) => (
                <motion.div
                  key={test.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">"{test.message}"</p>
                  <div className="flex items-center justify-between">
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
        </div>
      </section>
    </div>
  );
}
