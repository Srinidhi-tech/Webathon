import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, BookOpen, Users, Music, FlaskConical, Heart, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import { CalendarEvent } from '../../types';

const eventTypeConfig: Record<string, { color: string; bg: string; icon: typeof CalendarDays }> = {
  conference: { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: Globe },
  camp: { color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: Heart },
  academic: { color: 'text-maroon-700', bg: 'bg-maroon-50 border-maroon-200', icon: BookOpen },
  exam: { color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200', icon: FlaskConical },
  cultural: { color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200', icon: Music },
  general: { color: 'text-gray-700', bg: 'bg-gray-50 border-gray-200', icon: Users },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.getDate(),
    month: d.toLocaleString('default', { month: 'short' }),
    weekday: d.toLocaleString('default', { weekday: 'short' }),
  };
}

export default function EventsCalendar() {
  const { language, t } = useLanguage();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .gte('event_date', new Date().toISOString().split('T')[0])
      .order('event_date', { ascending: true })
      .then(({ data }) => {
        if (data) setEvents(data as CalendarEvent[]);
      });
  }, []);

  const eventTypes = ['all', ...Array.from(new Set(events.map(e => e.event_type)))];
  const filtered = filter === 'all' ? events : events.filter(e => e.event_type === filter);

  return (
    <section className="py-16 bg-clinical-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-maroon-100 text-maroon-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <CalendarDays size={15} />
            <span>Calendar</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.events.title}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t.events.subtitle}</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {eventTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize ${
                filter === type
                  ? 'bg-maroon-800 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-maroon-300 hover:text-maroon-700'
              }`}
            >
              {type === 'all' ? 'All Events' : t.events.types[type as keyof typeof t.events.types] || type}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">{t.events.noEvents}</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((event, idx) => {
              const config = eventTypeConfig[event.event_type] || eventTypeConfig.general;
              const Icon = config.icon;
              const date = formatDate(event.event_date);

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-stretch">
                    <div className="w-16 flex-shrink-0 bg-maroon-800 flex flex-col items-center justify-center text-white p-3">
                      <div className="text-xs uppercase tracking-wider text-maroon-300">{date.month}</div>
                      <div className="text-3xl font-bold leading-none">{date.day}</div>
                      <div className="text-xs text-maroon-300 mt-1">{date.weekday}</div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className={`inline-flex items-center gap-1.5 ${config.bg} border ${config.color} rounded-full px-2.5 py-0.5 text-xs font-medium mb-2`}>
                        <Icon size={11} />
                        {t.events.types[event.event_type as keyof typeof t.events.types] || event.event_type}
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm leading-snug mb-1">
                        {language === 'kn' && event.title_kn ? event.title_kn : event.title}
                      </h4>
                      <p className="text-gray-400 text-xs line-clamp-2">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
