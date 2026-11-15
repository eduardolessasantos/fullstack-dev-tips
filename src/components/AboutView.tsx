import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Award,
  Mail,
} from 'lucide-react';
import { useLanguage, useTranslationNamespace } from '../i18n/LanguageContext';

interface AboutViewProps {
  onNavigateToContact: () => void;
}

const CARD_COLOR_CLASSES = ['text-cyan-400', 'text-purple-400', 'text-emerald-400'] as const;

export function AboutView({ onNavigateToContact }: AboutViewProps) {
  const { t } = useLanguage();
  const { data: institutional } = useTranslationNamespace('institutional');

  if (!institutional) {
    return (
      <div className="py-20 text-center text-sm text-slate-400 animate-pulse">
        {t.common.loadingTranslation}
      </div>
    );
  }

  const { about } = institutional;

  return (
    <div className="space-y-12 animate-in fade-in duration-300 max-w-4xl pb-16 no-ads">
      {/* Header */}
      <header className="border-b border-slate-800/80 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          <ShieldCheck size={14} />
          <span>{about.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          {about.title}
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          {about.subtitle}
        </p>
      </header>

      {/* Perfil do Autor & Credenciais */}
      <section className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-violet-600 flex items-center justify-center font-black text-white text-3xl shadow-xl shadow-cyan-500/20 shrink-0">
            EL
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold text-white">Eduardo Lessa</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {about.founderBadge}
              </span>
            </div>
            <p className="text-sm text-cyan-400 font-medium">
              {about.role}
            </p>
            <p className="text-xs text-slate-400">
              {about.locationLine}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
          {about.paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={onNavigateToContact}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer flex items-center gap-2"
          >
            <Mail size={14} />
            <span>{about.contactBtn}</span>
          </button>
        </div>
      </section>

      {/* Metodologia de Testes e Rigor Técnico */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Cpu size={20} className="text-cyan-400" />
          {about.methodTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {about.methodSubtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {about.cards.map((card, idx) => (
            <div key={card.step} className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <span className={`${CARD_COLOR_CLASSES[idx % CARD_COLOR_CLASSES.length]} font-bold text-xs uppercase font-mono`}>
                {card.step}
              </span>
              <h3 className="text-sm font-bold text-white">{card.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Compromisso de Autoria e Qualidade AdSense */}
      <section className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-3">
        <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2">
          <Award size={18} />
          {about.commitmentTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {about.commitmentBody}
        </p>
      </section>
    </div>
  );
}
