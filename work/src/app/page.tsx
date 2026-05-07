import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { Science } from '@/components/sections/Science';
import { Steps } from '@/components/sections/Steps';
import { JoinCta } from '@/components/sections/JoinCta';
import { getHomeContent } from '@/lib/home-content-server';

// Sempre busca conteúdo fresco — admin altera e o site reflete na próxima
// requisição. Para reduzir carga, pode-se trocar por revalidate = 30/60.
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const content = await getHomeContent();

  return (
    <>
      <Hero content={content.hero} />
      <Benefits content={content.benefits} />
      <Science content={content.science} />
      <Steps content={content.steps} />
      <JoinCta content={content.joinCta} />
    </>
  );
}
