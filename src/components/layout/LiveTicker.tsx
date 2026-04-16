import { useEffect, useState } from 'react';
import { Radio, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../context/LanguageContext';
import { LiveUpdate } from '../../types';

export default function LiveTicker() {
  const { language, t } = useLanguage();
  const [updates, setUpdates] = useState<LiveUpdate[]>([]);

  useEffect(() => {
    supabase
      .from('live_updates')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setUpdates(data);
      });
  }, []);

  const tickerText = updates
    .map(u => language === 'kn' && u.message_kn ? u.message_kn : u.message)
    .join('   •••   ');

  if (updates.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-maroon-900 border-t border-maroon-700 overflow-hidden">
      <div className="flex items-center h-9">
        <div className="flex items-center gap-2 px-3 bg-maroon-800 h-full border-r border-maroon-600 shrink-0">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <Radio size={13} className="text-white" />
          <span className="text-white text-xs font-semibold tracking-wider uppercase whitespace-nowrap">
            {t.ticker.label}
          </span>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="flex items-center h-9">
            <p className="whitespace-nowrap animate-ticker text-white text-xs font-medium tracking-wide px-6">
              {tickerText}   •••   {tickerText}
            </p>
          </div>
        </div>
        <div className="px-3 h-full flex items-center border-l border-maroon-700 shrink-0">
          <AlertCircle size={13} className="text-yellow-400" />
        </div>
      </div>
    </div>
  );
}
