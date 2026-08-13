<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <i class="fas fa-building text-indigo-600 dark:text-indigo-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de CNPJ Completo</h1>
        <p class="text-gray-600 dark:text-gray-400">Gere dados completos de empresas fictícias para testes</p>
      </div>

      <div class="space-y-6">
        <BaseInput v-model="quantidade" label="Quantidade de Empresas" type="number" :min="1" :max="50" icon="fa-solid fa-hashtag" />

        <BaseButton @click="gerar" variant="primary" class="w-full">
          <i class="fas fa-building mr-2"></i>
          Gerar Empresas
        </BaseButton>

        <div v-if="empresas.length" class="space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ empresas.length }} Empresas Geradas</h3>
            <BaseButton @click="baixarTXT" variant="secondary" size="sm">
              <i class="fas fa-download mr-2"></i>
              Baixar TXT
            </BaseButton>
          </div>

          <div v-for="(empresa, index) in empresas" :key="index" class="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ empresa.razaoSocial }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ empresa.nomeFantasia }}</p>
              </div>
              <button @click="copiar(empresa)" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors">
                <i class="fas fa-copy mr-1"></i>
                Copiar
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div class="flex items-center">
                <i class="fas fa-id-card text-indigo-600 dark:text-indigo-400 w-5 mr-2"></i>
                <span class="text-gray-600 dark:text-gray-400">CNPJ:</span>
                <span class="ml-2 font-mono font-semibold text-gray-900 dark:text-white">{{ empresa.cnpj }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-calendar text-indigo-600 dark:text-indigo-400 w-5 mr-2"></i>
                <span class="text-gray-600 dark:text-gray-400">Abertura:</span>
                <span class="ml-2 font-semibold text-gray-900 dark:text-white">{{ empresa.dataAbertura }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-phone text-indigo-600 dark:text-indigo-400 w-5 mr-2"></i>
                <span class="text-gray-600 dark:text-gray-400">Telefone:</span>
                <span class="ml-2 font-semibold text-gray-900 dark:text-white">{{ empresa.telefone }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-envelope text-indigo-600 dark:text-indigo-400 w-5 mr-2"></i>
                <span class="text-gray-600 dark:text-gray-400">Email:</span>
                <span class="ml-2 font-semibold text-gray-900 dark:text-white">{{ empresa.email }}</span>
              </div>
              <div class="flex items-start col-span-2">
                <i class="fas fa-map-marker-alt text-indigo-600 dark:text-indigo-400 w-5 mr-2 mt-0.5"></i>
                <span class="text-gray-600 dark:text-gray-400">Endereço:</span>
                <span class="ml-2 font-semibold text-gray-900 dark:text-white">{{ empresa.endereco }}</span>
              </div>
            </div>
          </div>

          <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
            <div class="flex">
              <i class="fas fa-exclamation-triangle text-red-600 dark:text-red-400 mt-1 mr-3"></i>
              <div class="text-sm text-red-800 dark:text-red-300">
                <p class="font-semibold mb-2">⚠️ AVISO IMPORTANTE:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li>Estes CNPJs são fictícios e gerados apenas para TESTES</li>
                  <li>NÃO use para fraudes, documentos oficiais ou declarações fiscais</li>
                  <li>Uso indevido pode configurar crime de falsificação de documentos</li>
                  <li>Destinado exclusivamente para desenvolvimento e homologação de sistemas</li>
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
import { ref } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage, trackConversion } = useAnalytics()

const quantidade = ref(5)
const empresas = ref([])

const gerarCNPJ = () => {
  const n1 = Math.floor(Math.random() * 10)
  const n2 = Math.floor(Math.random() * 10)
  const n3 = Math.floor(Math.random() * 10)
  const n4 = Math.floor(Math.random() * 10)
  const n5 = Math.floor(Math.random() * 10)
  const n6 = Math.floor(Math.random() * 10)
  const n7 = Math.floor(Math.random() * 10)
  const n8 = Math.floor(Math.random() * 10)
  const n9 = 0
  const n10 = 0
  const n11 = 0
  const n12 = 1
  
  const d1 = ((n1 * 5) + (n2 * 4) + (n3 * 3) + (n4 * 2) + (n5 * 9) + (n6 * 8) + (n7 * 7) + (n8 * 6) + (n9 * 5) + (n10 * 4) + (n11 * 3) + (n12 * 2)) % 11
  const dig1 = d1 < 2 ? 0 : 11 - d1
  
  const d2 = ((n1 * 6) + (n2 * 5) + (n3 * 4) + (n4 * 3) + (n5 * 2) + (n6 * 9) + (n7 * 8) + (n8 * 7) + (n9 * 6) + (n10 * 5) + (n11 * 4) + (n12 * 3) + (dig1 * 2)) % 11
  const dig2 = d2 < 2 ? 0 : 11 - d2
  
  const cnpj = `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${dig1}${dig2}`
  return cnpj
}

const nomesPrefixo = ['Tech', 'Digital', 'Smart', 'Global', 'Prime', 'Mega', 'Super', 'Ultra', 'Inova', 'Multi']
const nomesSufixo = ['Solutions', 'Systems', 'Services', 'Group', 'Corp', 'Ltda', 'Tecnologia', 'Comercio', 'Industria', 'Distribuidora']
const ruas = ['Rua das Flores', 'Av. Paulista', 'Rua Oscar Freire', 'Av. Faria Lima', 'Rua Augusta', 'Av. Brigadeiro', 'Rua da Consolação', 'Av. Rebouças']
const cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Brasília', 'Salvador', 'Fortaleza']

const gerar = () => {
  const qtd = Number(quantidade.value)
  empresas.value = []
  
  for (let i = 0; i < qtd; i++) {
    const prefixo = nomesPrefixo[Math.floor(Math.random() * nomesPrefixo.length)]
    const sufixo = nomesSufixo[Math.floor(Math.random() * nomesSufixo.length)]
    const razaoSocial = `${prefixo} ${sufixo}`
    const nomeFantasia = prefixo
    
    const cnpj = gerarCNPJ()
    
    const ano = 2010 + Math.floor(Math.random() * 14)
    const mes = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0')
    const dia = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')
    const dataAbertura = `${dia}/${mes}/${ano}`
    
    const ddd = ['11', '21', '31', '41', '51', '61', '71', '85'][Math.floor(Math.random() * 8)]
    const telefone = `(${ddd}) ${9000 + Math.floor(Math.random() * 1000)}-${1000 + Math.floor(Math.random() * 9000)}`
    
    const emailDomain = nomeFantasia.toLowerCase().replace(/\s/g, '')
    const email = `contato@${emailDomain}.com.br`
    
    const rua = ruas[Math.floor(Math.random() * ruas.length)]
    const numero = 100 + Math.floor(Math.random() * 900)
    const cidade = cidades[Math.floor(Math.random() * cidades.length)]
    const cep = `${10000 + Math.floor(Math.random() * 90000)}-${100 + Math.floor(Math.random() * 900)}`
    const endereco = `${rua}, ${numero} - ${cidade} - CEP ${cep}`
    
    empresas.value.push({
      razaoSocial,
      nomeFantasia,
      cnpj,
      dataAbertura,
      telefone,
      email,
      endereco
    })
  }

  trackToolUsage('Gerador CNPJ Completo', 'generate', { quantidade: qtd })
  trackConversion('Gerador CNPJ Completo', 'generation_complete')
}

const copiar = async (empresa) => {
  const texto = `Razão Social: ${empresa.razaoSocial}
Nome Fantasia: ${empresa.nomeFantasia}
CNPJ: ${empresa.cnpj}
Data de Abertura: ${empresa.dataAbertura}
Telefone: ${empresa.telefone}
Email: ${empresa.email}
Endereço: ${empresa.endereco}`

  try {
    await navigator.clipboard.writeText(texto)
    Swal.fire({
      title: 'Copiado!',
      text: 'Dados da empresa copiados',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

const baixarTXT = () => {
  let conteudo = 'EMPRESAS FICTÍCIAS PARA TESTE\n'
  conteudo += '================================\n\n'
  
  empresas.value.forEach((empresa, index) => {
    conteudo += `EMPRESA ${index + 1}\n`
    conteudo += `Razão Social: ${empresa.razaoSocial}\n`
    conteudo += `Nome Fantasia: ${empresa.nomeFantasia}\n`
    conteudo += `CNPJ: ${empresa.cnpj}\n`
    conteudo += `Data de Abertura: ${empresa.dataAbertura}\n`
    conteudo += `Telefone: ${empresa.telefone}\n`
    conteudo += `Email: ${empresa.email}\n`
    conteudo += `Endereço: ${empresa.endereco}\n`
    conteudo += '\n---\n\n'
  })
  
  const blob = new Blob([conteudo], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'empresas-teste.txt'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
