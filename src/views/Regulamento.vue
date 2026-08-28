<template>
  <div class="regulamento-page">
    <!-- Hero Section — Dark Navy -->
    <section class="page-hero relative overflow-hidden">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Regulamento' }]" />

        <div class="max-w-3xl mt-4">
          <div class="inline-flex items-center gap-2 bg-primary-500/20 text-blue-200 border border-primary-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-4">
            <Icon icon="mdi:gavel" class="w-3.5 h-3.5 text-secondary-400" />
            <span>Diretrizes Operacionais & Prazos</span>
          </div>

          <h1 class="page-hero-title">
            Regulamento de Contratação & Execução
          </h1>
          <p class="page-hero-subtitle">
            Entenda como funciona o fluxo de trabalho, prazos de entrega, aprovações, formas de pagamento e suporte técnico da 3W Online.
          </p>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="section-padding bg-slate-50/50">
      <div class="container">
        <div class="max-w-4xl mx-auto">
          <!-- Banner de Atualização -->
          <div class="bg-primary-50 border border-primary-100 rounded-xl p-4 mb-6 flex items-start gap-3">
            <Icon icon="mdi:information-outline" class="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
            <div class="text-xs text-primary-900 leading-relaxed">
              <strong>Vigência:</strong> Atualizado em Agosto de 2024.<br />
              Este regulamento estabelece as normas operacionais para todos os contratos e propostas comerciais emitidos pelo <strong>Grupo 3W Online</strong>.
            </div>
          </div>

          <!-- Índice de Navegação -->
          <div class="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
            <h2 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Icon icon="mdi:format-list-numbered" class="w-4 h-4 text-primary-600" />
              Índice de Tópicos
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <a href="#fluxo-trabalho" class="text-primary-600 hover:underline flex items-center gap-1.5"><Icon icon="mdi:chevron-right" class="w-3.5 h-3.5" /> 1. Fluxo de Trabalho e Etapas</a>
              <a href="#prazos-aprovacoes" class="text-primary-600 hover:underline flex items-center gap-1.5"><Icon icon="mdi:chevron-right" class="w-3.5 h-3.5" /> 2. Prazos e Validação de Entregas</a>
              <a href="#condicoes-pagamento" class="text-primary-600 hover:underline flex items-center gap-1.5"><Icon icon="mdi:chevron-right" class="w-3.5 h-3.5" /> 3. Condições de Pagamento e NF-e</a>
              <a href="#garantia-suporte" class="text-primary-600 hover:underline flex items-center gap-1.5"><Icon icon="mdi:chevron-right" class="w-3.5 h-3.5" /> 4. Garantia e Suporte Pós-Entrega</a>
              <a href="#cancelamento-reembolso" class="text-primary-600 hover:underline flex items-center gap-1.5"><Icon icon="mdi:chevron-right" class="w-3.5 h-3.5" /> 5. Cancelamento e Rescisão</a>
              <a href="#canais-atendimento" class="text-primary-600 hover:underline flex items-center gap-1.5"><Icon icon="mdi:chevron-right" class="w-3.5 h-3.5" /> 6. Canais Oficiais de Contato</a>
            </div>
          </div>

          <!-- Conteúdo Principal -->
          <div class="bg-white rounded-2xl border border-gray-100 p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <!-- 1. Fluxo de Trabalho -->
            <section id="fluxo-trabalho" class="pt-2">
              <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Icon icon="mdi:sitemap-outline" class="w-5 h-5 text-primary-600" />
                1. Fluxo de Trabalho e Metodologia
              </h2>
              <p class="mb-3">Todos os projetos desenvolvidos pela 3W Online seguem uma metodologia ágil estruturada em 4 fases:</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div class="p-3.5 bg-slate-50 rounded-xl border border-gray-100">
                  <div class="flex items-center gap-2 mb-1.5 font-bold text-primary-700 text-xs">
                    <span class="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px]">1</span>
                    Briefing & Diagnóstico
                  </div>
                  <p class="text-[11px] text-gray-600">Coleta de requisitos, objetivos comerciais, referências visuais e dados cadastrais.</p>
                </div>
                <div class="p-3.5 bg-slate-50 rounded-xl border border-gray-100">
                  <div class="flex items-center gap-2 mb-1.5 font-bold text-primary-700 text-xs">
                    <span class="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px]">2</span>
                    Design & Arquitetura
                  </div>
                  <p class="text-[11px] text-gray-600">Prototipação de telas, identidade visual, estrutura de banco de dados e UX.</p>
                </div>
                <div class="p-3.5 bg-slate-50 rounded-xl border border-gray-100">
                  <div class="flex items-center gap-2 mb-1.5 font-bold text-primary-700 text-xs">
                    <span class="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px]">3</span>
                    Desenvolvimento & Testes
                  </div>
                  <p class="text-[11px] text-gray-600">Codificação limpa em Vue 3/TS, responsividade mobile, SEO técnico e validação de segurança.</p>
                </div>
                <div class="p-3.5 bg-slate-50 rounded-xl border border-gray-100">
                  <div class="flex items-center gap-2 mb-1.5 font-bold text-primary-700 text-xs">
                    <span class="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px]">4</span>
                    Publicação & Treinamento
                  </div>
                  <p class="text-[11px] text-gray-600">Deploy em produção com SSL, entrega das chaves de acesso e treinamento da equipe.</p>
                </div>
              </div>
            </section>

            <!-- 2. Prazos e Validação -->
            <section id="prazos-aprovacoes">
              <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Icon icon="mdi:clock-check-outline" class="w-5 h-5 text-primary-600" />
                2. Prazos e Validação de Entregas
              </h2>
              <p class="mb-2">Os prazos padrão de execução são calculados a partir da entrega integral do briefing e materiais pelo cliente:</p>
              <ul class="list-disc list-inside space-y-1 text-gray-600 pl-2">
                <li><strong>Landing Pages & Sites Institucionais:</strong> 7 a 15 dias úteis.</li>
                <li><strong>Portais e E-commerces:</strong> 15 a 30 dias úteis.</li>
                <li><strong>Sistemas Web Sob Medida & Apps:</strong> 30 a 60 dias úteis (conforme escopo técnico).</li>
                <li><strong>Campanhas de Anúncios e Social Media:</strong> Setup inicial em até 5 dias úteis com gestão mensal contínua.</li>
              </ul>
              <p class="mt-3 text-xs text-gray-500 bg-slate-50 p-3 rounded-lg border border-gray-100">
                <Icon icon="mdi:alert-circle-outline" class="w-4 h-4 inline mr-1 text-amber-600" />
                O cliente terá até 5 dias úteis para testar e solicitar ajustes após cada entrega de etapa.
              </p>
            </section>

            <!-- 3. Condições de Pagamento -->
            <section id="condicoes-pagamento">
              <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Icon icon="mdi:cash-multiple" class="w-5 h-5 text-primary-600" />
                3. Condições de Pagamento & Faturamento
              </h2>
              <p class="mb-3">A 3W Online oferece facilidades de faturamento para pessoas físicas e jurídicas:</p>
              <ul class="list-disc list-inside space-y-1 text-gray-600 pl-2">
                <li><strong>PIX à Vista:</strong> 5% de desconto promocional sobre o valor total do serviço.</li>
                <li><strong>Cartão de Crédito:</strong> Parcelamento em até 12x via gateway seguro.</li>
                <li><strong>Boleto Bancário / Faturamento PJ:</strong> Condição de entrada (50%) + entrega (50%) ou parcelamento mensal recorrente com emissão de NF-e.</li>
              </ul>
            </section>

            <!-- 4. Garantia e Suporte -->
            <section id="garantia-suporte">
              <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Icon icon="mdi:shield-check" class="w-5 h-5 text-primary-600" />
                4. Garantia e Suporte Pós-Entrega
              </h2>
              <p>
                Todos os sites e sistemas desenvolvidos contam com <strong>30 dias de garantia total</strong> pós-publicação para correção gratuita de eventuais bugs ou inconsistências que não tenham sido identificadas na homologação. Planos de manutenção contínua e suporte evolutivo podem ser contratados mensalmente.
              </p>
            </section>

            <!-- 5. Cancelamento -->
            <section id="cancelamento-reembolso">
              <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Icon icon="mdi:close-circle-outline" class="w-5 h-5 text-primary-600" />
                5. Política de Cancelamento e Rescisão
              </h2>
              <p>
                Nos serviços mensais (gestão de anúncios, redes sociais e suporte), o cliente pode solicitar o cancelamento a qualquer momento mediante aviso prévio de 30 dias, sem cobrança de multas ou amarras de fidelidade forçada. Em projetos de desenvolvimento sob medida, os valores proporcionais às etapas já homologadas e executadas não são reembolsáveis.
              </p>
            </section>

            <!-- 6. Canais Oficiais -->
            <section id="canais-atendimento" class="pt-4 border-t border-gray-100">
              <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Icon icon="mdi:headset" class="w-5 h-5 text-primary-600" />
                6. Canais de Atendimento e Suporte
              </h2>
              <div class="bg-slate-50 p-4 rounded-xl border border-gray-100 text-xs space-y-1.5">
                <p><strong>Razão Social:</strong> 3W Online Soluções Digitais (Grupo 3W Online)</p>
                <p><strong>WhatsApp / Suporte:</strong> <a href="tel:+5541996924829" class="text-primary-600 font-semibold">(41) 99692-4829</a></p>
                <p><strong>E-mail:</strong> <a href="mailto:contato@3wonline.com.br" class="text-primary-600 font-semibold underline">contato@3wonline.com.br</a></p>
                <p><strong>Horário de Atendimento:</strong> Segunda a Sexta, das 8h às 18h</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final — Dark Navy -->
    <section class="cta-section">
      <div class="container text-center">
        <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-3">Pronto para iniciar seu projeto com segurança e clareza?</h2>
        <p class="text-sm text-blue-200 mb-6 max-w-xl mx-auto">
          Fale com nossa equipe técnica para tirar qualquer dúvida sobre nossos processos de trabalho.
        </p>
        <div class="flex flex-col sm:flex-row gap-3.5 justify-center">
          <RouterLink to="/contato" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-xs sm:text-sm font-bold shadow-lg">
            Falar Conosco
          </RouterLink>
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de esclarecer dúvidas sobre o regulamento de serviços."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary text-xs sm:text-sm font-bold shadow-lg"
          >
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1.5" />
            WhatsApp
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
  title: 'Regulamento de Uso e Contratação | 3W Online Curitiba',
  description: 'Confira o Regulamento de Uso da 3W Online: metodologia ágil, prazos de entrega, formas de pagamento, garantia de software e suporte.',
  path: '/regulamento',
  keywords: 'regulamento 3w online, prazos de entrega site, garantia de software curitiba',
})
</script>