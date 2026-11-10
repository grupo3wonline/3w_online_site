<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <AppBreadcrumb :items="breadcrumbs" />
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4"><div class="gradient-hero rounded-full p-3"><i class="fa-solid fa-video text-white text-2xl"></i></div></div>
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Calculadora Videomaker</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calcule preços para produção de vídeos considerando horas de gravação, edição e equipamentos.</p>
      </div>
      <div class="grid lg:grid-cols-2 gap-8">
        <div class="card p-6">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><i class="fa-solid fa-pencil text-primary-600"></i> Dados do Cálculo</h2>
          <form @submit.prevent="calcular" autocomplete="off" class="space-y-5">
            <div><label for="horasGravacao" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Horas de Gravação</label><input id="horasGravacao" v-model="horasGravacao" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
            <div><label for="horasEdicao" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Horas de Edição</label><input id="horasEdicao" v-model="horasEdicao" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
            <div><label for="valorHoraVideo" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valor Hora (R$)</label><input id="valorHoraVideo" v-model="valorHoraVideo" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
            <div class="flex gap-3 pt-4">
              <button type="submit" class="flex-1 btn-primary" :disabled="loading"><i class="fa-solid fa-calculator mr-2"></i>{{ loading ? 'Calculando...' : 'Calcular' }}</button>
              <button type="button" @click="limpar" class="btn-secondary">Limpar</button>
            </div>
          </form>
        </div>
        <div v-if="resultado" class="card p-6">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><i class="fa-solid fa-chart-column text-secondary-500"></i> Resultados</h2>
          <div class="space-y-4">
            <div v-for="(value, key) in resultado" :key="key" class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ key }}</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 grid md:grid-cols-2 gap-8">
        <div class="card p-6"><h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><i class="fa-solid fa-circle-info text-primary-600"></i> Como Usar</h3><ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400"><li> Preencha todos os campos com valores válidos</li><li> Clique em Calcular para ver os resultados</li><li> Use Limpar para recomeçar</li></ul></div>
        <div class="card p-6"><h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><i class="fa-solid fa-lightbulb text-secondary-500"></i> Dicas</h3><ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400"><li> Considere todos os custos envolvidos</li><li> Compare com valores do mercado</li><li> Revise seus cálculos periodicamente</li></ul></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import { useSeo, calculatorJsonLd } from '@/composables/useSeo'
import { parseNumber, formatBRL } from '@/utils/finance'
import { precoPorHora } from '@/utils/pricing'

useSeo({
  title: 'Calculadora para Videomaker',
  description: 'Descubra quanto cobrar por um vídeo considerando horas de gravação, edição, equipamentos e lucro. Ferramenta gratuita para videomakers precificarem projetos.',
  keywords: 'calculadora para videomaker, quanto cobrar por vídeo, preço de produção de vídeo, orçamento audiovisual, precificação de videomaker',
  jsonLd: calculatorJsonLd({
    name: 'Calculadora para Videomaker',
    description: 'Descubra quanto cobrar por um vídeo considerando horas de gravação, edição, equipamentos e lucro.',
    path: '/calculadora-videomaker'
  })
})

const breadcrumbs = [{ label: 'Início', path: '/' }, { label: 'Calculadoras', path: '/calculadoras' }, { label: 'Videomaker', path: '/calculadora-videomaker' }]

const horasGravacao = ref('')
const horasEdicao = ref('')
const valorHoraVideo = ref('')
const resultado = ref(null)
const loading = ref(false)

function calcular() {
  const gravacao = parseNumber(horasGravacao.value)
  const edicao = parseNumber(horasEdicao.value)
  const vHora = parseNumber(valorHoraVideo.value)
  if (!(gravacao >= 0) || !(edicao >= 0) || !(vHora > 0) || !(gravacao + edicao > 0)) {
    Swal.fire({ icon: 'warning', title: 'Dados inválidos', text: 'Informe as horas e um valor da hora maior que zero.', confirmButtonColor: '#2563eb' })
    return
  }
  loading.value = true
  setTimeout(() => {
    const totalHoras = gravacao + edicao
    const r = precoPorHora(totalHoras, vHora, 0)
    resultado.value = {
      'Horas Totais': `${totalHoras}h`,
      'Valor Hora': formatBRL(vHora),
      'Valor do Projeto': formatBRL(r.total)
    }
    loading.value = false
    Swal.fire({ icon: 'success', title: 'Calculado!', confirmButtonColor: '#2563eb', timer: 1500, showConfirmButton: false })
  }, 400)
}

function limpar() { horasGravacao.value = ''; horasEdicao.value = ''; valorHoraVideo.value = ''; resultado.value = null }
</script>
