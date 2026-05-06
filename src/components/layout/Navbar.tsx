'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { PRODUTOS_MOCK } from '@/lib/constants';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [produtosOpen, setProdutosOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProdutosOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/servicos', label: 'Serviços' },
  ];

  const produtosAtivos = PRODUTOS_MOCK.filter((p) => p.ativo);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Image
              src="/imagens/logo.png"
              alt="NEUROFARMA"
              width={220}
              height={74}
              className="h-16 w-auto object-contain"
              priority
            />
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

            {/* Produtos dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProdutosOpen((v) => !v)}
                className="flex items-center gap-1.5 text-neutral-700 hover:text-primary-600 font-medium transition-colors"
                aria-haspopup="true"
                aria-expanded={produtosOpen}
              >
                Produtos
                <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', produtosOpen && 'rotate-180')} />
              </button>

              {produtosOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-2xl border border-neutral-200 shadow-lg py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-neutral-100 mb-1">
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Formulações</p>
                  </div>
                  {produtosAtivos.map((produto) => (
                    <Link
                      key={produto.slug}
                      href={`/produtos/${produto.slug}`}
                      onClick={() => setProdutosOpen(false)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-primary-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FlaskConical className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{produto.nome}</p>
                        <p className="text-xs text-neutral-500 line-clamp-1">{produto.descricaoCurta}</p>
                      </div>
                    </Link>
                  ))}
                  <div className="px-4 pt-2 mt-1 border-t border-neutral-100">
                    <Link
                      href="/produtos"
                      onClick={() => setProdutosOpen(false)}
                      className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      Ver todos os produtos →
                    </Link>
                  </div>
                </div>
              )}
            </div>
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
                Cadastrar-se
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

        {/* Mobile drawer */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isOpen ? 'max-h-screen pb-6' : 'max-h-0'
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

            {/* Mobile products list */}
            <div className="px-4 pt-3 pb-1">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">Produtos</p>
              {produtosAtivos.map((produto) => (
                <Link
                  key={produto.slug}
                  href={`/produtos/${produto.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 py-2.5 text-neutral-700 hover:text-primary-700 transition-colors"
                >
                  <FlaskConical className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{produto.nome}</span>
                  <span className="text-xs text-neutral-400 ml-auto">{produto.categoria}</span>
                </Link>
              ))}
              <Link
                href="/produtos"
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold text-primary-600 mt-1 block"
              >
                Ver todos →
              </Link>
            </div>

            <div className="flex flex-col gap-2 mt-3 pt-4 border-t border-neutral-200">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" size="md" className="w-full">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro" onClick={() => setIsOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  Cadastrar-se
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
