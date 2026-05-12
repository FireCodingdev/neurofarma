import { Metadata } from 'next';
import { Mail, MessageCircle, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fale Conosco · Neurofarma',
  description:
    'Entre em contato com a equipe da Neuro Farma. Tire dúvidas sobre pesquisas, formulações e o cenário regulatório da cannabis medicinal.',
};

const EMAIL = 'neurofarmalab@hotmail.com';
const WHATSAPP = '5574981064385';

export default function FaleConoscoPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary-400 uppercase tracking-widest">
            Contato
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-5">
            Fale Conosco
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Seja bem-vindo ao nosso canal de comunicação. Nossa equipe está pronta para
            responder cada mensagem com seriedade e dedicação.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

        {/* Texto principal */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-sm">
          <p className="text-neutral-700 text-base leading-relaxed mb-5">
            Na Neuro Farma, acreditamos que o avanço da cannabis medicinal no Brasil se constrói
            com diálogo aberto, troca de conhecimento e suporte próximo. Por isso, colocamos nossa
            equipe à disposição para esclarecer qualquer dúvida que você possa ter.
          </p>
          <p className="text-neutral-700 text-base leading-relaxed">
            Nosso compromisso é responder cada mensagem com a mesma seriedade e dedicação que
            aplicamos no laboratório. Analisamos cada questionamento individualmente e retornamos
            com informações claras, embasadas e direcionadas à sua necessidade — seja você um
            profissional de saúde, pesquisador, parceiro da indústria ou paciente em busca de
            orientação inicial.
          </p>
        </section>

        {/* Posso ajudar com */}
        <section>
          <h2 className="font-display text-xl font-bold text-neutral-900 mb-5">
            Posso ajudar com…
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Users, text: 'Projetos de pesquisa e parcerias científicas' },
              { icon: MessageCircle, text: 'Formulações: cápsulas, óleos, emulsões e mais' },
              { icon: Mail, text: 'Orientação técnica sobre veículos e excipientes' },
              { icon: Clock, text: 'Cenário regulatório e científico da cannabis no Brasil' },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-4 bg-white rounded-2xl px-5 py-4 border border-neutral-200 shadow-sm"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <p className="text-sm text-neutral-700 font-medium leading-snug pt-2">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Botões de contato */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-sm">
          <h2 className="font-display text-xl font-bold text-neutral-900 mb-2">
            Entre em contato
          </h2>
          <p className="text-neutral-500 text-sm mb-8">
            É por aqui que começam boas ideias, colaborações e soluções. A Neuro Farma está
            pronta para ouvir você.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center justify-center gap-3 flex-1 px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-2xl transition-colors"
            >
              <Mail className="w-5 h-5 flex-shrink-0" />
              <span>Enviar e-mail</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 flex-1 px-6 py-4 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold rounded-2xl transition-colors"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>

          <p className="text-neutral-400 text-xs mt-5 text-center">
            Ou escreva diretamente para{' '}
            <a
              href={`mailto:${EMAIL}`}
              className="text-primary-600 hover:underline font-medium"
            >
              {EMAIL}
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
