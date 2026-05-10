'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, AlertCircle, Upload, X, FileText, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { RelatorioTecnico } from '@/types';

interface RelatorioFormProps {
  relatorio?: RelatorioTecnico;
}

export function RelatorioForm({ relatorio }: RelatorioFormProps) {
  const router  = useRouter();
  const isEdit  = !!relatorio;
  const fileRef = useRef<HTMLInputElement>(null);

  const buildForm = (r?: RelatorioTecnico) => ({
    titulo:              r?.titulo              ?? '',
    slug:                r?.slug               ?? '',
    subtitulo:           r?.subtitulo          ?? '',
    imagem_capa:         r?.imagem_capa        ?? '',
    corpo:               r?.corpo              ?? '',
    categorias:          r?.categorias?.join(', ') ?? '',
    status:              r?.status             ?? 'rascunho',
    data_publicacao:     r?.data_publicacao    ?? '',
    exclusivo_apoiador:  r?.exclusivo_apoiador ?? false,
    pdf_url:             r?.pdf_url            ?? '',
  });

  const [form,         setForm]         = useState(() => buildForm(relatorio));
  const [pdfNome,      setPdfNome]      = useState('');
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadErro,   setUploadErro]   = useState('');
  const [statusReq,    setStatusReq]    = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [erro,         setErro]         = useState('');

  useEffect(() => {
    setForm(buildForm(relatorio));
    setPdfNome('');
    setStatusReq('idle');
    setErro('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relatorio?.id]);

  const set = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const slugify = (v: string) =>
    v.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const handleTitulo = (v: string) => {
    setForm((prev) => {
      const slugAindaSegueNome = !isEdit || prev.slug === slugify(prev.titulo);
      return { ...prev, titulo: v, slug: slugAindaSegueNome ? slugify(v) : prev.slug };
    });
  };

  // ── Upload de PDF ──────────────────────────────────────────────────────────
  const handlePdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadErro('');
    setUploadingPdf(true);

    const fd = new FormData();
    fd.append('file', file);

    try {
      const res  = await fetch('/api/admin/relatorios/upload-pdf', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) {
        setUploadErro(json.error ?? 'Erro no upload.');
      } else {
        set('pdf_url', json.url);
        setPdfNome(json.nome ?? file.name);
      }
    } catch {
      setUploadErro('Falha de rede ao enviar o PDF.');
    } finally {
      setUploadingPdf(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const removePdf = () => {
    set('pdf_url', '');
    setPdfNome('');
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusReq('loading');
    setErro('');

    const payload = {
      ...form,
      categorias: form.categorias.split(',').map((c) => c.trim()).filter(Boolean),
    };

    try {
      const url    = isEdit ? `/api/admin/relatorios/${relatorio!.id}` : '/api/admin/relatorios';
      const method = isEdit ? 'PATCH' : 'POST';
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json   = await res.json();

      if (!res.ok) {
        setErro(json.error ?? 'Erro desconhecido.');
        setStatusReq('error');
        return;
      }

      setStatusReq('success');
      setTimeout(() => {
        router.push('/admin/relatorios-tecnicos');
        router.refresh();
      }, 1200);
    } catch {
      setErro('Falha de rede. Verifique sua conexão.');
      setStatusReq('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {statusReq === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
          <span>{erro}</span>
        </div>
      )}

      {/* Informações básicas */}
      <Card>
        <h2 className="font-semibold text-neutral-900 mb-5">Informações básicas</h2>
        <div className="space-y-4">
          <Input
            label="Título"
            value={form.titulo}
            onChange={(e) => handleTitulo(e.target.value)}
            placeholder="Ex: Estabilidade de Emulsões com CBD em Veículos Lipídicos"
            required
          />
          <Input
            label="Slug (URL)"
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            placeholder="Ex: estabilidade-emulsoes-cbd"
            required
          />
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Subtítulo</label>
            <textarea
              value={form.subtitulo}
              onChange={(e) => set('subtitulo', e.target.value)}
              rows={2}
              placeholder="Resumo breve exibido nos cards e no topo do artigo"
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
            />
          </div>
          <Input
            label="URL da imagem de capa"
            value={form.imagem_capa}
            onChange={(e) => set('imagem_capa', e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
          />
          {form.imagem_capa && (
            <div className="relative w-full h-40 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
              <img
                src={form.imagem_capa}
                alt="capa"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Categorias <span className="text-neutral-400 font-normal">(separadas por vírgula)</span>
            </label>
            <Input
              value={form.categorias}
              onChange={(e) => set('categorias', e.target.value)}
              placeholder="Ex: Farmacotécnica, CBD, Emulsões"
            />
          </div>
        </div>
      </Card>

      {/* Corpo */}
      <Card>
        <h2 className="font-semibold text-neutral-900 mb-2">Corpo do relatório</h2>
        <p className="text-xs text-neutral-400 mb-4">
          Suporta HTML básico: <code className="bg-neutral-100 px-1 rounded">&lt;p&gt;</code>,{' '}
          <code className="bg-neutral-100 px-1 rounded">&lt;strong&gt;</code>,{' '}
          <code className="bg-neutral-100 px-1 rounded">&lt;h2&gt;</code>,{' '}
          <code className="bg-neutral-100 px-1 rounded">&lt;ul&gt;&lt;li&gt;</code>, etc.
        </p>
        <textarea
          value={form.corpo}
          onChange={(e) => set('corpo', e.target.value)}
          rows={18}
          placeholder="<p>Introdução ao estudo...</p>"
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y text-sm font-mono"
        />
      </Card>

      {/* PDF */}
      <Card>
        <h2 className="font-semibold text-neutral-900 mb-2">Arquivo PDF</h2>
        <p className="text-xs text-neutral-400 mb-4">
          Formato .pdf · Tamanho máximo 10 MB. O PDF ficará disponível como download na página do relatório.
        </p>

        {form.pdf_url ? (
          <div className="flex items-center gap-3 p-4 bg-primary-50 border border-primary-100 rounded-xl">
            <FileText className="w-5 h-5 text-primary-600 flex-shrink-0" />
            <p className="text-sm font-medium text-primary-800 truncate flex-1">
              {pdfNome || 'PDF anexado'}
            </p>
            <button
              type="button"
              onClick={removePdf}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary-100 hover:bg-primary-200 transition-colors flex-shrink-0"
            >
              <X className="w-3.5 h-3.5 text-primary-700" />
            </button>
          </div>
        ) : (
          <div>
            <label
              className={`flex flex-col items-center justify-center gap-3 w-full py-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                uploadingPdf
                  ? 'border-primary-300 bg-primary-50'
                  : 'border-neutral-200 hover:border-primary-300 hover:bg-primary-50/50'
              }`}
            >
              {uploadingPdf ? (
                <>
                  <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
                  <span className="text-sm text-neutral-500">Enviando PDF...</span>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-neutral-300" />
                  <span className="text-sm font-medium text-neutral-600">
                    Clique para selecionar o PDF
                  </span>
                  <span className="text-xs text-neutral-400">PDF · máx. 10 MB</span>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handlePdfChange}
                disabled={uploadingPdf}
              />
            </label>
            {uploadErro && (
              <p className="text-sm text-red-600 mt-2">{uploadErro}</p>
            )}
          </div>
        )}
      </Card>

      {/* Publicação + Acesso */}
      <Card>
        <h2 className="font-semibold text-neutral-900 mb-5">Publicação e acesso</h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Status</label>
            <select
              value={form.status}
              onChange={(e) => set('status', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
            >
              <option value="rascunho">Rascunho (não visível ao público)</option>
              <option value="publicado">Publicado</option>
            </select>
          </div>

          <Input
            label="Data de publicação"
            type="date"
            value={form.data_publicacao}
            onChange={(e) => set('data_publicacao', e.target.value)}
          />

          {/* Toggle Exclusivo para Apoiadores */}
          <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
            <div
              onClick={() => set('exclusivo_apoiador', !form.exclusivo_apoiador)}
              className={`relative mt-0.5 w-11 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                form.exclusivo_apoiador ? 'bg-amber-500' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  form.exclusivo_apoiador ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-800">
                Conteúdo Exclusivo para Apoiadores
              </p>
              <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                O card aparece na listagem pública, mas o conteúdo completo (e o PDF) fica bloqueado
                para não-apoiadores.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-4">
        <Button type="submit" size="lg" disabled={statusReq === 'loading' || statusReq === 'success' || uploadingPdf}>
          {statusReq === 'loading' ? (
            'Salvando...'
          ) : statusReq === 'success' ? (
            <><CheckCircle2 className="w-4 h-4 mr-2" />Salvo!</>
          ) : (
            isEdit ? 'Salvar alterações' : 'Criar relatório'
          )}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
