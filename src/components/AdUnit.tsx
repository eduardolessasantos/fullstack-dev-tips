import React, { useEffect, useRef, useState } from 'react';
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

// Identificador oficial do Google AdSense
export const ADSENSE_CLIENT_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADSENSE_CLIENT_ID) ||
  'ca-pub-1242153191500402';

export const isRealAdSenseConfigured = Boolean(
  ADSENSE_CLIENT_ID &&
  ADSENSE_CLIENT_ID.startsWith('ca-pub-') &&
  !ADSENSE_CLIENT_ID.includes('XXXX')
);

export const AdUnit: React.FC<AdUnitProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  label = 'Publicidade & Apoio ao Blog',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const isPushed = useRef(false);

  useEffect(() => {
    // Verificar consentimento da LGPD
    const consent = localStorage.getItem('codecompare_lgpd_consent');
    const isAccepted = consent === 'accepted';
    setHasConsent(isAccepted);

    // Se o consentimento foi aceito e um Client ID real do AdSense está configurado:
    if (isAccepted && isRealAdSenseConfigured && !isPushed.current) {
      const timer = setTimeout(() => {
        try {
          if (
            containerRef.current &&
            containerRef.current.offsetWidth > 0 &&
            insRef.current &&
            !insRef.current.getAttribute('data-adsbygoogle-status')
          ) {
            isPushed.current = true;
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (err) {
          // Captura silenciosa de eventuais erros de script de terceiros
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [hasConsent]);

  return (
    <div
      ref={containerRef}
      className={`my-8 relative rounded-xl border border-dashed transition-all overflow-hidden ${
        hasConsent === false
          ? 'bg-slate-900/40 border-slate-800 text-slate-500 py-6'
          : 'bg-slate-900/50 border-slate-800/80 hover:border-cyan-500/30'
      } ${className}`}
    >
      {/* Label de Transparência AdSense */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-950/40 border-b border-slate-800/60 text-[11px] font-medium text-slate-400">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
          <Megaphone size={12} className="text-cyan-400" />
          {label}
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          Slot: {slot}
        </span>
      </div>

      {/* Bloco AdSense Real ou Mock Informativo */}
      <div className="p-4 flex flex-col items-center justify-center min-h-[100px] text-center">
        {hasConsent === false ? (
          <div className="flex flex-col items-center gap-2 max-w-sm text-xs text-slate-400">
            <ShieldAlert size={20} className="text-amber-400" />
            <p>
              Anúncios desativados com base nas suas preferências de privacidade da LGPD.
            </p>
          </div>
        ) : isRealAdSenseConfigured ? (
          /* Tag oficial do Google AdSense somente ativada com ID real configurado */
          <div className="w-full flex flex-col items-center justify-center min-w-[250px]">
            <ins
              ref={insRef}
              className="adsbygoogle"
              style={{
                display: 'block',
                width: '100%',
                minWidth: '250px',
                minHeight: format === 'rectangle' ? '250px' : '90px'
              }}
              data-ad-client={ADSENSE_CLIENT_ID}
              data-ad-slot={slot}
              data-ad-format={format}
              data-full-width-responsive={responsive ? 'true' : 'false'}
            />
          </div>
        ) : (
          /* Visual Informativo limpo para ambiente de desenvolvimento/preview */
          <div className="py-4 px-6 rounded-lg bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center gap-3 text-xs text-slate-400 w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-slate-300">Google AdSense Unit</span>
              <span className="text-slate-400">• Formato {format}</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Pronto para produção • Slot {slot}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
