import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CertificateModal } from '../components/certificate/CertificateModal';
import { Certificate } from '../types';
import { Search, CheckCircle, ShieldAlert, Award, QrCode, FileText, ArrowLeft } from 'lucide-react';

interface CertificateVerifyPageProps {
  initialId?: string;
}

export const CertificateVerifyPage: React.FC<CertificateVerifyPageProps> = ({ initialId }) => {
  const { certificates, navigateTo, t } = useApp();
  const [searchId, setSearchId] = useState(initialId || '');
  const [searchedCert, setSearchedCert] = useState<Certificate | null | 'NOT_FOUND'>(null);
  const [selectedCertModal, setSelectedCertModal] = useState<Certificate | null>(null);

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  const handleSearch = (idToSearch?: string) => {
    const code = (idToSearch || searchId).trim().toUpperCase();
    if (!code) return;

    const found = certificates.find((c) => c.id.toUpperCase() === code);
    if (found) {
      setSearchedCert(found);
    } else {
      setSearchedCert('NOT_FOUND');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2">
          <Award className="w-6 h-6" />
        </div>
        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
          Consulta Pública de Autenticidade
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-slate-950">
          {t.certificate.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {t.certificate.subtitle}
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Código do Certificado (ID Único)
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value.toUpperCase())}
              placeholder="Ex: ADP-2026-8F72K9"
              className="w-full pl-10 pr-4 py-3 text-sm font-mono uppercase tracking-wider rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-hidden"
            />
          </div>
          <button
            type="button"
            onClick={() => handleSearch()}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
          >
            {t.certificate.search}
          </button>
        </div>

        {/* Demo examples helper */}
        <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2 pt-1">
          <span>Exemplos para teste rápido:</span>
          <button
            type="button"
            onClick={() => {
              setSearchId('ADP-2026-8F72K9');
              handleSearch('ADP-2026-8F72K9');
            }}
            className="font-mono text-amber-700 hover:underline cursor-pointer"
          >
            ADP-2026-8F72K9
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => {
              setSearchId('ADP-2026-3M19X4');
              handleSearch('ADP-2026-3M19X4');
            }}
            className="font-mono text-amber-700 hover:underline cursor-pointer"
          >
            ADP-2026-3M19X4
          </button>
        </div>
      </div>

      {/* Search Result Presentation */}
      {searchedCert === 'NOT_FOUND' && (
        <div className="bg-white rounded-xl border border-rose-200 p-8 text-center space-y-3">
          <ShieldAlert className="w-10 h-10 text-rose-600 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-slate-900">
            {t.certificate.notFound}
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Não encontramos nenhum registro correspondente ao código informado. Por favor, confira a digitação de todas as letras e números.
          </p>
        </div>
      )}

      {searchedCert && searchedCert !== 'NOT_FOUND' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
          {/* Status Bar */}
          <div
            className={`p-4 text-xs font-bold flex items-center justify-between ${
              searchedCert.status === 'VALID'
                ? 'bg-emerald-50 text-emerald-900 border-b border-emerald-200'
                : 'bg-rose-50 text-rose-900 border-b border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {searchedCert.status === 'VALID' ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>CERTIFICADO VÁLIDO E AUTÊNTICO NO SISTEMA</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>CERTIFICADO REVOGADO — {searchedCert.revocationReason || 'Cancelado'}</span>
                </>
              )}
            </div>
            <span className="font-mono uppercase">{searchedCert.id}</span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {t.certificate.studentName}
                </span>
                <p className="font-serif text-xl font-bold text-slate-950">
                  {searchedCert.studentName}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {t.certificate.courseTitle}
                </span>
                <p className="font-serif text-lg font-bold text-amber-900">
                  {searchedCert.courseTitle}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {t.certificate.workload}
                </span>
                <p className="text-sm font-semibold text-slate-800">
                  {searchedCert.workloadHours} horas de capacitação
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {t.certificate.issueDate}
                </span>
                <p className="text-sm font-semibold text-slate-800">
                  {new Date(searchedCert.issueDate).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 space-y-0.5">
                <p><strong>Órgão Emissor:</strong> Academia Digital Pro Treinamentos</p>
                <p className="text-[10px] text-slate-400 font-mono">
                  Hash de Segurança: {searchedCert.securityHash}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCertModal(searchedCert)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md shadow-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Visualizar Documento Oficial</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedCertModal && (
        <CertificateModal
          certificate={selectedCertModal}
          onClose={() => setSelectedCertModal(null)}
        />
      )}
    </div>
  );
};
