<template>
  <ToolShell
    title="Gerador de Avatar"
    description="Gere avatares coloridos e únicos a partir de iniciais, nomes ou seeds aleatórias. Ideal para sistemas de perfil."
    icon="fa-user-circle"
    icon-gradient="from-pink-500 to-rose-700"
    orb-color="pink"
    :quick-tips="['4 estilos', 'Download PNG/SVG', 'URL copiável']"
    :tips="[
      { title: 'Determinístico', text: 'O mesmo nome/seed sempre gera o mesmo avatar. Útil para sistemas onde o usuário ainda não enviou foto.' },
      { title: 'API DiceBear', text: 'Os avatares são gerados pela API pública DiceBear 7.x. Não é necessário autenticação.', type: 'info' },
      { title: 'Uso em produção', text: 'Para produção, considere hospedar as imagens localmente para garantir disponibilidade.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Avatar de usuário', desc: 'Seed: João Silva, Estilo: Avataaars', result: 'Avatar humano consistente para João Silva' },
      { title: 'Robô para sistema', desc: 'Seed: aleatória, Estilo: Robôs', result: 'Avatar robótico único gerado aleatoriamente' },
      { title: 'Iniciais formais', desc: 'Seed: Maria, Estilo: Iniciais', result: 'Círculo colorido com as letras MA' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Estilos -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-palette mr-1.5 text-pink-500"></i>
              Estilo do avatar
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="estilo in estilos"
                :key="estilo.id"
                @click="estiloSelecionado = estilo.id; gerar()"
                :class="[
                  'p-3 rounded-xl border-2 transition-all text-center',
                  estiloSelecionado === estilo.id
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300'
                    : 'border-gray-200 dark:border-slate-700 hover:border-pink-300 text-gray-700 dark:text-slate-300'
                ]"
              >
                <i :class="[estilo.icon, 'text-xl mb-1 block']"></i>
                <span class="text-xs font-semibold">{{ estilo.nome }}</span>
              </button>
            </div>
          </div>

          <BaseInput
            v-model="nome"
            label="Nome ou Seed"
            icon="fa-user"
            placeholder="João Silva"
            tooltip="O mesmo nome sempre gera o mesmo avatar. Deixe vazio para gerar aleatoriamente."
            hint="Deixe vazio para seed aleatória"
          />

          <div>
            <label class="input-aurora-label">
              <i class="fas fa-expand mr-1.5 text-rose-500"></i>
              Tamanho
            </label>
            <select v-model="tamanho" class="input-aurora">
              <option value="64">64×64 px (Pequeno)</option>
              <option value="128">128×128 px (Médio)</option>
              <option value="256">256×256 px (Grande)</option>
              <option value="512">512×512 px (Extra Grande)</option>
            </select>
          </div>

          <div class="flex gap-3">
            <BaseButton variant="success" icon="fa-rotate" @click="gerar" class="flex-1">
              Gerar Avatar
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in">
          <div v-if="avatarGerado" class="space-y-4">
            <!-- Avatar principal -->
            <div class="glass-panel p-6 text-center">
              <div class="inline-block relative mb-4">
                <img
                  :src="avatarUrl"
                  :alt="nome || 'Avatar'"
                  class="rounded-full shadow-2xl ring-4 ring-pink-200 dark:ring-pink-800"
                  :style="{ width: `${Math.min(Number(tamanho), 200)}px`, height: `${Math.min(Number(tamanho), 200)}px` }"
                />
                <span class="absolute -bottom-1 -right-1 w-7 h-7 bg-pink-500 rounded-full flex items-center justify-center shadow">
                  <i class="fas fa-check text-white text-xs"></i>
                </span>
              </div>
              <div class="text-base font-bold text-gray-900 dark:text-white mb-0.5">{{ nome || 'Avatar Aleatório' }}</div>
              <div class="text-xs text-gray-500 dark:text-slate-400">{{ tamanho }}×{{ tamanho }}px · {{ estiloNome }}</div>
            </div>

            <!-- Ações -->
            <div class="grid grid-cols-2 gap-3">
              <BaseButton variant="primary" icon="fa-download" @click="baixar" class="w-full">
                Baixar
              </BaseButton>
              <BaseButton variant="outline" icon="fa-link" @click="copiarURL" class="w-full">
                Copiar URL
              </BaseButton>
            </div>

            <!-- URL e código -->
            <div class="glass-panel p-4 space-y-3">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
                <i class="fas fa-code text-pink-500"></i>
                Código de integração
              </h4>
              <div>
                <p class="text-[10px] text-gray-500 dark:text-slate-400 mb-1">URL direta</p>
                <div class="bg-gray-50 dark:bg-slate-900 rounded-lg p-2 font-mono text-xs text-gray-700 dark:text-slate-200 break-all overflow-x-auto">
                  {{ avatarUrl }}
                </div>
              </div>
              <div>
                <p class="text-[10px] text-gray-500 dark:text-slate-400 mb-1">HTML</p>
                <div class="bg-gray-50 dark:bg-slate-900 rounded-lg p-2 font-mono text-xs text-gray-700 dark:text-slate-200">
                  &lt;img src="{{ avatarUrl }}" alt="Avatar" /&gt;
                </div>
              </div>
            </div>

            <!-- Variações -->
            <div class="glass-panel p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
                  <i class="fas fa-images text-pink-500"></i>
                  Mais variações
                </h4>
                <BaseButton variant="outline" size="xs" icon="fa-rotate" @click="gerarVariacoes">Gerar</BaseButton>
              </div>
              <div class="grid grid-cols-6 gap-2">
                <div
                  v-for="(variacao, index) in variacoes"
                  :key="index"
                  @click="selecionarVariacao(variacao)"
                  class="cursor-pointer hover:scale-110 transition-transform"
                >
                  <img :src="variacao" alt="Variação" class="w-full rounded-lg shadow hover:shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!avatarGerado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-user-circle text-3xl mb-3 opacity-30 block text-pink-400"></i>
          <p class="text-sm">Configure e clique em <strong>Gerar Avatar</strong></p>
        </div>
      </div>
    </div>

    <!-- Dica final -->
    <div class="mt-4 tip-card">
      <i class="fas fa-info-circle text-pink-500 flex-shrink-0 mt-0.5"></i>
      <span class="text-xs">
        Avatares são gerados via API <strong>DiceBear</strong> (gratuita e pública). Cada seed gera sempre o mesmo avatar — perfeito para sistemas com foto de perfil opcional.
      </span>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const estilos = [
  { id: 'avataaars', nome: 'Humano',   icon: 'fas fa-smile' },
  { id: 'bottts',    nome: 'Robôs',    icon: 'fas fa-robot' },
  { id: 'identicon', nome: 'Identicon',icon: 'fas fa-shapes' },
  { id: 'initials',  nome: 'Iniciais', icon: 'fas fa-font' },
]

