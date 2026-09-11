import React from 'react';
import { FileText, Shield, Code, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { AdUnit } from './AdUnit.tsx';

export function TermsView() {
  return (
    <div className="space-y-10 animate-in fade-in duration-300 max-w-4xl pb-16">
      <header className="border-b border-slate-800/80 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-slate-400 bg-slate-800/60 px-3 py-1 rounded-full border border-slate-700">
          <FileText size={14} />
          <span>Termos de Uso & Condições Legais</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Termos de Uso da Plataforma CodeCompare
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Última atualização: Setembro de 2024. Ao navegar e utilizar os recursos do CodeCompare, você concorda expressamente com os termos descritos abaixo.
        </p>
      </header>

      <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        {/* Seção 1: Licença de Uso dos Códigos */}
        <section className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Code size={18} className="text-cyan-400" />
            1. Licença dos Trechos de Código (Code Snippets)
          </h2>
          <p>
            Todos os exemplos práticos de código-fonte disponibilizados nas páginas comparativas do CodeCompare são fornecidos sob licença aberta permissiva (estilo MIT).
          </p>
          <p>
            Você tem total liberdade para estudar, copiar, adaptar e incorporar esses trechos em seus próprios projetos de software, sejam eles pessoais, educacionais ou comerciais, sem necessidade de pagamento de royalties ou atribuição formal em tempo de execução.
          </p>
        </section>

        {/* Seção 2: Propriedade Intelectual dos Textos */}
        <section className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Shield size={18} className="text-purple-400" />
            2. Propriedade Intelectual dos Artigos e Textos
          </h2>
          <p>
            Diferente dos trechos de código, todos os textos de análise crítica, benchmarks autorais, diagramas comparativos e o design geral do CodeCompare são de propriedade intelectual exclusiva do autor e do blog.
          </p>
          <p>
            É expressamente vedada a cópia integral (scraping automatizado), republicação não autorizada ou comercialização de nossos artigos em outros sites sem consentimento prévio e expresso por escrito.
          </p>
        </section>

        {/* Seção 3: Isenção de Responsabilidade */}
        <section className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-400" />
            3. Limitação de Responsabilidade
          </h2>
          <p>
            Embora todos os códigos e benchmarks sejam testados exaustivamente em ambientes de teste controlados, o CodeCompare não se responsabiliza por eventuais instabilidades, perdas de dados, gargalos de performance ou custos de infraestrutura decorrentes da aplicação direta de tais códigos em ambientes de produção de terceiros.
          </p>
          <p>
            É de inteira responsabilidade do engenheiro de software avaliar, auditar e testar adequadamente as soluções no contexto específico da sua arquitetura corporativa antes de promover alterações em ambientes produtivos.
          </p>
        </section>

        {/* Seção 4: Publicidade e Monetização */}
        <section className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-400" />
            4. Publicidade, Anúncios e Rastreamento
          </h2>
          <p>
            O CodeCompare utiliza serviços de publicidade programática fornecidos pelo Google AdSense para manter a gratuidade de todo o seu conteúdo educacional.
          </p>
          <p>
            O uso de cookies para personalização de anúncios e respeito às diretrizes da Lei Geral de Proteção de Dados (LGPD) e GDPR estão detalhados em nossa Política de Privacidade.
          </p>
        </section>
      </div>

      <AdUnit slot="1122446688" format="auto" label="Espaço Patrocinado • CodeCompare" />
    </div>
  );
}
