import type { RoomType } from '@/types/calculator'

/**
 * Constantes para cálculos elétricos baseados na NBR 5410.
 */
export const ELECTRICAL_CONSTANTS = {
  // Potências mínimas por tipo de ambiente (VA/m²)
  MIN_POWER_PER_M2: {
    LIVING: 100, // Sala, quartos
    KITCHEN: 120, // Cozinha
    BATHROOM: 600, // Banheiro (devido ao chuveiro)
    LAUNDRY: 200, // Área de serviço
    GARAGE: 100, // Garagem
    OFFICE: 100, // Escritório
  } as Record<RoomType, number>,

  // Densidade de pontos por área
  POINTS_DENSITY: {
    MIN_PER_ROOM: 1,
    PER_AREA_M2: 8, // 1 ponto a cada 8m²
  },

  // Fatores de demanda
  DEMAND_FACTOR: {
    LIGHTING: 1.0,
    OUTLETS: 0.8,
    KITCHEN: 0.7,
    AIR_CONDITIONING: 1.0,
  },

  // Voltagens padrão no Brasil
  VOLTAGE: {
    SINGLE_PHASE_127: 127,
    SINGLE_PHASE_220: 220,
    THREE_PHASE: 380,
  },

  // Margem de segurança recomendada
  SAFETY_MARGIN: 0.2, // 20%

  // Pé direito padrão
  DEFAULT_CEILING_HEIGHT: 2.8,

  // Limites
  LIMITS: {
    MIN_WIDTH: 0.1,
    MAX_WIDTH: 100,
    MIN_LENGTH: 0.1,
    MAX_LENGTH: 100,
    MIN_CEILING_HEIGHT: 2.0,
    MAX_CEILING_HEIGHT: 5.0,
  },
} as const

/** Rótulos legíveis por tipo de ambiente. */
export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  LIVING: 'Sala / Quarto',
  KITCHEN: 'Cozinha',
  BATHROOM: 'Banheiro',
  LAUNDRY: 'Área de Serviço',
  GARAGE: 'Garagem',
  OFFICE: 'Escritório',
}

/** Configurações do aplicativo. */
export const APP_CONFIG = {
  APP_NAME: 'Calculadora de Pontos Elétricos',
  APP_VERSION: '1.0.0',
  STORAGE_KEY: 'electroCalc_history',
  MAX_HISTORY_ITEMS: 50,
  THEME_STORAGE_KEY: 'calculadora_ponto_eletrico_theme',
} as const

/** Contatos e dados da empresa desenvolvedora. */
export const COMPANY = {
  name: 'Grupo 3w Online',
  site: 'https://www.3wonline.com.br',
  email: 'contato@3wonline.com.br',
  whatsappDisplay: '(41) 99692-4829',
  whatsappLink: 'https://wa.me/5541996924829',
  developer: 'HOTWYL | WILLFROMBRASIL',
} as const

/** Rotas do aplicativo. */
export const ROUTES = {
  HOME: '/',
  PRIVACY: '/politica-privacidade',
  TERMS: '/termos-uso',
} as const

/** Âncoras das seções da landing (conteúdo unificado na Home). */
export const ANCHORS = {
  CALCULATOR: '/#calculadora',
  TOOLS: '/#ferramentas',
  ABOUT: '/#sobre',
  SERVICES: '/#servicos',
  CONTACT: '/#contato',
  FAQ: '/#faq',
} as const
