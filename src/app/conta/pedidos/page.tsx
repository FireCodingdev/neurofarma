'use client';

import Link from 'next/link';
import { BookOpen, FlaskConical, MessageCircle, Users, AlertTriangle, Settings, Mail } from 'lucide-react';

export default function PaginaApoiadorPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div>
            <h1 className="font-display text-2xl font-bold text-neutral-900">Página do Apoiador</h1>
            <p className="text-sm text-neutral-500">Bem-vindo ao seu espaço exclusivo</p>
          </div>
        </div>

        {/* Mensagem de boas-vindas */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 mb-6">
          <p className="text-neutral-700 leading-relaxed mb-4">
            Nossa equipe agradece por ter se tornado um apoiador da Neuro Farma. Você não está apenas
            contribuindo com a pesquisa farmacotécnica em cannabis medicinal — está entrando em um círculo
            de conhecimento, participação e benefícios reais. Nosso programa foi criado para unir quem
            acredita na ciência a vantagens transparentes e significativas.
          </p>
          <p className="text-neutral-700 leading-relaxed">
            Além disso, como apoiador você já pode acessar os artigos e conteúdos exclusivos disponíveis
            na página de <strong>Relatórios P&D</strong>, localizada no rodapé do site. Esse material é
            atualizado regularmente e reúne notas técnicas, dados experimentais e publicações da nossa equipe.
          </p>
        </div>

        {/* Benefícios */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 mb-6">
          <h2 className="font-display text-lg font-bold text-neutral-900 mb-5">Outros Benefícios disponíveis</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <FlaskConical className="w-4 h-4 text-primary-700" />
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Acesso ao conteúdo sobre os processos farmacotécnicos desenvolvidos pela NeuroFarma.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4 text-primary-700" />
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Acompanhamento próximo da rotina do laboratório, com atualizações periódicas exclusivas para apoiadores.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Users className="w-4 h-4 text-primary-700" />
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Participação em enquetes para definição de novas formulações a serem estudadas.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4 text-primary-700" />
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Materiais educativos exclusivos (e-books, infográficos, vídeos sobre farmacotécnica da cannabis).
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageCircle className="w-4 h-4 text-primary-700" />
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Suporte para dúvidas 24 horas.
              </p>
            </li>
          </ul>
        </div>

        {/* Atenção */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">⚠️ Atenção, apoiador</h3>
              <p className="text-sm text-amber-800 leading-relaxed mb-3">
                Para garantir o acesso completo aos benefícios do programa, é essencial que seus dados
                estejam atualizados. Acesse <strong>Configurações de Perfil</strong> e preencha todas as
                informações solicitadas. Isso nos permite direcionar corretamente os conteúdos exclusivos,
                amostras experimentais e comunicações do laboratório.
              </p>
              <Link
                href="/conta/configuracoes"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Ir para Configurações de Perfil →
              </Link>
            </div>
          </div>
        </div>

        {/* Conteúdos exclusivos / contato */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
          <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">Quer conteúdos exclusivos?</h2>
          <p className="text-sm text-neutral-700 leading-relaxed mb-5">
            Agora ficou fácil receber materiais complementares, tirar dúvidas sobre as pesquisas ou solicitar
            algum conteúdo técnico específico — entre em contato diretamente conosco. A ciência se faz com
            diálogo — e nossa equipe está pronta para conversar com você.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:neurofarmalab@hotmail.com"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4" />
              Enviar e-mail
            </a>
            <a
              href="https://wa.me/5574981064385?text=Olá! Sou apoiador da Neurofarma e gostaria de solicitar conteúdo exclusivo."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebe5b] text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
