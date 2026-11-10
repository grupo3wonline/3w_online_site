<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import {
  useCalculatorStore,
  complexityOptions,
  urgencyOptions,
  technologyOptions,
  paymentOptions,
} from "@/stores/calculator";
import { formatCurrency, formatHours } from "@/lib/format";
import { formatDate } from "@/lib/date";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import HelpButton from "@/components/ui/HelpButton.vue";

const PRIMARY = "#7c3aed";
const router = useRouter();
const calc = useCalculatorStore();

async function generateBudget() {
  const result = calc.validate();
  if (!result.success) {
    const firstError = result.error.issues[0]?.message ?? "Verifique os campos.";
    await Swal.fire({
      title: "Campos obrigatórios",
      text: firstError,
      icon: "warning",
      confirmButtonColor: PRIMARY,
    });
    return;
  }

  calc.issue();
  await router.push({ name: "budget" });
}

async function clearAll() {
  if (calc.tasks.length === 0 && !calc.projectName && !calc.clientName) {
    calc.reset();
    return;
  }
  const { isConfirmed } = await Swal.fire({
    title: "Limpar tudo?",
    text: "Isto irá remover todas as tarefas e dados preenchidos.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: PRIMARY,
    confirmButtonText: "Sim, limpar",
    cancelButtonText: "Cancelar",
  });
  if (isConfirmed) calc.reset();
}

async function requestCustomProject() {
  const { isConfirmed } = await Swal.fire({
    title: "Precisa de um sistema sob medida?",
    text: "O Grupo 3w Online desenvolve sites e sistemas personalizados sob demanda. Fale com um especialista agora.",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: PRIMARY,
    confirmButtonText: "Falar com a 3w Online",
    cancelButtonText: "Agora não",
  });
  if (isConfirmed) window.open("https://www.3wonline.com.br", "_blank", "noopener");
}
</script>

