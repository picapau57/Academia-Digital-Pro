import React from 'react';
import { useApp } from '../../context/AppContext';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'compact' | 'full';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'compact' }) => {
  const { language, setLanguage, t } = useApp();

  if (variant === 'full') {
    return (
      <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors">
        <Globe className="w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t.settings.languageLabel}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t.settings.languageDesc}</p>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200/60 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setLanguage('pt')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
              language === 'pt'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🇧🇷 PT-BR
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
              language === 'en'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🇺🇸 EN-US
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md p-0.5 text-xs font-medium shadow-2xs transition-colors">
      <button
        type="button"
        onClick={() => setLanguage('pt')}
        className={`px-2 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
          language === 'pt'
            ? 'bg-slate-900 dark:bg-slate-700 text-white font-semibold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
        title="Português do Brasil"
      >
        PT
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
          language === 'en'
            ? 'bg-slate-900 dark:bg-slate-700 text-white font-semibold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
        title="English"
      >
        EN
      </button>
    </div>
  );
};
