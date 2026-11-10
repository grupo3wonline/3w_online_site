<script setup lang="ts">
import { RouterLink } from 'vue-router'

const anoAtual = new Date().getFullYear()
</script>

<template>
  <footer id="footer-principal" class="bg-gray-950 dark:bg-gray-900 text-gray-300 pt-16 pb-6">
    <div class="container-app">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- Marca -->
        <div>
          <RouterLink to="/" class="flex items-center gap-2.5 mb-4">
            <div class="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
              <i class="fa-solid fa-calculator text-white text-sm"></i>
            </div>
            <span class="font-extrabold text-lg text-white">
              Calc<span class="text-accent-400">Tráfego</span>
            </span>
          </RouterLink>
          <p class="text-sm text-gray-400 leading-relaxed">
            A ferramenta definitiva para gestores de tráfego calcularem ROI e gerarem orçamentos profissionais.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Navegação</h3>
          <ul class="space-y-2.5">
            <li>
              <RouterLink to="/" class="text-sm text-gray-400 hover:text-white transition-colors">Início</RouterLink>
            </li>
            <li>
              <RouterLink to="/#sobre" class="text-sm text-gray-400 hover:text-white transition-colors">Sobre</RouterLink>
            </li>
            <li>
              <RouterLink to="/#servicos" class="text-sm text-gray-400 hover:text-white transition-colors">Serviços</RouterLink>
            </li>
            <li>
              <RouterLink to="/ferramenta" class="text-sm text-gray-400 hover:text-white transition-colors">Ferramenta</RouterLink>
            </li>
            <li>
              <RouterLink to="/#contato" class="text-sm text-gray-400 hover:text-white transition-colors">Contato</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Legal</h3>
          <ul class="space-y-2.5">
            <li>
              <RouterLink to="/termos-de-uso" class="text-sm text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/politica-de-privacidade" class="text-sm text-gray-400 hover:text-white transition-colors">
                Política de Privacidade
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- CTA Desenvolvedora -->
        <div>
          <h3 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Desenvolvido por</h3>
          <p class="text-sm text-gray-400 mb-4 leading-relaxed">
            <strong class="text-white">Grupo 3W Online</strong> — Sites e sistemas personalizados sob demanda.
          </p>
          <p class="text-xs text-gray-500 mb-4">
            Sistema desenvolvido por HOTWYL | WILLFROMBRASIL
          </p>
          <a
            id="cta-footer-3wonline"
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary btn-sm"
          >
            <i class="fa-solid fa-globe"></i>
            Conheça a 3W Online
          </a>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-gray-500">
          &copy; {{ anoAtual }} Calculadora de Campanha de Tráfego — Grupo 3W Online. Todos os direitos reservados.
        </p>
        <div class="flex items-center gap-4">
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-500 hover:text-white transition-colors"
            aria-label="Site 3W Online"
          >
            <i class="fa-solid fa-globe text-lg"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
