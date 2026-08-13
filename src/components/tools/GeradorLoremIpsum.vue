<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <i class="fas fa-paragraph text-purple-600 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Gerador de Lorem Ipsum</h1>
        <p class="text-gray-600">Gere texto placeholder para seus projetos</p>
      </div>

      <div class="space-y-6">
        <!-- Tipo de Geração -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Geração
          </label>
          <div class="grid grid-cols-3 gap-4">
            <button
              v-for="tipo in tipos"
              :key="tipo.value"
              @click="tipoSelecionado = tipo.value"
              :class="[
                'p-4 rounded-lg border-2 transition-all text-center',
                tipoSelecionado === tipo.value
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300'
              ]"
            >
              <i :class="`${tipo.icon} text-2xl mb-2`"></i>
              <div class="font-medium">{{ tipo.label }}</div>
            </button>
          </div>
        </div>

        <!-- Quantidade -->
        <BaseInput
          v-model="quantidade"
          :label="`Quantidade de ${tipoSelecionado === 'paragrafos' ? 'Parágrafos' : tipoSelecionado === 'palavras' ? 'Palavras' : 'Bytes'}`"
          type="number"
          :min="1"
          :max="tipoSelecionado === 'paragrafos' ? 20 : tipoSelecionado === 'palavras' ? 500 : 5000"
          icon="fa-solid fa-hashtag"
        />

        <!-- Opções -->
        <div class="space-y-3">
          <label class="flex items-center cursor-pointer">
            <input
              v-model="iniciarComLorem"
              type="checkbox"
              class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <span class="ml-3 text-gray-700">Iniciar com "Lorem ipsum dolor sit amet..."</span>
          </label>
        </div>

        <!-- Botões de Ação -->
        <div class="flex gap-4">
          <BaseButton @click="gerarTexto" variant="primary" class="flex-1">
            <i class="fas fa-magic mr-2"></i>
            Gerar Texto
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Resultado -->
        <div v-if="textoGerado" class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Texto Gerado</h3>
            <button
              @click="copiarTexto"
              class="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <i class="fas fa-copy"></i>
              <span>Copiar</span>
            </button>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
            <p class="text-gray-700 whitespace-pre-wrap leading-relaxed">{{ textoGerado }}</p>
          </div>

          <!-- Estatísticas -->
          <div class="grid grid-cols-4 gap-4 pt-4 border-t">
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">{{ stats.caracteres }}</div>
              <div class="text-sm text-gray-600">Caracteres</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">{{ stats.palavras }}</div>
              <div class="text-sm text-gray-600">Palavras</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">{{ stats.paragrafos }}</div>
              <div class="text-sm text-gray-600">Parágrafos</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">{{ stats.bytes }}</div>
              <div class="text-sm text-gray-600">Bytes</div>
            </div>
          </div>
        </div>

        <!-- Dica -->
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="fas fa-lightbulb text-purple-600 mt-1"></i>
            <div class="text-sm text-purple-900">
              <strong>Dica:</strong> Lorem Ipsum é um texto placeholder padrão usado desde os anos 1500 
              na indústria de impressão e design gráfico.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'

// Banco de palavras do Lorem Ipsum
const loremPalavras = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
  'accusamus', 'iusto', 'odio', 'dignissimos', 'ducimus', 'blanditiis',
  'praesentium', 'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos', 'quas',
  'molestias', 'excepturi', 'occaecati', 'cupiditate', 'provident', 'similique',
  'mollitia', 'vitae', 'dicta', 'explicabo', 'nemo', 'ipsam', 'quia', 'voluptas',
  'aspernatur', 'aut', 'odit', 'fugit', 'consequuntur', 'magni', 'dolores',
  'ratione', 'sequi', 'nesciunt', 'neque', 'porro', 'quisquam', 'dolorem',
  'adipisci', 'numquam', 'eius', 'modi', 'tempora', 'incidunt', 'magnam'
]

