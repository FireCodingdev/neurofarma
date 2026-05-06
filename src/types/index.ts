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
