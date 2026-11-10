<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { onKeyStroke, useMagicKeys, whenever } from "@vueuse/core";
import { useSearch } from "@/composables/useSearch";

const router = useRouter();
const open = ref(false);
const query = ref("");
const inputRef = ref<HTMLInputElement | null>(null);
const { results } = useSearch(query);

// Atalho Ctrl/Cmd + K abre a busca.
const keys = useMagicKeys();
whenever(keys["Ctrl+K"], () => (open.value = true));
whenever(keys["Meta+K"], () => (open.value = true));

onKeyStroke("Escape", () => (open.value = false));

watch(open, async (v) => {
  if (v) {
    query.value = "";
    await nextTick();
    inputRef.value?.focus();
  }
});

const go = (to: string) => {
  open.value = false;
  router.push(to);
};

defineExpose({ open });
</script>

<template>
  <button
    type="button"
    class="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    aria-label="Buscar ferramentas"
    @click="open = true"
  >
    <Icon icon="lucide:search" class="h-4 w-4" />
    <span class="hidden md:inline">Buscar</span>
    <kbd class="hidden rounded border border-border bg-muted px-1.5 text-xs md:inline">Ctrl K</kbd>
  </button>

  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-150"
      leave-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[210] flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Buscar"
        @click.self="open = false"
      >
        <div
          class="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-strong"
        >
          <div class="flex items-center gap-3 border-b border-border px-4">
            <Icon icon="lucide:search" class="h-5 w-5 text-muted-foreground" />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              autocomplete="off"
              placeholder="Buscar ferramentas, dicas..."
              class="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              class="rounded-md p-1 text-muted-foreground hover:bg-muted"
              aria-label="Fechar busca"
              @click="open = false"
            >
              <Icon icon="lucide:x" class="h-5 w-5" />
            </button>
          </div>
          <ul class="max-h-80 overflow-y-auto p-2">
            <li
              v-if="results.length === 0"
              class="px-3 py-6 text-center text-sm text-muted-foreground"
            >
              Nenhum resultado para "{{ query }}".
            </li>
            <li v-for="item in results" :key="item.to">
              <button
                type="button"
                class="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                @click="go(item.to)"
              >
                <span
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"
                >
                  <Icon :icon="item.icon" class="h-5 w-5 text-primary" />
                </span>
                <span class="min-w-0">
                  <span class="block font-medium">{{ item.title }}</span>
                  <span class="block truncate text-sm text-muted-foreground">{{
                    item.description
                  }}</span>
                </span>
                <Icon icon="lucide:arrow-right" class="ml-auto h-4 w-4 text-muted-foreground" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
