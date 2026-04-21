import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle, X, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface CourseApplicationFormProps {
  onClose?: () => void;
}

const courses = [
  'BDS (Bachelor of Dental Surgery)',
  'MDS - Prosthodontics',
  'MDS - Orthodontics',
  'MDS - Periodontics',
  'MDS - Conservative Dentistry',
  'MDS - Oral Surgery',
  'MDS - Pediatric Dentistry',
  'MDS - Oral Pathology',
  'MDS - Public Health Dentistry',
];

const qualifications = [
  '12th Pass (HSC)',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Diploma',
  'Other',
];

export default function CourseApplicationForm({ onClose }: CourseApplicationFormProps) {
  const [form, setForm] = useState({
    applicant_name: '',
    email: '',
    phone: '',
    country_code: '+91',
    course_name: '',
    educational_qualification: '',
    institution_name: '',
    years_of_experience: '',
    motivation_letter: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

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

    if (!form.applicant_name.trim()) newErrors.applicant_name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    else {
      const phoneError = validatePhone(form.phone);
      if (phoneError) newErrors.phone = phoneError;
    }
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!form.course_name) newErrors.course_name = 'Please select a course';
    if (!form.educational_qualification) newErrors.educational_qualification = 'Please select your qualification';
    if (!form.institution_name.trim()) newErrors.institution_name = 'Institution name is required';
    if (!form.motivation_letter.trim()) newErrors.motivation_letter = 'Motivation letter is required';

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
      .from('course_applications')
      .insert([{
        applicant_name: form.applicant_name,
        email: form.email,
        phone: form.phone,
        country_code: form.country_code,
        course_name: form.course_name,
        educational_qualification: form.educational_qualification,
        institution_name: form.institution_name,
        years_of_experience: form.years_of_experience ? parseInt(form.years_of_experience) : 0,
        motivation_letter: form.motivation_letter,
      }])
      .select('id')
      .maybeSingle();

    setLoading(false);
    if (!error && data) {
      setSuccess(data.id);
      setForm({
        applicant_name: '',
        email: '',
        phone: '',
        country_code: '+91',
        course_name: '',
        educational_qualification: '',
        institution_name: '',
        years_of_experience: '',
        motivation_letter: '',
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-maroon-800 to-maroon-700 p-6 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-xl">Course Application</h2>
            <p className="text-maroon-200 text-sm">Apply for your desired course at RRDCH</p>
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
              <p className="text-gray-500 text-sm mb-5">Your course application has been received successfully. We will review it and contact you soon.</p>
              <div className="bg-maroon-50 border border-maroon-200 rounded-xl p-4 mb-5">
                <p className="text-maroon-800 text-sm">Application ID: <span className="font-mono font-bold">{success.slice(0, 8).toUpperCase()}</span></p>
              </div>
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
                    name="applicant_name"
                    value={form.applicant_name}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.applicant_name ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-maroon-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.applicant_name && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle size={12} /> {errors.applicant_name}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Course *</label>
                  <select
                    name="course_name"
                    value={form.course_name}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.course_name ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-maroon-300'
                    }`}
                  >
                    <option value="">Choose a course...</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                  {errors.course_name && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle size={12} /> {errors.course_name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Educational Qualification *</label>
                  <select
                    name="educational_qualification"
                    value={form.educational_qualification}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.educational_qualification ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-maroon-300'
                    }`}
                  >
                    <option value="">Select qualification...</option>
                    {qualifications.map(qual => (
                      <option key={qual} value={qual}>{qual}</option>
                    ))}
                  </select>
                  {errors.educational_qualification && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle size={12} /> {errors.educational_qualification}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                  <input
                    type="number"
                    name="years_of_experience"
                    value={form.years_of_experience}
                    onChange={handleChange}
                    min="0"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-300 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution/Previous College Name *</label>
                  <input
                    type="text"
                    name="institution_name"
                    value={form.institution_name}
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.institution_name ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-maroon-300'
                    }`}
                    placeholder="College name"
                  />
                  {errors.institution_name && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle size={12} /> {errors.institution_name}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Motivation Letter *</label>
                  <textarea
                    name="motivation_letter"
                    value={form.motivation_letter}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all ${
                      errors.motivation_letter ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-maroon-300'
                    }`}
                    placeholder="Tell us why you want to apply for this course..."
                  />
                  {errors.motivation_letter && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle size={12} /> {errors.motivation_letter}
                    </div>
                  )}
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
                  <><BookOpen size={17} /> Submit Application</>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
