import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { Science } from '@/components/sections/Science';
import { Steps } from '@/components/sections/Steps';
import { Noticias } from '@/components/sections/Noticias';
import { JoinCta } from '@/components/sections/JoinCta';
import { getHomeContent } from '@/lib/home-content-server';

// force-dynamic + revalidate = 0: nunca serve versão cacheada.
// O par é necessário no Next.js 14 — force-dynamic sozinho não é suficiente
// para inibir o cache de fetch de clientes singleton (ex: supabase-js).
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const content = await getHomeContent();

  return (
    <>
      <Hero content={content.hero} />
      <Benefits content={content.benefits} />
      <Science content={content.science} />
      <Steps content={content.steps} />
      <Noticias content={content.noticias} />
      <JoinCta content={content.joinCta} />
    </>
  );
}