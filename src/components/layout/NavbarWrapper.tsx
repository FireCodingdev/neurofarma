import { supabaseAdmin } from '@/lib/supabase-server';
import { Navbar } from './Navbar';
import type { ProdutoDB } from '@/types';

async function getProdutosNav(): Promise<ProdutoDB[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('produtos')
      .select('id, slug, nome, categoria, descricao_curta, ativo, ordem, icone')
      .eq('ativo', true)
      .order('ordem', { ascending: true });
    if (error) throw error;
    return (data ?? []) as ProdutoDB[];
  } catch {
    return [];
  }
}

export async function NavbarWrapper() {
  const produtos = await getProdutosNav();
  return <Navbar produtos={produtos} />;
}