import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página do Apoiador · Neurofarma',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
