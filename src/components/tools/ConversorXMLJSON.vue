<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-4">
          <i class="fas fa-exchange-alt text-pink-600 dark:text-pink-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor XML ↔ JSON</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta entre XML e JSON facilmente</p>
      </div>

      <div class="space-y-6">
        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button @click="modo = 'xml-json'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'xml-json' ? 'bg-pink-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <i class="fas fa-arrow-right mr-2"></i>
            XML → JSON
          </button>
          <button @click="modo = 'json-xml'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'json-xml' ? 'bg-pink-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <i class="fas fa-arrow-left mr-2"></i>
            JSON → XML
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ modo === 'xml-json' ? 'XML' : 'JSON' }}
            </label>
            <textarea v-model="input" @input="converter" rows="18" :placeholder="modo === 'xml-json' ? '<root><name>John</name></root>' : '{ \u0022name\u0022: \u0022John\u0022 }'" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none font-mono text-sm"></textarea>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ modo === 'xml-json' ? 'JSON' : 'XML' }}
              </label>
              <button @click="copiar" class="px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm transition-colors">
                <i class="fas fa-copy mr-1"></i>
                Copiar
              </button>
            </div>
            <div class="h-[470px] px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-900 overflow-auto" :class="erro ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'">
              <pre v-if="!erro" class="text-gray-900 dark:text-gray-100 text-sm font-mono">{{ output }}</pre>
              <div v-else class="text-red-600 dark:text-red-400 text-sm">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                {{ erro }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="formatarOutput" class="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm transition-colors">
            <i class="fas fa-indent mr-2"></i>
            Formatar
          </button>
          <button @click="limpar" class="ml-auto px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg text-sm transition-colors">
            <i class="fas fa-trash mr-2"></i>
            Limpar
          </button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">{{ input.split('\n').length }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Linhas Entrada</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">{{ output.split('\n').length }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Linhas Saída</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">{{ input.length }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Bytes Entrada</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">{{ output.length }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Bytes Saída</div>
          </div>
        </div>

        <div class="bg-pink-50 dark:bg-pink-900/20 border-l-4 border-pink-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-pink-600 dark:text-pink-400 mt-1 mr-3"></i>
            <div class="text-sm text-pink-800 dark:text-pink-300">
              <p class="font-semibold mb-2">Casos de uso:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>APIs:</strong> Integração entre sistemas XML e JSON</li>
                <li><strong>Configurações:</strong> Migração de configs XML para JSON</li>
                <li><strong>Web Services:</strong> SOAP (XML) para REST (JSON)</li>
                <li><strong>Dados:</strong> Transformação de formatos legados</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const modo = ref('xml-json')
const input = ref(`<?xml version="1.0" encoding="UTF-8"?>
<pessoa>
  <nome>João Silva</nome>
  <idade>30</idade>
  <email>joao@example.com</email>
  <endereco>
    <rua>Av. Paulista</rua>
    <cidade>São Paulo</cidade>
  </endereco>
  <hobbies>
    <hobby>Leitura</hobby>
    <hobby>Games</hobby>
    <hobby>Programação</hobby>
  </hobbies>
</pessoa>`)
const output = ref('')
const erro = ref('')

const xmlToJSON = (xml) => {
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xml, 'text/xml')
    
    if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
      throw new Error('XML inválido')
    }
    
    const obj = parseXMLNode(xmlDoc.documentElement)
    return JSON.stringify(obj, null, 2)
  } catch (e) {
    throw new Error(`Erro ao converter XML: ${e.message}`)
  }
}

const parseXMLNode = (node) => {
  const obj = {}
  
  if (node.attributes && node.attributes.length > 0) {
    obj['@attributes'] = {}
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i]
      obj['@attributes'][attr.name] = attr.value
    }
  }
  
  if (node.hasChildNodes()) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i]
      
      if (child.nodeType === 3) {
        const text = child.nodeValue.trim()
        if (text) {
          obj['#text'] = text
        }
      } else if (child.nodeType === 1) {
        const childObj = parseXMLNode(child)
        
        if (obj[child.nodeName]) {
          if (!Array.isArray(obj[child.nodeName])) {
            obj[child.nodeName] = [obj[child.nodeName]]
          }
          obj[child.nodeName].push(childObj)
        } else {
          obj[child.nodeName] = childObj
        }
      }
    }
  }
  
  if (Object.keys(obj).length === 1 && obj['#text']) {
    return obj['#text']
  }
  
  return obj
}

const jsonToXML = (json) => {
  try {
    const obj = JSON.parse(json)
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += objectToXML(obj, 'root', 0)
    return xml
  } catch (e) {
    throw new Error(`JSON inválido: ${e.message}`)
  }
}

const objectToXML = (obj, tagName, indent = 0) => {
  const spaces = '  '.repeat(indent)
  let xml = `${spaces}<${tagName}>\n`
  
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      for (const item of obj) {
        xml += objectToXML(item, 'item', indent + 1)
      }
    } else {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value !== null) {
          xml += objectToXML(value, key, indent + 1)
        } else {
          xml += `${spaces}  <${key}>${value}</${key}>\n`
        }
      }
    }
  } else {
    xml = `${spaces}<${tagName}>${obj}</${tagName}>\n`
    return xml
  }
  
  xml += `${spaces}</${tagName}>\n`
  return xml
}

const converter = () => {
  erro.value = ''
  
  if (!input.value.trim()) {
    output.value = ''
    return
  }
  
  try {
    if (modo.value === 'xml-json') {
      output.value = xmlToJSON(input.value)
    } else {
      output.value = jsonToXML(input.value)
    }
    
    trackToolUsage('Conversor XML/JSON', modo.value)
  } catch (e) {
    erro.value = e.message
    output.value = ''
  }
}

const formatarOutput = () => {
  if (!output.value || erro.value) return
  
  try {
    if (modo.value === 'xml-json') {
      const obj = JSON.parse(output.value)
      output.value = JSON.stringify(obj, null, 2)
    }
  } catch {
    // Já formatado
  }
}

const limpar = () => {
  input.value = ''
  output.value = ''
  erro.value = ''
}

const copiar = async () => {
  if (!output.value) return
  
  try {
    await navigator.clipboard.writeText(output.value)
    Swal.fire({
      title: 'Copiado!',
      text: 'Código copiado para área de transferência',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

// Conversão inicial
converter()
</script>
