import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course, Coupon, PlatformSettings, Certificate, Order } from '../types';
import { CertificateModal } from '../components/certificate/CertificateModal';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { ThemeToggle } from '../components/common/ThemeToggle';
import {
  Shield,
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Users,
  Award,
  Tag,
  Settings,
  BarChart3,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Plus,
  Trash2,
  Edit,
  Save,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Download,
  Key,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    currentUser,
    courses,
    orders,
    enrollments,
    certificates,
    coupons,
    settings,
    auditLogs,
    downloads,
    updateCourse,
    createCourse,
    deleteCourse,
    updateSettings,
    approveOrder,
    rejectOrder,
    refundOrder,
    deleteOrder,
    clearDemoData,
    createCoupon,
    deleteCoupon,
    toggleCouponStatus,
    revokeCertificate,
    deleteCertificate,
    navigateTo,
    showToast,
    t,
  } = useApp();

  const [activeSection, setActiveSection] = useState<
    'dashboard' | 'courses' | 'orders' | 'students' | 'certificates' | 'coupons' | 'settings' | 'reports' | 'logs'
  >('dashboard');

  const [selectedCertForModal, setSelectedCertForModal] = useState<Certificate | null>(null);

  // Delete orders modals state
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const [showClearAllModal, setShowClearAllModal] = useState<boolean>(false);
  const [deletingCouponCode, setDeletingCouponCode] = useState<string | null>(null);

  // Settings form state
  const [formSettings, setFormSettings] = useState<PlatformSettings>({ ...settings });

  // Course edit modal state
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);

  // Revoke reason dialog state
  const [revokingCertId, setRevokingCertId] = useState<string | null>(null);
  const [revocationReason, setRevocationReason] = useState('');

  // Reject order dialog state
  const [rejectingOrderId, setRejectingOrderId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Coupon create state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'PERCENT' | 'FIXED'>('PERCENT');
  const [newCouponValue, setNewCouponValue] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(25);

  if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.role !== 'SUPER_ADMIN')) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
        <Shield className="w-12 h-12 text-rose-600 mx-auto" />
        <h1 className="font-serif text-2xl font-bold text-slate-900">Acesso Restrito ao Administrador</h1>
        <p className="text-xs text-slate-600">Você precisa de credenciais de administrador para gerenciar o sistema.</p>
        <button
          type="button"
          onClick={() => navigateTo('/login')}
          className="px-6 py-2.5 bg-slate-900 text-white rounded text-xs font-semibold cursor-pointer"
        >
          Fazer Login como Administrador
        </button>
      </div>
    );
  }

  // Analytics KPI calculations
  const totalRevenue = orders
    .filter((o) => o.status === 'APPROVED')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingOrders = orders.filter((o) => o.status === 'PENDING');
  const approvedOrders = orders.filter((o) => o.status === 'APPROVED');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formSettings);
  };

  const handleRevokeSubmit = () => {
    if (!revokingCertId || !revocationReason.trim()) return;
    revokeCertificate(revokingCertId, revocationReason);
    setRevokingCertId(null);
    setRevocationReason('');
  };

  const handleRejectSubmit = () => {
    if (!rejectingOrderId || !rejectReason.trim()) return;
    rejectOrder(rejectingOrderId, rejectReason);
    setRejectingOrderId(null);
    setRejectReason('');
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;
    if (isCreatingCourse) {
      createCourse(editingCourse);
    } else {
      updateCourse(editingCourse);
    }
    setEditingCourse(null);
    setIsCreatingCourse(false);
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const success = createCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountType: newCouponType,
      discountValue: Number(newCouponValue),
      active: true,
      maxUses: 100,
      currentUses: 0,
      minPurchase: Number(newCouponMin),
    });

    if (success) {
      setNewCouponCode('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/60 pb-20">
      {/* Admin Header */}
      <div className="bg-slate-950 text-white border-b border-slate-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Painel de Controle Oficial
              </span>
              <h1 className="font-serif text-lg font-bold text-white">
                Gestão Administrativa — {settings.platformName}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400 hidden sm:inline">{currentUser.email}</span>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => navigateTo('/')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded cursor-pointer transition-colors"
            >
              Ver Plataforma
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Admin Sidebar Navigation */}
          <aside className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-3 shadow-xs space-y-1">
            <button
              type="button"
              onClick={() => setActiveSection('dashboard')}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeSection === 'dashboard'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Visão Geral</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('orders')}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeSection === 'orders'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4" />
                <span>{t.admin.orders}</span>
              </div>
              {pendingOrders.length > 0 && (
                <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px]">
                  {pendingOrders.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('courses')}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeSection === 'courses'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4" />
                <span>{t.admin.courses}</span>
              </div>
              <span className="text-slate-400 text-xs">{courses.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('certificates')}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeSection === 'certificates'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4" />
                <span>{t.admin.certificates}</span>
              </div>
              <span className="text-slate-400 text-xs">{certificates.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('coupons')}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeSection === 'coupons'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Tag className="w-4 h-4" />
                <span>{t.admin.coupons}</span>
              </div>
              <span className="text-slate-400 text-xs">{coupons.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('settings')}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeSection === 'settings'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>Configurações & PIX</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('reports')}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeSection === 'reports'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4" />
                <span>{t.admin.reports}</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('logs')}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeSection === 'logs'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-4 h-4" />
                <span>{t.admin.auditLogs}</span>
              </div>
              <span className="text-slate-400 text-xs">{auditLogs.length}</span>
            </button>
          </aside>

          {/* Admin Main Content Zone */}
          <main className="lg:col-span-9 space-y-6">
            {/* SECTION 1: OVERVIEW DASHBOARD */}
            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                {/* 4 Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">{t.admin.revenue}</span>
                    <p className="font-serif text-2xl font-extrabold text-slate-950 tabular-nums">
                      R$ {totalRevenue.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">{t.admin.pendingPayments}</span>
                    <p className="font-serif text-2xl font-extrabold text-amber-600 tabular-nums">
                      {pendingOrders.length}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Matrículas Ativas</span>
                    <p className="font-serif text-2xl font-extrabold text-emerald-600 tabular-nums">
                      {enrollments.length}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                    <span className="text-xs text-slate-500 font-semibold block">Certificados Emitidos</span>
                    <p className="font-serif text-2xl font-extrabold text-purple-600 tabular-nums">
                      {certificates.length}
                    </p>
                  </div>
                </div>

                {/* Pending Orders Action Card */}
                {pendingOrders.length > 0 && (
                  <div className="bg-white rounded-xl border border-amber-300 p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                        <span>Pedidos Aguardando Liberação Manual ({pendingOrders.length})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveSection('orders')}
                        className="text-xs font-semibold text-slate-800 hover:underline cursor-pointer"
                      >
                        Gerenciar Todos os Pedidos
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100 text-xs">
                      {pendingOrders.map((ord) => (
                        <div key={ord.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="font-mono font-bold text-slate-900">{ord.id}</span>
                            <p className="font-semibold text-slate-800">{ord.studentName} — {ord.courseTitle}</p>
                            <p className="text-slate-500">
                              R$ {ord.amount.toFixed(2).replace('.', ',')} · Comprovante: {ord.receiptFileName || 'anexo.pdf'}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => approveOrder(ord.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded shadow-xs cursor-pointer flex items-center gap-1"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>{t.admin.approve}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setRejectingOrderId(ord.id);
                                setRejectReason('Comprovante ilegível ou divergência de valor.');
                              }}
                              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded shadow-xs cursor-pointer flex items-center gap-1"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>{t.admin.reject}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingOrderId(ord.id)}
                              className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold rounded shadow-xs cursor-pointer flex items-center gap-1"
                              title="Excluir este pedido de teste"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Excluir</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PIX Quick Notice */}
                <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-amber-400 font-bold block mb-0.5">Chave PIX Oficial Atual do Sistema:</span>
                    <span className="font-mono text-base font-bold">{settings.pixKey}</span>
                    <span className="text-slate-400 block pt-1">
                      Favorecido: {settings.pixReceiverName} ({settings.pixCity})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveSection('settings')}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded cursor-pointer whitespace-nowrap"
                  >
                    Editar Chave PIX
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 2: ORDERS MANAGEMENT */}
            {activeSection === 'orders' && (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-lg font-bold text-slate-900">
                      Gestão de Pedidos e Comprovantes PIX
                    </h2>
                    <p className="text-xs text-slate-500">
                      Revise comprovantes anexados pelos alunos e aprove a liberação de matrículas.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-medium">Total: {orders.length} pedidos</span>
                    {orders.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowClearAllModal(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors cursor-pointer"
                        title="Apagar todos os pedidos e alunos exemplos para começar do zero"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Apagar Alunos Exemplos</span>
                      </button>
                    )}
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="p-12 text-center space-y-3">
                    <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="font-serif text-base font-bold text-slate-800">
                      Nenhum pedido cadastrado no momento
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Sua plataforma está 100% limpa e pronta para receber pedidos reais dos seus alunos via PIX!
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="p-4">Pedido</th>
                          <th className="p-4">Aluno</th>
                          <th className="p-4">Curso</th>
                          <th className="p-4">Valor</th>
                          <th className="p-4">Comprovante</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {orders.map((ord) => {
                          return (
                            <tr key={ord.id} className="hover:bg-slate-50">
                              <td className="p-4 font-mono font-bold text-slate-900">{ord.id}</td>
                              <td className="p-4">
                                <p className="font-semibold text-slate-900">{ord.studentName}</p>
                                <p className="text-[11px] text-slate-500">{ord.studentEmail}</p>
                              </td>
                              <td className="p-4 font-medium max-w-[160px] truncate">{ord.courseTitle}</td>
                              <td className="p-4 font-semibold tabular-nums">
                                R$ {ord.amount.toFixed(2).replace('.', ',')}
                                {ord.couponCode && (
                                  <span className="block text-[10px] text-emerald-600 font-mono">
                                    {ord.couponCode}
                                  </span>
                                )}
                              </td>
                              <td className="p-4">
                                {ord.receiptFileName ? (
                                  <span className="text-[11px] text-slate-700 font-medium underline">
                                    {ord.receiptFileName}
                                  </span>
                                ) : (
                                  <span className="text-slate-400">—</span>
                                )}
                              </td>
                              <td className="p-4">
                                {ord.status === 'PENDING' && (
                                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded text-[10px]">
                                    Pendente
                                  </span>
                                )}
                                {ord.status === 'APPROVED' && (
                                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                                    Aprovado
                                  </span>
                                )}
                                {ord.status === 'REJECTED' && (
                                  <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold rounded text-[10px]">
                                    Rejeitado
                                  </span>
                                )}
                                {ord.status === 'REFUNDED' && (
                                  <span className="px-2 py-0.5 bg-slate-200 text-slate-800 font-bold rounded text-[10px]">
                                    Estornado
                                  </span>
                                )}
                              </td>
                              <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                                {ord.status === 'PENDING' && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => approveOrder(ord.id)}
                                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold cursor-pointer"
                                    >
                                      Aprovar
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setRejectingOrderId(ord.id);
                                        setRejectReason('Comprovante divergente.');
                                      }}
                                      className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[11px] font-bold cursor-pointer"
                                    >
                                      Rejeitar
                                    </button>
                                  </>
                                )}
                                {ord.status === 'APPROVED' && (
                                  <button
                                    type="button"
                                    onClick={() => refundOrder(ord.id)}
                                    className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded text-[11px] font-semibold cursor-pointer"
                                  >
                                    Estornar
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => setDeletingOrderId(ord.id)}
                                  className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-[11px] font-semibold cursor-pointer inline-flex items-center gap-1"
                                  title="Excluir este pedido"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>Excluir</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* SECTION 3: COURSES MANAGEMENT */}
            {activeSection === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-slate-900">Catálogo de Cursos</h2>
                    <p className="text-xs text-slate-500">Crie, edite preços, descrições e módulos dos cursos.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newC: Course = {
                        id: `course-${Date.now()}`,
                        slug: `novo-curso-${Date.now()}`,
                        title: 'Novo Curso de Capacitação Digital',
                        shortDescription: 'Descrição breve das habilidades e objetivos desenvolvidos.',
                        fullDescription: 'Descrição didática completa do curso, metodologia e mercado.',
                        category: 'Tecnologia',
                        level: 'Iniciante',
                        durationHours: 8,
                        price: 39.90,
                        originalPrice: 97.00,
                        coverImage: '/images/course_marketing_cover_1790119321192.jpg',
                        published: true,
                        certificateEnabled: true,
                        learningObjectives: ['Aprender fundamentos práticos', 'Desenvolver portfólio real'],
                        modules: [
                          {
                            id: `m-${Date.now()}-1`,
                            number: 1,
                            title: 'Módulo 1: Fundamentos Práticos',
                            lessons: [
                              {
                                id: `l-${Date.now()}-1`,
                                number: 1,
                                title: 'Introdução e Primeiros Passos',
                                learningObjective: 'Compreender o cenário geral',
                                introduction: 'Boas-vindas ao conteúdo',
                                explanation: 'Explicação detalhada dos conceitos',
                                examples: ['Exemplo 1 de aplicação'],
                                practicalInstructions: ['Passo 1'],
                                practicalActivity: 'Realizar atividade inicial',
                                importantPoints: ['Ponto de atenção prático'],
                                summary: 'Conclusão do tema',
                              },
                            ],
                          },
                        ],
                        finalProject: {
                          title: 'Projeto Prático Aplicado',
                          description: 'Construção de uma solução completa',
                          deliverables: ['Arquivo final comprovatório'],
                        },
                      };
                      setEditingCourse(newC);
                      setIsCreatingCourse(true);
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Cadastrar Novo Curso</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{course.category} · {course.level}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            course.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {course.published ? 'Publicado' : 'Rascunho'}
                          </span>
                        </div>
                        <h3 className="font-serif text-base font-bold text-slate-900">{course.title}</h3>
                        <p className="text-xs text-slate-600 line-clamp-2">{course.shortDescription}</p>
                        <div className="pt-2 text-xs font-semibold text-slate-800">
                          Preço: R$ {course.price.toFixed(2).replace('.', ',')} (De R$ {course.originalPrice.toFixed(2).replace('.', ',')})
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCourse(course);
                            setIsCreatingCourse(false);
                          }}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded flex items-center gap-1 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Tem certeza que deseja excluir o curso "${course.title}"?`)) {
                              deleteCourse(course.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:text-rose-800 cursor-pointer"
                          title="Excluir curso"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 4: CERTIFICATES MANAGEMENT */}
            {activeSection === 'certificates' && (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-lg font-bold text-slate-900">
                      Registro Geral de Certificados
                    </h2>
                    <p className="text-xs text-slate-500">
                      Consulte a base de certificados emitidos e realize revogações em caso de fraude.
                    </p>
                  </div>
                  <span className="text-xs text-slate-500">Total: {certificates.length}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-4">ID do Certificado</th>
                        <th className="p-4">Aluno</th>
                        <th className="p-4">Curso</th>
                        <th className="p-4">Carga</th>
                        <th className="p-4">Data Emissão</th>
                        <th className="p-4">Situação</th>
                        <th className="p-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {certificates.map((cert) => (
                        <tr key={cert.id} className="hover:bg-slate-50">
                          <td className="p-4 font-mono font-bold text-amber-900">{cert.id}</td>
                          <td className="p-4 font-semibold text-slate-900">{cert.studentName}</td>
                          <td className="p-4 font-medium max-w-[180px] truncate">{cert.courseTitle}</td>
                          <td className="p-4">{cert.workloadHours}h</td>
                          <td className="p-4">{new Date(cert.issueDate).toLocaleDateString('pt-BR')}</td>
                          <td className="p-4">
                            {cert.status === 'VALID' ? (
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                                Válido
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold rounded text-[10px]">
                                Revogado
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => setSelectedCertForModal(cert)}
                              className="px-2.5 py-1 bg-slate-900 text-white rounded text-[11px] font-semibold hover:bg-slate-800 cursor-pointer"
                            >
                              Ver
                            </button>
                            {cert.status === 'VALID' && (
                              <button
                                type="button"
                                onClick={() => {
                                  setRevokingCertId(cert.id);
                                  setRevocationReason('Irregularidade cadastral');
                                }}
                                className="px-2.5 py-1 bg-amber-600 text-white rounded text-[11px] font-semibold hover:bg-amber-700 cursor-pointer"
                              >
                                Revogar
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Excluir permanentemente o certificado ${cert.id}?`)) {
                                  deleteCertificate(cert.id);
                                }
                              }}
                              className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-[11px] font-semibold cursor-pointer inline-flex items-center gap-1"
                              title="Excluir certificado"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Excluir</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SECTION 5: COUPONS */}
            {activeSection === 'coupons' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="font-serif text-lg font-bold text-slate-900">Criar Novo Cupom</h3>
                  <form onSubmit={handleAddCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Código do Cupom</label>
                      <input
                        type="text"
                        required
                        value={newCouponCode}
                        onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                        placeholder="Ex: PROMO50"
                        className="w-full text-xs p-2.5 rounded border border-slate-300 font-mono uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Desconto</label>
                      <select
                        value={newCouponType}
                        onChange={(e) => setNewCouponType(e.target.value as any)}
                        className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white"
                      >
                        <option value="PERCENT">Porcentagem (%)</option>
                        <option value="FIXED">Valor Fixo (R$)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Valor do Desconto</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={newCouponValue}
                        onChange={(e) => setNewCouponValue(Number(e.target.value))}
                        className="w-full text-xs p-2.5 rounded border border-slate-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full p-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded cursor-pointer transition-colors"
                    >
                      Cadastrar Cupom
                    </button>
                  </form>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-slate-900">Cupons Cadastrados</h3>
                      <p className="text-xs text-slate-500">
                        Gerencie, pause ou exclua os cupons promocionais da sua plataforma.
                      </p>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">Total: {coupons.length} cupons</span>
                  </div>

                  {coupons.length === 0 ? (
                    <div className="p-12 text-center space-y-3">
                      <Tag className="w-12 h-12 text-slate-300 mx-auto" />
                      <h4 className="font-serif text-base font-bold text-slate-800">
                        Nenhum cupom cadastrado
                      </h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        Você não possui cupons cadastrados. Preencha o formulário acima para criar um cupom de desconto.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                          <tr>
                            <th className="p-4">Código</th>
                            <th className="p-4">Desconto</th>
                            <th className="p-4">Mínimo de Compra</th>
                            <th className="p-4">Usos</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {coupons.map((cpn) => (
                            <tr key={cpn.code} className="hover:bg-slate-50">
                              <td className="p-4 font-mono font-bold text-slate-900">{cpn.code}</td>
                              <td className="p-4">
                                {cpn.discountType === 'PERCENT' ? `${cpn.discountValue}%` : `R$ ${cpn.discountValue.toFixed(2)}`}
                              </td>
                              <td className="p-4">R$ {cpn.minPurchase.toFixed(2)}</td>
                              <td className="p-4 tabular-nums">{cpn.currentUses} / {cpn.maxUses}</td>
                              <td className="p-4">
                                {cpn.active ? (
                                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                                    Ativo
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded text-[10px]">
                                    Pausado
                                  </span>
                                )}
                              </td>
                              <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => toggleCouponStatus(cpn.code)}
                                  className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer transition-colors ${
                                    cpn.active
                                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                                  }`}
                                  title={cpn.active ? 'Pausar este cupom temporariamente' : 'Reativar este cupom'}
                                >
                                  {cpn.active ? 'Pausar' : 'Ativar'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeletingCouponCode(cpn.code)}
                                  className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-[11px] font-semibold cursor-pointer inline-flex items-center gap-1"
                                  title="Excluir este cupom permanentemente"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>Excluir</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SECTION 6: PLATFORM SETTINGS & PIX CONFIGURATION */}
            {activeSection === 'settings' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-xs">
                <div>
                  <h2 className="font-serif text-xl font-bold text-slate-900">
                    Configurações Gerais da Plataforma & Chave PIX
                  </h2>
                  <p className="text-xs text-slate-500">
                    Edite os dados institucionais, chave PIX oficial e preferências de idioma.
                  </p>
                </div>

                {/* Language and Theme Preferences */}
                <div className="space-y-4">
                  <ThemeToggle variant="full" />
                  <LanguageSelector variant="full" />
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6 pt-4 border-t border-slate-200">
                  {/* Payment / PIX Section */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                      <Key className="w-4 h-4 text-emerald-600" />
                      <span>Configurações do Pagamento PIX (Oficial)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Chave PIX da Plataforma *
                        </label>
                        <input
                          type="text"
                          required
                          value={formSettings.pixKey}
                          onChange={(e) => setFormSettings({ ...formSettings, pixKey: e.target.value })}
                          placeholder="Ex: (62) 98428-9911"
                          className="w-full text-xs font-mono font-bold p-2.5 rounded border border-slate-300 bg-white"
                        />
                        <span className="text-[10px] text-slate-500">
                          Valor inicial padrão: (62) 98428-9911
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Tipo de Chave PIX
                        </label>
                        <input
                          type="text"
                          value={formSettings.pixKeyType}
                          onChange={(e) => setFormSettings({ ...formSettings, pixKeyType: e.target.value })}
                          placeholder="Ex: Telefone"
                          className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nome do Favorecido / Razão Social
                        </label>
                        <input
                          type="text"
                          value={formSettings.pixReceiverName}
                          onChange={(e) => setFormSettings({ ...formSettings, pixReceiverName: e.target.value })}
                          className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Cidade do Favorecido
                        </label>
                        <input
                          type="text"
                          value={formSettings.pixCity}
                          onChange={(e) => setFormSettings({ ...formSettings, pixCity: e.target.value })}
                          className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing Bundles */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Valores do Pacote Promocional (6 Cursos)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Preço do Pacote Completo (R$)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formSettings.bundlePrice}
                          onChange={(e) => setFormSettings({ ...formSettings, bundlePrice: Number(e.target.value) })}
                          className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Preço Original / De (R$)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formSettings.bundleOriginalPrice}
                          onChange={(e) => setFormSettings({ ...formSettings, bundleOriginalPrice: Number(e.target.value) })}
                          className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Institutional & Support Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nome da Plataforma
                      </label>
                      <input
                        type="text"
                        value={formSettings.platformName}
                        onChange={(e) => setFormSettings({ ...formSettings, platformName: e.target.value })}
                        className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Slogan Institucional
                      </label>
                      <input
                        type="text"
                        value={formSettings.slogan}
                        onChange={(e) => setFormSettings({ ...formSettings, slogan: e.target.value })}
                        className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        E-mail de Suporte
                      </label>
                      <input
                        type="email"
                        value={formSettings.supportEmail}
                        onChange={(e) => setFormSettings({ ...formSettings, supportEmail: e.target.value })}
                        className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        WhatsApp de Suporte
                      </label>
                      <input
                        type="text"
                        value={formSettings.whatsappNumber}
                        onChange={(e) => setFormSettings({ ...formSettings, whatsappNumber: e.target.value })}
                        className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  {/* Certificate Authority */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Assinatura no Certificado (Nome / Departamento)
                      </label>
                      <input
                        type="text"
                        value={formSettings.certificateSignatureName}
                        onChange={(e) => setFormSettings({ ...formSettings, certificateSignatureName: e.target.value })}
                        className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Cargo / Entidade da Assinatura
                      </label>
                      <input
                        type="text"
                        value={formSettings.certificateSignatureRole}
                        onChange={(e) => setFormSettings({ ...formSettings, certificateSignatureRole: e.target.value })}
                        className="w-full text-xs p-2.5 rounded border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-md shadow-xs cursor-pointer flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{t.settings.saveChanges}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SECTION 7: AUDIT LOGS */}
            {activeSection === 'logs' && (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="font-serif text-lg font-bold text-slate-900">
                    Registro de Auditoria do Sistema
                  </h2>
                  <p className="text-xs text-slate-500">
                    Todas as ações administrativas, alterações de chave PIX e aprovações são registradas cronologicamente.
                  </p>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{log.action}</span>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-500">{log.adminEmail}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{log.details}</p>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString('pt-BR')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 8: REPORTS & DOWNLOAD AUDIT */}
            {activeSection === 'reports' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <h2 className="font-serif text-lg font-bold text-slate-900">
                    Relatório de Downloads e Acessos
                  </h2>
                  <p className="text-xs text-slate-500">
                    Monitoramento em tempo real de apostilas baixadas e certificados impressos pelos alunos.
                  </p>

                  <div className="divide-y divide-slate-100 text-xs">
                    {downloads.length > 0 ? (
                      downloads.map((dl) => (
                        <div key={dl.id} className="py-3 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-800">{dl.studentName}</span>
                            <p className="text-slate-600">{dl.courseTitle} — {dl.type === 'COURSE_PDF' ? 'Apostila em PDF' : 'Certificado'}</p>
                          </div>
                          <span className="text-slate-400 font-mono text-[11px]">
                            {new Date(dl.timestamp).toLocaleString('pt-BR')}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="py-6 text-center text-slate-400">Nenhum download registrado ainda.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Revocation Reason Dialog */}
      {revokingCertId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Revogar Certificado {revokingCertId}
            </h3>
            <p className="text-xs text-slate-600">
              Informe o motivo oficial da revogação deste certificado. O status mudará imediatamente para REVOGADO.
            </p>
            <input
              type="text"
              value={revocationReason}
              onChange={(e) => setRevocationReason(e.target.value)}
              placeholder="Ex: Não cumprimento dos requisitos ou fraude cadastral"
              className="w-full text-xs p-2.5 rounded border border-slate-300"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRevokingCertId(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleRevokeSubmit}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded"
              >
                Confirmar Revogação
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Order Reason Dialog */}
      {rejectingOrderId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Rejeitar Pedido {rejectingOrderId}
            </h3>
            <p className="text-xs text-slate-600">
              Indique o motivo pelo qual o comprovante não foi aceito:
            </p>
            <input
              type="text"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-slate-300"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectingOrderId(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleRejectSubmit}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded"
              >
                Confirmar Rejeição
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Single Order Dialog */}
      {deletingOrderId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Excluir Pedido {deletingOrderId}?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tem certeza que deseja excluir permanentemente este pedido e remover os acessos associados do aluno?
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingOrderId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteOrder(deletingOrderId);
                  setDeletingOrderId(null);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded cursor-pointer"
              >
                Sim, Excluir Pedido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Demo Orders Dialog */}
      {showClearAllModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Apagar Todos os Alunos Exemplos?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Esta ação vai remover <strong>todos os pedidos e matrículas de demonstração</strong> (como Juliana Mendes e Rodrigo Albuquerque) e certificados de teste.
              </p>
              <p className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 font-medium">
                ✓ Sua plataforma ficará 100% limpa (0 pedidos e 0 matrículas) para você começar a receber e gerenciar apenas suas vendas reais via PIX!
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowClearAllModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  clearDemoData();
                  setShowClearAllModal(false);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded cursor-pointer"
              >
                Sim, Apagar Tudo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Coupon Dialog */}
      {deletingCouponCode && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Excluir Cupom &quot;{deletingCouponCode}&quot;?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tem certeza que deseja excluir permanentemente este cupom de desconto? Clientes não poderão mais utilizá-lo na página de checkout.
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingCouponCode(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteCoupon(deletingCouponCode);
                  setDeletingCouponCode(null);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded cursor-pointer"
              >
                Sim, Excluir Cupom
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Edit/Create Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full space-y-4 shadow-2xl my-8">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              {isCreatingCourse ? 'Cadastrar Novo Curso' : `Editar Curso: ${editingCourse.title}`}
            </h3>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Título do Curso</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.title}
                    onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                    className="w-full p-2 rounded border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Slug URL</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.slug}
                    onChange={(e) => setEditingCourse({ ...editingCourse, slug: e.target.value })}
                    className="w-full p-2 rounded border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Preço Atual (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingCourse.price}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: Number(e.target.value) })}
                    className="w-full p-2 rounded border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Preço Original (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingCourse.originalPrice}
                    onChange={(e) => setEditingCourse({ ...editingCourse, originalPrice: Number(e.target.value) })}
                    className="w-full p-2 rounded border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Categoria</label>
                  <input
                    type="text"
                    value={editingCourse.category}
                    onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                    className="w-full p-2 rounded border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Carga Horária (Horas)</label>
                  <input
                    type="number"
                    value={editingCourse.durationHours}
                    onChange={(e) => setEditingCourse({ ...editingCourse, durationHours: Number(e.target.value) })}
                    className="w-full p-2 rounded border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descrição Curta</label>
                <textarea
                  rows={2}
                  value={editingCourse.shortDescription}
                  onChange={(e) => setEditingCourse({ ...editingCourse, shortDescription: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descrição Completa</label>
                <textarea
                  rows={3}
                  value={editingCourse.fullDescription}
                  onChange={(e) => setEditingCourse({ ...editingCourse, fullDescription: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={editingCourse.published}
                    onChange={(e) => setEditingCourse({ ...editingCourse, published: e.target.checked })}
                    className="w-4 h-4 rounded text-slate-900"
                  />
                  <span>Publicado na Plataforma</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={editingCourse.certificateEnabled}
                    onChange={(e) => setEditingCourse({ ...editingCourse, certificateEnabled: e.target.checked })}
                    className="w-4 h-4 rounded text-slate-900"
                  />
                  <span>Emitir Certificado</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCourse(null);
                    setIsCreatingCourse(false);
                  }}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-bold rounded"
                >
                  Salvar Curso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCertForModal && (
        <CertificateModal
          certificate={selectedCertForModal}
          onClose={() => setSelectedCertForModal(null)}
        />
      )}
    </div>
  );
};
