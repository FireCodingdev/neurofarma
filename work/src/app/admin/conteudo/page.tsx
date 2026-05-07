import { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Info } from 'lucide-react';
import { ConteudoHomeForm } from '@/components/forms/ConteudoHomeForm';
import { getHomeContent } from '@/lib/home-content-server';

export const metadata: Metadata = {
  title: 'Conteúdo da Home · Admin Neurofarma',
};

// O conteúdo precisa ser fresco a cada carregamento da página de admin
// para refletir o que está realmente no banco no momento.
export const dynamic = 'force-dynamic';

export default async function ConteudoHomePage() {
  const content = await getHomeContent();

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-neutral-900">
          Conteúdo da página inicial
        </h1>
        <p className="text-neutral-500 mt-1">
          Edite todos os textos das 5 seções da home. As alterações aparecem no
          site assim que você salvar.
        </p>
      </div>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900 leading-relaxed">
          <p className="font-semibold mb-1">Dica:</p>
          <p>
            Os títulos grandes (com uma palavra em verde) são divididos em 3
            partes para você poder controlar exatamente qual trecho fica em
            destaque. As partes têm espaços nas pontas — preserve-os para o
            texto não ficar grudado.
          </p>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 mt-2 font-semibold hover:underline"
          >
            Abrir o site em nova aba <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <ConteudoHomeForm initialContent={content} />
    </div>
  );
}
