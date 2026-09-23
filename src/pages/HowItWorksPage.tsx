import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, BookOpen, Clock, FileCheck, Layers, Lock, ShieldCheck, Zap } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
          Transparência Total
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-950">
          Como Funciona a Academia Digital Pro
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Entenda todas as etapas de matrícula, pagamento protegido por PIX, acesso imediato às apostilas e emissão de certificados.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-serif text-xl font-bold shrink-0">
            01
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Escolha seu Curso ou o Pacote Completo
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore o catálogo temático focado em habilidades digitais demandadas pelo mercado atual: Marketing Digital, Inteligência Artificial, Finanças Pessoais, Canva para Criação, Vendas Online e Produtividade. Você pode adquirir qualquer curso avulso ou o pacote promocional com 6 cursos.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-serif text-xl font-bold shrink-0">
            02
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Pagamento Seguro via PIX com Chave Oficial
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No checkout, você recebe a chave PIX administrativa oficial e o código Copia e Cola. Você transfere pelo app de qualquer banco e anexa o comprovante (imagem ou PDF). Nosso time confere a operação e aprova seu pedido.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-serif text-xl font-bold shrink-0">
            03
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Acesso à Sala de Aula e Download das Apostilas PDF
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Após a liberação, você tem acesso contínuo às aulas teóricas e práticas, passo a passos executáveis e à apostila oficial completa em PDF para baixar, salvar no computador ou imprimir.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-serif text-xl font-bold shrink-0">
            04
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Conclusão e Emissão do Certificado Oficial
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Ao concluir todas as lições do curso, o sistema libera automaticamente seu Certificado Oficial de Conclusão com registro único, assinatura da diretoria e QR code de verificação pública em nossa plataforma.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => navigateTo('/cursos')}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-lg shadow-sm cursor-pointer transition-colors"
        >
          <span>Explorar Catálogo de Cursos</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>
    </div>
  );
};
