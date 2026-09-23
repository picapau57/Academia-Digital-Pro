import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { settings, navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
          Nossa História & Propósito
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-950">
          Sobre a {settings.platformName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {settings.slogan}
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
        <h2 className="font-serif text-xl font-bold text-slate-950">
          Democratizando o Ensino Digital Prático
        </h2>
        <p>
          A <strong>{settings.platformName}</strong> nasceu com a missão de oferecer capacitação profissional acessível, direta ao ponto e sem enrolação para pessoas que desejam aprender habilidades contemporâneas do mercado digital.
        </p>
        <p>
          Em um cenário repleto de cursos com promessas mirabolantes e preços abusivos, escolhemos outro caminho: cursos estruturados com didática clara, apostilas detalhadas em PDF, projetos práticos reais e investimento justo e acessível.
        </p>

        <h3 className="font-serif text-lg font-bold text-slate-950 pt-2">
          Nossos Compromissos Éticos
        </h3>
        <ul className="space-y-2 text-xs">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Transparência Absoluta:</strong> Não prometemos riqueza fácil, renda passiva milagrosa ou contratação garantida. O aprendizado depende do esforço e estudo de cada pessoa.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Material Completo para Download:</strong> O aluno não fica preso à plataforma. Cada curso inclui sua apostila didática integral em PDF.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Certificação com Autenticidade:</strong> Certificados verificáveis via QR Code e código alfanumérico em conformidade com as leis educacionais.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { settings, showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    showToast('Sua mensagem foi enviada à nossa equipe de atendimento!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
          Fale Conosco
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-950">
          Atendimento e Suporte ao Aluno
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Tire suas dúvidas sobre matrículas, acesso a cursos ou parcerias institucionais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp de Suporte</span>
            </div>
            <p className="text-sm font-semibold text-slate-800">{settings.pixKey}</p>
            <p className="text-[11px] text-slate-500">Atendimento rápido em dias úteis das 09h às 18h.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase">
              <Mail className="w-4 h-4 text-sky-600" />
              <span>E-mail Institucional</span>
            </div>
            <p className="text-xs font-semibold text-slate-800 break-all">{settings.supportEmail}</p>
            <p className="text-[11px] text-slate-500">Resposta em até 24 horas úteis.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span>Sede Administrativa</span>
            </div>
            <p className="text-xs text-slate-800">{settings.pixCity}</p>
            <p className="text-[11px] text-slate-500">Operações e emissões com validade nacional.</p>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-slate-900">Mensagem Enviada!</h3>
              <p className="text-xs text-slate-600">
                Agradecemos pelo contato. Retornaremos sua solicitação no e-mail informado o mais breve possível.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-slate-900 font-semibold underline pt-2"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-serif text-lg font-bold text-slate-900">Envie uma Mensagem</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Seu E-mail *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded border border-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Assunto</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Dúvida sobre matrícula, certificado, etc."
                  className="w-full p-2.5 rounded border border-slate-300"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mensagem *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Como podemos te ajudar hoje?"
                  className="w-full p-2.5 rounded border border-slate-300"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded shadow-xs cursor-pointer flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
