import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';

export default function HostelComplaintForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ student_name: '', room_number: '', complaint_type: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase.from('hostel_complaints').insert([form]);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.hostelComplaint.success}</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">{t.hostelComplaint.successMsg}</p>
            <button
              onClick={() => { setSubmitted(false); setForm({ student_name: '', room_number: '', complaint_type: '', description: '' }); }}
              className="mt-5 px-5 py-2 bg-maroon-800 text-white rounded-xl text-sm font-medium hover:bg-maroon-700 transition-colors"
            >
              Submit Another
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Home size={18} className="text-maroon-600" />
              {t.hostelComplaint.title}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.hostelComplaint.studentName} *</label>
                <input
                  type="text"
                  name="student_name"
                  required
                  value={form.student_name}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.hostelComplaint.roomNumber} *</label>
                <input
                  type="text"
                  name="room_number"
                  required
                  value={form.room_number}
                  onChange={handleChange}
                  placeholder="e.g. A-204"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.hostelComplaint.complaintType} *</label>
              <select
                name="complaint_type"
                required
                value={form.complaint_type}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-300"
              >
                <option value="">Select type...</option>
                {Object.entries(t.hostelComplaint.types).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.hostelComplaint.description} *</label>
              <textarea
                name="description"
                required
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your complaint in detail..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-300 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-maroon-800 hover:bg-maroon-700 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2 text-sm"
            >
              {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {t.hostelComplaint.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
