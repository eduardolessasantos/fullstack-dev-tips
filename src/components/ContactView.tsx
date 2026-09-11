import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { AdUnit } from './AdUnit.tsx';

export function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('sugestao');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    // Simulação de envio com feedback visual
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 800);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300 max-w-4xl pb-16">
      <header className="border-b border-slate-800/80 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          <MessageSquare size={14} />
          <span>Canal Direto de Comunicação</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Fale Conosco & Envie Sugestões
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Tem uma dúvida técnica, sugestão de comparativo de framework ou proposta de parceria editorial? Entre em contato diretamente com o autor.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Informações de Contato Direto */}
        <div className="space-y-6 md:col-span-1">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <h3 className="font-bold text-white text-base">Contato Direto</h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block font-mono">E-mail Principal:</span>
                <a
                  href="mailto:eduardolessa2011@gmail.com"
                  className="text-cyan-400 font-semibold hover:underline"
                >
                  eduardolessa2011@gmail.com
                </a>
              </div>
              <div>
                <span className="text-slate-500 block font-mono">Localização:</span>
                <span className="text-slate-300">Brasil (Atendimento Remoto Global)</span>
              </div>
              <div>
                <span className="text-slate-500 block font-mono">Tempo Médio de Resposta:</span>
                <span className="text-emerald-400 font-medium">Em até 24 a 48 horas úteis</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-cyan-500/20 bg-cyan-950/10 text-xs text-slate-300 space-y-2">
            <strong className="text-cyan-300 block">Dica para Devs:</strong>
            <p>
              Ao sugerir um novo comparativo, informe qual problema de negócio específico você gostaria de ver implementado lado a lado.
            </p>
          </div>
        </div>

        {/* Formulário de Envio */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-white">Mensagem Enviada com Sucesso!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Obrigado pelo seu contato. Sua mensagem foi recebida e nossa equipe técnica responderá no e-mail informado.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase text-slate-400">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ex: Carlos Silva"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase text-slate-400">
                    Seu E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Ex: carlos@empresa.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase text-slate-400">
                  Assunto Principal
                </label>
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-xs text-white outline-none"
                >
                  <option value="sugestao">Sugestão de Novo Comparativo / Artigo</option>
                  <option value="errata">Reportar Errata ou Bug em Código</option>
                  <option value="duvida">Dúvida sobre Arquitetura</option>
                  <option value="parceria">Parceria Editorial ou Institucional</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase text-slate-400">
                  Sua Mensagem *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Escreva detalhadamente sua dúvida ou sugestão técnica..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-xs text-white outline-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Enviando...</span>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <AdUnit slot="4433221100" format="auto" label="Espaço Patrocinado • CodeCompare" />
    </div>
  );
}
