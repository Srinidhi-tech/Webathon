import { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Page } from '../../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

type NavKey = 'home' | 'about' | 'students' | 'admissions' | 'research' | 'feedback';
const navItems: { key: Page; labelKey: NavKey }[] = [
  { key: 'home', labelKey: 'home' },
  { key: 'about', labelKey: 'about' },
  { key: 'students', labelKey: 'students' },
  { key: 'admissions', labelKey: 'admissions' },
  { key: 'research', labelKey: 'research' },
  { key: 'feedback', labelKey: 'feedback' },
];

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="bg-maroon-800 text-white text-xs py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Phone size={11} />
            <span>+91 80 2860 1234</span>
          </span>
          <span className="hidden sm:block text-maroon-300">|</span>
          <span className="hidden sm:block text-yellow-300 font-medium">Emergency: +91 80 2860 9999</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block">OPD: Mon–Sat, 9AM–4PM</span>
          <button
            onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
            className="flex items-center gap-1 bg-maroon-700 hover:bg-maroon-600 transition-colors px-2.5 py-1 rounded-full text-xs font-medium"
          >
            <Globe size={11} />
            <span>{language === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
          </button>
        </div>
      </div>

      <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg shadow-maroon-900/10' : 'bg-white/98 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-maroon-700 to-maroon-900 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">RR</span>
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-maroon-800 font-bold text-sm leading-tight group-hover:text-maroon-600 transition-colors">RRDCH</div>
                <div className="text-gray-500 text-xs leading-tight">Rajarajeshwari Dental</div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === item.key
                      ? 'bg-maroon-800 text-white'
                      : 'text-gray-700 hover:bg-maroon-50 hover:text-maroon-800'
                  }`}
                >
                  {t.nav[item.labelKey]}
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setPortalOpen(!portalOpen)}
                  className="flex items-center gap-1.5 bg-maroon-800 hover:bg-maroon-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <span>Portals</span>
                  <ChevronDown size={14} className={`transition-transform ${portalOpen ? 'rotate-180' : ''}`} />
                </button>
                {portalOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    <button
                      onClick={() => { onNavigate('students'); setPortalOpen(false); }}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-maroon-50 hover:text-maroon-800 transition-colors border-b border-gray-50"
                    >
                      <div className="font-medium text-gray-800">{t.nav.studentPortal}</div>
                      <div className="text-xs text-gray-500">Students & Faculty</div>
                    </button>
                    <button
                      className="w-full px-4 py-3 text-left text-sm hover:bg-maroon-50 hover:text-maroon-800 transition-colors"
                      onClick={() => setPortalOpen(false)}
                    >
                      <div className="font-medium text-gray-800">{t.nav.patientPortal}</div>
                      <div className="text-xs text-gray-500">Book & Track</div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="px-4 py-3 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => { onNavigate(item.key); setIsMenuOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.key
                      ? 'bg-maroon-800 text-white'
                      : 'text-gray-700 hover:bg-maroon-50 hover:text-maroon-800'
                  }`}
                >
                  {t.nav[item.labelKey]}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => { onNavigate('students'); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-maroon-800 bg-maroon-50"
                >
                  {t.nav.studentPortal}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
