import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, CheckCircle, ShieldCheck, QrCode, FileText, ArrowRight } from 'lucide-react';

export const CertificatesInfoPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2">
          <Award className="w-6 h-6" />
        </div>
        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
          Validade e Registro
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-950">
          Sobre os Certificados Oficiais
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Nossos certificados comprovam sua dedicação e conclusão de capacitação em conformidade com as diretrizes educacionais brasileiras.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Cursos Livres Conforme Lei Federal
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Emitidos com amparo na Lei nº 9.394/1996 (Diretrizes e Bases da Educação Nacional) e no Decreto Presidencial nº 5.154/2004, válidos em todo o território nacional como prova de capacitação profissional e atualização.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <QrCode className="w-6 h-6 text-amber-600" />
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Código Único e Consulta Online
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cada certificado possui um identificador alfanumérico exclusivo (ex: ADP-2026-8F72K9) e QR Code. Qualquer empresa ou recrutador pode validar a autenticidade diretamente na nossa plataforma pública.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <FileText className="w-6 h-6 text-sky-600" />
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Carga Horária e Conteúdo Programático
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            O documento especifica a carga horária em horas de estudo, o nome do curso, o período de conclusão e a assinatura da diretoria acadêmica responsável.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <ShieldCheck className="w-6 h-6 text-purple-600" />
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Anti-Fraude e Verificação Criptográfica
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            A plataforma conta com hash de segurança que impede adulterações em nomes de alunos, datas de conclusão ou títulos de certificados emitidos.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-xl p-8 text-center space-y-4">
        <h3 className="font-serif text-xl font-bold">Deseja conferir a autenticidade de um certificado?</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Utilize nossa ferramenta pública para validar o código de qualquer documento expedido pela Academia Digital Pro.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('/verificar-certificado')}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-md shadow-xs transition-colors cursor-pointer"
        >
          <span>Ir para a Verificação Pública</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
