import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Instagram, Youtube } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center mb-4">
              <Image
                src="/imagens/logo.png"
                alt="NEUROFARMA"
                width={240}
                height={80}
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs text-neutral-400">
              Desenvolvimento científico com rigor em cada etapa.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>{SITE_CONFIG.telefone}</span>
              </div>
            </div>
          </div>

          {/* Formulações column */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Formulações
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/formulacoes?tipo=capsulas" className="text-sm hover:text-primary-400 transition-colors">
                  Cápsulas
                </Link>
              </li>
              <li>
                <Link href="/formulacoes?tipo=solucoes-orais" className="text-sm hover:text-primary-400 transition-colors">
                  Soluções orais
                </Link>
              </li>
              <li>
                <Link href="/formulacoes?tipo=emulsao" className="text-sm hover:text-primary-400 transition-colors">
                  Emulsão
                </Link>
              </li>
              <li>
                <Link href="/formulacoes?tipo=comestiveis" className="text-sm hover:text-primary-400 transition-colors">
                  Comestíveis (gomas e chocolate)
                </Link>
              </li>
            </ul>
          </div>

          {/* Apoiadores column */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Apoiadores
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/apoiadores" className="text-sm hover:text-primary-400 transition-colors">
                  Seja um apoiador
                </Link>
              </li>
              <li>
                <Link href="/apoiadores" className="text-sm hover:text-primary-400 transition-colors">
                  Conheça o programa
                </Link>
              </li>
              <li>
                <Link href="/apoiadores" className="text-sm hover:text-primary-400 transition-colors">
                  Benefícios disponíveis
                </Link>
              </li>
              <li>
                <Link href="/apoiadores" className="text-sm hover:text-primary-400 transition-colors">
                  Dúvidas frequentes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            © {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <a href={SITE_CONFIG.redesSociais.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={SITE_CONFIG.redesSociais.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
              className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href={SITE_CONFIG.redesSociais.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
