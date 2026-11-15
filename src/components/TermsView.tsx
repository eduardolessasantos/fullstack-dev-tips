import React from 'react';
import { FileText, Shield, Code, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useLanguage, useTranslationNamespace } from '../i18n/LanguageContext';

const SECTION_ICONS = [
  <Code key="code" size={18} className="text-cyan-400" />,
  <Shield key="shield" size={18} className="text-purple-400" />,
  <AlertTriangle key="alert" size={18} className="text-amber-400" />,
  <CheckCircle2 key="check" size={18} className="text-emerald-400" />,
];

export function TermsView() {
  const { t } = useLanguage();
  const { data: institutional } = useTranslationNamespace('institutional');

  if (!institutional) {
    return (
      <div className="py-20 text-center text-sm text-slate-400 animate-pulse">
        {t.common.loadingTranslation}
      </div>
    );
  }

  const { terms } = institutional;

  return (
    <div className="space-y-10 animate-in fade-in duration-300 max-w-4xl pb-16 no-ads">
      <header className="border-b border-slate-800/80 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-slate-400 bg-slate-800/60 px-3 py-1 rounded-full border border-slate-700">
          <FileText size={14} />
          <span>{terms.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          {terms.title}
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          {terms.subtitle}
        </p>
      </header>

      <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        {terms.sections.map((section, idx) => (
          <section key={section.title} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              {SECTION_ICONS[idx % SECTION_ICONS.length]}
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
