<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
          <i class="fas fa-i-cursor text-teal-600 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Gerador de Prefixo e Sufixo</h1>
        <p class="text-gray-600">Adicione texto antes e/ou depois de cada linha</p>
      </div>

      <div class="space-y-6">
        <!-- Texto de Entrada -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Texto (uma linha por item)
          </label>
          <textarea
            v-model="textoEntrada"
            @input="gerar"
            placeholder="Digite ou cole seu texto aqui..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            rows="8"
          ></textarea>
          <p class="text-sm text-gray-500 mt-2">
            {{ linhas.length }} linha(s)
          </p>
        </div>

        <!-- Prefixo e Sufixo -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <BaseInput
              v-model="prefixo"
              @input="gerar"
              label="Prefixo (antes de cada linha)"
              placeholder="Ex: - "
              icon="fa-solid fa-arrow-right"
            />
          </div>
          <div>
            <BaseInput
              v-model="sufixo"
              @input="gerar"
              label="Sufixo (depois de cada linha)"
              placeholder="Ex: ;"
              icon="fa-solid fa-arrow-left"
            />
          </div>
        </div>

        <!-- Templates Rápidos -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Templates Rápidos
          </label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              v-for="template in templates"
              :key="template.nome"
              @click="aplicarTemplate(template)"
              class="p-3 rounded-lg border-2 border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all text-left"
            >
              <div class="font-medium text-gray-900 text-sm mb-1">{{ template.nome }}</div>
              <code class="text-xs text-teal-600">{{ template.exemplo }}</code>
            </button>
          </div>
        </div>

        <!-- Opções -->
        <div class="bg-gray-50 rounded-lg p-4 space-y-3">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Opções
          </label>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label class="flex items-center cursor-pointer">
              <input
                v-model="opcoes.ignorarVazias"
                @change="gerar"
                type="checkbox"
                class="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
              />
              <span class="ml-3 text-gray-700 text-sm">Ignorar linhas vazias</span>
            </label>
            
            <label class="flex items-center cursor-pointer">
              <input
                v-model="opcoes.numerar"
                @change="gerar"
                type="checkbox"
                class="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
              />
              <span class="ml-3 text-gray-700 text-sm">Numerar linhas</span>
            </label>
            
            <label class="flex items-center cursor-pointer">
              <input
                v-model="opcoes.aspasSimples"
                @change="gerar"
                type="checkbox"
                class="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
              />
              <span class="ml-3 text-gray-700 text-sm">Envolver em aspas simples</span>
            </label>
            
            <label class="flex items-center cursor-pointer">
              <input
                v-model="opcoes.aspasDuplas"
                @change="gerar"
                type="checkbox"
                class="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
              />
              <span class="ml-3 text-gray-700 text-sm">Envolver em aspas duplas</span>
            </label>
          </div>
        </div>

        <!-- Resultado -->
        <div v-if="textoResultado && textoEntrada" class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Resultado</h3>
            <div class="flex gap-2">
              <button
                @click="copiar"
                class="flex items-center gap-2 px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
              >
                <i class="fas fa-copy"></i>
                <span>Copiar</span>
              </button>
              <button
                @click="baixarArquivo"
                class="flex items-center gap-2 px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
              >
                <i class="fas fa-download"></i>
                <span>Baixar</span>
              </button>
            </div>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
            <pre class="text-gray-700 whitespace-pre-wrap font-mono text-sm">{{ textoResultado }}</pre>
          </div>

          <!-- Estatísticas -->
          <div class="grid grid-cols-3 gap-4 pt-4 border-t">
            <div class="text-center">
              <div class="text-2xl font-bold text-teal-600">{{ linhas.length }}</div>
              <div class="text-sm text-gray-600">Linhas</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-teal-600">{{ textoResultado.length }}</div>
              <div class="text-sm text-gray-600">Caracteres</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-teal-600">
                {{ ((textoResultado.length / textoEntrada.length) * 100).toFixed(0) }}%
              </div>
              <div class="text-sm text-gray-600">Aumento</div>
            </div>
          </div>
        </div>

        <!-- Botão Limpar -->
        <BaseButton @click="limpar" variant="outline" class="w-full">
          <i class="fas fa-eraser mr-2"></i>
          Limpar Tudo
        </BaseButton>

        <!-- Dica -->
        <div class="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="fas fa-lightbulb text-teal-600 mt-1"></i>
            <div class="text-sm text-teal-900 space-y-2">
              <p><strong>Exemplos de Uso:</strong></p>
              <ul class="list-disc list-inside space-y-1 ml-2">
                <li><strong>SQL:</strong> Prefixo: "INSERT INTO tabela VALUES ('" | Sufixo: "');"</li>
                <li><strong>Array JS:</strong> Prefixo: "'" | Sufixo: "',"</li>
                <li><strong>Lista HTML:</strong> Prefixo: "&lt;li&gt;" | Sufixo: "&lt;/li&gt;"</li>
                <li><strong>Markdown:</strong> Prefixo: "- [ ] "</li>
              </ul>
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

