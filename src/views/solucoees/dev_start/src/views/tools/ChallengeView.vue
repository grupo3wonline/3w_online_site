<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
import { useSeo } from '@/composables/useSeo'
import { useChallengesStore } from '@/stores/challenges'
import { INITIAL_CHALLENGES, COURSES, TOOLS } from '@/data/tools'

useSeo({
  title: 'Desafios & Cursos | DevStart Academy',
  description: 'Desafios semanais e cursos gratuitos de programação para acelerar seu aprendizado.',
  path: '/ferramentas/desafios',
})

const store = useChallengesStore()
const { progress, completedCount, total } = storeToRefs(store)

function routeForModule(moduleId: string) {
  return TOOLS.find((t) => t.id === moduleId)?.route ?? '/ferramentas'
}

function markComplete(id: string, title: string) {
  store.complete(id)
  Swal.fire({
    icon: 'success',
    title: 'Desafio concluído!',
    text: `Parabéns por completar "${title}".`,
    timer: 2000,
    showConfirmButton: false,
  })
}

function resetProgress() {
  Swal.fire({
    title: 'Zerar progresso?',
    text: 'Todos os desafios voltarão a ficar pendentes.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Sim, zerar',
    cancelButtonText: 'Cancelar',
  }).then((r) => {
    if (r.isConfirmed) store.reset()
  })
}
</script>

<template>
  <div class="container-page py-10">
    <!-- Header -->
    <div
      class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white shadow-lg"
    >
      <div class="relative z-10">
        <h1 class="flex items-center gap-3 text-3xl font-bold">
          <Icon
            icon="lucide:trophy"
            class="h-8 w-8 text-amber-300"
          /> Challenge Code Week
        </h1>
        <p class="mt-2 max-w-2xl opacity-90">
          Complete desafios semanais para aprimorar suas habilidades. Participe da comunidade e
          contribua com projetos open source.
        </p>
        <a
          href="https://github.com/grupo3wonline/challenge_code_week"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-bold text-violet-700 shadow-md transition hover:bg-slate-100"
        >
          <Icon
            icon="lucide:github"
            class="h-5 w-5"
          /> Repositório oficial
        </a>

        <div class="mt-6 max-w-md">
          <div class="mb-1 flex items-center justify-between text-sm font-medium">
            <span>Seu progresso</span>
            <span>{{ completedCount }} de {{ total }} ({{ progress }}%)</span>
          </div>
          <div class="h-2.5 w-full overflow-hidden rounded-full bg-white/20">
            <div
              class="h-full rounded-full bg-amber-300 transition-all duration-500"
              :style="{ width: progress + '%' }"
            />
          </div>
        </div>
      </div>
      <div class="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
    </div>

    <!-- Challenges -->
    <div class="mt-10 flex flex-wrap items-center justify-between gap-2">
      <h2 class="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white">
        <Icon
          icon="lucide:list-checks"
          class="h-6 w-6 text-violet-600"
        /> Desafios ativos
      </h2>
      <button
        v-if="completedCount > 0"
        type="button"
        class="btn-ghost text-sm text-red-500"
        @click="resetProgress"
      >
        <Icon
          icon="lucide:rotate-ccw"
          class="h-4 w-4"
        /> Zerar progresso
      </button>
    </div>
    <div class="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="challenge in INITIAL_CHALLENGES"
        :key="challenge.id"
        class="card flex flex-col p-6 transition hover:shadow-lg"
        :class="store.isCompleted(challenge.id) ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full"
          :class="
            store.isCompleted(challenge.id)
              ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
          "
        >
          <Icon
            :icon="store.isCompleted(challenge.id) ? 'lucide:check' : 'lucide:trophy'"
            class="h-6 w-6"
          />
        </div>
        <h3 class="mt-4 text-lg font-bold text-slate-800 dark:text-white">
          {{ challenge.title }}
        </h3>
        <p class="mt-2 flex-1 text-sm text-slate-500 dark:text-slate-400">
          {{ challenge.description }}
        </p>
        <div class="mt-6 flex flex-col gap-2">
          <RouterLink
            :to="routeForModule(challenge.module)"
            class="btn-secondary w-full"
          >
            <Icon
              icon="lucide:play"
              class="h-4 w-4"
            /> Abrir ferramenta
          </RouterLink>
          <button
            v-if="!store.isCompleted(challenge.id)"
            type="button"
            class="btn-primary w-full"
            @click="markComplete(challenge.id, challenge.title)"
          >
            <Icon
              icon="lucide:circle-check"
              class="h-4 w-4"
            /> Marcar como concluído
          </button>
          <button
            v-else
            type="button"
            class="btn w-full border border-green-500 text-green-600 dark:text-green-400"
            @click="store.toggle(challenge.id)"
          >
            <Icon
              icon="lucide:check-check"
              class="h-4 w-4"
            /> Concluído
          </button>
        </div>
      </div>
    </div>

    <!-- Courses -->
    <div class="card mt-12 p-6">
      <h2 class="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white">
        <Icon
          icon="lucide:graduation-cap"
          class="h-6 w-6 text-brand-600"
        /> Cursos recomendados
      </h2>
      <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <a
          v-for="course in COURSES"
          :key="course.url"
          :href="course.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group block rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-brand-200 hover:bg-brand-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          <div class="flex items-start justify-between">
            <h3 class="text-sm font-bold text-slate-700 group-hover:text-brand-700 dark:text-slate-200">
              {{ course.title }}
            </h3>
            <Icon
              icon="lucide:external-link"
              class="h-3.5 w-3.5 text-slate-400 group-hover:text-brand-500"
            />
          </div>
          <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ course.desc }}</p>
        </a>
      </div>
    </div>
  </div>
</template>
