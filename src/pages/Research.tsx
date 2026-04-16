import { motion } from 'framer-motion';
import { FlaskConical, BookOpen, Globe, TrendingUp, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const publications = [
  { title: 'Efficacy of Platelet-Rich Fibrin in Periodontal Regeneration', journal: 'Journal of Clinical Periodontology', year: 2025, authors: 'Sharma S, Kumar R, et al.', indexed: 'PubMed' },
  { title: 'Digital Workflow in Complete Denture Fabrication: A Comparative Study', journal: 'Journal of Prosthodontic Research', year: 2025, authors: 'Pillai M, Nair S, et al.', indexed: 'Scopus' },
  { title: 'Prevalence of Early Childhood Caries in Urban Karnataka', journal: 'Community Dentistry and Oral Epidemiology', year: 2024, authors: 'Menon R, Devi L, et al.', indexed: 'PubMed' },
  { title: 'CBCT Analysis of Root Canal Morphology in South Indian Population', journal: 'International Endodontic Journal', year: 2024, authors: 'Patel A, Rao K, et al.', indexed: 'Web of Science' },
];

const ongoingResearch = [
  { title: 'AI-based Caries Detection using Intraoral Images', pi: 'Dr. Anita Sharma', dept: 'Oral Medicine', status: 'Active', year: '2024–2026' },
  { title: 'Bone Regeneration with 3D-printed Scaffolds', pi: 'Dr. Ramesh Kumar', dept: 'Periodontics', status: 'Active', year: '2023–2026' },
  { title: 'Genetic Markers in Oral Cancer Susceptibility', pi: 'Dr. Priya Nair', dept: 'Oral Medicine', status: 'Ongoing', year: '2025–2027' },
  { title: 'Teledentistry Efficacy in Rural Karnataka', pi: 'Dr. Lakshmi Devi', dept: 'Public Health', status: 'Active', year: '2024–2026' },
];

const collaborations = [
  { name: 'AIIMS New Delhi', type: 'Research Partnership', country: 'India' },
  { name: 'University of Melbourne', type: 'Faculty Exchange', country: 'Australia' },
  { name: 'Karolinska Institutet', type: 'Research Collaboration', country: 'Sweden' },
  { name: 'Harvard School of Dental Medicine', type: 'Academic Exchange', country: 'USA' },
];

export default function Research() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-maroon-950 to-maroon-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <FlaskConical size={44} className="mx-auto mb-4 text-maroon-300" />
            <h1 className="text-4xl font-bold mb-3">{t.research.title}</h1>
            <p className="text-maroon-200 text-xl">{t.research.subtitle}</p>
          </motion.div>
          <div className="grid grid-cols-3 gap-6 mt-10 max-w-lg mx-auto">
            {[{ n: '200+', l: 'Publications' }, { n: '15+', l: 'Ongoing Projects' }, { n: '4', l: 'International Partners' }].map(item => (
              <div key={item.l} className="text-center">
                <div className="text-3xl font-bold text-white">{item.n}</div>
                <div className="text-maroon-300 text-sm">{item.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-clinical-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
            <BookOpen size={24} className="text-maroon-700" />
            <h2 className="text-2xl font-bold text-gray-900">{t.research.journals}</h2>
          </motion.div>
          <div className="space-y-4">
            {publications.map((pub, idx) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{pub.title}</h3>
                    <div className="text-maroon-600 text-sm font-medium">{pub.journal}</div>
                    <div className="text-gray-400 text-xs mt-1">{pub.authors} — {pub.year}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="bg-green-50 border border-green-200 text-green-700 text-xs font-medium rounded-full px-2.5 py-0.5">{pub.indexed}</span>
                    <button className="flex items-center gap-1 text-xs text-maroon-600 hover:text-maroon-800">
                      <ExternalLink size={12} />View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
            <TrendingUp size={24} className="text-maroon-700" />
            <h2 className="text-2xl font-bold text-gray-900">{t.research.ongoing}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {ongoingResearch.map((r, idx) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-clinical-50 border border-gray-100 rounded-2xl p-5"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug flex-1 mr-2">{r.title}</h3>
                  <span className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium rounded-full px-2.5 py-0.5 shrink-0">{r.status}</span>
                </div>
                <div className="text-gray-500 text-xs">PI: {r.pi} • {r.dept} • {r.year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-clinical-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
            <Globe size={24} className="text-maroon-700" />
            <h2 className="text-2xl font-bold text-gray-900">{t.research.collaborations}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {collaborations.map((c, idx) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:shadow-md transition-all"
              >
                <Globe size={28} className="mx-auto mb-3 text-maroon-600" />
                <div className="font-bold text-gray-900 text-sm">{c.name}</div>
                <div className="text-maroon-600 text-xs mt-1">{c.type}</div>
                <div className="text-gray-400 text-xs mt-0.5">{c.country}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
