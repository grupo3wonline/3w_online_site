<template>
  <div class="pagamento-page">
    <!-- Hero Section — Dark Navy -->
    <section class="page-hero relative overflow-hidden">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Pagamento Seguro' }]" />

        <div class="max-w-3xl mt-4">
          <div class="inline-flex items-center gap-2 bg-primary-500/20 text-blue-200 border border-primary-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-4">
            <Icon icon="mdi:credit-card-check-outline" class="w-3.5 h-3.5 text-secondary-400" />
            <span>Ambiente 100% Protegido com Criptografia SSL</span>
          </div>

          <h1 class="page-hero-title">
            Pagamento Seguro & Condições Facilitadas
          </h1>
          <p class="page-hero-subtitle">
            Escolha a modalidade de pagamento que melhor atende à sua empresa. Aceitamos PIX com desconto, Cartão de Crédito em até 12x e Faturamento PJ via Boleto.
          </p>

          <div class="flex flex-wrap gap-4 mt-6 text-xs text-blue-200">
            <div class="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              <Icon icon="mdi:shield-check" class="w-4 h-4 text-green-400" />
              <span>Criptografia 256-bit</span>
            </div>
            <div class="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              <Icon icon="mdi:receipt-text-check-outline" class="w-4 h-4 text-blue-300" />
              <span>Emissão de NF-e</span>
            </div>
            <div class="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              <Icon icon="mdi:lock-check" class="w-4 h-4 text-emerald-400" />
              <span>Conformidade LGPD</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Formas de Pagamento Disponíveis -->
    <section class="section-padding bg-slate-50/50">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Opções Disponíveis</span>
          <h2 class="section-title">Escolha Como Deseja Efetuar o Pagamento</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Condições transparentes sem taxas ocultas para serviços de marketing e desenvolvimento.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <!-- Opção 1: PIX -->
          <div
            class="card p-6 text-center cursor-pointer border-2 transition-all bg-white hover:shadow-lg"
            :class="selectedMethod === 'pix' ? 'border-primary-500 ring-2 ring-primary-500/20 shadow-md' : 'border-gray-200'"
            @click="selectedMethod = 'pix'"
          >
            <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Icon icon="mdi:qrcode-scan" class="w-7 h-7" />
            </div>
            <h3 class="text-base font-bold text-gray-900 mb-1">PIX Instantâneo</h3>
            <div class="bg-emerald-50 text-emerald-700 font-bold text-xs py-1 px-2.5 rounded-full inline-block mb-3">
              5% de Desconto à Vista
            </div>
            <p class="text-xs text-gray-500 mb-4 leading-relaxed">
              Confirmação imediata para início ágil do projeto com chave oficial.
            </p>
            <ul class="text-left text-xs text-gray-600 space-y-2 pt-3 border-t border-gray-100">
              <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-500 shrink-0" /> Liberação imediata</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-500 shrink-0" /> Comprovante automático</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-500 shrink-0" /> Desconto direto no total</li>
            </ul>
          </div>

          <!-- Opção 2: Cartão de Crédito -->
          <div
            class="card p-6 text-center cursor-pointer border-2 transition-all bg-white hover:shadow-lg"
            :class="selectedMethod === 'card' ? 'border-primary-500 ring-2 ring-primary-500/20 shadow-md' : 'border-gray-200'"
            @click="selectedMethod = 'card'"
          >
            <div class="w-14 h-14 bg-blue-50 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Icon icon="mdi:credit-card-outline" class="w-7 h-7" />
            </div>
            <h3 class="text-base font-bold text-gray-900 mb-1">Cartão de Crédito</h3>
            <div class="bg-blue-50 text-primary-700 font-bold text-xs py-1 px-2.5 rounded-full inline-block mb-3">
              Em até 12x
            </div>
            <p class="text-xs text-gray-500 mb-4 leading-relaxed">
              Parcelamento facilitado através de link de pagamento seguro.
            </p>
            <ul class="text-left text-xs text-gray-600 space-y-2 pt-3 border-t border-gray-100">
              <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-primary-500 shrink-0" /> Visa, Mastercard, Elo, Hiper</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-primary-500 shrink-0" /> Link de checkout seguro</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-primary-500 shrink-0" /> Aprovação em segundos</li>
            </ul>
          </div>

          <!-- Opção 3: Boleto Bancário / Faturamento PJ -->
          <div
            class="card p-6 text-center cursor-pointer border-2 transition-all bg-white hover:shadow-lg"
            :class="selectedMethod === 'boleto' ? 'border-primary-500 ring-2 ring-primary-500/20 shadow-md' : 'border-gray-200'"
            @click="selectedMethod = 'boleto'"
          >
            <div class="w-14 h-14 bg-slate-100 text-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Icon icon="mdi:barcode-scan" class="w-7 h-7" />
            </div>
            <h3 class="text-base font-bold text-gray-900 mb-1">Boleto / Faturamento PJ</h3>
            <div class="bg-slate-100 text-slate-700 font-bold text-xs py-1 px-2.5 rounded-full inline-block mb-3">
              Para Empresas
            </div>
            <p class="text-xs text-gray-500 mb-4 leading-relaxed">
              Emissão de boleto bancário com nota fiscal para a sua empresa.
            </p>
            <ul class="text-left text-xs text-gray-600 space-y-2 pt-3 border-t border-gray-100">
              <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-slate-600 shrink-0" /> Emissão de NF-e de Serviços</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-slate-600 shrink-0" /> Condições 50/50 ou mensal</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-slate-600 shrink-0" /> Ideal para gestão contábil</li>
            </ul>
          </div>
        </div>

        <!-- Detalhes do Método Selecionado -->
        <div class="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <!-- Painel PIX -->
          <div v-if="selectedMethod === 'pix'" class="space-y-4 text-center">
            <h4 class="text-sm font-bold text-gray-900">Dados para Pagamento via PIX</h4>
            <p class="text-xs text-gray-600">Utilize os dados oficiais da 3W Online para efetuar a transferência com desconto:</p>
            <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-left text-xs space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 font-medium">Chave PIX:</span>
                <span class="font-mono font-bold text-gray-900 select-all">contato@3wonline.com.br</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 font-medium">Titular:</span>
                <span class="font-bold text-gray-900">3W Online Soluções Digitais</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 font-medium">Cidade:</span>
                <span class="text-gray-900">Curitiba/PR</span>
              </div>
            </div>
            <p class="text-[11px] text-gray-500">
              Após realizar o PIX, envie o comprovante para nosso WhatsApp para confirmação imediata.
            </p>
          </div>

          <!-- Painel Cartão -->
          <div v-else-if="selectedMethod === 'card'" class="space-y-4 text-center">
            <h4 class="text-sm font-bold text-gray-900">Link de Pagamento com Cartão de Crédito</h4>
            <p class="text-xs text-gray-600">
              Solicite o seu link individual de pagamento com valor pré-configurado e parcele em até 12x com total segurança.
            </p>
            <div class="p-4 bg-blue-50 rounded-xl border border-blue-200 text-left text-xs space-y-1.5">
              <p><strong>Bandeiras Aceitas:</strong> Visa, Mastercard, Elo, Hipercard, American Express</p>
              <p><strong>Segurança:</strong> Gateway homologado com antifraude e criptografia PCI-DSS</p>
            </div>
          </div>

          <!-- Painel Boleto -->
          <div v-else class="space-y-4 text-center">
            <h4 class="text-sm font-bold text-gray-900">Faturamento Corporativo via Boleto</h4>
            <p class="text-xs text-gray-600">
              Envie os dados cadastrais da sua empresa para geração do boleto bancário acompanhado de Nota Fiscal Eletrônica (NF-e).
            </p>
            <div class="p-4 bg-slate-50 rounded-xl border border-gray-200 text-left text-xs space-y-1.5">
              <p><strong>Vencimento Padrão:</strong> 3 a 5 dias úteis</p>
            </div>
          </div>

          <!-- Ação Direta de Contato/Confirmação -->
          <div class="mt-6 pt-4 border-t border-gray-100">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de confirmar um pagamento ou solicitar dados de faturamento."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary w-full text-center text-xs sm:text-sm !py-3 justify-center shadow-md font-bold"
            >
              <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" />
              Confirmar Pagamento com a Equipe
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Rápido de Pagamento -->
    <section class="section-padding bg-white">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <span class="section-label">Dúvidas Frequentes</span>
          <h2 class="section-title">Perguntas sobre Pagamento & Faturamento</h2>
        </div>
        <div class="space-y-3 text-xs sm:text-sm">
          <div class="p-4 rounded-xl border border-gray-200 bg-slate-50">
            <h4 class="font-bold text-gray-900 mb-1">A 3W Online emite Nota Fiscal Eletrônica?</h4>
            <p class="text-gray-600">Sim! Emitimos NF-e de prestação de serviços para 100% dos projetos e mensalidades, tanto para empresas (PJ) quanto para pessoas físicas (PF).</p>
          </div>
          <div class="p-4 rounded-xl border border-gray-200 bg-slate-50">
            <h4 class="font-bold text-gray-900 mb-1">Como funciona o parcelamento no cartão?</h4>
            <p class="text-gray-600">Enviamos um link de checkout seguro onde você pode escolher a quantidade de parcelas (de 1x até 12x) de acordo com a sua preferência.</p>
          </div>
          <div class="p-4 rounded-xl border border-gray-200 bg-slate-50">
            <h4 class="font-bold text-gray-900 mb-1">Qual o prazo para início dos trabalhos após o pagamento?</h4>
            <p class="text-gray-600">Pagamentos via PIX e Cartão de Crédito são identificados instantaneamente e o projeto é encaminhado de imediato para a etapa de briefing.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import { useSeo } from '@/composables/useSeo'

const { applySeo } = useSeo()
applySeo({
  title: 'Pagamento Seguro | 3W Online - PIX, Cartão e Boleto PJ',
  description: 'Realize seu pagamento com total segurança na 3W Online. Aceitamos PIX com 5% de desconto, cartão em até 12x e boleto bancário com emissão de NF-e.',
  path: '/pagamento',
  keywords: 'pagamento seguro 3w online, pix desconto site, parcelamento criação de sites',
})

const selectedMethod = ref<'pix' | 'card' | 'boleto'>('pix')
</script>
