<template>
  <div class="price-simulator">
    <div class="flex items-center gap-2 mb-2">
      <Icon icon="mdi:calculator" class="w-6 h-6 text-primary-600" />
      <h3 class="text-lg font-bold text-gray-900">Simulador de Preços</h3>
    </div>
    <p class="text-sm text-gray-600 mb-6">
      <Icon icon="mdi:information-outline" class="w-4 h-4 inline mr-1" />
      Configure suas necessidades e receba uma estimativa personalizada.
    </p>

    <div class="space-y-4">
      <!-- Service-specific fields -->
      <div v-if="serviceType === 'social-media'">
        <label class="form-label">Número de Redes Sociais</label>
        <select v-model="socialMediaCount" class="form-select" autocomplete="off">
          <option value="1">1 Rede Social</option>
          <option value="2">2 Redes Sociais</option>
          <option value="3">3 Redes Sociais</option>
          <option value="4">4+ Redes Sociais</option>
        </select>
        <p class="form-hint">Selecione quantas redes você deseja gerenciar</p>
      </div>

      <div v-if="serviceType === 'ads'">
        <label class="form-label">Orçamento Mensal para Anúncios</label>
        <select v-model="adsBudget" class="form-select" autocomplete="off">
          <option value="500">Até R$ 500</option>
          <option value="1000">R$ 500 - R$ 1.000</option>
          <option value="2000">R$ 1.000 - R$ 2.000</option>
          <option value="5000">R$ 2.000 - R$ 5.000</option>
          <option value="10000">Acima de R$ 5.000</option>
        </select>
      </div>

      <div v-if="serviceType === 'website'">
        <label class="form-label">Tipo de Site</label>
        <select v-model="websiteType" class="form-select" autocomplete="off">
          <option value="institucional">Site Institucional</option>
          <option value="ecommerce">E-commerce</option>
          <option value="blog">Blog/Portal</option>
          <option value="sistema">Sistema Web</option>
        </select>
      </div>

      <div v-if="serviceType === 'app'">
        <label class="form-label">Plataforma</label>
        <select v-model="appPlatform" class="form-select" autocomplete="off">
          <option value="android">Android</option>
          <option value="ios">iOS</option>
          <option value="both">Android + iOS</option>
        </select>
      </div>

      <div v-if="serviceType === 'system'">
        <label class="form-label">Tipo de Sistema</label>
        <select v-model="systemType" class="form-select" autocomplete="off">
          <option value="crm">CRM Personalizado</option>
          <option value="erp">Sistema de Gestão (ERP)</option>
          <option value="agendamento">Sistema de Agendamento</option>
          <option value="estoque">Controle de Estoque</option>
          <option value="financeiro">Sistema Financeiro</option>
          <option value="educacional">Sistema Educacional</option>
          <option value="personalizado">Sistema Personalizado</option>
        </select>
      </div>

      <!-- Common fields -->
      <div>
        <label class="form-label">Complexidade do Projeto</label>
        <select v-model="complexity" class="form-select" autocomplete="off">
          <option value="basic">Básico</option>
          <option value="intermediate">Intermediário</option>
          <option value="advanced">Avançado</option>
        </select>
        <p class="form-hint">Quanto mais complexo, maior o investimento e prazo</p>
      </div>

      <div>
        <label class="form-label">Prazo Desejado</label>
        <select v-model="deadline" class="form-select" autocomplete="off">
          <option value="normal">Normal (30-60 dias)</option>
          <option value="urgent">Urgente (15-30 dias)</option>
          <option value="express">Express (até 15 dias)</option>
        </select>
        <p class="form-hint">Prazos menores podem ter acréscimo no valor</p>
      </div>
    </div>

    <!-- Result -->
    <div class="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h4 class="font-semibold text-primary-900 text-sm">Estimativa de Investimento</h4>
          <p class="text-xs text-primary-700">Valores aproximados para este projeto</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-primary-600">
            R$ {{ calculatedPrice.toLocaleString('pt-BR') }}
          </div>
          <div class="text-xs text-primary-600">
            {{ isRecurring ? '/ mês' : 'valor único' }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 flex flex-col sm:flex-row gap-3">
      <button @click="requestQuote" class="btn-primary flex-1 text-sm">
        <Icon icon="mdi:file-document-edit" class="w-4 h-4 mr-2" />
        Solicitar Orçamento
      </button>
      <button @click="contactWhatsApp" class="btn-outline flex-1 text-sm !border-green-500 !text-green-600 hover:!bg-green-500 hover:!text-white">
        <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" />
        Falar no WhatsApp
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
  serviceType: string
}

const props = defineProps<Props>()

const socialMediaCount = ref('2')
const adsBudget = ref('1000')
const websiteType = ref('institucional')
const appPlatform = ref('android')
const systemType = ref('crm')
const complexity = ref('intermediate')
const deadline = ref('normal')

const isRecurring = computed(() => {
  return ['social-media', 'ads', 'consulting'].includes(props.serviceType)
})

const calculatedPrice = computed(() => {
  let basePrice = 0

  switch (props.serviceType) {
    case 'social-media':
      basePrice = 800 + parseInt(socialMediaCount.value) * 400
      break
    case 'ads':
      basePrice = 1200 + parseInt(adsBudget.value) * 0.15
      break
    case 'website':
      basePrice = { institucional: 3500, ecommerce: 8000, blog: 2500, sistema: 15000 }[websiteType.value] ?? 3500
      break
    case 'app':
      basePrice = appPlatform.value === 'both' ? 21600 : 12000
      break
    case 'system':
      basePrice = { crm: 15000, erp: 25000, agendamento: 8000, estoque: 12000, financeiro: 18000, educacional: 20000, personalizado: 22000 }[systemType.value] ?? 15000
      break
    case 'consulting': basePrice = 2500; break
    case 'campaign': basePrice = 4500; break
    case 'design': basePrice = 1800; break
    case 'advertising': basePrice = 6000; break
    case 'business': basePrice = 3500; break
    case 'pr': basePrice = 2800; break
    default: basePrice = 1500
  }

  const complexityMultiplier = { basic: 0.8, intermediate: 1, advanced: 1.4 }[complexity.value] ?? 1
  const deadlineMultiplier = { normal: 1, urgent: 1.3, express: 1.6 }[deadline.value] ?? 1

  return Math.round(basePrice * complexityMultiplier * deadlineMultiplier)
})

function requestQuote(): void {
  const message = `Olá! Gostaria de um orçamento detalhado. Serviço: ${props.serviceType}, Complexidade: ${complexity.value}, Prazo: ${deadline.value}. Estimativa: R$ ${calculatedPrice.value.toLocaleString('pt-BR')}.`
  window.open(`https://wa.me/5541996924829?text=${encodeURIComponent(message)}`, '_blank')
}

function contactWhatsApp(): void {
  const message = `Olá! Tenho interesse no serviço de ${props.serviceType} e gostaria de conversar sobre meu projeto.`
  window.open(`https://wa.me/5541996924829?text=${encodeURIComponent(message)}`, '_blank')
}
</script>
