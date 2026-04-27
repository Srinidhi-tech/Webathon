import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, Users } from 'lucide-react';
import { estimateWaitTime } from '../../utils/appointmentHelpers';

interface LiveQueueCardProps {
  tokenNumber?: number;
  currentTokenServing?: number;
  appointmentTime?: string;
  isEmergency?: boolean;
  priority?: string;
}

export default function LiveQueueCard({
  tokenNumber,
  currentTokenServing = 0,
  appointmentTime,
  isEmergency = false,
  priority = 'Normal',
}: LiveQueueCardProps) {
  const [tokensRemaining, setTokensRemaining] = useState(0);
  const [estimatedWait, setEstimatedWait] = useState(0);

  useEffect(() => {
    if (tokenNumber && currentTokenServing) {
      const remaining = Math.max(0, tokenNumber - currentTokenServing);
      setTokensRemaining(remaining);
      setEstimatedWait(estimateWaitTime(remaining));
    }
  }, [tokenNumber, currentTokenServing]);

  if (!tokenNumber) return null;

  const getPriorityColor = () => {
    switch (priority) {
      case 'Emergency':
        return 'from-red-500 to-red-600';
      case 'High Priority':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-emerald-500 to-emerald-600';
    }
  };

  const getPriorityBadgeColor = () => {
    switch (priority) {
      case 'Emergency':
        return 'bg-red-100 text-red-800';
      case 'High Priority':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-emerald-100 text-emerald-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 text-white border border-slate-700 shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-700 rounded-lg">
            <Users size={16} />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-300">LIVE QUEUE</h3>
            <p className="text-sm font-bold text-white mt-0.5">Token #{tokenNumber}</p>
          </div>
        </div>
        {priority !== 'Normal' && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${getPriorityBadgeColor()}`}>
            {priority}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {/* Current Service */}
        <div className="bg-slate-700/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Now Serving</span>
            <span className="text-lg font-bold text-slate-100">#{currentTokenServing}</span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${getPriorityColor()}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (currentTokenServing / (tokenNumber + 5)) * 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Wait Info */}
        <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={14} className="text-emerald-400" />
            <span className="text-xs text-slate-400">Estimated Wait</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400 mb-1">
            {estimatedWait > 0 ? `${estimatedWait} mins` : 'Your turn soon!'}
          </div>
          {estimatedWait > 15 && (
            <p className="text-xs text-slate-300">
              {tokensRemaining} tokens ahead • Please arrive in {Math.max(5, estimatedWait - 15)} mins
            </p>
          )}
        </div>

        {/* Appointment Time */}
        {appointmentTime && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Appointment</span>
            <span className="font-semibold text-slate-100">{appointmentTime}</span>
          </div>
        )}

        {/* Emergency Badge */}
        {isEmergency && (
          <motion.div
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-lg p-2"
          >
            <AlertCircle size={14} className="text-red-400" />
            <span className="text-xs font-semibold text-red-300">URGENT - High Priority</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
