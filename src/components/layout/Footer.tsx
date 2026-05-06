import Link from 'next/link';
import { Leaf, Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

/**
 * Footer institucional com links agrupados por categoria,
 * informações de contato e redes sociais.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const linkGroups = [
    {
      title: 'Plataforma',
      links: [
        { href: '/produtos', label: 'Produtos' },
        { href: '/servicos', label: 'Serviços' },
        { href: '/planos', label: 'Planos' },
        { href: '/medicos', label: 'Encontre um Médico' },
      ],
    },
    {
      title: 'Profissionais',
      links: [
        { href: '/cadastro', label: 'Cadastre-se' },
        { href: '/login', label: 'Área do Profissional' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '#', label: 'Encontros Clínicos' },
      ],
    },
    {
      title: 'Institucional',
      links: [
        { href: '#', label: 'Sobre Nós' },
        { href: '#', label: 'Blog' },
        { href: '#', label: 'Imprensa' },
        { href: '#', label: 'Trabalhe Conosco' },
      ],
    },
    {
      title: 'Suporte',
      links: [
        { href: '#', label: 'Central de Ajuda' },
        { href: '#', label: 'Contato' },
        { href: '#', label: 'Termos de Uso' },
        { href: '#', label: 'Política de Privacidade' },
      ],
    },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-display text-xl font-semibold text-white">
                Portal Saúde
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              {SITE_CONFIG.description}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>{SITE_CONFIG.telefone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400" />
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
                    <Link
                      href={link.href}
                      className="text-sm hover:text-primary-400 transition-colors"
                    >
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
            <a
              href={SITE_CONFIG.redesSociais.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={SITE_CONFIG.redesSociais.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={SITE_CONFIG.redesSociais.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
