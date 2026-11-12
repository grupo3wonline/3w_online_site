<template>
  <ToolShell
    title="Gerador de Endereço Bitcoin"
    description="Gere endereços Bitcoin fictícios para fins educacionais e de desenvolvimento. Apenas para testes."
    icon="fa-bitcoin-sign"
    icon-gradient="from-amber-500 to-orange-700"
    orb-color="orange"
    :quick-tips="['3 formatos', 'Chaves fictícias', 'Apenas para testes']"
    :tips="[
      { title: 'Tipos de endereço', text: 'P2PKH (Legacy, começa com 1), P2SH (começa com 3) e Bech32/SegWit (começa com bc1) são os três formatos principais.' },
      { title: 'SegWit economiza taxas', text: 'Endereços Bech32 (SegWit) têm taxas de transação menores por utilizarem um formato mais eficiente.', type: 'info' },
      { title: '⚠️ Atenção', text: 'Estes endereços são completamente fictícios. NÃO envie criptomoedas reais para endereços gerados aqui.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Legacy P2PKH', desc: 'Formato clássico do Bitcoin', result: 'Começa com 1 (ex: 1BpEi6DfDAUFd...)' },
      { title: 'Pay-to-Script P2SH', desc: 'Suporte a multisig', result: 'Começa com 3 (ex: 3J98t1WpEZ73...)' },
      { title: 'Bech32 SegWit', desc: 'Formato moderno, taxas menores', result: 'Começa com bc1q (ex: bc1qar0srrr...)' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Tipo de endereço -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-network-wired mr-1.5 text-amber-500"></i>
              Tipo de endereço
            </label>
            <div class="space-y-2">
              <button
                v-for="tipo in tiposEndereco"
                :key="tipo.id"
                @click="tipoEndereco = tipo.id"
                :class="[
                  'w-full p-3 rounded-xl border-2 transition-all text-left flex items-center gap-3',
                  tipoEndereco === tipo.id
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-amber-300'
                ]"
              >
                <i :class="['fas fa-circle text-xs', tipoEndereco === tipo.id ? 'text-amber-500' : 'text-gray-300']"></i>
                <div>
                  <div class="text-sm font-bold text-gray-900 dark:text-white">{{ tipo.nome }}</div>
                  <div class="text-xs text-gray-500 dark:text-slate-400">Começa com <code class="bg-gray-100 dark:bg-slate-700 px-1 rounded">{{ tipo.prefixo }}</code></div>
                </div>
              </button>
            </div>
          </div>

          <BaseInput
            v-model="quantidade"
            label="Quantidade de endereços"
            type="number"
            :min="1"
            :max="50"
            icon="fa-hashtag"
            hint="Máximo: 50 endereços por geração"
            tooltip="Quantos endereços fictícios você quer gerar de uma vez."
          />

          <BaseButton variant="warning" icon="fa-bitcoin-sign" @click="gerar" class="w-full">
            Gerar Endereços
          </BaseButton>
        </div>

        <!-- Aviso importante -->
        <div class="tip-card-warning">
          <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
          <div class="text-xs">
            <strong class="block mb-1">⚠️ Apenas para testes e desenvolvimento</strong>
            Estes endereços são <strong>fictícios</strong>. NÃO envie Bitcoin real. Chaves privadas são aleatórias e não controlam fundos reais.
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in">
          <div v-if="enderecos.length" class="space-y-4">
            <!-- Cabeçalho -->
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">Endereços gerados</p>
              <p class="text-5xl font-black text-white mb-1">{{ enderecos.length }}</p>
              <p class="text-amber-300 text-sm font-semibold">{{ getTipoNome() }}</p>
            </div>

            <!-- Ação baixar -->
            <BaseButton variant="outline" icon="fa-download" @click="baixarTXT" class="w-full">
              Baixar TXT
            </BaseButton>

            <!-- Lista de endereços -->
            <div class="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              <div
                v-for="(item, index) in enderecos"
                :key="index"
                class="glass-panel p-4"
              >
                <div class="flex items-start justify-between gap-3 mb-3">
                  <div class="flex-1">
                    <span class="text-[10px] text-gray-500 dark:text-slate-400 block mb-1">Endereço {{ index + 1 }} · {{ item.tipo }}</span>
                    <span class="font-mono text-xs font-semibold text-gray-900 dark:text-white break-all">{{ item.endereco }}</span>
                  </div>
                  <button @click="copiar(item.endereco)" class="copy-btn flex-shrink-0 mt-1">
                    <i class="fas fa-copy text-xs"></i>
                  </button>
                </div>
                <div class="pt-2 border-t border-gray-100 dark:border-slate-700">
                  <span class="text-[10px] text-gray-500 dark:text-slate-400 block mb-0.5">Chave privada (fictícia)</span>
                  <span class="font-mono text-[10px] text-gray-600 dark:text-slate-300 break-all">{{ item.chavePrivada.substring(0, 32) }}...</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!enderecos.length" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-bitcoin-sign text-3xl mb-3 opacity-30 block text-amber-400"></i>
          <p class="text-sm">Selecione o tipo e clique em <strong>Gerar Endereços</strong></p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const tiposEndereco = [
  { id: 'p2pkh',  nome: 'P2PKH (Legacy)',   prefixo: '1' },
  { id: 'p2sh',   nome: 'P2SH',             prefixo: '3' },
  { id: 'bech32', nome: 'Bech32 (SegWit)',   prefixo: 'bc1' },
]

