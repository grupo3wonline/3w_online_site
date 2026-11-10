import { propertyTypes, locations, conditions, furnishedOptions, regions, buildingAges, specialFeatures, transportAccess, seasonality, marketConditions, amenities } from '@/data/rentalData'

export interface RentalParams {
  propertyValue: number
  propertyType: string
  location: string
  condition: string
  furnished: string
  region: string
  buildingAge: string
  specialFeatures: string[]
  transportAccess: string
  seasonality: string
  marketCondition: string
  propertySize: number
  floors: number
  amenities: string[]
}

export interface RentalResult {
  baseRent: number
  adjustedRent: number
  factors: Record<string, number>
  recommendations: {
    minRent: number
    maxRent: number
    suggestedRent: number
    confidence: 'baixa' | 'média' | 'alta'
  }
  marketAnalysis: {
    competitivePosition: 'abaixo' | 'na_média' | 'acima'
    pricePerM2: number
    yieldEstimate: number
  }
}

export function calculateRent(params: RentalParams): RentalResult {
  const propertyType = propertyTypes[params.propertyType]
  const location = locations[params.location]
  const condition = conditions[params.condition]
  const furnished = furnishedOptions[params.furnished]
  const region = regions[params.region]
  const buildingAge = buildingAges[params.buildingAge]
  const transport = transportAccess[params.transportAccess]
  const season = seasonality[params.seasonality]
  const market = marketConditions[params.marketCondition]

  const baseRent = params.propertyValue * location.factor

  let adjustedRent = baseRent
  adjustedRent *= propertyType.baseMultiplier
  adjustedRent *= condition.factor
  adjustedRent *= furnished.factor
  adjustedRent *= region.multiplier
  adjustedRent *= buildingAge.factor
  adjustedRent *= transport.factor
  adjustedRent *= season.factor
  adjustedRent *= market.factor

  // Size adjustment
  const sizeAdj = params.propertySize > 200 ? 0.95 : params.propertySize > 100 ? 1.0 : params.propertySize > 50 ? 1.05 : 1.1
  adjustedRent *= sizeAdj

  // Floor adjustment
  const floorAdj = params.propertyType === 'apartamento' ? Math.min(1.15, 1 + (params.floors * 0.02)) : 1
  adjustedRent *= floorAdj

  // Special features
  let specialFeaturesValue = 0
  params.specialFeatures.forEach(key => {
    const feature = specialFeatures[key]
    if (feature) {
      specialFeaturesValue += feature.type === 'fixed' ? feature.addedValue : adjustedRent * (feature.addedValue / 100)
    }
  })

  // Amenities
  let amenitiesValue = 0
  params.amenities.forEach(key => {
    const amenity = amenities[key]
    if (amenity) amenitiesValue += amenity.valueAdd
  })

  const finalRent = adjustedRent + specialFeaturesValue + amenitiesValue

  // Confidence
  const score = [params.propertyValue > 0, params.propertyType, params.location, params.condition, params.furnished, params.propertySize > 0, params.specialFeatures.length > 0].filter(Boolean).length
  const confidence = score >= 6 ? 'alta' : score >= 4 ? 'média' : 'baixa'

  const minRent = finalRent * 0.85
  const maxRent = finalRent * 1.15
  const pricePerM2 = finalRent / params.propertySize
  const locationRange = location.avgRentRange
  const competitivePosition = pricePerM2 < locationRange.min ? 'abaixo' : pricePerM2 > locationRange.max ? 'acima' : 'na_média'
  const yieldEstimate = ((finalRent * 12) / params.propertyValue) * 100

  return {
    baseRent,
    adjustedRent: finalRent,
    factors: {
      location: location.factor,
      type: propertyType.baseMultiplier,
      condition: condition.factor,
      furnished: furnished.factor,
      regional: region.multiplier,
      specialFeatures: specialFeaturesValue / baseRent
    },
    recommendations: { minRent, maxRent, suggestedRent: finalRent, confidence },
    marketAnalysis: { competitivePosition, pricePerM2, yieldEstimate }
  }
}
