<template>
  <div
    class="min-h-screen bg-gradient-to-br from-bbq-warm via-background to-bbq-warm/50 dark:from-background dark:via-background dark:to-background"
  >
    <div class="container mx-auto px-4 py-8">
      <AppBreadcrumb />

      <!-- Header -->
      <div class="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
        >
          <i class="fa-solid fa-arrow-left"></i> Voltar
        </router-link>
        <div class="flex items-center gap-3">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600"
          >
            <i class="fa-solid fa-receipt text-xl text-white"></i>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-foreground md:text-3xl">Orçamento do Churrasco</h1>
            <p class="text-sm text-muted-foreground">
              Monte sua lista de compras e divida o valor entre os participantes
            </p>
          </div>
        </div>
      </div>

      <!-- Dica -->
      <div class="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
        <p class="text-sm text-foreground">
          <i class="fa-solid fa-lightbulb mr-2 text-emerald-600"></i>
          <strong>Dica:</strong> adicione cada item com quantidade e valor unitário. O total é
          somado automaticamente e dividido pelo número de participantes (a famosa "vaquinha").
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Itens (2 colunas) -->
        <div class="lg:col-span-2">
          <div class="overflow-hidden rounded-2xl bg-card shadow-xl">
            <div class="flex items-center justify-between bg-gradient-to-r from-emerald-500/10 to-green-600/10 p-6">
              <h2 class="flex items-center gap-2 text-lg font-bold">
                <i class="fa-solid fa-list-check text-emerald-600"></i> Itens do orçamento
              </h2>
              <span class="text-sm text-muted-foreground">{{ itens.length }} item(ns)</span>
            </div>

            <div class="p-4 sm:p-6">
              <!-- Cabeçalho da tabela (desktop) -->
              <div class="hidden gap-3 px-2 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:grid sm:grid-cols-[1fr_5rem_7rem_6rem_2.5rem]">
                <span>Item</span>
                <span class="text-center">Qtd.</span>
                <span class="text-right">Valor unit.</span>
                <span class="text-right">Subtotal</span>
                <span></span>
              </div>

              <!-- Lista de itens -->
              <div v-if="itens.length" class="space-y-3">
                <div
                  v-for="(item, idx) in itens"
                  :key="item.id"
                  class="rounded-xl border border-border p-3 sm:grid sm:grid-cols-[1fr_5rem_7rem_6rem_2.5rem] sm:items-center sm:gap-3 sm:border-0 sm:p-2"
                >
                  <div class="mb-2 sm:mb-0">
                    <label :for="`nome-${item.id}`" class="mb-1 block text-xs text-muted-foreground sm:hidden">Item</label>
                    <input
                      :id="`nome-${item.id}`"
                      v-model="item.nome"
                      type="text"
                      maxlength="60"
                      autocomplete="off"
                      placeholder="Ex.: Picanha"
                      class="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div class="mb-2 sm:mb-0">
                    <label :for="`qtd-${item.id}`" class="mb-1 block text-xs text-muted-foreground sm:hidden">Quantidade</label>
                    <input
                      :id="`qtd-${item.id}`"
                      v-model.number="item.quantidade"
                      type="number"
                      min="0"
                      step="1"
                      inputmode="decimal"
                      autocomplete="off"
                      class="w-full rounded-lg border border-input bg-background px-3 py-2 text-center text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div class="mb-2 sm:mb-0">
                    <label :for="`valor-${item.id}`" class="mb-1 block text-xs text-muted-foreground sm:hidden">Valor unitário (R$)</label>
                    <input
                      :id="`valor-${item.id}`"
                      v-model.number="item.valorUnitario"
                      type="number"
                      min="0"
                      step="0.5"
                      inputmode="decimal"
                      autocomplete="off"
                      class="w-full rounded-lg border border-input bg-background px-3 py-2 text-right text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div class="flex items-center justify-between sm:justify-end">
                    <span class="text-xs text-muted-foreground sm:hidden">Subtotal</span>
                    <span class="text-right text-sm font-semibold text-foreground">{{
                      formatarBRL(subtotalItem(item))
                    }}</span>
                  </div>
                  <div class="mt-2 flex justify-end sm:mt-0">
                    <button
                      type="button"
                      class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      :title="`Remover ${item.nome || 'item ' + (idx + 1)}`"
                      :aria-label="`Remover ${item.nome || 'item ' + (idx + 1)}`"
                      @click="store.removerItem(item.id)"
                    >
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Estado vazio -->
              <div v-else class="rounded-xl border border-dashed border-border py-10 text-center">
                <i class="fa-solid fa-cart-shopping mb-3 text-4xl text-muted-foreground/30"></i>
                <p class="text-muted-foreground">Nenhum item ainda. Adicione o primeiro abaixo.</p>
              </div>

              <button
                type="button"
                class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-emerald-500/50 px-4 py-3 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-500/10"
                @click="store.adicionarItem()"
              >
                <i class="fa-solid fa-plus"></i> Adicionar item
              </button>
            </div>
          </div>
        </div>

        <!-- Resumo / rateio (1 coluna, sticky) -->
        <div class="lg:col-span-1">
          <div class="space-y-4 lg:sticky lg:top-24">
            <div class="overflow-hidden rounded-2xl bg-card shadow-lg">
              <div class="h-1 bg-gradient-to-r from-emerald-500 to-green-600"></div>
              <div class="p-6">
                <h3 class="mb-4 text-lg font-bold text-emerald-600">
                  <i class="fa-solid fa-calculator mr-2"></i>Resumo
                </h3>

                <div class="mb-4 rounded-xl bg-muted/50 p-4 text-center">
                  <p class="text-xs text-muted-foreground">Total geral</p>
                  <p class="text-3xl font-extrabold text-foreground">{{ formatarBRL(resumo.total) }}</p>
                </div>

                <div class="mb-4 space-y-2">
                  <label for="participantes" class="flex items-center gap-2 text-sm font-medium">
                    <i class="fa-solid fa-users text-emerald-600"></i> Participantes (vaquinha)
                  </label>
                  <input
                    id="participantes"
                    v-model.number="participantes"
                    type="number"
                    min="1"
                    step="1"
                    inputmode="numeric"
                    autocomplete="off"
                    class="w-full rounded-lg border border-input bg-background px-4 py-3 text-center text-lg outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                  />
                  <p class="text-xs text-muted-foreground">Entre quantas pessoas dividir o valor</p>
                </div>

                <div class="rounded-xl border-2 border-emerald-500/30 bg-emerald-50 p-4 text-center dark:bg-emerald-950/30">
                  <p class="text-xs text-muted-foreground">Valor por pessoa</p>
                  <p class="text-2xl font-bold text-emerald-600">{{ formatarBRL(resumo.porPessoa) }}</p>
                </div>
              </div>
            </div>

            <!-- Ações -->
            <div class="print-hidden flex flex-wrap gap-2">
              <button
                type="button"
                class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
                :disabled="!itens.length"
                :class="{ 'cursor-not-allowed opacity-50': !itens.length }"
                @click="imprimir"
              >
                <i class="fa-solid fa-print"></i> Imprimir
              </button>
              <button
                type="button"
                class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
                :disabled="!itens.length"
                :class="{ 'cursor-not-allowed opacity-50': !itens.length }"
                @click="baixar"
              >
                <i class="fa-solid fa-download"></i> Baixar
              </button>
              <button
                type="button"
                class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
                :disabled="!itens.length"
                :class="{ 'cursor-not-allowed opacity-50': !itens.length }"
                @click="compartilhar"
              >
                <i class="fa-solid fa-share-nodes"></i> Compartilhar
              </button>
              <button
                type="button"
                class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                @click="onLimpar"
              >
                <i class="fa-solid fa-trash-can"></i> Limpar tudo
              </button>
            </div>

            <!-- CTA calculadora automática -->
            <div class="rounded-2xl bg-gradient-to-r from-bbq-orange/10 to-bbq-red/10 p-5 text-center">
              <p class="mb-3 text-sm text-muted-foreground">
                Não sabe as quantidades? Use a calculadora automática.
              </p>
              <router-link
                to="/calculadora"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-bbq-orange to-bbq-red px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg"
              >
                <i class="fa-solid fa-calculator"></i> Calcular quantidades
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import { useOrcamentoStore } from '@/stores/orcamento'
import { subtotalItem, formatarBRL, gerarResumoOrcamento } from '@/lib/orcamento'

