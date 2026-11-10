<template>
  <ToolShell
    title="Gerador de Legenda SRT"
    description="Crie arquivos de legenda no formato SRT para vídeos com editor de timecode integrado."
    icon="fa-closed-captioning"
    icon-gradient="from-teal-500 to-cyan-700"
    orb-color="teal"
    :quick-tips="['Editor visual de legendas', 'Timecode automático', 'Baixe o .srt pronto']"
    :tips="[
      { title: 'Formato SRT', text: 'Cada bloco tem: número sequencial, timecode (HH:MM:SS,ms --> HH:MM:SS,ms) e o texto da legenda.', type: 'info' },
      { title: 'Compatibilidade', text: 'O formato SRT é compatível com VLC, YouTube, Adobe Premiere, DaVinci Resolve e a maioria dos players.', type: 'success' },
      { title: 'Vírgula nos milissegundos', text: 'Atenção: o SRT usa vírgula (,) como separador dos milissegundos, não ponto.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Legenda simples', desc: '00:00:01,000 --> 00:00:03,500', result: '1\n00:00:01,000 --> 00:00:03,500\nOlá, seja bem-vindo!' },
      { title: 'Múltiplas linhas', desc: 'Texto pode ter 2 linhas por bloco', result: 'Linha 1 do texto\nLinha 2 do texto' },
      { title: 'Incremento automático', text: 'Ao adicionar legenda, o timecode é calculado automaticamente a partir do bloco anterior.', result: '' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Editor de Legendas -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Lista de legendas -->
          <div class="space-y-3 max-h-[32rem] overflow-y-auto pr-1">
            <div
              v-for="(legenda, index) in legendas"
              :key="index"
              class="glass-panel p-4"
            >
              <div class="flex items-center justify-between mb-3">
                <span class="badge-aurora-teal font-bold text-sm">{{ index + 1 }}</span>
                <button
                  @click="removerLegenda(index)"
                  class="w-7 h-7 flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  <i class="fas fa-trash text-xs"></i>
                </button>
              </div>
              <div class="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label class="input-aurora-label text-xs">
                    <i class="fas fa-play mr-1 text-teal-500"></i>Início
                  </label>
                  <input
                    v-model="legenda.inicio"
                    type="text"
                    placeholder="00:00:00,000"
                    class="input-aurora text-sm"
                  />
                </div>
                <div>
                  <label class="input-aurora-label text-xs">
                    <i class="fas fa-stop mr-1 text-teal-500"></i>Fim
                  </label>
                  <input
                    v-model="legenda.fim"
                    type="text"
                    placeholder="00:00:02,500"
                    class="input-aurora text-sm"
                  />
                </div>
              </div>
              <div>
                <label class="input-aurora-label text-xs">
                  <i class="fas fa-comment mr-1 text-teal-500"></i>Texto
                </label>
                <textarea
                  v-model="legenda.texto"
                  rows="2"
                  placeholder="Texto da legenda..."
                  class="input-aurora resize-none text-sm"
                ></textarea>
              </div>
            </div>
          </div>

          <BaseButton variant="success" icon="fa-plus" @click="adicionarLegenda" full-width>
            Adicionar Legenda
          </BaseButton>

          <div class="flex gap-3">
            <BaseButton variant="primary" icon="fa-file-alt" @click="gerarSRT" class="flex-1">Gerar SRT</BaseButton>
            <BaseButton variant="success" icon="fa-download" @click="baixarSRT" class="flex-1" :disabled="!srtGerado">Baixar</BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="srtGerado" class="space-y-4">
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">Arquivo SRT gerado</p>
              <p class="text-4xl font-black text-white mb-1">{{ legendas.length }}</p>
              <p class="text-teal-300 text-sm font-semibold">
                <i class="fas fa-closed-captioning mr-1"></i>legendas
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ legendas.length }}</div>
                <div class="metric-glass-label">Blocos</div>
              </div>
              <div class="metric-glass ring-1 ring-cyan-100 dark:ring-cyan-900">
                <div class="metric-glass-value text-cyan-600 dark:text-cyan-400">{{ srtConteudo.length }}</div>
                <div class="metric-glass-label">Caracteres</div>
              </div>
            </div>

            <div class="glass-panel p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
                  <i class="fas fa-file-alt text-teal-500"></i>Pré-visualização SRT
                </h4>
                <button @click="copiarSRT" class="copy-btn">
                  <i class="fas fa-copy mr-1"></i>Copiar
                </button>
              </div>
              <pre class="bg-gray-900 dark:bg-black text-green-400 text-xs font-mono p-3 rounded-lg max-h-72 overflow-auto">{{ srtConteudo }}</pre>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">SRT gerado com sucesso! Baixe e adicione ao seu vídeo no YouTube, VLC ou editor de vídeo.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!srtGerado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-closed-captioning text-4xl mb-3 opacity-30 block text-teal-400"></i>
          <p class="text-sm">Adicione as legendas e clique em Gerar SRT</p>
          <p class="text-xs mt-1">Formato: HH:MM:SS,ms → HH:MM:SS,ms</p>
        </div>

        <!-- Dica de formato -->
        <div class="tip-card-warning mt-4">
          <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
          <div class="text-xs">
            <strong>Formato SRT:</strong> Use vírgula nos milissegundos (ex: 00:00:10,500) e separe os blocos com linha em branco.
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

