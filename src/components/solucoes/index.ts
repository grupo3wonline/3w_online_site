import type { Component } from 'vue'

export type SolucaoLoader = () => Promise<{ default: Component }>

export const solucoesMap: Record<string, SolucaoLoader> = {
  'analisador-texto': () => import('./analisador-texto.vue'),
  'calculadora-aluguel-facil': () => import('./calculadora-aluguel-facil.vue'),
  'calculadora-campanha-trafego': () => import('./calculadora-campanha-trafego.vue'),
  'calculadora-churrasco': () => import('./calculadora-churrasco.vue'),
  'calculadora-empresarial': () => import('./calculadora-empresarial.vue'),
  'calculadora-evento': () => import('./calculadora-evento.vue'),
  'calculadora-freelance': () => import('./calculadora-freelance.vue'),
  'calculadora-imc': () => import('./calculadora-imc.vue'),
  'calculadora-indicadores-financeiros': () => import('./calculadora-indicadores-financeiros.vue'),
  'calculadora-metragem-cabo': () => import('./calculadora-metragem-cabo.vue'),
  'calculadora-orcamento-marketing-digital': () => import('./calculadora-orcamento-marketing-digital.vue'),
  'calculadora-ponto-eletrico': () => import('./calculadora-ponto-eletrico.vue'),
  'calculadora-preco': () => import('./calculadora-preco.vue'),
  'calculadora-produto-servico': () => import('./calculadora-produto-servico.vue'),
  'calculadora-programadores': () => import('./calculadora-programadores.vue'),
  'calculadora-saude': () => import('./calculadora-saude.vue'),
  'calculadora-social-midia': () => import('./calculadora-social-midia.vue'),
  'code-logic-flow-studio': () => import('./code-logic-flow-studio.vue'),
}
