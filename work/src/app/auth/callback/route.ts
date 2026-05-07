/**
 * GET /auth/callback
 *
 * Rota de callback do Supabase Auth.
 * Usada quando o usuário clica em links de e-mail:
 *  - Redefinição de senha
 *  - Confirmação de cadastro
 *  - Magic link
 *
 * O Supabase redireciona para esta URL com um `code` na query string.
 * Aqui trocamos o code por uma sessão real e redirecionamos o usuário.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // `next` pode vir explícito; senão decidimos abaixo pela role do usuário.
  const explicitNext = searchParams.get('next');

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      let destino = '/conta/pedidos';
      if (explicitNext && explicitNext.startsWith('/')) {
        destino = explicitNext;
      } else if (data.session?.user.app_metadata?.role === 'admin') {
        destino = '/admin';
      }
      return NextResponse.redirect(`${origin}${destino}`);
    }
  }

  // Algo deu errado — manda para o login com aviso
  return NextResponse.redirect(`${origin}/login?error=link_invalido`);
}