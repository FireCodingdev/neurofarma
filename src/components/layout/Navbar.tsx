'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * Navbar institucional com menu responsivo (hambúrguer no mobile).
 * Itens: Início, Produtos, Serviços, Planos + CTAs Entrar e Começar tratamento.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/produtos', label: 'Produtos' },
    { href: '/servicos', label: 'Serviços' },
    { href: '/planos', label: 'Planos' },
    { href: '/medicos', label: 'Médicos' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary-600 text-white p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-display text-xl lg:text-2xl font-semibold text-neutral-900">
              Portal Saúde
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button variant="primary" size="sm">
                Começar meu tratamento
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors"
            aria-label="Abrir menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu drawer */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isOpen ? 'max-h-96 pb-6' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-neutral-200">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" size="md" className="w-full">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro" onClick={() => setIsOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  Começar meu tratamento
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
