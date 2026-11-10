import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { z } from "zod";
import { addBusinessDays } from "@/lib/date";

export type Complexity = "low" | "medium" | "high";

export interface Task {
  id: string;
  name: string;
  hours: number;
  complexity: Complexity;
  technology: string;
}

export const complexityMultipliers: Record<Complexity, number> = {
  low: 1,
  medium: 1.5,
  high: 2.2,
};

export const complexityOptions = [
  { value: "low", label: "Baixa (1x)" },
  { value: "medium", label: "Média (1.5x)" },
  { value: "high", label: "Alta (2.2x)" },
];

export const urgencyOptions = [
  { value: "1", label: "Normal (1x)" },
  { value: "1.2", label: "Urgente (1.2x)" },
  { value: "1.5", label: "Muito Urgente (1.5x)" },
];

export const paymentOptions = [
  { value: "À vista (PIX/transferência)", label: "À vista (PIX/transferência)" },
  { value: "50% entrada + 50% na entrega", label: "50% entrada + 50% na entrega" },
  { value: "Parcelado em 3x", label: "Parcelado em 3x" },
  { value: "Mensal (recorrente)", label: "Mensal (recorrente)" },
];

export const technologies = [
  "Frontend (React/Vue/Angular)",
  "Backend (Node.js/Python/PHP)",
  "Mobile (React Native/Flutter)",
  "Fullstack",
  "DevOps/Infrastructure",
  "Design UI/UX",
  "Database",
  "API Integration",
  "Testing/QA",
];

export const technologyOptions = technologies.map((t) => ({ value: t, label: t }));

/** Schema de validação (Zod) para a geração do orçamento. */
export const budgetSchema = z.object({
  projectName: z.string().trim().min(1, "Informe o nome do projeto"),
  clientName: z.string().trim().min(1, "Informe o nome do cliente"),
  hourlyRate: z.number().positive("O valor por hora deve ser maior que zero"),
  tasks: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        hours: z.number(),
        complexity: z.enum(["low", "medium", "high"]),
        technology: z.string(),
      })
    )
    .min(1, "Adicione pelo menos uma tarefa"),
});

/** Gera um número de orçamento no formato ORC-AAAAMMDD-XXX. */
function generateBudgetNumber(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = String(Math.floor(Math.random() * 900) + 100);
  return `ORC-${y}${m}${d}-${rand}`;
}

/**
 * Store da calculadora de orçamentos. Centraliza estado e cálculos,
 * permitindo compartilhar os dados entre a ferramenta e a página de
 * impressão do orçamento.
 *
 * Fórmula base preservada: horas x valor/hora x complexidade x urgência.
 * Acrescenta prazo (dias úteis), desconto, impostos e metadados.
 */
export const useCalculatorStore = defineStore("calculator", () => {
  // Dados do projeto
  const projectName = ref("");
  const clientName = ref("");
  const hourlyRate = ref(50);
  const urgencyMultiplier = ref(1);
  const tasks = ref<Task[]>([]);

  // Comerciais
  const discountPercent = ref(0);
  const taxPercent = ref(0);
  const hoursPerDay = ref(6);
  const validityDays = ref(15);
  const paymentTerms = ref(paymentOptions[0].value);
  const notes = ref("");

  // Metadados gerados ao emitir o orçamento
  const budgetNumber = ref("");
  const issuedAt = ref<Date | null>(null);

  function addTask() {
    tasks.value.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: "",
      hours: 0,
      complexity: "medium",
      technology: "",
    });
  }

  function updateTask<K extends keyof Task>(id: string, field: K, value: Task[K]) {
    const task = tasks.value.find((t) => t.id === id);
    if (task) task[field] = value;
  }

  function removeTask(id: string) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }

  function taskTotal(task: Task): number {
    return (
      task.hours * hourlyRate.value * complexityMultipliers[task.complexity] * urgencyMultiplier.value
    );
  }

  /** Horas efetivas de uma tarefa (com complexidade e urgência aplicadas). */
  function taskEffectiveHours(task: Task): number {
    return task.hours * complexityMultipliers[task.complexity] * urgencyMultiplier.value;
  }

  const totalHours = computed(() =>
    tasks.value.reduce((sum, t) => sum + taskEffectiveHours(t), 0)
  );

  /** Soma bruta antes de desconto e impostos. */
  const subtotal = computed(() => tasks.value.reduce((sum, t) => sum + taskTotal(t), 0));

  const discountAmount = computed(() => subtotal.value * (clamp(discountPercent.value) / 100));

  const taxableBase = computed(() => subtotal.value - discountAmount.value);

  const taxAmount = computed(() => taxableBase.value * (clamp(taxPercent.value) / 100));

  /** Total final após desconto e impostos. */
  const total = computed(() => taxableBase.value + taxAmount.value);

  /** Prazo estimado em dias úteis (mínimo 1 se houver horas). */
  const estimatedBusinessDays = computed(() => {
    const perDay = hoursPerDay.value > 0 ? hoursPerDay.value : 1;
    const days = Math.ceil(totalHours.value / perDay);
    return totalHours.value > 0 ? Math.max(1, days) : 0;
  });

  /** Data prevista de entrega, a partir de hoje, em dias úteis. */
  const estimatedDeliveryDate = computed(() =>
    estimatedBusinessDays.value > 0
      ? addBusinessDays(new Date(), estimatedBusinessDays.value)
      : null
  );

  /** Data de expiração do orçamento (emissão + validade em dias corridos). */
  const expiresAt = computed(() => {
    if (!issuedAt.value) return null;
    const d = new Date(issuedAt.value);
    d.setDate(d.getDate() + clampInt(validityDays.value, 1, 365));
    return d;
  });

  function validate() {
    return budgetSchema.safeParse({
      projectName: projectName.value,
      clientName: clientName.value,
      hourlyRate: hourlyRate.value,
      tasks: tasks.value,
    });
  }

  /** Marca o orçamento como emitido, gerando número e data. */
  function issue() {
    budgetNumber.value = generateBudgetNumber();
    issuedAt.value = new Date();
  }

  const isIssued = computed(() => !!budgetNumber.value && !!issuedAt.value);

  function reset() {
    projectName.value = "";
    clientName.value = "";
    hourlyRate.value = 50;
    urgencyMultiplier.value = 1;
    tasks.value = [];
    discountPercent.value = 0;
    taxPercent.value = 0;
    hoursPerDay.value = 6;
    validityDays.value = 15;
    paymentTerms.value = paymentOptions[0].value;
    notes.value = "";
    budgetNumber.value = "";
    issuedAt.value = null;
  }

  return {
    // estado
    projectName,
    clientName,
    hourlyRate,
    urgencyMultiplier,
    tasks,
    discountPercent,
    taxPercent,
    hoursPerDay,
    validityDays,
    paymentTerms,
    notes,
    budgetNumber,
    issuedAt,
    // getters
    totalHours,
    subtotal,
    discountAmount,
    taxAmount,
    total,
    estimatedBusinessDays,
    estimatedDeliveryDate,
    expiresAt,
    isIssued,
    // ações
    addTask,
    updateTask,
    removeTask,
    taskTotal,
    taskEffectiveHours,
    validate,
    issue,
    reset,
  };
});

/** Limita um percentual entre 0 e 100. */
function clamp(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

/** Limita um inteiro entre min e max. */
function clampInt(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}
