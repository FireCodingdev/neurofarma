'use client';

import { useState, useMemo } from 'react';
import { Search, MapPin, Star, Video, Filter } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { MEDICOS_MOCK, ESPECIALIDADES } from '@/lib/constants';

/**
 * Página /medicos
 * Lista de médicos/prescritores com filtros de busca client-side.
 * Em produção, troque o mock por dados do Supabase com filtros server-side.
 */
export default function MedicosPage() {
  const [busca, setBusca] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [apenasTelemedicina, setApenasTelemedicina] = useState(false);

  /**
   * Filtragem reativa dos médicos. Memoizada para não recalcular
   * a cada re-render quando os filtros não mudaram.
   */
  const medicosFiltrados = useMemo(() => {
    return MEDICOS_MOCK.filter((medico) => {
      const matchBusca =
        !busca ||
        medico.nome.toLowerCase().includes(busca.toLowerCase()) ||
        medico.cidade.toLowerCase().includes(busca.toLowerCase());
      const matchEspecialidade =
        !especialidade || medico.especialidade === especialidade;
      const matchTele = !apenasTelemedicina || medico.aceitaTelemedicina;
      return matchBusca && matchEspecialidade && matchTele;
    });
  }, [busca, especialidade, apenasTelemedicina]);

  const limparFiltros = () => {
    setBusca('');
    setEspecialidade('');
    setApenasTelemedicina(false);
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 mb-3">
            Encontre um{' '}
            <span className="text-primary-600 italic">profissional</span>
          </h1>
          <p className="text-lg text-neutral-600">
            Médicos verificados e prontos para te atender. Use os filtros abaixo para encontrar o
            ideal para você.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 p-5 lg:p-6">
          <div className="flex items-center gap-2 mb-4 text-neutral-700">
            <Filter className="w-4 h-4" />
            <h2 className="font-medium">Filtrar profissionais</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                placeholder="Nome ou cidade..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
            <Select
              placeholder="Todas as especialidades"
              options={['', ...ESPECIALIDADES]}
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={apenasTelemedicina}
                  onChange={(e) => setApenasTelemedicina(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">Aceita telemedicina</span>
              </label>
              <Button variant="ghost" size="sm" onClick={limparFiltros}>
                Limpar
              </Button>
            </div>
          </div>
        </Card>

        {/* Results count */}
        <p className="text-sm text-neutral-600 mb-4">
          {medicosFiltrados.length}{' '}
          {medicosFiltrados.length === 1
            ? 'profissional encontrado'
            : 'profissionais encontrados'}
        </p>

        {/* Doctors grid */}
        {medicosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {medicosFiltrados.map((medico) => (
              <Card key={medico.id} hoverable className="flex flex-col">
                {/* Avatar placeholder + name */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-display text-xl font-semibold flex-shrink-0">
                    {medico.nome
                      .split(' ')
                      .filter((p) => !p.startsWith('Dr'))
                      .slice(0, 2)
                      .map((p) => p[0])
                      .join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-semibold text-neutral-900 truncate">
                      {medico.nome}
                    </h3>
                    <p className="text-sm text-primary-700 font-medium">
                      {medico.especialidade}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-neutral-600 mb-4 flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-neutral-400" />
                    <span>
                      {medico.cidade}, {medico.estado}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{medico.avaliacao} de avaliação</span>
                  </div>
                  {medico.aceitaTelemedicina && (
                    <div className="flex items-center gap-2 text-primary-700">
                      <Video className="w-4 h-4" />
                      <span>Aceita telemedicina</span>
                    </div>
                  )}
                </div>

                <div className="text-xs text-neutral-500 mb-4">{medico.crm}</div>

                <Button variant="primary" size="sm" className="w-full">
                  Ver perfil
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <p className="text-neutral-600 mb-4">
              Nenhum profissional encontrado com esses filtros.
            </p>
            <Button variant="outline" onClick={limparFiltros}>
              Limpar filtros
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
