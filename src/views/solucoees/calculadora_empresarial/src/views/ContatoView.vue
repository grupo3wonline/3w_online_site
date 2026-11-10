<template>
  <div>
    <section class="relative py-16 lg:py-20 overflow-hidden">
      <div class="absolute inset-0 gradient-hero opacity-5"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <i class="fa-solid fa-envelope"></i>
            Fale Conosco
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Estamos prontos para
            <span class="gradient-text"> ajudar você</span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Tem dúvidas sobre nossas ferramentas ou precisa de um orçamento para seu projeto digital? Entre em contato pelos canais abaixo.
          </p>
        </div>
      </div>
    </section>

    <section class="py-12 lg:py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <a href="https://wa.me/5541996924829" target="_blank" rel="noopener noreferrer" class="card p-8 text-center hover:shadow-lg transition-shadow group">
              <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <i class="fa-brands fa-whatsapp text-3xl text-green-600 dark:text-green-400"></i>
              </div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">WhatsApp</h2>
              <p class="text-green-600 dark:text-green-400 font-medium text-lg mb-2">(41) 99692-4829</p>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Atendimento rápido e personalizado</p>
            </a>

            <a href="mailto:contato@3wonline.com.br" class="card p-8 text-center hover:shadow-lg transition-shadow group">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <i class="fa-solid fa-envelope text-3xl text-primary-600 dark:text-primary-400"></i>
              </div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">E-mail</h2>
              <p class="text-primary-600 dark:text-primary-400 font-medium text-lg mb-2">contato@3wonline.com.br</p>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Resposta em até 24h úteis</p>
            </a>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div class="card p-6">
              <h3 class="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2 mb-4">
                <i class="fa-solid fa-clock text-primary-600"></i> Horário de Atendimento
              </h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Segunda a Sexta</span><span class="text-gray-900 dark:text-white font-medium">09h às 18h</span></div>
                <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Sábados</span><span class="text-gray-900 dark:text-white font-medium">09h às 13h</span></div>
                <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Domingos e Feriados</span><span class="text-gray-900 dark:text-white font-medium">Fechado</span></div>
              </div>
            </div>

            <div class="card p-6">
              <h3 class="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2 mb-4">
                <i class="fa-solid fa-globe text-primary-600"></i> Site
              </h3>
              <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 font-medium hover:underline">www.3wonline.com.br</a>
              <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">Conheça nossos projetos e serviços</p>
            </div>

            <div class="card p-6">
              <h3 class="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2 mb-4">
                <i class="fa-solid fa-location-dot text-primary-600"></i> Localização
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Atendimento 100% online para todo o Brasil.</p>
            </div>
          </div>

          <div class="mt-8">
            <div class="card p-6">
              <h3 class="font-bold text-gray-900 dark:text-white text-lg mb-4">Siga-nos nas Redes</h3>
              <div class="flex gap-3">
                <a v-for="rede in redesSociais" :key="rede.label" :href="rede.url" target="_blank" rel="noopener noreferrer" class="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center hover:bg-primary-600 hover:text-white text-gray-600 dark:text-gray-300 transition-all" :aria-label="rede.label">
                  <i :class="rede.icon" class="text-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 gradient-hero">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-3xl mx-auto space-y-6">
          <h2 class="text-3xl lg:text-4xl font-bold text-white">Precisa de um site ou sistema personalizado?</h2>
          <p class="text-xl text-white/80">O Grupo 3W Online é especialista em desenvolver soluções digitais sob medida para sua empresa.</p>
          <div class="flex flex-wrap justify-center gap-4 pt-4">
            <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors">
              <i class="fa-solid fa-globe"></i> Visite Nosso Site
            </a>
            <a href="https://wa.me/5541996924829" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
              <i class="fa-brands fa-whatsapp"></i> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { SITE } from '@/config/site'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Contato',
  description:
    'Fale com o Grupo 3W Online pelo WhatsApp (41) 99692-4829 ou e-mail contato@3wonline.com.br. Desenvolvemos sites e sistemas personalizados sob demanda.',
  keywords: 'contato 3w online, whatsapp 3w online, desenvolvimento de sites, sistemas personalizados',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.company.name,
    url: SITE.company.url,
    email: SITE.company.email,
    telephone: '+5541996924829',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+5541996924829',
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: 'Portuguese'
    }
  }
})

const redesSociais = [
  { icon: 'fa-brands fa-whatsapp', url: SITE.social.whatsapp, label: 'WhatsApp' },
  { icon: 'fa-brands fa-instagram', url: SITE.social.instagram, label: 'Instagram' },
  { icon: 'fa-brands fa-linkedin-in', url: SITE.social.linkedin, label: 'LinkedIn' },
  { icon: 'fa-brands fa-facebook-f', url: SITE.social.facebook, label: 'Facebook' }
]
</script>
