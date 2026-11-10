import { ref } from 'vue'
import { ELECTRICAL_CONSTANTS, APP_CONFIG } from '@/utils/constants'
import type { CalculationResult, RoomType } from '@/types/calculator'

/**
 * Composable com a lógica pura de cálculo elétrico (NBR 5410).
 * As funções não dependem de UI e são facilmente testáveis.
 */
export function useCalculator() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  /** Área do ambiente (m²). */
  const calculateArea = (width: number, length: number): number => width * length

  /** Volume do ambiente (m³). */
  const calculateVolume = (width: number, length: number, height: number): number =>
    width * length * height

  /** Perímetro do ambiente (m). */
  const calculatePerimeter = (width: number, length: number): number => 2 * (width + length)

  /**
   * Número de pontos elétricos com base na área (NBR 5410).
   * Mínimo de 1 ponto por ambiente.
   */
  const calculateElectricPoints = (width: number, length: number): number => {
    const area = calculateArea(width, length)
    const pointsByArea = Math.ceil(area / ELECTRICAL_CONSTANTS.POINTS_DENSITY.PER_AREA_M2)
    return Math.max(pointsByArea, ELECTRICAL_CONSTANTS.POINTS_DENSITY.MIN_PER_ROOM)
  }

  /** Metragem de cabo estimada (m), com margem de segurança. */
  const calculateCableLength = (
    width: number,
    length: number,
    ceilingHeight: number,
    points: number,
  ): number => {
    const perimeter = calculatePerimeter(width, length)
    const verticalCable = points * ceilingHeight * 1.2
    const horizontalCable = perimeter * 1.3
    return (verticalCable + horizontalCable) * (1 + ELECTRICAL_CONSTANTS.SAFETY_MARGIN)
  }

  /** Potência total estimada (VA). */
  const calculateTotalPower = (area: number, roomType: RoomType = 'LIVING'): number => {
    const powerPerM2 = ELECTRICAL_CONSTANTS.MIN_POWER_PER_M2[roomType] ?? 100
    return area * powerPerM2
  }

  /** Corrente estimada (A). */
  const calculateCurrent = (power: number, voltage = 220): number => power / voltage

  /** Sugere disjuntor padrão (A) com margem de 25%. */
  const suggestCircuitBreaker = (current: number): number => {
    const standardBreakers = [10, 15, 20, 25, 30, 35, 40, 50, 60, 70]
    const requiredCurrent = current * 1.25
    return standardBreakers.find((b) => b >= requiredCurrent) ?? 70
  }

  /** Sugere bitola de cabo (mm²) simplificada por corrente. */
  const suggestCableGauge = (current: number): number => {
    if (current <= 10) return 1.5
    if (current <= 15) return 2.5
    if (current <= 20) return 4.0
    if (current <= 25) return 6.0
    if (current <= 32) return 10.0
    if (current <= 40) return 16.0
    return 25.0
  }

  /** Executa o cálculo completo e retorna o resultado estruturado. */
  const performCalculation = async (
    width: number,
    length: number,
    ceilingHeight: number,
    roomType: RoomType = 'LIVING',
  ): Promise<CalculationResult> => {
    loading.value = true
    error.value = null

    try {
      // Pequeno atraso para exibir o overlay de loading (melhor UX).
      await new Promise((resolve) => setTimeout(resolve, 400))

      const area = calculateArea(width, length)
      const volume = calculateVolume(width, length, ceilingHeight)
      const perimeter = calculatePerimeter(width, length)
      const points = calculateElectricPoints(width, length)
      const cableLength = calculateCableLength(width, length, ceilingHeight, points)
      const totalPower = calculateTotalPower(area, roomType)
      const current = calculateCurrent(totalPower)
      const circuitBreaker = suggestCircuitBreaker(current)
      const cableGauge = suggestCableGauge(current)

      return {
        dimensions: { width, length, ceilingHeight },
        calculated: {
          area,
          volume,
          perimeter,
          points,
          cableLength,
          totalPower,
          current,
          circuitBreaker,
          cableGauge,
        },
        metadata: {
          roomType,
          calculatedAt: new Date().toISOString(),
          version: APP_CONFIG.APP_VERSION,
        },
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao calcular'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    calculateArea,
    calculateVolume,
    calculatePerimeter,
    calculateElectricPoints,
    calculateCableLength,
    calculateTotalPower,
    calculateCurrent,
    suggestCircuitBreaker,
    suggestCableGauge,
    performCalculation,
  }
}
