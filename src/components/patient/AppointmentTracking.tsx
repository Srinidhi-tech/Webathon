import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, Clock, XCircle, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import { Appointment } from '../../types';

interface AppointmentTrackingProps {
  onClose?: () => void;
}

const statusConfig = {
  pending: { color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200', icon: Clock, label: 'Pending Confirmation' },
  confirmed: { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: CheckCircle, label: 'Confirmed' },
  completed: { color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: CheckCircle, label: 'Completed' },
  cancelled: { color: 'text-red-700', bg: 'bg-red-50 border-red-200', icon: XCircle, label: 'Cancelled' },
};

export default function AppointmentTracking({ onClose }: AppointmentTrackingProps) {
  const { t } = useLanguage();
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Appointment | null | 'not-found'>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await supabase
      .from('appointments')
      .select('*')
      .eq('tracking_id', trackingId.toUpperCase().trim())
      .maybeSingle();

    setLoading(false);
    setResult(data ? (data as Appointment) : 'not-found');
  };

  const statusInfo = result && result !== 'not-found' ? statusConfig[result.status] || statusConfig.pending : null;

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-maroon-800 to-maroon-700 p-6 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Search size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-xl">{t.appointment.trackTitle}</h2>
            <p className="text-maroon-200 text-sm">{t.appointment.trackSubtitle}</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="p-6">
        <form onSubmit={handleTrack} className="flex gap-3 mb-6">
          <input
            type="text"
            value={trackingId}
            onChange={e => setTrackingId(e.target.value)}
            placeholder="Enter Tracking ID (e.g. AB12CD34)"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-300 uppercase font-mono"
          />
          <button
            type="submit"
            disabled={loading || !trackingId.trim()}
            className="bg-maroon-800 hover:bg-maroon-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search size={16} />}
            {t.appointment.track}
          </button>
        </form>

        <AnimatePresence>
          {result === 'not-found' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
            >
              <XCircle size={24} className="text-red-500 mx-auto mb-2" />
              <p className="text-red-700 text-sm">{t.appointment.notFound}</p>
            </motion.div>
          )}

          {result && result !== 'not-found' && statusInfo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className={`flex items-center gap-3 ${statusInfo.bg} border rounded-xl p-4`}>
                <statusInfo.icon size={22} className={statusInfo.color} />
                <div>
                  <div className={`font-semibold ${statusInfo.color}`}>Status: {statusInfo.label}</div>
                  <div className="text-gray-500 text-xs">Tracking ID: {result.tracking_id}</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-gray-400 text-xs mb-0.5">Patient Name</div>
                    <div className="font-medium text-gray-900">{result.patient_name}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-0.5">Department</div>
                    <div className="font-medium text-gray-900">{result.department}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-0.5">Appointment Date</div>
                    <div className="font-medium text-gray-900">
                      {new Date(result.preferred_date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-0.5">Time</div>
                    <div className="font-medium text-gray-900">{result.preferred_time}</div>
                  </div>
                </div>
                {result.notes && (
                  <div className="border-t border-gray-200 pt-3">
                    <div className="text-gray-400 text-xs mb-0.5">Notes from Hospital</div>
                    <div className="text-gray-700 text-sm">{result.notes}</div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