const estiloSelecionado = ref('avataaars')
const nome              = ref('')
const tamanho           = ref('256')
const avatarGerado      = ref(false)
const avatarUrl         = ref('')
const variacoes         = ref([])

const estiloNome = computed(() => estilos.find(e => e.id === estiloSelecionado.value)?.nome || '')

const gerarSeed = () =>
  nome.value.trim() ? nome.value.trim().toLowerCase().replace(/\s+/g, '-')
                     : Math.random().toString(36).substring(2, 15)

const gerarURL = (seed, estilo = estiloSelecionado.value) => {
  const sz = tamanho.value
  switch (estilo) {
    case 'avataaars': return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&size=${sz}`
    case 'bottts':    return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}&size=${sz}`
    case 'identicon': return `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}&size=${sz}`
    case 'initials':  return `https://ui-avatars.com/api/?name=${encodeURIComponent(seed)}&size=${sz}&background=random&color=fff&bold=true`
    default:          return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&size=${sz}`
  }
}

const gerar = () => {
  avatarUrl.value = gerarURL(gerarSeed())
  avatarGerado.value = true
  gerarVariacoes()
}

const gerarVariacoes = () => {
  variacoes.value = Array.from({ length: 6 }, () => gerarURL(Math.random().toString(36).substring(2, 15)))
}

const selecionarVariacao = (url) => {
  avatarUrl.value = url
}

const baixar = async () => {
  try {
    const response = await fetch(avatarUrl.value)
    const blob = await response.blob()
    const url  = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `avatar-${Date.now()}.${estiloSelecionado.value === 'initials' ? 'png' : 'svg'}`
    link.click()
    window.URL.revokeObjectURL(url)
    Swal.fire({ icon: 'success', title: 'Download iniciado!', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível baixar o avatar' })
  }
}

const copiarURL = async () => {
  try {
    await navigator.clipboard.writeText(avatarUrl.value)
    Swal.fire({ icon: 'success', title: 'URL copiada!', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const limpar = () => {
  nome.value = ''
  avatarGerado.value = false
  variacoes.value = []
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
