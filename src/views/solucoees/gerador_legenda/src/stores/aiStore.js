import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAiStore = defineStore('ai', () => {
    const geminiKey = ref(localStorage.getItem('gemini_key') || '')
    const groqKey = ref(localStorage.getItem('groq_key') || '')
    const openRouterKey = ref(localStorage.getItem('openrouter_key') || '')

    const setGeminiKey = (key) => {
        geminiKey.value = key
        localStorage.setItem('gemini_key', key)
    }

    const setGroqKey = (key) => {
        groqKey.value = key
        localStorage.setItem('groq_key', key)
    }

    const setOpenRouterKey = (key) => {
        openRouterKey.value = key
        localStorage.setItem('openrouter_key', key)
    }

    return {
        geminiKey,
        groqKey,
        openRouterKey,
        setGeminiKey,
        setGroqKey,
        setOpenRouterKey
    }
})
