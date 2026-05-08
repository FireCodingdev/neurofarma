import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Mail, MessageCircle, ArrowRight, Heart, FlaskConical, Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Seja um Apoiador · Neurofarma',
  description: 'Faça parte do programa de apoiadores da Neuro Farma e contribua para o avanço da pesquisa farmacotécnica em cannabis medicinal no Brasil.',
};

const beneficios = [
  'Acesso às nossas formulações farmacotécnicas (cápsulas, óleos e soluções orais, emulsões e outras formas), produzidas com controle de qualidade e padronização.',
  'Participação em testes de novos produtos antes do lançamento.',
  'Informações técnicas exclusivas sobre os processos de desenvolvimento.',
  'Descontos especiais em amostras e produtos disponibilizados.',
  'Citação como colaborador nos materiais de pesquisa que você ajudou a viabilizar.',
  'Acompanhamento próximo da nossa rotina de laboratório e das novidades do setor.',
];

const etapas = [
  {
    numero: '01',
    titulo: 'Você decide apoiar',
    descricao: 'Pelo nosso site ou diretamente pelo WhatsApp.',
  },
  {
    numero: '02',
    titulo: 'Escolhe seus benefícios',
    descricao: 'Com base nas formulações e projetos disponíveis no momento.',
  },
  {
    numero: '03',
    titulo: 'Confirma sua participação',
    descricao: 'E recebe todas as orientações sobre prazos, formas de envio e acompanhamento.',
  },
];

export default function ApoiadoresPage() {
  return (
    <div className="min-h-screen bg-neutral-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Heart className="w-4 h-4 text-green-300" />
            Programa de Apoiadores
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Seja um Apoiador<br />Neuro Farma
          </h1>
          <p className="text-lg text-primary-100 leading-relaxed max-w-3xl mx-auto">
            A Neuro Farma acredita que a pesquisa farmacotécnica em cannabis medicinal no Brasil
            não se constrói sozinha — ela precisa de pessoas e parceiros que compartilhem do mesmo
            propósito. É por isso que criamos o programa de apoiadores: uma corrente de incentivo
            onde cada participante fortalece diretamente o desenvolvimento científico e, em troca,
            tem acesso a benefícios exclusivos.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

        {/* O que significa ser um apoiador */}
        <Card>
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-900">O que significa ser um apoiador?</h2>
            </div>
          </div>
          <div className="space-y-4 text-neutral-600 leading-relaxed">
            <p>
              Ser apoiador da Neuro Farma é fazer parte ativa da nossa missão. É contribuir para que
              novas formulações sejam testadas, para que amostras sejam produzidas com rigor técnico
              e para que o conhecimento sobre CBD e THC avance com bases sólidas no país. Em
              resumo: o apoiador ajuda a viabilizar a pesquisa, a produção laboratorial e a
              disponibilização das nossas formulações, e recebe contrapartidas reais por isso.
            </p>
            <p className="font-medium text-neutral-800 bg-primary-50 border border-primary-100 rounded-xl p-4">
              Não se trata de uma simples doação — é uma troca. Você impulsiona a ciência da cannabis
              e nós retribuímos com acesso ao que produzimos de melhor.
            </p>
          </div>
        </Card>

        {/* O que você ganha */}
        <Card>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <FlaskConical className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-900">O que você ganha ao apoiar</h2>
              <p className="text-neutral-500 mt-1">
                Ao se tornar um apoiador, você escolhe os benefícios que mais se encaixam no seu
                interesse, conforme a disponibilidade do nosso laboratório.
              </p>
            </div>
          </div>
          <ul className="space-y-3">
            {beneficios.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700 text-sm leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Como funciona */}
        <div>
          <h2 className="font-display text-2xl font-bold text-neutral-900 mb-6">Como funciona</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {etapas.map((etapa) => (
              <Card key={etapa.numero} className="text-center">
                <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-sm">{etapa.numero}</span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{etapa.titulo}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{etapa.descricao}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-primary-700 to-primary-800 text-white border-0">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold mb-3">Pronto para fazer parte?</h2>
            <p className="text-primary-100 leading-relaxed max-w-2xl mx-auto">
              Sua contribuição fortalece uma causa que vai além do laboratório: ajuda a construir um
              mercado de cannabis medicinal mais sério, mais científico e mais acessível. Entre em
              contato conosco e escolha como quer participar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="mailto:neurofarma1@hotmail.com"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Enviar e-mail
            </a>
            <a
              href="https://wa.me/557498106438"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>

          <div className="border-t border-white/20 pt-6 text-center space-y-1 text-sm text-primary-200">
            <p><span className="font-medium text-white">E-mail:</span> neurofarma1@hotmail.com</p>
            <p><span className="font-medium text-white">WhatsApp:</span> (74) 9810-6438</p>
          </div>
        </Card>

        {/* Assinatura */}
        <p className="text-center text-neutral-500 italic text-sm pb-4">
          Neuro Farma. A pesquisa avança. Com você, avança mais rápido.
        </p>

      </div>
    </div>
  );
}
