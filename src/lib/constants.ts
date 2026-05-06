/**
 * Constantes globais do site: especialidades médicas, dados mockados,
 * informações institucionais. Centralizar facilita atualizações futuras.
 */

export const SITE_CONFIG = {
  name: 'NEUROFARMA',
  description: 'Pesquisa farmacêutica à base de Cannabis medicinal. 100% legal, regulamentado pela Anvisa.',
  url: 'https://neurofarma.vercel.app',
  email: 'neurofarma1@hotmail.com',
  telefone: '(74) 98106-4385',
  endereco: 'Bahia, BA - Brasil',
  redesSociais: {
    instagram: 'https://instagram.com/neurofarma',
    twitter: 'https://x.com/NeuroFarma1',
    youtube: 'https://youtube.com/@neurofarma',
  },
};

export type Produto = {
  id: string;
  slug: string;
  nome: string;
  categoria: string;
  descricaoCurta: string;
  descricao: string;
  composicao: string;
  indicacoes: string[];
  apresentacao: string;
  ativo: boolean;
  ordem: number;
};

export const PRODUTOS_MOCK: Produto[] = [
  {
    id: '1',
    slug: 'neuro-c10',
    nome: 'Neuro-C10',
    categoria: 'CBD Isolado',
    descricaoCurta: 'Óleo de CBD 10 mg/mL em solução oleosa de triglicerídeos de cadeia média.',
    descricao:
      'Formulação de alta pureza com Canabidiol isolado a 10 mg por mL, desenvolvida para pacientes que iniciam a terapia canabinoide. Base de triglicerídeos de cadeia média (TCM) para melhor biodisponibilidade oral.',
    composicao: 'Canabidiol (CBD) isolado 10 mg/mL · Óleo TCM (veículo) · Tocoferol (antioxidante)',
    indicacoes: ['Ansiedade generalizada', 'Insônia leve a moderada', 'Dor neuropática leve', 'Início de terapia canabinoide'],
    apresentacao: 'Frasco de 30 mL com gotejador graduado. Armazenar em local fresco e seco, ao abrigo de luz.',
    ativo: true,
    ordem: 1,
  },
  {
    id: '2',
    slug: 'neuro-c25',
    nome: 'Neuro-C25',
    categoria: 'CBD Isolado',
    descricaoCurta: 'Óleo de CBD 25 mg/mL — maior concentração para terapias mais exigentes.',
    descricao:
      'Versão de alta concentração do Neuro-C10, indicada para pacientes já adaptados à terapia com canabidiol. Cada gota entrega maior dose com menor volume, facilitando a adesão ao tratamento.',
    composicao: 'Canabidiol (CBD) isolado 25 mg/mL · Óleo TCM (veículo) · Tocoferol (antioxidante)',
    indicacoes: ['Epilepsia refratária', 'Dor crônica', 'Espasticidade', 'Transtorno do espectro autista (TEA)'],
    apresentacao: 'Frasco de 30 mL com gotejador graduado. Armazenar em local fresco e seco, ao abrigo de luz.',
    ativo: true,
    ordem: 2,
  },
  {
    id: '3',
    slug: 'neuro-balance',
    nome: 'Neuro-Balance',
    categoria: 'Full Spectrum',
    descricaoCurta: 'Extrato full-spectrum CBD:THC 20:1 — efeito entourage maximizado.',
    descricao:
      'Formulação de espectro completo que preserva a totalidade dos fitocannabinoides, terpenos e flavonoides da planta. A relação CBD:THC de 20:1 garante ação terapêutica ampliada com mínimo efeito psicoativo.',
    composicao: 'Extrato de Cannabis sativa full-spectrum (CBD 20 mg/mL · THC <1 mg/mL) · Óleo TCM · Vitamina E',
    indicacoes: ['Dor oncológica', 'Esclerose múltipla', 'Síndrome de Tourette', 'Doenças inflamatórias crônicas'],
    apresentacao: 'Frasco âmbar de 30 mL com gotejador. Manter refrigerado após aberto.',
    ativo: true,
    ordem: 3,
  },
  {
    id: '4',
    slug: 'neuro-caps',
    nome: 'Neuro-Caps',
    categoria: 'Cápsulas',
    descricaoCurta: 'Cápsulas de gelatina mole com CBD 15 mg — praticidade e dosagem precisa.',
    descricao:
      'Forma farmacêutica sólida para quem prefere praticidade e dosagem padronizada. Cada cápsula entrega 15 mg de CBD isolado em matriz lipídica, com perfil de liberação oral prolongada.',
    composicao: 'Canabidiol (CBD) isolado 15 mg · Óleo de girassol · Cápsula de gelatina bovina',
    indicacoes: ['Uso diário preventivo', 'Controle da ansiedade', 'Apoio ao sono', 'Dor crônica leve'],
    apresentacao: 'Blister com 30 cápsulas (uso para 30 dias em dose única diária). Armazenar em temperatura ambiente.',
    ativo: true,
    ordem: 4,
  },
];

export const CATEGORIAS_PRODUTO = ['CBD Isolado', 'Full Spectrum', 'Cápsulas', 'Tópicos'] as const;

