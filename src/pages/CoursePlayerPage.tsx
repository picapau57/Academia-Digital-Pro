import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CoursePDFModal } from '../components/courses/CoursePDFModal';
import { CertificateModal } from '../components/certificate/CertificateModal';
import { Lesson, Certificate } from '../types';
import {
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Award,
  Download,
  Check,
  Sparkles,
  Layers,
  FileText,
  ChevronRight,
} from 'lucide-react';

interface CoursePlayerPageProps {
  slug: string;
}

export const CoursePlayerPage: React.FC<CoursePlayerPageProps> = ({ slug }) => {
  const {
    courses,
    currentUser,
    getEnrollmentForCourse,
    toggleLessonCompletion,
    certificates,
    navigateTo,
    t,
  } = useApp();

  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);

  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-slate-900">Curso não encontrado</h1>
        <button
          type="button"
          onClick={() => navigateTo('/aluno')}
          className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold"
        >
          Voltar ao Meu Painel
        </button>
      </div>
    );
  }

  // All lessons flat list
  const allLessons: { lesson: Lesson; moduleTitle: string; moduleNumber: number }[] = [];
  course.modules.forEach((mod) => {
    mod.lessons.forEach((les) => {
      allLessons.push({ lesson: les, moduleTitle: mod.title, moduleNumber: mod.number });
    });
  });

  const enrollment = getEnrollmentForCourse(course.id);
  const completedIds = enrollment?.completedLessonIds || [];
  const progressPercent = enrollment?.progressPercent || 0;
  const isAllCompleted = progressPercent === 100;

  // Initialize or maintain active lesson
  useEffect(() => {
    if (!activeLessonId && allLessons.length > 0) {
      // Find first uncompleted lesson, or the first lesson
      const firstUncompleted = allLessons.find((item) => !completedIds.includes(item.lesson.id));
      setActiveLessonId(firstUncompleted ? firstUncompleted.lesson.id : allLessons[0].lesson.id);
    }
  }, [allLessons, completedIds, activeLessonId]);

  const currentItem = allLessons.find((item) => item.lesson.id === activeLessonId) || allLessons[0];
  const currentIndex = allLessons.findIndex((item) => item.lesson.id === activeLessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const isCurrentCompleted = currentItem ? completedIds.includes(currentItem.lesson.id) : false;

  const currentCertificate: Certificate | undefined = certificates.find(
    (c) => c.courseId === course.id && (c.studentId === currentUser?.id || c.studentId === 'usr-student-01')
  );

  return (
    <div className="min-h-screen bg-slate-100/70 pb-20">
      {/* Top Bar for Learning Session */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-18 z-30 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('/aluno')}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Voltar ao Painel do Aluno"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Sala de Aula Virtual
              </span>
              <h2 className="font-serif text-sm sm:text-base font-bold truncate max-w-md sm:max-w-xl">
                {course.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPdfModal(true)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Apostila Completa PDF</span>
            </button>

            {isAllCompleted && currentCertificate && (
              <button
                type="button"
                onClick={() => setShowCertModal(true)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Ver Certificado</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Two-Zone Layout (Education Sandbox Reference) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ZONE 1: INTERACTIVE STAGE (70% viewport) */}
          <main className="lg:col-span-8 space-y-6">
            {/* Congratulations Banner if All Finished */}
            {isAllCompleted && (
              <div className="bg-emerald-950 text-emerald-100 rounded-xl p-6 border border-emerald-800 shadow-md space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-800 text-emerald-200 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">
                      {t.course.congratulations}
                    </h3>
                    <p className="text-xs text-emerald-200">
                      Você completou 100% de todas as lições práticas deste curso! Seu Certificado Oficial de Conclusão foi liberado.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {currentCertificate && (
                    <button
                      type="button"
                      onClick={() => setShowCertModal(true)}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-md shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Award className="w-4 h-4" />
                      <span>{t.course.downloadCertificate}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPdfModal(true)}
                    className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.course.downloadPdf}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Lesson Interactive Stage Card */}
            {currentItem && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                {/* Lesson Header Banner */}
                <div className="p-6 bg-slate-950 text-white border-b border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>
                      Módulo {currentItem.moduleNumber}: {currentItem.moduleTitle}
                    </span>
                    <span className="font-mono">
                      Aula {currentItem.lesson.number} de {allLessons.length}
                    </span>
                  </div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                    {currentItem.lesson.title}
                  </h1>
                </div>

                {/* Lesson Text & Didactic Content */}
                <div className="p-6 sm:p-8 space-y-8 text-slate-800 leading-relaxed text-sm">
                  {/* Objective Box */}
                  <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 rounded-r-lg space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                      Objetivo desta Aula
                    </span>
                    <p className="text-xs sm:text-sm text-amber-950">
                      {currentItem.lesson.learningObjective}
                    </p>
                  </div>

                  {/* Introduction */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-bold text-slate-950">
                      1. Visão Geral
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {currentItem.lesson.introduction}
                    </p>
                  </div>

                  {/* Detailed Explanation */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-bold text-slate-950">
                      2. Explicação e Fundamentação
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {currentItem.lesson.explanation}
                    </p>
                  </div>

                  {/* Real World Examples */}
                  {currentItem.lesson.examples.length > 0 && (
                    <div className="space-y-3 bg-slate-50 p-5 rounded-lg border border-slate-200">
                      <h4 className="font-serif text-base font-bold text-slate-900">
                        Exemplos Práticos do Mercado
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {currentItem.lesson.examples.map((ex, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Step by Step Implementation */}
                  {currentItem.lesson.practicalInstructions.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-serif text-base font-bold text-slate-900">
                        Passo a Passo de Execução
                      </h4>
                      <div className="space-y-2.5">
                        {currentItem.lesson.practicalInstructions.map((instruction, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800"
                          >
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed pt-0.5">{instruction}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hands-on Student Activity */}
                  <div className="bg-sky-50 border border-sky-200 p-5 rounded-xl space-y-2 text-xs text-sky-950">
                    <div className="flex items-center gap-2 font-bold text-sky-900">
                      <BookOpen className="w-4 h-4 text-sky-600" />
                      <span>Atividade Prática do Aluno</span>
                    </div>
                    <p className="leading-relaxed">
                      {currentItem.lesson.practicalActivity}
                    </p>
                  </div>

                  {/* Lesson Summary */}
                  <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 italic">
                    <strong>Resumo:</strong> {currentItem.lesson.summary}
                  </div>
                </div>

                {/* Lesson Action Footer (Mark as Completed & Pagination) */}
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Mark as Completed Button */}
                  <button
                    type="button"
                    onClick={() => toggleLessonCompletion(course.id, currentItem.lesson.id)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs ${
                      isCurrentCompleted
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isCurrentCompleted ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{t.course.lessonCompleted}</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4" />
                        <span>{t.course.markCompleted}</span>
                      </>
                    )}
                  </button>

                  {/* Prev / Next Lesson Navigation */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {prevLesson && (
                      <button
                        type="button"
                        onClick={() => setActiveLessonId(prevLesson.lesson.id)}
                        className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-md border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Anterior</span>
                      </button>
                    )}

                    {nextLesson && (
                      <button
                        type="button"
                        onClick={() => setActiveLessonId(nextLesson.lesson.id)}
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Próxima</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* ZONE 2: CONTROL DECK & CURRICULUM DRAWER (30% viewport) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Progresso do Curso
                </span>
                <span className="font-serif text-lg font-bold text-slate-900 tabular-nums">
                  {progressPercent}%
                </span>
              </div>

              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    isAllCompleted ? 'bg-emerald-500' : 'bg-slate-900'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{completedIds.length} de {allLessons.length} aulas concluídas</span>
                {isAllCompleted && (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Concluído
                  </span>
                )}
              </div>
            </div>

            {/* Curriculum Module Accordion List */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-serif text-sm font-bold text-slate-900">
                  Estrutura das Aulas
                </h3>
                <span className="text-xs text-slate-500">{course.modules.length} Módulos</span>
              </div>

              <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                {course.modules.map((mod) => (
                  <div key={mod.id} className="p-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">
                      Módulo {mod.number}: {mod.title}
                    </div>

                    <div className="space-y-1">
                      {mod.lessons.map((les) => {
                        const isCompleted = completedIds.includes(les.id);
                        const isCurrent = activeLessonId === les.id;

                        return (
                          <button
                            key={les.id}
                            type="button"
                            onClick={() => setActiveLessonId(les.id)}
                            className={`w-full p-2.5 rounded-lg text-left text-xs transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                              isCurrent
                                ? 'bg-slate-900 text-white font-semibold'
                                : 'hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {isCompleted ? (
                                <CheckCircle2
                                  className={`w-4 h-4 shrink-0 ${
                                    isCurrent ? 'text-emerald-400' : 'text-emerald-600'
                                  }`}
                                />
                              ) : (
                                <Circle
                                  className={`w-4 h-4 shrink-0 ${
                                    isCurrent ? 'text-slate-400' : 'text-slate-300'
                                  }`}
                                />
                              )}
                              <span className="truncate">
                                {les.number}. {les.title}
                              </span>
                            </div>

                            {isCurrent && <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
              <h4 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Material Didático</span>
              </h4>
              <p className="text-xs text-slate-300">
                Guarde a apostila completa para consultar offline quando e onde desejar.
              </p>
              <button
                type="button"
                onClick={() => setShowPdfModal(true)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Apostila do Curso</span>
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* PDF Modal */}
      {showPdfModal && (
        <CoursePDFModal course={course} onClose={() => setShowPdfModal(false)} />
      )}

      {/* Certificate Modal */}
      {showCertModal && currentCertificate && (
        <CertificateModal certificate={currentCertificate} onClose={() => setShowCertModal(false)} />
      )}
    </div>
  );
};
