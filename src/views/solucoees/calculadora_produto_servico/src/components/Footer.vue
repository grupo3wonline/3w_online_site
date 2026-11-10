<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const anoAtual = new Date().getFullYear()

const navegacao = [
  { label: 'Início', to: '/' },
  { label: 'Sobre', to: '/', hash: '#sobre' },
  { label: 'Serviços', to: '/', hash: '#servicos' },
  { label: 'Calculadora', to: '/', hash: '#calculadora' },
  { label: 'Contato', to: '/contato' },
]
</script>

<template>
  <footer
    class="border-t mt-auto"
    style="border-color: var(--glass-borda)"
  >
    <!-- CTA -->
    <div class="bg-gradient-cta py-12 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <span
          class="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-white/15 rounded-full text-xs font-semibold text-white"
        >
          <Icon icon="fa6-solid:fire" /> Vagas limitadas neste mês
        </span>
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
          Precisa de um Site ou Sistema Personalizado?
        </h2>
        <p class="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
          O <strong>Grupo 3w Online</strong> desenvolve sites, sistemas e aplicações web sob medida
          para o seu negócio. Transforme suas ideias em soluções digitais de sucesso.
        </p>
        <a
          href="https://www.3wonline.com.br"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <Icon icon="fa6-solid:rocket" />
          Solicitar Orçamento Agora
          <Icon icon="fa6-solid:arrow-right" />
        </a>
      </div>
    </div>

    <!-- Conteúdo -->
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      style="background: var(--cor-fundo)"
    >
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Marca -->
        <div class="md:col-span-1">
          <RouterLink
            to="/"
            class="flex items-center gap-2.5 mb-4"
          >
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-glow"
            >
              <Icon
                icon="fa6-solid:calculator"
                class="text-white text-base"
              />
            </div>
            <span class="text-lg font-bold font-display txt-forte">
              Calc<span class="text-gradient">Preços</span>
            </span>
          </RouterLink>
          <p class="text-sm txt-suave leading-relaxed">
            Ferramenta gratuita e profissional para calcular preços ideais de produtos e serviços.
            Defina preços justos e competitivos.
          </p>
        </div>

        <!-- Navegação -->
        <div>
          <h3 class="text-sm font-semibold txt-forte uppercase tracking-wider mb-4">
            Navegação
          </h3>
          <ul class="space-y-2">
            <li
              v-for="item in navegacao"
              :key="item.label"
            >
              <RouterLink
                :to="item.hash ? { path: item.to, hash: item.hash } : item.to"
                class="text-sm txt-suave hover:text-primary-500 transition-colors duration-200"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-sm font-semibold txt-forte uppercase tracking-wider mb-4">
            Legal
          </h3>
          <ul class="space-y-2">
            <li>
              <RouterLink
                to="/termos-de-uso"
                class="text-sm txt-suave hover:text-primary-500 transition-colors duration-200"
              >
                Termos de Uso
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/politica-de-privacidade"
                class="text-sm txt-suave hover:text-primary-500 transition-colors duration-200"
              >
                Política de Privacidade
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Desenvolvedor -->
        <div>
          <h3 class="text-sm font-semibold txt-forte uppercase tracking-wider mb-4">
            Desenvolvido por
          </h3>
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-sm text-accent-500 hover:text-accent-400 transition-colors duration-200 font-medium"
          >
            <Icon icon="fa6-solid:globe" />
            Grupo 3w Online
            <Icon
              icon="fa6-solid:arrow-up-right-from-square"
              class="text-xs"
            />
          </a>
          <p class="text-xs txt-fraco mt-2">
            Sites e Sistemas Personalizados sob demanda
          </p>
        </div>
      </div>

      <!-- Rodapé inferior -->
      <div
        class="mt-10 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
        style="border-color: var(--glass-borda)"
      >
        <p class="text-xs txt-fraco text-center sm:text-left">
          © {{ anoAtual }}
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="txt-suave hover:text-primary-500 transition-colors"
          >
            Grupo 3w Online </a>. Todos os direitos reservados.
        </p>
        <p class="text-xs txt-fraco flex items-center gap-1.5">
          <Icon
            icon="fa6-solid:code"
            class="text-primary-500"
          />
          Sistema desenvolvido pelo desenvolvedor
          <span class="font-bold text-gradient">HOTWYL | WILLFROMBRASIL</span>
        </p>
      </div>
    </div>
  </footer>
</template>
