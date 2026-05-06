import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { Steps } from '@/components/sections/Steps';

/**
 * Home page (landing principal).
 * Composição de Hero + Benefits + Steps.
 * Cada seção é um componente isolado em src/components/sections/.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Steps />
    </>
  );
}
