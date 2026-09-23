import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CourseCard } from '../components/courses/CourseCard';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  FileText,
  Award,
  ChevronDown,
  CheckCircle2,
  Lock,
  Sparkles,
  Layers,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { courses, settings, navigateTo, t } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const heroImage = '/src/assets/images/hero_education_modern_1790119308658.jpg';
  const bundleImage = '/src/assets/images/course_bundle_showcase_1790119358470.jpg';

  const faqItems = [
    {
      q: 'Como funciona o pagamento via PIX?',
      a: 'O pagamento é feito diretamente no seu aplicativo bancário usando nossa chave PIX oficial ou código Copia e Cola gerado no checkout. Após transferir o valor, você anexa o comprovante (imagem ou PDF) e nossa equipe confirma a transação.',
    },
    {
      q: 'Como recebo acesso ao curso após o pagamento?',
      a: 'Assim que o pagamento for aprovado pelo time financeiro, seu curso é liberado imediatamente na sua Área do Aluno, permitindo assistir às aulas e baixar as apostilas.',
    },
    {
      q: 'Posso baixar o curso em PDF?',
      a: 'Sim! Todos os cursos da Academia Digital Pro possuem uma apostila completa em PDF com sumário, conceitos, exemplos reais, exercícios práticos e o projeto final para download e impressão.',
    },
    {
      q: 'Como funciona o certificado de conclusão?',
      a: 'Ao concluir 100% das aulas práticas do curso, o sistema libera automaticamente o seu Certificado Oficial de Conclusão com carga horária, data, código único de registro e QR Code.',
    },
    {
      q: 'Como verifico a autenticidade do meu certificado?',
      a: 'Qualquer pessoa, instituição ou empregador pode acessar a página pública /verificar-certificado e digitar o código único (ex: ADP-2026-8F72K9) para atestar a autenticidade e validade.',
    },
    {
      q: 'Quanto tempo tenho para concluir os cursos?',
      a: 'Você estuda no seu próprio ritmo! O acesso permanece disponível na sua conta para que você revise as aulas e materiais sempre que desejar.',
    },
    {
      q: 'Posso estudar pelo celular?',
      a: 'Com certeza. Toda a plataforma, os vídeos explicativos, leituras, atividades e downloads foram desenhados para funcionar perfeitamente em smartphones, tablets e computadores.',
    },
    {
      q: 'Posso comprar mais de um curso ou o pacote completo?',
      a: 'Sim! Você pode adquirir cursos individualmente ou aproveitar o Pacote Especial com os 6 cursos completos por um valor único promocional com mais de 60% de desconto.',
    },
    {
      q: 'Como funciona o suporte para tirar dúvidas?',
      a: 'Disponibilizamos suporte direto pelo WhatsApp oficial e por e-mail de segunda a sexta-feira para orientar alunos em qualquer dificuldade técnica ou de acesso.',
    },
    {
      q: 'Como funciona a garantia e reembolso?',
      a: 'Oferecemos garantia incondicional de 7 dias conforme o Código de Defesa do Consumidor brasileiro. Se por qualquer motivo você não ficar satisfeito, basta solicitar o cancelamento e estornamos 100% do valor pago.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden bg-radial from-slate-100/80 via-[#F8FAFC] to-[#F8FAFC] dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/70 dark:bg-slate-800/80 px-3 py-1 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{t.hero.tagline}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.15] text-balance">
                {t.hero.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {t.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('/cursos')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-amber-500 dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-amber-400 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 dark:text-slate-950" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('/como-funciona')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-lg border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
                >
                  <span>{t.hero.ctaSecondary}</span>
                </button>
              </div>

              {/* 4 Feature Bullet Anchors */}
              <div className="pt-6 border-t border-slate-200/90 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>{t.hero.features.immediate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{t.hero.features.pix}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>{t.hero.features.pdf}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>{t.hero.features.cert}</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800 aspect-4/3 bg-slate-900">
                <img
                  src={heroImage}
                  alt="Aluno estudando na plataforma Academia Digital Pro"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white text-xs space-y-1">
                    <p className="font-semibold text-amber-400">Educação Prática e Direta</p>
                    <p className="text-slate-200">Metodologia desenhada para quem tem pouco tempo e busca resultados aplicáveis.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIAL BUNDLE PROMOTIONAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-12 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-md text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                {t.bundle.tag}
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {t.bundle.headline}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {t.bundle.subtitle}
              </p>

              {/* Inclusions Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.bundle.item1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.bundle.item2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.bundle.item3}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.bundle.item4}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.bundle.item5}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.bundle.item6}</span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-6">
                <div>
                  <span className="text-xs text-slate-400 block">De R$ {settings.bundleOriginalPrice.toFixed(2).replace('.', ',')} por apenas</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-amber-400">R$</span>
                    <span className="font-serif text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                      {settings.bundlePrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      {t.bundle.badge}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigateTo('/checkout/bundle')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>{t.bundle.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Bundle Image Preview */}
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-slate-700 aspect-4/3 bg-slate-800 shadow-2xl">
                <img
                  src={bundleImage}
                  alt="Coleção de cursos e certificados Academia Digital Pro"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Featured Courses Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
              Capacitação Digital
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Catálogo de Cursos Práticos
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('/cursos')}
            className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Ver todos os detalhes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* How It Works 4-Step Pipeline */}
      <section className="bg-slate-100/70 dark:bg-slate-900/60 border-y border-slate-200/90 dark:border-slate-800 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
              Jornada do Aluno
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
              Como Funciona a Sua Inscrição
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Processo transparente e rápido: da escolha do curso à emissão do seu certificado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-2xs">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">Etapa 01</span>
              <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">Escolha o Curso</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Navegue pelo catálogo e selecione o curso individual ou o pacote completo que melhor atende suas metas.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-2xs">
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Etapa 02</span>
              <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">Pagamento via PIX</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Pague pelo aplicativo do seu banco com a chave oficial ou Copia e Cola e envie o comprovante no checkout.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-2xs">
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">Etapa 03</span>
              <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">Estudo e Apostila PDF</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Acesse a sala de aula digital imediatamente após a conferência e baixe o material completo em PDF.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-2xs">
              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">Etapa 04</span>
              <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">Certificado Verificado</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Conclua as lições e receba seu Certificado Digital com QR Code e consulta pública de autenticidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
            Tire Suas Dúvidas
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4.5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:text-amber-700 dark:hover:text-amber-400 cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-slate-900 dark:text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4.5 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Guarantee & Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-6 transition-colors shadow-xs">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              Garantia Incondicional de 7 Dias
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Você pode se inscrever com total tranquilidade. Se dentro de 7 dias você avaliar que o material não atendeu suas expectativas, solicite o cancelamento e devolvemos 100% do seu pagamento.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('/cursos')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-semibold text-sm rounded-lg shadow-md cursor-pointer transition-colors"
          >
            <span>Conhecer Cursos e Começar Hoje</span>
            <ArrowRight className="w-4 h-4 text-amber-400 dark:text-slate-950" />
          </button>
        </div>
      </section>
    </div>
  );
};
