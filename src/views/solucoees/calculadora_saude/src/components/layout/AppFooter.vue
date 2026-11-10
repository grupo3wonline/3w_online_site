<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const route = useRoute();
const router = useRouter();
const year = computed(() => new Date().getFullYear());

async function goTo(hash: string) {
  if (route.name !== 'home') {
    await router.push({ path: '/', hash });
  } else {
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
  }
}

const navLinks = [
  { label: 'Início', hash: '#inicio' },
  { label: 'Calculadora', hash: '#calculadora' },
  { label: 'Benefícios', hash: '#beneficios' },
  { label: 'Sobre', hash: '#sobre' },
  { label: 'Serviços', hash: '#servicos' },
  { label: 'Contato', hash: '#contato' },
];
</script>

<template>
  <footer class="border-t border-gray-700 bg-gray-800 dark:border-gray-800 dark:bg-gray-950">
    <div class="container-page py-12">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-4">
        <!-- Marca -->
        <div class="md:col-span-1">
          <div class="mb-4 flex items-center gap-2">
            <Icon
              icon="fa6-solid:heart-pulse"
              class="text-2xl text-brand-400"
              aria-hidden="true"
            />
            <span class="text-lg font-bold text-white">Calculadora de Saúde</span>
          </div>
          <p class="text-sm leading-relaxed text-gray-400">
            Ferramenta gratuita e privada para descobrir seu IMC, peso ideal e plano nutricional
            personalizado, baseada em ciência.
          </p>
        </div>

        <!-- Navegação -->
        <nav aria-label="Rodapé — navegação">
          <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Navegação
          </h3>
          <ul class="space-y-2">
            <li
              v-for="link in navLinks"
              :key="link.hash"
            >
              <button
                class="text-sm text-gray-400 transition-colors hover:text-brand-400"
                @click="goTo(link.hash)"
              >
                {{ link.label }}
              </button>
            </li>
          </ul>
        </nav>

        <!-- Legal / Privacidade -->
        <nav aria-label="Rodapé — privacidade">
          <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Privacidade
          </h3>
          <ul class="space-y-2">
            <li>
              <button
                class="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-brand-400"
                @click="ui.openTerms()"
              >
                <Icon
                  icon="fa6-solid:file-contract"
                  aria-hidden="true"
                />
                Termos de Uso
              </button>
            </li>
            <li>
              <button
                class="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-brand-400"
                @click="ui.openPrivacy()"
              >
                <Icon
                  icon="fa6-solid:shield-halved"
                  aria-hidden="true"
                />
                Política de Privacidade
              </button>
            </li>
            <li>
              <RouterLink
                to="/privacidade"
                class="text-sm text-gray-400 transition-colors hover:text-brand-400"
              >
                Central de Privacidade (LGPD/GDPR)
              </RouterLink>
            </li>
          </ul>
          <p class="mt-4 text-xs leading-relaxed text-gray-500">
            Em conformidade com LGPD, GDPR, CCPA e POPIA.
          </p>
        </nav>

        <!-- Contato -->
        <div>
          <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Contato
          </h3>
          <ul class="space-y-3">
            <li>
              <a
                href="https://wa.me/5541996924829"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-brand-400"
              >
                <Icon
                  icon="fa6-brands:whatsapp"
                  class="text-lg"
                  aria-hidden="true"
                />
                (41) 99692-4829
              </a>
            </li>
            <li>
              <a
                href="mailto:contato@3wonline.com.br"
                class="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-brand-400"
              >
                <Icon
                  icon="fa6-solid:envelope"
                  class="text-lg"
                  aria-hidden="true"
                />
                contato@3wonline.com.br
              </a>
            </li>
            <li>
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-brand-400"
              >
                <Icon
                  icon="fa6-solid:globe"
                  class="text-lg"
                  aria-hidden="true"
                />
                www.3wonline.com.br
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 border-t border-gray-700 pt-6 dark:border-gray-800">
        <div class="flex flex-col items-center justify-between gap-3 md:flex-row">
          <p class="text-sm text-gray-400">
            &copy; {{ year }} Calculadora de Saúde. Todos os direitos reservados.
          </p>
          <p class="flex items-center gap-2 text-sm text-gray-400">
            <Icon
              icon="fa6-solid:code"
              class="text-brand-400"
              aria-hidden="true"
            />
            Sistema desenvolvido pelo desenvolvedor
            <span class="font-semibold text-brand-400">HOTWYL | WILLFROMBRASIL</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
