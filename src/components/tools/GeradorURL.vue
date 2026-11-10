<template>
  <ToolShell
    title="Gerador de URL Amigável"
    description="Converta títulos em slugs SEO-friendly ou codifique URLs com caracteres especiais."
    icon="fa-link"
    icon-gradient="from-green-500 to-teal-700"
    orb-color="teal"
    :quick-tips="['Remoção de acentos', 'Slug ou URL Encode', 'Separador personalizável']"
    :tips="[
      { title: 'O que é um slug', text: 'Slug é a parte da URL que identifica uma página de forma legível, ex: /como-fazer-bolo-de-cenoura.', type: 'info' },
      { title: 'Boas práticas SEO', text: 'Use hifens (-) como separador, letras minúsculas, sem acentos e sem caracteres especiais para melhores resultados em SEO.', type: 'success' },
      { title: 'URL Encode', text: 'Use URL Encode para parâmetros de query string que contêm espaços, acentos ou símbolos especiais.', type: 'info' },
    ]"
    :examples="[
      { title: 'Título para slug', desc: 'Como Fazer um Bolo de Chocolate?', result: 'como-fazer-um-bolo-de-chocolate' },
      { title: 'URL Encode', desc: 'busca?q=teste com espaço', result: 'busca%3Fq%3Dteste%20com%20espa%C3%A7o' },
      { title: 'Underscore', desc: 'Usando separador _ (Python-style)', result: 'como_fazer_um_bolo_de_chocolate' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Configuração -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Tipo de Conversão -->
          <div>
            <label class="input-aurora-label mb-2">
              <i class="fas fa-sliders mr-1.5 text-teal-500"></i>
              Tipo de Conversão
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="tipoConversao = 'slug'"
                :class="['p-4 rounded-xl border-2 transition-all text-center', tipoConversao === 'slug' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-gray-200 dark:border-slate-700 hover:border-teal-300']"
              >
                <i class="fas fa-pen-fancy text-2xl mb-2 block text-teal-600 dark:text-teal-400"></i>
                <div class="font-semibold text-sm text-gray-900 dark:text-white">Slug</div>
                <div class="text-xs text-gray-500">texto-amigavel-url</div>
              </button>
              <button
                @click="tipoConversao = 'encode'"
                :class="['p-4 rounded-xl border-2 transition-all text-center', tipoConversao === 'encode' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-gray-200 dark:border-slate-700 hover:border-teal-300']"
              >
                <i class="fas fa-shield-alt text-2xl mb-2 block text-teal-600 dark:text-teal-400"></i>
                <div class="font-semibold text-sm text-gray-900 dark:text-white">URL Encode</div>
                <div class="text-xs text-gray-500">texto%20codificado</div>
              </button>
            </div>
          </div>

          <!-- Texto -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-keyboard mr-1.5 text-teal-500"></i>
              Texto para Converter
            </label>
            <textarea
              v-model="textoEntrada"
              @input="converter"
              :placeholder="tipoConversao === 'slug' ? 'Digite um título ou texto...' : 'Digite uma URL ou texto...'"
              class="input-aurora resize-none"
              rows="4"
            ></textarea>
          </div>

          <!-- Opções Slug -->
          <div v-if="tipoConversao === 'slug'" class="space-y-3">
            <div class="glass-panel p-3 space-y-2">
              <label class="input-aurora-label !mb-1">Opções do Slug</label>
              <label class="checkbox-aurora">
                <input v-model="opcoes.lowercase" @change="converter" type="checkbox" />
                <span>Converter para minúsculas</span>
              </label>
              <label class="checkbox-aurora">
                <input v-model="opcoes.removeAccents" @change="converter" type="checkbox" />
                <span>Remover acentos</span>
              </label>
              <label class="checkbox-aurora">
                <input v-model="opcoes.removeSpecial" @change="converter" type="checkbox" />
                <span>Remover caracteres especiais</span>
              </label>
            </div>

            <div>
              <label class="input-aurora-label mb-2">Separador</label>
              <div class="flex gap-2">
                <button
                  v-for="sep in separadores"
                  :key="sep.value"
                  @click="opcoes.separador = sep.value; converter()"
                  :class="['px-4 py-2 rounded-xl border-2 transition-all text-sm font-mono', opcoes.separador === sep.value ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300' : 'border-gray-200 dark:border-slate-700 hover:border-teal-300']"
                >
                  {{ sep.label }}
                </button>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <BaseButton variant="primary" icon="fa-sync-alt" @click="converter" class="flex-1">Converter</BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">Limpar</BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">{{ tipoConversao === 'slug' ? 'Slug gerado' : 'URL codificada' }}</p>
              <p class="text-green-300 text-sm font-semibold">
                <i class="fas fa-link mr-1"></i>Pronto para usar
              </p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ textoEntrada.length }}</div>
                <div class="metric-glass-label">Original</div>
              </div>
              <div class="metric-glass ring-1 ring-green-100 dark:ring-green-900">
                <div class="metric-glass-value text-green-600 dark:text-green-400">{{ resultado.length }}</div>
                <div class="metric-glass-label">Convertido</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">
                  {{ textoEntrada.length ? ((resultado.length / textoEntrada.length) * 100).toFixed(0) : 0 }}%
                </div>
                <div class="metric-glass-label">Tamanho</div>
              </div>
            </div>

            <div class="glass-panel p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
                  <i class="fas fa-link text-teal-500"></i>Resultado
                </h4>
                <button @click="copiar" class="copy-btn">
                  <i class="fas fa-copy mr-1"></i>Copiar
                </button>
              </div>
              <code class="text-teal-700 dark:text-teal-300 text-sm font-mono break-all block p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">{{ resultado }}</code>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">URL gerada com sucesso! Copie e use diretamente no seu sistema.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-link text-4xl mb-3 opacity-30 block text-teal-400"></i>
          <p class="text-sm">Digite um texto para gerar a URL amigável</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const tipoConversao = ref('slug')
const textoEntrada  = ref('')
const resultado     = ref('')

const separadores = [
  { value: '-', label: 'Hífen (-)' },
  { value: '_', label: '_Underscore_' },
  { value: '.', label: '.Ponto.' },
]

const opcoes = reactive({ lowercase: true, removeAccents: true, removeSpecial: true, separador: '-' })

const removerAcentos = (txt: string) => txt.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const converterParaSlug = (txt: string): string => {
  let s = txt
  if (opcoes.lowercase)      s = s.toLowerCase()
  if (opcoes.removeAccents)  s = removerAcentos(s)
  if (opcoes.removeSpecial)  s = s.replace(/[^\w\s-]/g, '')
  s = s.trim().replace(/\s+/g, opcoes.separador)
  const sep = opcoes.separador.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  s = s.replace(new RegExp(`${sep}+`, 'g'), opcoes.separador)
  s = s.replace(new RegExp(`^${sep}+|${sep}+$`, 'g'), '')
  return s
}

const converter = () => {
  if (!textoEntrada.value.trim()) { resultado.value = ''; return }
  resultado.value = tipoConversao.value === 'slug'
    ? converterParaSlug(textoEntrada.value)
    : encodeURIComponent(textoEntrada.value)
}

const copiar = async () => {
  try {
    await navigator.clipboard.writeText(resultado.value)
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro ao copiar' })
  }
}

const limpar = () => { textoEntrada.value = ''; resultado.value = '' }
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
