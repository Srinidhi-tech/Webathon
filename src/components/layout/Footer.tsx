import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Page } from '../../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="bg-maroon-950 text-white pb-9">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-maroon-800 flex items-center justify-center">
                <span className="text-white font-bold text-sm">RR</span>
              </div>
              <div>
                <div className="font-bold text-lg text-white leading-tight">RRDCH</div>
                <div className="text-maroon-300 text-xs">Dental Excellence</div>
              </div>
            </div>
            <p className="text-maroon-300 text-sm leading-relaxed mb-4">
              Premier dental education and patient care institution in Bangalore, Karnataka.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-maroon-800 hover:bg-maroon-700 flex items-center justify-center transition-colors">
                <Facebook size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-maroon-800 hover:bg-maroon-700 flex items-center justify-center transition-colors">
                <Instagram size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-maroon-800 hover:bg-maroon-700 flex items-center justify-center transition-colors">
                <Youtube size={15} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {(['home', 'about', 'students', 'admissions', 'research', 'feedback'] as Page[]).map(page => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-maroon-300 hover:text-white text-sm transition-colors capitalize flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-maroon-500" />
                    {t.nav[page as keyof typeof t.nav]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-maroon-300">
                <MapPin size={15} className="mt-0.5 shrink-0 text-maroon-400" />
                <div>
                  <div>R.R. Nagar, Mysore Road</div>
                  <div>{t.footer.address}</div>
                </div>
              </li>
              <li className="flex items-center gap-2 text-sm text-maroon-300">
                <Phone size={15} className="shrink-0 text-maroon-400" />
                <span>{t.footer.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-maroon-300">
                <Mail size={15} className="shrink-0 text-maroon-400" />
                <span>{t.footer.email}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Clock size={15} className="shrink-0 text-yellow-400" />
                <span className="text-yellow-300 font-medium">{t.footer.emergency}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t.directions.title}</h3>
            <div className="bg-maroon-900 rounded-xl overflow-hidden mb-3">
              <div className="h-32 bg-gradient-to-br from-maroon-800 to-maroon-900 flex flex-col items-center justify-center text-center p-4">
                <MapPin size={24} className="text-maroon-400 mb-2" />
                <p className="text-maroon-200 text-xs">{t.directions.address}</p>
                <p className="text-maroon-400 text-xs mt-1">{t.directions.landmark}</p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-maroon-300">
              <p className="flex items-start gap-1.5"><span className="text-maroon-400 mt-0.5">🚌</span> {t.directions.bus}</p>
              <p className="flex items-start gap-1.5"><span className="text-maroon-400 mt-0.5">🚇</span> {t.directions.metro}</p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-1 text-xs text-maroon-300 hover:text-white transition-colors"
            >
              <ExternalLink size={12} />
              <span>View on Google Maps</span>
            </a>
          </div>
        </div>

        <div className="border-t border-maroon-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-maroon-400 text-xs text-center sm:text-left">{t.footer.copyright}</p>
          <div className="flex items-center gap-4 text-xs text-maroon-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
