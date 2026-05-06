import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { Science } from '@/components/sections/Science';
import { Steps } from '@/components/sections/Steps';
import { JoinCta } from '@/components/sections/JoinCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Science />
      <Steps />
      <JoinCta />
    </>
  );
}
