import React, { useEffect, useRef, useState } from 'react';
import { Megaphone } from 'lucide-react';

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

// Slots fictícios de desenvolvimento conhecidos que não devem disparar chamadas para o AdSense
const MOCK_SLOTS = new Set([
  '9876543210',
  '1122334455',
  '4455667788',
  '7788990011',
  '1234554321',
  '3344556677',
  '5566778899',
  '9988776655',
  '4433221100',
  '9988771122',
  '7788991122',
  '7890123456',
  '9012345678',
  '1122446688'
]);

export const AdUnit: React.FC<AdUnitProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  label = 'Publicidade',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const [isRejected, setIsRejected] = useState(false);
  const isPushed = useRef(false);

  // Verifica se o slot fornecido é um slot real (não fictício)
  const isRealSlot = Boolean(
    slot &&
    !MOCK_SLOTS.has(slot) &&
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ENABLE_MANUAL_ADS === 'true')
  );

  useEffect(() => {
    // Verificar consentimento da LGPD
    const consent = localStorage.getItem('codecompare_lgpd_consent');
    if (consent === 'rejected') {
      setIsRejected(true);
      return;
    }

    // Apenas tenta registrar a chamada se for um slot real e configurado
    if (isRealAdSenseConfigured && isRealSlot && !isPushed.current) {
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
  }, [isRealSlot]);

  // Se o usuário recusou publicidade ou se ainda estamos na fase de aprovação com slots fictícios,
  // não renderizar blocos vazios ou quebrados para manter o layout 100% limpo para o revisor do AdSense
  // (O AdSense exibirá os anúncios via Anúncios Automáticos / Auto Ads a partir do script no cabeçalho).
  if (isRejected || !isRealSlot) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`my-8 relative rounded-xl border transition-all overflow-hidden bg-slate-900/40 border-slate-800/80 ${className}`}
    >
      {/* Label de Transparência Oficial AdSense (conforme diretrizes do Google: "Publicidade" ou "Anúncios") */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-950/40 border-b border-slate-800/60 text-[11px] font-medium text-slate-400">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
          <Megaphone size={12} className="text-cyan-400" />
          {label}
        </span>
      </div>

      {/* Tag oficial do Google AdSense */}
      <div className="p-4 flex flex-col items-center justify-center min-h-[100px] text-center">
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
      </div>
    </div>
  );
};
