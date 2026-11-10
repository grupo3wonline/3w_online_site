<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { alerta } from '@/lib/alerta'

const aberto = ref(false)

function mostrarAjuda() {
  aberto.value = false
  alerta({
    title: '<span style="font-size:18px">Central de Ajuda</span>',
    html: `
      <div style="text-align:left; font-size:14px; line-height:1.7;">
        <p><strong>🧮 Calculadora de Produtos:</strong><br/>
        Informe custos de matéria-prima, operação, tempo de produção e margem de lucro desejada para obter o preço ideal.</p>
        <br/>
        <p><strong>🛠️ Calculadora de Serviços:</strong><br/>
        Defina horas estimadas, valor/hora, complexidade e urgência para calcular o preço do serviço.</p>
        <br/>
        <p><strong>💡 Dicas rápidas:</strong></p>
        <ul style="padding-left:18px; list-style:disc;">
          <li>Considere todos os custos fixos e variáveis</li>
          <li>Pesquise preços da concorrência</li>
          <li>Ajuste a margem conforme o posicionamento</li>
          <li>Revise seus preços periodicamente</li>
        </ul>
      </div>
    `,
    confirmButtonText: 'Entendi!',
    showCloseButton: true,
  })
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    <transition name="ajuda">
      <div
        v-if="aberto"
        class="glass-card p-4 mb-2 w-64 shadow-2xl"
      >
        <h3 class="text-sm font-semibold txt-forte mb-3 flex items-center gap-2">
          <Icon
            icon="fa6-solid:life-ring"
            class="text-accent-500"
          />
          Precisa de ajuda?
        </h3>
        <div class="space-y-2">
          <button
            type="button"
            class="w-full text-left text-xs txt-suave hover:text-primary-500 hover:bg-primary-500/10 p-2 rounded-lg transition-colors flex items-center gap-2"
            @click="mostrarAjuda"
          >
            <Icon
              icon="fa6-solid:book"
              class="text-primary-500"
            />
            Como usar a calculadora
          </button>
          <RouterLink
            to="/contato"
            class="w-full text-left text-xs txt-suave hover:text-primary-500 hover:bg-primary-500/10 p-2 rounded-lg transition-colors flex items-center gap-2"
            @click="aberto = false"
          >
            <Icon
              icon="fa6-solid:envelope"
              class="text-primary-500"
            />
            Fale conosco
          </RouterLink>
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full text-left text-xs txt-suave hover:text-primary-500 hover:bg-primary-500/10 p-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Icon
              icon="fa6-solid:globe"
              class="text-accent-500"
            />
            Conheça a 3w Online
          </a>
        </div>
      </div>
    </transition>
    <button
      type="button"
      class="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-glow hover:shadow-xl transition-all duration-300 hover:scale-110"
      :aria-label="aberto ? 'Fechar ajuda' : 'Abrir ajuda'"
      data-tooltip="Precisa de ajuda?"
      @click="aberto = !aberto"
    >
      <Icon
        :icon="aberto ? 'fa6-solid:xmark' : 'fa6-solid:question'"
        class="text-white text-xl"
      />
    </button>
  </div>
</template>

<style scoped>
.ajuda-enter-active,
.ajuda-leave-active {
  transition: all 0.25s ease;
}
.ajuda-enter-from,
.ajuda-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(8px);
}
</style>
