import React from 'react';
import { Certificate } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Printer, CheckCircle, ShieldAlert, Award, QrCode } from 'lucide-react';

interface CertificateModalProps {
  certificate: Certificate;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const { settings, recordFileDownload, showToast } = useApp();

  const handlePrint = () => {
    recordFileDownload(certificate.courseId, certificate.courseTitle, 'CERTIFICATE');
    showToast('Preparando impressão do certificado...', 'info');
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const isRevoked = certificate.status === 'REVOKED';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full flex flex-col overflow-hidden">
        {/* Modal Controls Bar (Hidden in Print) */}
        <div className="no-print p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-sm">Certificado Oficial de Conclusão — {certificate.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-md shadow-xs cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar PDF</span>
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

        {/* Certificate Classical Luxury Layout */}
        <div className="p-8 sm:p-14 bg-white relative">
          {/* Ornate Double Border */}
          <div className="border-4 border-amber-600/40 p-6 sm:p-10 rounded-lg relative bg-radial from-amber-50/20 via-white to-white">
            <div className="border border-amber-700/60 p-6 sm:p-8 rounded-md text-center space-y-6 relative overflow-hidden">
              {/* Watermark / Seal Icon */}
              <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
                <Award className="w-32 h-32 text-amber-700" />
              </div>

              {/* Status Banner */}
              {isRevoked ? (
                <div className="bg-rose-50 border border-rose-300 text-rose-800 px-4 py-2 rounded text-xs font-bold inline-flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>ATENÇÃO: ESTE CERTIFICADO FOI REVOGADO PELA ADMINISTRAÇÃO ({certificate.revocationReason || 'Cancelado'})</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>DOCUMENTO AUTÊNTICO E REGISTRADO</span>
                </div>
              )}

              {/* Header Title */}
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  {settings.platformName}
                </p>
                <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-wider">
                  CERTIFICADO DE CONCLUSÃO
                </h1>
                <p className="text-xs text-amber-800 font-serif italic">
                  Certificate of Completion
                </p>
              </div>

              {/* Body Presentation */}
              <div className="py-4 space-y-4 max-w-2xl mx-auto">
                <p className="text-xs text-slate-500 font-medium">
                  Certificamos para os devidos fins legais e comprovação de capacitação que
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-950 border-b-2 border-amber-600/40 pb-2 inline-block px-8">
                  {certificate.studentName}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  concluiu com êxito todas as etapas teórico-práticas, avaliações contínuas e o projeto final aplicado do curso de
                </p>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-900">
                  {certificate.courseTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  com carga horária total estimada em <strong className="text-slate-800">{certificate.workloadHours} horas de estudos dirigidos</strong>.
                </p>
              </div>

              {/* Signatures & QR Section */}
              <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-left">
                {/* QR Code & Verification Info */}
                <div className="space-y-1 text-center sm:text-left">
                  <div className="inline-block p-1.5 bg-slate-100 rounded border border-slate-200 mb-1">
                    <QrCode className="w-14 h-14 text-slate-800" />
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">
                    ID: {certificate.id}
                  </p>
                  <p className="text-[9px] text-slate-400 break-all">
                    Hash: {certificate.securityHash.slice(0, 24)}...
                  </p>
                </div>

                {/* Date & Location */}
                <div className="text-center text-xs text-slate-600 space-y-1">
                  <p>Data de Conclusão:</p>
                  <p className="font-bold text-slate-900">
                    {new Date(certificate.issueDate).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-[10px] text-slate-400">Goiânia, Brasil</p>
                </div>

                {/* Signature Block */}
                <div className="text-center space-y-1">
                  <div className="border-b border-slate-400 pb-1 w-44 mx-auto font-serif italic text-sm text-slate-800">
                    {settings.certificateSignatureName}
                  </div>
                  <p className="text-xs font-semibold text-slate-800">{settings.certificateSignatureRole}</p>
                  <p className="text-[10px] text-slate-500">{settings.platformName}</p>
                </div>
              </div>

              {/* Verification Link Disclaimer */}
              <div className="pt-4 text-[10px] text-slate-400 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>Consulte a validade deste documento em: /verificar-certificado</span>
                <span>Registro Oficial de Cursos Livres — Lei nº 9.394/1996</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
