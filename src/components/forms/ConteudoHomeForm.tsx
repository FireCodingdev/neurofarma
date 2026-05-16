'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle, RotateCcw, Save, Plus, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  DEFAULT_HOME_CONTENT,
  type HomeContent,
  type NoticiaItem,
} from '@/lib/home-content';
import { PRODUTO_ICONES } from '@/lib/produto-icons';

interface ConteudoHomeFormProps {
  initialContent: HomeContent;
}

/**
 * Textarea consistente com o resto do admin (mesmo estilo do ProdutoForm).
 */
function Textarea({
  label,
  value,
  onChange,
  rows = 3,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1.5">
        {label}
        {hint && <span className="text-neutral-400 font-normal ml-1">({hint})</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
      />
    </div>
  );
}

/**
 * Cabeçalho de seção com aviso sobre o título quebrado.
 */
function TituloAjudaBox({ exemplo }: { exemplo: string }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 leading-relaxed">
      <strong>Como funciona o título destacado:</strong> o título é dividido em
      partes para que apenas um trecho apareça em verde/itálico. Exemplo:{' '}
      <code className="bg-blue-100 px-1 rounded">{exemplo}</code>
    </div>
  );
}

export function ConteudoHomeForm({ initialContent }: ConteudoHomeFormProps) {
  const [content, setContent] = useState<HomeContent>(initialContent);
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helpers para atualizar partes específicas mantendo imutabilidade.
  const updateHero = (patch: Partial<HomeContent['hero']>) =>
    setContent((c) => ({ ...c, hero: { ...c.hero, ...patch } }));

  const updateHeroTrust = (idx: number, patch: Partial<HomeContent['hero']['trust_indicators'][number]>) =>
    setContent((c) => ({
      ...c,
      hero: {
        ...c.hero,
        trust_indicators: c.hero.trust_indicators.map((t, i) =>
          i === idx ? { ...t, ...patch } : t
        ),
      },
    }));

  const updateBenefits = (patch: Partial<HomeContent['benefits']>) =>
    setContent((c) => ({ ...c, benefits: { ...c.benefits, ...patch } }));

  const updatePilar = (idx: number, patch: Partial<HomeContent['benefits']['pilares'][number]>) =>
    setContent((c) => ({
      ...c,
      benefits: {
        ...c.benefits,
        pilares: c.benefits.pilares.map((p, i) =>
          i === idx ? { ...p, ...patch } : p
        ),
      },
    }));

  const updatePilarDetalhe = (pilarIdx: number, detIdx: number, value: string) =>
    setContent((c) => ({
      ...c,
      benefits: {
        ...c.benefits,
        pilares: c.benefits.pilares.map((p, i) =>
          i === pilarIdx
            ? {
                ...p,
                detalhes: p.detalhes.map((d, j) => (j === detIdx ? value : d)),
              }
            : p
        ),
      },
    }));

  const updateScience = (patch: Partial<HomeContent['science']>) =>
    setContent((c) => ({ ...c, science: { ...c.science, ...patch } }));

  const updateSteps = (patch: Partial<HomeContent['steps']>) =>
    setContent((c) => ({ ...c, steps: { ...c.steps, ...patch } }));

  const updateEtapa = (idx: number, patch: Partial<HomeContent['steps']['etapas'][number]>) =>
    setContent((c) => ({
      ...c,
      steps: {
        ...c.steps,
        etapas: c.steps.etapas.map((e, i) =>
          i === idx ? { ...e, ...patch } : e
        ),
      },
    }));

  const updateJoinCta = (patch: Partial<HomeContent['joinCta']>) =>
    setContent((c) => ({ ...c, joinCta: { ...c.joinCta, ...patch } }));

  const updateFeature = (idx: number, patch: Partial<HomeContent['joinCta']['features'][number]>) =>
    setContent((c) => ({
      ...c,
      joinCta: {
        ...c.joinCta,
        features: c.joinCta.features.map((f, i) =>
          i === idx ? { ...f, ...patch } : f
        ),
      },
    }));

  const updateNoticias = (patch: Partial<HomeContent['noticias']>) =>
    setContent((c) => ({ ...c, noticias: { ...c.noticias, ...patch } }));

  const updateNoticiaItem = (idx: number, patch: Partial<NoticiaItem>) =>
    setContent((c) => ({
      ...c,
      noticias: {
        ...c.noticias,
        noticias: c.noticias.noticias.map((n, i) =>
          i === idx ? { ...n, ...patch } : n
        ),
      },
    }));

  const addNoticia = () =>
    setContent((c) => ({
      ...c,
      noticias: {
        ...c.noticias,
        noticias: [
          ...c.noticias.noticias,
          { titulo: '', descricao_curta: '', imagem_url: '', badge: '', link: '' },
        ],
      },
    }));

  const removeNoticia = (idx: number) =>
    setContent((c) => ({
      ...c,
      noticias: {
        ...c.noticias,
        noticias: c.noticias.noticias.filter((_, i) => i !== idx),
      },
    }));

  const handleResetDefaults = () => {
    if (
      confirm(
        'Restaurar todos os textos para os valores padrão? Suas alterações não salvas serão perdidas.'
      )
    ) {
      setContent(DEFAULT_HOME_CONTENT);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSavedOk(false);

    try {
      const res = await fetch('/api/admin/home-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? 'Erro ao salvar.');
      } else {
        setSavedOk(true);
        // Reflete o que foi salvo (já com merge aplicado pelo backend).
        if (json.content) setContent(json.content as HomeContent);
        setTimeout(() => setSavedOk(false), 3000);
      }
    } catch {
      setError('Erro de rede. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* HERO ================================================== */}
      <Card>
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-display text-lg font-bold text-neutral-900">1. Banner principal (Hero)</h2>
          <span className="text-xs text-neutral-500">Topo da página inicial</span>
        </div>
        <p className="text-sm text-neutral-500 mb-5">
          Primeira coisa que o visitante vê: badge legal, título grande, subtítulo e botões.
        </p>
        <div className="space-y-4">
          <TituloAjudaBox exemplo='"A ciência da " + "cannabis" + " a serviço da vida."' />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              label="Título — parte 1"
              value={content.hero.titulo_parte1}
              onChange={(e) => updateHero({ titulo_parte1: e.target.value })}
            />
            <Input
              label="Título — destaque (verde itálico)"
              value={content.hero.titulo_destaque}
              onChange={(e) => updateHero({ titulo_destaque: e.target.value })}
            />
            <Input
              label="Título — parte 2"
              value={content.hero.titulo_parte2}
              onChange={(e) => updateHero({ titulo_parte2: e.target.value })}
            />
          </div>

          <Textarea
            label="Subtítulo"
            value={content.hero.subtitulo}
            onChange={(v) => updateHero({ subtitulo: v })}
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Botão principal"
              value={content.hero.cta_primario}
              onChange={(e) => updateHero({ cta_primario: e.target.value })}
            />
            <Input
              label="Botão secundário"
              value={content.hero.cta_secundario}
              onChange={(e) => updateHero({ cta_secundario: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-800 mb-2">
              Indicadores de confiança (3 caixas embaixo)
            </label>
            <div className="space-y-3">
              {content.hero.trust_indicators.map((t, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-neutral-50 rounded-xl">
                  <Input
                    label={`Indicador ${idx + 1} — título`}
                    value={t.label}
                    onChange={(e) => updateHeroTrust(idx, { label: e.target.value })}
                  />
                  <Input
                    label={`Indicador ${idx + 1} — descrição`}
                    value={t.sub}
                    onChange={(e) => updateHeroTrust(idx, { sub: e.target.value })}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* BENEFITS ================================================== */}
      <Card>
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-display text-lg font-bold text-neutral-900">2. Pilares (3 cards brancos)</h2>
          <span className="text-xs text-neutral-500">Seção “O que fazemos”</span>
        </div>
        <p className="text-sm text-neutral-500 mb-5">
          Cabeçalho da seção e os três pilares de pesquisa.
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Eyebrow (texto verde pequeno acima do título)"
              value={content.benefits.eyebrow}
              onChange={(e) => updateBenefits({ eyebrow: e.target.value })}
            />
          </div>

          <TituloAjudaBox exemplo='"Ciência séria por trás de " + "cada gota"' />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Título — parte 1"
              value={content.benefits.titulo_parte1}
              onChange={(e) => updateBenefits({ titulo_parte1: e.target.value })}
            />
            <Input
              label="Título — destaque (verde)"
              value={content.benefits.titulo_destaque}
              onChange={(e) => updateBenefits({ titulo_destaque: e.target.value })}
            />
          </div>

          <Textarea
            label="Subtítulo"
            value={content.benefits.subtitulo}
            onChange={(v) => updateBenefits({ subtitulo: v })}
            rows={2}
          />

          {/* Pilares */}
          {content.benefits.pilares.map((p, idx) => (
            <div key={idx} className="border border-neutral-200 rounded-xl p-4 bg-neutral-50/50">
              <h3 className="font-semibold text-sm text-neutral-800 mb-3">
                Pilar {idx + 1}
              </h3>
              <div className="space-y-3">
                {/* Preview da imagem */}
                {p.imagem_url && (
                  <div className="flex items-center gap-3 p-2 bg-neutral-100 rounded-xl">
                    <img
                      src={p.imagem_url}
                      alt="preview"
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-neutral-200"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <span className="text-xs text-neutral-500 break-all">{p.imagem_url}</span>
                  </div>
                )}
                <Input
                  label="URL da imagem do pilar (opcional — substitui o ícone)"
                  value={p.imagem_url ?? ''}
                  onChange={(e) => updatePilar(idx, { imagem_url: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                <Input
                  label="Título do pilar"
                  value={p.titulo}
                  onChange={(e) => updatePilar(idx, { titulo: e.target.value })}
                />
                <Textarea
                  label="Descrição"
                  value={p.descricao}
                  onChange={(v) => updatePilar(idx, { descricao: v })}
                  rows={3}
                />
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Itens da lista (3 bullet points)
                  </label>
                  <div className="space-y-2">
                    {p.detalhes.map((d, j) => (
                      <Input
                        key={j}
                        value={d}
                        onChange={(e) => updatePilarDetalhe(idx, j, e.target.value)}
                        placeholder={`Item ${j + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* SCIENCE ================================================== */}
      <Card>
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-display text-lg font-bold text-neutral-900">3. Bloco “A ciência”</h2>
          <span className="text-xs text-neutral-500">Seção sobre evidência científica</span>
        </div>
        <p className="text-sm text-neutral-500 mb-5">
          Texto explicativo sobre cannabis medicinal e regulamentação.
        </p>
        <div className="space-y-4">
          <Input
            label="Eyebrow (texto verde acima do título)"
            value={content.science.eyebrow}
            onChange={(e) => updateScience({ eyebrow: e.target.value })}
          />

          <TituloAjudaBox exemplo='"Cannabis medicinal não é modismo. " + "É evidência."' />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Título — parte 1"
              value={content.science.titulo_parte1}
              onChange={(e) => updateScience({ titulo_parte1: e.target.value })}
            />
            <Input
              label="Título — destaque"
              value={content.science.titulo_destaque}
              onChange={(e) => updateScience({ titulo_destaque: e.target.value })}
            />
          </div>

          <Textarea
            label="Primeiro parágrafo"
            value={content.science.paragrafo1}
            onChange={(v) => updateScience({ paragrafo1: v })}
            rows={4}
          />
          <Textarea
            label="Segundo parágrafo"
            value={content.science.paragrafo2}
            onChange={(v) => updateScience({ paragrafo2: v })}
            rows={3}
          />

          <Input
            label="Selo verde inferior"
            value={content.science.badge_inferior}
            onChange={(e) => updateScience({ badge_inferior: e.target.value })}
          />
        </div>
      </Card>

      {/* STEPS ================================================== */}
      <Card>
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-display text-lg font-bold text-neutral-900">4. Processo (4 etapas no fundo escuro)</h2>
          <span className="text-xs text-neutral-500">Seção “Do laboratório ao paciente”</span>
        </div>
        <p className="text-sm text-neutral-500 mb-5">
          As 4 etapas do processo de fabricação e o botão final.
        </p>
        <div className="space-y-4">
          <Input
            label="Eyebrow"
            value={content.steps.eyebrow}
            onChange={(e) => updateSteps({ eyebrow: e.target.value })}
          />

          <TituloAjudaBox exemplo='"Do laboratório " + "ao paciente"' />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Título — parte 1"
              value={content.steps.titulo_parte1}
              onChange={(e) => updateSteps({ titulo_parte1: e.target.value })}
            />
            <Input
              label="Título — destaque"
              value={content.steps.titulo_destaque}
              onChange={(e) => updateSteps({ titulo_destaque: e.target.value })}
            />
          </div>

          <Textarea
            label="Subtítulo"
            value={content.steps.subtitulo}
            onChange={(v) => updateSteps({ subtitulo: v })}
            rows={2}
          />

          {content.steps.etapas.map((etapa, idx) => (
            <div key={idx} className="border border-neutral-200 rounded-xl p-4 bg-neutral-50/50">
              <h3 className="font-semibold text-sm text-neutral-800 mb-3">
                Etapa {String(idx + 1).padStart(2, '0')}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Ícone da etapa
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {PRODUTO_ICONES.map(({ nome, label, Icon }) => (
                      <button
                        key={nome}
                        type="button"
                        onClick={() => updateEtapa(idx, { icone: nome })}
                        className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all ${
                          (etapa.icone ?? '') === nome
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-neutral-200 hover:border-primary-300 text-neutral-500 hover:bg-neutral-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium leading-none">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <Input
                  label="Título"
                  value={etapa.titulo}
                  onChange={(e) => updateEtapa(idx, { titulo: e.target.value })}
                />
                <Textarea
                  label="Descrição"
                  value={etapa.descricao}
                  onChange={(v) => updateEtapa(idx, { descricao: v })}
                  rows={3}
                />
              </div>
            </div>
          ))}

          <Input
            label="Texto do botão final"
            value={content.steps.cta}
            onChange={(e) => updateSteps({ cta: e.target.value })}
          />
        </div>
      </Card>

      {/* NOTICIAS ================================================== */}
      <Card>
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-display text-lg font-bold text-neutral-900">5. Notícias (carrossel)</h2>
          <span className="text-xs text-neutral-500">Seção entre o processo e a chamada final</span>
        </div>
        <p className="text-sm text-neutral-500 mb-5">
          Adicione notícias para exibir no carrossel. A seção fica oculta enquanto não houver nenhuma notícia cadastrada.
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Eyebrow (texto verde acima do título)"
              value={content.noticias.eyebrow}
              onChange={(e) => updateNoticias({ eyebrow: e.target.value })}
            />
            <Input
              label="Título da seção"
              value={content.noticias.titulo}
              onChange={(e) => updateNoticias({ titulo: e.target.value })}
            />
          </div>

          {/* Lista de notícias */}
          <div className="space-y-4">
            {content.noticias.noticias.length === 0 && (
              <p className="text-sm text-neutral-400 italic text-center py-4 border border-dashed border-neutral-200 rounded-xl">
                Nenhuma notícia cadastrada. Clique em "Adicionar notícia" para começar.
              </p>
            )}

            {content.noticias.noticias.map((noticia, idx) => (
              <div key={idx} className="border border-neutral-200 rounded-xl p-4 bg-neutral-50/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm text-neutral-800">
                    Notícia {idx + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeNoticia(idx)}
                    className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remover
                  </button>
                </div>
                <div className="space-y-3">
                  {noticia.imagem_url && (
                    <div className="flex items-center gap-3 p-2 bg-neutral-100 rounded-xl">
                      <img
                        src={noticia.imagem_url}
                        alt="preview"
                        className="w-20 h-14 rounded-lg object-cover flex-shrink-0 border border-neutral-200"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <span className="text-xs text-neutral-500 break-all">{noticia.imagem_url}</span>
                    </div>
                  )}
                  <Input
                    label="URL da imagem"
                    value={noticia.imagem_url}
                    onChange={(e) => updateNoticiaItem(idx, { imagem_url: e.target.value })}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      label="Badge (ex: TEMPO REAL)"
                      value={noticia.badge}
                      onChange={(e) => updateNoticiaItem(idx, { badge: e.target.value })}
                      placeholder="TEMPO REAL"
                    />
                    <Input
                      label="Link externo (opcional)"
                      value={noticia.link}
                      onChange={(e) => updateNoticiaItem(idx, { link: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <Input
                    label="Título"
                    value={noticia.titulo}
                    onChange={(e) => updateNoticiaItem(idx, { titulo: e.target.value })}
                  />
                  <Textarea
                    label="Descrição curta"
                    value={noticia.descricao_curta}
                    onChange={(v) => updateNoticiaItem(idx, { descricao_curta: v })}
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addNoticia}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-primary-300 text-primary-600 hover:border-primary-500 hover:bg-primary-50 text-sm font-medium transition-colors w-full justify-center"
          >
            <Plus className="w-4 h-4" />
            Adicionar notícia
          </button>
        </div>
      </Card>

      {/* JOIN CTA ================================================== */}
      <Card>
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-display text-lg font-bold text-neutral-900">6. Chamada final + features</h2>
          <span className="text-xs text-neutral-500">Última seção antes do rodapé</span>
        </div>
        <p className="text-sm text-neutral-500 mb-5">
          Convite para criar conta, falar no WhatsApp e os 3 ícones de benefícios.
        </p>
        <div className="space-y-4">
          <Input
            label="Eyebrow"
            value={content.joinCta.eyebrow}
            onChange={(e) => updateJoinCta({ eyebrow: e.target.value })}
          />

          <TituloAjudaBox exemplo='"Seja parte dessa " + "transformação"' />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Título — parte 1"
              value={content.joinCta.titulo_parte1}
              onChange={(e) => updateJoinCta({ titulo_parte1: e.target.value })}
            />
            <Input
              label="Título — destaque"
              value={content.joinCta.titulo_destaque}
              onChange={(e) => updateJoinCta({ titulo_destaque: e.target.value })}
            />
          </div>

          <Textarea
            label="Subtítulo"
            value={content.joinCta.subtitulo}
            onChange={(v) => updateJoinCta({ subtitulo: v })}
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Botão principal"
              value={content.joinCta.cta_primario}
              onChange={(e) => updateJoinCta({ cta_primario: e.target.value })}
            />
            <Input
              label="Botão secundário (WhatsApp)"
              value={content.joinCta.cta_secundario}
              onChange={(e) => updateJoinCta({ cta_secundario: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-800 mb-2">
              Features (3 itens com ícone)
            </label>
            <div className="space-y-3">
              {content.joinCta.features.map((f, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-neutral-50 rounded-xl">
                  <Input
                    label={`Feature ${idx + 1} — título`}
                    value={f.label}
                    onChange={(e) => updateFeature(idx, { label: e.target.value })}
                  />
                  <Input
                    label={`Feature ${idx + 1} — descrição`}
                    value={f.sub}
                    onChange={(e) => updateFeature(idx, { sub: e.target.value })}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* AÇÕES + STATUS ================================================== */}
      <div className="sticky bottom-4 z-10">
        <Card className="!p-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 min-h-[1.25rem]">
              {savedOk && (
                <span className="inline-flex items-center gap-2 text-sm font-medium text-green-700">
                  <CheckCircle2 className="w-4 h-4" /> Alterações salvas — recarregue o site para ver.
                </span>
              )}
              {error && (
                <span className="inline-flex items-start gap-2 text-sm font-medium text-red-700">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleResetDefaults}
                disabled={saving}
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                Restaurar padrões
              </Button>
              <Button type="submit" disabled={saving}>
                <Save className="w-4 h-4 mr-1.5" />
                {saving ? 'Salvando…' : 'Salvar alterações'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </form>
  );
}