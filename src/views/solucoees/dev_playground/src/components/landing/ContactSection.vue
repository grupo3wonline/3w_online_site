<script setup lang="ts">
import { Icon } from '@iconify/vue'
import SectionHeading from './SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { company } from '@/config/site'

const faqs = [
  {
    q: 'Quanto tempo leva para ter uma resposta?',
    a: 'Geralmente respondemos em até 24 horas úteis. Para casos urgentes, chame no WhatsApp.',
  },
  {
    q: 'Vocês atendem todo o Brasil?',
    a: 'Sim! Atendemos clientes em todo o território nacional de forma 100% remota.',
  },
  {
    q: 'Qual o prazo médio de desenvolvimento?',
    a: 'Varia conforme o projeto. Após entender suas necessidades, enviamos um cronograma detalhado.',
  },
]
</script>

<template>
  <section id="contato" class="scroll-mt-20 bg-background py-20">
    <div class="container-page">
      <SectionHeading
        eyebrow="Contato"
        title="Vamos trabalhar"
        highlight="juntos?"
        :subtitle="`A ${company.name} está pronta para transformar suas ideias em realidade digital. Fale direto com a gente pelos canais abaixo.`"
      />

      <div class="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <!-- WhatsApp -->
        <a
          :href="company.whatsapp.link"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex flex-col items-center gap-4 rounded-2xl border-2 border-border bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl"
        >
          <span class="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white transition-transform duration-300 group-hover:scale-110">
            <Icon icon="mdi:whatsapp" class="h-8 w-8" />
          </span>
          <div>
            <h3 class="text-xl font-bold">WhatsApp</h3>
            <p class="text-lg text-muted-foreground">{{ company.whatsapp.display }}</p>
            <p class="mt-1 text-sm text-emerald-600 dark:text-emerald-400">Atendimento rápido e direto</p>
          </div>
          <BaseButton variant="outline" size="sm">
            <Icon icon="mdi:whatsapp" class="h-4 w-4" />
            Chamar no WhatsApp
          </BaseButton>
        </a>

        <!-- E-mail -->
        <a
          :href="company.emailLink"
          class="group flex flex-col items-center gap-4 rounded-2xl border-2 border-border bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
        >
          <span class="flex h-16 w-16 items-center justify-center rounded-full gradient-brand text-white transition-transform duration-300 group-hover:scale-110">
            <Icon icon="lucide:mail" class="h-8 w-8" />
          </span>
          <div>
            <h3 class="text-xl font-bold">E-mail</h3>
            <p class="text-lg text-muted-foreground">{{ company.email }}</p>
            <p class="mt-1 text-sm text-primary">Para propostas e dúvidas</p>
          </div>
          <BaseButton variant="outline" size="sm">
            <Icon icon="lucide:send" class="h-4 w-4" />
            Enviar E-mail
          </BaseButton>
        </a>
      </div>

      <!-- Confiança -->
      <div class="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <span class="flex items-center gap-2">
          <Icon icon="lucide:shield-check" class="h-4 w-4 text-emerald-500" />
          Seus dados protegidos (LGPD)
        </span>
        <span class="flex items-center gap-2">
          <Icon icon="lucide:clock" class="h-4 w-4 text-secondary" />
          Resposta em até 24h úteis
        </span>
        <span class="flex items-center gap-2">
          <Icon icon="lucide:award" class="h-4 w-4 text-amber-500" />
          {{ company.yearsExperience }} anos de experiência
        </span>
      </div>

      <!-- FAQ -->
      <div class="mx-auto mt-16 max-w-3xl">
        <h3 class="mb-8 text-center text-2xl font-bold">Perguntas Frequentes</h3>
        <div class="space-y-4">
          <details
            v-for="(faq, i) in faqs"
            :key="i"
            class="group rounded-xl border-2 border-border bg-card p-5"
          >
            <summary class="flex cursor-pointer items-center justify-between gap-3 font-semibold">
              <span class="flex items-center gap-2">
                <Icon icon="lucide:help-circle" class="h-5 w-5 text-primary" />
                {{ faq.q }}
              </span>
              <Icon
                icon="lucide:chevron-down"
                class="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180"
              />
            </summary>
            <p class="mt-3 pl-7 text-muted-foreground">{{ faq.a }}</p>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>
