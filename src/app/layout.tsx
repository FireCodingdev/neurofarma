import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SITE_CONFIG } from '@/lib/constants';

// Font Inter para corpo do texto
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Font Playfair Display para títulos (serif elegante e institucional)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} - Programa para Profissionais de Saúde`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ['saúde', 'profissionais', 'médicos', 'prescritores', 'cannabis medicinal', 'tratamento'],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
};

/**
 * Root layout: aplica as fontes, renderiza Navbar e Footer
 * em todas as páginas, e injeta os estilos globais.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
