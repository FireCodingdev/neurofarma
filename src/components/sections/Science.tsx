export function Science() {
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
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-widest">A ciência</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mt-3 mb-5">
              Cannabis medicinal não é modismo.{' '}
              <span className="text-primary-600">É evidência.</span>
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-5">
              O sistema endocanabinoide humano regula funções vitais como sono,
              dor, humor e resposta imune. Os fitocannabinoides presentes na
              Cannabis <em>sativa</em> interagem com receptores CB1 e CB2 do
              organismo — e essa interação é o alvo de centenas de estudos
              clínicos conduzidos globalmente.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              No Brasil, a Anvisa regulamentou o uso medicinal pela{' '}
              <strong className="text-neutral-800">RDC 327/2019</strong>, abrindo
              caminho legal para pesquisa, importação e fabricação de produtos
              à base de Cannabis. A Neurofarma nasceu dentro desse marco regulatório.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-xl text-primary-800 text-sm font-medium">
              Nossos produtos são fabricados exclusivamente para fins terapêuticos.
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
