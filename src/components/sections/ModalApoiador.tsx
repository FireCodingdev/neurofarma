'use client';

import { useState, useEffect } from 'react';
import {
  X, Heart, CheckCircle2, Loader2, MessageCircle,
  ArrowRight, User, MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ModalApoiadorProps {
  produto: {
    id: string;
    nome: string;
    categoria: string;
  };
  onClose: () => void;
}

type Etapa = 'formulario' | 'sucesso';

export function ModalApoiador({ produto, onClose }: ModalApoiadorProps) {
  const [etapa, setEtapa] = useState<Etapa>('formulario');
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', cpf: '',
    cep: '', logradouro: '', numero: '', complemento: '', cidade: '', estado: '',
  });

  const whatsappUrl = `https://wa.me/5574981064385?text=Olá! Acabei de concluir meu cadastro e tenho interesse em me tornar apoiador da Neurofarma. Vim pela página do produto ${encodeURIComponent(produto.nome)}.`;

  // Carrega dados já existentes do perfil
  useEffect(() => {
    fetch('/api/conta/configuracoes')
      .then((r) => r.json())
      .then((json) => {
        const c = json.cliente ?? {};
        setForm({
          nome: c.nome ?? '',
          email: c.email ?? '',
          telefone: c.telefone ?? '',
          cpf: c.cpf ?? '',
          cep: c.cep ?? '',
          logradouro: c.logradouro ?? '',
          numero: c.numero ?? '',
          complemento: c.complemento ?? '',
          cidade: c.cidade ?? '',
          estado: c.estado ?? '',
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const camposFaltando = [
    !form.nome && 'Nome completo',
    !form.telefone && 'Telefone / WhatsApp',
    !form.cpf && 'CPF',
    !form.cep && 'CEP',
    !form.logradouro && 'Logradouro',
    !form.numero && 'Número',
    !form.cidade && 'Cidade',
    !form.estado && 'Estado',
  ].filter(Boolean);

  const handleSalvar = async () => {
    if (camposFaltando.length > 0) {
      setErro(`Preencha os campos obrigatórios: ${camposFaltando.join(', ')}.`);
      return;
    }
    setErro('');
    setSalvando(true);
    try {
      const res = await fetch('/api/conta/configuracoes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Erro ao salvar.');
      setEtapa('sucesso');
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fundo escurecido */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-600 px-6 py-5 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-white">
                  {etapa === 'formulario' ? 'Tornar-se Apoiador' : 'Pedido enviado!'}
                </h2>
                <p className="text-primary-100 text-sm mt-0.5">Neurofarma · Cannabis Medicinal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        {etapa === 'formulario' ? (
          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
              </div>
            ) : (
              <>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Para se tornar apoiador, precisamos que seu cadastro esteja completo.
                  Preencha os dados abaixo para prosseguir.
                </p>

                {/* Dados pessoais */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-primary-600" />
                    <h3 className="text-sm font-semibold text-neutral-800">Dados pessoais</h3>
                  </div>
                  <div className="space-y-3">
                    <Input
                      label="Nome completo *"
                      type="text"
                      value={form.nome}
                      onChange={(e) => set('nome', e.target.value)}
                      placeholder="Seu nome completo"
                    />
                    <Input
                      label="E-mail"
                      type="email"
                      value={form.email}
                      disabled
                      className="opacity-60 cursor-not-allowed"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Telefone / WhatsApp *"
                        type="tel"
                        value={form.telefone}
                        onChange={(e) => set('telefone', e.target.value)}
                        placeholder="(11) 99999-9999"
                      />
                      <Input
                        label="CPF *"
                        type="text"
                        value={form.cpf}
                        onChange={(e) => set('cpf', e.target.value)}
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-primary-600" />
                    <h3 className="text-sm font-semibold text-neutral-800">Endereço</h3>
                  </div>
                  <div className="space-y-3">
                    <Input
                      label="CEP *"
                      type="text"
                      value={form.cep}
                      onChange={(e) => set('cep', e.target.value)}
                      placeholder="00000-000"
                    />
                    <Input
                      label="Logradouro *"
                      type="text"
                      value={form.logradouro}
                      onChange={(e) => set('logradouro', e.target.value)}
                      placeholder="Rua, Avenida..."
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Número *"
                        type="text"
                        value={form.numero}
                        onChange={(e) => set('numero', e.target.value)}
                        placeholder="Nº"
                      />
                      <Input
                        label="Complemento"
                        type="text"
                        value={form.complemento}
                        onChange={(e) => set('complemento', e.target.value)}
                        placeholder="Apto, Bloco..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Cidade *"
                        type="text"
                        value={form.cidade}
                        onChange={(e) => set('cidade', e.target.value)}
                        placeholder="Cidade"
                      />
                      <Input
                        label="Estado *"
                        type="text"
                        value={form.estado}
                        onChange={(e) => set('estado', e.target.value)}
                        placeholder="UF"
                        maxLength={2}
                      />
                    </div>
                  </div>
                </div>

                {erro && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    {erro}
                  </p>
                )}

                <Button
                  onClick={handleSalvar}
                  disabled={salvando}
                  className="w-full"
                  size="md"
                >
                  {salvando ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 mr-2" />
                      Concluir cadastro
                    </>
                  )}
                </Button>

            
              </>
            )}
          </div>
        ) : (
          /* Tela de sucesso */
          <div className="px-6 py-10 flex flex-col items-center text-center space-y-5">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-11 h-11 text-primary-600" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-neutral-900">
                Cadastro Finalizado!
              </h3>
              <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
               Continue diretamente conosco pelo WhatsApp.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                className="w-full bg-[#25D366] hover:bg-[#1ebe5a] text-white"
                size="md"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Falar com a equipe via WhatsApp
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>

            <button
              onClick={onClose}
              className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}