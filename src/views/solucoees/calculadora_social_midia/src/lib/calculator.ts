import { z } from 'zod'

/** Níveis de complexidade/senioridade que ajustam o valor final. */
export const COMPLEXITY_OPTIONS = [
  { value: 'basic', label: 'Básico (iniciante)', multiplier: 0.85 },
  { value: 'standard', label: 'Padrão (intermediário)', multiplier: 1 },
  { value: 'advanced', label: 'Avançado (especialista)', multiplier: 1.35 },
  { value: 'premium', label: 'Premium (sênior/agência)', multiplier: 1.7 },
] as const

export type ComplexityValue = (typeof COMPLEXITY_OPTIONS)[number]['value']

/** Schema de validação dos dados da calculadora (Zod). */
export const calculatorSchema = z.object({
  profiles: z.number().min(1, 'Informe ao menos 1 perfil').max(1000),
  platforms: z.number().min(1, 'Informe ao menos 1 plataforma').max(20),
  posts: z.number().min(1, 'Informe ao menos 1 post por semana').max(1000),
  frequency: z.number().min(1, 'Informe a frequência semanal').max(50),
  engagement: z.number().min(0, 'Engajamento inválido').max(100),
  // Recursos adicionais (opcionais, com padrão)
  videos: z.number().min(0).max(500).default(0),
  complexity: z
    .enum(['basic', 'standard', 'advanced', 'premium'])
    .default('standard'),
  adsManagement: z.boolean().default(false),
  reports: z.boolean().default(false),
  communityManagement: z.boolean().default(false),
})

export type CalculatorData = z.infer<typeof calculatorSchema>

/** Constantes do modelo de precificação. Centralizadas para fácil manutenção. */
export const PRICING = {
  basePrice: 0.05,
  platformMultiplier: 10,
  postMultiplier: 5,
  videoMultiplier: 18, // vídeos/reels custam mais que posts estáticos
  frequencyMultiplier: 2,
  engagementMultiplier: 0.1,
  weeksInMonth: 4.33,
  scale: 10,
  minimum: 500,
  // Adicionais fixos (R$/mês) para serviços extras
  addons: {
    adsManagement: 450,
    reports: 250,
    communityManagement: 380,
  },
} as const

export const EMPTY_DATA: CalculatorData = {
  profiles: 0,
  platforms: 0,
  posts: 0,
  frequency: 0,
  engagement: 0,
  videos: 0,
  complexity: 'standard',
  adsManagement: false,
  reports: false,
  communityManagement: false,
}

/** Item detalhado que compõe o valor final. */
export interface BreakdownItem {
  label: string
  value: number
}

/** Resultado completo do cálculo, com detalhamento. */
export interface CalculationResult {
  total: number
  monthly: number
  hourlyEstimate: number
  breakdown: BreakdownItem[]
  complexityLabel: string
  isMinimumApplied: boolean
}

function complexityFor(value: ComplexityValue) {
  return COMPLEXITY_OPTIONS.find((o) => o.value === value) ?? COMPLEXITY_OPTIONS[1]
}

/**
 * Calcula o valor mensal sugerido e o detalhamento por componente.
 * Função pura — não depende de estado externo, facilitando os testes.
 */
export function calculate(data: CalculatorData): CalculationResult {
  const base = data.profiles * PRICING.basePrice
  const platformsCost = data.platforms * PRICING.platformMultiplier
  const postsCost = data.posts * PRICING.postMultiplier
  const videosCost = data.videos * PRICING.videoMultiplier
  const frequencyCost = data.frequency * PRICING.weeksInMonth * PRICING.frequencyMultiplier
  const engagementCost = (data.profiles * data.engagement * PRICING.engagementMultiplier) / 100

  const production =
    (base + platformsCost + postsCost + videosCost + frequencyCost + engagementCost) * PRICING.scale

  const complexity = complexityFor(data.complexity)
  const withComplexity = production * complexity.multiplier

  const addons =
    (data.adsManagement ? PRICING.addons.adsManagement : 0) +
    (data.reports ? PRICING.addons.reports : 0) +
    (data.communityManagement ? PRICING.addons.communityManagement : 0)

  const rawTotal = withComplexity + addons
  const total = Math.max(rawTotal, PRICING.minimum)

  const breakdown: BreakdownItem[] = [
    { label: 'Produção de conteúdo', value: production },
    { label: `Ajuste de complexidade (${complexity.label})`, value: withComplexity - production },
  ]
  if (data.adsManagement) breakdown.push({ label: 'Gestão de anúncios', value: PRICING.addons.adsManagement })
  if (data.reports) breakdown.push({ label: 'Relatórios mensais', value: PRICING.addons.reports })
  if (data.communityManagement)
    breakdown.push({ label: 'Gestão de comunidade', value: PRICING.addons.communityManagement })

  return {
    total,
    monthly: total,
    // Estimativa de valor/hora considerando ~1h por post/vídeo por semana no mês.
    hourlyEstimate: total / Math.max(1, (data.posts + data.videos) * PRICING.weeksInMonth),
    breakdown,
    complexityLabel: complexity.label,
    isMinimumApplied: rawTotal < PRICING.minimum,
  }
}

/** Compatibilidade: retorna apenas o valor total. */
export function calculatePrice(data: CalculatorData): number {
  return calculate(data).total
}

/** Presets prontos para demonstração e uso rápido. */
export const PRESETS: Array<{ name: string; icon: string; data: CalculatorData }> = [
  {
    name: 'Freelancer iniciante',
    icon: 'lucide:sprout',
    data: {
      ...EMPTY_DATA,
      profiles: 1,
      platforms: 2,
      posts: 8,
      frequency: 4,
      engagement: 2,
      videos: 2,
      complexity: 'basic',
    },
  },
  {
    name: 'Pequena empresa',
    icon: 'lucide:store',
    data: {
      ...EMPTY_DATA,
      profiles: 3,
      platforms: 4,
      posts: 12,
      frequency: 7,
      engagement: 3.5,
      videos: 6,
      complexity: 'standard',
      reports: true,
    },
  },
  {
    name: 'Agência / Premium',
    icon: 'lucide:rocket',
    data: {
      ...EMPTY_DATA,
      profiles: 8,
      platforms: 5,
      posts: 30,
      frequency: 10,
      engagement: 5,
      videos: 20,
      complexity: 'premium',
      adsManagement: true,
      reports: true,
      communityManagement: true,
    },
  },
]
