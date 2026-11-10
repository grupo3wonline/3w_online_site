<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { useAiStore, AI_PROVIDERS } from '@/stores/ai'
import { getMultiProviderResponse } from '@/services/aiService'
import type { ChatMessage } from '@/types'

const aiStore = useAiStore()
const { provider, apiKeys } = storeToRefs(aiStore)

const isOpen = ref(false)
const showSettings = ref(false)
const input = ref('')
const isLoading = ref(false)
const messages = ref<ChatMessage[]>([
  {
    role: 'model',
    text: 'Olá! Sou seu Tutor de programação. Configure sua chave de API nas configurações (⚙️) para começar.',
  },
])
const listRef = ref<HTMLElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (listRef.value) listRef.value.scrollTop = listRef.value.scrollHeight
  })
}

watch(messages, scrollToBottom, { deep: true })

async function send() {
  const text = input.value.trim()
  if (!text || isLoading.value) return

  const key = aiStore.currentKey()
  if (!key) {
    messages.value.push({
      role: 'model',
      text: `⚠️ Configure a chave de API para ${AI_PROVIDERS.find((p) => p.id === provider.value)?.name} nas configurações.`,
    })
    showSettings.value = true
    return
  }

  messages.value.push({ role: 'user', text })
  input.value = ''
  isLoading.value = true

  const reply = await getMultiProviderResponse(provider.value, key, text)
  messages.value.push({ role: 'model', text: reply })
  isLoading.value = false
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[9980] flex flex-col items-end">
    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0 translate-y-4"
      leave-active-class="transition duration-150"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="isOpen"
        class="mb-4 flex h-[520px] w-[min(90vw,22rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between bg-gradient-to-r from-slate-800 to-slate-900 p-4 text-white"
        >
          <div class="flex items-center gap-2 font-bold">
            <Icon
              icon="lucide:bot"
              class="h-5 w-5 text-brand-400"
            />
            Tutor IA
          </div>
          <div class="flex gap-1">
            <button
              type="button"
              class="rounded p-1.5 text-slate-300 hover:bg-white/10 hover:text-white"
              :class="{ 'bg-white/20 text-white': showSettings }"
              title="Configurações de IA"
              aria-label="Configurações"
              @click="showSettings = !showSettings"
            >
              <Icon
                icon="lucide:settings"
                class="h-4 w-4"
              />
            </button>
            <button
              type="button"
              class="rounded p-1.5 text-slate-300 hover:bg-white/10 hover:text-white"
              aria-label="Fechar tutor"
              @click="isOpen = false"
            >
              <Icon
                icon="lucide:x"
                class="h-4 w-4"
              />
            </button>
          </div>
        </div>

        <!-- Settings -->
        <div
          v-if="showSettings"
          class="flex-1 overflow-y-auto bg-slate-50 p-4 dark:bg-slate-800"
        >
          <h3 class="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
            Configuração de IA
          </h3>
          <label class="mb-1 block text-xs font-bold text-slate-500">Provedor</label>
          <select
            v-model="provider"
            autocomplete="off"
            class="w-full rounded border border-slate-300 bg-white px-2 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          >
            <option
              v-for="p in AI_PROVIDERS"
              :key="p.id"
              :value="p.id"
            >
              {{ p.name }}
            </option>
          </select>

          <div class="mt-4 space-y-3 border-t border-slate-200 pt-4 dark:border-slate-700">
            <div
              v-for="p in AI_PROVIDERS"
              :key="p.id"
              class="rounded border border-slate-200 p-2 dark:border-slate-700"
            >
              <div class="mb-1 flex justify-between text-xs">
                <span class="font-semibold">{{ p.name }}</span>
                <span
                  v-if="provider === p.id"
                  class="font-bold text-brand-600"
                >Ativo</span>
              </div>
              <input
                v-model="apiKeys[p.id]"
                type="password"
                autocomplete="off"
                placeholder="Cole sua chave de API aqui"
                class="w-full rounded border border-slate-300 px-2 py-1.5 text-xs dark:border-slate-600 dark:bg-slate-900"
              >
            </div>
          </div>
          <p class="mt-3 rounded bg-amber-50 p-2 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            <Icon
              icon="lucide:lock"
              class="mr-1 inline h-3 w-3"
            />
            Suas chaves ficam apenas no seu navegador e são enviadas diretamente às APIs oficiais.
          </p>
          <button
            type="button"
            class="btn-primary mt-3 w-full"
            @click="showSettings = false"
          >
            Salvar e voltar
          </button>
        </div>

        <!-- Chat -->
        <template v-else>
          <div
            ref="listRef"
            class="flex flex-1 flex-col gap-3 overflow-y-auto bg-slate-100 p-4 dark:bg-slate-950"
          >
            <div
              v-for="(m, i) in messages"
              :key="i"
              class="max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm"
              :class="
                m.role === 'user'
                  ? 'self-end rounded-br-none bg-brand-600 text-white'
                  : 'self-start rounded-bl-none border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
              "
            >
              {{ m.text }}
            </div>
            <div
              v-if="isLoading"
              class="self-start rounded-2xl rounded-bl-none border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
            >
              <span class="flex gap-1">
                <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0.1s]" />
                <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0.2s]" />
              </span>
            </div>
          </div>
          <form
            class="flex gap-2 border-t border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
            autocomplete="off"
            @submit.prevent="send"
          >
            <input
              v-model="input"
              type="text"
              autocomplete="off"
              placeholder="Digite sua dúvida..."
              class="flex-1 rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm focus:border-brand-500 dark:border-slate-600 dark:bg-slate-800"
            >
            <button
              type="submit"
              :disabled="isLoading"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white transition hover:bg-brand-700 disabled:bg-slate-400"
              aria-label="Enviar"
            >
              <Icon
                icon="lucide:send"
                class="h-4 w-4"
              />
            </button>
          </form>
        </template>
      </div>
    </Transition>

    <button
      type="button"
      class="flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-700 bg-gradient-to-br from-slate-800 to-black text-white shadow-xl transition hover:scale-110"
      :aria-label="isOpen ? 'Fechar tutor de IA' : 'Abrir tutor de IA'"
      @click="isOpen = !isOpen"
    >
      <Icon
        icon="lucide:bot"
        class="h-7 w-7 text-brand-400"
      />
    </button>
  </div>
</template>
