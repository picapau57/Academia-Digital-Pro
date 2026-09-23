import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'button' | 'switch' | 'full';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  className = '',
}) => {
  const { theme, toggleTheme, setTheme, t } = useApp();
  const isDark = theme === 'dark';

  if (variant === 'full') {
    return (
      <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors">
        <div className="w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-amber-400 shrink-0">
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t.settings.themeLabel}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t.settings.themeDesc}</p>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200/60 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              !isDark
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.theme.light}</span>
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              isDark
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t.theme.dark}</span>
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'switch') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? t.theme.light : t.theme.dark}
        title={isDark ? t.theme.light : t.theme.dark}
        className={`relative inline-flex h-7 w-13 items-center rounded-full transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 ${
          isDark ? 'bg-slate-700' : 'bg-slate-200'
        } ${className}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform flex items-center justify-center ${
            isDark ? 'translate-x-7 bg-slate-900 text-amber-400' : 'translate-x-1 text-slate-700'
          }`}
        >
          {isDark ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3 text-amber-500" />}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t.theme.light : t.theme.dark}
      title={isDark ? t.theme.light : t.theme.dark}
      className={`relative p-2 rounded-lg border transition-all duration-200 cursor-pointer flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 ${
        isDark
          ? 'border-slate-700 bg-slate-800 text-amber-400 hover:bg-slate-700 hover:text-amber-300 shadow-2xs'
          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 shadow-2xs'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
};
