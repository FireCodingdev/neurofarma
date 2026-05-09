/**
 * Tipos compartilhados pelo projeto.
 */

export interface Medico {
  id: number;
  nome: string;
  especialidade: string;
  crm: string;
  cidade: string;
  estado: string;
  aceitaTelemedicina: boolean;
  avaliacao: number;
}

export interface Plano {
  id: string;
  nome: string;
  preco: number;
  periodo: string;
  destaque: boolean;
  descricao: string;
  beneficios: string[];
}

export interface Beneficio {
  icon: string;
  titulo: string;
  descricao: string;
}

/** Produto salvo no Supabase (UUID como id) */
export interface ProdutoDB {
  id: string;
  slug: string;
  nome: string;
  categoria: string;
  descricao_curta: string;
  descricao: string;
  composicao: string;
  indicacoes: string[];
  apresentacao: string;
  ativo: boolean;
  ordem: number;
  imagens?: string[];           // URLs das fotos do produto
  created_at?: string;
  updated_at?: string;
}

export type StatusPedido = 'Em preparo' | 'Enviado' | 'Entregue' | 'Cancelado';

export interface Pedido {
  id: string;
  numero: string;
  user_id: string;
  produto_id: string | null;
  produto_nome: string;
  quantidade: number;
  status: StatusPedido;
  observacoes?: string;
  created_at: string;
  updated_at: string;
}

export interface Cliente {
  id: string;
  user_id: string;
  nome: string;
  email: string;
  telefone?: string;
  cpf?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  cidade?: string;
  estado?: string;
}

export type StatusRelatorio = 'rascunho' | 'publicado';

export interface RelatorioTecnico {
  id: string;
  slug: string;
  titulo: string;
  subtitulo?: string;
  imagem_capa?: string;
  corpo?: string;
  categorias: string[];
  status: StatusRelatorio;
  data_publicacao?: string;
  criado_em: string;
  atualizado_em: string;
}