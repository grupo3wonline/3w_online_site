/** Tipos de ambiente suportados pela calculadora (NBR 5410). */
export type RoomType = 'LIVING' | 'KITCHEN' | 'BATHROOM' | 'LAUNDRY' | 'GARAGE' | 'OFFICE'

/** Dimensões do ambiente informadas pelo usuário. */
export interface Dimensions {
  width: number
  length: number
  ceilingHeight: number
}

/** Valores calculados a partir das dimensões. */
export interface CalculatedValues {
  area: number
  volume: number
  perimeter: number
  points: number
  cableLength: number
  totalPower: number
  current: number
  circuitBreaker: number
  cableGauge: number
}

/** Metadados de um cálculo. */
export interface CalculationMetadata {
  roomType: RoomType
  calculatedAt: string
  version: string
}

/** Resultado completo de um cálculo. */
export interface CalculationResult {
  dimensions: Dimensions
  calculated: CalculatedValues
  metadata: CalculationMetadata
}

/** Item de histórico persistido (resultado + identificação). */
export interface CalculationHistoryItem extends CalculationResult {
  id: number
  timestamp: string
}