interface LegendaItem {
  inicio: string
  fim:    string
  texto:  string
}

const legendas    = ref<LegendaItem[]>([
  { inicio: '00:00:00,000', fim: '00:00:02,500', texto: 'Olá, bem-vindo!' },
  { inicio: '00:00:03,000', fim: '00:00:05,000', texto: 'Este é um exemplo de legenda SRT.' },
])
const srtGerado   = ref(false)
const srtConteudo = ref('')

const calcularProximoTempo = (tempo: string, incrementoMs = 500): string => {
  const match = tempo.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/)
  if (!match) return '00:00:00,000'
  let [, h, m, s, ms] = match.map(Number)
  ms += incrementoMs
  s  += Math.floor(ms / 1000); ms %= 1000
  m  += Math.floor(s / 60);    s  %= 60
  h  += Math.floor(m / 60);    m  %= 60
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')},${String(ms).padStart(3,'0')}`
}

const adicionarLegenda = () => {
  const ultima  = legendas.value[legendas.value.length - 1]
  const novoIni = ultima ? calcularProximoTempo(ultima.fim) : '00:00:00,000'
  legendas.value.push({ inicio: novoIni, fim: calcularProximoTempo(novoIni, 2500), texto: '' })
}

const removerLegenda = (index: number) => {
  if (legendas.value.length > 1) {
    legendas.value.splice(index, 1)
  } else {
    Swal.fire({ icon: 'warning', title: 'Mínimo 1 legenda', confirmButtonColor: '#0d9488' })
  }
}

const gerarSRT = () => {
  srtConteudo.value = legendas.value
    .map((l, i) => `${i + 1}\n${l.inicio} --> ${l.fim}\n${l.texto}`)
    .join('\n\n')
    .trim()
  srtGerado.value = true
  Swal.fire({ icon: 'success', title: 'Sucesso!', text: `${legendas.value.length} legendas geradas`, confirmButtonColor: '#0d9488' })
}

const baixarSRT = () => {
  const blob = new Blob([srtConteudo.value], { type: 'text/plain;charset=utf-8' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = `legendas_${Date.now()}.srt`
  document.body.appendChild(a); a.click()
  document.body.removeChild(a); URL.revokeObjectURL(url)
}

const copiarSRT = () => {
  navigator.clipboard.writeText(srtConteudo.value)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 2000, showConfirmButton: false })
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
