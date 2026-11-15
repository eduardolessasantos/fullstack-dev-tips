import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.tsx';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  const p = t.privacy;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 no-ads">
      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">{p.title}</h3>
              <p className="text-xs text-slate-400">{p.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm leading-relaxed text-slate-300">
          <section className="space-y-2">
            <h4 className="text-white font-semibold flex items-center gap-2 text-base">
              <Lock size={16} className="text-cyan-400" /> {p.s1Title}
            </h4>
            <p>{p.s1Body}</p>
          </section>

          <section className="space-y-2">
            <h4 className="text-white font-semibold flex items-center gap-2 text-base">
              <FileText size={16} className="text-violet-400" /> {p.s2Title}
            </h4>
            <p>{p.s2Body}</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              {p.s2Bullets[0] && <li>{p.s2Bullets[0]}</li>}
              {p.s2Bullets[1] && <li>{p.s2Bullets[1]}</li>}
              {p.s2Bullets[2] && (
                <li>
                  {p.s2Bullets[2]}{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 underline"
                  >
                    {p.s2LinkText1}
                  </a>{' '}
                  {p.s2Between}{' '}
                  <a
                    href="https://aboutads.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 underline"
                  >
                    {p.s2LinkText2}
                  </a>
                  .
                </li>
              )}
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="text-white font-semibold flex items-center gap-2 text-base">
              <CheckCircle2 size={16} className="text-emerald-400" /> {p.s3Title}
            </h4>
            <p>{p.s3Body}</p>
          </section>

          <section className="space-y-2">
            <h4 className="text-white font-semibold text-base">{p.s4Title}</h4>
            <p>{p.s4Intro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {p.s4Cards.map((card, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                  <strong className="text-cyan-400 block mb-1">{card.title}</strong>
                  {card.desc}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <h4 className="text-white font-semibold text-base">{p.s5Title}</h4>
            <p className="text-xs text-slate-400">
              {p.s5Body} <code>eduardolessa2011@gmail.com</code>.
            </p>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-slate-800 bg-slate-950/60">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold rounded-xl bg-cyan-500 text-white hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
          >
            {p.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
