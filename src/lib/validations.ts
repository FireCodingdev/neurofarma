import { z } from 'zod';

/**
 * Schema de validação para o formulário de cadastro de profissionais de saúde.
 * Validações em português para melhor UX brasileira.
 */
export const cadastroSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome muito longo'),
  crm: z
    .string()
    .min(4, 'Registro profissional deve ter no mínimo 4 caracteres')
    .regex(
      /^[A-Z]{2,5}[\s\-]?\d{3,8}\/?[A-Z]{0,2}$/i,
      'Formato inválido. Ex: CRM 123456/SP, CRP 06/12345'
    ),
  especialidade: z
    .string()
    .min(2, 'Selecione uma especialidade'),
  email: z
    .string()
    .email('E-mail inválido')
    .toLowerCase(),
  telefone: z
    .string()
    .regex(
      /^\(?\d{2}\)?[\s\-]?9?\d{4}[\s\-]?\d{4}$/,
      'Telefone inválido. Ex: (11) 99999-9999'
    ),
  termos: z
    .boolean()
    .refine((val) => val === true, 'Você deve aceitar os termos de uso'),
});

export type CadastroFormData = z.infer<typeof cadastroSchema>;

/**
 * Schema para login.
 */
export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
