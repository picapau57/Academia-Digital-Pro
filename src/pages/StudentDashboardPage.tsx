import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CertificateModal } from '../components/certificate/CertificateModal';
import { CoursePDFModal } from '../components/courses/CoursePDFModal';
import { Course, Certificate } from '../types';
import {
  BookOpen,
  Award,
  Clock,
  Download,
  CheckCircle2,
  ArrowRight,
  User as UserIcon,
  AlertCircle,
  FileText,
  Layers,
  Settings,
  GraduationCap,
  Trophy,
} from 'lucide-react';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { ThemeToggle } from '../components/common/ThemeToggle';

export const StudentDashboardPage: React.FC = () => {
  const {
    currentUser,
    courses,
    enrollments,
    certificates,
    orders,
    downloads,
    navigateTo,
    logout,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'certificates' | 'downloads' | 'orders' | 'settings'>('courses');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [selectedPdfCourse, setSelectedPdfCourse] = useState<Course | null>(null);

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-slate-900">Acesso Restrito</h1>
        <p className="text-xs text-slate-600">Por favor, entre em sua conta de aluno para ver seus cursos.</p>
        <button
          type="button"
          onClick={() => navigateTo('/login')}
          className="px-6 py-2.5 bg-slate-900 text-white rounded text-xs font-semibold cursor-pointer"
        >
          Fazer Login
        </button>
      </div>
    );
  }

  // Student specific data
  const studentEnrollments = enrollments.filter((e) => e.studentId === currentUser.id);
  const enrolledCourses = studentEnrollments.map((enr) => {
    const course = courses.find((c) => c.id === enr.courseId);
    return { ...enr, course };
  }).filter((item) => item.course !== undefined);

  const completedCount = studentEnrollments.filter((e) => e.progressPercent === 100).length;
  const totalEnrolledCourses = enrolledCourses.length;
  const courseCompletionPercent =
    totalEnrolledCourses > 0 ? Math.round((completedCount / totalEnrolledCourses) * 100) : 0;

  const averageProgress =
    studentEnrollments.length > 0
      ? Math.round(
          studentEnrollments.reduce((acc, curr) => acc + curr.progressPercent, 0) / studentEnrollments.length
        )
      : 0;

  const studentCerts = certificates.filter((c) => c.studentId === currentUser.id);
  const studentOrders = orders.filter((o) => o.studentId === currentUser.id);
  const pendingOrders = studentOrders.filter((o) => o.status === 'PENDING');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Profile & Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-amber-400 flex items-center justify-center text-amber-400 font-serif text-2xl font-bold">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-0.5">
              Portal do Aluno
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              {t.student.welcome}, {currentUser.name}!
            </h1>
            <p className="text-xs text-slate-400">
              {currentUser.email} · Aluno ativo desde {new Date(currentUser.createdAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Configurações</span>
          </button>
          <button
            type="button"
            onClick={logout}
            className="px-3.5 py-2 bg-slate-800 hover:bg-rose-950 text-rose-300 hover:text-rose-100 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {t.nav.logout}
          </button>
        </div>
      </div>

      {/* Pending Payment Notification Banner if any */}
      {pendingOrders.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-3.5 text-xs text-amber-900">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <p className="font-bold text-sm">Você possui pedido(s) em análise pelo financeiro</p>
            <p className="leading-relaxed">
              O pedido do curso <strong>{pendingOrders[0].courseTitle}</strong> ({pendingOrders[0].id}) foi recebido com o comprovante e está aguardando liberação. Assim que aprovado, ele aparecerá em seus cursos ativos!
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className="px-3 py-1.5 bg-amber-600 text-white font-semibold rounded hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            Ver Pedidos
          </button>
        </div>
      )}

      {/* KPI Stats Cards (5 Key Metric Anchors from Section 8) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white dark:bg-slate-900 p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">{t.student.myCourses}</span>
          <p className="font-serif text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {enrolledCourses.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">{t.student.completedCourses}</span>
            <span className="text-[10px] font-bold text-slate-400 tabular-nums">
              {totalEnrolledCourses > 0 ? `${courseCompletionPercent}%` : '0%'}
            </span>
          </div>
          <p className="font-serif text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
            {completedCount} <span className="text-xs font-normal text-slate-400 font-sans">/ {totalEnrolledCourses}</span>
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">{t.student.myProgress}</span>
          <p className="font-serif text-2xl font-bold text-sky-600 dark:text-sky-400 tabular-nums">
            {averageProgress}%
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">{t.student.myCertificates}</span>
          <p className="font-serif text-2xl font-bold text-purple-600 dark:text-purple-400 tabular-nums">
            {studentCerts.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1 col-span-2 lg:col-span-1">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">{t.student.downloads}</span>
          <p className="font-serif text-2xl font-bold text-slate-700 dark:text-slate-200 tabular-nums">
            {downloads.filter((d) => d.studentId === currentUser.id).length}
          </p>
        </div>
      </div>

      {/* Visual Progress Bar: Cursos Concluídos vs Total Inscrito */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                totalEnrolledCourses > 0 && completedCount === totalEnrolledCourses
                  ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400'
              }`}
            >
              {totalEnrolledCourses > 0 && completedCount === totalEnrolledCourses ? (
                <Trophy className="w-6 h-6" />
              ) : (
                <GraduationCap className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Progresso de Conclusão dos Cursos
                </h2>
                <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {completedCount} de {totalEnrolledCourses} concluído{totalEnrolledCourses === 1 ? '' : 's'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {totalEnrolledCourses === 0
                  ? 'Você ainda não está inscrito em nenhum curso. Acesse nosso catálogo para começar sua jornada!'
                  : completedCount === totalEnrolledCourses
                  ? '🎉 Parabéns! Você concluiu com sucesso 100% de todos os cursos em que se matriculou!'
                  : completedCount === 0
                  ? 'Você ainda não concluiu nenhum curso. Complete todas as lições para obter seus certificados!'
                  : `Você já concluiu ${completedCount} curso${completedCount > 1 ? 's' : ''} de ${totalEnrolledCourses} inscrito${totalEnrolledCourses > 1 ? 's' : ''}. Resta${totalEnrolledCourses - completedCount > 1 ? 'm' : ''} ${totalEnrolledCourses - completedCount} para gabaritar!`}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800 shrink-0">
            <div className="font-serif text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums">
              {courseCompletionPercent}%
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Taxa de Conclusão
            </span>
          </div>
        </div>

        {/* Visual Progress Track */}
        <div className="space-y-1.5 pt-1">
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 overflow-hidden p-0.5 shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                totalEnrolledCourses > 0 && completedCount === totalEnrolledCourses
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-xs'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 shadow-xs'
              }`}
              style={{ width: `${courseCompletionPercent}%` }}
              role="progressbar"
              aria-valuenow={courseCompletionPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span>0 cursos</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {completedCount} de {totalEnrolledCourses} curso{totalEnrolledCourses === 1 ? '' : 's'} concluído{completedCount === 1 ? '' : 's'} ({courseCompletionPercent}%)
            </span>
            <span>{totalEnrolledCourses} cursos</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Functional Segmented Control) */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('courses')}
          className={`py-3 px-4 font-semibold text-xs border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'courses'
              ? 'border-slate-900 dark:border-amber-400 text-slate-950 dark:text-white'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.student.myCourses} ({enrolledCourses.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('certificates')}
          className={`py-3 px-4 font-semibold text-xs border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'certificates'
              ? 'border-slate-900 dark:border-amber-400 text-slate-950 dark:text-white'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.student.myCertificates} ({studentCerts.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('downloads')}
          className={`py-3 px-4 font-semibold text-xs border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'downloads'
              ? 'border-slate-900 dark:border-amber-400 text-slate-950 dark:text-white'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.student.downloads}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-4 font-semibold text-xs border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'orders'
              ? 'border-slate-900 dark:border-amber-400 text-slate-950 dark:text-white'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Histórico de Pedidos ({studentOrders.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`py-3 px-4 font-semibold text-xs border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'settings'
              ? 'border-slate-900 dark:border-amber-400 text-slate-950 dark:text-white'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Configurações & Tema
        </button>
      </div>

      {/* Tab 1: Enrolled Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(({ course, progressPercent, completedLessonIds, certificateId }) => {
                if (!course) return null;
                const isFinished = progressPercent === 100;
                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-16/9 bg-slate-900 relative">
                        <img
                          src={course.coverImage}
                          alt={course.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        {isFinished && (
                          <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Concluído</span>
                          </div>
                        )}
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{course.category}</span>
                          <span>·</span>
                          <span>{course.durationHours}h</span>
                        </div>

                        <h3 className="font-serif text-base font-bold text-slate-900 line-clamp-1">
                          {course.title}
                        </h3>

                        {/* Progress Bar */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500 font-medium">Progresso</span>
                            <span className="font-bold text-slate-900 tabular-nums">{progressPercent}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-500 rounded-full ${
                                isFinished ? 'bg-emerald-500' : 'bg-slate-900'
                              }`}
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 space-y-2">
                      <button
                        type="button"
                        onClick={() => navigateTo(`/aluno/curso/${course.slug}`)}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>{isFinished ? 'Revisar Aulas' : t.course.continueStudying}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setSelectedPdfCourse(course)}
                          className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>Baixar PDF</span>
                        </button>

                        {isFinished ? (
                          <button
                            type="button"
                            onClick={() => {
                              const cert = certificates.find((c) => c.courseId === course.id);
                              if (cert) setSelectedCert(cert);
                            }}
                            className="py-1.5 px-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-[11px] font-bold rounded transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Award className="w-3 h-3" />
                            <span>Certificado</span>
                          </button>
                        ) : (
                          <span className="py-1.5 px-2 text-center text-slate-400 text-[11px]">
                            Certificado ao final
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {t.student.noCourses}
                </h3>
                <p className="text-xs text-slate-500">
                  Adquira cursos práticos com acesso imediato e materiais em PDF inclusos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigateTo('/cursos')}
                className="px-6 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-md shadow-xs transition-colors cursor-pointer"
              >
                {t.student.browseCatalog}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Certificates */}
      {activeTab === 'certificates' && (
        <div className="space-y-6">
          {studentCerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studentCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-700 block">
                        {cert.id}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-slate-900">
                        {cert.courseTitle}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Emitido em {new Date(cert.issueDate).toLocaleDateString('pt-BR')} · Carga: {cert.workloadHours}h
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Autêntico e Válido
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-md hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>Visualizar & Imprimir</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
              <Award className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Nenhum certificado emitido até o momento
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Conclua 100% das aulas práticas de qualquer um dos seus cursos para liberar automaticamente seu certificado verificado.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Downloads & Handbooks */}
      {activeTab === 'downloads' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Apostilas e Materiais Didáticos em PDF
          </h3>
          <p className="text-xs text-slate-600">
            Baixe e imprima os materiais oficiais completos dos seus cursos matriculados.
          </p>

          <div className="divide-y divide-slate-100">
            {enrolledCourses.map(({ course }) => {
              if (!course) return null;
              return (
                <div key={course.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{course.title}</h4>
                      <p className="text-[11px] text-slate-500">
                        {course.pdfFileName || 'Apostila_Oficial.pdf'} · Formato A4 pronto para impressão
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPdfCourse(course)}
                    className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-md hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar PDF</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Orders History */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-slate-200">
            <h3 className="font-serif text-lg font-bold text-slate-900">Histórico de Pedidos e Comprovantes</h3>
            <p className="text-xs text-slate-500">Acompanhe a situação dos seus pagamentos PIX.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">Pedido ID</th>
                  <th className="p-4">Curso Adquirido</th>
                  <th className="p-4">Valor</th>
                  <th className="p-4">Data</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Comprovante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {studentOrders.map((ord) => {
                  let statusLabel = 'Pendente de Verificação';
                  let statusStyle = 'bg-amber-100 text-amber-800';

                  if (ord.status === 'APPROVED') {
                    statusLabel = 'Aprovado / Liberado';
                    statusStyle = 'bg-emerald-100 text-emerald-800';
                  } else if (ord.status === 'REJECTED') {
                    statusLabel = 'Rejeitado';
                    statusStyle = 'bg-rose-100 text-rose-800';
                  } else if (ord.status === 'REFUNDED') {
                    statusLabel = 'Estornado';
                    statusStyle = 'bg-slate-200 text-slate-800';
                  }

                  return (
                    <tr key={ord.id} className="hover:bg-slate-50">
                      <td className="p-4 font-mono font-bold text-slate-900">{ord.id}</td>
                      <td className="p-4 font-medium">{ord.courseTitle}</td>
                      <td className="p-4 tabular-nums font-semibold">R$ {ord.amount.toFixed(2).replace('.', ',')}</td>
                      <td className="p-4 tabular-nums">{new Date(ord.createdAt).toLocaleDateString('pt-BR')}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded text-[11px] font-bold ${statusStyle}`}>
                          {statusLabel}
                        </span>
                      </td>
                      <td className="p-4">
                        {ord.receiptFileName ? (
                          <span className="text-[11px] text-slate-600 underline">
                            {ord.receiptFileName}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Settings, Language Selector & Dark Mode */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 max-w-2xl transition-colors">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">{t.settings.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Personalize suas preferências de visualização na plataforma.</p>
          </div>

          <div className="space-y-4 pt-2">
            <ThemeToggle variant="full" />
            <LanguageSelector variant="full" />

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 text-xs space-y-2 text-slate-700 dark:text-slate-200">
              <strong className="text-slate-900 dark:text-white block">Dados da Conta Cadastrada:</strong>
              <p><strong>Nome:</strong> {currentUser.name}</p>
              <p><strong>E-mail:</strong> {currentUser.email}</p>
              <p><strong>WhatsApp:</strong> {currentUser.whatsapp || 'Não informado'}</p>
              <p><strong>Tipo de Acesso:</strong> {currentUser.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedCert && (
        <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
      {selectedPdfCourse && (
        <CoursePDFModal course={selectedPdfCourse} onClose={() => setSelectedPdfCourse(null)} />
      )}
    </div>
  );
};