<template>
  <section
    id="calculadora"
    class="py-4"
  >
    <div class="container-app">
      <div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Configurações e tarefas -->
        <div class="space-y-6 lg:col-span-2">
          <div class="surface-card p-6">
            <div class="mb-5 flex items-center justify-between gap-2">
              <h3 class="flex items-center gap-2 text-lg font-bold text-foreground">
                <Icon
                  icon="lucide:calculator"
                  class="h-5 w-5 text-primary"
                />
                Informações do Projeto
              </h3>
              <button
                type="button"
                class="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                @click="clearAll"
              >
                <Icon
                  icon="lucide:eraser"
                  class="h-4 w-4"
                />
                Limpar
              </button>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  for="projectName"
                  class="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Nome do Projeto
                  <HelpButton text="Como o projeto será identificado no orçamento." />
                </label>
                <BaseInput
                  id="projectName"
                  v-model="calc.projectName"
                  placeholder="Ex: Sistema de E-commerce"
                  aria-label="Nome do projeto"
                />
              </div>
              <div>
                <label
                  for="clientName"
                  class="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Nome do Cliente
                  <HelpButton text="Para quem o orçamento será emitido." />
                </label>
                <BaseInput
                  id="clientName"
                  v-model="calc.clientName"
                  placeholder="Ex: Empresa ABC Ltda"
                  aria-label="Nome do cliente"
                />
              </div>
            </div>

            <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  for="hourlyRate"
                  class="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Valor por Hora (R$)
                  <HelpButton text="Sua taxa horária. Dica: some custos, impostos e sua margem de lucro." />
                </label>
                <BaseInput
                  id="hourlyRate"
                  v-model="calc.hourlyRate"
                  type="number"
                  :min="1"
                  aria-label="Valor por hora"
                />
              </div>
              <div>
                <label
                  for="urgency"
                  class="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Multiplicador de Urgência
                  <HelpButton text="Projetos com prazo apertado valem mais. Ajuste conforme a urgência." />
                </label>
                <BaseSelect
                  id="urgency"
                  :model-value="String(calc.urgencyMultiplier)"
                  :options="urgencyOptions"
                  aria-label="Multiplicador de urgência"
                  @update:model-value="calc.urgencyMultiplier = Number($event)"
                />
              </div>
            </div>
          </div>

          <!-- Tarefas -->
          <div class="surface-card p-6">
            <div class="mb-5 flex items-center justify-between gap-2">
              <h3 class="text-lg font-bold text-foreground">
                Tarefas do Projeto
                <span
                  v-if="calc.tasks.length"
                  class="text-muted-foreground"
                >
                  ({{ calc.tasks.length }})
                </span>
              </h3>
              <BaseButton
                size="sm"
                @click="calc.addTask()"
              >
                <Icon
                  icon="lucide:plus"
                  class="h-4 w-4"
                />
                Adicionar Tarefa
              </BaseButton>
            </div>

            <div
              v-if="calc.tasks.length === 0"
              class="flex flex-col items-center rounded-2xl border border-dashed border-border bg-secondary/30 px-4 py-12 text-center text-muted-foreground"
            >
              <span class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon
                  icon="lucide:list-plus"
                  class="h-7 w-7"
                />
              </span>
              <p class="font-medium text-foreground">
                Nenhuma tarefa ainda
              </p>
              <p class="mt-1 max-w-sm text-sm">
                Adicione tarefas para começar. Dica: quebre o projeto em partes pequenas para
                estimativas mais precisas.
              </p>
              <BaseButton
                size="sm"
                variant="outline"
                class="mt-4"
                @click="calc.addTask()"
              >
                <Icon
                  icon="lucide:plus"
                  class="h-4 w-4"
                />
                Adicionar primeira tarefa
              </BaseButton>
            </div>

            <div
              v-else
              class="space-y-3"
            >
              <div
                v-for="task in calc.tasks"
                :key="task.id"
                class="grid grid-cols-1 gap-3 rounded-xl border border-border bg-secondary/30 p-4 md:grid-cols-12"
              >
                <div class="md:col-span-4">
                  <label class="mb-1 block text-xs font-medium text-muted-foreground">Nome da Tarefa</label>
                  <BaseInput
                    :model-value="task.name"
                    placeholder="Ex: Desenvolvimento da API"
                    aria-label="Nome da tarefa"
                    @update:model-value="calc.updateTask(task.id, 'name', String($event))"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="mb-1 block text-xs font-medium text-muted-foreground">Horas</label>
                  <BaseInput
                    :model-value="task.hours"
                    type="number"
                    :min="0"
                    :step="0.5"
                    aria-label="Horas da tarefa"
                    @update:model-value="calc.updateTask(task.id, 'hours', Number($event))"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="mb-1 block text-xs font-medium text-muted-foreground">Complexidade</label>
                  <BaseSelect
                    :model-value="task.complexity"
                    :options="complexityOptions"
                    aria-label="Complexidade da tarefa"
                    @update:model-value="calc.updateTask(task.id, 'complexity', $event as any)"
                  />
                </div>
                <div class="md:col-span-3">
                  <label class="mb-1 block text-xs font-medium text-muted-foreground">Tecnologia</label>
                  <BaseSelect
                    :model-value="task.technology"
                    :options="technologyOptions"
                    placeholder="Selecione"
                    aria-label="Tecnologia da tarefa"
                    @update:model-value="calc.updateTask(task.id, 'technology', $event)"
                  />
                </div>
                <div class="flex items-end md:col-span-1">
                  <BaseButton
                    variant="outline"
                    size="icon"
                    class="text-destructive hover:border-destructive hover:bg-destructive hover:text-destructive-foreground"
                    aria-label="Remover tarefa"
                    @click="calc.removeTask(task.id)"
                  >
                    <Icon
                      icon="lucide:trash-2"
                      class="h-4 w-4"
                    />
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>

          <!-- Condições comerciais -->
          <div class="surface-card p-6">
            <h3 class="mb-5 flex items-center gap-2 text-lg font-bold text-foreground">
              <Icon
                icon="lucide:receipt-text"
                class="h-5 w-5 text-primary"
              />
              Condições Comerciais
            </h3>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label
                  for="discount"
                  class="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Desconto (%)
                  <HelpButton text="Percentual de desconto aplicado sobre o subtotal." />
                </label>
                <BaseInput
                  id="discount"
                  v-model="calc.discountPercent"
                  type="number"
                  :min="0"
                  :step="1"
                  aria-label="Desconto em porcentagem"
                />
              </div>
              <div>
                <label
                  for="tax"
                  class="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Impostos (%)
                  <HelpButton text="Percentual de impostos/taxas aplicado após o desconto." />
                </label>
                <BaseInput
                  id="tax"
                  v-model="calc.taxPercent"
                  type="number"
                  :min="0"
                  :step="1"
                  aria-label="Impostos em porcentagem"
                />
              </div>
              <div>
                <label
                  for="hoursPerDay"
                  class="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Horas/dia
                  <HelpButton text="Quantas horas você dedica ao projeto por dia útil. Usado para estimar o prazo." />
                </label>
                <BaseInput
                  id="hoursPerDay"
                  v-model="calc.hoursPerDay"
                  type="number"
                  :min="1"
                  :step="1"
                  aria-label="Horas por dia"
                />
              </div>
              <div>
                <label
                  for="validity"
                  class="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Validade (dias)
                  <HelpButton text="Por quantos dias o orçamento permanece válido após a emissão." />
                </label>
                <BaseInput
                  id="validity"
                  v-model="calc.validityDays"
                  type="number"
                  :min="1"
                  :step="1"
                  aria-label="Validade em dias"
                />
              </div>
            </div>

            <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  for="payment"
                  class="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Forma de Pagamento
                  <HelpButton text="Condição de pagamento sugerida ao cliente." />
                </label>
                <BaseSelect
                  id="payment"
                  v-model="calc.paymentTerms"
                  :options="paymentOptions"
                  aria-label="Forma de pagamento"
                />
              </div>
              <div>
                <label
                  for="notes"
                  class="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Observações
                  <HelpButton text="Notas adicionais que aparecerão no orçamento (opcional)." />
                </label>
                <BaseInput
                  id="notes"
                  v-model="calc.notes"
                  placeholder="Ex: Não inclui hospedagem"
                  aria-label="Observações"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Resumo -->
        <div class="space-y-6">
          <div class="surface-card sticky top-20 overflow-hidden">
            <div class="bg-gradient-primary p-6 text-primary-foreground">
              <p class="text-sm font-medium opacity-90">
                Total estimado
              </p>
              <p class="mt-1 text-3xl font-extrabold">
                {{ formatCurrency(calc.total) }}
              </p>
            </div>

            <div class="space-y-3 p-6">
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Subtotal</span>
                <span class="font-medium text-foreground">{{ formatCurrency(calc.subtotal) }}</span>
              </div>
              <div
                v-if="calc.discountAmount > 0"
                class="flex justify-between text-sm"
              >
                <span class="text-muted-foreground">Desconto ({{ calc.discountPercent }}%)</span>
                <span class="font-medium text-success">− {{ formatCurrency(calc.discountAmount) }}</span>
              </div>
              <div
                v-if="calc.taxAmount > 0"
                class="flex justify-between text-sm"
              >
                <span class="text-muted-foreground">Impostos ({{ calc.taxPercent }}%)</span>
                <span class="font-medium text-foreground">+ {{ formatCurrency(calc.taxAmount) }}</span>
              </div>

              <div class="border-t border-border pt-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Total de Horas</span>
                  <BaseBadge variant="secondary">
                    {{ formatHours(calc.totalHours) }}
                  </BaseBadge>
                </div>
                <div class="mt-3 flex justify-between">
                  <span class="text-muted-foreground">Prazo estimado</span>
                  <BaseBadge variant="secondary">
                    {{ calc.estimatedBusinessDays }} dia(s) útil(eis)
                  </BaseBadge>
                </div>
                <div
                  v-if="calc.estimatedDeliveryDate"
                  class="mt-3 flex justify-between"
                >
                  <span class="text-muted-foreground">Entrega prevista</span>
                  <span class="font-medium text-foreground">
                    {{ formatDate(calc.estimatedDeliveryDate) }}
                  </span>
                </div>
              </div>

              <div class="space-y-3 pt-2">
                <BaseButton
                  variant="hero"
                  class="w-full"
                  @click="generateBudget"
                >
                  <Icon
                    icon="lucide:file-text"
                    class="h-4 w-4"
                  />
                  Gerar Orçamento
                </BaseButton>
                <BaseButton
                  variant="outline"
                  class="w-full"
                  @click="requestCustomProject"
                >
                  <Icon
                    icon="lucide:sparkles"
                    class="h-4 w-4"
                  />
                  Projeto sob medida
                </BaseButton>
              </div>

              <div
                v-if="calc.tasks.length > 0"
                class="mt-2 rounded-xl bg-secondary/40 p-3 text-xs text-muted-foreground"
              >
                <p class="mb-2 font-semibold text-foreground">
                  Detalhamento
                </p>
                <div
                  v-for="task in calc.tasks"
                  :key="task.id"
                  class="mb-1 flex justify-between gap-2"
                >
                  <span class="truncate">{{ task.name || "Tarefa sem nome" }}</span>
                  <span class="shrink-0">{{ formatCurrency(calc.taskTotal(task)) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
