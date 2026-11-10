<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BaseButton from "@/components/ui/BaseButton.vue";

defineProps<{
  code: string;
  title: string;
  message: string;
  icon: string;
}>();
</script>

<template>
  <section class="container-app flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
    <span class="mb-6 inline-flex rounded-2xl bg-primary/10 p-6 text-primary">
      <Icon
        :icon="icon"
        class="h-14 w-14"
      />
    </span>
    <p class="text-6xl font-extrabold text-primary">
      {{ code }}
    </p>
    <h1 class="mt-4 text-2xl font-bold text-foreground md:text-3xl">
      {{ title }}
    </h1>
    <p class="mt-3 max-w-md text-muted-foreground">
      {{ message }}
    </p>

    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <BaseButton
        :to="{ name: 'home' }"
        variant="hero"
      >
        <Icon
          icon="lucide:home"
          class="h-4 w-4"
        />
        Voltar para o Início
      </BaseButton>
      <BaseButton
        :to="{ name: 'tool' }"
        variant="outline"
      >
        <Icon
          icon="lucide:calculator"
          class="h-4 w-4"
        />
        Ir para a Calculadora
      </BaseButton>
    </div>
  </section>
</template>
