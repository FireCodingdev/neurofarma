/**
 * Tipos e valores padrão para o conteúdo editável da landing page.
 *
 * Este módulo é a fonte única de verdade para tudo que pode ser alterado
 * pelo admin via /admin/conteudo. Os valores padrão são exatamente os mesmos
 * que existiam hard-coded nas seções — quando o admin nunca tocou em nada,
 * o site renderiza idêntico ao original.
 *
 * No banco, salvamos um único registro JSON na tabela `site_content`
 * com a chave `home`. Ver /api/admin/home-content para detalhes.
 */

// ---------- HERO ----------
export type HeroTrustIndicator = {
  label: string;
  sub: string;
};

export type HeroContent = {
  badge: string;
  titulo_parte1: string;        // "A ciência da "
  titulo_destaque: string;      // "cannabis"
  titulo_parte2: string;        // " a serviço da vida."
  subtitulo: string;
  cta_primario: string;
  cta_secundario: string;
  trust_indicators: HeroTrustIndicator[]; // sempre 3
};

// ---------- BENEFITS ----------
export type BenefitsPilar = {
  titulo: string;
  descricao: string;
  detalhes: string[];           // sempre 3
  imagem_url?: string;          // URL opcional — substitui ícone quando preenchida
};

export type BenefitsContent = {
  eyebrow: string;              // "O que fazemos"
  titulo_parte1: string;        // "Ciência séria por trás de "
  titulo_destaque: string;      // "cada gota"
  subtitulo: string;
  pilares: BenefitsPilar[];     // sempre 3
};

// ---------- SCIENCE ----------
export type ScienceContent = {
  eyebrow: string;              // "A ciência"
  titulo_parte1: string;        // "Cannabis medicinal não é modismo. "
  titulo_destaque: string;      // "É evidência."
  paragrafo1: string;
  paragrafo2: string;
  badge_inferior: string;
};

// ---------- STEPS ----------
export type StepsEtapa = {
  titulo: string;
  descricao: string;
  icone?: string;       // nome do ícone (ex: 'Pill', 'Pipette') — usa ETAPA_ICONS[idx] como fallback
};

export type StepsContent = {
  eyebrow: string;              // "Processo"
  titulo_parte1: string;        // "Do laboratório "
  titulo_destaque: string;      // "ao paciente"
  subtitulo: string;
  etapas: StepsEtapa[];         // sempre 4
  cta: string;
};

// ---------- NOTICIAS ----------
export type NoticiaItem = {
  titulo: string;
  descricao_curta: string;
  imagem_url: string;
  badge: string;
  link: string;
};

export type NoticiasContent = {
  eyebrow: string;
  titulo: string;
  noticias: NoticiaItem[];
};

// ---------- JOIN CTA ----------
export type JoinCtaFeature = {
  label: string;
  sub: string;
};

export type JoinCtaContent = {
  eyebrow: string;              // "Faça parte"
  titulo_parte1: string;        // "Seja parte dessa "
  titulo_destaque: string;      // "transformação"
  subtitulo: string;
  cta_primario: string;
  cta_secundario: string;
  features: JoinCtaFeature[];   // sempre 3
};

// ---------- AGREGADO ----------
export type HomeContent = {
  hero: HeroContent;
  benefits: BenefitsContent;
  science: ScienceContent;
  steps: StepsContent;
  noticias: NoticiasContent;
  joinCta: JoinCtaContent;
};

