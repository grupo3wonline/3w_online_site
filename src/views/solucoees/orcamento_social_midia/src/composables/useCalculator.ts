import { computed, reactive, ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { z } from 'zod'
import { safeNumber, sanitizeText } from '@/lib/security'

/** Categorias de serviço para agrupamento visual e no PDF. */
export type ServiceCategory = 'Gestão' | 'Conteúdo' | 'Tráfego pago' | 'Consultoria' | 'Outros'

/** Item de serviço da calculadora. */
export interface ServiceItem {
  name: string
  price: number
  quantity: number
  enabled: boolean
  category: ServiceCategory
}

/** Tipo de desconto aplicado ao total. */
export type DiscountType = 'percent' | 'fixed'

/** Schema Zod para validar os dados do cliente/prestador antes de gerar o PDF. */
export const clientSchema = z.object({
  clientName: z.string().trim().max(120).optional().default(''),
  clientEmail: z.string().trim().max(254).email('E-mail inválido').optional().or(z.literal('')),
  observations: z.string().trim().max(1000).optional().default(''),
  providerName: z.string().trim().max(120).optional().default(''),
  providerContact: z.string().trim().max(120).optional().default(''),
  validityDays: z.number().int().min(1).max(365).optional().default(15),
})

export type ClientData = z.infer<typeof clientSchema>

/** Catálogo padrão de serviços (preços de referência de mercado). */
export function defaultServices(): ServiceItem[] {
  return [
    {
      name: 'Gestão de 1 perfil (4 posts/semana)',
      price: 800,
      quantity: 1,
      enabled: false,
      category: 'Gestão',
    },
    {
      name: 'Gestão de 2 perfis (4 posts/semana cada)',
      price: 1400,
      quantity: 1,
      enabled: false,
      category: 'Gestão',
    },
    {
      name: 'Design de feed (carrossel)',
      price: 80,
      quantity: 1,
      enabled: false,
      category: 'Conteúdo',
    },
    {
      name: 'Stories personalizados',
      price: 50,
      quantity: 1,
      enabled: false,
      category: 'Conteúdo',
    },
    { name: 'Reels/vídeos curtos', price: 150, quantity: 1, enabled: false, category: 'Conteúdo' },
    {
      name: 'Thumbnail para YouTube',
      price: 60,
      quantity: 1,
      enabled: false,
      category: 'Conteúdo',
    },
    {
      name: 'Tráfego pago Meta Ads',
      price: 600,
      quantity: 1,
      enabled: false,
      category: 'Tráfego pago',
    },
    {
      name: 'Tráfego pago Google Ads',
      price: 700,
      quantity: 1,
      enabled: false,
      category: 'Tráfego pago',
    },
    {
      name: 'Consultoria estratégica (1h)',
      price: 200,
      quantity: 1,
      enabled: false,
      category: 'Consultoria',
    },
    {
      name: 'Reunião de alinhamento',
      price: 150,
      quantity: 1,
      enabled: false,
      category: 'Consultoria',
    },
  ]
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'Gestão',
  'Conteúdo',
  'Tráfego pago',
  'Consultoria',
  'Outros',
]

const STORAGE_KEY = 'osm-calculator-draft'

interface CalculatorDraft {
  client: ClientData
  services: ServiceItem[]
  discountType: DiscountType
  discountValue: number
}

/** Gera um número de orçamento legível baseado na data atual. */
export function generateBudgetNumber(date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = String(Math.floor(Math.random() * 9000) + 1000)
  return `${y}${m}${d}-${rand}`
}

/**
 * Composable com o estado e as regras de negócio da calculadora.
 * Mantém a lógica isolada da apresentação (SoC / Clean Code).
 * O rascunho é persistido automaticamente em localStorage.
 */
export function useCalculator() {
  const draft = useStorage<CalculatorDraft>(STORAGE_KEY, {
    client: {
      clientName: '',
      clientEmail: '',
      observations: '',
      providerName: '',
      providerContact: '',
      validityDays: 15,
    },
    services: defaultServices(),
    discountType: 'percent',
    discountValue: 0,
  })

  const client = reactive<ClientData>({ ...draft.value.client })
  const services = ref<ServiceItem[]>(draft.value.services)
  const discountType = ref<DiscountType>(draft.value.discountType)
  const discountValue = ref<number>(draft.value.discountValue)
  const budgetNumber = ref<string>(generateBudgetNumber())

  // Persiste automaticamente qualquer alteração (rascunho)
  watch(
    [client, services, discountType, discountValue],
    () => {
      draft.value = {
        client: { ...client },
        services: services.value,
        discountType: discountType.value,
        discountValue: discountValue.value,
      }
    },
    { deep: true },
  )

  const enabledServices = computed(() => services.value.filter((s) => s.enabled))

  /** Soma dos serviços antes do desconto. */
  const subtotal = computed(() =>
    enabledServices.value.reduce((acc, s) => acc + s.price * s.quantity, 0),
  )

  /** Valor do desconto em reais (derivado do tipo e valor informado). */
  const discountAmount = computed(() => {
    if (discountValue.value <= 0) return 0
    if (discountType.value === 'percent') {
      const pct = Math.min(discountValue.value, 100)
      return (subtotal.value * pct) / 100
    }
    return Math.min(discountValue.value, subtotal.value)
  })

  /** Total final após o desconto. */
  const total = computed(() => Math.max(subtotal.value - discountAmount.value, 0))

  const hasSelection = computed(() => enabledServices.value.length > 0)

  /** Serviços habilitados agrupados por categoria (para exibição). */
  const groupedEnabled = computed(() => {
    const groups = new Map<ServiceCategory, ServiceItem[]>()
    for (const s of enabledServices.value) {
      const list = groups.get(s.category) ?? []
      list.push(s)
      groups.set(s.category, list)
    }
    return groups
  })

  function updateService<K extends keyof ServiceItem>(
    index: number,
    field: K,
    value: ServiceItem[K],
  ) {
    const item = services.value[index]
    if (!item) return
    if (field === 'price' || field === 'quantity') {
      item[field] = safeNumber(value, field === 'quantity' ? 1 : 0) as ServiceItem[K]
    } else {
      item[field] = value
    }
  }

  function lineSubtotal(item: ServiceItem): number {
    return item.price * item.quantity
  }

  /** Adiciona um serviço personalizado (já habilitado). */
  function addCustomService(name: string, price: number, category: ServiceCategory = 'Outros') {
    const clean = sanitizeText(name, 120)
    if (!clean) return false
    services.value.push({
      name: clean,
      price: safeNumber(price, 0),
      quantity: 1,
      enabled: true,
      category,
    })
    return true
  }

  /** Remove um serviço pelo índice. */
  function removeService(index: number) {
    services.value.splice(index, 1)
  }

  /** Restaura o catálogo padrão e limpa os dados do cliente/desconto. */
  function reset() {
    services.value = defaultServices()
    client.clientName = ''
    client.clientEmail = ''
    client.observations = ''
    client.providerName = ''
    client.providerContact = ''
    client.validityDays = 15
    discountType.value = 'percent'
    discountValue.value = 0
    budgetNumber.value = generateBudgetNumber()
  }

  /** Valida e higieniza os dados do cliente/prestador. Retorna erros se houver. */
  function validateClient() {
    const parsed = clientSchema.safeParse({
      clientName: sanitizeText(client.clientName ?? '', 120),
      clientEmail: sanitizeText(client.clientEmail ?? '', 254),
      observations: sanitizeText(client.observations ?? '', 1000),
      providerName: sanitizeText(client.providerName ?? '', 120),
      providerContact: sanitizeText(client.providerContact ?? '', 120),
      validityDays: safeNumber(client.validityDays ?? 15, 1, 365),
    })
    return parsed
  }

  /** Resumo do orçamento em texto (para copiar/compartilhar). */
  function textSummary(formatCurrency: (n: number) => string): string {
    const lines: string[] = [
      `Orçamento nº ${budgetNumber.value}`,
      '',
      ...enabledServices.value.map(
        (s) => `- ${s.name} (${s.quantity}x): ${formatCurrency(lineSubtotal(s))}`,
      ),
      '',
      `Subtotal: ${formatCurrency(subtotal.value)}`,
    ]
    if (discountAmount.value > 0) {
      lines.push(`Desconto: -${formatCurrency(discountAmount.value)}`)
    }
    lines.push(`Total: ${formatCurrency(total.value)}`)
    return lines.join('\n')
  }

  return {
    client,
    services,
    discountType,
    discountValue,
    budgetNumber,
    enabledServices,
    groupedEnabled,
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
  }
}
