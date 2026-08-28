<template>
  <div class="terms-page">
    <!-- Hero Section — Dark Navy -->
    <section class="page-hero relative overflow-hidden">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Termos de Uso' }]" />

        <div class="max-w-3xl mt-4">
          <div class="inline-flex items-center gap-2 bg-primary-500/20 text-blue-200 border border-primary-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-4">
            <Icon icon="mdi:file-document-outline" class="w-3.5 h-3.5 text-secondary-400" />
            <span>Condições Gerais de Contratação & Utilização</span>
          </div>

          <h1 class="page-hero-title">
            Termos de Uso & Serviços
          </h1>
          <p class="page-hero-subtitle">
            Regras, diretrizes e responsabilidades que regem o acesso ao portal e a contratação dos serviços do Grupo 3W Online.
          </p>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="section-padding bg-slate-50/50">
      <div class="container">
        <div class="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-gray-100 shadow-sm">
          <div class="bg-primary-50 border border-primary-100 rounded-xl p-4 mb-8 flex items-start gap-3">
            <Icon icon="mdi:information-outline" class="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
            <div class="text-xs text-primary-900 leading-relaxed">
              <strong>Vigência:</strong> Atualizado em Agosto de 2024.<br />
              Ao navegar neste portal ou contratar quaisquer serviços da <strong>3W Online Soluções Digitais</strong>, você declara ter lido e concordado com as condições descritas abaixo.
            </div>
          </div>

          <div class="space-y-8 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div>
              <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Icon icon="mdi:check-decagram-outline" class="w-5 h-5 text-primary-600" />
                1. Aceitação e Objeto
              </h2>
              <p>
                Estes Termos de Uso estabelecem as regras para navegação no website da 3W Online e contratação de serviços de desenvolvimento de software, criação de sites, sistemas sob medida, gestão de tráfego pago (Google/Meta Ads), gestão de redes sociais, consultoria e automação com inteligência artificial.
              </p>
            </div>

            <div>
              <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Icon icon="mdi:briefcase-outline" class="w-5 h-5 text-primary-600" />
                2. Contratação e Prestação de Serviços
              </h2>
              <p class="mb-3">A prestação de qualquer serviço sob medida é regida por Proposta Comercial e/ou Contrato Específico, que definirá detalhadamente:</p>
              <ul class="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                <li><strong>Escopo Técnico:</strong> Funcionalidades, páginas, integrações ou periodicidade de campanhas contratadas.</li>
                <li><strong>Cronograma de Entrega:</strong> Prazos estimados com base no envio tempestivo de materiais e aprovações pelo contratante.</li>
                <li><strong>Garantia de Funcionamento:</strong> Suporte corretivo e manutenção inicial após a entrega e publicação do projeto.</li>
              </ul>
            </div>

            <div>
              <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Icon icon="mdi:account-check-outline" class="w-5 h-5 text-primary-600" />
                3. Responsabilidades das Partes
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div class="p-4 bg-slate-50 rounded-xl border border-gray-100">
                  <p class="font-bold text-gray-900 mb-2 text-xs">Compromissos da 3W Online:</p>
                  <ul class="list-disc list-inside space-y-1 text-gray-600 text-xs">
                    <li>Executar os serviços com alto padrão técnico e código limpo;</li>
                    <li>Manter sigilo e proteção de dados (LGPD);</li>
                    <li>Cumprir os prazos acordados no escopo;</li>
                    <li>Prestar suporte e esclarecimentos operacionais.</li>
                  </ul>
                </div>
                <div class="p-4 bg-slate-50 rounded-xl border border-gray-100">
                  <p class="font-bold text-gray-900 mb-2 text-xs">Compromissos do Cliente:</p>
                  <ul class="list-disc list-inside space-y-1 text-gray-600 text-xs">
                    <li>Fornecer briefing, acessos e textos necessários;</li>
                    <li>Validar e aprovar entregas dentro dos prazos;</li>
                    <li>Honrar as datas de pagamento acordadas;</li>
                    <li>Garantir a legalidade dos conteúdos veiculados.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Icon icon="mdi:copyright" class="w-5 h-5 text-primary-600" />
                4. Propriedade Intelectual e Código-Fonte
              </h2>
              <p>
                Após a quitação integral dos valores contratados, todos os direitos sobre designs finais, identidades visuais e aplicações sob medida desenvolvidas com exclusividade são transferidos para o cliente contratante. A 3W Online preserva o direito de utilizar bibliotecas proprietárias reutilizáveis e incluir o projeto em seus canais de demonstração técnica, salvo acordo prévio de confidencialidade (NDA).
              </p>
            </div>

            <div>
              <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Icon icon="mdi:tools" class="w-5 h-5 text-primary-600" />
                5. Suíte de Ferramentas Gratuitas Client-Side
              </h2>
              <p>
                A 3W Online disponibiliza gratuitamente mais de 120 ferramentas online (calculadoras, conversores, validadores e geradores) no modelo <em>"as-is"</em> (no estado em que se encontram). As ferramentas são executadas exclusivamente no navegador do usuário para fins de conveniência e produtividade, sem garantia explícita de aplicação jurídica ou financeira vinculante.
              </p>
            </div>

            <div>
              <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Icon icon="mdi:shield-lock-outline" class="w-5 h-5 text-primary-600" />
                6. Privacidade e Proteção Global de Dados
              </h2>
              <p>
                O tratamento de dados pessoais coletados no portal ou durante a prestação de serviços rege-se pela nossa <RouterLink to="/privacidade" class="text-primary-600 font-bold underline">Política de Privacidade Global</RouterLink>, em estrita observância à LGPD (Brasil), GDPR (União Europeia), CCPA/CPRA (EUA) e POPIA (África do Sul). Os usuários podem gerenciar suas preferências ou exercer seus direitos a qualquer momento.
              </p>
            </div>

            <div>
              <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Icon icon="mdi:scale-balance" class="w-5 h-5 text-primary-600" />
                7. Foro de Eleição
              </h2>
              <p>
                Fica eleito o Foro da Comarca de Curitiba, Estado do Paraná, como o único competente para dirimir quaisquer dúvidas ou litígios decorrentes destes Termos de Uso ou de serviços prestados, com expressa renúncia a qualquer outro, por mais privilegiado que seja.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA — Dark Navy -->
    <section class="cta-section">
      <div class="container text-center">
        <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-3">Pronto para formalizar sua proposta com a 3W Online?</h2>
        <p class="text-sm text-blue-200 mb-6 max-w-xl mx-auto">
          Entre em contato e solicite um escopo detalhado e transparente para o seu projeto.
        </p>
        <div class="flex flex-col sm:flex-row gap-3.5 justify-center">
          <RouterLink to="/contato" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-xs sm:text-sm font-bold shadow-lg">
            Solicitar Proposta Comercial
          </RouterLink>
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de esclarecer dúvidas sobre os Termos de Serviço."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary text-xs sm:text-sm font-bold shadow-lg"
          >
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1.5" />
            WhatsApp Comercial
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import { useSeo } from '@/composables/useSeo'

const { applySeo } = useSeo()
applySeo({
  title: 'Termos de Uso | 3W Online - Condições Gerais de Serviços',
  description: 'Leia os Termos de Uso da 3W Online: diretrizes de prestação de serviços, desenvolvimento de software, propriedade intelectual e responsabilidades.',
  path: '/termos',
  keywords: 'termos de uso 3w online, contrato de prestação de serviços, termos legais tecnologia',
})
</script>