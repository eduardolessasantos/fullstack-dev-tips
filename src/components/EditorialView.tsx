import React from 'react';
import { Scale, AlertCircle } from 'lucide-react';
import { useLanguage, useTranslationNamespace } from '../i18n/LanguageContext';

const PRINCIPLE_BADGE_CLASSES = [
  'bg-cyan-500/10 text-cyan-400',
  'bg-purple-500/10 text-purple-400',
  'bg-emerald-500/10 text-emerald-400',
  'bg-amber-500/10 text-amber-400',
] as const;

export function EditorialView() {
  const { t } = useLanguage();
  const { data: institutional } = useTranslationNamespace('institutional');

  if (!institutional) {
    return (
      <div className="py-20 text-center text-sm text-slate-400 animate-pulse">
        {t.common.loadingTranslation}
      </div>
    );
  }

  const { editorial } = institutional;

  return (
    <div className="space-y-10 animate-in fade-in duration-300 max-w-4xl pb-16 no-ads">
      <header className="border-b border-slate-800/80 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
          <Scale size={14} />
          <span>{editorial.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          {editorial.title}
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          {editorial.subtitle}
        </p>
      </header>

      {/* Princípios Fundamentais */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {editorial.principles.map((principle, idx) => (
            <div key={principle.num} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
              <div
                className={`w-10 h-10 rounded-xl ${PRINCIPLE_BADGE_CLASSES[idx % PRINCIPLE_BADGE_CLASSES.length]} flex items-center justify-center font-bold`}
              >
                {principle.num}
              </div>
              <h3 className="text-lg font-bold text-white">{principle.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Como reportar uma errata */}
      <section className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <AlertCircle size={18} className="text-cyan-400" />
          {editorial.errataTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {editorial.errataBodyBefore} <strong>eduardolessa2011@gmail.com</strong>
        </p>
      </section>
    </div>
  );
}
