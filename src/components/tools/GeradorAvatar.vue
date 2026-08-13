<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-4">
          <i class="fas fa-user-circle text-cyan-600 dark:text-cyan-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de Avatar</h1>
        <p class="text-gray-600 dark:text-gray-400">Gere avatars aleatórios únicos para perfis e placeholders</p>
      </div>

      <div class="space-y-6">
        <!-- Estilo do Avatar -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            v-for="estilo in estilos"
            :key="estilo.id"
            @click="estiloSelecionado = estilo.id; gerar()"
            class="p-4 rounded-lg font-medium transition-all"
            :class="estiloSelecionado === estilo.id 
              ? 'bg-cyan-600 text-white shadow-lg' 
              : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
          >
            <i :class="estilo.icon" class="text-2xl mb-2"></i>
            <div class="text-sm">{{ estilo.nome }}</div>
          </button>
        </div>

        <!-- Configurações -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="nome"
            label="Nome ou Seed (opcional)"
            type="text"
            icon="fa-solid fa-user"
            placeholder="João Silva"
            hint="Deixe vazio para aleatório"
          />

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <i class="fas fa-expand text-cyan-600 dark:text-cyan-400 mr-2"></i>
              Tamanho
            </label>
            <select 
              v-model="tamanho" 
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="64">64x64 (Pequeno)</option>
              <option value="128">128x128 (Médio)</option>
              <option value="256">256x256 (Grande)</option>
              <option value="512">512x512 (Extra Grande)</option>
            </select>
          </div>
        </div>

        <!-- Botões -->
        <div class="flex gap-4">
          <BaseButton @click="gerar" variant="primary" class="flex-1">
            <i class="fas fa-rotate mr-2"></i>
            Gerar Avatar
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Avatar Gerado -->
        <div v-if="avatarGerado" class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8">
            <div class="flex flex-col items-center gap-6">
              <div class="relative">
                <img
                  :src="avatarUrl"
                  :alt="nome || 'Avatar'"
                  class="rounded-full shadow-2xl"
                  :style="{ width: `${Math.min(Number(tamanho), 256)}px`, height: `${Math.min(Number(tamanho), 256)}px` }"
                />
              </div>

              <div class="text-center">
                <div class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {{ nome || 'Avatar Aleatório' }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ tamanho }}x{{ tamanho }}px • {{ estiloNome }}
                </div>
              </div>
            </div>
          </div>

          <!-- Ações -->
          <div class="grid grid-cols-2 gap-4">
            <BaseButton @click="baixar" variant="primary" class="flex-1">
              <i class="fas fa-download mr-2"></i>
              Baixar PNG
            </BaseButton>
            <BaseButton @click="copiarURL" variant="outline" class="flex-1">
              <i class="fas fa-link mr-2"></i>
              Copiar URL
            </BaseButton>
          </div>

          <!-- URLs e Código -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">
              <i class="fas fa-code text-cyan-600 dark:text-cyan-400 mr-2"></i>
              Código para Usar
            </h3>

            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">URL do Avatar</div>
              <div class="bg-white dark:bg-gray-600 rounded p-3 font-mono text-xs overflow-x-auto">
                <code class="text-gray-900 dark:text-white break-all">{{ avatarUrl }}</code>
              </div>
            </div>

            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">HTML</div>
              <div class="bg-white dark:bg-gray-600 rounded p-3 font-mono text-xs overflow-x-auto">
                <pre class="text-gray-900 dark:text-white">&lt;img src="{{ avatarUrl }}" alt="Avatar" /&gt;</pre>
              </div>
            </div>

            <div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">React / Next.js</div>
              <div class="bg-white dark:bg-gray-600 rounded p-3 font-mono text-xs overflow-x-auto">
                <pre class="text-gray-900 dark:text-white">&lt;Image src="{{ avatarUrl }}" alt="Avatar" width="{{ tamanho }}" height="{{ tamanho }}" /&gt;</pre>
              </div>
            </div>
          </div>

          <!-- Galeria de Variações -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                <i class="fas fa-images text-cyan-600 dark:text-cyan-400 mr-2"></i>
                Mais Variações
              </h3>
              <BaseButton @click="gerarVariacoes" variant="outline" size="sm">
                <i class="fas fa-rotate mr-2"></i>
                Gerar Mais
              </BaseButton>
            </div>

            <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
              <div
                v-for="(variacao, index) in variacoes"
                :key="index"
                @click="selecionarVariacao(variacao)"
                class="cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  :src="variacao"
                  alt="Variação"
                  class="w-full rounded-lg shadow hover:shadow-lg"
                />
              </div>
            </div>
          </div>

          <!-- Informações -->
          <div class="bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-cyan-600 dark:text-cyan-400 mt-1 mr-3"></i>
              <div class="text-sm text-cyan-800 dark:text-cyan-300">
                <p class="font-semibold mb-2">Sobre os Avatars:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Os avatars são gerados usando serviços públicos de API</li>
                  <li>Cada nome/seed gera sempre o mesmo avatar (determinístico)</li>
                  <li>Perfeito para placeholders, perfis de teste e prototipagem</li>
                  <li>Totalmente gratuito e sem necessidade de registro</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage, trackConversion } = useAnalytics()

