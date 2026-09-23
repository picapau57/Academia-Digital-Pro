export type Language = 'pt' | 'en';
export type Theme = 'light' | 'dark';

export type UserRole = 'STUDENT' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  role: UserRole;
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: string;
  avatarUrl?: string;
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  introduction: string;
  learningObjective: string;
  explanation: string;
  examples: string[];
  practicalInstructions: string[];
  practicalActivity: string;
  importantPoints: string[];
  summary: string;
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  price: number;
  originalPrice: number;
  coverImage: string;
  published: boolean;
  category: string;
  learningObjectives: string[];
  modules: CourseModule[];
  finalProject: {
    title: string;
    description: string;
    deliverables: string[];
  };
  pdfFileName?: string;
  featured?: boolean;
  certificateEnabled?: boolean;
}

export type OrderStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'REFUNDED';

export interface Order {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentWhatsapp: string;
  courseId: string; // or 'bundle'
  courseTitle: string;
  amount: number;
  originalAmount: number;
  discountAmount: number;
  couponCode?: string;
  pixKeyUsed: string;
  paymentMethod: 'PIX';
  status: OrderStatus;
  receiptUrl?: string;
  receiptFileName?: string;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectReason?: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  progressPercent: number;
  completedLessonIds: string[];
  enrolledAt: string;
  completedAt?: string;
  certificateId?: string;
}

export interface Certificate {
  id: string; // e.g. ADP-2026-8F72K9
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  workloadHours: number;
  issueDate: string;
  status: 'VALID' | 'REVOKED';
  verificationUrl: string;
  securityHash: string;
  revocationReason?: string;
}

export interface Coupon {
  code: string;
  discountType: 'PERCENT' | 'FIXED';
  discountValue: number;
  active: boolean;
  maxUses: number;
  currentUses: number;
  minPurchase: number;
  expiresAt?: string;
}

export interface PlatformSettings {
  platformName: string;
  slogan: string;
  supportEmail: string;
  whatsappNumber: string;
  pixKey: string;
  pixKeyType: string;
  pixReceiverName: string;
  pixCity: string;
  currency: string;
  bundlePrice: number;
  bundleOriginalPrice: number;
  certificateSignatureName: string;
  certificateSignatureRole: string;
  footerText: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
}

export interface AuditLog {
  id: string;
  adminEmail: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface DownloadRecord {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  type: 'COURSE_PDF' | 'CERTIFICATE';
  timestamp: string;
}
