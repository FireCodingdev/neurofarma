import Link from 'next/link';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PaywallRelatorioProps {
  logado: boolean;
}

export function PaywallRelatorio({ logado }: PaywallRelatorioProps) {
  return (
    <div className="my-10 flex justify-center">
      <div className="bg-white border border-amber-200 rounded-3xl p-10 text-center max-w-lg w-full shadow-sm">
        <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Lock className="w-8 h-8 text-amber-600" />
        </div>

        <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
          Conteúdo Exclusivo para Apoiadores
        </h3>

        {logado ? (
          <>
            <p className="text-neutral-500 text-sm leading-relaxed mb-7">
              Você está logado, mas este conteúdo é exclusivo para <strong className="text-neutral-700">Apoiadores ativos</strong>.
              Torne-se um apoiador para ter acesso completo a este relatório.
            </p>
            <Link href="/apoiadores">
              <Button variant="primary" size="md">
                Seja um Apoiador
              </Button>
            </Link>
          </>
        ) : (
          <>
            <p className="text-neutral-500 text-sm leading-relaxed mb-7">
              Este conteúdo é exclusivo para Apoiadores ativos da Neurofarma.
              Faça login ou torne-se um apoiador para ter acesso.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/login">
                <Button variant="outline" size="md" className="w-full sm:w-auto">
                  Entrar
                </Button>
              </Link>
              <Link href="/apoiadores">
                <Button variant="primary" size="md" className="w-full sm:w-auto">
                  Seja um Apoiador
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
