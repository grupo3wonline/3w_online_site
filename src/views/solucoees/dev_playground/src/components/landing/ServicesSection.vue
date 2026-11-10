<script setup lang="ts">
import { Icon } from '@iconify/vue'
import SectionHeading from './SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { company } from '@/config/site'

const services = [
  {
    icon: 'lucide:globe',
    title: 'Desenvolvimento Web',
    description: 'Sites institucionais, landing pages e hotsites modernos, responsivos e otimizados para conversão.',
    features: ['Design responsivo', 'SEO otimizado', 'Performance máxima', 'Manutenção inclusa'],
  },
  {
    icon: 'lucide:laptop',
    title: 'Sistemas Personalizados',
    description: 'Desenvolvimento sob medida para automatizar processos e aumentar a eficiência do seu negócio.',
    features: ['Análise de requisitos', 'Arquitetura escalável', 'Integração de APIs', 'Treinamento da equipe'],
  },
  {
    icon: 'lucide:shopping-cart',
    title: 'E-commerce',
    description: 'Lojas virtuais completas com pagamento, gestão de estoque e painel administrativo.',
    features: ['Gateway de pagamento', 'Gestão de produtos', 'Relatórios e analytics', 'Multi-plataforma'],
  },
  {
    icon: 'lucide:smartphone',
    title: 'Aplicações Web (PWA)',
    description: 'Progressive Web Apps com experiência nativa e funcionamento offline.',
    features: ['Instalável', 'Notificações push', 'Modo offline', 'Alta performance'],
  },
  {
    icon: 'lucide:server',
    title: 'APIs e Integrações',
    description: 'APIs RESTful e integração com sistemas terceiros de forma segura.',
    features: ['API REST/GraphQL', 'Documentação completa', 'Autenticação segura', 'Webhooks'],
  },
  {
    icon: 'lucide:settings',
    title: 'Manutenção e Suporte',
    description: 'Suporte técnico contínuo, atualizações de segurança e melhorias de performance.',
    features: ['Monitoramento', 'Backups automáticos', 'Atualizações regulares', 'Suporte prioritário'],
  },
]

const techs = ['Vue.js', 'React', 'Laravel', 'Node.js', 'PHP', 'TypeScript']
</script>

<template>
  <section id="servicos" class="scroll-mt-20 bg-muted/40 py-20">
    <div class="container-page">
      <SectionHeading
        eyebrow="Grupo 3w Online"
        title="Serviços de"
        highlight="Desenvolvimento"
        :subtitle="`A ${company.name} oferece soluções completas: de sites institucionais a sistemas complexos personalizados sob demanda.`"
      />

      <div class="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="service in services"
          :key="service.title"
          v-motion-fade-visible-once
          class="group rounded-2xl border-2 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div
            class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl gradient-brand transition-transform duration-300 group-hover:scale-110"
          >
            <Icon :icon="service.icon" class="h-7 w-7 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">{{ service.title }}</h3>
          <p class="mb-4 text-sm text-muted-foreground">{{ service.description }}</p>
          <ul class="space-y-2">
            <li v-for="f in service.features" :key="f" class="flex items-center gap-2 text-sm">
              <Icon icon="lucide:check-circle-2" class="h-4 w-4 text-emerald-500" />
              <span class="text-muted-foreground">{{ f }}</span>
            </li>
          </ul>
        </article>
      </div>

      <div class="mb-12 flex flex-wrap justify-center gap-3">
        <span
          v-for="tech in techs"
          :key="tech"
          class="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground"
        >
          {{ tech }}
        </span>
      </div>

      <div class="text-center">
        <a :href="company.site" target="_blank" rel="noopener noreferrer">
          <BaseButton size="lg">
            <Icon icon="lucide:send" class="h-5 w-5" />
            Solicitar Orçamento na 3w Online
          </BaseButton>
        </a>
      </div>
    </div>
  </section>
</template>
