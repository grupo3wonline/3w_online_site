<template>
  <ToolShell
    title="Verificador de Força de Senha"
    description="Analise a segurança de uma senha com score detalhado, entropia e sugestões de melhoria."
    icon="fa-lock"
    icon-gradient="from-purple-500 to-violet-700"
    orb-color="purple"
    :quick-tips="['Score detalhado', 'Estimativa de crack', 'Sugestões de melhoria']"
    :tips="[
      { text: 'Senhas fortes têm 16+ caracteres com letras, números e símbolos.' },
      { text: 'Nunca use palavras do dicionário como base — são fáceis de quebrar por força bruta.', type: 'warning' },
      { text: 'Use um gerenciador de senhas (Bitwarden, 1Password) para gerenciar senhas únicas.', type: 'info' },
    ]"
  >
    <div class="tool-body">
      <div class="relative">
        <label class="input-aurora-label">
          <i class="fas fa-key mr-1.5 text-purple-500"></i>
          Senha para analisar
        </label>
        <div class="relative">
          <input
            v-model="senha"
            :type="mostrarSenha ? 'text' : 'password'"
            class="input-aurora pr-12"
            placeholder="Digite a senha para analisar..."
            autocomplete="off"
          />
          <button
            type="button"
            @click="mostrarSenha = !mostrarSenha"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors"
            :title="mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'"
          >
            <i :class="['fas', mostrarSenha ? 'fa-eye-slash' : 'fa-eye', 'text-sm']"></i>
          </button>
        </div>
        <p class="input-aurora-hint">{{ senha.length }} caracteres</p>
      </div>
    </div>

    <!-- Resultado -->
    <Transition name="scale-in">
      <div v-if="senha" class="mt-4 space-y-4">
        <!-- Score visual -->
        <div :class="['p-5 rounded-2xl border-2', scoreBg]">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-semibold" :class="scoreColor">Força da Senha</span>
            <span :class="['text-xl font-black', scoreColor]">{{ scoreLabel }}</span>
          </div>
          <div class="strength-track mb-2">
            <div
              class="strength-bar transition-all duration-700"
              :class="scoreBar"
              :style="{ width: `${(score / 5) * 100}%` }"
            ></div>
          </div>
          <div class="flex justify-between text-[10px] text-gray-500 dark:text-slate-400">
            <span>Muito Fraca</span><span>Fraca</span><span>Média</span><span>Forte</span><span>Muito Forte</span>
          </div>
        </div>

        <!-- Métricas -->
        <div class="grid grid-cols-3 gap-3">
          <div class="metric-glass">
            <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ analise.entropia.toFixed(0) }}</div>
            <div class="metric-glass-label">Bits de entropia</div>
          </div>
          <div class="metric-glass">
            <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ analise.poolSize }}</div>
            <div class="metric-glass-label">Tamanho do pool</div>
          </div>
          <div class="metric-glass">
            <div class="metric-glass-value text-teal-600 dark:text-teal-400 text-sm">{{ analise.tempoCrack }}</div>
            <div class="metric-glass-label">Tempo p/ quebrar</div>
          </div>
        </div>

        <!-- Checklist de requisitos -->
        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-clipboard-check text-primary-500"></i>
            Checklist de Segurança
          </h4>
          <div class="space-y-2">
            <div
              v-for="req in requisitos"
              :key="req.label"
              class="flex items-center gap-3 text-xs"
              :class="req.ok ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-500 dark:text-slate-400'"
            >
              <i :class="['fas', req.ok ? 'fa-check-circle text-emerald-500' : 'fa-circle text-gray-300 dark:text-slate-600', 'w-4 flex-shrink-0']"></i>
              {{ req.label }}
            </div>
          </div>
        </div>

        <!-- Sugestões -->
        <div v-if="sugestoes.length" class="tip-card-warning">
          <i class="fas fa-lightbulb text-amber-500 flex-shrink-0 mt-0.5"></i>
          <div>
            <p class="font-semibold text-xs mb-1">Como melhorar:</p>
            <ul class="text-xs space-y-0.5">
              <li v-for="s in sugestoes" :key="s">• {{ s }}</li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'

