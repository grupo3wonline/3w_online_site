<script setup lang="ts">
import { Icon } from '@iconify/vue'

const channels = [
  {
    icon: 'fa6-brands:whatsapp',
    title: 'WhatsApp',
    label: '(41) 99692-4829',
    href: 'https://wa.me/5541996924829',
    color: 'from-green-500 to-emerald-500',
    external: true,
  },
  {
    icon: 'fa6-solid:envelope',
    title: 'E-mail',
    label: 'contato@3wonline.com.br',
    href: 'mailto:contato@3wonline.com.br',
    color: 'from-blue-500 to-cyan-500',
    external: false,
  },
  {
    icon: 'fa6-solid:clock',
    title: 'Horário de Atendimento',
    label: 'Segunda a Sexta, 9h às 18h',
    href: '',
    color: 'from-purple-500 to-pink-500',
    external: false,
  },
]

const social = [
  { href: 'https://www.facebook.com/3wonline', icon: 'fa6-brands:facebook-f', label: 'Facebook' },
  { href: 'https://www.instagram.com/3wonline', icon: 'fa6-brands:instagram', label: 'Instagram' },
  {
    href: 'https://www.linkedin.com/company/3wonline',
    icon: 'fa6-brands:linkedin-in',
    label: 'LinkedIn',
  },
]
</script>

<template>
  <section id="contato" class="bg-background/50 py-20">
    <div class="container">
      <div class="mx-auto mb-12 max-w-4xl space-y-6 text-center">
        <div class="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-primary">
          <Icon icon="fa6-solid:envelope" class="h-4 w-4" />
          <span class="font-semibold">Entre em Contato</span>
        </div>
        <h2 class="text-3xl font-black text-foreground md:text-5xl">Fale Conosco</h2>
        <p class="text-xl leading-relaxed text-muted-foreground">
          Tem dúvidas, sugestões ou precisa de ajuda? Fale direto com o Grupo 3w Online pelos canais
          abaixo.
        </p>
      </div>

      <div class="mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
        <component
          :is="channel.href ? 'a' : 'div'"
          v-for="channel in channels"
          :key="channel.title"
          :href="channel.href || undefined"
          :target="channel.external ? '_blank' : undefined"
          :rel="channel.external ? 'noopener noreferrer' : undefined"
          class="space-y-4 rounded-2xl border border-border bg-card p-8 text-center shadow-card transition-all duration-300 hover:shadow-elegant"
        >
          <div
            class="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br"
            :class="channel.color"
          >
            <Icon :icon="channel.icon" class="h-7 w-7 text-white" />
          </div>
          <h3 class="text-xl font-bold text-foreground">{{ channel.title }}</h3>
          <p class="font-semibold text-primary">{{ channel.label }}</p>
        </component>
      </div>

      <!-- Redes + CTA 3w Online -->
      <div class="mx-auto max-w-6xl">
        <div
          class="rounded-3xl bg-gradient-to-br from-violet-600 to-purple-600 p-12 text-center text-white shadow-2xl"
        >
          <h2 class="mb-6 text-3xl font-black md:text-4xl">Conecte-se Conosco</h2>
          <p class="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            Siga nossas redes sociais e fique por dentro de novidades, dicas e atualizações!
          </p>
          <div class="mb-8 flex justify-center gap-4">
            <a
              v-for="s in social"
              :key="s.href"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 transition-all duration-300 hover:scale-110 hover:bg-white/30"
              :aria-label="s.label"
            >
              <Icon :icon="s.icon" class="h-6 w-6" />
            </a>
          </div>
          <div class="border-t border-white/20 pt-8">
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-3 rounded-xl bg-white px-10 py-4 text-lg font-bold text-violet-600 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-slate-100"
            >
              <Icon icon="fa6-solid:arrow-up-right-from-square" class="h-5 w-5" />
              Visite Nosso Site Oficial
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
