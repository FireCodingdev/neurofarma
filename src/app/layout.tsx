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
  icons: {
    icon: '/imagens/navicon.png',
    shortcut: '/imagens/navicon.png',
    apple: '/imagens/navicon.png',
  },
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
      <body className="min-h-screen flex flex-col bg-[#0d2218]">
        {/* Fixed background: dropper image right-aligned with dark-green gradient fade */}
        <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/imagens/imgfundo.png')",
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'auto 100vh',
              backgroundAttachment: 'fixed',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, #0d2218 0%, #0d2218 10%, rgba(13,34,24,0.95) 20%, rgba(13,34,24,0.8) 32%, rgba(13,34,24,0.55) 45%, rgba(13,34,24,0.25) 60%, rgba(13,34,24,0.05) 75%, transparent 90%)',
            }}
          />
        </div>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
