<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";

const WHATSAPP = "5541996924829";
const WHATSAPP_LABEL = "(41) 99692-4829";
const EMAIL = "contato@3wonline.com.br";
</script>

<template>
  <section
    id="contato"
    class="scroll-mt-20 bg-background py-20 md:py-24"
  >
    <div class="container-app">
      <SectionHeading
        eyebrow="Fale conosco"
        eyebrow-icon="lucide:message-circle"
        title="Vamos tirar seu projeto do papel?"
        subtitle="O Grupo 3w Online desenvolve sites e sistemas personalizados sob demanda. Cada dia parado é dinheiro na mesa — fale com um especialista agora."
      />

      <div class="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <article
          class="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
        >
          <span
            class="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#25D366]/10 text-[#25D366] transition-transform group-hover:scale-110"
          >
            <Icon
              icon="fa6-brands:whatsapp"
              class="h-8 w-8"
            />
          </span>
          <div>
            <h3 class="text-lg font-bold text-foreground">
              WhatsApp
            </h3>
            <p class="text-muted-foreground">
              Resposta rápida em horário comercial
            </p>
          </div>
          <BaseButton
            :href="`https://wa.me/${WHATSAPP}?text=Ol%C3%A1!%20Quero%20um%20or%C3%A7amento%20de%20sistema%20personalizado.`"
            external
            class="w-full"
          >
            {{ WHATSAPP_LABEL }}
          </BaseButton>
        </article>

        <article
          class="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
        >
          <span
            class="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110"
          >
            <Icon
              icon="lucide:mail"
              class="h-8 w-8"
            />
          </span>
          <div>
            <h3 class="text-lg font-bold text-foreground">
              E-mail
            </h3>
            <p class="text-muted-foreground">
              Envie os detalhes do seu projeto
            </p>
          </div>
          <BaseButton
            :href="`mailto:${EMAIL}`"
            variant="outline"
            class="w-full"
          >
            {{ EMAIL }}
          </BaseButton>
        </article>
      </div>

      <div
        class="mx-auto mt-10 max-w-4xl rounded-2xl border border-primary/20 bg-gradient-mesh p-8 text-center"
      >
        <h3 class="text-xl font-bold text-foreground">
          Desenvolvimento sob medida
        </h3>
        <p class="mx-auto mt-2 max-w-2xl text-muted-foreground">
          Tem um projeto complexo? Nossa equipe é especialista em transformar desafios em software
          de alta performance. Solicite um orçamento personalizado sem compromisso.
        </p>
        <BaseButton
          href="https://www.3wonline.com.br"
          external
          size="lg"
          variant="hero"
          class="mt-6"
        >
          Solicitar orçamento personalizado
          <Icon
            icon="lucide:arrow-right"
            class="h-5 w-5"
          />
        </BaseButton>
      </div>
    </div>
  </section>
</template>