const estilos = [
  { id: 'avataaars', nome: 'Avataaars', icon: 'fas fa-smile' },
  { id: 'bottts', nome: 'Robôs', icon: 'fas fa-robot' },
  { id: 'identicon', nome: 'Identicon', icon: 'fas fa-shapes' },
  { id: 'initials', nome: 'Iniciais', icon: 'fas fa-font' }
]

const estiloSelecionado = ref('avataaars')
const nome = ref('')
const tamanho = ref('256')
const avatarGerado = ref(false)
const avatarUrl = ref('')
const variacoes = ref([])

const estiloNome = computed(() => {
  return estilos.find(e => e.id === estiloSelecionado.value)?.nome || ''
})

const gerarSeed = () => {
  if (nome.value.trim()) {
    return nome.value.trim().toLowerCase().replace(/\s+/g, '-')
  }
  return Math.random().toString(36).substring(2, 15)
}

const gerarURL = (seed, estilo = estiloSelecionado.value) => {
  const tamanhoNum = tamanho.value
  
  switch (estilo) {
    case 'avataaars':
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&size=${tamanhoNum}`
    case 'bottts':
      return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}&size=${tamanhoNum}`
    case 'identicon':
      return `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}&size=${tamanhoNum}`
    case 'initials':
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(seed)}&size=${tamanhoNum}&background=random&color=fff&bold=true`
    default:
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&size=${tamanhoNum}`
  }
}

const gerar = () => {
  const seed = gerarSeed()
  avatarUrl.value = gerarURL(seed)
  avatarGerado.value = true
  
  gerarVariacoes()
  trackToolUsage('Gerador Avatar', 'generate')
}

const gerarVariacoes = () => {
  variacoes.value = []
  for (let i = 0; i < 6; i++) {
    const seed = Math.random().toString(36).substring(2, 15)
    variacoes.value.push(gerarURL(seed))
  }
}

const selecionarVariacao = (url) => {
  avatarUrl.value = url
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const baixar = async () => {
  try {
    const response = await fetch(avatarUrl.value)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `avatar-${Date.now()}.${estiloSelecionado.value === 'initials' ? 'png' : 'svg'}`
    link.click()
    
    window.URL.revokeObjectURL(url)
    
    trackConversion('download', 'avatar')
    Swal.fire({
      icon: 'success',
      title: 'Download iniciado!',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível baixar o avatar' })
  }
}

const copiarURL = async () => {
  try {
    await navigator.clipboard.writeText(avatarUrl.value)
    trackConversion('copy', 'avatar-url')
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: 'URL do avatar copiada',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const limpar = () => {
  nome.value = ''
  avatarGerado.value = false
  variacoes.value = []
}
</script>
