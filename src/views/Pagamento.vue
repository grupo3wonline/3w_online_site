<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-green-600 to-green-800 text-white py-16 md:py-20 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute -top-4 -right-4 w-72 h-72 bg-white rounded-full blur-3xl"></div>
      </div>
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Pagamento' }]" />
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20 mb-6">
            <Icon icon="mdi:credit-card-check" class="w-4 h-4 mr-2" />
            Pagamento Seguro
          </div>
          <h1 class="page-hero-title">Realize seu Pagamento</h1>
          <p class="page-hero-subtitle">Escolha a forma de pagamento que preferir. Oferecemos as melhores opções para sua comodidade.</p>

          <div class="flex flex-wrap justify-center gap-4 mt-6 text-xs">
            <div class="flex items-center bg-white/10 px-3 py-2 rounded-full">
              <Icon icon="mdi:shield-check" class="w-4 h-4 mr-1 text-green-300" />
              SSL Seguro
            </div>
            <div class="flex items-center bg-white/10 px-3 py-2 rounded-full">
              <Icon icon="mdi:lock" class="w-4 h-4 mr-1 text-green-300" />
              Dados Protegidos
            </div>
            <div class="flex items-center bg-white/10 px-3 py-2 rounded-full">
              <Icon icon="mdi:certificate" class="w-4 h-4 mr-1 text-green-300" />
              Conforme LGPD
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment Methods -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10 md:mb-16">
          <h2 class="section-title">Formas de Pagamento</h2>
          <p class="section-subtitle">Escolha a opção que melhor se adequa às suas necessidades</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-12">
          <!-- PIX -->
          <div
            class="card p-6 text-center cursor-pointer border-2 transition-all hover:shadow-xl"
            :class="selectedMethod === 'pix' ? 'border-green-500 shadow-lg' : 'border-transparent'"
            @click="selectedMethod = 'pix'"
          >
            <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:qrcode" class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">PIX</h3>
            <div class="bg-green-50 rounded-lg p-3 mb-4">
              <span class="text-xl font-bold text-green-600">5% OFF</span>
              <p class="text-xs text-green-700">Desconto à vista</p>
            </div>
            <ul class="text-left text-sm text-gray-600 space-y-2">
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Pagamento instantâneo</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Disponível 24/7</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Sem taxas adicionais</li>
            </ul>
          </div>

          <!-- Cartão -->
          <div
            class="card p-6 text-center cursor-pointer border-2 transition-all hover:shadow-xl"
            :class="selectedMethod === 'card' ? 'border-blue-500 shadow-lg' : 'border-transparent'"
            @click="selectedMethod = 'card'"
          >
            <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:credit-card" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Cartão de Crédito</h3>
            <div class="bg-blue-50 rounded-lg p-3 mb-4">
              <span class="text-xl font-bold text-blue-600">Até 12x</span>
              <p class="text-xs text-blue-700">Sem juros</p>
            </div>
            <ul class="text-left text-sm text-gray-600 space-y-2">
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-blue-500" /> Parcelamento flexível</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-blue-500" /> Todas as bandeiras</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-blue-500" /> Processamento rápido</li>
            </ul>
          </div>

          <!-- Transferência -->
          <div
            class="card p-6 text-center cursor-pointer border-2 transition-all hover:shadow-xl"
            :class="selectedMethod === 'transfer' ? 'border-purple-500 shadow-lg' : 'border-transparent'"
            @click="selectedMethod = 'transfer'"
          >
            <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:bank" class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Transferência</h3>
            <div class="bg-purple-50 rounded-lg p-3 mb-4">
              <span class="text-xl font-bold text-purple-600">2% OFF</span>
              <p class="text-xs text-purple-700">Desconto à vista</p>
            </div>
            <ul class="text-left text-sm text-gray-600 space-y-2">
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-purple-500" /> TED/DOC</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-purple-500" /> Todos os bancos</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-purple-500" /> Confirmação em 1 dia útil</li>
            </ul>
          </div>
        </div>

        <!-- Payment Details Panel -->
        <Transition name="fade">
          <div v-if="selectedMethod" class="max-w-2xl mx-auto">
            <div class="card p-6 md:p-8">
              <!-- PIX -->
              <div v-if="selectedMethod === 'pix'" class="text-center">
                <Icon icon="mdi:qrcode-scan" class="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 class="text-xl font-bold text-gray-900 mb-4">Pagamento via PIX</h3>
                <div class="bg-gray-50 rounded-xl p-6 mb-6 max-w-sm mx-auto">
                  <p class="text-xs text-gray-500 mb-1">Chave PIX (CNPJ):</p>
                  <p class="text-lg font-bold text-gray-900 mb-2">25.530.623/0001-05</p>
                  <p class="text-xs text-gray-500 mb-1">Favorecido:</p>
                  <p class="font-semibold text-gray-900">Grupo 3W Online</p>
                </div>
                <button @click="copyPix" class="btn-primary">
                  <Icon icon="mdi:content-copy" class="w-4 h-4 mr-2" />
                  Copiar Chave PIX
                </button>
              </div>

              <!-- Cartão -->
              <div v-else-if="selectedMethod === 'card'" class="text-center">
                <Icon icon="mdi:credit-card-check" class="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 class="text-xl font-bold text-gray-900 mb-4">Pagamento com Cartão</h3>
                <p class="text-gray-600 mb-6">Você será redirecionado para nossa plataforma de pagamento segura.</p>
                <div class="flex justify-center gap-4 mb-6">
                  <Icon icon="logos:visa" class="h-8 w-auto" />
                  <Icon icon="logos:mastercard" class="h-8 w-auto" />
                  <Icon icon="simple-icons:americanexpress" class="h-8 w-auto text-blue-800" />
                </div>
                <a
                  href="https://wa.me/5541996924829?text=Olá! Gostaria de realizar pagamento com cartão de crédito."
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-primary"
                >
                  <Icon icon="mdi:open-in-new" class="w-4 h-4 mr-2" />
                  Prosseguir com Cartão
                </a>
              </div>

              <!-- Transferência -->
              <div v-else-if="selectedMethod === 'transfer'" class="text-center">
                <Icon icon="mdi:bank-transfer" class="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 class="text-xl font-bold text-gray-900 mb-4">Transferência Bancária</h3>
                <div class="bg-gray-50 rounded-xl p-6 text-left max-w-sm mx-auto mb-6 space-y-2">
                  <div><span class="text-xs text-gray-500">Banco:</span><p class="font-semibold">Banco do Brasil</p></div>
                  <div><span class="text-xs text-gray-500">Agência:</span><p class="font-semibold">1234-5</p></div>
                  <div><span class="text-xs text-gray-500">Conta:</span><p class="font-semibold">12345-6</p></div>
                  <div><span class="text-xs text-gray-500">CNPJ:</span><p class="font-semibold">25.530.623/0001-05</p></div>
                  <div><span class="text-xs text-gray-500">Favorecido:</span><p class="font-semibold">Grupo 3W Online</p></div>
                </div>
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left text-sm text-yellow-800 mb-6">
                  <Icon icon="mdi:alert" class="w-4 h-4 inline mr-1" />
                  Após a transferência, envie o comprovante para
                  <a href="mailto:financeiro@3wonline.com.br" class="font-semibold underline">financeiro@3wonline.com.br</a>.
                </div>
                <a
                  href="mailto:financeiro@3wonline.com.br?subject=Comprovante de pagamento"
                  class="btn-primary"
                >
                  <Icon icon="mdi:email-send" class="w-4 h-4 mr-2" />
                  Enviar Comprovante
                </a>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Support -->
        <div class="mt-12 text-center">
          <div class="card p-6 max-w-2xl mx-auto">
            <Icon icon="mdi:headset" class="w-10 h-10 text-primary-600 mx-auto mb-3" />
            <h3 class="text-lg font-bold text-gray-900 mb-2">Precisa de Ajuda?</h3>
            <p class="text-sm text-gray-600 mb-4">Nossa equipe está pronta para ajudar com qualquer dúvida sobre pagamentos.</p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:financeiro@3wonline.com.br" class="btn-primary text-sm">
                <Icon icon="mdi:email" class="w-4 h-4 mr-2" />
                financeiro@3wonline.com.br
              </a>
              <a
                href="https://wa.me/5541996924829?text=Olá! Preciso de ajuda com pagamento."
                target="_blank"
                rel="noopener noreferrer"
                class="btn-outline !border-green-500 !text-green-600 hover:!bg-green-500 hover:!text-white text-sm"
              >
                <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" />
                Suporte WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useAlert } from '@/composables/useAlert'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'

const { showSuccess } = useAlert()
const selectedMethod = ref<string | null>(null)

async function copyPix() {
  try {
    await navigator.clipboard.writeText('25.530.623/0001-05')
    showSuccess('Chave copiada!', 'A chave PIX foi copiada para a área de transferência.')
  } catch {
    showSuccess('Chave PIX', '25.530.623/0001-05 — copie manualmente.')
  }
}
</script>
