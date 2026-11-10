<script setup>
const emit = defineEmits(['add-snippet'])

const snippets = [
    { id: 'escreva', label: 'escreva', desc: 'Saída de dados', color: 'text-blue-400', border: 'border-blue-500' },
    { id: 'leia', label: 'leia', desc: 'Entrada de dados', color: 'text-green-400', border: 'border-green-500' },
    { id: 'se', label: 'se ... entao', desc: 'Condicional', color: 'text-yellow-400', border: 'border-yellow-500' },
    { id: 'enquanto', label: 'enquanto', desc: 'Laço de repetição', color: 'text-purple-400', border: 'border-purple-500' },
    { id: 'var', label: 'var', desc: 'Declarar variável', color: 'text-pink-400', border: 'border-pink-500' },
]

const add = (id) => {
    emit('add-snippet', id)
}
</script>

<template>
    <aside class="bg-dark-panel w-full lg:w-64 border-r border-slate-700 flex flex-col z-10">
        <div class="p-3 border-b border-slate-700 font-semibold text-sm uppercase tracking-wider text-slate-400 flex justify-between items-center">
            <span>Ferramentas</span>
            <i class="fa-solid fa-box w-4"></i>
        </div>

        <div class="flex-1 overflow-y-auto p-3 space-y-2">
            <p class="text-xs text-slate-500 mb-2">Clique para adicionar (Modo Blocos)</p>

            <button v-for="item in snippets" :key="item.id" @click="add(item.id)"
                class="w-full text-left px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded border-l-4 text-sm transition group"
                :class="[item.border]"
            >
                <span class="font-mono font-bold" :class="[item.color]">{{ item.label }}</span>
                <span class="text-xs text-slate-500 block group-hover:text-slate-300">{{ item.desc }}</span>
            </button>
        </div>

        <div class="p-4 bg-brand-900/50 m-2 rounded border border-brand-500/30">
            <div class="flex items-start gap-2">
                <i class="fa-solid fa-lightbulb text-yellow-400 flex-shrink-0 mt-0.5"></i>
                <p class="text-xs text-brand-100">
                    <slot name="tip">Dica: Use 'escreva' para mostrar mensagens.</slot>
                </p>
            </div>
        </div>
    </aside>
</template>
