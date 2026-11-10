<script setup lang="ts">
const year = new Date().getFullYear()

function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent('open-cookie-preferences'))
}

const links = {
  navegacao: [
    { label: 'Início', path: '/' },
    { label: 'Calculadora', path: '/#calculadora' },
    { label: 'Como Funciona', path: '/#sobre' },
  ],
  empresa: [
    { label: 'Sobre', path: '/#sobre' },
    { label: 'Contato', path: '/#contato' },
  ],
  legal: [
    { label: 'Termos de Uso', path: '/termos-de-uso' },
    { label: 'Política de Privacidade', path: '/politica-de-privacidade' },
  ],
}
</script>

<template>
  <footer class="bg-card border-t border-border mt-auto">
    <div class="container-max section-padding">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <router-link to="/" class="flex items-center space-x-2 mb-4">
            <i class="fa-solid fa-calculator text-2xl text-primary"></i>
            <span class="text-xl font-bold text-gradient">EventCalc</span>
          </router-link>
          <p class="text-muted-foreground text-sm leading-relaxed mb-4">
            Calculadora profissional para planejamento financeiro de eventos corporativos.
            Resultados precisos e confiáveis em segundos.
          </p>
          <div class="flex items-center space-x-4">
            <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-primary transition-colors" aria-label="Site Grupo 3W Online">
              <i class="fa-solid fa-globe text-lg"></i>
            </a>
            <a href="https://www.instagram.com/3wonline" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
              <i class="fa-brands fa-instagram text-lg"></i>
            </a>
            <a href="https://www.linkedin.com/company/3wonline" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <i class="fa-brands fa-linkedin text-lg"></i>
            </a>
          </div>
        </div>

        <!-- Navegação -->
        <div>
          <h3 class="font-semibold text-foreground mb-4">Navegação</h3>
          <ul class="space-y-3">
            <li v-for="link in links.navegacao" :key="link.path">
              <router-link :to="link.path" class="text-muted-foreground hover:text-primary transition-colors text-sm">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Empresa -->
        <div>
          <h3 class="font-semibold text-foreground mb-4">Empresa</h3>
          <ul class="space-y-3">
            <li v-for="link in links.empresa" :key="link.path">
              <router-link :to="link.path" class="text-muted-foreground hover:text-primary transition-colors text-sm">
                {{ link.label }}
              </router-link>
            </li>
            <li>
              <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-1">
                Grupo 3W Online <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="font-semibold text-foreground mb-4">Legal</h3>
          <ul class="space-y-3">
            <li v-for="link in links.legal" :key="link.path">
              <router-link :to="link.path" class="text-muted-foreground hover:text-primary transition-colors text-sm">
                {{ link.label }}
              </router-link>
            </li>
            <li>
              <button
                type="button"
                class="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-1"
                @click="openCookiePreferences"
              >
                <i class="fa-solid fa-cookie-bite text-xs"></i>
                Preferências de Cookies
              </button>
            </li>
          </ul>
          <div class="mt-6 p-4 bg-muted/50 rounded-lg">
            <p class="text-xs text-muted-foreground">
              <i class="fa-solid fa-shield-halved mr-1"></i>
              Em conformidade com LGPD, GDPR, CCPA e POPIA
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-border">
      <div class="container-max py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-muted-foreground text-center md:text-left">
            &copy; {{ year }} EventCalc. Todos os direitos reservados.
          </p>
          <p class="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Desenvolvido com</span>
            <i class="fa-solid fa-heart text-red-500"></i>
            <span>por</span>
            <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="font-semibold text-primary hover:underline">
              HOTWYL | WILLFROMBRASIL
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
