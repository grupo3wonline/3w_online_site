<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import CalculadoraProduto from './CalculadoraProduto.vue'
import CalculadoraServico from './CalculadoraServico.vue'

type Aba = 'produtos' | 'servicos'
const aba = ref<Aba>('produtos')
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <!-- Tabs -->
    <div
      class="flex gap-2 mb-8 p-1 rounded-2xl border"
      style="background: var(--glass-bg); border-color: var(--glass-borda)"
      role="tablist"
      aria-label="Tipo de cálculo"
    >
      <button
        type="button"
        role="tab"
        :aria-selected="aba === 'produtos'"
        class="flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
        :class="
          aba === 'produtos'
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow'
            : 'txt-suave hover:text-primary-500 hover:bg-primary-500/5'
        "
        @click="aba = 'produtos'"
      >
        <Icon icon="fa6-solid:box" />
        Produtos Físicos
      </button>
      <button
        type="button"
        role="tab"
        :aria-selected="aba === 'servicos'"
        class="flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
        :class="
          aba === 'servicos'
            ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-glow-accent'
            : 'txt-suave hover:text-accent-500 hover:bg-accent-500/5'
        "
        @click="aba = 'servicos'"
      >
        <Icon icon="fa6-solid:laptop-code" />
        Serviços Digitais
      </button>
    </div>

    <!-- Conteúdo -->
    <div class="glass-card p-6 md:p-8">
      <div class="flex items-center gap-3 mb-6">
        <div
          class="w-10 h-10 rounded-xl flex items-center justify-center"
          :class="aba === 'produtos' ? 'bg-primary-500/20' : 'bg-accent-500/20'"
        >
          <Icon
            :icon="aba === 'produtos' ? 'fa6-solid:box' : 'fa6-solid:laptop-code'"
            :class="aba === 'produtos' ? 'text-primary-500' : 'text-accent-500'"
          />
        </div>
        <div>
          <h3 class="text-lg font-bold txt-forte">
            {{ aba === 'produtos' ? 'Calculadora para Produtos' : 'Calculadora para Serviços' }}
          </h3>
          <p class="text-xs txt-fraco">
            {{
              aba === 'produtos'
                ? 'Calcule o preço ideal considerando custos de produção, operação e margem'
                : 'Defina preços baseados em tempo, complexidade e valor agregado'
            }}
          </p>
        </div>
      </div>

      <CalculadoraProduto v-if="aba === 'produtos'" />
      <CalculadoraServico v-else />
    </div>

    <!-- Instruções -->
    <div class="mt-8 glass-card p-6">
      <h3 class="text-lg font-semibold txt-forte mb-4 flex items-center gap-2">
        <Icon
          icon="fa6-solid:book-open"
          class="text-primary-500"
        />
        Instruções de Uso
      </h3>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h4 class="text-sm font-semibold text-primary-500 mb-2 flex items-center gap-2">
            <Icon icon="fa6-solid:box" />
            Para Produtos
          </h4>
          <ol class="space-y-2 text-sm txt-suave list-decimal list-inside">
            <li>Insira o custo de matéria-prima por unidade</li>
            <li>Adicione custos operacionais (embalagem, transporte, etc.)</li>
            <li>Informe o tempo de produção e valor da hora</li>
            <li>Defina a margem de lucro e impostos</li>
            <li>Clique em "Calcular" e analise os resultados</li>
          </ol>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-accent-500 mb-2 flex items-center gap-2">
            <Icon icon="fa6-solid:laptop-code" />
            Para Serviços
          </h4>
          <ol class="space-y-2 text-sm txt-suave list-decimal list-inside">
            <li>Estime o total de horas do projeto</li>
            <li>Defina seu valor base por hora</li>
            <li>Adicione custos operacionais (software, etc.)</li>
            <li>Selecione complexidade e urgência</li>
            <li>Clique em "Calcular" e escolha a forma de cobrança</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
