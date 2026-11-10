<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { useCalculatorStore, complexityOptions } from "@/stores/calculator";
import { formatCurrency, formatHours } from "@/lib/format";
import { formatDate, formatDateLong } from "@/lib/date";
import BaseButton from "@/components/ui/BaseButton.vue";
import AppLogo from "@/components/brand/AppLogo.vue";
import { useSeo } from "@/composables/useSeo";

const router = useRouter();
const calc = useCalculatorStore();

useSeo(() => ({
  title: "Orçamento",
  description: "Orçamento de projeto de software gerado pela Calculadora de Programadores.",
  path: "/orcamento",
  robots: "noindex, nofollow",
}));

// Se o usuário acessar a página sem ter emitido um orçamento, volta para a ferramenta.
onMounted(() => {
  if (!calc.isIssued) router.replace({ name: "tool" });
});

const complexityLabel = (value: string) =>
  complexityOptions.find((c) => c.value === value)?.label ?? value;

function print() {
  window.print();
}

const COMPANY = {
  name: "Grupo 3w Online",
  site: "www.3wonline.com.br",
  email: "contato@3wonline.com.br",
  whatsapp: "(41) 99692-4829",
};
</script>

<template>
  <div
    v-if="calc.isIssued"
    class="bg-secondary/30 py-8 print:bg-white print:py-0"
  >
    <!-- Barra de ações (oculta na impressão) -->
    <div class="container-app mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
      <BaseButton
        :to="{ name: 'tool' }"
        variant="ghost"
        size="sm"
      >
        <Icon
          icon="lucide:arrow-left"
          class="h-4 w-4"
        />
        Voltar e editar
      </BaseButton>
      <div class="flex gap-2">
        <BaseButton
          variant="outline"
          size="sm"
          @click="print"
        >
          <Icon
            icon="lucide:printer"
            class="h-4 w-4"
          />
          Imprimir / Salvar PDF
        </BaseButton>
        <BaseButton
          href="https://www.3wonline.com.br"
          external
          variant="hero"
          size="sm"
        >
          <Icon
            icon="lucide:sparkles"
            class="h-4 w-4"
          />
          Falar com a 3w Online
        </BaseButton>
      </div>
    </div>

    <!-- Documento -->
    <article
      id="documento-orcamento"
      class="container-app mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 shadow-card print:max-w-none print:rounded-none print:border-0 print:p-0 print:shadow-none md:p-10"
    >
      <!-- Cabeçalho -->
      <header class="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <AppLogo :size="40" />
          <p class="mt-3 text-sm text-muted-foreground">
            {{ COMPANY.name }} · {{ COMPANY.site }}<br>
            {{ COMPANY.email }} · {{ COMPANY.whatsapp }}
          </p>
        </div>
        <div class="text-left sm:text-right">
          <h1 class="text-2xl font-extrabold text-foreground">
            ORÇAMENTO
          </h1>
          <p class="mt-1 font-mono text-sm text-primary">
            {{ calc.budgetNumber }}
          </p>
          <p
            v-if="calc.issuedAt"
            class="mt-1 text-sm text-muted-foreground"
          >
            Emissão: {{ formatDate(calc.issuedAt) }}
          </p>
          <p
            v-if="calc.expiresAt"
            class="text-sm text-muted-foreground"
          >
            Válido até: <strong class="text-foreground">{{ formatDate(calc.expiresAt) }}</strong>
          </p>
        </div>
      </header>

      <!-- Dados do projeto/cliente -->
      <section class="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2">
        <div class="rounded-xl bg-secondary/40 p-4 print:bg-transparent print:p-0">
          <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Cliente
          </p>
          <p class="mt-1 text-lg font-bold text-foreground">
            {{ calc.clientName }}
          </p>
        </div>
        <div class="rounded-xl bg-secondary/40 p-4 print:bg-transparent print:p-0">
          <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Projeto
          </p>
          <p class="mt-1 text-lg font-bold text-foreground">
            {{ calc.projectName }}
          </p>
        </div>
      </section>

      <!-- Tabela de itens -->
      <section>
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="border-b-2 border-border text-left">
              <th class="py-2 font-semibold text-foreground">
                Tarefa
              </th>
              <th class="py-2 text-right font-semibold text-foreground">
                Horas
              </th>
              <th class="py-2 text-center font-semibold text-foreground">
                Complexidade
              </th>
              <th class="py-2 text-right font-semibold text-foreground">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="task in calc.tasks"
              :key="task.id"
              class="border-b border-border/60"
            >
              <td class="py-2.5 text-foreground">
                {{ task.name || "Tarefa sem nome" }}
                <span
                  v-if="task.technology"
                  class="block text-xs text-muted-foreground"
                >
                  {{ task.technology }}
                </span>
              </td>
              <td class="py-2.5 text-right text-muted-foreground">
                {{ task.hours }}h
              </td>
              <td class="py-2.5 text-center text-muted-foreground">
                {{ complexityLabel(task.complexity) }}
              </td>
              <td class="py-2.5 text-right font-medium text-foreground">
                {{ formatCurrency(calc.taskTotal(task)) }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Totais -->
      <section class="mt-6 flex flex-col gap-6 sm:flex-row sm:justify-between">
        <div class="space-y-1 text-sm text-muted-foreground">
          <p><strong class="text-foreground">Total de horas:</strong> {{ formatHours(calc.totalHours) }}</p>
          <p>
            <strong class="text-foreground">Prazo estimado:</strong>
            {{ calc.estimatedBusinessDays }} dia(s) útil(eis)
          </p>
          <p v-if="calc.estimatedDeliveryDate">
            <strong class="text-foreground">Entrega prevista:</strong>
            {{ formatDate(calc.estimatedDeliveryDate) }}
          </p>
          <p><strong class="text-foreground">Pagamento:</strong> {{ calc.paymentTerms }}</p>
        </div>

        <div class="w-full max-w-xs space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-muted-foreground">Subtotal</span>
            <span class="text-foreground">{{ formatCurrency(calc.subtotal) }}</span>
          </div>
          <div
            v-if="calc.discountAmount > 0"
            class="flex justify-between"
          >
            <span class="text-muted-foreground">Desconto ({{ calc.discountPercent }}%)</span>
            <span class="text-foreground">− {{ formatCurrency(calc.discountAmount) }}</span>
          </div>
          <div
            v-if="calc.taxAmount > 0"
            class="flex justify-between"
          >
            <span class="text-muted-foreground">Impostos ({{ calc.taxPercent }}%)</span>
            <span class="text-foreground">+ {{ formatCurrency(calc.taxAmount) }}</span>
          </div>
          <div class="flex justify-between border-t-2 border-border pt-2 text-base font-bold">
            <span class="text-foreground">Total</span>
            <span class="text-primary">{{ formatCurrency(calc.total) }}</span>
          </div>
        </div>
      </section>

      <!-- Observações -->
      <section
        v-if="calc.notes"
        class="mt-6 rounded-xl bg-secondary/40 p-4 text-sm print:bg-transparent print:p-0"
      >
        <p class="font-semibold text-foreground">
          Observações
        </p>
        <p class="mt-1 text-muted-foreground">
          {{ calc.notes }}
        </p>
      </section>

      <!-- Rodapé do documento -->
      <footer class="mt-8 border-t border-border pt-6 text-xs text-muted-foreground">
        <p v-if="calc.expiresAt">
          Este orçamento é válido até <strong>{{ formatDateLong(calc.expiresAt) }}</strong>. Após
          esta data, os valores e prazos estão sujeitos a reavaliação.
        </p>
        <p class="mt-2">
          Documento gerado pela Calculadora de Programadores — {{ COMPANY.name }}. Sistema
          desenvolvido pelo desenvolvedor HOTWYL | WILLFROMBRASIL.
        </p>
      </footer>
    </article>
  </div>
</template>

<style>
/* Versão de impressão: mostra apenas o documento do orçamento. */
@media print {
  header.sticky,
  footer,
  [aria-label="Trilha de navegação"],
  [aria-label="Falar no WhatsApp"] {
    display: none !important;
  }

  #documento-orcamento {
    color: #000 !important;
  }

  @page {
    margin: 1.5cm;
  }
}
</style>
