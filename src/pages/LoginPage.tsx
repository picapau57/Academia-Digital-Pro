import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, GraduationCap, ArrowRight, UserCheck, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginAsStudent, loginAsAdmin, registerUser, currentUser, navigateTo } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');

  if (currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-slate-900">Você já está conectado</h1>
        <p className="text-xs text-slate-600">Conectado como {currentUser.name} ({currentUser.email})</p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo(currentUser.role === 'STUDENT' ? '/aluno' : '/admin')}
            className="px-6 py-2.5 bg-slate-900 text-white rounded text-xs font-semibold cursor-pointer"
          >
            Ir para o Meu Painel
          </button>
        </div>
      </div>
    );
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    registerUser(name, email, whatsapp);
    navigateTo('/aluno');
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
          <GraduationCap className="w-6 h-6 text-amber-400" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-950">
          {mode === 'login' ? 'Acesso à Plataforma' : 'Criar Conta de Aluno'}
        </h1>
        <p className="text-xs text-slate-600">
          {mode === 'login'
            ? 'Entre com suas credenciais ou utilize os acessos de demonstração rápida abaixo.'
            : 'Preencha seus dados para acessar seus cursos e emitir certificados.'}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        {mode === 'login' ? (
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aluno@email.com"
                  className="w-full text-xs p-2.5 rounded border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs p-2.5 rounded border border-slate-300"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={loginAsStudent}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Entrar</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick 1-Click Access Buttons for Testing */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                Acessos de Teste Instantâneo (Demonstração)
              </span>

              <button
                type="button"
                onClick={loginAsStudent}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded flex items-center justify-between cursor-pointer transition-colors"
              >
                <span className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Acessar como Aluna (Juliana Mendes)</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">1-Clique</span>
              </button>

              <button
                type="button"
                onClick={loginAsAdmin}
                className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 text-xs font-bold rounded flex items-center justify-between cursor-pointer transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-600" />
                  <span>Acessar Painel do Administrador</span>
                </span>
                <span className="text-[10px] text-amber-700 font-mono">Gestão PIX</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nome Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome oficial para o certificado"
                className="w-full text-xs p-2.5 rounded border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full text-xs p-2.5 rounded border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="(62) 98428-9911"
                className="w-full text-xs p-2.5 rounded border border-slate-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded transition-colors cursor-pointer"
            >
              Criar Conta e Continuar
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          {mode === 'login' ? (
            <button
              type="button"
              onClick={() => setMode('register')}
              className="text-xs text-slate-600 hover:text-slate-950 font-semibold cursor-pointer underline"
            >
              Ainda não tem conta? Cadastre-se aqui
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-xs text-slate-600 hover:text-slate-950 font-semibold cursor-pointer underline"
            >
              Já possui uma conta? Faça login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
