import { z } from 'zod';

export const cadastroSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome muito longo'),
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
  senha: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres'),
  termos: z
    .boolean()
    .refine((val) => val === true, 'Você deve aceitar os termos de uso'),
});

export type CadastroFormData = z.infer<typeof cadastroSchema>;

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
