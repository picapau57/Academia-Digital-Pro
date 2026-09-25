import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { ToastContainer } from './components/common/ToastContainer';
import { GoogleAdSenseTracker } from './components/common/GoogleAdSenseTracker';

// Pages
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { CoursePlayerPage } from './pages/CoursePlayerPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CertificateVerifyPage } from './pages/CertificateVerifyPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { CertificatesInfoPage } from './pages/CertificatesInfoPage';
import { AboutPage, ContactPage } from './pages/AboutContactPages';
import { TermsPage, PrivacyPage, RefundPage } from './pages/LegalPages';
import { LoginPage } from './pages/LoginPage';

const RouterView: React.FC = () => {
  const { currentRoute } = useApp();

  // Root Homepage
  if (currentRoute === '/' || currentRoute === '') {
    return <HomePage />;
  }

  // Course Catalog
  if (currentRoute === '/cursos') {
    return <CoursesPage />;
  }

  // Course Detail: /cursos/:slug
  if (currentRoute.startsWith('/cursos/')) {
    const slug = currentRoute.replace('/cursos/', '');
    return <CourseDetailPage slug={slug} />;
  }

  // Checkout: /checkout/:slugOrBundle
  if (currentRoute.startsWith('/checkout/')) {
    const slug = currentRoute.replace('/checkout/', '');
    return <CheckoutPage courseSlugOrBundle={slug} />;
  }

  // Student Classroom: /aluno/curso/:slug
  if (currentRoute.startsWith('/aluno/curso/')) {
    const slug = currentRoute.replace('/aluno/curso/', '');
    return <CoursePlayerPage slug={slug} />;
  }

  // Student Portal / Dashboard
  if (currentRoute === '/aluno') {
    return <StudentDashboardPage />;
  }

  // Admin Dashboard
  if (currentRoute === '/admin') {
    return <AdminDashboardPage />;
  }

  // Certificate Verification (public tool with optional ID)
  if (currentRoute.startsWith('/verificar-certificado')) {
    const pathParts = currentRoute.split('/').filter(Boolean);
    const initialId = pathParts.length > 1 ? pathParts[1] : undefined;
    return <CertificateVerifyPage initialId={initialId} />;
  }

  // How It Works
  if (currentRoute === '/como-funciona') {
    return <HowItWorksPage />;
  }

  // Certificates Information
  if (currentRoute === '/certificados') {
    return <CertificatesInfoPage />;
  }

  // About Platform
  if (currentRoute === '/sobre') {
    return <AboutPage />;
  }

  // Contact & Support
  if (currentRoute === '/contato') {
    return <ContactPage />;
  }

  // Auth / Login
  if (currentRoute === '/login') {
    return <LoginPage />;
  }

  // Legal Pages
  if (currentRoute === '/termos-de-uso') {
    return <TermsPage />;
  }

  if (currentRoute === '/politica-de-privacidade') {
    return <PrivacyPage />;
  }

  if (currentRoute === '/politica-de-reembolso') {
    return <RefundPage />;
  }

  // Fallback to Home
  return <HomePage />;
};

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900 transition-colors duration-150">
      <GoogleAdSenseTracker />
      <Header />
      <main className="flex-1">
        <RouterView />
      </main>
      <Footer />
      <WhatsAppButton />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
