import { AuditLog, Certificate, Coupon, Course, DownloadRecord, Enrollment, Language, Order, PlatformSettings, Theme, User } from '../types';
import { INITIAL_COURSES } from '../data/initialCourses';
import { INITIAL_COUPONS, INITIAL_SETTINGS } from '../data/initialSettings';

// Default Demo User & Admin User
export const DEMO_STUDENT: User = {
  id: 'usr-student-01',
  name: 'Juliana Mendes Silva',
  email: 'juliana.aluna@email.com',
  whatsapp: '(11) 98765-4321',
  role: 'STUDENT',
  status: 'ACTIVE',
  createdAt: '2026-03-01T10:00:00Z',
};

export const DEMO_ADMIN: User = {
  id: 'usr-admin-01',
  name: 'Administrador Academia Pro',
  email: 'admin@academiadigitalpro.com.br',
  whatsapp: '(62) 98428-9911',
  role: 'SUPER_ADMIN',
  status: 'ACTIVE',
  createdAt: '2026-01-01T00:00:00Z',
};

// Initial Demo Certificate
export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'ADP-2026-8F72K9',
    studentId: 'usr-student-01',
    studentName: 'Juliana Mendes Silva',
    courseId: 'course-1',
    courseTitle: 'Marketing Digital para Iniciantes',
    workloadHours: 8,
    issueDate: '2026-03-15',
    status: 'VALID',
    verificationUrl: 'https://academiadigitalpro.com.br/verificar-certificado/ADP-2026-8F72K9',
    securityHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  },
  {
    id: 'ADP-2026-3M19X4',
    studentId: 'usr-student-02',
    studentName: 'Carlos Eduardo Nogueira',
    courseId: 'course-4',
    courseTitle: 'Inteligência Artificial para o Dia a Dia e Negócios',
    workloadHours: 8,
    issueDate: '2026-03-10',
    status: 'VALID',
    verificationUrl: 'https://academiadigitalpro.com.br/verificar-certificado/ADP-2026-3M19X4',
    securityHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
  },
];

// Initial Demo Enrollments
export const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr-01',
    studentId: 'usr-student-01',
    courseId: 'course-1',
    progressPercent: 100,
    completedLessonIds: ['l1-1', 'l1-2', 'l1-3', 'l2-1', 'l2-2', 'l3-1', 'l4-1', 'l5-1', 'l6-1', 'l7-1', 'l8-1'],
    enrolledAt: '2026-03-01T10:15:00Z',
    completedAt: '2026-03-15T14:30:00Z',
    certificateId: 'ADP-2026-8F72K9',
  },
  {
    id: 'enr-02',
    studentId: 'usr-student-01',
    courseId: 'course-3',
    progressPercent: 40,
    completedLessonIds: ['lc1-1', 'lc2-1', 'lc3-1', 'lc4-1'],
    enrolledAt: '2026-03-16T09:00:00Z',
  },
];

// Initial Demo Orders
export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-00031',
    studentId: 'usr-student-01',
    studentName: 'Juliana Mendes Silva',
    studentEmail: 'juliana.aluna@email.com',
    studentWhatsapp: '(11) 98765-4321',
    courseId: 'course-1',
    courseTitle: 'Marketing Digital para Iniciantes',
    amount: 39.90,
    originalAmount: 97.00,
    discountAmount: 57.10,
    pixKeyUsed: '(62) 98428-9911',
    paymentMethod: 'PIX',
    status: 'APPROVED',
    receiptFileName: 'comprovante_pix_juliana.pdf',
    createdAt: '2026-03-01T10:05:00Z',
    reviewedAt: '2026-03-01T10:15:00Z',
    reviewedBy: 'admin@academiadigitalpro.com.br',
  },
  {
    id: 'ORD-2026-00032',
    studentId: 'usr-student-01',
    studentName: 'Juliana Mendes Silva',
    studentEmail: 'juliana.aluna@email.com',
    studentWhatsapp: '(11) 98765-4321',
    courseId: 'course-3',
    courseTitle: 'Canva para Iniciantes — Criação de Artes Profissionais',
    amount: 29.90,
    originalAmount: 79.00,
    discountAmount: 49.10,
    pixKeyUsed: '(62) 98428-9911',
    paymentMethod: 'PIX',
    status: 'APPROVED',
    receiptFileName: 'comprovante_canva.jpg',
    createdAt: '2026-03-16T08:45:00Z',
    reviewedAt: '2026-03-16T09:00:00Z',
    reviewedBy: 'admin@academiadigitalpro.com.br',
  },
  {
    id: 'ORD-2026-00045',
    studentId: 'usr-student-03',
    studentName: 'Rodrigo Albuquerque Castro',
    studentEmail: 'rodrigo.castro@gmail.com',
    studentWhatsapp: '(62) 99876-1122',
    courseId: 'bundle',
    courseTitle: 'PACOTE COMPLETO — 6 CURSOS',
    amount: 87.30,
    originalAmount: 97.00,
    discountAmount: 9.70,
    couponCode: 'BEMVINDO10',
    pixKeyUsed: '(62) 98428-9911',
    paymentMethod: 'PIX',
    status: 'PENDING',
    receiptFileName: 'comprovante_pix_banco_inter.png',
    createdAt: '2026-03-22T14:10:00Z',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    adminEmail: 'admin@academiadigitalpro.com.br',
    action: 'Aprovação de Pagamento',
    details: 'Aprovado pedido ORD-2026-00031 e liberada matrícula do curso Marketing Digital para Juliana Mendes.',
    timestamp: '2026-03-01T10:15:00Z',
  },
  {
    id: 'log-2',
    adminEmail: 'admin@academiadigitalpro.com.br',
    action: 'Emissão de Certificado',
    details: 'Emitido certificado ADP-2026-8F72K9 após 100% de conclusão do curso.',
    timestamp: '2026-03-15T14:30:00Z',
  },
  {
    id: 'log-3',
    adminEmail: 'admin@academiadigitalpro.com.br',
    action: 'Atualização de Configurações',
    details: 'Verificada e validada a Chave PIX oficial da plataforma.',
    timestamp: '2026-03-20T08:00:00Z',
  },
];

