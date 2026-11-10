<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { findToolBySlug } from '@/data/tools'
import { computed } from 'vue'
import InfoBox from '@/components/ui/InfoBox.vue'

const props = defineProps<{ slug: string; tip?: string }>()
const route = useRoute()
const tool = computed(() => findToolBySlug(props.slug))
void route
</script>

<template>
  <div class="container-app py-10">
    <header class="mb-8 text-center">
      <span class="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon :icon="tool?.icon || 'lucide:wand-2'" class="h-7 w-7" />
      </span>
      <h1 class="text-3xl font-extrabold sm:text-4xl">{{ tool?.title }}</h1>
      <p class="mx-auto mt-3 max-w-2xl text-muted-foreground">{{ tool?.description }}</p>
    </header>

    <div class="mx-auto max-w-2xl space-y-6">
      <slot />

      <InfoBox v-if="tip" variant="tip" title="Dica">{{ tip }}</InfoBox>

      <p class="text-center text-xs text-muted-foreground">
        <Icon icon="lucide:shield-alert" class="mr-1 inline h-3.5 w-3.5" />
        Dados gerados são fictícios, apenas para testes. Não utilize para fraudes ou atividades ilegais.
      </p>
    </div>
  </div>
</template>
