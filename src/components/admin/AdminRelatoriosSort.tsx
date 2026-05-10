'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const ORDENS = [
  { value: 'recentes',   label: 'Mais recentes' },
  { value: 'antigos',    label: 'Mais antigos'  },
  { value: 'mais-lidos', label: 'Mais lidos'    },
] as const;

export function AdminRelatoriosSort({ ordemAtual }: { ordemAtual: string }) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('ordem', e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest hidden sm:inline">
        Ordenar:
      </span>
      <select
        value={ordemAtual}
        onChange={handleChange}
        className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer shadow-sm"
      >
        {ORDENS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}
