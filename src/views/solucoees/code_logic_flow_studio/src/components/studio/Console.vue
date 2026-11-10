<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps(['logs'])
const consoleRef = ref(null)

// Auto scroll on new logs
watch(() => props.logs.length, () => {
    nextTick(() => {
        if (consoleRef.value) {
            consoleRef.value.scrollTop = consoleRef.value.scrollHeight
        }
    })
})

const emit = defineEmits(['clear'])
</script>

<template>
    <div class="h-1/3 min-h-[150px] bg-black border-t border-slate-700 flex flex-col">
        <div class="bg-slate-800 px-4 py-1 text-xs text-slate-400 flex justify-between items-center select-none">
            <span class="font-bold flex items-center gap-2">
                <i class="fa-solid fa-terminal text-xs"></i> CONSOLE
            </span>
            <button @click="$emit('clear')" class="hover:text-white transition">Limpar</button>
        </div>
        <div ref="consoleRef" class="flex-1 p-4 font-mono text-sm text-green-400 overflow-y-auto space-y-1">
            <div v-if="logs.length === 0" class="text-gray-500 italic">Aguardando execução...</div>
            <div v-for="(log, index) in logs" :key="index" :class="{
                'text-red-500': log.type === 'error',
                'text-blue-400 italic': log.type === 'system',
                'text-yellow-300': log.type === 'warn'
            }">
                > {{ log.message }}
            </div>
        </div>
    </div>
</template>
