import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const tourSpots = [
  {
    key: 'graduation',
    image: '/WhatsApp_Image_2026-04-16_at_10.05.48_(8).jpeg',
    title: '20th Graduation Day',
    description: 'Celebrating our 20th Graduation Day — a proud milestone for students, faculty, and the institution.',
  },
  {
    key: 'procession',
    image: '/WhatsApp_Image_2026-04-16_at_10.05.48_(10).jpeg',
    title: 'Graduation Procession',
    description: 'Graduates and dignitaries march in ceremonial robes during the annual convocation at RRDCH.',
  },
  {
    key: 'inauguration',
    image: '/WhatsApp_Image_2026-04-16_at_10.05.48_(14).jpeg',
    title: 'Event Inauguration',
    description: 'Traditional lamp-lighting ceremony marking the inauguration of a community outreach programme.',
  },
  {
    key: 'lions',
    image: '/WhatsApp_Image_2026-04-16_at_10.05.48_(16).jpeg',
    title: 'Lions Club Collaboration',
    description: 'RRDCH partners with Lions Club of Bangalore South for community health and blood donation drives.',
  },
  {
    key: 'bloodcamp',
    image: '/WhatsApp_Image_2026-04-16_at_10.05.48_(17).jpeg',
    title: 'Blood Donation Camp',
    description: 'Department of Public Health Dentistry organises blood donation camps serving the local community.',
  },
];

export default function VirtualTour() {
  const { t } = useLanguage(); // used for section heading translations
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + tourSpots.length) % tourSpots.length);
  const next = () => setCurrent((c) => (c + 1) % tourSpots.length);

  const spot = tourSpots[current];
  const spotTitle = spot.title;
  const spotDesc = spot.description;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-maroon-100 text-maroon-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Play size={14} fill="currentColor" />
            <span>Virtual Campus Tour</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.virtualTour.title}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t.virtualTour.subtitle}</p>
        </motion.div>

        <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/RHipNov_9qE?si=mIXWXx1KNYQ3q9b2"
            title="RRDCH Virtual Tour"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gray-900">
              <AnimatePresence mode="wait">
                <motion.img
                  key={spot.key}
                  src={spot.image}
                  alt={spotTitle}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-white font-semibold text-lg">{spotTitle}</div>
                <div className="text-white/70 text-sm mt-1">{spotDesc}</div>
              </div>
              <button
                onClick={() => setLightbox(true)}
                className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
              >
                <Maximize2 size={16} />
              </button>
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors">
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 pb-1">
                {tourSpots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-white w-4' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            {tourSpots.map((s, idx) => (
              <motion.button
                key={s.key}
                whileHover={{ x: 4 }}
                onClick={() => setCurrent(idx)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  idx === current ? 'bg-maroon-50 border-maroon-200' : 'bg-white border-gray-100 hover:border-maroon-100'
                }`}
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className={`font-medium text-sm ${idx === current ? 'text-maroon-800' : 'text-gray-800'}`}>
                    {s.title}
                  </div>
                  <div className="text-gray-400 text-xs mt-0.5 line-clamp-2">{s.description}</div>
                </div>
                {idx === current && <div className="ml-auto w-2 h-2 rounded-full bg-maroon-600 shrink-0" />}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white">
              <X size={20} />
            </button>
            <img src={spot.image} alt={spotTitle} className="max-w-4xl w-full rounded-xl shadow-2xl" onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
