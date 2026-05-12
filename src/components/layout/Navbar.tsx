'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import {
  Menu, X, ChevronDown, FlaskConical, LogOut,
  LayoutDashboard, Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { ProdutoDB } from '@/types';

interface NavbarProps {
  produtos: ProdutoDB[];
}

export function Navbar({ produtos }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [produtosOpen, setProdutosOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const produtosRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (produtosRef.current && !produtosRef.current.contains(e.target as Node)) {
        setProdutosOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  const isAdmin = user?.app_metadata?.role === 'admin';
  const initials = user?.email?.slice(0, 2).toUpperCase() ?? 'U';

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          <Link href="/" className="flex items-center flex-shrink-0 mr-20">
            <Image
              src="/imagens/logo.png"
              alt="NEUROFARMA"
              width={300}
              height={100}
              className="h-24 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <Link href="/"
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
              Início
            </Link>

            {/* Produtos dropdown */}
            <div className="relative" ref={produtosRef}>
              <button
                onClick={() => setProdutosOpen((v) => !v)}
                className="flex items-center gap-1.5 text-neutral-700 hover:text-primary-600 font-medium transition-colors"
                aria-haspopup="true"
                aria-expanded={produtosOpen}
              >
                Formulações
                <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', produtosOpen && 'rotate-180')} />
              </button>

              {produtosOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-2xl border border-neutral-200 shadow-lg py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-neutral-100 mb-1">
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Formulações</p>
                  </div>
                  {produtos.map((produto) => (
                    <Link key={produto.slug} href={`/produtos/${produto.slug}`}
                      onClick={() => setProdutosOpen(false)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-primary-50 transition-colors">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FlaskConical className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{produto.nome}</p>
                        <p className="text-xs text-neutral-500 line-clamp-1">{produto.descricao_curta}</p>
                      </div>
                    </Link>
                  ))}
                  <div className="px-4 pt-2 mt-1 border-t border-neutral-100">
                    <Link href="/formulacoes" onClick={() => setProdutosOpen(false)}
                      className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                      Todas as Formulações →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/apoiadores"
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
              Apoiadores
            </Link>

            <Link href="/quem-somos"
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
              Quem Somos
            </Link>

            <Link href="/relatorios-tecnicos"
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
              Relatórios P&D
            </Link>

            <span className="text-neutral-300 select-none text-lg font-light">|</span>

            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="secondary" size="sm" className="gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      Admin CRM
                    </Button>
                  </Link>
                )}

                {!isAdmin && (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen((v) => !v)}
                      aria-haspopup="true"
                      aria-expanded={userMenuOpen}
                      className={cn(
                        'flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border-2 transition-all duration-150',
                        userMenuOpen
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-primary-400 bg-white hover:bg-primary-50'
                      )}
                    >
                      <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{initials}</span>
                      </div>
                      <span className="text-sm font-medium text-neutral-700 max-w-[120px] truncate">
                        {user.email}
                      </span>
                      <ChevronDown className={cn('w-3.5 h-3.5 text-neutral-500 transition-transform duration-200', userMenuOpen && 'rotate-180')} />
                    </button>

                    {userMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl border border-neutral-200 shadow-lg py-2 animate-fade-in">
                        <div className="px-4 py-3 border-b border-neutral-100">
                          <p className="text-xs text-neutral-500">Logado como</p>
                          <p className="text-sm font-semibold text-neutral-900 truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link href="/conta/configuracoes"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors">
                            <Settings className="w-4 h-4 text-neutral-400" />
                            Configurações do perfil
                          </Link>
                        </div>
                        <div className="border-t border-neutral-100 pt-1">
                          <button onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                            <LogOut className="w-4 h-4" />
                            Sair
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {isAdmin && (
                  <button onClick={handleLogout}
                    className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-red-600 transition-colors px-3 py-2">
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                )}
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Entrar</Button>
                </Link>
                <Link href="/cadastro">
                  <Button variant="primary" size="sm">Cadastrar-se</Button>
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors"
            aria-label="Abrir menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={cn('lg:hidden overflow-hidden transition-all duration-300', isOpen ? 'max-h-screen pb-6' : 'max-h-0')}>
          <div className="flex flex-col gap-1 pt-2">
            <Link href="/" onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg font-medium transition-colors">
              Início
            </Link>

            <div className="px-4 pt-3 pb-1">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">Formulações</p>
              {produtos.map((produto) => (
                <Link key={produto.slug} href={`/produtos/${produto.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 py-2.5 text-neutral-700 hover:text-primary-700 transition-colors">
                  <FlaskConical className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{produto.nome}</span>
                </Link>
              ))}
              <Link href="/formulacoes" onClick={() => setIsOpen(false)}
                className="text-xs font-semibold text-primary-600 mt-1 block">Todas as Formulações →</Link>
            </div>

            <Link href="/apoiadores" onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg font-medium transition-colors">
              Apoiadores
            </Link>

            <Link href="/quem-somos" onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg font-medium transition-colors">
              Quem Somos
            </Link>

            <Link href="/relatorios-tecnicos" onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg font-medium transition-colors">
              Relatórios P&D
            </Link>

            {user && (
              <div className="px-4 pt-3 pb-1 border-t border-neutral-100 mt-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{initials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-500">Logado como</p>
                    <p className="text-sm font-semibold text-neutral-900 truncate">{user.email}</p>
                  </div>
                </div>

                {!isAdmin && (
                  <>
                    <Link href="/conta/configuracoes" onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 py-2.5 text-sm text-neutral-700 hover:text-primary-700 transition-colors">
                      <Settings className="w-4 h-4 text-neutral-400" />
                      Configurações do perfil
                    </Link>
                  </>
                )}

                {isAdmin && (
                  <Link href="/admin" onClick={() => setIsOpen(false)}>
                    <Button variant="secondary" size="sm" className="w-full gap-2 mb-2">
                      <LayoutDashboard className="w-4 h-4" />
                      Admin CRM
                    </Button>
                  </Link>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-neutral-200">
              {user ? (
                <button onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="md" className="w-full">Entrar</Button>
                  </Link>
                  <Link href="/cadastro" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" size="md" className="w-full">Cadastrar-se</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}