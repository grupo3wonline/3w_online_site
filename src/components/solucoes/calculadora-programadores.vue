<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type Complexity = 'low' | 'medium' | 'high'

interface Task { id: string; name: string; hours: number; complexity: Complexity; technology: string }

const COMPLEXITY_MULT: Record<Complexity, number> = { low: 1, medium: 1.5, high: 2.2 }
const COMPLEXITY_LABELS: Record<Complexity, string> = { low: 'Baixa (1×)', medium: 'Média (1.5×)', high: 'Alta (2.2×)' }

const technologies = [
  'Frontend (React/Vue/Angular)', 'Backend (Node.js/Python/PHP)', 'Mobile (React Native/Flutter)',
  'Fullstack', 'DevOps/Infrastructure', 'Design UI/UX', 'Database', 'API Integration', 'Testing/QA',
]

const projectName = ref('')
const clientName = ref('')
const hourlyRate = ref(100)
const urgency = ref(1)
const paymentForm = ref('À vista (PIX/transferência)')
const tasks = ref<Task[]>([])
const newTask = reactive<Omit<Task, 'id'>>({ name: '', hours: 0, complexity: 'medium', technology: technologies[0] })

function addTask() {
  if (!newTask.name.trim() || newTask.hours <= 0) {
    Swal.fire({ icon: 'warning', title: 'Preencha o nome e as horas da tarefa', confirmButtonColor: '#7c3aed' }); return
  }
  tasks.value.push({ ...newTask, id: Date.now().toString() })
  newTask.name = ''; newTask.hours = 0; newTask.complexity = 'medium'; newTask.technology = technologies[0]
}

function removeTask(id: string) { tasks.value = tasks.value.filter(t => t.id !== id) }

const totalHours = computed(() => tasks.value.reduce((sum, t) => sum + t.hours * COMPLEXITY_MULT[t.complexity], 0))
const totalValue = computed(() => totalHours.value * hourlyRate.value * urgency.value)
const deliveryDays = computed(() => Math.ceil(totalHours.value / 6)) // 6h/dia

function gerarOrcamento() {
  if (!projectName.value || !clientName.value) {
    Swal.fire({ icon: 'warning', title: 'Informe o nome do projeto e do cliente', confirmButtonColor: '#7c3aed' }); return
  }
  if (tasks.value.length === 0) {
    Swal.fire({ icon: 'warning', title: 'Adicione pelo menos uma tarefa', confirmButtonColor: '#7c3aed' }); return
  }
  const budgetNo = `ORC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 900) + 100}`
  Swal.fire({
    icon: 'success',
    title: `Orçamento ${budgetNo}`,
    html: `
      <div style="text-align:left;font-size:0.875rem">
        <p><strong>Projeto:</strong> ${projectName.value}</p>
        <p><strong>Cliente:</strong> ${clientName.value}</p>
        <p><strong>Tarefas:</strong> ${tasks.value.length}</p>
        <p><strong>Horas totais:</strong> ${totalHours.value.toFixed(1)}h</p>
        <p><strong>Valor:</strong> <span style="color:#7c3aed;font-weight:700;font-size:1.1rem">${fmt(totalValue.value)}</span></p>
        <p><strong>Prazo:</strong> ${deliveryDays.value} dias úteis</p>
        <p><strong>Pagamento:</strong> ${paymentForm.value}</p>
      </div>`,
    confirmButtonColor: '#7c3aed',
  })
}

