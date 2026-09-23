import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, ShieldCheck, Mail, Phone, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, navigateTo, language } = useApp();

  const handleNav = (path: string) => {
    navigateTo(path);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      {/* Top Value Assurance Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Garantia Incondicional de 7 Dias</p>
              <p className="text-slate-400">Satisfação garantida ou estorno integral conforme o Código de Defesa do Consumidor.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Pagamento Seguro via PIX</p>
              <p className="text-slate-400">Processamento com liberação ágil e chave administrativa oficial protegida.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Certificados Verificáveis Online</p>
              <p className="text-slate-400">Código de registro único e consulta pública de autenticidade instantânea.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center text-slate-950">
                <GraduationCap className="w-5 h-5 text-amber-600" />
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                {settings.platformName}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {settings.slogan}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'pt'
                ? 'Conhecimento prático para transformar suas habilidades em novas oportunidades reais no mercado digital.'
                : 'Practical digital knowledge to transform your skills into real opportunities in the modern economy.'}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">Plataforma</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => handleNav('/')} className="hover:text-white transition-colors cursor-pointer">
                  Início
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('/cursos')} className="hover:text-white transition-colors cursor-pointer">
                  Catálogo de Cursos
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('/como-funciona')} className="hover:text-white transition-colors cursor-pointer">
                  Como Funciona o Acesso
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('/certificados')} className="hover:text-white transition-colors cursor-pointer">
                  Sobre os Certificados
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('/verificar-certificado')} className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Verificar Certificado
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Consumer Rights */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">Legal & Políticas</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => handleNav('/termos-de-uso')} className="hover:text-white transition-colors cursor-pointer">
                  Termos de Uso
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('/politica-de-privacidade')} className="hover:text-white transition-colors cursor-pointer">
                  Política de Privacidade (LGPD)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('/politica-de-reembolso')} className="hover:text-white transition-colors cursor-pointer">
                  Política de Reembolso & Garantia
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('/sobre')} className="hover:text-white transition-colors cursor-pointer">
                  Sobre a Academia Digital Pro
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Contact */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">Atendimento & Suporte</p>
            <div className="space-y-2 text-xs">
              <a
                href={`mailto:${settings.supportEmail}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{settings.supportEmail}</span>
              </a>
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {settings.pixKey}</span>
              </a>
              <p className="text-[11px] text-slate-400 pt-2">
                Atendimento de Segunda a Sexta, das 09h às 18h (Horário de Brasília).
              </p>
            </div>
          </div>
        </div>

        {/* Ethical Education Disclaimer */}
        <div className="mt-10 pt-8 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed space-y-2">
          <p>
            <strong className="text-slate-300">Aviso Legal e Educacional Importante:</strong> A Academia Digital Pro é uma plataforma dedicada exclusivamente ao ensino de habilidades digitais e cursos livres de capacitação profissional continuada (Lei nº 9.394/1996 — Diretrizes e Bases da Educação Nacional). Não garantimos ganhos financeiros, obtenção automática de emprego, renda fixa ou lucros imediatos. Os resultados individuais dependem estritamente do estudo, dedicação, prática pessoal, experiência prévia e fatores de mercado alheios à plataforma.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 text-slate-400">
            <p>© {new Date().getFullYear()} {settings.platformName}. CNPJ e operações registradas em território brasileiro.</p>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => handleNav('/login')} className="hover:text-slate-300 transition-colors">
                Acesso do Aluno
              </button>
              <span>·</span>
              <button type="button" onClick={() => handleNav('/admin')} className="hover:text-slate-300 transition-colors">
                Gestão Administrativa
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
