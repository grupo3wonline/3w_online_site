<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <i class="fas fa-id-card text-blue-600 dark:text-blue-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de CPF e CNPJ</h1>
        <p class="text-gray-600 dark:text-gray-400">Gere CPF e CNPJ válidos para testes e desenvolvimento</p>
      </div>

      <div class="space-y-6">
        <!-- Tipo de Documento -->
        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button
            @click="tipo = 'cpf'; gerar()"
            class="flex-1 py-4 px-4 rounded-lg font-medium transition-colors"
            :class="tipo === 'cpf' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
          >
            <i class="fas fa-user text-2xl mb-2"></i>
            <div class="text-sm">CPF</div>
          </button>
          <button
            @click="tipo = 'cnpj'; gerar()"
            class="flex-1 py-4 px-4 rounded-lg font-medium transition-colors"
            :class="tipo === 'cnpj' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
          >
            <i class="fas fa-building text-2xl mb-2"></i>
            <div class="text-sm">CNPJ</div>
          </button>
        </div>

        <!-- Quantidade -->
        <BaseInput
          v-model="quantidade"
          label="Quantidade"
          type="number"
          :min="1"
          :max="50"
          icon="fa-solid fa-hashtag"
        />

        <!-- Formatação -->
        <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <input
            type="checkbox"
            id="formatado"
            v-model="formatado"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          >
          <label for="formatado" class="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            Gerar com formatação (pontos e hífens)
          </label>
        </div>

        <!-- Botões -->
        <div class="flex gap-4">
          <BaseButton @click="gerar" variant="primary" class="flex-1">
            <i class="fas fa-rotate mr-2"></i>
            Gerar {{ tipo.toUpperCase() }}
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Documentos Gerados -->
        <div v-if="documentos.length > 0" class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                {{ documentos.length }} {{ tipo.toUpperCase() }}(s) gerado(s)
              </h3>
              <div class="flex gap-2">
                <BaseButton @click="copiarTodos" variant="outline" size="sm">
                  <i class="fas fa-copy mr-2"></i>
                  Copiar Todos
                </BaseButton>
                <BaseButton @click="baixarTxt" variant="outline" size="sm">
                  <i class="fas fa-download mr-2"></i>
                  Baixar
                </BaseButton>
              </div>
            </div>

            <div class="space-y-2 max-h-96 overflow-y-auto">
              <div
                v-for="(doc, index) in documentos"
                :key="index"
                class="flex items-center justify-between bg-white dark:bg-gray-600 rounded-lg p-4 group"
              >
                <div class="flex-1">
                  <code class="text-lg text-blue-600 dark:text-blue-400 font-mono">
                    {{ doc }}
                  </code>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <i class="fas fa-check-circle text-green-500 mr-1"></i>
                    Válido
                  </div>
                </div>
                <button
                  @click="copiar(doc)"
                  class="ml-3 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <i class="fas fa-copy mr-1"></i>
                  Copiar
                </button>
              </div>
            </div>
          </div>

          <!-- Aviso Importante -->
          <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4">
            <div class="flex">
              <i class="fas fa-exclamation-triangle text-yellow-600 dark:text-yellow-400 mt-1 mr-3"></i>
              <div class="text-sm text-yellow-800 dark:text-yellow-300">
                <p class="font-semibold mb-2">⚠️ Aviso Importante:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Estes documentos são válidos apenas algoritmicamente</li>
                  <li>Use APENAS para testes, desenvolvimento e ambientes homologação</li>
                  <li>NÃO use em produção ou para fraudes (crime previsto em lei)</li>
                  <li>Não correspondem a pessoas ou empresas reais</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Validador -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">
              <i class="fas fa-shield-halved text-blue-600 dark:text-blue-400 mr-2"></i>
              Validar {{ tipo.toUpperCase() }}
            </h3>
            
            <div class="flex gap-3">
              <input
                v-model="documentoParaValidar"
                type="text"
                :placeholder="`Digite um ${tipo.toUpperCase()} para validar`"
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white font-mono"
              />
              <BaseButton @click="validar" variant="primary">
                <i class="fas fa-check mr-2"></i>
                Validar
              </BaseButton>
            </div>

            <div v-if="resultadoValidacao !== null" class="mt-4 p-4 rounded-lg" :class="resultadoValidacao ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'">
              <div class="flex items-center gap-2">
                <i :class="resultadoValidacao ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600'"></i>
                <span :class="resultadoValidacao ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'" class="font-medium">
                  {{ resultadoValidacao ? `${tipo.toUpperCase()} válido!` : `${tipo.toUpperCase()} inválido!` }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage, trackConversion } = useAnalytics()

