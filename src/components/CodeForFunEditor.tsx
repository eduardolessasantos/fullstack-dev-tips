import React, { useRef, useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import { CodeForFunLanguage } from '../types.ts';

interface CodeForFunEditorProps {
  value: string;
  onChange: (next: string) => void;
  language: CodeForFunLanguage;
  activeLine?: number | null;
  onRunShortcut?: () => void;
  ariaLabel?: string;
}

export const CodeForFunEditor: React.FC<CodeForFunEditorProps> = ({
  value,
  onChange,
  language,
  activeLine = null,
  onRunShortcut,
  ariaLabel = 'Editor de código interativo'
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const lines = useMemo(() => value.split('\n'), [value]);

  const highlightedHtml = useMemo(() => {
    const grammar =
      language === 'typescript'
        ? Prism.languages.typescript
        : language === 'python'
        ? Prism.languages.python
        : language === 'sql'
        ? Prism.languages.sql
        : Prism.languages.javascript;

    try {
      const safeInput = value.endsWith('\n') ? value + ' ' : value;
      if (grammar) {
        return Prism.highlight(safeInput, grammar, language);
      }
    } catch {
      // Fallback to escaped text
    }
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }, [value, language]);

  const handleScroll = () => {
    if (!textareaRef.current) return;
    const { scrollTop, scrollLeft } = textareaRef.current;
    if (preRef.current) {
      preRef.current.scrollTop = scrollTop;
      preRef.current.scrollLeft = scrollLeft;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRunShortcut?.();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const indent = language === 'python' ? '    ' : '  ';
      const next = value.substring(0, start) + indent + value.substring(end);
      onChange(next);
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + indent.length;
          textareaRef.current.selectionEnd = start + indent.length;
        }
      });
    }
  };

  return (
    <div className="relative flex w-full h-[340px] sm:h-[380px] rounded-xl border border-slate-800 bg-[#080d1a] overflow-hidden font-mono text-[13px] leading-[1.6]">
      {/* Line numbers & active trace marker */}
      <div
        ref={gutterRef}
        aria-hidden="true"
        className="w-11 shrink-0 py-4 bg-slate-950/90 border-r border-slate-800/80 text-right select-none overflow-hidden tabular-nums"
      >
        {lines.map((_, idx) => {
          const lineNum = idx + 1;
          const isCurrent = activeLine === lineNum;
          return (
            <div
              key={lineNum}
              className={`px-2.5 h-[20.8px] flex items-center justify-end text-xs transition-colors ${
                isCurrent
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                  : 'text-slate-600'
              }`}
            >
              {lineNum}
            </div>
          );
        })}
      </div>

      {/* Layered Highlight + Editable Textarea */}
      <div className="relative flex-1 h-full overflow-hidden">
        {/* Highlighted code backdrop */}
        <pre
          ref={preRef}
          aria-hidden="true"
          className="absolute inset-0 m-0 p-4 overflow-hidden pointer-events-none whitespace-pre font-mono text-[13px] leading-[1.6] text-slate-100"
        >
          {activeLine && (
            <span
              className="block absolute left-0 right-0 bg-cyan-500/10 border-y border-cyan-500/30 pointer-events-none"
              style={{
                top: `${16 + (activeLine - 1) * 20.8}px`,
                height: '20.8px'
              }}
            />
          )}
          <code
            className={`language-${language} block`}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </pre>

        {/* Transparent interactive textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          aria-label={ariaLabel}
          className="relative z-10 w-full h-full p-4 bg-transparent text-transparent caret-cyan-400 resize-none outline-none whitespace-pre overflow-auto font-mono text-[13px] leading-[1.6] selection:bg-cyan-500/30 focus-visible:ring-2 focus-visible:ring-cyan-500/60"
        />
      </div>
    </div>
  );
};
