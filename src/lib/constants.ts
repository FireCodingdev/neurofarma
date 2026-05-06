/**
 * Constantes globais do site: especialidades médicas, dados mockados,
 * informações institucionais. Centralizar facilita atualizações futuras.
 */

export const ESPECIALIDADES = [
  'Clínica Geral',
  'Cardiologia',
  'Dermatologia',
  'Endocrinologia',
  'Ginecologia',
  'Neurologia',
  'Oncologia',
  'Ortopedia',
  'Pediatria',
  'Psiquiatria',
  'Psicologia',
  'Urologia',
  'Outra',
] as const;

export const SITE_CONFIG = {
  name: 'NEUROFARMA',
  description: 'Programa de profissionais de saúde - Cuidado, conhecimento e comunidade.',
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

/**
 * Dados mockados de médicos para a página de listagem.
 * Em produção, viriam do Supabase via fetch.
 */
export const MEDICOS_MOCK = [
  {
    id: 1,
    nome: 'Dra. Mariana Silva',
    especialidade: 'Clínica Geral',
    crm: 'CRM 123456/SP',
    cidade: 'São Paulo',
    estado: 'SP',
    aceitaTelemedicina: true,
    avaliacao: 4.9,
  },
  {
    id: 2,
    nome: 'Dr. Rafael Costa',
    especialidade: 'Psiquiatria',
    crm: 'CRM 654321/RJ',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    aceitaTelemedicina: true,
    avaliacao: 4.8,
  },
  {
    id: 3,
    nome: 'Dra. Camila Mendes',
    especialidade: 'Neurologia',
    crm: 'CRM 789123/MG',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    aceitaTelemedicina: false,
    avaliacao: 5.0,
  },
  {
    id: 4,
    nome: 'Dr. Lucas Ferreira',
    especialidade: 'Dermatologia',
    crm: 'CRM 456789/RS',
    cidade: 'Porto Alegre',
    estado: 'RS',
    aceitaTelemedicina: true,
    avaliacao: 4.7,
  },
  {
    id: 5,
    nome: 'Dra. Beatriz Almeida',
    especialidade: 'Ginecologia',
    crm: 'CRM 321654/BA',
    cidade: 'Salvador',
    estado: 'BA',
    aceitaTelemedicina: true,
    avaliacao: 4.9,
  },
  {
    id: 6,
    nome: 'Dr. Pedro Henrique',
    especialidade: 'Cardiologia',
    crm: 'CRM 987654/PR',
    cidade: 'Curitiba',
    estado: 'PR',
    aceitaTelemedicina: false,
    avaliacao: 4.8,
  },
];

/**
 * Planos disponíveis para profissionais de saúde.
 */
export const PLANOS = [
  {
    id: 'essencial',
    nome: 'Essencial',
    preco: 89,
    periodo: 'mês',
    destaque: false,
    descricao: 'Para começar sua jornada no programa.',
    beneficios: [
      'Cadastro na rede de prescritores',
      'Acesso a 2 encontros clínicos/mês',
      'Materiais educativos básicos',
      'Suporte por e-mail',
    ],
  },
  {
    id: 'profissional',
    nome: 'Profissional',
    preco: 189,
    periodo: 'mês',
    destaque: true,
    descricao: 'Para quem quer crescer com a comunidade.',
    beneficios: [
      'Tudo do plano Essencial',
      'Encontros clínicos ilimitados',
      'Visibilidade destacada na busca',
      'Acesso a casos clínicos exclusivos',
      'Suporte prioritário via WhatsApp',
      'Certificados digitais',
    ],
  },
  {
    id: 'institucional',
    nome: 'Institucional',
    preco: 449,
    periodo: 'mês',
    destaque: false,
    descricao: 'Para clínicas e equipes multiprofissionais.',
    beneficios: [
      'Tudo do plano Profissional',
      'Até 10 profissionais cadastrados',
      'Dashboard de gestão da clínica',
      'Mentoria mensal personalizada',
      'API para integração',
      'Gerente de conta dedicado',
    ],
  },
];