function fmt(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:code-braces" class="text-purple-400 w-7 h-7" />
        Calculadora para Programadores
      </h1>
      <p class="text-blue-200 text-sm">Estime projetos de desenvolvimento, horas e gere orçamentos profissionais</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Configurações do projeto -->
      <div class="lg:col-span-2 space-y-4">
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
          <h2 class="text-white font-semibold text-sm flex items-center gap-2">
            <Icon icon="mdi:briefcase-outline" class="text-purple-400 w-4 h-4" /> Informações do Projeto
          </h2>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Nome do Projeto</label>
              <input v-model="projectName" type="text" autocomplete="off" placeholder="Ex: E-commerce"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Nome do Cliente</label>
              <input v-model="clientName" type="text" autocomplete="off" placeholder="Ex: Empresa ABC"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Valor/Hora (R$)</label>
              <input v-model.number="hourlyRate" type="number" min="1" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Urgência</label>
              <select v-model.number="urgency" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50">
                <option value="1">Normal (1×)</option>
                <option value="1.2">Urgente (1.2×)</option>
                <option value="1.5">Muito Urgente (1.5×)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="text-blue-200 text-xs font-medium block mb-1">Forma de Pagamento</label>
            <select v-model="paymentForm" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50">
              <option>À vista (PIX/transferência)</option>
              <option>50% entrada + 50% na entrega</option>
              <option>Parcelado em 3x</option>
              <option>Mensal (recorrente)</option>
            </select>
          </div>
        </div>

        <!-- Nova tarefa -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
          <h2 class="text-white font-semibold text-sm flex items-center gap-2">
            <Icon icon="mdi:plus-circle-outline" class="text-purple-400 w-4 h-4" /> Adicionar Tarefa
          </h2>
          <div class="grid grid-cols-2 gap-3">
            <div class="col-span-2">
              <label class="text-blue-200 text-xs font-medium block mb-1">Nome da Tarefa</label>
              <input v-model="newTask.name" type="text" autocomplete="off" placeholder="Ex: Implementar autenticação"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Horas Estimadas</label>
              <input v-model.number="newTask.hours" type="number" min="0.5" step="0.5" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Complexidade</label>
              <select v-model="newTask.complexity" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50">
                <option v-for="(label, key) in COMPLEXITY_LABELS" :key="key" :value="key">{{ label }}</option>
              </select>
            </div>
            <div class="col-span-2">
              <label class="text-blue-200 text-xs font-medium block mb-1">Tecnologia</label>
              <select v-model="newTask.technology" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50">
                <option v-for="t in technologies" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
          </div>
          <button @click="addTask" class="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
            <Icon icon="mdi:plus" class="w-4 h-4" /> Adicionar Tarefa
          </button>
        </div>

        <!-- Lista de tarefas -->
        <div v-if="tasks.length" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-2">
          <h3 class="text-white text-sm font-semibold mb-2">Tarefas ({{ tasks.length }})</h3>
          <div v-for="t in tasks" :key="t.id" class="flex items-center justify-between bg-black/20 rounded-lg p-2.5 text-sm">
            <div class="flex-1 min-w-0 mr-2">
              <div class="text-white font-medium truncate">{{ t.name }}</div>
              <div class="text-blue-300 text-xs">{{ t.technology }} · {{ t.hours }}h · {{ COMPLEXITY_LABELS[t.complexity] }}</div>
            </div>
            <div class="text-purple-300 font-bold text-sm mr-2">{{ fmt(t.hours * COMPLEXITY_MULT[t.complexity] * hourlyRate * urgency) }}</div>
            <button @click="removeTask(t.id)" class="text-red-400 hover:text-red-300 p-1">
              <Icon icon="mdi:close" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Resumo -->
      <div class="space-y-4">
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4 sticky top-4">
          <h2 class="text-white font-semibold text-sm flex items-center gap-2">
            <Icon icon="mdi:receipt-text-outline" class="text-purple-400 w-4 h-4" /> Resumo
          </h2>
          <div class="bg-gradient-to-br from-purple-700 to-violet-700 rounded-xl p-5 text-center">
            <div class="text-white/80 text-xs mb-1">Valor Total do Projeto</div>
            <div class="text-3xl font-black text-white">{{ fmt(totalValue) }}</div>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-blue-200">Tarefas</span><span class="text-white">{{ tasks.length }}</span></div>
            <div class="flex justify-between"><span class="text-blue-200">Horas totais</span><span class="text-white">{{ totalHours.toFixed(1) }}h</span></div>
            <div class="flex justify-between"><span class="text-blue-200">Prazo estimado</span><span class="text-white">{{ deliveryDays }} dias úteis</span></div>
            <div class="flex justify-between"><span class="text-blue-200">Pagamento</span><span class="text-white truncate ml-2 text-right text-xs">{{ paymentForm }}</span></div>
          </div>
          <button @click="gerarOrcamento" class="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
            <Icon icon="mdi:file-document-outline" class="w-4 h-4" /> Gerar Orçamento
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
