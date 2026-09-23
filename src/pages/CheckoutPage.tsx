import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PixPaymentBox } from '../components/checkout/PixPaymentBox';
import { CheckCircle2, Clock, ArrowRight, ShieldCheck, Layers, BookOpen } from 'lucide-react';

interface CheckoutPageProps {
  courseSlugOrBundle: string;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ courseSlugOrBundle }) => {
  const { courses, settings, navigateTo, t } = useApp();
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  const isBundle = courseSlugOrBundle === 'bundle';
  const course = !isBundle ? courses.find((c) => c.slug === courseSlugOrBundle) : null;

  if (!isBundle && !course) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-slate-900">Curso não encontrado</h1>
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

  const courseTitle = isBundle ? 'PACOTE COMPLETO — 6 CURSOS' : course!.title;
  const courseId = isBundle ? 'bundle' : course!.id;
  const amount = isBundle ? settings.bundlePrice : course!.price;
  const originalAmount = isBundle ? settings.bundleOriginalPrice : course!.originalPrice;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
          Ambiente Seguro de Matrícula
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-950">
          {t.checkout.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t.checkout.subtitle}
        </p>
      </div>

      {completedOrderId ? (
        /* Order Success & Pending Review Banner */
        <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center space-y-6 shadow-md">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              {t.checkout.orderSuccessTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.checkout.orderSuccessDesc}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 inline-block text-xs font-mono text-slate-800">
            <strong>Número do Pedido:</strong> {completedOrderId}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('/aluno')}
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.checkout.goToDashboard}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/cursos')}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Continuar Navegando
            </button>
          </div>
        </div>
      ) : (
        /* Checkout Box with PIX & Receipt */
        <PixPaymentBox
          courseId={courseId}
          courseTitle={courseTitle}
          amount={amount}
          originalAmount={originalAmount}
          onSuccess={(id) => setCompletedOrderId(id)}
        />
      )}

      {/* Trust & Guarantee Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 pt-4">
        <div className="p-4 bg-white rounded-lg border border-slate-200 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Garantia de 7 dias com estorno assegurado por lei.</span>
        </div>
        <div className="p-4 bg-white rounded-lg border border-slate-200 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-sky-600 shrink-0" />
          <span>Materiais didáticos em PDF inclusos para download.</span>
        </div>
        <div className="p-4 bg-white rounded-lg border border-slate-200 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
          <span>Certificados válidos emitidos com verificação online.</span>
        </div>
      </div>
    </div>
  );
};
