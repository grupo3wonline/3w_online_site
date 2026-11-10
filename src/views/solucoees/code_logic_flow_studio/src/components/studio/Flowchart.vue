<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import mermaid from 'mermaid'
import { generateMermaidCode } from '@/utils/converter'

const props = defineProps(['code'])
const mermaidRef = ref(null)
const error = ref(null)

onMounted(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'default', securityLevel: 'loose' })
    renderChart()
})

const renderChart = async () => {
    if (!mermaidRef.value) return
    
    // Clear previous
    mermaidRef.value.removeAttribute('data-processed')
    
    // Generate Definition
    const definition = generateMermaidCode(props.code)
    
    try {
        const { svg } = await mermaid.render('mermaidSvg', definition)
        mermaidRef.value.innerHTML = svg
        error.value = null
    } catch (e) {
        // Mermaid throws visible errors sometimes, handle gracefully if possible
        // But mermaid.render is async in v10+
        // If fail, we can show a generic message or just let mermaid handle it
        // However, mermaid.render creates an SVG id 'mermaidSvg' which might conflict
        // Using a unique ID is better
        try {
             const id = `mermaid-${Date.now()}`
             mermaidRef.value.innerHTML = definition;
             await mermaid.run({ nodes: [mermaidRef.value] });
        } catch(err) {
             console.error(err);
             error.value = "Erro ao renderizar fluxograma: " + err.message;
        }
    }
}

watch(() => props.code, () => {
    renderChart()
})
</script>

<template>
    <div class="flex-1 bg-white overflow-auto flex flex-col items-center justify-center p-8 relative">
        <p class="absolute top-4 left-4 text-gray-400 text-xs font-bold uppercase">Gerado Automaticamente</p>
        <div ref="mermaidRef" class="mermaid w-full h-full flex justify-center items-start">
            <!-- Mermaid Render Here -->
        </div>
        <div v-if="error" class="absolute bottom-4 left-4 text-red-500 text-xs bg-red-100 p-2 rounded">
            {{ error }}
        </div>
    </div>
</template>
