import React, { useEffect, useState } from 'react';
import { Megaphone, ShieldAlert, Sparkles } from 'lucide-react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'fluid';
  responsive?: boolean;
  label?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdUnit: React.FC<AdUnitProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  label = 'Publicidade & Apoio ao Blog',
  className = ''
}) => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificar consentimento da LGPD
    const consent = localStorage.getItem('codecompare_lgpd_consent');
    const isAccepted = consent === 'accepted';
    setHasConsent(isAccepted);

    if (isAccepted) {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdLoaded(true);
        }
      } catch (err) {
        // Modo silencioso em ambientes sem AdSense ativo
      }
    }
  }, []);

  return (
    <div
      className={`my-8 relative rounded-xl border border-dashed transition-all overflow-hidden ${
        hasConsent === false
          ? 'bg-slate-900/40 border-slate-800 text-slate-500 py-6'
          : 'bg-slate-900/50 border-slate-800/80 hover:border-cyan-500/30'
      } ${className}`}
    >
      {/* Label de Transparência AdSense / Conar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-950/40 border-b border-slate-800/60 text-[11px] font-medium text-slate-400">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
          <Megaphone size={12} className="text-cyan-400" />
          {label}
        </span>
        <span className="text-[10px] text-slate-400">
          Slot: {slot} • ads.txt validado
        </span>
      </div>

      {/* Bloco AdSense Real */}
      <div className="p-4 flex flex-col items-center justify-center min-h-[100px] text-center">
        {hasConsent === false ? (
          <div className="flex flex-col items-center gap-2 max-w-sm text-xs text-slate-400">
            <ShieldAlert size={20} className="text-amber-400" />
            <p>
              Anúncios desativados com base nas suas preferências de privacidade da LGPD.
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            {/* Tag oficial do Google AdSense */}
            <ins
              className="adsbygoogle"
              style={{ display: 'block', minHeight: format === 'rectangle' ? '250px' : '90px' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot={slot}
              data-ad-format={format}
              data-full-width-responsive={responsive ? 'true' : 'false'}
            />

            {/* Visual Informativo para ambiente de desenvolvimento/preview */}
            <div className="py-4 px-6 rounded-lg bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center gap-3 text-xs text-slate-400 w-full justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-slate-300">Google AdSense Unit</span>
                <span className="text-slate-400">• Formato {format}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Identificador: ca-pub-XXXXXXXXXXXXXXXX (configurável)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
