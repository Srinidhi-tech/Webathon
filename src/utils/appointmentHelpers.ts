export const generateAppointmentId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `APT-${timestamp}-${random}`;
};

export const formatAppointmentTime = (time: string): string => {
  return time;
};

export const calculateArrivalTime = (appointmentTime: string): string => {
  const [hours, minutes] = appointmentTime.includes(':')
    ? appointmentTime.split(':').map(Number)
    : [9, 0];

  const arrivalMinutes = Math.max(0, minutes - 30);
  const arrivalHours = arrivalMinutes > minutes ? hours - 1 : hours;

  return `${String(arrivalHours).padStart(2, '0')}:${String(arrivalMinutes).padStart(2, '0')}`;
};

export const calculateReminderTime = (appointmentTime: string): string => {
  const [hours, minutes] = appointmentTime.includes(':')
    ? appointmentTime.split(':').map(Number)
    : [9, 0];

  const reminderMinutes = minutes;
  const reminderHours = Math.max(0, hours - 1);

  return `${String(reminderHours).padStart(2, '0')}:${String(reminderMinutes).padStart(2, '0')}`;
};

export const estimateWaitTime = (tokensRemaining: number): number => {
  return tokensRemaining * 15;
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Booked':
      return 'bg-blue-100 text-blue-800';
    case 'Reminder Sent':
      return 'bg-yellow-100 text-yellow-800';
    case 'Arrived':
      return 'bg-cyan-100 text-cyan-800';
    case 'Consultation':
      return 'bg-purple-100 text-purple-800';
    case 'Feedback Done':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusStep = (status: string): number => {
  const steps: Record<string, number> = {
    'Booked': 1,
    'Reminder Sent': 2,
    'Arrived': 3,
    'Consultation': 4,
    'Feedback Done': 5,
  };
  return steps[status] || 0;
};
