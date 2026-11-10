<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BaseButton from "@/components/ui/BaseButton.vue";
</script>

<template>
  <section class="py-16 md:py-20">
    <div class="container-app">
      <div
        class="relative overflow-hidden rounded-[2rem] bg-gradient-primary px-6 py-16 text-center text-primary-foreground shadow-elegant md:px-12"
      >
        <!-- Textura decorativa -->
        <div
          class="pointer-events-none absolute inset-0 opacity-20"
          style="
            background-image: radial-gradient(circle at 20% 20%, white 1px, transparent 1px);
            background-size: 28px 28px;
          "
          aria-hidden="true"
        />

        <div class="relative mx-auto max-w-2xl space-y-6">
          <span
            class="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur"
          >
            <Icon
              icon="lucide:flame"
              class="h-4 w-4"
            />
            Vagas limitadas neste mês
          </span>

          <h2 class="text-3xl font-extrabold md:text-5xl">
            Pronto para profissionalizar seus orçamentos?
          </h2>
          <p class="text-lg opacity-90">
            Junte-se a milhares de desenvolvedores que já cobram o valor justo. E se seu projeto
            precisa de um sistema sob medida, a <strong>3w Online</strong> assume o
            desenvolvimento — mas temos poucas vagas na agenda deste mês.
          </p>

          <div class="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BaseButton
              :to="{ name: 'tool' }"
              size="lg"
              variant="secondary"
              class="font-bold"
            >
              <Icon
                icon="lucide:calculator"
                class="h-5 w-5"
              />
              Começar grátis agora
            </BaseButton>
            <BaseButton
              href="https://www.3wonline.com.br"
              external
              size="lg"
              class="border border-white/30 bg-white/15 font-bold backdrop-blur hover:bg-white/25"
            >
              Garantir minha vaga
              <Icon
                icon="lucide:arrow-right"
                class="h-5 w-5"
              />
            </BaseButton>
          </div>

          <p class="text-sm opacity-75">
            Desenvolvido por Grupo 3w Online — especialistas em sistemas sob demanda.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
