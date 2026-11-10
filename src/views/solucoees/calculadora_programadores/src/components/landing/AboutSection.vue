<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const highlights = [
  { icon: "lucide:rocket", label: "Entregas ágeis" },
  { icon: "lucide:shield-check", label: "Código seguro" },
  { icon: "lucide:heart-handshake", label: "Suporte contínuo" },
];
</script>

<template>
  <section
    id="sobre"
    class="scroll-mt-20 bg-background py-20 md:py-24"
  >
    <div class="container-app">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <div
          v-motion
          :initial="{ opacity: 0, x: -24 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 450 } }"
          class="space-y-5"
        >
          <span class="eyebrow">
            <Icon
              icon="lucide:building-2"
              class="h-3.5 w-3.5"
            />
            Sobre nós
          </span>
          <h2 class="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Quem está por trás da <span class="text-gradient">tecnologia</span>
          </h2>
          <p class="leading-relaxed text-muted-foreground">
            O <strong>Grupo 3w Online</strong> é especialista no desenvolvimento de soluções
            digitais personalizadas. Focados em entregar sistemas robustos, escaláveis e
            esteticamente impecáveis, ajudamos empresas a transformarem ideias em realidade digital.
          </p>
          <p class="leading-relaxed text-muted-foreground">
            A Calculadora de Projetos nasceu da necessidade interna de otimizar nossos próprios
            processos, e decidimos compartilhar essa tecnologia com a comunidade.
          </p>

          <ul class="flex flex-wrap gap-3">
            <li
              v-for="h in highlights"
              :key="h.label"
              class="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm font-medium text-foreground"
            >
              <Icon
                :icon="h.icon"
                class="h-4 w-4 text-primary"
              />
              {{ h.label }}
            </li>
          </ul>

          <BaseButton
            href="https://www.3wonline.com.br"
            external
            variant="outline"
            class="mt-2"
          >
            Visite nosso site
            <Icon
              icon="lucide:external-link"
              class="h-4 w-4"
            />
          </BaseButton>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, x: 24 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 450, delay: 100 } }"
          class="relative"
        >
          <div class="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-mesh opacity-80 blur-2xl" />
          <div class="surface-card flex flex-col items-center gap-6 p-10 text-center">
            <span
              class="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-primary text-primary-foreground shadow-glow"
            >
              <Icon
                icon="lucide:code-2"
                class="h-10 w-10"
              />
            </span>
            <div>
              <h3 class="text-3xl font-extrabold text-foreground">
                3w Online
              </h3>
              <p class="mt-1 text-sm text-muted-foreground">
                Tecnologia &amp; Inovação sob demanda
              </p>
            </div>
            <div class="grid w-full grid-cols-2 gap-4 border-t border-border pt-6">
              <div>
                <p class="text-2xl font-extrabold text-primary">
                  +10
                </p>
                <p class="text-xs text-muted-foreground">
                  anos de experiência
                </p>
              </div>
              <div>
                <p class="text-2xl font-extrabold text-primary">
                  100%
                </p>
                <p class="text-xs text-muted-foreground">
                  sob medida
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-14 rounded-2xl border border-border bg-card p-8 shadow-card">
        <h3 class="mb-3 flex items-center gap-2 text-xl font-bold text-foreground">
          <Icon
            icon="lucide:target"
            class="h-5 w-5 text-primary"
          />
          Nossa missão
        </h3>
        <p class="text-muted-foreground">
          Facilitar a vida de desenvolvedores e empresas através de ferramentas inteligentes e
          design de alta performance. Acreditamos que o software deve ser não apenas funcional, mas
          também uma experiência prazerosa.
        </p>
      </div>
    </div>
  </section>
</template>