// ---------- DEFAULTS (= textos atuais do site) ----------
export const DEFAULT_HOME_CONTENT: HomeContent = {
  hero: {
    badge: '100% Legal · Regulamentado pela Anvisa · RDC 327/2019',
    titulo_parte1: 'A ciência da ',
    titulo_destaque: 'cannabis',
    titulo_parte2: ' a serviço da vida.',
    subtitulo:
      'Desenvolvemos formulações farmacêuticas à base de Cannabis medicinal em laboratório certificado, com rigor científico e dentro de todos os parâmetros legais vigentes no Brasil.',
    cta_primario: 'Faça parte da causa',
    cta_secundario: 'Conheça nossa pesquisa',
    trust_indicators: [
      { label: '+12 formulações', sub: 'desenvolvidas em laboratório' },
      { label: '5+ anos', sub: 'de pesquisa científica' },
      { label: 'Anvisa', sub: 'autorização e conformidade' },
    ],
  },
  benefits: {
    eyebrow: 'O que fazemos',
    titulo_parte1: 'Ciência séria por trás de ',
    titulo_destaque: 'cada gota',
    subtitulo:
      'Não somos uma farmácia. Somos um laboratório de pesquisa que transforma conhecimento científico em tratamentos reais para pacientes reais.',
    pilares: [
      {
        imagem_url: '',
        titulo: 'Pesquisa de Ponta',
        descricao:
          'Nossa equipe de pesquisadores trabalha na extração, isolamento e caracterização de canabinoides como CBD, THC e terpenos a partir de biomassa vegetal controlada.',
        detalhes: [
          'Cromatografia e análise de pureza',
          'Estudos de estabilidade e biodisponibilidade',
          'Parcerias com universidades brasileiras',
        ],
      },
      {
        imagem_url: '',
        titulo: 'Formulações Personalizadas',
        descricao:
          'Cada produto é desenvolvido com foco em indicações clínicas específicas — epilepsia refratária, dor crônica, ansiedade, transtornos neurológicos e mais.',
        detalhes: [
          'Padronização de concentrações ativas',
          'Formas farmacêuticas diversas (óleos, cápsulas)',
          'Rastreabilidade lote a lote',
        ],
      },
      {
        imagem_url: '',
        titulo: 'Rigor e Transparência',
        descricao:
          'Todos os nossos processos seguem as Boas Práticas de Fabricação (BPF) e são auditáveis, desde a origem da matéria-prima até a entrega ao paciente.',
        detalhes: [
          'Laudos analíticos disponíveis',
          'Cadeia de custódia documentada',
          'Conformidade com RDC 327/2019',
        ],
      },
    ],
  },
  science: {
    eyebrow: 'A ciência',
    titulo_parte1: 'Cannabis medicinal não é modismo. ',
    titulo_destaque: 'É evidência.',
    paragrafo1:
      'O sistema endocanabinoide humano regula funções vitais como sono, dor, humor e resposta imune. Os fitocannabinoides presentes na Cannabis sativa interagem com receptores CB1 e CB2 do organismo — e essa interação é o alvo de centenas de estudos clínicos conduzidos globalmente.',
    paragrafo2:
      'No Brasil, a Anvisa regulamentou o uso medicinal pela RDC 327/2019, abrindo caminho legal para pesquisa, importação e fabricação de produtos à base de Cannabis. A Neurofarma nasceu dentro desse marco regulatório.',
    badge_inferior:
      'Nossos produtos são fabricados exclusivamente para fins terapêuticos.',
  },
  steps: {
    eyebrow: 'Processo',
    titulo_parte1: 'Do laboratório ',
    titulo_destaque: 'ao paciente',
    subtitulo:
      'Cada etapa é documentada, rastreável e auditável — porque transparência não é diferencial, é obrigação.',
    etapas: [
      {
        icone: 'Pill',
        titulo: 'Cultivo e Extração',
        descricao:
          'A biomassa vegetal é cultivada em ambiente controlado e certificado. A extração dos canabinoides segue protocolos validados para garantir pureza e reprodutibilidade.',
      },
      {
        icone: 'Pipette',
        titulo: 'Desenvolvimento',
        descricao:
          'Os extratos são formulados por farmacêuticos especialistas, ajustando concentrações, excipientes e forma farmacêutica para cada indicação clínica.',
      },
      {
        icone: 'Cookie',
        titulo: 'Controle de Qualidade',
        descricao:
          'Cada lote passa por análises cromatográficas, microbiológicas e testes de estabilidade. Laudos são emitidos antes de qualquer liberação.',
      },
      {
        icone: 'FlaskConical',
        titulo: 'Acesso ao Paciente',
        descricao:
          'Com cadastro ativo na plataforma, o paciente tem acesso direto aos produtos disponíveis e ao acompanhamento de seu pedido em tempo real.',
      },
    ],
    cta: 'Ver Formulações',
  },
  noticias: {
    eyebrow: 'Notícias',
    titulo: 'Fique por dentro',
    noticias: [],
  },
  joinCta: {
    eyebrow: 'Faça parte',
    titulo_parte1: 'Seja parte dessa ',
    titulo_destaque: 'transformação',
    subtitulo:
      'A Neurofarma existe para democratizar o acesso a tratamentos inovadores. Crie sua conta, explore nossos produtos e entre em contato para saber como ter acesso.',
    cta_primario: 'Criar minha conta',
    cta_secundario: 'Falar no WhatsApp',
    features: [
      {
        label: 'Produtos exclusivos',
        sub: 'Formulações de laboratório certificado',
      },
      {
        label: 'Conteúdo científico',
        sub: 'Pesquisas e informações sobre cada produto',
      },
      {
        label: 'Atendimento direto',
        sub: 'Contato via (74) 98106-4385',
      },
    ],
  },
};

/**
 * Faz merge profundo do conteúdo vindo do banco com os defaults.
 * Garante que campos novos adicionados ao schema continuem funcionando
 * mesmo se o registro salvo for antigo (forward compatibility).
 */
export function mergeWithDefaults(partial: unknown): HomeContent {
  if (!partial || typeof partial !== 'object') return DEFAULT_HOME_CONTENT;

  const p = partial as Partial<HomeContent>;
  return {
    hero: { ...DEFAULT_HOME_CONTENT.hero, ...(p.hero ?? {}) },
    benefits: {
      ...DEFAULT_HOME_CONTENT.benefits,
      ...(p.benefits ?? {}),
      pilares:
        Array.isArray(p.benefits?.pilares) && p.benefits!.pilares.length === 3
          ? p.benefits!.pilares
          : DEFAULT_HOME_CONTENT.benefits.pilares,
    },
    science: { ...DEFAULT_HOME_CONTENT.science, ...(p.science ?? {}) },
    steps: {
      ...DEFAULT_HOME_CONTENT.steps,
      ...(p.steps ?? {}),
      etapas:
        Array.isArray(p.steps?.etapas) && p.steps!.etapas.length === 4
          ? p.steps!.etapas
          : DEFAULT_HOME_CONTENT.steps.etapas,
    },
    noticias: {
      ...DEFAULT_HOME_CONTENT.noticias,
      ...(p.noticias ?? {}),
      noticias: Array.isArray(p.noticias?.noticias)
        ? p.noticias!.noticias
        : DEFAULT_HOME_CONTENT.noticias.noticias,
    },
    joinCta: {
      ...DEFAULT_HOME_CONTENT.joinCta,
      ...(p.joinCta ?? {}),
      features:
        Array.isArray(p.joinCta?.features) && p.joinCta!.features.length === 3
          ? p.joinCta!.features
          : DEFAULT_HOME_CONTENT.joinCta.features,
    },
  };
}