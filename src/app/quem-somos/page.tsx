import { Metadata } from 'next';
import { FlaskConical, Microscope, BookOpen, Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Quem Somos · Neurofarma',
  description:
    'Conheça a Neuro Farma: laboratório dedicado à pesquisa e desenvolvimento farmacotécnico de produtos à base de CBD e THC.',
};

export default function QuemSomosPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary-400 uppercase tracking-widest">
            Sobre nós
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-5">
            Quem Somos
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Pesquisa farmacotécnica em cannabis. Do laboratório para o futuro da terapia
            canabinoide no Brasil.
          </p>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Origem */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-neutral-900">Nossa origem</h2>
          </div>
          <p className="text-neutral-700 text-base leading-relaxed">
            A Neuro Farma nasceu de uma constatação simples: o Brasil precisa produzir
            conhecimento próprio sobre formulações de cannabis medicinal. Somos um laboratório
            dedicado à pesquisa e ao desenvolvimento farmacotécnico de produtos à base de CBD e
            THC, com a missão de transformar ciência em formulações seguras, padronizadas e
            acessíveis.
          </p>
        </section>

        {/* O que fazemos */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <FlaskConical className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-neutral-900">O que fazemos</h2>
          </div>
          <p className="text-neutral-700 text-base leading-relaxed mb-8">
            Nosso dia a dia é feito de bancada, teste e pesquisa prática. Produzimos amostras em
            escala laboratorial das principais formas farmacêuticas da terapia canabinoide. Cada
            projeto é pensado para unir precisão de dose e estabilidade.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              'Cápsulas',
              'Óleos e Soluções Orais',
              'Emulsões',
              'Gomas',
              'Chocolates Medicinais',
              'Formulações sob Medida',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 px-4 py-3 bg-primary-50 rounded-xl border border-primary-100"
              >
                <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                <span className="text-sm font-medium text-primary-800">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Missão científica */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Microscope className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-neutral-900">Nossa missão científica</h2>
          </div>
          <p className="text-neutral-700 text-base leading-relaxed">
            Acreditamos que o avanço da cannabis medicinal passa pela padronização e pelo
            conhecimento técnico. Por isso, nossa rotina envolve testar veículos, excipientes e
            processos técnicos — sempre com as RDCs como guia — e gerar dados que fortaleçam a
            literatura científica nacional e subsidiem as normas do setor.
          </p>
        </section>

        {/* Compromisso */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-neutral-900">Nosso compromisso</h2>
          </div>
          <p className="text-neutral-700 text-base leading-relaxed">
            Cada formulação que desenvolvemos nasce de um compromisso com a segurança do paciente
            e com a evolução da cannabis medicinal no Brasil. Trabalhamos para que ciência e
            prática caminhem juntas — do laboratório para quem mais precisa.
          </p>
        </section>

        {/* Tagline final */}
        <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-3xl p-10 text-center">
          <p className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug">
            Neuro Farma.
          </p>
          <p className="text-primary-200 text-lg mt-2 leading-relaxed">
            Pesquisa farmacotécnica em cannabis.<br />
            Do laboratório para o futuro da terapia canabinoide no Brasil.
          </p>
        </div>

      </div>
    </div>
  );
}
