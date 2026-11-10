<template>
  <div class="card text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
    <div class="text-4xl mb-4 group-hover:animate-bounce">{{ feature.icon }}</div>
    <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
      {{ feature.title }}
    </h3>
    <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { FeatureCard } from '../types'

interface Props {
  feature: FeatureCard
}

defineProps<Props>()
</script>