// Helper methods to interact with localStorage
export const storage = {
  getLanguage(): Language {
    return (localStorage.getItem('adp_lang') as Language) || 'pt';
  },
  setLanguage(lang: Language): void {
    localStorage.setItem('adp_lang', lang);
  },

  getTheme(): Theme {
    try {
      const saved = localStorage.getItem('adp_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // fallback
    }
    return 'light';
  },
  setTheme(theme: Theme): void {
    try {
      localStorage.setItem('adp_theme', theme);
    } catch {
      // fallback
    }
  },

  getUser(): User | null {
    const data = localStorage.getItem('adp_user');
    return data ? JSON.parse(data) : DEMO_STUDENT;
  },
  setUser(user: User | null): void {
    if (user) {
      localStorage.setItem('adp_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('adp_user');
    }
  },

  getCourses(): Course[] {
    const data = localStorage.getItem('adp_courses');
    if (!data) return INITIAL_COURSES;
    try {
      const parsed: Course[] = JSON.parse(data);
      // Migrate old /src/assets/images/ paths to /images/ and sync default cover images
      return parsed.map((course) => {
        const initialMatch = INITIAL_COURSES.find((ic) => ic.id === course.id);
        let coverImage = course.coverImage;
        if (coverImage && coverImage.startsWith('/src/assets/images/')) {
          coverImage = coverImage.replace('/src/assets/images/', '/images/');
        }
        // If the cover was still pointing to the old duplicated marketing or canva cover, update to the dedicated one
        if (initialMatch && coverImage && initialMatch.coverImage !== coverImage) {
          coverImage = initialMatch.coverImage;
        }
        return {
          ...course,
          coverImage: coverImage || (initialMatch ? initialMatch.coverImage : '/images/course_marketing_cover_1790119321192.jpg'),
        };
      });
    } catch {
      return INITIAL_COURSES;
    }
  },
  setCourses(courses: Course[]): void {
    localStorage.setItem('adp_courses', JSON.stringify(courses));
  },

  getOrders(): Order[] {
    const data = localStorage.getItem('adp_orders');
    return data ? JSON.parse(data) : INITIAL_ORDERS;
  },
  setOrders(orders: Order[]): void {
    localStorage.setItem('adp_orders', JSON.stringify(orders));
  },

  getEnrollments(): Enrollment[] {
    const data = localStorage.getItem('adp_enrollments');
    return data ? JSON.parse(data) : INITIAL_ENROLLMENTS;
  },
  setEnrollments(enrollments: Enrollment[]): void {
    localStorage.setItem('adp_enrollments', JSON.stringify(enrollments));
  },

  getCertificates(): Certificate[] {
    const data = localStorage.getItem('adp_certificates');
    return data ? JSON.parse(data) : INITIAL_CERTIFICATES;
  },
  setCertificates(certs: Certificate[]): void {
    localStorage.setItem('adp_certificates', JSON.stringify(certs));
  },

  getCoupons(): Coupon[] {
    const data = localStorage.getItem('adp_coupons');
    return data ? JSON.parse(data) : INITIAL_COUPONS;
  },
  setCoupons(coupons: Coupon[]): void {
    localStorage.setItem('adp_coupons', JSON.stringify(coupons));
  },

  getSettings(): PlatformSettings {
    const data = localStorage.getItem('adp_settings');
    return data ? JSON.parse(data) : INITIAL_SETTINGS;
  },
  setSettings(settings: PlatformSettings): void {
    localStorage.setItem('adp_settings', JSON.stringify(settings));
  },

  getAuditLogs(): AuditLog[] {
    const data = localStorage.getItem('adp_audit_logs');
    return data ? JSON.parse(data) : INITIAL_AUDIT_LOGS;
  },
  addAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'>): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('adp_audit_logs', JSON.stringify([newLog, ...logs]));
  },

  getDownloads(): DownloadRecord[] {
    const data = localStorage.getItem('adp_downloads');
    return data ? JSON.parse(data) : [];
  },
  recordDownload(record: Omit<DownloadRecord, 'id' | 'timestamp'>): void {
    const list = this.getDownloads();
    const item: DownloadRecord = {
      ...record,
      id: `dl-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('adp_downloads', JSON.stringify([item, ...list]));
  },
};
