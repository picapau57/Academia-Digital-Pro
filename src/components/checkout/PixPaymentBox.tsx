import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Upload, AlertCircle, FileCheck, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { generatePixCopiaECola } from '../../services/paymentService';

interface PixPaymentBoxProps {
  courseId: string;
  courseTitle: string;
  amount: number;
  originalAmount: number;
  onSuccess: (orderId: string) => void;
}

export const PixPaymentBox: React.FC<PixPaymentBoxProps> = ({
  courseId,
  courseTitle,
  amount: initialAmount,
  originalAmount,
  onSuccess,
}) => {
  const { settings, currentUser, createOrder, applyCoupon, showToast, t } = useApp();

  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | undefined>(undefined);
  const [discountAmount, setDiscountAmount] = useState(originalAmount - initialAmount);
  const [finalAmount, setFinalAmount] = useState(initialAmount);

  // Receipt file state
  const [receiptFile, setReceiptFile] = useState<{ name: string; size: number; base64?: string } | null>(null);
  const [receiptError, setReceiptError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Student form state (if not already logged in)
  const [guestName, setGuestName] = useState(currentUser?.name || '');
  const [guestEmail, setGuestEmail] = useState(currentUser?.email || '');
  const [guestWhatsapp, setGuestWhatsapp] = useState(currentUser?.whatsapp || '');

  const pixPayload = generatePixCopiaECola(
    settings.pixKey,
    finalAmount,
    settings.pixReceiverName || 'ACADEMIA DIGITAL PRO',
    settings.pixCity || 'GOIANIA'
  );

  const handleCopyKey = () => {
    navigator.clipboard.writeText(settings.pixKey);
    setCopiedKey(true);
    showToast(t.checkout.keyCopied, 'success');
    setTimeout(() => setCopiedKey(false), 3000);
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(pixPayload);
    setCopiedPayload(true);
    showToast('Código PIX Copia e Cola copiado!', 'success');
    setTimeout(() => setCopiedPayload(false), 3000);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode, finalAmount);
    if (res.valid) {
      setAppliedCouponCode(res.coupon?.code);
      setDiscountAmount((prev) => prev + res.discount);
      setFinalAmount((prev) => Math.max(1, prev - res.discount));
      showToast(`Cupom ${res.coupon?.code} aplicado! Desconto de R$ ${res.discount.toFixed(2)}`, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiptError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 5MB (5 * 1024 * 1024 bytes)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setReceiptError('O arquivo excede o limite máximo permitido de 5 MB.');
      return;
    }

    // Check file type: jpg, jpeg, png, pdf
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setReceiptError('Formato inválido. Envie apenas arquivos JPG, PNG ou PDF.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setReceiptFile({
        name: file.name,
        size: file.size,
        base64: reader.result as string,
      });
      showToast('Comprovante anexado com sucesso!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const studentName = currentUser?.name || guestName.trim();
    const studentEmail = currentUser?.email || guestEmail.trim();
    const studentWhatsapp = currentUser?.whatsapp || guestWhatsapp.trim();

    if (!studentName || !studentEmail) {
      showToast('Por favor, informe seu nome completo e e-mail para acesso.', 'error');
      return;
    }

    if (!receiptFile) {
      setReceiptError('Você precisa anexar o comprovante do pagamento PIX para finalizar o pedido.');
      showToast('Por favor, anexe o comprovante de pagamento antes de prosseguir.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        studentId: currentUser?.id || `usr-${Date.now()}`,
        studentName,
        studentEmail,
        studentWhatsapp: studentWhatsapp || '(62) 99999-9999',
        courseId,
        courseTitle,
        amount: finalAmount,
        originalAmount,
        discountAmount,
        couponCode: appliedCouponCode,
        pixKeyUsed: settings.pixKey,
        paymentMethod: 'PIX',
        receiptFileName: receiptFile.name,
        receiptUrl: receiptFile.base64,
      });

      setIsSubmitting(false);
      onSuccess(order.id);
    }, 600);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Summary */}
      <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
            {t.checkout.summary}
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold">{courseTitle}</h2>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">{t.checkout.total}</span>
          <div className="flex items-baseline justify-end gap-1.5">
            <span className="text-sm font-semibold text-amber-400">R$</span>
            <span className="font-serif text-3xl font-extrabold text-white tabular-nums">
              {finalAmount.toFixed(2).replace('.', ',')}
            </span>
          </div>
          {discountAmount > 0 && (
            <span className="text-xs text-emerald-400 font-medium">
              Economia de R$ {discountAmount.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Guest User Information Form (if not logged in) */}
        {!currentUser && (
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              1. Dados do Aluno para Cadastro & Certificado
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Seu nome oficial"
                  className="w-full text-xs p-2.5 rounded border border-slate-300 focus:border-slate-900 focus:outline-hidden bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail de Acesso</label>
                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full text-xs p-2.5 rounded border border-slate-300 focus:border-slate-900 focus:outline-hidden bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp</label>
                <input
                  type="text"
                  value={guestWhatsapp}
                  onChange={(e) => setGuestWhatsapp(e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="w-full text-xs p-2.5 rounded border border-slate-300 focus:border-slate-900 focus:outline-hidden bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Coupon Section */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Cupom Promocional
          </span>
          <form onSubmit={handleApplyCoupon} className="flex gap-2 max-w-md">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Ex: BEMVINDO10, CURSO20"
                className="w-full pl-9 pr-3 py-2 text-xs uppercase font-mono rounded border border-slate-300 focus:border-slate-900 focus:outline-hidden bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.checkout.applyCoupon}
            </button>
          </form>
          {appliedCouponCode && (
            <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1 pt-1">
              <Check className="w-3.5 h-3.5" /> Cupom {appliedCouponCode} ativo no pedido.
            </p>
          )}
        </div>

        {/* PIX Payment Card */}
        <div className="border border-slate-200 rounded-lg p-6 bg-slate-50 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                PIX
              </div>
              <span className="font-bold text-sm text-slate-900">{t.checkout.pixTitle}</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">Chave Oficial Protegida</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left: PIX Key & Copy Buttons */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {t.checkout.pixKeyLabel} ({settings.pixKeyType}):
                </label>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-md border border-slate-300 font-mono text-sm font-bold text-slate-900">
                  <span className="flex-1 truncate">{settings.pixKey}</span>
                  <button
                    type="button"
                    onClick={handleCopyKey}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded cursor-pointer transition-colors shadow-xs"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey ? 'Copiada!' : t.checkout.copyKey}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Ou PIX Copia e Cola (Código EMV):
                </label>
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-md border border-slate-300 font-mono text-xs text-slate-600">
                  <span className="flex-1 truncate">{pixPayload}</span>
                  <button
                    type="button"
                    onClick={handleCopyPayload}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded cursor-pointer transition-colors"
                  >
                    {copiedPayload ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-500 space-y-1 pt-1">
                <p><strong>Favorecido:</strong> {settings.pixReceiverName}</p>
                <p><strong>Cidade:</strong> {settings.pixCity}</p>
              </div>
            </div>

            {/* Right: Step-by-Step Instructions */}
            <div className="bg-white p-4 rounded-md border border-slate-200 text-xs text-slate-600 space-y-2.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {t.checkout.instructionsTitle}
              </h4>
              <ol className="space-y-1.5 list-decimal pl-4">
                <li>{t.checkout.step1}</li>
                <li>{t.checkout.step2}</li>
                <li>{t.checkout.step3} <strong>(R$ {finalAmount.toFixed(2).replace('.', ',')})</strong></li>
                <li>{t.checkout.step4}</li>
                <li>{t.checkout.step5}</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Upload Receipt Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {t.checkout.uploadTitle} *
            </span>
            <span className="text-xs text-slate-500">{t.checkout.uploadHint}</span>
          </div>

          <div className="border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-lg p-6 text-center bg-slate-50/50 transition-colors">
            <input
              type="file"
              id="receipt-file-input"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="receipt-file-input"
              className="cursor-pointer flex flex-col items-center justify-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 underline">
                Clique aqui para anexar o comprovante do banco
              </span>
              <span className="text-[11px] text-slate-500">
                Tire uma foto do celular, anexe o print do app ou o arquivo PDF
              </span>
            </label>

            {receiptFile && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 flex items-center justify-between text-left">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-semibold">{receiptFile.name}</p>
                    <p className="text-[10px] text-emerald-700">
                      {(receiptFile.size / 1024).toFixed(1)} KB pronto para envio
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">Arquivo Pronto</span>
              </div>
            )}

            {receiptError && (
              <div className="mt-3 p-2.5 bg-rose-50 border border-rose-200 rounded text-xs text-rose-700 flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{receiptError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Submit Order Action Button */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Ao clicar, seu pedido será gerado e enviado para conferência imediata do time financeiro.
          </p>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmitOrder}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            {isSubmitting ? (
              <span>{t.checkout.processing}</span>
            ) : (
              <>
                <span>{t.checkout.confirmOrder}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
