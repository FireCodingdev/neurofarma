import { Pill, Pipette, Cookie, FlaskConical, Leaf, Droplets, TestTube2, Microscope } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const PRODUTO_ICONES: { nome: string; label: string; Icon: LucideIcon }[] = [
  { nome: 'FlaskConical', label: 'Frasco',      Icon: FlaskConical },
  { nome: 'Pill',         label: 'Cápsula',     Icon: Pill         },
  { nome: 'Pipette',      label: 'Pipeta',      Icon: Pipette      },
  { nome: 'Cookie',       label: 'Comestível',  Icon: Cookie       },
  { nome: 'Leaf',         label: 'Folha',       Icon: Leaf         },
  { nome: 'Droplets',     label: 'Gotas',       Icon: Droplets     },
  { nome: 'TestTube2',    label: 'Tubo',        Icon: TestTube2    },
  { nome: 'Microscope',   label: 'Microscópio', Icon: Microscope   },
];

export function getIconComponent(nome?: string | null): LucideIcon {
  return PRODUTO_ICONES.find((i) => i.nome === nome)?.Icon ?? FlaskConical;
}
