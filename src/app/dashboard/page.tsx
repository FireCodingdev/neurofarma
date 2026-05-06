import { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar,
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Bell,
  ArrowUpRight,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Área do Profissional',
  description: 'Dashboard do profissional de saúde.',
};

/**
 * Dashboard simulado do profissional de saúde.
 * Mostra estatísticas, próximos eventos, conteúdos recomendados.
 * Em produção, dados viriam do Supabase autenticado.
 */
export default function DashboardPage() {
  const stats = [
    { label: 'Pacientes ativos', value: '32', delta: '+4 este mês', Icon: Users },
    { label: 'Encontros assistidos', value: '12', delta: '+2 este mês', Icon: Calendar },
    { label: 'Conteúdos lidos', value: '47', delta: '+8 este mês', Icon: BookOpen },
    { label: 'Avaliação', value: '4.9', delta: 'de 5.0', Icon: Award },
  ];

  const proximosEventos = [
    {
      data: '12 Mai',
      titulo: 'Encontro Clínico: Casos Complexos em Cardiologia',
      horario: '19h - 21h',
      formato: 'Online',
    },
    {
      data: '20 Mai',
      titulo: 'Workshop: Comunicação não-violenta com pacientes',
      horario: '18h - 20h',
      formato: 'Online',
    },
    {
      data: '03 Jun',
      titulo: 'Mesa redonda mensal',
      horario: '20h - 22h',
      formato: 'Online',
    },
  ];

  const conteudos = [
    'Atualizações em prescrição segura - 2026',
    'Cuidados paliativos: novas evidências',
    'Manejo de ansiedade no consultório',
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-neutral-500 mb-1">Bem-vindo(a) de volta</p>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-neutral-900">
              Dra. Mariana Silva
            </h1>
            <p className="text-neutral-600 mt-1">
              Clínica Geral · CRM 123456/SP · Plano Profissional
            </p>
          </div>
          <Button variant="outline" size="md" className="self-start">
            <Bell className="w-4 h-4 mr-2" />
            3 notificações
          </Button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.Icon;
            return (
              <Card key={stat.label} className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-700" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-primary-500" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-neutral-900 font-display">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-500">{stat.label}</div>
                <div className="text-xs text-primary-700 mt-1">{stat.delta}</div>
              </Card>
            );
          })}
        </div>

        {/* Two-column content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Próximos eventos (2/3) */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-xl font-semibold text-neutral-900">
                  Próximos Encontros Clínicos
                </h2>
                <Link
                  href="#"
                  className="text-sm text-primary-600 hover:underline flex items-center gap-1"
                >
                  Ver todos
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-3">
                {proximosEventos.map((evento, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-primary-600 text-white rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">
                        {evento.data.split(' ')[1]}
                      </span>
                      <span className="text-lg font-bold leading-tight">
                        {evento.data.split(' ')[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-neutral-900 truncate">
                        {evento.titulo}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {evento.horario} · {evento.formato}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                      Inscrever
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Conteúdos recomendados (1/3) */}
          <div className="space-y-6">
            <Card>
              <h2 className="font-display text-xl font-semibold text-neutral-900 mb-4">
                Conteúdos para você
              </h2>
              <ul className="space-y-3">
                {conteudos.map((conteudo) => (
                  <li key={conteudo}>
                    <a
                      href="#"
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary-600 transition-colors">
                        <BookOpen className="w-4 h-4 text-primary-700 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-sm text-neutral-700 group-hover:text-primary-700 transition-colors">
                        {conteudo}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white border-0">
              <h3 className="font-display text-lg font-semibold mb-2">
                Convide colegas
              </h3>
              <p className="text-sm text-primary-100 mb-4">
                Indique outros profissionais e ganhe 30 dias gratuitos.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-primary-700 hover:bg-primary-50"
              >
                Compartilhar link
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
