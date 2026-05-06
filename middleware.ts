/**
 * middleware.ts  (raiz do projeto, ao lado de next.config.mjs)
 *
 * Protege rotas autenticadas usando @supabase/ssr.
 * O middleware roda no Edge Runtime — sem acesso a Node.js nativo.
 *
 * Pré-requisito: npm install @supabase/ssr
 *
 * Lógica:
 *  • Rotas em PROTECTED_ROUTES → redireciona para /login se não autenticado
 *  • Rotas em AUTH_ROUTES (/login, /cadastro) → redireciona para /dashboard
 *    se o usuário JÁ estiver autenticado (evita loop)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/** Rotas que exigem sessão ativa */
const PROTECTED_ROUTES = ['/dashboard', '/admin'];

/** Rotas só para usuários não-autenticados */
const AUTH_ROUTES = ['/login', '/cadastro'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verifica se a rota é relevante para o middleware
  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  if (!isProtected && !isAuthRoute) {
    return NextResponse.next();
  }

  // Cria resposta mutável para que o Supabase possa atualizar os cookies
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Cliente Supabase adaptado para o Edge (lê/escreve cookies da request/response)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Obtém a sessão atual (não lança erro se não houver)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // ── Rota protegida sem sessão → vai para /login ──────────────
  if (isProtected && !session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname); // preserva destino
    return NextResponse.redirect(loginUrl);
  }

  // ── Rota de auth com sessão ativa → vai para /dashboard ─────
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  /*
   * Executa o middleware apenas nas rotas necessárias.
   * Exclui arquivos estáticos, _next e favicon para não impactar performance.
   */
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|imagens|fonts|icons).*)',
  ],
};