const senha       = ref('')
const mostrarSenha= ref(false)

// ─── Análise ──────────────────────────────────────────────────────────────────
const analise = computed(() => {
  const s = senha.value
  if (!s) return { entropia: 0, poolSize: 0, tempoCrack: '—' }

  let pool = 0
  if (/[a-z]/.test(s)) pool += 26
  if (/[A-Z]/.test(s)) pool += 26
  if (/[0-9]/.test(s)) pool += 10
  if (/[^a-zA-Z0-9]/.test(s)) pool += 32

  const entropia    = s.length * Math.log2(pool || 1)
  const combinations = Math.pow(pool || 1, s.length)
  // Assume 10 bilhões de tentativas/segundo
  const segundos = combinations / 1e10
  let tempoCrack = '< 1 segundo'
  if (segundos > 60) tempoCrack = `${(segundos / 60).toFixed(0)} minutos`
  if (segundos > 3600) tempoCrack = `${(segundos / 3600).toFixed(0)} horas`
  if (segundos > 86400) tempoCrack = `${(segundos / 86400).toFixed(0)} dias`
  if (segundos > 365 * 86400) tempoCrack = `${(segundos / (365 * 86400)).toFixed(0)} anos`
  if (segundos > 1000 * 365 * 86400) tempoCrack = 'Séculos'
  if (entropia > 100) tempoCrack = '∞ Impossível'

  return { entropia, poolSize: pool, tempoCrack }
})

const score = computed(() => {
  const s = senha.value
  if (!s) return 0
  const e = analise.value.entropia
  if (e < 28) return 1
  if (e < 36) return 2
  if (e < 60) return 3
  if (e < 80) return 4
  return 5
})

const scoreLabel = computed(() => ['', 'Muito Fraca', 'Fraca', 'Média', 'Forte', 'Muito Forte'][score.value])
const scoreColor = computed(() => ['','text-red-600','text-orange-500','text-amber-500','text-emerald-600','text-blue-600'][score.value])
const scoreBar   = computed(() => ['','bg-red-500','bg-orange-500','bg-amber-400','bg-emerald-500','bg-blue-600'][score.value])
const scoreBg    = computed(() => [
  '',
  'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
  'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
  'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
  'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
][score.value])

const requisitos = computed(() => {
  const s = senha.value
  return [
    { label: 'Mínimo de 8 caracteres',               ok: s.length >= 8  },
    { label: 'Mínimo de 12 caracteres (recomendado)', ok: s.length >= 12 },
    { label: 'Contém letras minúsculas (a–z)',         ok: /[a-z]/.test(s) },
    { label: 'Contém letras maiúsculas (A–Z)',         ok: /[A-Z]/.test(s) },
    { label: 'Contém números (0–9)',                   ok: /[0-9]/.test(s) },
    { label: 'Contém símbolos (!@#$%...)',             ok: /[^a-zA-Z0-9]/.test(s) },
    { label: 'Não é uma sequência óbvia',              ok: !/^(123|abc|qwerty|password|senha)/i.test(s) },
    { label: 'Mais de 16 caracteres (ótimo)',          ok: s.length >= 16 },
  ]
})

const sugestoes = computed(() => {
  const s = senha.value
  const list: string[] = []
  if (s.length < 8)  list.push('Aumente para pelo menos 8 caracteres.')
  if (s.length < 12) list.push('16+ caracteres é o ideal para contas importantes.')
  if (!/[A-Z]/.test(s)) list.push('Adicione letras maiúsculas.')
  if (!/[0-9]/.test(s)) list.push('Inclua pelo menos um número.')
  if (!/[^a-zA-Z0-9]/.test(s)) list.push('Adicione símbolos especiais (!@#$%^&*).')
  if (/(.)\1{2,}/.test(s)) list.push('Evite repetir o mesmo caractere consecutivamente.')
  return list
})
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.25s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
