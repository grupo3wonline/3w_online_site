<script setup lang="ts">
const currentYear = new Date().getFullYear()

const toolLinks = [
  { to: '/calculadora-aluguel', label: 'Calculadora de Aluguel', icon: 'fa-calculator' },
  { to: '/calculadora-financiamento', label: 'Simulador de Financiamento', icon: 'fa-piggy-bank' },
  { to: '/calculadora-construcao', label: 'Calculadora de Construção', icon: 'fa-hammer' },
  { to: '/comparador', label: 'Comparador Inteligente', icon: 'fa-scale-balanced' }
]

const companyLinks = [
  { to: '/#sobre', label: 'Sobre Nós' },
  { to: '/#contato', label: 'Contato' },
  { to: '/#ferramentas', label: 'Ferramentas' },
  { to: '/#faq', label: 'Perguntas Frequentes' }
]

const legalLinks = [
  { to: '/termos-de-uso', label: 'Termos de Uso', icon: 'fa-file-lines' },
  { to: '/politica-de-privacidade', label: 'Política de Privacidade', icon: 'fa-shield-halved' }
]
</script>

<template>
  <footer class="bg-slate-900 dark:bg-slate-950 text-gray-300">
    <!-- Main Footer -->
    <div class="container py-12">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <!-- Brand -->
        <div class="space-y-4">
          <router-link to="/" class="flex items-center gap-2.5 group">
            <div class="h-10 w-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-calculator text-white"></i>
            </div>
            <span class="font-bold text-lg text-white">Aluguel Fácil</span>
          </router-link>
          <p class="text-sm text-gray-400 leading-relaxed">
            Ferramentas inteligentes para decisões imobiliárias assertivas.
            Calcule aluguel, simule financiamentos e compare cenários com precisão profissional.
          </p>
          <div class="flex items-center gap-2 text-sm text-gray-400">
            <i class="fa-solid fa-shield-halved text-primary-400"></i>
            <span>100% Gratuito e Seguro</span>
          </div>
        </div>

        <!-- Tools -->
        <div>
          <h3 class="font-semibold text-white mb-4">Ferramentas</h3>
          <ul class="space-y-3">
            <li v-for="link in toolLinks" :key="link.to">
              <router-link
                :to="link.to"
                class="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors group"
              >
                <i :class="['fa-solid', link.icon, 'w-4 text-center group-hover:scale-110 transition-transform']"></i>
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="font-semibold text-white mb-4">Empresa</h3>
          <ul class="space-y-3">
            <li v-for="link in companyLinks" :key="link.to">
              <router-link :to="link.to" class="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                {{ link.label }}
              </router-link>
            </li>
            <li>
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <i class="fa-solid fa-globe w-4 text-center"></i>
                3W Online
                <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="font-semibold text-white mb-4">Legal</h3>
          <ul class="space-y-3">
            <li v-for="link in legalLinks" :key="link.to">
              <router-link
                :to="link.to"
                class="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <i :class="['fa-solid', link.icon, 'w-4 text-center']"></i>
                {{ link.label }}
              </router-link>
            </li>
          </ul>

          <h3 class="font-semibold text-white mt-6 mb-3">Contato</h3>
          <div class="space-y-2">
            <a
              href="https://wa.me/5541996924829"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors"
            >
              <i class="fa-brands fa-whatsapp w-4 text-center"></i>
              (41) 99692-4829
            </a>
            <a
              href="mailto:contato@3wonline.com.br"
              class="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
            >
              <i class="fa-solid fa-envelope w-4 text-center"></i>
              contato@3wonline.com.br
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="border-t border-slate-800">
      <div class="container py-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-sm text-gray-500 text-center md:text-left">
            © {{ currentYear }} Calculadora Aluguel Fácil. Todos os direitos reservados.
          </p>

          <div class="flex items-center gap-1 text-sm text-gray-500 flex-wrap justify-center">
            <span>Sistema desenvolvido pelo desenvolvedor</span>
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="font-semibold text-primary-400 hover:underline"
            >
              HOTWYL | WILLFROMBRASIL
            </a>
            <span>|</span>
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="font-semibold text-primary-400 hover:underline"
            >
              Grupo 3W Online
              <i class="fa-solid fa-arrow-up-right-from-square text-xs ml-0.5"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