const loremInicio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const tipos = [
  { value: 'paragrafos', label: 'Parágrafos', icon: 'fas fa-align-left' },
  { value: 'palavras', label: 'Palavras', icon: 'fas fa-font' },
  { value: 'bytes', label: 'Bytes', icon: 'fas fa-database' }
]

const tipoSelecionado = ref('paragrafos')
const quantidade = ref(3)
const iniciarComLorem = ref(true)
const textoGerado = ref('')

const stats = reactive({
  caracteres: 0,
  palavras: 0,
  paragrafos: 0,
  bytes: 0
})

// Função para gerar uma palavra aleatória
const palavraAleatoria = () => {
  return loremPalavras[Math.floor(Math.random() * loremPalavras.length)]
}

// Função para gerar uma frase
const gerarFrase = (numPalavras) => {
  const palavras = []
  for (let i = 0; i < numPalavras; i++) {
    palavras.push(palavraAleatoria())
  }
  const frase = palavras.join(' ')
  return frase.charAt(0).toUpperCase() + frase.slice(1) + '.'
}

// Função para gerar um parágrafo
const gerarParagrafo = (numFrases = null) => {
  const frases = numFrases || Math.floor(Math.random() * 4) + 3 // 3-6 frases
  const paragrafo = []
  for (let i = 0; i < frases; i++) {
    const numPalavras = Math.floor(Math.random() * 8) + 5 // 5-12 palavras por frase
    paragrafo.push(gerarFrase(numPalavras))
  }
  return paragrafo.join(' ')
}

// Função principal de geração
const gerarTexto = () => {
  let resultado = ''
  const qtd = parseInt(quantidade.value) || 1

  if (tipoSelecionado.value === 'paragrafos') {
    const paragrafos = []
    
    if (iniciarComLorem.value) {
      paragrafos.push(loremInicio)
    }
    
    for (let i = iniciarComLorem.value ? 1 : 0; i < qtd; i++) {
      paragrafos.push(gerarParagrafo())
    }
    
    resultado = paragrafos.join('\n\n')
  } 
  else if (tipoSelecionado.value === 'palavras') {
    const palavras = []
    
    if (iniciarComLorem.value) {
      palavras.push(loremInicio)
      const palavrasRestantes = qtd - loremInicio.split(' ').length
      for (let i = 0; i < palavrasRestantes; i++) {
        palavras.push(palavraAleatoria())
      }
    } else {
      for (let i = 0; i < qtd; i++) {
        palavras.push(palavraAleatoria())
      }
    }
    
    resultado = palavras.join(' ')
  } 
  else if (tipoSelecionado.value === 'bytes') {
    let texto = iniciarComLorem.value ? loremInicio + ' ' : ''
    
    while (new Blob([texto]).size < qtd) {
      texto += palavraAleatoria() + ' '
    }
    
    // Ajustar para o tamanho exato
    while (new Blob([texto]).size > qtd && texto.length > 0) {
      texto = texto.slice(0, -1)
    }
    
    resultado = texto.trim()
  }

  textoGerado.value = resultado
  calcularEstatisticas()
}

// Calcular estatísticas
const calcularEstatisticas = () => {
  stats.caracteres = textoGerado.value.length
  stats.palavras = textoGerado.value.trim().split(/\s+/).filter(p => p.length > 0).length
  stats.paragrafos = textoGerado.value.split(/\n\n+/).filter(p => p.trim().length > 0).length
  stats.bytes = new Blob([textoGerado.value]).size
}

// Copiar texto
const copiarTexto = async () => {
  try {
    await navigator.clipboard.writeText(textoGerado.value)
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: 'Texto copiado para a área de transferência',
      timer: 2000,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Não foi possível copiar o texto'
    })
  }
}

// Limpar
const limpar = () => {
  textoGerado.value = ''
  quantidade.value = 3
  tipoSelecionado.value = 'paragrafos'
  iniciarComLorem.value = true
  stats.caracteres = 0
  stats.palavras = 0
  stats.paragrafos = 0
  stats.bytes = 0
}
</script>
