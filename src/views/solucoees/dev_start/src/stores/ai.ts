import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { AIProvider } from '@/types'

const PROVIDER_KEY = 'devstart_provider'
const KEYS_KEY = 'devstart_apikeys'

export const AI_PROVIDERS: { id: AIProvider; name: string; model: string }[] = [
  { id: 'gemini', name: 'Google Gemini', model: 'gemini-2.0-flash' },
  { id: 'groq', name: 'Groq Cloud', model: 'llama-3.3-70b-versatile' },
  { id: 'openrouter', name: 'OpenRouter', model: 'google/gemma-2-9b-it:free' },
]

function loadKeys(): Record<AIProvider, string> {
  const empty = { gemini: '', groq: '', openrouter: '' }
  try {
    const raw = localStorage.getItem(KEYS_KEY)
    return raw ? { ...empty, ...JSON.parse(raw) } : empty
  } catch {
    return empty
  }
}

export const useAiStore = defineStore('ai', () => {
  const provider = ref<AIProvider>(
    (localStorage.getItem(PROVIDER_KEY) as AIProvider) || 'gemini',
  )
  const apiKeys = ref<Record<AIProvider, string>>(loadKeys())

  watch(provider, (value) => localStorage.setItem(PROVIDER_KEY, value))
  watch(apiKeys, (value) => localStorage.setItem(KEYS_KEY, JSON.stringify(value)), { deep: true })

  function currentKey() {
    return apiKeys.value[provider.value]
  }

  return { provider, apiKeys, currentKey }
})
