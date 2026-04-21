import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, CheckCircle, X, AlertCircle, Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface FeedbackFormProps {
  onClose?: () => void;
}

const feedbackTypes = [
  'General Feedback',
  'Service Quality',
  'Academic Content',
  'Facility & Infrastructure',
  'Staff Behavior',
  'Other',
];

export default function FeedbackForm({ onClose }: FeedbackFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country_code: '+91',
    feedback_text: '',
    rating: 5,
    feedback_type: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validatePhone = (phone: string) => {
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) return 'Phone must be 10 digits';
    const firstDigit = parseInt(phoneDigits[0]);
    if (![6, 7, 8, 9].includes(firstDigit)) {
      return 'Phone number must start with 6, 7, 8, or 9';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    else {
      const phoneError = validatePhone(form.phone);
      if (phoneError) newErrors.phone = phoneError;
    }
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!form.feedback_type) newErrors.feedback_type = 'Please select feedback type';
    if (!form.feedback_text.trim()) newErrors.feedback_text = 'Feedback is required';
    if (form.feedback_text.trim().length < 10) newErrors.feedback_text = 'Feedback must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'rating' ? parseInt(value) : value }));
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const { error } = await supabase
      .from('feedback')
      .insert([{
        name: form.name,
        email: form.email,
        phone: form.phone,
        country_code: form.country_code,
        feedback_text: form.feedback_text,
        rating: form.rating,
        feedback_type: form.feedback_type,
      }]);

    setLoading(false);
    if (!error) {
      setSuccess(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        country_code: '+91',
        feedback_text: '',
        rating: 5,
        feedback_type: '',
      });
      setTimeout(() => {
        if (onClose) onClose();
      }, 3000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-maroon-800 to-maroon-700 p-6 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <MessageSquare size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-xl">Share Your Feedback</h2>
            <p className="text-maroon-200 text-sm">Help us improve our services</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-500 text-sm">Your feedback has been received. We appreciate your valuable input and will use it to improve our services.</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.name ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-maroon-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle size={12} /> {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.email ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-maroon-300'
                    }`}
                    placeholder="you@email.com"
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle size={12} /> {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.phone ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-maroon-300'
                    }`}
                    placeholder="98765 43210"
                  />
                  {errors.phone && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle size={12} /> {errors.phone}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Type *</label>
                  <select
                    name="feedback_type"
                    value={form.feedback_type}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.feedback_type ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-maroon-300'
                    }`}
                  >
                    <option value="">Select feedback type...</option>
                    {feedbackTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.feedback_type && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle size={12} /> {errors.feedback_type}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, rating: star }))}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          className={`${
                            star <= form.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          } transition-colors cursor-pointer`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Feedback *</label>
                  <textarea
                    name="feedback_text"
                    value={form.feedback_text}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all ${
                      errors.feedback_text ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-maroon-300'
                    }`}
                    placeholder="Please share your feedback, suggestions, or concerns..."
                  />
                  <div className="flex justify-between mt-1">
                    {errors.feedback_text && (
                      <div className="flex items-center gap-1 text-red-600 text-xs">
                        <AlertCircle size={12} /> {errors.feedback_text}
                      </div>
                    )}
                    <span className="text-gray-400 text-xs">{form.feedback_text.length}/500</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-maroon-800 hover:bg-maroon-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                ) : (
                  <><MessageSquare size={17} /> Submit Feedback</>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
