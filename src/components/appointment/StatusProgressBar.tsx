import { CheckCircle, Clock } from 'lucide-react';
import { getStatusColor, getStatusStep } from '../../utils/appointmentHelpers';

interface StatusProgressBarProps {
  status: string;
  showLabel?: boolean;
  compact?: boolean;
}

const statuses = ['Booked', 'Reminder Sent', 'Arrived', 'Consultation', 'Feedback Done'];

export default function StatusProgressBar({ status, showLabel = true, compact = false }: StatusProgressBarProps) {
  const currentStep = getStatusStep(status);

  return (
    <div className={compact ? 'py-2' : 'py-4'}>
      {showLabel && (
        <div className="flex items-center justify-between mb-3">
          <h3 className={compact ? 'text-xs font-semibold text-gray-700' : 'text-sm font-bold text-gray-900'}>
            Appointment Status
          </h3>
          <span className={`${getStatusColor(status)} px-2 py-0.5 rounded-full text-xs font-semibold`}>
            {status}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2">
        {statuses.map((step, idx) => (
          <div key={step} className="flex items-center flex-1">
            <div className="relative flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  idx + 1 < currentStep
                    ? 'bg-green-500 text-white'
                    : idx + 1 === currentStep
                      ? 'bg-blue-500 text-white ring-4 ring-blue-200'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {idx + 1 < currentStep ? (
                  <CheckCircle size={16} />
                ) : (
                  idx + 1
                )}
              </div>
              <div className={`text-xs font-medium text-gray-600 text-center mt-1 leading-tight ${compact ? 'text-[10px]' : ''}`}>
                {step === 'Reminder Sent' ? 'Reminder' : step === 'Feedback Done' ? 'Done' : step.split(' ')[0]}
              </div>
            </div>

            {idx < statuses.length - 1 && (
              <div
                className={`flex-1 h-1 mx-1 rounded-full ${
                  idx + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
