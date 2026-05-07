import { DEFAULT_HOME_CONTENT, type ScienceContent } from '@/lib/home-content';

interface ScienceProps {
  content?: ScienceContent;
}

export function Science({ content = DEFAULT_HOME_CONTENT.science }: ScienceProps) {
  // Os cards de canabinoides são informação técnica fixa do produto,
  // mantidos hard-coded por segurança (não editáveis pelo admin).
  const canabinoides = [
    {
      sigla: 'CBD',
      nome: 'Canabidiol',
      cor: 'bg-primary-100 border-primary-300 text-primary-800',
      descricao: 'Não psicoativo. Estudado para epilepsia, ansiedade, dor neuropática e inflamação.',
    },
    {
      sigla: 'THC',
      nome: 'Tetrahidrocanabinol',
      cor: 'bg-accent-mint/20 border-accent-mint text-accent-forest',
      descricao: 'Psicoativo em doses elevadas. Em concentrações farmacêuticas, atua na dor, náuseas e espasmos musculares.',
    },
    {
      sigla: 'CBG',
      nome: 'Canabigerol',
      cor: 'bg-neutral-100 border-neutral-300 text-neutral-700',
      descricao: 'Precursor biossintético. Investigado como neuroprotetor e antimicrobiano.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <div>
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-widest">{content.eyebrow}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mt-3 mb-5">
              {content.titulo_parte1}
              <span className="text-primary-600">{content.titulo_destaque}</span>
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-5">
              {content.paragrafo1}
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              {content.paragrafo2}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-xl text-primary-800 text-sm font-medium">
              {content.badge_inferior}
            </div>
          </div>

          {/* Cannabinoids cards */}
          <div className="space-y-4">
            {canabinoides.map((c) => (
              <div
                key={c.sigla}
                className={`flex gap-4 p-5 rounded-2xl border-2 ${c.cor} bg-white`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-lg border-2 ${c.cor}`}>
                  {c.sigla}
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">{c.nome}</p>
                  <p className="text-sm text-neutral-600 mt-1">{c.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
