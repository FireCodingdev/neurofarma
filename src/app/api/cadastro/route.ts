import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { cadastroSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = cadastroSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { nome, email, telefone, senha } = parsed.data;

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password: senha,
        email_confirm: true,
      });

    if (authError) {
      if (authError.message.toLowerCase().includes('already registered')) {
        return NextResponse.json(
          { error: 'Este e-mail já possui cadastro.' },
          { status: 409 }
        );
      }
      throw authError;
    }

    // Salvar dados do cliente na tabela clientes
    const { error: clienteError } = await supabaseAdmin
      .from('clientes')
      .insert({
        user_id: authData.user.id,
        nome,
        email,
        telefone: telefone ?? null,
      });

    if (clienteError) {
      // Não falha o cadastro se a inserção do cliente falhar,
      // mas loga o erro para debug
      console.error('[/api/cadastro] erro ao criar cliente:', clienteError);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[/api/cadastro] erro:', err);
    return NextResponse.json(
      { error: 'Erro interno. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
