<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <i class="fas fa-globe text-blue-600 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Calculadora de Site</h1>
        <p class="text-gray-600">Estime o custo de desenvolvimento do seu site</p>
      </div>

      <div class="space-y-6">
        <!-- Tipo de Site -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            <i class="fas fa-layer-group mr-2 text-blue-600"></i>
            Tipo de Site
          </label>
          <select 
            v-model="tipoSite" 
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="landing">Landing Page</option>
            <option value="institucional">Site Institucional</option>
            <option value="portfolio">Portfólio</option>
            <option value="ecommerce">E-commerce</option>
            <option value="blog">Blog</option>
            <option value="webapp">Aplicação Web</option>
          </select>
        </div>

        <!-- Número de Páginas -->
        <BaseInput
          v-model="numeroPaginas"
          label="Número de Páginas"
          type="number"
          :min="1"
          :max="100"
          icon="fa-solid fa-file"
        />

        <!-- Funcionalidades -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            <i class="fas fa-cogs mr-2 text-blue-600"></i>
            Funcionalidades Adicionais
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <input type="checkbox" v-model="funcionalidades.formulario" class="mr-3">
              <span>Formulário de Contato</span>
            </label>
            <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <input type="checkbox" v-model="funcionalidades.blog" class="mr-3">
              <span>Blog/Notícias</span>
            </label>
            <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <input type="checkbox" v-model="funcionalidades.galeria" class="mr-3">
              <span>Galeria de Imagens</span>
            </label>
            <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <input type="checkbox" v-model="funcionalidades.multiidioma" class="mr-3">
              <span>Multi-idioma</span>
            </label>
            <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <input type="checkbox" v-model="funcionalidades.areaMembro" class="mr-3">
              <span>Área de Membros</span>
            </label>
            <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <input type="checkbox" v-model="funcionalidades.pagamento" class="mr-3">
              <span>Integração Pagamento</span>
            </label>
            <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <input type="checkbox" v-model="funcionalidades.chat" class="mr-3">
              <span>Chat Online</span>
            </label>
            <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <input type="checkbox" v-model="funcionalidades.api" class="mr-3">
              <span>Integração API</span>
            </label>
          </div>
        </div>

        <!-- Design -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            <i class="fas fa-palette mr-2 text-blue-600"></i>
            Complexidade do Design
          </label>
          <select 
            v-model="complexidadeDesign" 
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="basico">Básico (Template)</option>
            <option value="intermediario">Intermediário (Customizado)</option>
            <option value="avancado">Avançado (Premium)</option>
            <option value="personalizado">Totalmente Personalizado</option>
          </select>
        </div>

        <!-- Prazo -->
        <BaseInput
          v-model="prazo"
          label="Prazo de Entrega (dias)"
          type="number"
          :min="7"
          :max="365"
          icon="fa-solid fa-calendar"
        />

        <!-- Botões -->
        <div class="flex gap-4">
          <BaseButton @click="calcular" variant="primary" class="flex-1">
            <i class="fas fa-calculator mr-2"></i>
            Calcular Orçamento
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Resultado -->
        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Orçamento Estimado</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.valorTotal }}</div>
            <div class="text-blue-100">{{ resultado.complexidade }}</div>
          </div>

          <!-- Breakdown -->
          <div class="bg-gray-50 rounded-lg p-6 space-y-3">
            <h4 class="font-semibold text-gray-900 mb-4">Composição do Orçamento</h4>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Valor Base ({{ tipoSiteLabel }}):</span>
              <span class="font-medium">R$ {{ resultado.valorBase }}</span>
            </div>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Páginas ({{ numeroPaginas }} páginas):</span>
              <span class="font-medium">R$ {{ resultado.valorPaginas }}</span>
            </div>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Funcionalidades ({{ funcionalidadesCount }} itens):</span>
              <span class="font-medium">R$ {{ resultado.valorFuncionalidades }}</span>
            </div>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Design ({{ complexidadeLabel }}):</span>
              <span class="font-medium">R$ {{ resultado.valorDesign }}</span>
            </div>
            
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Urgência ({{ prazo }} dias):</span>
              <span class="font-medium">R$ {{ resultado.valorUrgencia }}</span>
            </div>
            
            <div class="border-t pt-3 flex justify-between font-semibold">
              <span>Total:</span>
              <span class="text-blue-600">R$ {{ resultado.valorTotal }}</span>
            </div>
          </div>

          <!-- Métricas -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600">{{ resultado.prazoDesenvolvimento }}</div>
              <div class="text-sm text-gray-600">Dias Desenvolvimento</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600">R$ {{ resultado.valorHora }}</div>
              <div class="text-sm text-gray-600">Valor/Hora</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600">{{ resultado.horasEstimadas }}</div>
              <div class="text-sm text-gray-600">Horas Trabalho</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600">R$ {{ resultado.manutencaoMensal }}</div>
              <div class="text-sm text-gray-600">Manutenção/Mês</div>
            </div>
          </div>

          <!-- Dicas -->
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4">
            <div class="flex">
              <i class="fas fa-lightbulb text-blue-600 mt-1 mr-3"></i>
              <div class="text-sm text-blue-800">
                <p class="font-semibold mb-2">Dicas para seu projeto:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>{{ resultado.dica1 }}</li>
                  <li>{{ resultado.dica2 }}</li>
                  <li>{{ resultado.dica3 }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'

const tipoSite = ref('institucional')
const numeroPaginas = ref(5)
const prazo = ref(30)
const complexidadeDesign = ref('intermediario')

const funcionalidades = ref({
  formulario: true,
  blog: false,
  galeria: false,
  multiidioma: false,
  areaMembro: false,
  pagamento: false,
  chat: false,
  api: false
})

const resultado = ref(null)

const valoresTipoSite = {
  landing: 1500,
  institucional: 3000,
  portfolio: 2500,
  ecommerce: 8000,
  blog: 2000,
  webapp: 12000
}

const valoresDesign = {
  basico: 0,
  intermediario: 1000,
  avancado: 2500,
  personalizado: 5000
}

const valoresFuncionalidades = {
  formulario: 300,
  blog: 1500,
  galeria: 500,
  multiidioma: 2000,
  areaMembro: 3000,
  pagamento: 2500,
  chat: 800,
  api: 2000
}

const tipoSiteLabel = computed(() => {
  const labels = {
    landing: 'Landing Page',
    institucional: 'Site Institucional',
    portfolio: 'Portfólio',
    ecommerce: 'E-commerce',
    blog: 'Blog',
    webapp: 'Aplicação Web'
  }
  return labels[tipoSite.value]
})

const complexidadeLabel = computed(() => {
  const labels = {
    basico: 'Básico',
    intermediario: 'Intermediário',
    avancado: 'Avançado',
    personalizado: 'Personalizado'
  }
  return labels[complexidadeDesign.value]
})

const funcionalidadesCount = computed(() => {
  return Object.values(funcionalidades.value).filter(Boolean).length
})

const calcular = () => {
  const valorBase = valoresTipoSite[tipoSite.value]
  const valorPaginas = (Number(numeroPaginas.value) - 1) * 300
  
  let valorFuncionalidades = 0
  Object.keys(funcionalidades.value).forEach(key => {
    if (funcionalidades.value[key]) {
      valorFuncionalidades += valoresFuncionalidades[key]
    }
  })
  
  const valorDesign = valoresDesign[complexidadeDesign.value]
  
  // Ajuste por urgência
  let multiplicadorUrgencia = 1
  if (prazo.value < 15) {
    multiplicadorUrgencia = 1.5
  } else if (prazo.value < 30) {
    multiplicadorUrgencia = 1.2
  }
  
  const subtotal = valorBase + valorPaginas + valorFuncionalidades + valorDesign
  const valorUrgencia = subtotal * (multiplicadorUrgencia - 1)
  const valorTotal = Math.round(subtotal * multiplicadorUrgencia)
  
  const valorHora = 80
  const horasEstimadas = Math.round(valorTotal / valorHora)
  const prazoDesenvolvimento = Math.max(Number(prazo.value), Math.ceil(horasEstimadas / 8))
  const manutencaoMensal = Math.round(valorTotal * 0.05)
  
  let dicas = []
  if (multiplicadorUrgencia > 1) {
    dicas.push('Prazo curto aumenta o custo em até 50%')
  } else {
    dicas.push('Prazos flexíveis permitem melhor planejamento')
  }
  
  if (funcionalidadesCount.value > 5) {
    dicas.push('Considere desenvolver em fases para reduzir custos iniciais')
  } else {
    dicas.push('Escopo bem definido facilita o desenvolvimento')
  }
  
  if (tipoSite.value === 'ecommerce' || tipoSite.value === 'webapp') {
    dicas.push('Projetos complexos requerem manutenção contínua')
  } else {
    dicas.push('Invista em SEO para melhor visibilidade online')
  }

  resultado.value = {
    valorBase: valorBase.toLocaleString('pt-BR'),
    valorPaginas: valorPaginas.toLocaleString('pt-BR'),
    valorFuncionalidades: valorFuncionalidades.toLocaleString('pt-BR'),
    valorDesign: valorDesign.toLocaleString('pt-BR'),
    valorUrgencia: Math.round(valorUrgencia).toLocaleString('pt-BR'),
    valorTotal: valorTotal.toLocaleString('pt-BR'),
    valorHora: valorHora.toLocaleString('pt-BR'),
    horasEstimadas,
    prazoDesenvolvimento,
    manutencaoMensal: manutencaoMensal.toLocaleString('pt-BR'),
    complexidade: `${horasEstimadas}h de desenvolvimento`,
    dica1: dicas[0],
    dica2: dicas[1],
    dica3: dicas[2]
  }
}

const limpar = () => {
  tipoSite.value = 'institucional'
  numeroPaginas.value = 5
  prazo.value = 30
  complexidadeDesign.value = 'intermediario'
  funcionalidades.value = {
    formulario: true,
    blog: false,
    galeria: false,
    multiidioma: false,
    areaMembro: false,
    pagamento: false,
    chat: false,
    api: false
  }
  resultado.value = null
}
</script>