const tipo = ref('cpf')
const quantidade = ref(5)
const formatado = ref(true)
const documentos = ref([])
const documentoParaValidar = ref('')
const resultadoValidacao = ref(null)

const gerarCPF = () => {
  const num = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
  
  // Primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += num[i] * (10 - i)
  }
  let digito1 = 11 - (soma % 11)
  digito1 = digito1 > 9 ? 0 : digito1
  num.push(digito1)
  
  // Segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += num[i] * (11 - i)
  }
  let digito2 = 11 - (soma % 11)
  digito2 = digito2 > 9 ? 0 : digito2
  num.push(digito2)
  
  const cpf = num.join('')
  return formatado.value ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : cpf
}

const gerarCNPJ = () => {
  const num = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10))
  num.push(0, 0, 0, 1) // Filial 0001
  
  // Primeiro dígito verificador
  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  let soma = 0
  for (let i = 0; i < 12; i++) {
    soma += num[i] * pesos1[i]
  }
  let digito1 = soma % 11
  digito1 = digito1 < 2 ? 0 : 11 - digito1
  num.push(digito1)
  
  // Segundo dígito verificador
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  soma = 0
  for (let i = 0; i < 13; i++) {
    soma += num[i] * pesos2[i]
  }
  let digito2 = soma % 11
  digito2 = digito2 < 2 ? 0 : 11 - digito2
  num.push(digito2)
  
  const cnpj = num.join('')
  return formatado.value ? cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : cnpj
}

const validarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, '')
  
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false
  
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let digito = 11 - (soma % 11)
  if (digito > 9) digito = 0
  if (digito !== parseInt(cpf.charAt(9))) return false
  
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  digito = 11 - (soma % 11)
  if (digito > 9) digito = 0
  return digito === parseInt(cpf.charAt(10))
}

const validarCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, '')
  
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false
  
  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  let soma = 0
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * pesos1[i]
  }
  let digito = soma % 11
  digito = digito < 2 ? 0 : 11 - digito
  if (digito !== parseInt(cnpj.charAt(12))) return false
  
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  soma = 0
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * pesos2[i]
  }
  digito = soma % 11
  digito = digito < 2 ? 0 : 11 - digito
  return digito === parseInt(cnpj.charAt(13))
}

const gerar = () => {
  const qtd = Number(quantidade.value)
  
  if (qtd < 1 || qtd > 50) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Quantidade deve estar entre 1 e 50' })
    return
  }

  documentos.value = []
  for (let i = 0; i < qtd; i++) {
    documentos.value.push(tipo.value === 'cpf' ? gerarCPF() : gerarCNPJ())
  }

  trackToolUsage('Gerador CPF/CNPJ', 'generate')
}

const validar = () => {
  if (!documentoParaValidar.value) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Digite um documento para validar' })
    return
  }

  resultadoValidacao.value = tipo.value === 'cpf' 
    ? validarCPF(documentoParaValidar.value)
    : validarCNPJ(documentoParaValidar.value)
}

const copiar = async (doc) => {
  try {
    await navigator.clipboard.writeText(doc)
    trackConversion('copy', tipo.value)
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      timer: 1000,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const copiarTodos = async () => {
  try {
    await navigator.clipboard.writeText(documentos.value.join('\n'))
    trackConversion('copy', `${tipo.value}-all`)
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: `${documentos.value.length} documentos copiados`,
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const baixarTxt = () => {
  const blob = new Blob([documentos.value.join('\n')], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${tipo.value}-${Date.now()}.txt`
  link.click()
  URL.revokeObjectURL(url)
  
  trackConversion('download', tipo.value)
  Swal.fire({
    icon: 'success',
    title: 'Download iniciado!',
    timer: 1500,
    showConfirmButton: false
  })
}

const limpar = () => {
  documentos.value = []
  documentoParaValidar.value = ''
  resultadoValidacao.value = null
}

// Gerar inicialmente
gerar()
</script>
