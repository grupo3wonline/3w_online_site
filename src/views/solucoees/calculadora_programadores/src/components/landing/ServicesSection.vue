<script setup lang="ts">
import { Icon } from "@iconify/vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";

const services = [
  {
    icon: "lucide:globe",
    title: "Desenvolvimento Web",
    description:
      "Sites institucionais, landing pages e portais corporativos com foco em conversão e SEO.",
  },
  {
    icon: "lucide:code",
    title: "Sistemas Web Personalizados",
    description:
      "Aplicações complexas, painéis administrativos e SaaS feitos sob medida para seu negócio.",
  },
  {
    icon: "lucide:smartphone",
    title: "Desenvolvimento Mobile",
    description: "Apps nativos e híbridos para iOS e Android com a melhor experiência de usuário.",
  },
  {
    icon: "lucide:server",
    title: "API & Integrações",
    description:
      "Conexão entre sistemas, desenvolvimento de APIs RESTful e microserviços escaláveis.",
  },
  {
    icon: "lucide:database",
    title: "Banco de Dados & Cloud",
    description: "Arquitetura de dados segura e infraestrutura em nuvem (AWS, Azure, Google Cloud).",
  },
  {
    icon: "lucide:lock",
    title: "Segurança & Manutenção",
    description: "Auditoria de código, proteção contra vulnerabilidades e suporte contínuo.",
  },
];
</script>

<template>
  <section
    id="servicos"
    class="scroll-mt-20 bg-secondary/40 py-20 md:py-24"
  >
    <div class="container-app">
      <SectionHeading
        eyebrow="Grupo 3w Online"
        eyebrow-icon="lucide:layers"
        title="Nossos serviços"
        subtitle="Um ecossistema completo de soluções digitais. Da concepção ao deploy, somos seus parceiros de tecnologia."
      />

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(service, i) in services"
          :key="service.title"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 350, delay: (i % 3) * 100 } }"
          class="group rounded-2xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant"
        >
          <span
            class="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground"
          >
            <Icon
              :icon="service.icon"
              class="h-7 w-7"
            />
          </span>
          <h3 class="mb-2 text-xl font-bold text-foreground">
            {{ service.title }}
          </h3>
          <p class="text-muted-foreground">
            {{ service.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