const templates = [
  { nome: 'Array JS', prefixo: "'", sufixo: "',", exemplo: "'item'," },
  { nome: 'SQL INSERT', prefixo: "('", sufixo: "'),", exemplo: "('valor')," },
  { nome: 'HTML List', prefixo: '<li>', sufixo: '</li>', exemplo: '<li>item</li>' },
  { nome: 'Markdown', prefixo: '- [ ] ', sufixo: '', exemplo: '- [ ] item' },
  { nome: 'JSON Array', prefixo: '"', sufixo: '",', exemplo: '"item",' },
  { nome: 'CSV', prefixo: '', sufixo: ',', exemplo: 'item,' },
  { nome: 'Python List', prefixo: "'", sufixo: "',", exemplo: "'item'," },
  { nome: 'Bullet', prefixo: '• ', sufixo: '', exemplo: '• item' }
]

const textoEntrada = ref('')
const prefixo = ref('')
const sufixo = ref('')
const textoResultado = ref('')

const opcoes = ref({
  ignorarVazias: true,
  numerar: false,
  aspasSimples: false,
  aspasDuplas: false
})

// Computados
const linhas = computed(() => {
  let items = textoEntrada.value.split('\n')
  if (opcoes.value.ignorarVazias) {
    items = items.filter(linha => linha.trim().length > 0)
  }
  return items
})

// Aplicar template
const aplicarTemplate = (template) => {
  prefixo.value = template.prefixo
  sufixo.value = template.sufixo
  gerar()
}

// Gerar resultado
const gerar = () => {
  if (!textoEntrada.value) {
    textoResultado.value = ''
    return
  }

  const resultado = linhas.value.map((linha, index) => {
    let texto = linha

    // Adicionar aspas
    if (opcoes.value.aspasSimples) {
      texto = `'${texto}'`
    }
    if (opcoes.value.aspasDuplas) {
      texto = `"${texto}"`
    }

    // Adicionar prefixo e sufixo
    texto = `${prefixo.value}${texto}${sufixo.value}`

    // Numerar
    if (opcoes.value.numerar) {
      texto = `${index + 1}. ${texto}`
    }

    return texto
  })

  textoResultado.value = resultado.join('\n')
}

// Copiar
const copiar = async () => {
  try {
    await navigator.clipboard.writeText(textoResultado.value)
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: 'Texto copiado para a área de transferência',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Não foi possível copiar'
    })
  }
}

// Baixar arquivo
const baixarArquivo = () => {
  const blob = new Blob([textoResultado.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'resultado.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  
  Swal.fire({
    icon: 'success',
    title: 'Download Iniciado!',
    text: 'Arquivo baixado com sucesso',
    timer: 1500,
    showConfirmButton: false
  })
}

// Limpar
const limpar = () => {
  textoEntrada.value = ''
  prefixo.value = ''
  sufixo.value = ''
  textoResultado.value = ''
  opcoes.value = {
    ignorarVazias: true,
    numerar: false,
    aspasSimples: false,
    aspasDuplas: false
  }
}
</script>
