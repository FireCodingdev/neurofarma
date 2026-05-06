/**
 * src/lib/supabase.ts
 *
 * Exporta dois clientes Supabase:
 *
 *  • supabase   → cliente browser (usa ANON KEY)
 *                 Usado em Client Components e formulários.
 *
 *  • supabaseAdmin → cliente server com SERVICE ROLE KEY
 *                    Usado apenas em Route Handlers (API routes).
 *                    NUNCA exponha no lado do cliente.
 *
 * Pré-requisito: npm install @supabase/supabase-js @supabase/ssr
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[Supabase] NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são obrigatórios.\n' +
    'Crie o arquivo .env.local com as chaves do seu projeto em https://supabase.com'
  );
}

/** Cliente público — seguro para usar no browser */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/** Cliente admin — use SOMENTE em Route Handlers (server-side) */
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);
