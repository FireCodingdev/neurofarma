import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Youtube } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const linkGroups = [
    {
      title: 'Produtos',
      links: [
        { href: '/produtos', label: 'Ver todos os produtos' },
        { href: '/produtos/neuro-c10', label: 'Neuro-C10' },
        { href: '/produtos/neuro-c25', label: 'Neuro-C25' },
        { href: '/produtos/neuro-balance', label: 'Neuro-Balance' },
        { href: '/produtos/neuro-caps', label: 'Neuro-Caps' },
      ],
    },
    {
      title: 'Conta',
      links: [
        { href: '/cadastro', label: 'Criar conta' },
        { href: '/login', label: 'Entrar' },
        { href: '/conta/configuracoes', label: 'Minha área' },
        { href: '/conta/pedidos', label: 'Meus pedidos' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: '#', label: 'Sobre a Neurofarma' },
        { href: '#', label: 'Termos de uso' },
        { href: '#', label: 'Política de privacidade' },
        { href: '#', label: 'Contato' },
      ],
    },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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
              Pesquisa farmacêutica à base de Cannabis medicinal. 100% legal,
              regulamentado pela Anvisa (RDC 327/2019).
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
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>{SITE_CONFIG.endereco}</span>
              </div>
            </div>
          </div>

          {/* Link groups */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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