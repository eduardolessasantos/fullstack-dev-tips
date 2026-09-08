import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings2, Check, X, ShieldAlert } from 'lucide-react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal.tsx';
import { isRealAdSenseConfigured, ADSENSE_CLIENT_ID } from './AdUnit.tsx';

export const LGPDBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  // Estados de preferências granulares
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [adsCookies, setAdsCookies] = useState(true);

  useEffect(() => {
    try {
      // Limpeza preventiva de scripts caso não haja ID real configurado
      if (typeof document !== 'undefined' && !isRealAdSenseConfigured) {
        const oldScript = document.getElementById('google-adsense-script');
        if (oldScript) oldScript.remove();
      }

      const consent = localStorage.getItem('codecompare_lgpd_consent');
      if (!consent) {
        setShowBanner(true);
      } else if (consent === 'accepted') {
        loadAdSenseScript();
      }
    } catch (e) {
      // Ignora erro de localStorage caso bloqueado
    }
  }, []);

  const loadAdSenseScript = () => {
    if (typeof document !== 'undefined') {
      // Somente carrega o script externo do Google AdSense se um ID real (ca-pub-...) estiver configurado
      if (!isRealAdSenseConfigured) {
        const existing = document.getElementById('google-adsense-script');
        if (existing) existing.remove();
        return;
      }

      const existingScript =
        document.getElementById('google-adsense-script') ||
        document.querySelector('script[src*="adsbygoogle.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'google-adsense-script';
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
    }
  };

  const handleConsent = (status: 'accepted' | 'declined' | 'custom') => {
    try {
      localStorage.setItem('codecompare_lgpd_consent', status);
      localStorage.setItem(
        'codecompare_lgpd_preferences',
        JSON.stringify({
          necessary: true,
          analytics: status === 'accepted' ? true : status === 'declined' ? false : analyticsCookies,
          advertising: status === 'accepted' ? true : status === 'declined' ? false : adsCookies,
          timestamp: new Date().toISOString()
        })
      );
    } catch (e) {
      // Falha silenciosa
    }

    setShowBanner(false);
    setShowPreferences(false);

    if (status === 'accepted' || (status === 'custom' && adsCookies)) {
      loadAdSenseScript();
    }
  };

  return (
    <>
      {/* Banner Principal Fixo */}
      {showBanner && (
        <div
          id="lgpd-consent-banner"
          className="fixed bottom-0 inset-x-0 z-[120] p-3 sm:p-5 animate-in slide-in-from-bottom duration-300 pointer-events-none"
        >
          <div className="max-w-5xl mx-auto bg-slate-900/95 backdrop-blur-md border border-slate-700/80 shadow-2xl rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center gap-5 pointer-events-auto text-slate-200">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0 hidden sm:flex">
              <ShieldCheck size={28} />
            </div>

            <div className="flex-1 space-y-1 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-semibold text-white text-sm sm:text-base">
                <Cookie size={16} className="text-cyan-400" />
                <span>Privacidade e Uso de Cookies (LGPD)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Utilizamos cookies e tecnologias semelhantes para aprimorar sua experiência de navegação, analisar tráfego e exibir anúncios personalizados via <strong>Google AdSense</strong>. Você pode personalizar suas preferências ou aceitar todos os cookies para apoiar o conteúdo gratuito do blog.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => setShowPolicyModal(true)}
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
                >
                  Ler Política de Privacidade completa (Art. 18 LGPD)
                </button>
              </div>
            </div>

            {/* Ações de Consentimento */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto shrink-0">
              <button
                id="lgpd-btn-preferences"
                onClick={() => setShowPreferences(true)}
                className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Settings2 size={14} />
                <span>Preferências</span>
              </button>
              <button
                id="lgpd-btn-decline"
                onClick={() => handleConsent('declined')}
                className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 border border-slate-700/50 hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer"
              >
                Recusar
              </button>
              <button
                id="lgpd-btn-accept"
                onClick={() => handleConsent('accepted')}
                className="w-full sm:w-auto px-5 py-2 text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check size={14} />
                <span>Aceitar Tudo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Preferências Granulares */}
      {showPreferences && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Settings2 size={18} className="text-cyan-400" />
                Configurar Preferências de Cookies
              </h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Necessários */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-white">Cookies Estritamente Necessários</h4>
                  <p className="text-slate-400 text-xs">
                    Essenciais para a navegação, memorização do tema (claro/escuro) e segurança básica.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-1 rounded">
                  Obrigatório
                </span>
              </div>

              {/* Analíticos */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Cookies Analíticos & Desempenho</h4>
                  <p className="text-slate-400 text-xs">
                    Nos ajudam a entender quais comparações de código são mais acessadas para produzir novos tutoriais.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsCookies}
                  onChange={(e) => setAnalyticsCookies(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer mt-1"
                />
              </div>

              {/* AdSense */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Publicidade Personalizada (Google AdSense)</h4>
                  <p className="text-slate-400 text-xs">
                    Permite a veiculação de anúncios relevantes aos seus interesses, financiando a manutenção do blog gratuito.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={adsCookies}
                  onChange={(e) => setAdsCookies(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleConsent('custom')}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-cyan-500 text-white hover:bg-cyan-400 transition-all shadow-md"
              >
                Salvar Preferências
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal da Política de Privacidade */}
      <PrivacyPolicyModal
        isOpen={showPolicyModal}
        onClose={() => setShowPolicyModal(false)}
      />
    </>
  );
};
