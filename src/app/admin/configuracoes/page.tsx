import { Metadata } from 'next';
import { Settings, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = { title: 'Configurações · Admin Neurofarma' };

export default function AdminConfiguracoesPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
          <Settings className="w-5 h-5 text-primary-700" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">Configurações</h1>
          <p className="text-neutral-500 mt-1">Informações do sistema e do site.</p>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="font-semibold text-neutral-900 mb-5">Informações do site</h2>
          <div className="space-y-4">
            {[
              { Icon: Globe, label: 'Nome', value: SITE_CONFIG.name },
              { Icon: Globe, label: 'URL', value: SITE_CONFIG.url },
              { Icon: Mail, label: 'E-mail', value: SITE_CONFIG.email },
              { Icon: Phone, label: 'Telefone', value: SITE_CONFIG.telefone },
              { Icon: MapPin, label: 'Endereço', value: SITE_CONFIG.endereco },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 py-3 border-b border-neutral-100 last:border-0">
                <div className="w-9 h-9 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-neutral-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">{label}</p>
                  <p className="text-sm text-neutral-800 font-medium mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-neutral-900 mb-5">Redes sociais</h2>
          <div className="space-y-3">
            {Object.entries(SITE_CONFIG.redesSociais).map(([rede, url]) => (
              <div key={rede} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                <span className="text-sm font-medium text-neutral-700 capitalize">{rede}</span>
                <a href={url} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:underline truncate max-w-xs">
                  {url}
                </a>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-neutral-900 mb-4">Sobre o sistema</h2>
          <div className="space-y-2 text-sm text-neutral-600">
            <p>Para alterar os textos e imagens da página inicial, acesse <strong>Conteúdo da Home</strong> na sidebar.</p>
            <p>Para adicionar ou editar produtos, acesse <strong>Produtos</strong>.</p>
            <p>Para alterar dados do site (email, telefone, redes sociais), edite o arquivo <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs font-mono">src/lib/constants.ts</code> no código-fonte.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
