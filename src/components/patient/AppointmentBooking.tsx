import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, CheckCircle, Copy, X, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import { Department } from '../../types';

interface AppointmentBookingProps {
  onClose?: () => void;
}

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
];

const countryCodes = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'Australia' },
];

export default function AppointmentBooking({ onClose }: AppointmentBookingProps) {
  const { t } = useLanguage();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [form, setForm] = useState({
    patient_name: '',
    phone: '',
    email: '',
    country_code: '+91',
    department: 'General',
    appointment_date: '',
    appointment_time: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    supabase.from('departments').select('*').order('name').then(({ data }) => {
      if (data) setDepartments([{ id: 'general', name: 'General' } as Department, ...data]);
    });
  }, []);

  const validatePhone = (phone: string, countryCode: string) => {
    const phoneDigits = phone.replace(/\D/g, '');

    if (countryCode === '+91') {
      if (phoneDigits.length !== 10) return 'Phone must be 10 digits';
      const firstDigit = parseInt(phoneDigits[0]);
      if (![6, 7, 8, 9].includes(firstDigit)) {
        return 'Phone number must start with 6, 7, 8, or 9';
      }
    }
    return '';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.patient_name.trim()) newErrors.patient_name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    else {
      const phoneError = validatePhone(form.phone, form.country_code);
      if (phoneError) newErrors.phone = phoneError;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!form.appointment_date) newErrors.appointment_date = 'Date is required';
    if (!form.appointment_time) newErrors.appointment_time = 'Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
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
    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        patient_name: form.patient_name,
        email: form.email || null,
        phone: form.phone,
        country_code: form.country_code,
        department: form.department,
        appointment_date: form.appointment_date,
        appointment_time: form.appointment_time,
        notes: form.notes || null,
      }])
      .select('id')
      .maybeSingle();

    setLoading(false);
    if (!error && data) {
      setSuccess(data.id);
      setForm({
        patient_name: '',
        phone: '',
        email: '',
        country_code: '+91',
        department: 'General',
        appointment_date: '',
        appointment_time: '',
        notes: '',
      });
    }
  };

  const copyId = () => {
    if (success) {
      navigator.clipboard.writeText(success);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-maroon-800 to-maroon-700 p-6 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <CalendarDays size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-xl">{t.appointment.title}</h2>
            <p className="text-maroon-200 text-sm">{t.appointment.subtitle}</p>
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.appointment.success}</h3>
              <p className="text-gray-500 text-sm mb-5">Your appointment has been scheduled successfully!</p>
              <div className="flex items-center gap-2 bg-maroon-50 border border-maroon-200 rounded-xl p-4 justify-center mb-5">
                <span className="text-maroon-800 font-mono font-bold text-lg tracking-widest">{success.slice(0, 8).toUpperCase()}</span>
                <button onClick={copyId} className="ml-2 p-1.5 rounded-lg hover:bg-maroon-100 transition-colors">
                  {copied ? <CheckCircle size={16} className="text-green-600" /> : <Copy size={16} className="text-maroon-600" />}
                </button>
              </div>
              <p className="text-gray-400 text-xs mb-5">Save this ID to track your appointment status</p>
              {onClose && (
                <button onClick={onClose} className="mt-4 px-6 py-2 bg-maroon-800 text-white rounded-xl text-sm font-medium hover:bg-maroon-700 transition-colors">
                  Close
                </button>
              )}
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="patient_name"
                    value={form.patient_name}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.patient_name ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-maroon-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.patient_name && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle size={12} /> {errors.patient_name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country Code *</label>
                  <select
                    name="country_code"
                    value={form.country_code}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-300 focus:border-transparent"
                  >
                    {countryCodes.map(cc => (
                      <option key={cc.code} value={cc.code}>{cc.code} - {cc.country}</option>
                    ))}
                  </select>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-300 focus:border-transparent"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date *</label>
                  <input
                    type="date"
                    name="appointment_date"
                    min={minDate}
                    value={form.appointment_date}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.appointment_date ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-maroon-300'
                    }`}
                  />
                  {errors.appointment_date && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle size={12} /> {errors.appointment_date}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Time *</label>
                  <select
                    name="appointment_time"
                    value={form.appointment_time}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.appointment_time ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-maroon-300'
                    }`}
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.appointment_time && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle size={12} /> {errors.appointment_time}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-300 focus:border-transparent resize-none"
                    placeholder="Any special requests or medical conditions..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-maroon-800 hover:bg-maroon-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Booking...</>
                ) : (
                  <><CalendarDays size={17} /> Book Appointment</>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
