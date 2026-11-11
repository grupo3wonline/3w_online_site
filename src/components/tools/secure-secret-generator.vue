<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface PasswordOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeSimilar: boolean
  count: number
}

const passwords = ref<string[]>([])
const copiedIndex = ref<number | null>(null)
const options = reactive<PasswordOptions>({
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeSimilar: true,
  count: 1,
})

function generatePasswords() {
  let charset = ''
  if (options.includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
  if (options.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (options.includeNumbers) charset += '0123456789'
  if (options.includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:\'",.<>/?'
  if (options.excludeSimilar) charset = charset.replace(/[il1Lo0O]/g, '')

  if (!charset) {
    Swal.fire({ icon: 'warning', title: 'Nenhum caractere selecionado', text: 'Selecione ao menos um tipo.', confirmButtonColor: '#3b82f6' })
    return
  }

  const array = new Uint32Array(options.count * options.length)
  crypto.getRandomValues(array)
  const result: string[] = []
  for (let i = 0; i < options.count; i++) {
    let pw = ''
    for (let j = 0; j < options.length; j++) {
      pw += charset[array[i * options.length + j] % charset.length]
    }
    result.push(pw)
  }
  passwords.value = result
}

function getStrength(pw: string): { text: string; color: string; pct: number } {
  let score = 0
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[a-z]/.test(pw)) score++
  if (/[A-Z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  if (score < 3) return { text: 'Fraca', color: 'bg-red-500', pct: (score / 6) * 100 }
  if (score < 5) return { text: 'Média', color: 'bg-yellow-500', pct: (score / 6) * 100 }
  return { text: 'Forte', color: 'bg-emerald-500', pct: 100 }
}

async function copyPassword(pw: string, idx: number) {
  await navigator.clipboard.writeText(pw)
  copiedIndex.value = idx
  setTimeout(() => { copiedIndex.value = null }, 2000)
}
</script>

<template>
  <ToolShell

    title="Gerador de Senhas Seguras"

    description="Gere senhas, tokens, chaves API e segredos altamente seguros."

    icon="fa-key"

    icon-gradient="from-emerald-500 to-teal-700"

    orb-color="emerald"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <!-- Header -->

    <div class="grid lg:grid-cols-3 gap-4">
      <!-- Settings Panel -->
      <div class="lg:col-span-1 bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200 flex items-center gap-2">
          <Icon icon="mdi:cog-outline" class="w-4 h-4" />
          Configurações
        </h2>

        <!-- Length -->
        <div>
          <label class="text-blue-300 text-sm block mb-1">Tamanho: <span class="text-white font-semibold">{{ options.length }}</span></label>
          <input type="range" v-model.number="options.length" min="4" max="64"
            class="w-full accent-emerald-500" />
          <div class="flex justify-between text-xs text-blue-400/60 mt-1"><span>4</span><span>64</span></div>
        </div>

        <!-- Checkboxes -->
        <div class="space-y-2">
          <p class="text-blue-300 text-xs font-medium uppercase tracking-wide">Tipos de caracteres</p>
          <label v-for="opt in [
            { key: 'includeLowercase', label: 'Letras Minúsculas (a-z)' },
            { key: 'includeUppercase', label: 'Letras Maiúsculas (A-Z)' },
            { key: 'includeNumbers', label: 'Números (0-9)' },
            { key: 'includeSymbols', label: 'Símbolos (!@#$%)' },
            { key: 'excludeSimilar', label: 'Excluir similares (l, 1, I, O, 0)' },
          ]" :key="opt.key" class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="(options as any)[opt.key]" class="w-4 h-4 accent-emerald-500" />
            <span class="text-blue-200 text-sm">{{ opt.label }}</span>
          </label>
        </div>

        <!-- Count -->
        <div>
          <label class="text-blue-300 text-sm block mb-1">Número de senhas</label>
          <input type="number" v-model.number="options.count" min="1" max="20"
            class="w-full input-aurora" />
        </div>

        <button
          @click="generatePasswords"
          class="btn-aurora btn-aurora-success w-full"
        >
          <Icon icon="mdi:refresh" class="w-4 h-4" />
          Gerar Senhas
        </button>
      </div>

      <!-- Results Panel -->
      <div class="lg:col-span-2 bg-[#111d3a] border border-white/10 rounded-xl p-5">
        <h2 class="text-sm font-semibold text-blue-200 mb-4 flex items-center gap-2">
          <Icon icon="mdi:key-variant" class="w-4 h-4" />
          Senhas Geradas
          <span v-if="passwords.length" class="ml-auto text-blue-400/60 text-xs font-normal">{{ passwords.length }} senha{{ passwords.length > 1 ? 's' : '' }}</span>
        </h2>

        <div v-if="!passwords.length" class="text-center py-16 text-blue-300/40">
          <Icon icon="mdi:shield-outline" class="w-16 h-16 mx-auto mb-4" />
          <p>Clique em "Gerar Senhas" para começar</p>
        </div>

        <div v-else class="space-y-3">
          <div v-for="(pw, idx) in passwords" :key="idx" class="bg-[#0a1628] border border-white/10 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="text-xs text-blue-300">Senha {{ idx + 1 }}</span>
                <span :class="`text-xs font-semibold ${getStrength(pw).text === 'Forte' ? 'text-emerald-400' : getStrength(pw).text === 'Média' ? 'text-yellow-400' : 'text-red-400'}`">
                  {{ getStrength(pw).text }}
                </span>
              </div>
              <button
                @click="copyPassword(pw, idx)"
                :class="copiedIndex === idx ? 'bg-emerald-700' : 'bg-white/10 hover:bg-white/20'"
                class="flex items-center gap-1 px-3 py-1 rounded text-xs transition-colors"
              >
                <Icon :icon="copiedIndex === idx ? 'mdi:check' : 'mdi:content-copy'" class="w-3.5 h-3.5" />
                {{ copiedIndex === idx ? 'Copiado' : 'Copiar' }}
              </button>
            </div>
            <!-- Strength bar -->
            <div class="w-full bg-white/10 rounded-full h-1 mb-3">
              <div :class="`${getStrength(pw).color} h-1 rounded-full transition-all`" :style="`width: ${getStrength(pw).pct}%`" />
            </div>
            <div class="font-mono text-sm text-blue-100 bg-black/30 rounded px-3 py-2 break-all select-all">{{ pw }}</div>
          </div>
        </div>
      </div>
    </div>
  


  </ToolShell></template>