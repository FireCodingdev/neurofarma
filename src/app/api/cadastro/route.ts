/**
 * POST /api/cadastro
 *
 * Fluxo:
 *  1. Valida os dados com Zod (mesmo schema do front-end)
 *  2. Cria o usuário no Supabase Auth (email + senha temporária)
 *  3. Insere o perfil na tabela `profissionais`
 *  4. Retorna { success: true } ou { error: string }
 *
 * Usa supabaseAdmin (service role) para poder criar usuários
 * sem precisar de confirmação de e-mail nesta etapa.
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cadastroSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validação server-side (nunca confie só no front-end)
    const parsed = cadastroSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { nome, crm, especialidade, email, telefone } = parsed.data;

    // 2. Criar usuário no Supabase Auth
    //    Senha temporária: profissional vai redefinir pelo e-mail
    const senhaTemp = `Neuro@${Math.random().toString(36).slice(2, 10)}`;

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password: senhaTemp,
        email_confirm: true, // pula e-mail de confirmação na criação
      });

    if (authError) {
      // E-mail já cadastrado
      if (authError.message.includes('already registered')) {
        return NextResponse.json(
          { error: 'Este e-mail já possui cadastro.' },
          { status: 409 }
        );
      }
      throw authError;
    }

    // 3. Inserir perfil na tabela `profissionais`
    const { error: dbError } = await supabaseAdmin
      .from('profissionais')
      .insert({
        user_id: authData.user.id,
        nome,
        crm,
        especialidade,
        email,
        telefone,
      });

    if (dbError) throw dbError;

    // 4. Enviar e-mail de redefinição de senha para o profissional
    //    (ele recebe um link para criar a própria senha)
    await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[/api/cadastro] erro:', err);
    return NextResponse.json(
      { error: 'Erro interno. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
