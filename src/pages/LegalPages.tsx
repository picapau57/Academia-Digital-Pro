import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { settings, navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Documento Legal</span>
        <h1 className="font-serif text-3xl font-extrabold text-slate-950">Termos de Uso</h1>
        <p className="text-xs text-slate-500">Última atualização: Março de 2026</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs space-y-6 text-xs text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-slate-900">1. Natureza dos Serviços Educacionais</h2>
          <p>
            A <strong>{settings.platformName}</strong> disponibiliza cursos livres e programas de capacitação profissional continuada fundamentados na Lei nº 9.394/1996 e no Decreto nº 5.154/2004. Nossos cursos não concedem habilitação de nível superior ou técnico regulamentado pelo MEC, caracterizando-se como educação continuada de capacitação prática.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-slate-900">2. Isenção de Promessas Financeiras e Empregatícias</h2>
          <p>
            A plataforma não garante, explícita ou implicitamente, resultados financeiros, ganhos de renda, enriquecimento ou contratação profissional direta. O sucesso ou aproveitamento dos conhecimentos transmitidos depende exclusivamente da dedicação, prática, perfil do aluno e oportunidades externas de mercado.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-slate-900">3. Condições de Acesso e Propriedade Intelectual</h2>
          <p>
            O acesso concedido ao aluno é pessoal e intransferível. É expressamente proibida a revenda, compartilhamento coletivo de senhas ou redistribuição comercial não autorizada dos materiais apostilados e das videoaulas. O download das apostilas em PDF é franqueado exclusivamente para estudo individual do aluno matriculado.
          </p>
        </section>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  const { settings } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Privacidade & Dados</span>
        <h1 className="font-serif text-3xl font-extrabold text-slate-950">Política de Privacidade (LGPD)</h1>
        <p className="text-xs text-slate-500">Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs space-y-6 text-xs text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-slate-900">1. Coleta de Dados Cadastrais</h2>
          <p>
            Coletamos apenas os dados indispensáveis para o processamento da matrícula, conferência do pagamento PIX e emissão nominal dos certificados de conclusão: Nome completo, endereço de e-mail e número de telefone/WhatsApp.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-slate-900">2. Finalidade e Não Compartilhamento</h2>
          <p>
            Não vendemos nem comercializamos dados de alunos com terceiros para fins de spam ou publicidade invasiva. Seus dados cadastrais são tratados de forma confidencial e protegida por padrões de segurança técnica.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-slate-900">3. Registros de Verificação Pública de Certificados</h2>
          <p>
            Para garantir a legitimidade dos certificados expedidos perante o mercado e empregadores, a ferramenta pública de verificação exibe apenas o nome completo do concluinte, curso concluído, carga horária e data de emissão mediante digitação do ID específico do documento.
          </p>
        </section>
      </div>
    </div>
  );
};

export const RefundPage: React.FC = () => {
  const { settings, navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Garantia & Reembolso</span>
        <h1 className="font-serif text-3xl font-extrabold text-slate-950">Política de Reembolso e Devolução</h1>
        <p className="text-xs text-slate-500">Conforme o Artigo 49 da Lei Federal nº 8.078/1990 (Código de Defesa do Consumidor)</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs space-y-6 text-xs text-slate-700 leading-relaxed">
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-emerald-950">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold text-sm">Garantia Incondicional de 7 (sete) Dias Corridos</p>
            <p className="text-xs text-emerald-800">
              Você tem total direito de arrependimento em até 7 dias corridos após a confirmação do pagamento, com reembolso de 100% do valor pago.
            </p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-slate-900">Como Solicitar o Reembolso</h2>
          <p>
            Para solicitar o estorno do pagamento, basta enviar uma mensagem pelo WhatsApp oficial <strong>{settings.pixKey}</strong> ou através do e-mail <strong>{settings.supportEmail}</strong> com o número do seu pedido (ID do pedido) e a chave PIX para a devolução.
          </p>
          <p>
            O valor integral será devolvido via PIX em até 2 (dois) dias úteis após a conferência cadastral, sem perguntas incômodas ou complicações burocráticas.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-slate-900">Efeitos do Cancelamento</h2>
          <p>
            Após o processamento do reembolso, o acesso à sala de aula virtual do curso cancelado é desativado e eventuais certificados emitidos com base na matrícula estornada são declarados revogados por cancelamento contratual.
          </p>
        </section>
      </div>
    </div>
  );
};
