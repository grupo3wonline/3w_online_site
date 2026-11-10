<script setup>
import { ref, computed, nextTick } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const textarea = ref(null)
const scrollTop = ref(0) // Sync scroll

const code = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

const lines = computed(() => {
    return code.value.split('\n').length
})

const handleScroll = (e) => {
    scrollTop.value = e.target.scrollTop
}

const insertText = (text, offset = 0) => {
    const el = textarea.value
    if (!el) return
    
    const start = el.selectionStart
    const end = el.selectionEnd
    const val = el.value
    
    const before = val.substring(0, start)
    const after = val.substring(end)
    
    code.value = before + text + after
    
    nextTick(() => {
        el.focus()
        el.setSelectionRange(start + text.length + offset, start + text.length + offset)
    })
}

defineExpose({ insertText })

// Watch for changes to update line numbers if necessary - handled by computed
</script>

<template>
    <div class="flex-1 relative flex bg-dark-editor overflow-hidden font-mono text-sm">
        <!-- Line Numbers -->
        <div class="w-10 pt-4 bg-dark-panel text-right text-slate-500 border-r border-slate-700 select-none overflow-hidden"
            :style="{ scrollTop: scrollTop + 'px' }">
            <div :style="{ marginTop: -scrollTop + 'px' }">
                <div v-for="n in lines" :key="n" class="pr-2">{{ n }}</div>
            </div>
        </div>
        
        <!-- Textarea -->
        <textarea 
            ref="textarea"
            v-model="code"
            @scroll="handleScroll"
            class="flex-1 p-4 bg-transparent text-gray-300 border-none resize-none outline-none whitespace-pre overflow-auto focus:ring-0"
            spellcheck="false" 
            placeholder="// Digite seu algoritmo aqui..."
        ></textarea>
    </div>
</template>
