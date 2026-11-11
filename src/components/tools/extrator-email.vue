<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const inputText = ref('')
const emails = ref<string[]>([])
const phones = ref<string[]>([])
const mode = ref<'email' | 'phone' | 'both'>('email')
const copied = ref(false)

const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g
const phoneRegex = /(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\s?\d{4}|\d{4})[-\s]?\d{4}/g

function extract() {
  const text = inputText.value
  if (!text.trim()) {
    Swal.fire({ icon: 'warning', title: 'Texto vazio', text: 'Cole algum texto para extrair.', confirmButtonColor: '#3b82f6' })
    return
  }
  emails.value = [...new Set(text.match(emailRegex) ?? [])]
  phones.value = [...new Set(text.match(phoneRegex) ?? [])]

  if (emails.value.length === 0 && phones.value.length === 0) {
    Swal.fire({ icon: 'info', title: 'Nada encontrado', text: 'Nenhum e-mail ou telefone foi identificado no texto.', confirmButtonColor: '#3b82f6' })
  }
}

const displayItems = computed(() => {
  if (mode.value === 'email') return emails.value
  if (mode.value === 'phone') return phones.value
  return [...emails.value, ...phones.value]
})

async function copyAll() {
  if (!displayItems.value.length) return
  await navigator.clipboard.writeText(displayItems.value.join('\n'))
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function clear() {
  inputText.value = ''
  emails.value = []
  phones.value = []
}

function copyItem(item: string) {
  navigator.clipboard.writeText(item)
}
</script>

<template>
  <ToolShell

    title="Extrator de E-mails"

    description="Extraia todos os endereços de e-mail de um texto ou conteúdo colado."

    icon="fa-envelope-open-text"

    icon-gradient="from-blue-500 to-indigo-600"

    orb-color="blue"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <!-- Header -->

    <div class="max-w-2xl mx-auto space-y-4">
      <!-- Input -->
      <div class="glass-panel p-5 space-y-3">
        <label class="text-blue-200 text-sm font-medium">Cole seu texto aqui</label>
        <textarea
          v-model="inputText"
          rows="8"
          placeholder="Cole aqui qualquer texto com e-mails ou telefones..."
          class="w-full input-aurora"
        />
        <div class="flex gap-2 justify-end">
          <button @click="clear"
            class="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-blue-200 hover:bg-white/5 text-sm transition-colors">
            <Icon icon="mdi:trash-can-outline" class="w-4 h-4" />
            Limpar
          </button>
          <button @click="extract"
            class="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors">
            <Icon icon="mdi:magnify" class="w-4 h-4" />
            Extrair
          </button>
        </div>
      </div>

      <!-- Results -->
      <div v-if="emails.length > 0 || phones.length > 0" class="glass-panel p-5 space-y-4">
        <!-- Filter Tabs -->
        <div class="flex gap-2 items-center justify-between">
          <div class="flex gap-1 bg-[#0a1628] rounded-lg p-1">
            <button v-for="tab in [
              { val: 'both', label: 'Todos', count: emails.length + phones.length },
              { val: 'email', label: 'E-mails', count: emails.length },
              { val: 'phone', label: 'Telefones', count: phones.length },
            ]" :key="tab.val"
              @click="mode = tab.val as any"
              :class="mode === tab.val ? 'bg-blue-600 text-white' : 'text-blue-300 hover:text-white'"
              class="px-3 py-1 rounded text-xs font-medium transition-colors"
            >
              {{ tab.label }} ({{ tab.count }})
            </button>
          </div>
          <button @click="copyAll"
            :class="copied ? 'bg-emerald-700' : 'bg-white/10 hover:bg-white/20'"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors">
            <Icon :icon="copied ? 'mdi:check' : 'mdi:content-copy'" class="w-3.5 h-3.5" />
            {{ copied ? 'Copiado' : 'Copiar Todos' }}
          </button>
        </div>

        <!-- Items -->
        <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
          <div v-for="(item, i) in displayItems" :key="i"
            class="flex items-center justify-between bg-[#0a1628] border border-white/10 rounded-lg px-3 py-2">
            <div class="flex items-center gap-2">
              <Icon :icon="item.includes('@') ? 'mdi:email-outline' : 'mdi:phone-outline'"
                class="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span class="text-sm text-blue-100 font-mono">{{ item }}</span>
            </div>
            <button @click="copyItem(item)" class="text-blue-400/60 hover:text-blue-300 ml-2">
              <Icon icon="mdi:content-copy" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  


  </ToolShell></template>