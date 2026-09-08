import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal, FileCode } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  theme?: 'dark' | 'light';
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  filename,
  theme = 'dark',
  showLineNumbers = true
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const getGrammar = (lang: string) => {
    const normalized = lang.toLowerCase();
    if (normalized === 'c#' || normalized === 'csharp' || normalized === 'dotnet') return Prism.languages.csharp;
    if (normalized === 'java') return Prism.languages.java;
    if (normalized === 'python' || normalized === 'py') return Prism.languages.python;
    if (normalized === 'go' || normalized === 'golang') return Prism.languages.go;
    if (normalized === 'sql') return Prism.languages.sql;
    if (normalized === 'html') return Prism.languages.markup || Prism.languages.html;
    if (normalized === 'tsx' || normalized === 'jsx') return Prism.languages.tsx || Prism.languages.jsx || Prism.languages.typescript;
    if (normalized === 'typescript' || normalized === 'ts') return Prism.languages.typescript;
    if (normalized === 'bash' || normalized === 'sh') return Prism.languages.bash;
    if (normalized === 'json') return Prism.languages.json;
    return Prism.languages.javascript || Prism.languages.clike;
  };

  const getHighlightedHtml = () => {
    try {
      const grammar = getGrammar(language);
      if (grammar) {
        return Prism.highlight(code, grammar, language);
      }
    } catch (e) {
      // Fallback
    }
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  const lineCount = code.trim().split('\n').length;

  return (
    <div
      className={`relative rounded-xl border transition-all overflow-hidden ${
        theme === 'dark'
          ? 'bg-slate-950/90 border-slate-800/80 shadow-lg shadow-black/40'
          : 'bg-slate-900 border-slate-700/80 shadow-md'
      }`}
    >
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-mono">
          {filename ? (
            <>
              <FileCode size={14} className="text-cyan-400" />
              <span className="text-slate-200 font-medium">{filename}</span>
            </>
          ) : (
            <>
              <Terminal size={14} className="text-violet-400" />
              <span className="uppercase tracking-wider font-semibold text-slate-300">{language}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            {lineCount} {lineCount === 1 ? 'linha' : 'linhas'}
          </span>
          <button
            id={`copy-btn-${Math.random().toString(36).substring(2, 7)}`}
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 transition-all cursor-pointer"
            title="Copiar código para a área de transferência"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400 animate-in zoom-in-50 duration-200" />
                <span className="text-emerald-400 font-semibold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="flex overflow-x-auto p-4 text-xs sm:text-sm font-mono leading-relaxed selection:bg-cyan-500/30">
        {showLineNumbers && (
          <div
            className="select-none pr-4 text-right text-slate-600 font-mono text-xs leading-relaxed border-r border-slate-800/80 mr-4"
            aria-hidden="true"
          >
            {Array.from({ length: lineCount }).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        )}
        <pre className="flex-1 overflow-x-auto text-slate-200">
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: getHighlightedHtml() }}
          />
        </pre>
      </div>
    </div>
  );
};
