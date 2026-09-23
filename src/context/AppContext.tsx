import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AuditLog,
  Certificate,
  Coupon,
  Course,
  DownloadRecord,
  Enrollment,
  Language,
  Order,
  PlatformSettings,
  Theme,
  User,
} from '../types';
import { DEMO_ADMIN, DEMO_STUDENT, storage } from '../services/storage';
import { translations, AppTranslations } from '../i18n';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  // Localization & Theme
  language: Language;
  setLanguage: (lang: Language) => void;
  t: AppTranslations;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Auth & User
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loginAsStudent: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
  registerUser: (name: string, email: string, whatsapp: string) => User;

  // Data Collections
  courses: Course[];
  orders: Order[];
  enrollments: Enrollment[];
  certificates: Certificate[];
  coupons: Coupon[];
  settings: PlatformSettings;
  auditLogs: AuditLog[];
  downloads: DownloadRecord[];

  // Mutations
  updateCourse: (updated: Course) => void;
  createCourse: (newCourse: Course) => void;
  deleteCourse: (courseId: string) => void;
  updateSettings: (newSettings: PlatformSettings) => void;
  applyCoupon: (code: string, currentTotal: number) => { valid: boolean; discount: number; coupon?: Coupon; message: string };

  // Orders & Payment
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  approveOrder: (orderId: string) => void;
  rejectOrder: (orderId: string, reason?: string) => void;
  refundOrder: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;
  clearDemoData: () => void;

  // Learning & LMS
  toggleLessonCompletion: (courseId: string, lessonId: string) => void;
  getEnrollmentForCourse: (courseId: string) => Enrollment | undefined;
  issueCertificate: (courseId: string, studentId: string) => Certificate;
  revokeCertificate: (certificateId: string, reason: string) => void;
  deleteCertificate: (certificateId: string) => void;
  recordFileDownload: (courseId: string, courseTitle: string, type: 'COURSE_PDF' | 'CERTIFICATE') => void;

  // UI Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;

  // Navigation state
  currentRoute: string;
  navigateTo: (route: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => storage.getLanguage());
  const [theme, setThemeState] = useState<Theme>(() => storage.getTheme());
  const [currentUser, setCurrentUserState] = useState<User | null>(() => storage.getUser());
  const [courses, setCoursesState] = useState<Course[]>(() => storage.getCourses());
  const [orders, setOrdersState] = useState<Order[]>(() => storage.getOrders());
  const [enrollments, setEnrollmentsState] = useState<Enrollment[]>(() => storage.getEnrollments());
  const [certificates, setCertificatesState] = useState<Certificate[]>(() => storage.getCertificates());
  const [coupons, setCouponsState] = useState<Coupon[]>(() => storage.getCoupons());
  const [settings, setSettingsState] = useState<PlatformSettings>(() => storage.getSettings());
  const [auditLogs, setAuditLogsState] = useState<AuditLog[]>(() => storage.getAuditLogs());
  const [downloads, setDownloadsState] = useState<DownloadRecord[]>(() => storage.getDownloads());

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname && window.location.pathname !== '/' ? window.location.pathname : '/';
  });

  // Sync route with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    storage.setLanguage(lang);
    showToast(lang === 'pt' ? 'Idioma alterado para Português' : 'Language changed to English', 'success');
  };

  const t = translations[language];

  // Theme synchronization with DOM and localStorage
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      root.style.colorScheme = theme;
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    storage.setTheme(newTheme);
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (newTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      root.style.colorScheme = newTheme;
    }
    showToast(newTheme === 'dark' ? t.theme.switchedToDark : t.theme.switchedToLight, 'info');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Auth actions
  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    storage.setUser(user);
  };

  const loginAsStudent = () => {
    setCurrentUser(DEMO_STUDENT);
    showToast(`Bem-vindo(a), ${DEMO_STUDENT.name}!`, 'success');
    navigateTo('/aluno');
  };

  const loginAsAdmin = () => {
    setCurrentUser(DEMO_ADMIN);
    showToast('Acesso de Administrador liberado!', 'success');
    navigateTo('/admin');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Sessão encerrada com sucesso.', 'info');
    navigateTo('/');
  };

  const registerUser = (name: string, email: string, whatsapp: string): User => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      whatsapp,
      role: 'STUDENT',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(newUser);
    showToast(`Conta criada com sucesso! Olá, ${name}!`, 'success');
    return newUser;
  };

  // Course mutations
  const updateCourse = (updated: Course) => {
    const next = courses.map((c) => (c.id === updated.id ? updated : c));
    setCoursesState(next);
    storage.setCourses(next);
    storage.addAuditLog({
      adminEmail: currentUser?.email || 'admin@academiadigitalpro.com.br',
      action: 'Atualização de Curso',
      details: `Curso "${updated.title}" editado.`,
    });
    setAuditLogsState(storage.getAuditLogs());
    showToast('Curso atualizado com sucesso!', 'success');
  };

  const createCourse = (newCourse: Course) => {
    const next = [...courses, newCourse];
    setCoursesState(next);
    storage.setCourses(next);
    storage.addAuditLog({
      adminEmail: currentUser?.email || 'admin@academiadigitalpro.com.br',
      action: 'Criação de Curso',
      details: `Novo curso "${newCourse.title}" cadastrado.`,
    });
    setAuditLogsState(storage.getAuditLogs());
    showToast('Novo curso publicado com sucesso!', 'success');
  };

  const deleteCourse = (courseId: string) => {
    const next = courses.filter((c) => c.id !== courseId);
    setCoursesState(next);
    storage.setCourses(next);
    storage.addAuditLog({
      adminEmail: currentUser?.email || 'admin@academiadigitalpro.com.br',
      action: 'Exclusão de Curso',
      details: `Curso ID ${courseId} removido da plataforma.`,
    });
    setAuditLogsState(storage.getAuditLogs());
    showToast('Curso removido.', 'info');
  };

  const updateSettings = (newSettings: PlatformSettings) => {
    setSettingsState(newSettings);
    storage.setSettings(newSettings);
    storage.addAuditLog({
      adminEmail: currentUser?.email || 'admin@academiadigitalpro.com.br',
      action: 'Atualização de Configurações',
      details: `Chave PIX atualizada para "${newSettings.pixKey}" e dados da plataforma salvos.`,
    });
    setAuditLogsState(storage.getAuditLogs());
    showToast(t.settings.savedSuccess, 'success');
  };

  const applyCoupon = (code: string, currentTotal: number) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode && c.active);

    if (!found) {
      return { valid: false, discount: 0, message: t.checkout.invalidCoupon };
    }

    if (found.currentUses >= found.maxUses) {
      return { valid: false, discount: 0, message: 'Este cupom atingiu o limite máximo de utilizações.' };
    }

    if (currentTotal < found.minPurchase) {
      return {
        valid: false,
        discount: 0,
        message: `Valor mínimo para este cupom é R$ ${found.minPurchase.toFixed(2)}.`,
      };
    }

    let discount = 0;
    if (found.discountType === 'PERCENT') {
      discount = (currentTotal * found.discountValue) / 100;
    } else {
      discount = found.discountValue;
    }

    return {
      valid: true,
      discount: Math.min(discount, currentTotal),
      coupon: found,
      message: t.checkout.couponApplied,
    };
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
    };
    const nextOrders = [newOrder, ...orders];
    setOrdersState(nextOrders);
    storage.setOrders(nextOrders);

    // If a coupon was used, increment usage
    if (orderData.couponCode) {
      const nextCoupons = coupons.map((c) =>
        c.code === orderData.couponCode ? { ...c, currentUses: c.currentUses + 1 } : c
      );
      setCouponsState(nextCoupons);
      storage.setCoupons(nextCoupons);
    }

    showToast(t.checkout.orderSuccessTitle, 'success');
    return newOrder;
  };

  const approveOrder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    const nextOrders = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            status: 'APPROVED' as const,
            reviewedAt: new Date().toISOString(),
            reviewedBy: currentUser?.email || 'admin@academiadigitalpro.com.br',
          }
        : o
    );
    setOrdersState(nextOrders);
    storage.setOrders(nextOrders);

    // Create enrollments for student
    const studentId = order.studentId;
    let nextEnrollments = [...enrollments];

    if (order.courseId === 'bundle') {
      // Enroll in all 6 courses
      courses.forEach((c) => {
        const exists = nextEnrollments.some((e) => e.studentId === studentId && e.courseId === c.id);
        if (!exists) {
          nextEnrollments.push({
            id: `enr-${Date.now()}-${c.id}`,
            studentId,
            courseId: c.id,
            progressPercent: 0,
            completedLessonIds: [],
            enrolledAt: new Date().toISOString(),
          });
        }
      });
    } else {
      const exists = nextEnrollments.some((e) => e.studentId === studentId && e.courseId === order.courseId);
      if (!exists) {
        nextEnrollments.push({
          id: `enr-${Date.now()}-${order.courseId}`,
          studentId,
          courseId: order.courseId,
          progressPercent: 0,
          completedLessonIds: [],
          enrolledAt: new Date().toISOString(),
        });
      }
    }

    setEnrollmentsState(nextEnrollments);
    storage.setEnrollments(nextEnrollments);

    storage.addAuditLog({
      adminEmail: currentUser?.email || 'admin@academiadigitalpro.com.br',
      action: 'Aprovação de Pagamento',
      details: `Pedido ${orderId} aprovado. Matrícula liberada para ${order.studentName}.`,
    });
    setAuditLogsState(storage.getAuditLogs());

    showToast(`Pagamento do pedido ${orderId} aprovado com sucesso! Matrícula ativada.`, 'success');
  };

  const rejectOrder = (orderId: string, reason?: string) => {
    const nextOrders = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            status: 'REJECTED' as const,
            reviewedAt: new Date().toISOString(),
            reviewedBy: currentUser?.email || 'admin@academiadigitalpro.com.br',
            rejectReason: reason || 'Comprovante ilegível ou valor divergente do pedido.',
          }
        : o
    );
    setOrdersState(nextOrders);
    storage.setOrders(nextOrders);

    storage.addAuditLog({
      adminEmail: currentUser?.email || 'admin@academiadigitalpro.com.br',
      action: 'Rejeição de Pagamento',
      details: `Pedido ${orderId} rejeitado. Motivo: ${reason || 'Comprovante ilegível'}.`,
    });
    setAuditLogsState(storage.getAuditLogs());

    showToast(`Pedido ${orderId} marcado como Rejeitado.`, 'info');
  };

  const refundOrder = (orderId: string) => {
    const nextOrders = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            status: 'REFUNDED' as const,
            reviewedAt: new Date().toISOString(),
            reviewedBy: currentUser?.email || 'admin@academiadigitalpro.com.br',
          }
        : o
    );
    setOrdersState(nextOrders);
    storage.setOrders(nextOrders);

    storage.addAuditLog({
      adminEmail: currentUser?.email || 'admin@academiadigitalpro.com.br',
      action: 'Estorno de Pagamento',
      details: `Pedido ${orderId} estornado ao cliente.`,
    });
    setAuditLogsState(storage.getAuditLogs());

    showToast(`Pedido ${orderId} marcado como Estornado.`, 'info');
  };

  const deleteOrder = (orderId: string) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;

    const nextOrders = orders.filter((o) => o.id !== orderId);
    setOrdersState(nextOrders);
    storage.setOrders(nextOrders);

    // If student has no other approved orders, remove their enrollment
    if (target.status === 'APPROVED') {
      const otherApprovedOrders = nextOrders.filter(
        (o) => o.studentId === target.studentId && o.status === 'APPROVED'
      );
      if (otherApprovedOrders.length === 0) {
        const nextEnrollments = enrollments.filter((e) => e.studentId !== target.studentId);
        setEnrollmentsState(nextEnrollments);
        storage.setEnrollments(nextEnrollments);
      }
    }

    storage.addAuditLog({
      adminEmail: currentUser?.email || 'admin@academiadigitalpro.com.br',
      action: 'Exclusão de Pedido',
      details: `Pedido ${orderId} (${target.studentName} — ${target.courseTitle}) excluído da plataforma.`,
    });
    setAuditLogsState(storage.getAuditLogs());
    showToast(`Pedido ${orderId} excluído com sucesso.`, 'info');
  };

  const clearDemoData = () => {
    setOrdersState([]);
    storage.setOrders([]);

    setEnrollmentsState([]);
    storage.setEnrollments([]);

    setCertificatesState([]);
    storage.setCertificates([]);

    storage.addAuditLog({
      adminEmail: currentUser?.email || 'admin@academiadigitalpro.com.br',
      action: 'Limpeza de Dados de Teste',
      details: 'Todos os pedidos, alunos de demonstração e certificados de exemplo foram excluídos pelo administrador.',
    });
    setAuditLogsState(storage.getAuditLogs());
    showToast('Todos os alunos e pedidos de teste foram apagados com sucesso!', 'success');
  };

  // Learning / LMS methods
  const getEnrollmentForCourse = (courseId: string) => {
    if (!currentUser) return undefined;
    return enrollments.find((e) => e.studentId === currentUser.id && e.courseId === courseId);
  };

  const toggleLessonCompletion = (courseId: string, lessonId: string) => {
    if (!currentUser) return;
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    // Total lessons in course
    const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
    const totalLessons = allLessonIds.length || 1;

    let currentEnrollment = enrollments.find((e) => e.studentId === currentUser.id && e.courseId === courseId);

    // If student isn't explicitly enrolled (e.g. admin testing), create enrollment
    let completedLessonIds: string[] = currentEnrollment ? [...currentEnrollment.completedLessonIds] : [];

    const isAlreadyCompleted = completedLessonIds.includes(lessonId);
    if (isAlreadyCompleted) {
      completedLessonIds = completedLessonIds.filter((id) => id !== lessonId);
    } else {
      completedLessonIds.push(lessonId);
    }

    const progressPercent = Math.min(100, Math.round((completedLessonIds.length / totalLessons) * 100));
    const isNowFinished = progressPercent === 100;

    let updatedEnrollment: Enrollment;
    if (currentEnrollment) {
      updatedEnrollment = {
        ...currentEnrollment,
        completedLessonIds,
        progressPercent,
        completedAt: isNowFinished ? currentEnrollment.completedAt || new Date().toISOString() : undefined,
      };
      const nextEnrollments = enrollments.map((e) => (e.id === currentEnrollment!.id ? updatedEnrollment : e));
      setEnrollmentsState(nextEnrollments);
      storage.setEnrollments(nextEnrollments);
    } else {
      updatedEnrollment = {
        id: `enr-${Date.now()}`,
        studentId: currentUser.id,
        courseId,
        completedLessonIds,
        progressPercent,
        enrolledAt: new Date().toISOString(),
        completedAt: isNowFinished ? new Date().toISOString() : undefined,
      };
      const nextEnrollments = [...enrollments, updatedEnrollment];
      setEnrollmentsState(nextEnrollments);
      storage.setEnrollments(nextEnrollments);
    }

    if (isNowFinished && !isAlreadyCompleted) {
      // Auto issue certificate if not already issued
      issueCertificate(courseId, currentUser.id);
      showToast(t.course.congratulations, 'success');
    } else {
      showToast(isAlreadyCompleted ? 'Aula desmarcada.' : 'Aula marcada como concluída! Parabéns!', 'success');
    }
  };

  const issueCertificate = (courseId: string, studentId: string): Certificate => {
    const course = courses.find((c) => c.id === courseId);
    const student = currentUser?.id === studentId ? currentUser : DEMO_STUDENT;

    // Check if already exists
    const existing = certificates.find((c) => c.courseId === courseId && c.studentId === studentId);
    if (existing) return existing;

    const certId = `ADP-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const newCert: Certificate = {
      id: certId,
      studentId,
      studentName: student?.name || 'Aluno Concluinte',
      courseId,
      courseTitle: course?.title || 'Curso Digital de Capacitação',
      workloadHours: course?.durationHours || 8,
      issueDate: new Date().toISOString().split('T')[0],
      status: 'VALID',
      verificationUrl: `https://academiadigitalpro.com.br/verificar-certificado/${certId}`,
      securityHash: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
    };

    const nextCerts = [newCert, ...certificates];
    setCertificatesState(nextCerts);
    storage.setCertificates(nextCerts);

    // Update enrollment certificateId
    const nextEnrollments = enrollments.map((e) =>
      e.studentId === studentId && e.courseId === courseId ? { ...e, certificateId: certId } : e
    );
    setEnrollmentsState(nextEnrollments);
    storage.setEnrollments(nextEnrollments);

    storage.addAuditLog({
      adminEmail: currentUser?.email || 'sistema@academiadigitalpro.com.br',
      action: 'Emissão de Certificado',
      details: `Certificado ${certId} emitido para ${student?.name} (${course?.title}).`,
    });
    setAuditLogsState(storage.getAuditLogs());

    return newCert;
  };

  const revokeCertificate = (certificateId: string, reason: string) => {
    const nextCerts = certificates.map((c) =>
      c.id === certificateId ? { ...c, status: 'REVOKED' as const, revocationReason: reason } : c
    );
    setCertificatesState(nextCerts);
    storage.setCertificates(nextCerts);

    storage.addAuditLog({
      adminEmail: currentUser?.email || 'admin@academiadigitalpro.com.br',
      action: 'Revogação de Certificado',
      details: `Certificado ${certificateId} revogado. Motivo: ${reason}.`,
    });
    setAuditLogsState(storage.getAuditLogs());

    showToast(`Certificado ${certificateId} foi revogado com sucesso.`, 'info');
  };

  const deleteCertificate = (certificateId: string) => {
    const nextCerts = certificates.filter((c) => c.id !== certificateId);
    setCertificatesState(nextCerts);
    storage.setCertificates(nextCerts);

    storage.addAuditLog({
      adminEmail: currentUser?.email || 'admin@academiadigitalpro.com.br',
      action: 'Exclusão de Certificado',
      details: `Certificado ${certificateId} excluído do sistema.`,
    });
    setAuditLogsState(storage.getAuditLogs());
    showToast(`Certificado ${certificateId} excluído com sucesso.`, 'info');
  };

  const recordFileDownload = (courseId: string, courseTitle: string, type: 'COURSE_PDF' | 'CERTIFICATE') => {
    storage.recordDownload({
      courseId,
      courseTitle,
      type,
      studentId: currentUser?.id || 'visitante',
      studentName: currentUser?.name || 'Visitante/Aluno',
    });
    setDownloadsState(storage.getDownloads());
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        setTheme,
        toggleTheme,
        currentUser,
        setCurrentUser,
        loginAsStudent,
        loginAsAdmin,
        logout,
        registerUser,
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
        applyCoupon,
        createOrder,
        approveOrder,
        rejectOrder,
        refundOrder,
        deleteOrder,
        clearDemoData,
        toggleLessonCompletion,
        getEnrollmentForCourse,
        issueCertificate,
        revokeCertificate,
        deleteCertificate,
        recordFileDownload,
        toasts,
        showToast,
        dismissToast,
        currentRoute,
        navigateTo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
