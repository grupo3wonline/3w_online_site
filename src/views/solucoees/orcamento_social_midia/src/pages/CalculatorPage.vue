<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import { useClipboard } from '@vueuse/core'
import {
  useCalculator,
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from '@/composables/useCalculator'
import { generateBudgetPdf } from '@/lib/pdf'
import { formatCurrency } from '@/lib/format'
import { useLoadingStore } from '@/stores/loading'
import HelpTooltip from '@/components/ui/HelpTooltip.vue'
import CtaSection from '@/components/layout/CtaSection.vue'

const {
  client,
  services,
  discountType,
  discountValue,
  budgetNumber,
  enabledServices,
  subtotal,
  discountAmount,
  total,
  hasSelection,
  updateService,
  lineSubtotal,
  addCustomService,
  removeService,
  reset,
  validateClient,
  textSummary,
} = useCalculator()

const loading = useLoadingStore()
const { copy, copied, isSupported: clipboardSupported } = useClipboard()

async function onAddCustom() {
  const options = SERVICE_CATEGORIES.map((c) => `<option value="${c}">${c}</option>`).join('')
  const { value } = await Swal.fire({
    title: 'Adicionar serviço personalizado',
    html: `
      <input id="swal-svc-name" class="swal2-input" placeholder="Nome do serviço" maxlength="120" autocomplete="off" />
      <input id="swal-svc-price" type="number" min="0" step="0.01" class="swal2-input" placeholder="Preço (R$)" autocomplete="off" />
      <select id="swal-svc-cat" class="swal2-select" style="display:block;margin:1em auto">${options}</select>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Adicionar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#7c3aed',
    preConfirm: () => {
      const name = (document.getElementById('swal-svc-name') as HTMLInputElement)?.value ?? ''
      const price = Number((document.getElementById('swal-svc-price') as HTMLInputElement)?.value)
      const category = (document.getElementById('swal-svc-cat') as HTMLSelectElement)
        ?.value as ServiceCategory
      if (!name.trim()) {
        Swal.showValidationMessage('Informe o nome do serviço')
        return false
      }
      return { name, price, category }
    },
  })
  if (value) addCustomService(value.name, value.price, value.category)
}

async function onReset() {
  const result = await Swal.fire({
    icon: 'question',
    title: 'Limpar orçamento?',
    text: 'Isso restaura os serviços padrão e apaga os dados preenchidos.',
    showCancelButton: true,
    confirmButtonText: 'Sim, limpar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#7c3aed',
  })
  if (result.isConfirmed) reset()
}

async function onCopySummary() {
  await copy(textSummary(formatCurrency))
}

async function onGeneratePdf() {
  if (!hasSelection.value) {
    await Swal.fire({
      icon: 'warning',
      title: 'Atenção!',
      text: 'Selecione pelo menos um serviço para gerar o orçamento.',
      confirmButtonColor: '#7c3aed',
    })
    return
  }

  const parsed = validateClient()
  if (!parsed.success) {
    await Swal.fire({
      icon: 'error',
      title: 'Dados inválidos',
      text: parsed.error.issues[0]?.message ?? 'Verifique os dados informados.',
      confirmButtonColor: '#7c3aed',
    })
    return
  }

  await loading.wrap(async () => {
    await new Promise((r) => setTimeout(r, 400))
    generateBudgetPdf({
      budgetNumber: budgetNumber.value,
      clientName: parsed.data.clientName ?? '',
      clientEmail: parsed.data.clientEmail ?? '',
      observations: parsed.data.observations ?? '',
      providerName: parsed.data.providerName ?? '',
      providerContact: parsed.data.providerContact ?? '',
      validityDays: parsed.data.validityDays ?? 15,
      services: services.value,
      subtotal: subtotal.value,
      discountAmount: discountAmount.value,
      total: total.value,
    })
  }, 'Gerando seu PDF...')

  await Swal.fire({
    icon: 'success',
    title: 'Sucesso!',
    text: 'O PDF foi gerado com sucesso!',
    timer: 2000,
    showConfirmButton: false,
  })
}
</script>

<template>
  <div class="space-y-8">
    <header class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="mb-3 flex items-center gap-3 text-3xl font-bold text-foreground md:text-4xl">
          <Icon icon="fa6-solid:calculator" class="text-primary" aria-hidden="true" />
          Calculadora de Orçamento
        </h1>
        <p class="text-lg text-muted-foreground">
          Configure seus serviços e gere orçamentos profissionais em PDF em minutos.
        </p>
      </div>
      <span
        class="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
        title="Seu rascunho é salvo automaticamente neste navegador"
      >
        <Icon icon="fa6-solid:cloud-arrow-down" aria-hidden="true" />
        Rascunho salvo automaticamente
      </span>
    </header>

    <div class="grid gap-8 lg:grid-cols-3">
      <!-- Configuração -->
      <div class="space-y-6 lg:col-span-2">
        <!-- Prestador + validade -->
        <section class="card-surface p-6">
          <h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
            <Icon icon="fa6-solid:user-tie" class="text-primary" aria-hidden="true" />
            Seus Dados (Prestador)
          </h2>
          <form autocomplete="off" @submit.prevent>
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  for="providerName"
                  class="mb-1 flex items-center gap-1 text-sm font-medium text-foreground"
                >
                  Nome / Empresa
                  <HelpTooltip text="Seu nome ou o nome da sua empresa. Aparece no topo do PDF." />
                </label>
                <input
                  id="providerName"
                  v-model="client.providerName"
                  type="text"
                  autocomplete="off"
                  placeholder="Sua empresa ou seu nome"
                  class="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label for="providerContact" class="mb-1 block text-sm font-medium text-foreground">
                  Contato (telefone / e-mail)
                </label>
                <input
                  id="providerContact"
                  v-model="client.providerContact"
                  type="text"
                  autocomplete="off"
                  placeholder="(00) 00000-0000 ou email"
                  class="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label
                  for="validityDays"
                  class="mb-1 flex items-center gap-1 text-sm font-medium text-foreground"
                >
                  Validade (dias)
                  <HelpTooltip
                    text="Por quantos dias este orçamento é válido. Cria senso de urgência no cliente."
                  />
                </label>
                <input
                  id="validityDays"
                  v-model.number="client.validityDays"
                  type="number"
                  min="1"
                  max="365"
                  autocomplete="off"
                  class="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
          </form>
        </section>

        <!-- Dados do cliente -->
        <section class="card-surface p-6">
          <h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
            <Icon icon="fa6-solid:file-lines" class="text-primary" aria-hidden="true" />
            Informações do Cliente
          </h2>
          <form autocomplete="off" @submit.prevent>
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  for="clientName"
                  class="mb-1 flex items-center gap-1 text-sm font-medium text-foreground"
                >
                  Nome do Cliente
                  <HelpTooltip
                    text="Aparece no cabeçalho do PDF. Opcional, mas recomendado para personalizar a proposta."
                  />
                </label>
                <input
                  id="clientName"
                  v-model="client.clientName"
                  type="text"
                  autocomplete="off"
                  placeholder="Digite o nome do cliente"
                  class="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label
                  for="clientEmail"
                  class="mb-1 flex items-center gap-1 text-sm font-medium text-foreground"
                >
                  E-mail do Cliente
                  <HelpTooltip
                    text="Usado apenas para constar no orçamento. Não enviamos nada automaticamente."
                  />
                </label>
                <input
                  id="clientEmail"
                  v-model="client.clientEmail"
                  type="email"
                  autocomplete="off"
                  placeholder="cliente@email.com"
                  class="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
            <div class="mt-4">
              <label for="observations" class="mb-1 block text-sm font-medium text-foreground">
                Observações
              </label>
              <textarea
                id="observations"
                v-model="client.observations"
                rows="3"
                autocomplete="off"
                placeholder="Adicione observações sobre o projeto..."
                class="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </form>
        </section>

        <!-- Serviços -->
        <section class="card-surface p-6">
          <div class="mb-1 flex flex-wrap items-center justify-between gap-3">
            <h2 class="flex items-center gap-2 text-xl font-bold text-foreground">
              Serviços Disponíveis
              <HelpTooltip
                text="Marque os serviços desejados e ajuste preço e quantidade. O total é calculado automaticamente."
              />
            </h2>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition hover:bg-primary/20"
              @click="onAddCustom"
            >
              <Icon icon="fa6-solid:plus" aria-hidden="true" />
              Adicionar serviço
            </button>
          </div>
          <p class="mb-4 text-sm text-muted-foreground">
            Selecione os serviços, ajuste preços e quantidades.
          </p>
          <div class="space-y-3">
            <div
              v-for="(service, index) in services"
              :key="index"
              :class="[
                'rounded-lg border p-4 transition',
                service.enabled ? 'border-primary bg-primary/5' : 'border-border bg-muted/30',
              ]"
            >
              <div class="flex items-start gap-4">
                <input
                  :id="`service-${index}`"
                  v-model="service.enabled"
                  type="checkbox"
                  class="mt-1 h-4 w-4 accent-primary"
                />
                <div class="flex-1 space-y-3">
                  <label
                    :for="`service-${index}`"
                    class="flex cursor-pointer flex-wrap items-center gap-2 text-sm font-medium text-foreground"
                  >
                    {{ service.name }}
                    <span
                      class="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {{ service.category }}
                    </span>
                  </label>
                  <div v-if="service.enabled" class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="mb-1 block text-xs text-muted-foreground">Preço (R$)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        :value="service.price"
                        autocomplete="off"
                        class="h-9 w-full rounded-lg border border-input bg-background px-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        @input="
                          updateService(
                            index,
                            'price',
                            Number(($event.target as HTMLInputElement).value),
                          )
                        "
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs text-muted-foreground">Quantidade</label>
                      <input
                        type="number"
                        min="1"
                        :value="service.quantity"
                        autocomplete="off"
                        class="h-9 w-full rounded-lg border border-input bg-background px-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        @input="
                          updateService(
                            index,
                            'quantity',
                            Number(($event.target as HTMLInputElement).value),
                          )
                        "
                      />
                    </div>
                  </div>
                </div>
                <div class="flex flex-col items-end gap-2">
                  <span
                    v-if="service.enabled"
                    class="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground"
                  >
                    {{ formatCurrency(lineSubtotal(service)) }}
                  </span>
                  <button
                    type="button"
                    class="text-muted-foreground transition hover:text-destructive"
                    :aria-label="`Remover ${service.name}`"
                    title="Remover serviço"
                    @click="removeService(index)"
                  >
                    <Icon icon="fa6-solid:trash-can" class="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Desconto -->
        <section class="card-surface p-6">
          <h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
            <Icon icon="fa6-solid:tags" class="text-primary" aria-hidden="true" />
            Desconto
            <HelpTooltip text="Aplique um desconto percentual ou em reais sobre o subtotal." />
          </h2>
          <div class="flex flex-wrap items-end gap-4">
            <div>
              <label class="mb-1 block text-xs text-muted-foreground">Tipo</label>
              <div class="inline-flex overflow-hidden rounded-lg border border-input">
                <button
                  type="button"
                  :class="[
                    'px-4 py-2 text-sm font-medium transition',
                    discountType === 'percent'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-foreground hover:bg-muted',
                  ]"
                  @click="discountType = 'percent'"
                >
                  %
                </button>
                <button
                  type="button"
                  :class="[
                    'px-4 py-2 text-sm font-medium transition',
                    discountType === 'fixed'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-foreground hover:bg-muted',
                  ]"
                  @click="discountType = 'fixed'"
                >
                  R$
                </button>
              </div>
            </div>
            <div class="flex-1">
              <label for="discountValue" class="mb-1 block text-xs text-muted-foreground">
                Valor do desconto
              </label>
              <input
                id="discountValue"
                v-model.number="discountValue"
                type="number"
                min="0"
                step="0.01"
                autocomplete="off"
                placeholder="0"
                class="h-9 w-full rounded-lg border border-input bg-background px-3 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <p
              v-if="discountAmount > 0"
              class="text-sm font-medium text-green-600 dark:text-green-400"
            >
              Você economiza {{ formatCurrency(discountAmount) }}
            </p>
          </div>
        </section>
      </div>

      <!-- Resumo -->
      <aside class="space-y-6">
        <div class="card-surface sticky top-24 p-6">
          <div class="mb-4 text-center">
            <h2 class="text-xl font-bold text-foreground">Resumo do Orçamento</h2>
            <p class="text-xs text-muted-foreground">Nº {{ budgetNumber }}</p>
          </div>
          <div class="space-y-3">
            <div
              v-for="(service, i) in enabledServices"
              :key="i"
              class="flex justify-between gap-2 text-sm"
            >
              <span class="flex-1 truncate text-muted-foreground">{{ service.name }}</span>
              <span class="font-medium text-foreground">{{
                formatCurrency(lineSubtotal(service))
              }}</span>
            </div>
            <p v-if="!hasSelection" class="text-sm text-muted-foreground">
              Nenhum serviço selecionado ainda.
            </p>
          </div>

          <div v-if="hasSelection" class="mt-4 space-y-2 border-t border-border pt-4">
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Subtotal</span>
              <span class="font-medium text-foreground">{{ formatCurrency(subtotal) }}</span>
            </div>
            <div
              v-if="discountAmount > 0"
              class="flex justify-between text-sm text-green-600 dark:text-green-400"
            >
              <span>Desconto</span>
              <span>- {{ formatCurrency(discountAmount) }}</span>
            </div>
            <div class="flex justify-between border-t border-border pt-2 text-lg font-bold">
              <span class="text-foreground">Total</span>
              <span class="text-primary">{{ formatCurrency(total) }}</span>
            </div>
          </div>

          <div class="mt-6 space-y-3">
            <button
              type="button"
              class="btn-primary w-full"
              :disabled="!hasSelection"
              @click="onGeneratePdf"
            >
              <Icon icon="fa6-solid:download" aria-hidden="true" />
              Gerar PDF
            </button>
            <button
              v-if="clipboardSupported"
              type="button"
              class="btn-outline w-full"
              :disabled="!hasSelection"
              @click="onCopySummary"
            >
              <Icon :icon="copied ? 'fa6-solid:check' : 'fa6-solid:copy'" aria-hidden="true" />
              {{ copied ? 'Copiado!' : 'Copiar resumo' }}
            </button>
            <a
              :href="`mailto:?subject=Orçamento Social Mídia nº ${budgetNumber}&body=Segue meu orçamento no valor de ${formatCurrency(total)}.`"
              :class="['btn-outline w-full', !hasSelection ? 'pointer-events-none opacity-50' : '']"
            >
              <Icon icon="fa6-solid:paper-plane" aria-hidden="true" />
              Enviar por E-mail
            </a>
            <button
              type="button"
              class="w-full text-sm font-medium text-muted-foreground transition hover:text-destructive"
              @click="onReset"
            >
              <Icon icon="fa6-solid:broom" class="mr-1" aria-hidden="true" />
              Limpar orçamento
            </button>
          </div>
        </div>
      </aside>
    </div>

    <CtaSection variant="secondary" />
  </div>
</template>
