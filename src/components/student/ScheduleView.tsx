import { motion } from 'framer-motion';

const schedule = [
  { day: 'Monday', dept: 'Conservative Dentistry', time: '9:00–11:00 AM', room: 'Lab A', type: 'Practical' },
  { day: 'Monday', dept: 'Orthodontics', time: '11:30 AM–1:00 PM', room: 'Clinic B2', type: 'Clinical' },
  { day: 'Tuesday', dept: 'Oral Surgery', time: '9:00–11:00 AM', room: 'OT-2', type: 'Clinical' },
  { day: 'Tuesday', dept: 'Periodontics', time: '2:00–4:00 PM', room: 'Clinic C1', type: 'Clinical' },
  { day: 'Wednesday', dept: 'Prosthodontics', time: '9:00–11:00 AM', room: 'Lab B', type: 'Practical' },
  { day: 'Wednesday', dept: 'Oral Medicine', time: '11:30 AM–1:00 PM', room: 'Room 101', type: 'Theory' },
  { day: 'Thursday', dept: 'Pedodontics', time: '9:00–11:00 AM', room: 'Clinic D3', type: 'Clinical' },
  { day: 'Thursday', dept: 'Public Health', time: '2:00–4:00 PM', room: 'Seminar Hall', type: 'Theory' },
  { day: 'Friday', dept: 'All Departments', time: '9:00 AM–4:00 PM', room: 'OPD Block', type: 'Clinical Posting' },
  { day: 'Saturday', dept: 'Research & CDE', time: '10:00 AM–1:00 PM', room: 'Conference Hall', type: 'Seminar' },
];

const typeColors: Record<string, string> = {
  Practical: 'bg-blue-50 text-blue-700 border-blue-200',
  Clinical: 'bg-green-50 text-green-700 border-green-200',
  Theory: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Clinical Posting': 'bg-maroon-50 text-maroon-700 border-maroon-200',
  Seminar: 'bg-rose-50 text-rose-700 border-rose-200',
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function ScheduleView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">BDS 3rd Year — April 2026</h3>
        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Current Week</span>
      </div>
      <div className="space-y-2">
        {days.map(day => {
          const daySchedule = schedule.filter(s => s.day === day);
          return (
            <div key={day} className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="bg-maroon-50 px-4 py-2 border-b border-gray-100">
                <span className="font-semibold text-maroon-800 text-sm">{day}</span>
              </div>
              <div className="divide-y divide-gray-50">
                {daySchedule.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 px-4 py-3">
                    <div className="w-28 shrink-0 text-xs text-gray-500 font-medium">{item.time}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{item.dept}</div>
                      <div className="text-xs text-gray-400">{item.room}</div>
                    </div>
                    <span className={`text-xs font-medium border rounded-full px-2.5 py-0.5 ${typeColors[item.type] || typeColors.Theory}`}>
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
