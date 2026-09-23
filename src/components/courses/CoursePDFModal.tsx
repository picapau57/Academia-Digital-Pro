import React from 'react';
import { Course } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Printer, Download, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';

interface CoursePDFModalProps {
  course: Course;
  onClose: () => void;
}

export const CoursePDFModal: React.FC<CoursePDFModalProps> = ({ course, onClose }) => {
  const { settings, recordFileDownload, showToast } = useApp();

  const handlePrint = () => {
    recordFileDownload(course.id, course.title, 'COURSE_PDF');
    showToast('Preparando impressão / salvamento do documento PDF...', 'info');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Action Header (Hidden in Print) */}
        <div className="no-print p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-sm">Material Didático Oficial em PDF — {course.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-md shadow-xs cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar em PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md cursor-pointer transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Textbook Document Content */}
        <div className="p-8 sm:p-12 overflow-y-auto font-sans text-slate-800 space-y-10 leading-relaxed bg-white">
          {/* Cover Page */}
          <div className="border-b-2 border-slate-900 pb-12 pt-4 text-center space-y-4">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-slate-100 rounded text-xs font-semibold text-slate-700 uppercase tracking-widest">
              <GraduationCap className="w-4 h-4 text-amber-600" />
              {settings.platformName}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight max-w-2xl mx-auto">
              {course.title}
            </h1>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              {course.shortDescription}
            </p>
            <div className="text-xs text-slate-500 pt-4 flex items-center justify-center gap-4">
              <span>Nível: {course.level}</span>
              <span>·</span>
              <span>Carga Horária: {course.durationHours} horas</span>
              <span>·</span>
              <span>Edição Atualizada</span>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h2 className="font-serif text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              Sumário Geral do Curso
            </h2>
            <div className="space-y-3 text-xs">
              {course.modules.map((m) => (
                <div key={m.id} className="flex flex-col gap-1">
                  <div className="font-bold text-slate-800">
                    Módulo {m.number}: {m.title}
                  </div>
                  <ul className="pl-4 space-y-1 text-slate-600">
                    {m.lessons.map((l) => (
                      <li key={l.id} className="list-disc">
                        Aula {l.number}: {l.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="font-bold text-slate-800 pt-2">
                Projeto Prático Final: {course.finalProject.title}
              </div>
            </div>
          </div>

          {/* Introduction & Objectives */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-slate-950 border-b border-slate-200 pb-2">
              1. Introdução e Objetivos de Aprendizagem
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {course.fullDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {course.learningObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded border border-slate-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modules & Lessons Detailed Chapters */}
          <div className="space-y-12">
            {course.modules.map((mod) => (
              <section key={mod.id} className="space-y-6 pt-4 border-t border-slate-200">
                <div className="bg-slate-900 text-white p-4 rounded-md">
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Módulo {mod.number}</span>
                  <h3 className="font-serif text-xl font-bold">{mod.title}</h3>
                </div>

                <div className="space-y-8">
                  {mod.lessons.map((lesson) => (
                    <article key={lesson.id} className="space-y-4 p-5 rounded-lg border border-slate-200 bg-slate-50/50">
                      <div className="border-b border-slate-200 pb-2">
                        <span className="text-xs font-semibold text-slate-500">Aula {lesson.number}</span>
                        <h4 className="font-serif text-lg font-bold text-slate-900">{lesson.title}</h4>
                      </div>

                      <div className="space-y-3 text-sm text-slate-700">
                        <p><strong>Introdução:</strong> {lesson.introduction}</p>
                        <p><strong>Objetivo:</strong> {lesson.learningObjective}</p>
                        <p><strong>Explicação Teórica & Prática:</strong> {lesson.explanation}</p>

                        {lesson.examples.length > 0 && (
                          <div className="bg-white p-3 rounded border border-slate-200 text-xs">
                            <strong className="text-slate-900 block mb-1">Exemplos Concretos de Aplicação:</strong>
                            <ul className="list-disc pl-4 space-y-1 text-slate-600">
                              {lesson.examples.map((ex, idx) => (
                                <li key={idx}>{ex}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {lesson.practicalInstructions.length > 0 && (
                          <div className="bg-white p-3 rounded border border-slate-200 text-xs">
                            <strong className="text-slate-900 block mb-1">Passo a Passo Prático:</strong>
                            <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                              {lesson.practicalInstructions.map((step, idx) => (
                                <li key={idx}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        )}

                        <div className="bg-amber-50/70 p-3 rounded border border-amber-200 text-xs text-amber-950">
                          <strong>Atividade Prática do Aluno:</strong> {lesson.practicalActivity}
                        </div>

                        <div className="text-xs text-slate-600 italic">
                          <strong>Resumo da Aula:</strong> {lesson.summary}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Final Project Section */}
          <div className="pt-8 border-t-2 border-slate-900 space-y-4">
            <h2 className="font-serif text-xl font-bold text-slate-950">
              Projeto Prático Final de Conclusão: {course.finalProject.title}
            </h2>
            <p className="text-sm text-slate-700">
              {course.finalProject.description}
            </p>
            <div className="bg-slate-100 p-4 rounded border border-slate-300 text-xs space-y-2">
              <strong className="text-slate-900 block">Entregáveis Obrigatórios para Certificação:</strong>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                {course.finalProject.deliverables.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Conclusion & Certificate Info */}
          <div className="pt-6 border-t border-slate-200 text-xs text-slate-500 space-y-2 text-center">
            <p className="font-semibold text-slate-700">
              {settings.platformName} — {settings.slogan}
            </p>
            <p>
              Ao concluir todas as aulas e atividades práticas, o aluno tem direito ao Certificado Oficial de Conclusão emitido com registro único e código QR de verificação online.
            </p>
          </div>
        </div>

        {/* Modal Footer (No print) */}
        <div className="no-print p-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600">
          <span>{course.pdfFileName || 'Material_Didatico_Oficial.pdf'}</span>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-semibold rounded-md hover:bg-slate-800 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Baixar em PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
