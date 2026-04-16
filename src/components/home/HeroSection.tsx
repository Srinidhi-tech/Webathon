import { motion } from 'framer-motion';
import { CalendarDays, Search, Play, ArrowRight, Shield, Award, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface HeroSectionProps {
  onBookAppointment: () => void;
  onTrackAppointment: () => void;
  onVirtualTour: () => void;
}

export default function HeroSection({ onBookAppointment, onTrackAppointment, onVirtualTour }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-800">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/90 via-maroon-900/70 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 bg-maroon-800/60 border border-maroon-600/40 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-maroon-100 text-sm font-medium">DCI Recognized • NAAC Accredited</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {t.hero.title}
            </h1>

            <p className="text-maroon-200 text-xl font-semibold mb-3">{t.hero.subtitle}</p>

            <div className="flex items-center gap-3 mb-5">
              <img
                src="/WhatsApp_Image_2026-04-16_at_10.05.49_(7).jpeg"
                alt="ISO 9001:2015 Certified"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20 bg-white"
              />
              <img
                src="/WhatsApp_Image_2026-04-16_at_10.05.49_(14).jpeg"
                alt="College Crest"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20 bg-white"
              />
              <span className="text-maroon-300 text-xs leading-tight">ISO 9001:2015 Certified<br />NAAC 'A' Accredited</span>
            </div>

            <p className="text-maroon-300 text-base leading-relaxed mb-8 max-w-lg">
              {t.hero.tagline}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onBookAppointment}
                className="flex items-center gap-2 bg-white text-maroon-800 hover:bg-clinical-100 font-semibold px-6 py-3 rounded-xl shadow-lg transition-colors"
              >
                <CalendarDays size={18} />
                {t.hero.bookAppointment}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onTrackAppointment}
                className="flex items-center gap-2 bg-maroon-700/80 hover:bg-maroon-700 border border-maroon-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <Search size={18} />
                {t.hero.trackAppointment}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onVirtualTour}
                className="flex items-center gap-2 border border-maroon-400/60 text-maroon-100 hover:bg-maroon-800/60 font-medium px-5 py-3 rounded-xl transition-colors"
              >
                <Play size={16} fill="currentColor" />
                {t.hero.virtualTour}
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                { icon: Shield, label: 'NAAC A Grade' },
                { icon: Award, label: 'Best Dental College KA 2023' },
                { icon: Users, label: '5000+ Alumni' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-maroon-200 text-sm">
                  <Icon size={16} className="text-yellow-400" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-48 shadow-2xl">
                  <img
                    src="/WhatsApp_Image_2026-04-16_at_10.05.48_(8).jpeg"
                    alt="20th Graduation Day"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-36 shadow-2xl">
                  <img
                    src="/WhatsApp_Image_2026-04-16_at_10.05.47_(1).jpeg"
                    alt="Pedodontics OPD"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl overflow-hidden h-36 shadow-2xl">
                  <img
                    src="/WhatsApp_Image_2026-04-16_at_10.05.48_(14).jpeg"
                    alt="Event Inauguration"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-xl">
                  <div className="text-3xl font-bold text-white mb-1">25+</div>
                  <div className="text-maroon-200 text-sm">Years of Excellence</div>
                  <div className="mt-3 flex items-center gap-1 text-maroon-300 text-xs">
                    <span>Learn more</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
                <div className="bg-maroon-700/60 backdrop-blur-sm border border-maroon-600/40 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-white mb-1">50,000+</div>
                  <div className="text-maroon-200 text-sm">Patients Treated</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
