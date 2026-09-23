import { Coupon, PlatformSettings } from '../types';

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'BEMVINDO10',
    discountType: 'PERCENT',
    discountValue: 10,
    active: true,
    maxUses: 500,
    currentUses: 42,
    minPurchase: 20.0,
    expiresAt: '2027-12-31',
  },
  {
    code: 'CURSO20',
    discountType: 'PERCENT',
    discountValue: 20,
    active: true,
    maxUses: 200,
    currentUses: 18,
    minPurchase: 30.0,
    expiresAt: '2027-12-31',
  },
  {
    code: 'PROMO30',
    discountType: 'PERCENT',
    discountValue: 30,
    active: true,
    maxUses: 100,
    currentUses: 87,
    minPurchase: 45.0,
    expiresAt: '2027-12-31',
  },
];

export const INITIAL_SETTINGS: PlatformSettings = {
  platformName: 'Academia Digital Pro',
  slogan: 'Aprenda Hoje. Evolua Amanhã.',
  supportEmail: 'contato@academiadigitalpro.com.br',
  whatsappNumber: '5562984289911',
  pixKey: '(62) 98428-9911',
  pixKeyType: 'Telefone / Phone',
  pixReceiverName: 'Academia Digital Pro Treinamentos Ltda',
  pixCity: 'Goiânia - GO',
  currency: 'BRL',
  bundlePrice: 97.0,
  bundleOriginalPrice: 239.4,
  certificateSignatureName: 'Diretoria de Ensino e Certificação',
  certificateSignatureRole: 'Academia Digital Pro',
  footerText: 'Academia Digital Pro — Cursos livres e capacitação profissional continuada em conformidade com as diretrizes educacionais brasileiras. Todos os direitos reservados.',
  instagramUrl: 'https://instagram.com',
  youtubeUrl: 'https://youtube.com',
  linkedinUrl: 'https://linkedin.com',
};