const tipoEndereco = ref('p2pkh')
const quantidade   = ref(5)
const enderecos    = ref([])

const chars    = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const charsHex = '0123456789abcdef'

const rnd = (len, c) => Array.from({ length: len }, () => c[Math.floor(Math.random() * c.length)]).join('')

const gerarEnderecoP2PKH   = () => '1'    + rnd(33, chars)
const gerarEnderecoP2SH    = () => '3'    + rnd(33, chars)
const gerarEnderecoBech32  = () => 'bc1q' + rnd(39 + Math.floor(Math.random() * 3), chars.toLowerCase())
const gerarChavePrivada    = () => rnd(64, charsHex)

const getTipoNome = () => tiposEndereco.find(t => t.id === tipoEndereco.value)?.nome || ''

const gerar = () => {
  const qtd = Number(quantidade.value)
  enderecos.value = Array.from({ length: qtd }, () => {
    let endereco = ''
    let tipo = ''
    if (tipoEndereco.value === 'p2pkh')  { endereco = gerarEnderecoP2PKH();  tipo = 'P2PKH (Legacy)' }
    else if (tipoEndereco.value === 'p2sh')   { endereco = gerarEnderecoP2SH();   tipo = 'P2SH' }
    else { endereco = gerarEnderecoBech32(); tipo = 'Bech32 (SegWit)' }
    return { endereco, tipo, chavePrivada: gerarChavePrivada() }
  })
}

const copiar = async (texto) => {
  try {
    await navigator.clipboard.writeText(texto)
    Swal.fire({ title: 'Copiado!', icon: 'success', timer: 1200, showConfirmButton: false })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

const baixarTXT = () => {
  let conteudo = 'ENDEREÇOS BITCOIN FICTÍCIOS PARA TESTE\n'
  conteudo += '=======================================\n\n'
  enderecos.value.forEach((item, i) => {
    conteudo += `ENDEREÇO ${i + 1}\nTipo: ${item.tipo}\nEndereço: ${item.endereco}\nChave Privada: ${item.chavePrivada}\n\n---\n\n`
  })
  conteudo += '\n⚠️ AVISO: Estes endereços são FICTÍCIOS. NÃO envie Bitcoin real!\n'
  const blob = new Blob([conteudo], { type: 'text/plain' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = 'enderecos-bitcoin-teste.txt'; a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
