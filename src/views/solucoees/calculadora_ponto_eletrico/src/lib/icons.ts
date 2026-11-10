import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

/** Tupla [prefixo, nome] aceita pelo font-awesome-icon. */
export type FaIcon = [prefix: 'fas' | 'fab', name: string]

/**
 * Mapa único de ícones do projeto (Font Awesome).
 * As chaves usam os nomes "lucide:*" mantidos nos componentes, para não
 * precisar alterar todos os call sites — o Icon.vue resolve por aqui.
 */
export const ICON_MAP: Record<string, FaIcon> = {
  'lucide:zap': ['fas', 'bolt'],
  'lucide:zap-off': ['fas', 'bolt-lightning'],
  'lucide:home': ['fas', 'house'],
  'lucide:calculator': ['fas', 'calculator'],
  'lucide:info': ['fas', 'circle-info'],
  'lucide:mail': ['fas', 'envelope'],
  'lucide:menu': ['fas', 'bars'],
  'lucide:x': ['fas', 'xmark'],
  'lucide:chevron-right': ['fas', 'chevron-right'],
  'lucide:external-link': ['fas', 'arrow-up-right-from-square'],
  'lucide:sun': ['fas', 'sun'],
  'lucide:moon': ['fas', 'moon'],
  'lucide:circle-help': ['fas', 'circle-question'],
  'lucide:check': ['fas', 'check'],
  'lucide:circle-check': ['fas', 'circle-check'],
  'lucide:triangle-alert': ['fas', 'triangle-exclamation'],
  'lucide:lightbulb': ['fas', 'lightbulb'],
  'lucide:book-open': ['fas', 'book-open'],
  'lucide:shield-check': ['fas', 'shield-halved'],
  'lucide:lock': ['fas', 'lock'],
  'lucide:rocket': ['fas', 'rocket'],
  'lucide:clock': ['fas', 'clock'],
  'lucide:arrow-right': ['fas', 'arrow-right'],
  'lucide:sparkles': ['fas', 'wand-magic-sparkles'],
  'lucide:flame': ['fas', 'fire'],
  'lucide:code-2': ['fas', 'code'],
  'lucide:headset': ['fas', 'headset'],
  'lucide:award': ['fas', 'award'],
  'lucide:globe': ['fas', 'globe'],
  'lucide:message-circle': ['fab', 'whatsapp'],
  'lucide:facebook': ['fab', 'facebook-f'],
  'lucide:instagram': ['fab', 'instagram'],
  'lucide:linkedin': ['fab', 'linkedin-in'],
  'lucide:ruler': ['fas', 'ruler'],
  'lucide:gauge': ['fas', 'gauge-high'],
  'lucide:cable': ['fas', 'plug-circle-bolt'],
  'lucide:plug-zap': ['fas', 'plug-circle-bolt'],
  'lucide:activity': ['fas', 'wave-square'],
  'lucide:box': ['fas', 'box'],
  'lucide:gift': ['fas', 'gift'],
  'lucide:rotate-ccw': ['fas', 'rotate-left'],
  'lucide:loader-circle': ['fas', 'spinner'],
  'lucide:file-text': ['fas', 'file-lines'],
}

/** Aliases amigáveis (opcional) mapeando para as chaves acima. */
export const icons = {
  bolt: 'lucide:zap',
  home: 'lucide:home',
  calculator: 'lucide:calculator',
  info: 'lucide:info',
  mail: 'lucide:mail',
  help: 'lucide:circle-help',
  whatsapp: 'lucide:message-circle',
} as const

export type IconName = keyof typeof icons

/** Resolve um nome ("lucide:zap" ou alias) para a tupla FA. */
export function resolveIcon(name: string): FaIcon {
  if (ICON_MAP[name]) return ICON_MAP[name]
  const alias = (icons as Record<string, string>)[name]
  if (alias && ICON_MAP[alias]) return ICON_MAP[alias]
  // fallback seguro
  return ['fas', 'circle-info']
}

export type { IconDefinition }
