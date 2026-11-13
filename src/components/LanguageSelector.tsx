import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage, LANGUAGE_OPTIONS } from '../i18n/LanguageContext.tsx';
import { SupportedLanguage } from '../i18n/types.ts';

interface LanguageSelectorProps {
  theme: 'dark' | 'light';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ theme, className = '' }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGE_OPTIONS.find(opt => opt.code === language) || LANGUAGE_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
          theme === 'dark'
            ? 'bg-slate-900/90 border-slate-800 hover:bg-slate-800 text-slate-200 hover:text-white focus:ring-2 focus:ring-cyan-500/30'
            : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-700 shadow-sm focus:ring-2 focus:ring-cyan-500/30'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title="Alterar idioma / Switch language / Cambiar idioma"
      >
        <span className="text-sm leading-none">{currentOption.flag}</span>
        <span className="font-mono text-[11px] font-bold uppercase">{currentOption.code}</span>
        <ChevronDown
          size={12}
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={`absolute right-0 mt-2 w-44 rounded-2xl border shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
            theme === 'dark'
              ? 'bg-slate-900 border-slate-800 text-slate-200 shadow-cyan-950/20'
              : 'bg-white border-slate-200 text-slate-800 shadow-slate-300/40'
          }`}
        >
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/40 flex items-center gap-1.5">
            <Globe size={11} className="text-cyan-400" />
            <span>Idioma / Language</span>
          </div>

          <div className="pt-1">
            {LANGUAGE_OPTIONS.map(opt => {
              const isSelected = opt.code === language;
              return (
                <button
                  key={opt.code}
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelect(opt.code)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? theme === 'dark'
                        ? 'bg-cyan-500/15 text-cyan-300 font-bold'
                        : 'bg-cyan-50 text-cyan-700 font-bold'
                      : theme === 'dark'
                      ? 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{opt.flag}</span>
                    <span>{opt.label}</span>
                  </span>
                  {isSelected && <Check size={14} className="text-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
