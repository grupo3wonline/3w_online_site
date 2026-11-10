export * from './types'
export * from './data'
export * from './calculator'
export * from './schema'
// './pdf' NÃO é reexportado aqui de propósito: jsPDF é pesado e deve ser
// carregado sob demanda via `import('@/lib/imc/pdf')`.