const store = useOrcamentoStore()
const { itens, participantes, resumo } = storeToRefs(store)

function imprimir() {
  window.print()
}

function baixar() {
  if (!itens.value.length) return
  const texto = gerarResumoOrcamento(itens.value, participantes.value)
  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'orcamento-churrasco.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

async function compartilhar() {
  if (!itens.value.length) return
  const texto = `Orçamento do churrasco: ${formatarBRL(resumo.value.total)} para ${resumo.value.participantes} pessoa(s) = ${formatarBRL(resumo.value.porPessoa)} por pessoa.`
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Orçamento do Churrasco', text: texto, url: window.location.href })
    } catch {
      /* cancelado */
    }
  } else {
    try {
      await navigator.clipboard.writeText(`${texto} ${window.location.href}`)
      Swal.fire({
        icon: 'success',
        title: 'Copiado!',
        text: 'Resumo do orçamento copiado.',
        confirmButtonColor: '#ea580c',
        timer: 1600,
        showConfirmButton: false,
        customClass: { popup: 'rounded-2xl' },
      })
    } catch {
      Swal.fire({
        icon: 'info',
        title: 'Compartilhar',
        text: 'Copie o link da página para compartilhar seu orçamento!',
        confirmButtonColor: '#ea580c',
        customClass: { popup: 'rounded-2xl' },
      })
    }
  }
}

async function onLimpar() {
  const r = await Swal.fire({
    icon: 'warning',
    title: 'Limpar orçamento?',
    text: 'Todos os itens e participantes serão removidos.',
    showCancelButton: true,
    confirmButtonText: 'Sim, limpar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    customClass: { popup: 'rounded-2xl' },
  })
  if (r.isConfirmed) {
    store.limpar()
    Swal.fire({
      icon: 'success',
      title: 'Orçamento limpo',
      confirmButtonColor: '#ea580c',
      timer: 1200,
      showConfirmButton: false,
      customClass: { popup: 'rounded-2xl' },
    })
  }
}
</script>
