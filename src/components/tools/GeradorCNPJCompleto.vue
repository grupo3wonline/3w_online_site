<template>
  <ToolShell
    title="Gerador de CNPJ Completo"
    description="Gere dados completos de empresas fictícias com CNPJ válido, razão social, endereço e contatos para testes."
    icon="fa-building"
    icon-gradient="from-indigo-500 to-blue-700"
    orb-color="indigo"
    :quick-tips="['CNPJ válido', 'Dados completos', 'Apenas para testes']"
    :tips="[
      { title: 'Validação do CNPJ', text: 'Os CNPJs gerados passam na validação matemática (dígitos verificadores corretos), mas não correspondem a empresas reais.' },
      { title: 'Campos gerados', text: 'Razão social, nome fantasia, CNPJ, data de abertura, telefone, email e endereço completo.', type: 'info' },
      { title: '⚠️ Uso legal apenas', text: 'Use exclusivamente em ambientes de desenvolvimento/homologação. Uso em documentos oficiais é crime de falsidade ideológica.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Empresa de TI', desc: 'Gera dados de empresa fictícia do setor tecnológico', result: 'Tech Solutions Ltda · CNPJ: XX.XXX.XXX/0001-XX' },
      { title: 'Lote de empresas', desc: 'Quantidade: 10', result: '10 empresas fictícias com dados completos' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <BaseInput
            v-model="quantidade"
            label="Quantidade de empresas"
            type="number"
            :min="1"
            :max="50"
            icon="fa-hashtag"
            hint="Máximo: 50 empresas por geração"
            tooltip="Quantas empresas fictícias você quer gerar de uma vez."
          />

          <BaseButton variant="primary" icon="fa-building" @click="gerar" class="w-full">
            Gerar Empresas
          </BaseButton>
        </div>

        <!-- Aviso -->
        <div class="tip-card-warning">
          <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
          <div class="text-xs">
            <strong class="block mb-1">⚠️ Uso exclusivo para desenvolvimento</strong>
            CNPJs são fictícios. Uso em documentos oficiais configura crime de falsificação.
          </div>
        </div>

        <!-- Se já houver empresas, mostrar métricas -->
        <Transition name="scale-in">
          <div v-if="empresas.length" class="glass-panel p-4">
            <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
              <i class="fas fa-chart-bar text-indigo-500"></i>
              Resumo da geração
            </h4>
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-indigo-100 dark:ring-indigo-900">
                <div class="metric-glass-value text-indigo-600 dark:text-indigo-400">{{ empresas.length }}</div>
                <div class="metric-glass-label">Empresas</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ cidades.length }}</div>
                <div class="metric-glass-label">Cidades</div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in">
          <div v-if="empresas.length" class="space-y-3">
            <!-- Ações -->
            <div class="flex gap-2">
              <div class="flex-1 text-sm font-semibold text-gray-700 dark:text-slate-200 flex items-center gap-2">
                <i class="fas fa-building text-indigo-500"></i>
                {{ empresas.length }} empresa(s) gerada(s)
              </div>
              <BaseButton variant="outline" icon="fa-download" size="sm" @click="baixarTXT">
                TXT
              </BaseButton>
            </div>

            <!-- Lista de empresas -->
            <div class="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              <div
                v-for="(empresa, index) in empresas"
                :key="index"
                class="glass-panel p-4"
              >
                <div class="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 class="font-bold text-gray-900 dark:text-white text-sm">{{ empresa.razaoSocial }}</h4>
                    <p class="text-xs text-gray-500 dark:text-slate-400">{{ empresa.nomeFantasia }}</p>
                  </div>
                  <button @click="copiar(empresa)" class="copy-btn flex-shrink-0">
                    <i class="fas fa-copy text-xs"></i>
                  </button>
                </div>
                <div class="grid grid-cols-1 gap-1.5 text-xs">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-id-card text-indigo-500 w-3"></i>
                    <span class="text-gray-500 dark:text-slate-400">CNPJ:</span>
                    <span class="font-mono font-bold text-gray-900 dark:text-white">{{ empresa.cnpj }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="fas fa-calendar text-indigo-500 w-3"></i>
                    <span class="text-gray-500 dark:text-slate-400">Abertura:</span>
                    <span class="font-semibold text-gray-900 dark:text-white">{{ empresa.dataAbertura }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="fas fa-phone text-indigo-500 w-3"></i>
                    <span class="text-gray-500 dark:text-slate-400">Tel:</span>
                    <span class="font-semibold text-gray-900 dark:text-white">{{ empresa.telefone }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="fas fa-envelope text-indigo-500 w-3"></i>
                    <span class="text-gray-500 dark:text-slate-400">Email:</span>
                    <span class="font-semibold text-gray-900 dark:text-white">{{ empresa.email }}</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <i class="fas fa-map-marker-alt text-indigo-500 w-3 mt-0.5"></i>
                    <span class="text-gray-900 dark:text-white leading-tight">{{ empresa.endereco }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!empresas.length" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-building text-3xl mb-3 opacity-30 block text-indigo-400"></i>
          <p class="text-sm">Informe a quantidade e clique em <strong>Gerar Empresas</strong></p>
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

interface EmpresaItem {
  razaoSocial: string; nomeFantasia: string; cnpj: string
  dataAbertura: string; telefone: string; email: string; endereco: string
}

const quantidade = ref(5)
const empresas   = ref<EmpresaItem[]>([])

const nomesPrefixo = ['Tech', 'Digital', 'Smart', 'Global', 'Prime', 'Mega', 'Super', 'Ultra', 'Inova', 'Multi']
const nomesSufixo  = ['Solutions', 'Systems', 'Services', 'Group', 'Corp', 'Ltda', 'Tecnologia', 'Comércio', 'Indústria', 'Distribuidora']
const ruas         = ['Rua das Flores', 'Av. Paulista', 'Rua Oscar Freire', 'Av. Faria Lima', 'Rua Augusta', 'Av. Brigadeiro']
const cidades      = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Brasília', 'Salvador', 'Fortaleza']
const ddds         = ['11', '21', '31', '41', '51', '61', '71', '85']

const rnd = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]
const rndInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

const gerarCNPJ = () => {
  const n = Array.from({ length: 8 }, () => rndInt(0, 9))
  const e = [0, 0, 0, 1]
  const all = [...n, ...e]
  const pesos1 = [5,4,3,2,9,8,7,6,5,4,3,2]
  const pesos2 = [6,5,4,3,2,9,8,7,6,5,4,3,2]
  const d1r = all.reduce((s, v, i) => s + v * pesos1[i], 0) % 11
  const d1  = d1r < 2 ? 0 : 11 - d1r
  const all2 = [...all, d1]
  const d2r = all2.reduce((s, v, i) => s + v * pesos2[i], 0) % 11
  const d2  = d2r < 2 ? 0 : 11 - d2r
  const p = all
  return `${p[0]}${p[1]}.${p[2]}${p[3]}${p[4]}.${p[5]}${p[6]}${p[7]}/0001-${d1}${d2}`
}

const gerar = () => {
  const qtd = Number(quantidade.value)
  empresas.value = Array.from({ length: qtd }, () => {
    const prefixo    = rnd(nomesPrefixo)
    const sufixo     = rnd(nomesSufixo)
    const razaoSocial = `${prefixo} ${sufixo}`
    const ano        = rndInt(2010, 2023)
    const mes        = String(rndInt(1, 12)).padStart(2, '0')
    const dia        = String(rndInt(1, 28)).padStart(2, '0')
    const ddd        = rnd(ddds)
    const cidade     = rnd(cidades)
    const rua        = rnd(ruas)
    const cep        = `${rndInt(10000, 99999)}-${String(rndInt(100, 999))}`
    return {
      razaoSocial,
      nomeFantasia: prefixo,
      cnpj:         gerarCNPJ(),
      dataAbertura: `${dia}/${mes}/${ano}`,
      telefone:     `(${ddd}) ${rndInt(9000, 9999)}-${rndInt(1000, 9999)}`,
      email:        `contato@${prefixo.toLowerCase()}.com.br`,
      endereco:     `${rua}, ${rndInt(100, 9999)} — ${cidade} · CEP ${cep}`,
    }
  })
}

const copiar = async (empresa: EmpresaItem) => {
  const texto = `Razão Social: ${empresa.razaoSocial}\nNome Fantasia: ${empresa.nomeFantasia}\nCNPJ: ${empresa.cnpj}\nAbertura: ${empresa.dataAbertura}\nTelefone: ${empresa.telefone}\nEmail: ${empresa.email}\nEndereço: ${empresa.endereco}`
  try {
    await navigator.clipboard.writeText(texto)
    Swal.fire({ title: 'Dados copiados!', icon: 'success', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

const baixarTXT = () => {
  let conteudo = 'EMPRESAS FICTÍCIAS PARA TESTE\n================================\n\n'
  empresas.value.forEach((e, i) => {
    conteudo += `EMPRESA ${i + 1}\nRazão Social: ${e.razaoSocial}\nNome Fantasia: ${e.nomeFantasia}\nCNPJ: ${e.cnpj}\nAbertura: ${e.dataAbertura}\nTelefone: ${e.telefone}\nEmail: ${e.email}\nEndereço: ${e.endereco}\n\n---\n\n`
  })
  const blob = new Blob([conteudo], { type: 'text/plain' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = 'empresas-teste.txt'; a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
