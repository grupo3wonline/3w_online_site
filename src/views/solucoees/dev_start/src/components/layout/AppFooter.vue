<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { TOOLS, COMPANY } from '@/data/tools'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
    <div class="container-page py-12">
      <div class="grid gap-10 md:grid-cols-4">
        <!-- Brand -->
        <div class="md:col-span-1">
          <RouterLink
            to="/"
            class="flex items-center gap-2 font-extrabold"
          >
            <span
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 text-white"
            >
              <Icon
                icon="lucide:code-xml"
                class="h-5 w-5"
              />
            </span>
            <span class="text-lg text-slate-900 dark:text-white">DevStart</span>
          </RouterLink>
          <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Plataforma educacional gamificada para aprender lógica de programação e desenvolvimento
            web de forma prática.
          </p>
          <div class="mt-4 flex gap-3">
            <a
              :href="COMPANY.whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-ghost h-9 w-9 rounded-full p-0"
              aria-label="WhatsApp"
            >
              <Icon
                icon="lucide:message-circle"
                class="h-5 w-5"
              />
            </a>
            <a
              :href="`mailto:${COMPANY.email}`"
              class="btn-ghost h-9 w-9 rounded-full p-0"
              aria-label="E-mail"
            >
              <Icon
                icon="lucide:mail"
                class="h-5 w-5"
              />
            </a>
          </div>
        </div>

        <!-- Ferramentas -->
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200">
            Ferramentas
          </h3>
          <ul class="mt-4 space-y-2">
            <li
              v-for="tool in TOOLS"
              :key="tool.id"
            >
              <RouterLink
                :to="tool.route"
                class="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                {{ tool.title }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Navegação -->
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200">
            Navegação
          </h3>
          <ul class="mt-4 space-y-2">
            <li>
              <RouterLink
                to="/"
                class="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                Início
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ path: '/', hash: '#sobre' }"
                class="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                Sobre
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ path: '/', hash: '#contato' }"
                class="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                Contato
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/privacidade"
                class="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                Política de Privacidade
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Empresa -->
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200">
            {{ COMPANY.name }}
          </h3>
          <p class="mt-4 text-sm text-slate-500 dark:text-slate-400">
            {{ COMPANY.slogan }}.
          </p>
          <ul class="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li class="flex items-center gap-2">
              <Icon
                icon="lucide:phone"
                class="h-4 w-4 text-brand-500"
              />
              <a
                :href="COMPANY.whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
              >{{
                COMPANY.whatsapp
              }}</a>
            </li>
            <li class="flex items-center gap-2">
              <Icon
                icon="lucide:mail"
                class="h-4 w-4 text-brand-500"
              />
              <a :href="`mailto:${COMPANY.email}`">{{ COMPANY.email }}</a>
            </li>
            <li class="flex items-center gap-2">
              <Icon
                icon="lucide:globe"
                class="h-4 w-4 text-brand-500"
              />
              <a
                :href="COMPANY.site"
                target="_blank"
                rel="noopener noreferrer"
              >www.3wonline.com.br</a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 md:flex-row md:text-left dark:border-slate-800 dark:text-slate-400"
      >
        <p>&copy; {{ year }} DevStart Academy. Todos os direitos reservados.</p>
        <p class="flex flex-wrap items-center justify-center gap-1.5">
          Sistema desenvolvido pelo desenvolvedor
          <a
            :href="COMPANY.developerUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="font-bold text-brand-600 hover:text-brand-500 dark:text-brand-400"
          >
            HOTWYL
          </a>
          <span class="text-slate-400">|</span>
          <span class="font-semibold text-slate-600 dark:text-slate-300">WILLFROMBRASIL</span>
        </p>
      </div>
    </div>
  </footer>
</template>
