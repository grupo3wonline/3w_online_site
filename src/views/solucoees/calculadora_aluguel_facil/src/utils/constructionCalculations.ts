import { propertyTypes, finishingStandards, regionalFactors, terrainConditions, accessibilityLevels, specialFeatures, renovationServices } from '@/data/constructionData'

export interface ConstructionParams {
  projectType: 'construction' | 'renovation'
  propertyType: string
  area: number
  finishingStandard: string
  region: string
  terrainCondition: string
  accessibilityLevel: string
  specialFeatures: string[]
  selectedServices: string[]
  contingencyPercentage: number
  materialQuality: string
  laborProductivity: string
}

export interface ConstructionResult {
  area: number
  grandTotal: number
  costPerM2: number
  breakdown: { materials: number; labor: number; indirect: number; contingency: number; specialFeatures: number }
  timeline: { totalDays: number; phases?: { name: string; days: number }[] }
}

const materialQualityMultipliers: Record<string, number> = { 'básico': 0.8, 'médio': 1.0, 'alto': 1.3, 'premium': 1.8 }
const laborProductivityMultipliers: Record<string, number> = { 'baixa': 1.3, 'média': 1.0, 'alta': 0.8 }

export function calculateConstruction(params: ConstructionParams): ConstructionResult {
  const property = propertyTypes[params.propertyType]
  const finishing = finishingStandards[params.finishingStandard]
  const regional = regionalFactors[params.region]
  const terrain = terrainConditions[params.terrainCondition]
  const access = accessibilityLevels[params.accessibilityLevel]
  const matQuality = materialQualityMultipliers[params.materialQuality] || 1
  const labProd = laborProductivityMultipliers[params.laborProductivity] || 1

  let totalMaterials = 0
  let totalLabor = 0
  let totalDays = 0
  const phaseTimeline: { name: string; days: number }[] = []

  property.phases.forEach(phase => {
    const profTotal = phase.professionals.reduce((sum, prof) => {
      const days = Math.ceil((params.area / (prof.productivityFactor || 10)) * labProd)
      return sum + prof.unitCost * regional.laborMultiplier * access.multiplier * days
    }, 0)

    const matTotal = phase.materials.reduce((sum, mat) => {
      return sum + (mat.quantityPerM2 * params.area) * mat.unitCost * matQuality * regional.materialMultiplier
    }, 0)

    const phaseDays = Math.max(...phase.professionals.map(p => Math.ceil((params.area / (p.productivityFactor || 10)) * labProd)))

    totalMaterials += matTotal
    totalLabor += profTotal
    totalDays += phaseDays
    phaseTimeline.push({ name: phase.name, days: phaseDays })
  })

  const subtotal = (totalMaterials + totalLabor) * finishing.multiplier
  const terrainAdjusted = subtotal * terrain.multiplier + (terrain.additionalCosts || 0) * params.area

  let specialCost = 0
  params.specialFeatures.forEach(key => {
    const f = specialFeatures[key]
    if (f) specialCost += f.costPerM2 ? f.costPerM2 * params.area : (f.fixedCost || 0)
  })

  const indirect = terrainAdjusted * 0.15
  const beforeContingency = terrainAdjusted + specialCost + indirect
  const contingency = beforeContingency * (params.contingencyPercentage / 100)
  const grandTotal = beforeContingency + contingency

  return {
    area: params.area,
    grandTotal,
    costPerM2: grandTotal / params.area,
    breakdown: { materials: totalMaterials, labor: totalLabor, indirect, contingency, specialFeatures: specialCost },
    timeline: { totalDays, phases: phaseTimeline }
  }
}

export function calculateRenovation(params: ConstructionParams): ConstructionResult {
  const regional = regionalFactors[params.region]
  const access = accessibilityLevels[params.accessibilityLevel]
  const matQuality = materialQualityMultipliers[params.materialQuality] || 1
  const labProd = laborProductivityMultipliers[params.laborProductivity] || 1

  let totalMaterials = 0
  let totalLabor = 0
  let totalDays = 0

  params.selectedServices.forEach(key => {
    const service = renovationServices[key]
    if (!service) return

    const profTotal = service.professionals.reduce((sum, prof) => {
      const days = Math.ceil((params.area / (prof.productivityFactor || 15)) * labProd)
      return sum + prof.unitCost * regional.laborMultiplier * access.multiplier * days
    }, 0)

    const matTotal = service.materials.reduce((sum, mat) => {
      return sum + (mat.quantityPerM2 * params.area) * mat.unitCost * matQuality * regional.materialMultiplier
    }, 0)

    const serviceDays = Math.max(...service.professionals.map(p => Math.ceil((params.area / (p.productivityFactor || 15)) * labProd)))

    totalMaterials += matTotal
    totalLabor += profTotal
    totalDays = Math.max(totalDays, serviceDays)
  })

  const subtotal = totalMaterials + totalLabor
  const indirect = subtotal * 0.08
  const beforeContingency = subtotal + indirect
  const contingency = beforeContingency * (params.contingencyPercentage / 100)
  const grandTotal = beforeContingency + contingency

  return {
    area: params.area,
    grandTotal,
    costPerM2: grandTotal / params.area,
    breakdown: { materials: totalMaterials, labor: totalLabor, indirect, contingency, specialFeatures: 0 },
    timeline: { totalDays }
  }
}
