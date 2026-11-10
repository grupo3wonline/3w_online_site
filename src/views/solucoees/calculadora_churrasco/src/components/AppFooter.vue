<template>
  <footer class="bg-gradient-to-b from-bbq-brown to-bbq-brown/95 text-white print-hidden">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <div class="h-10 w-10 rounded-full bg-gradient-to-br from-bbq-orange to-bbq-red flex items-center justify-center">
              <i class="fa-solid fa-fire-burner text-white text-lg"></i>
            </div>
            <div>
              <span class="text-lg font-bold text-white">Calculadora</span>
              <span class="text-sm text-white/70 block -mt-1">de Churrasco</span>
            </div>
          </div>
          <p class="text-white/70 text-sm leading-relaxed">A ferramenta definitiva para planejar seu churrasco perfeito. Calcule carnes, bebidas e acompanhamentos com precisao.</p>
          <div class="flex gap-3">
            <a v-for="social in socials" :key="social.icon" :href="social.url" target="_blank" rel="noopener noreferrer" class="h-9 w-9 rounded-full bg-white/10 hover:bg-bbq-orange/80 flex items-center justify-center transition-colors" :aria-label="social.label">
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Links Rapidos</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.path">
              <router-link :to="link.path" class="text-white/70 hover:text-bbq-orange transition-colors flex items-center gap-2 text-sm">
                <i class="fa-solid fa-chevron-right text-xs"></i>{{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Legal</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/privacidade" class="text-white/70 hover:text-bbq-orange transition-colors flex items-center gap-2 text-sm">
                <i class="fa-solid fa-chevron-right text-xs"></i>Política de Privacidade
              </router-link>
            </li>
            <li>
              <router-link to="/privacidade" class="text-white/70 hover:text-bbq-orange transition-colors flex items-center gap-2 text-sm">
                <i class="fa-solid fa-chevron-right text-xs"></i>LGPD, GDPR, CCPA e POPIA
              </router-link>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Contato</h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-3 text-white/70 text-sm"><i class="fa-brands fa-whatsapp text-bbq-orange mt-0.5"></i><a href="https://wa.me/5541996924829" target="_blank" rel="noopener noreferrer" class="hover:text-bbq-orange transition-colors">(41) 99692-4829</a></li>
            <li class="flex items-start gap-3 text-white/70 text-sm"><i class="fa-solid fa-envelope text-bbq-orange mt-0.5"></i><a href="mailto:contato@3wonline.com.br" class="hover:text-bbq-orange transition-colors">contato@3wonline.com.br</a></li>
            <li class="flex items-start gap-3 text-white/70 text-sm"><i class="fa-solid fa-globe text-bbq-orange mt-0.5"></i><a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="hover:text-bbq-orange transition-colors">www.3wonline.com.br</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="border-t border-white/10">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-white/60 text-sm text-center md:text-left">&copy; {{ currentYear }} Calculadora de Churrasco. Todos os direitos reservados.</p>
          <div class="flex items-center gap-2 text-white/60 text-sm">
            <span>Sistema desenvolvido por</span>
            <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="text-bbq-orange hover:text-bbq-orange/80 font-semibold transition-colors">
              HOTWYL | WILLFROMBRASIL <i class="fa-solid fa-arrow-up-right-from-square text-xs ml-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
const quickLinks = computed(() => [
  { path: '/', label: t('nav.inicio') },
  { path: '/calculadora', label: t('nav.ferramenta') },
  { path: '/orcamento', label: t('nav.orcamento') },
  { path: '/privacidade', label: t('nav.privacidade') },
])
const socials = [
  { icon: 'fa-brands fa-whatsapp', url: 'https://wa.me/5541996924829', label: 'WhatsApp' },
  { icon: 'fa-solid fa-envelope', url: 'mailto:contato@3wonline.com.br', label: 'E-mail' },
  { icon: 'fa-solid fa-globe', url: 'https://www.3wonline.com.br', label: 'Site 3W Online' },
]
</script>
