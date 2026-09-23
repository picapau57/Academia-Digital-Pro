import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CoursePDFModal } from '../components/courses/CoursePDFModal';
import {
  Clock,
  BookOpen,
  Layers,
  CheckCircle,
  FileText,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  ShoppingCart,
  GraduationCap,
  Award,
} from 'lucide-react';

interface CourseDetailPageProps {
  slug: string;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ slug }) => {
  const { courses, getEnrollmentForCourse, navigateTo, t } = useApp();
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-slate-900">Curso não encontrado</h1>
        <p className="text-xs text-slate-600">O curso solicitado não existe ou foi arquivado.</p>
        <button
          type="button"
          onClick={() => navigateTo('/cursos')}
          className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold"
        >
          Voltar ao Catálogo
        </button>
      </div>
    );
  }

  const enrollment = getEnrollmentForCourse(course.id);
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="space-y-12 pb-20">
      {/* Course Hero Banner */}
      <section className="bg-slate-950 text-white pt-10 pb-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Course Specs */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <button
                  type="button"
                  onClick={() => navigateTo('/cursos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cursos
                </button>
                <span>/</span>
                <span>{course.category}</span>
                <span>/</span>
                <span className="text-slate-300">{course.level}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {course.shortDescription}
              </p>

              {/* Specs Bar */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-2 border-t border-slate-800 tabular-nums">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{course.durationHours} horas estimadas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>{course.modules.length} módulos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>{totalLessons} aulas estruturadas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span>Certificado com QR Code</span>
                </div>
              </div>
            </div>

            {/* Right Purchase Card */}
            <div className="lg:col-span-4 bg-white text-slate-900 rounded-xl p-6 shadow-2xl border border-slate-200">
              <div className="aspect-16/9 rounded-lg overflow-hidden mb-5 bg-slate-900">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Investimento único:</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-semibold text-slate-700">R$</span>
                      <span className="font-serif text-3xl font-extrabold text-slate-950 tabular-nums">
                        {course.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                  {course.originalPrice > course.price && (
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      R$ {course.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>

                {enrollment ? (
                  <button
                    type="button"
                    onClick={() => navigateTo(`/aluno/curso/${course.slug}`)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{t.course.continueStudying}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigateTo(`/checkout/${course.slug}`)}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4 text-amber-400" />
                    <span>{t.course.buyNow} — PAGAMENTO VIA PIX</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowPdfModal(true)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-slate-600" />
                  <span>{t.course.downloadPdf}</span>
                </button>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>Garantia de 7 dias com devolução integral</span>
                  </div>
                  <p>Acesso online imediato após confirmação do PIX.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Core Modules & Curriculum */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Learning Objectives Box */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-950">
            O Que Você Vai Aprender Neste Curso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {course.learningObjectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Curriculum Module Accordion */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-slate-500 font-bold block mb-1">
                Conteúdo Programático
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-950">
                Módulos e Aulas Detalhadas
              </h2>
            </div>
            <span className="text-xs text-slate-500 tabular-nums">
              {course.modules.length} módulos · {totalLessons} aulas práticas
            </span>
          </div>

          <div className="space-y-3">
            {course.modules.map((mod, idx) => {
              const isOpen = openModuleId === mod.id || (openModuleId === null && idx === 0);
              return (
                <div
                  key={mod.id}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenModuleId(isOpen ? 'none' : mod.id)}
                    className="w-full p-4.5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 hover:text-amber-700 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {String(mod.number).padStart(2, '0')}
                      </span>
                      <span>{mod.title}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="hidden sm:inline">{mod.lessons.length} aulas</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isOpen ? 'rotate-180 text-slate-900' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4.5 pb-4 border-t border-slate-100 bg-slate-50/50 space-y-3 pt-3">
                      {mod.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="bg-white p-3.5 rounded border border-slate-200 text-xs text-slate-700 space-y-1.5"
                        >
                          <div className="flex items-center justify-between font-bold text-slate-900">
                            <span>Aula {lesson.number}: {lesson.title}</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">{lesson.introduction}</p>
                          <div className="text-[11px] text-slate-500 pt-1">
                            <strong>Objetivo:</strong> {lesson.learningObjective}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Project Highlight */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Projeto Prático Final de Certificação</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold">
            {course.finalProject.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {course.finalProject.description}
          </p>
          <div className="bg-slate-800/80 p-4 rounded-lg text-xs space-y-2">
            <span className="font-bold text-slate-200 block">Entregáveis para fixação e portfólio:</span>
            <ul className="list-disc pl-4 space-y-1 text-slate-300">
              {course.finalProject.deliverables.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PDF Modal Trigger */}
      {showPdfModal && (
        <CoursePDFModal course={course} onClose={() => setShowPdfModal(false)} />
      )}
    </div>
  );
};
