import type { Component } from 'vue'

export type SolucaoLoader = () => Promise<{ default: Component }>

export const solucoesMap: Record<string, SolucaoLoader> = {}
