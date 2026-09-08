import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Política de Privacidade & Termos LGPD</h3>
              <p className="text-xs text-slate-400">Em conformidade com a Lei Federal nº 13.709/2018 (LGPD) e diretrizes do Google AdSense</p>
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
              <Lock size={16} className="text-cyan-400" /> 1. Introdução e Controlador de Dados
            </h4>
            <p>
              O <strong>CodeCompare</strong> respeita a privacidade de seus visitantes e está comprometido com a segurança e a transparência no tratamento de dados pessoais, de acordo com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-white font-semibold flex items-center gap-2 text-base">
              <FileText size={16} className="text-violet-400" /> 2. Cookies e Google AdSense
            </h4>
            <p>
              Este blog utiliza o serviço de publicidade <strong>Google AdSense</strong>. O Google e seus parceiros usam cookies (como o cookie DoubleClick DART) para veicular anúncios aos usuários com base em visitas anteriores a este ou a outros sites na internet.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Fornecedores terceiros, incluindo o Google, usam cookies para veicular anúncios com base em acessos anteriores do usuário.</li>
              <li>O uso de cookies de publicidade permite ao Google e a seus parceiros veicular anúncios para os usuários com base nas visitas a seus sites e/ou a outros sites na Internet.</li>
              <li>Os usuários podem desativar a publicidade personalizada acessando as <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">Configurações de Anúncios do Google</a> ou através do site <a href="https://aboutads.info" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">aboutads.info</a>.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="text-white font-semibold flex items-center gap-2 text-base">
              <CheckCircle2 size={16} className="text-emerald-400" /> 3. Declaração do Arquivo ads.txt
            </h4>
            <p>
              Em conformidade com a iniciativa do IAB Tech Lab e exigências do Google AdSense, mantemos um arquivo público <code>/ads.txt</code> na raiz do domínio que declara os vendedores e redes autorizados a comercializar o inventário publicitário deste blog, prevenindo fraudes e garantindo autenticidade.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-white font-semibold text-base">4. Direitos do Titular de Dados (Art. 18 da LGPD)</h4>
            <p>
              Você, como titular de dados pessoais, possui os seguintes direitos garantidos por lei:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <strong className="text-cyan-400 block mb-1">Confirmação e Acesso</strong>
                Confirmar a existência de tratamento e acessar os dados fornecidos.
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <strong className="text-cyan-400 block mb-1">Revogação do Consentimento</strong>
                Revogar seu consentimento para cookies a qualquer momento através do banner de preferências.
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <strong className="text-cyan-400 block mb-1">Anonimização ou Eliminação</strong>
                Solicitar o bloqueio ou exclusão de dados desnecessários ou tratados em desconformidade.
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <strong className="text-cyan-400 block mb-1">Informação sobre Compartilhamento</strong>
                Saber com quais entidades públicas ou privadas compartilhamos dados (ex: Google LLC).
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h4 className="text-white font-semibold text-base">5. Contato do Encarregado (DPO)</h4>
            <p className="text-xs text-slate-400">
              Para tirar dúvidas sobre esta política de privacidade ou exercer seus direitos previstos na LGPD, entre em contato através do e-mail oficial do blog: <code>privacidade@codecompare.dev</code>.
            </p>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-slate-800 bg-slate-950/60">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold rounded-xl bg-cyan-500 text-white hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
