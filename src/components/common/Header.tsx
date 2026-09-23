import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, User as UserIcon, Shield, GraduationCap } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRoute, navigateTo, currentUser, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (path: string) => {
    navigateTo(path);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.courses, path: '/cursos' },
    { label: t.nav.howItWorks, path: '/como-funciona' },
    { label: t.nav.certificates, path: '/certificados' },
    { label: t.nav.about, path: '/sobre' },
    { label: t.nav.contact, path: '/contato' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single Wordmark Brand Element */}
        <button
          type="button"
          onClick={() => handleNav('/')}
          className="text-left flex items-center gap-2.5 group cursor-pointer focus-visible:outline-hidden"
        >
          <div className="w-8 h-8 rounded-md bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-white shadow-xs border border-transparent dark:border-slate-700">
            <GraduationCap className="w-5 h-5 text-amber-400" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
            Academia Digital Pro
          </span>
        </button>

        {/* Zone 2: 4-6 Clean Text Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.path;
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => handleNav(link.path)}
                className={`transition-colors whitespace-nowrap cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-slate-950 dark:text-white font-semibold'
                    : 'hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-950 dark:bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions + Language + Dark Mode Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          <LanguageSelector />
          <ThemeToggle />

          {currentUser ? (
            <div className="flex items-center gap-2">
              {currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN' ? (
                <button
                  type="button"
                  onClick={() => handleNav('/admin')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-amber-500 dark:text-slate-950 rounded-md hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400 dark:text-slate-950" />
                  {t.nav.adminArea}
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => handleNav('/aluno')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                <UserIcon className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span className="max-w-[120px] truncate">{currentUser.name.split(' ')[0]}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleNav('/login')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap"
              >
                {t.nav.login}
              </button>
              <button
                type="button"
                onClick={() => handleNav('/cursos')}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-amber-500 dark:text-slate-950 rounded-md hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
              >
                {t.hero.ctaPrimary}
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <LanguageSelector />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus-visible:outline-hidden"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 transition-colors">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                type="button"
                onClick={() => handleNav(link.path)}
                className={`text-left px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${
                  currentRoute === link.path
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  type="button"
                  onClick={() => handleNav('/aluno')}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-md cursor-pointer"
                >
                  {t.nav.studentArea} ({currentUser.name.split(' ')[0]})
                </button>
                {currentUser.role !== 'STUDENT' && (
                  <button
                    type="button"
                    onClick={() => handleNav('/admin')}
                    className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 dark:bg-amber-500 dark:text-slate-950 rounded-md cursor-pointer"
                  >
                    {t.nav.adminArea}
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleNav('/login')}
                  className="w-full text-center px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 rounded-md cursor-pointer"
                >
                  {t.nav.login}
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/cursos')}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 dark:bg-amber-500 dark:text-slate-950 rounded-md cursor-pointer"
                >
                  {t.hero.ctaPrimary}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

