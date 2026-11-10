export const propertyTypes: Record<string, any> = {
  casa: {
    name: 'Casa Residencial', costPerM2: 1800, complexityFactor: 1.0,
    phases: [
      { name: 'Fundação e Estrutura', percentage: 25, complexity: 2, professionals: [{ name: 'Pedreiro', unitCost: 80, productivityFactor: 8 }, { name: 'Servente', unitCost: 60, productivityFactor: 12 }], materials: [{ name: 'Cimento', unitCost: 35, quantityPerM2: 8 }, { name: 'Ferro', unitCost: 6.5, quantityPerM2: 25 }] },
      { name: 'Alvenaria e Cobertura', percentage: 20, complexity: 2, professionals: [{ name: 'Pedreiro', unitCost: 80, productivityFactor: 10 }, { name: 'Telhadista', unitCost: 120, productivityFactor: 15 }], materials: [{ name: 'Tijolo', unitCost: 0.45, quantityPerM2: 45 }, { name: 'Telha', unitCost: 2.8, quantityPerM2: 16 }] },
      { name: 'Instalações', percentage: 15, complexity: 3, professionals: [{ name: 'Eletricista', unitCost: 120, productivityFactor: 20 }, { name: 'Encanador', unitCost: 110, productivityFactor: 18 }], materials: [{ name: 'Fio elétrico', unitCost: 8.5, quantityPerM2: 15 }, { name: 'Tubo PVC', unitCost: 12, quantityPerM2: 8 }] },
      { name: 'Acabamentos', percentage: 40, complexity: 2, professionals: [{ name: 'Azulejista', unitCost: 90, productivityFactor: 12 }, { name: 'Pintor', unitCost: 85, productivityFactor: 25 }], materials: [{ name: 'Piso cerâmico', unitCost: 35, quantityPerM2: 1 }, { name: 'Tinta', unitCost: 85, quantityPerM2: 0.15 }] }
    ]
  },
  apartamento: {
    name: 'Apartamento', costPerM2: 1500, complexityFactor: 0.9,
    phases: [
      { name: 'Estrutura', percentage: 30, complexity: 2, professionals: [{ name: 'Pedreiro', unitCost: 80, productivityFactor: 10 }], materials: [{ name: 'Concreto', unitCost: 280, quantityPerM2: 0.4 }, { name: 'Ferro', unitCost: 6.5, quantityPerM2: 30 }] },
      { name: 'Vedação', percentage: 25, complexity: 1, professionals: [{ name: 'Pedreiro', unitCost: 80, productivityFactor: 12 }], materials: [{ name: 'Bloco cerâmico', unitCost: 1.2, quantityPerM2: 25 }] },
      { name: 'Instalações', percentage: 20, complexity: 2, professionals: [{ name: 'Eletricista', unitCost: 120, productivityFactor: 22 }], materials: [{ name: 'Fio elétrico', unitCost: 8.5, quantityPerM2: 12 }] },
      { name: 'Acabamentos', percentage: 25, complexity: 2, professionals: [{ name: 'Azulejista', unitCost: 90, productivityFactor: 14 }], materials: [{ name: 'Piso laminado', unitCost: 45, quantityPerM2: 1 }] }
    ]
  },
  sobrado: {
    name: 'Sobrado', costPerM2: 1950, complexityFactor: 1.2,
    phases: [
      { name: 'Fundação e Estrutura', percentage: 28, complexity: 3, professionals: [{ name: 'Pedreiro Especializado', unitCost: 95, productivityFactor: 7 }], materials: [{ name: 'Cimento', unitCost: 35, quantityPerM2: 10 }, { name: 'Ferro', unitCost: 6.5, quantityPerM2: 35 }] },
      { name: 'Alvenaria e Cobertura', percentage: 22, complexity: 2, professionals: [{ name: 'Pedreiro', unitCost: 80, productivityFactor: 8 }], materials: [{ name: 'Tijolo', unitCost: 0.45, quantityPerM2: 50 }] },
      { name: 'Instalações', percentage: 18, complexity: 3, professionals: [{ name: 'Eletricista', unitCost: 130, productivityFactor: 15 }], materials: [{ name: 'Fio elétrico', unitCost: 8.5, quantityPerM2: 18 }] },
      { name: 'Acabamentos', percentage: 32, complexity: 2, professionals: [{ name: 'Azulejista', unitCost: 95, productivityFactor: 10 }], materials: [{ name: 'Piso cerâmico', unitCost: 42, quantityPerM2: 1 }] }
    ]
  },
  comercial: {
    name: 'Imóvel Comercial', costPerM2: 1200, complexityFactor: 0.8,
    phases: [
      { name: 'Estrutura', percentage: 35, complexity: 2, professionals: [{ name: 'Pedreiro', unitCost: 85, productivityFactor: 12 }], materials: [{ name: 'Concreto', unitCost: 280, quantityPerM2: 0.3 }] },
      { name: 'Vedação', percentage: 25, complexity: 1, professionals: [{ name: 'Pedreiro', unitCost: 80, productivityFactor: 15 }], materials: [{ name: 'Bloco', unitCost: 2.5, quantityPerM2: 20 }] },
      { name: 'Instalações', percentage: 20, complexity: 2, professionals: [{ name: 'Eletricista', unitCost: 140, productivityFactor: 18 }], materials: [{ name: 'Fio comercial', unitCost: 12, quantityPerM2: 20 }] },
      { name: 'Acabamentos', percentage: 20, complexity: 1, professionals: [{ name: 'Pintor', unitCost: 80, productivityFactor: 35 }], materials: [{ name: 'Piso comercial', unitCost: 25, quantityPerM2: 1 }] }
    ]
  }
}

export const finishingStandards: Record<string, any> = {
  'básico': { name: 'Padrão Básico', multiplier: 0.8 },
  'médio': { name: 'Padrão Médio', multiplier: 1.0 },
  'alto': { name: 'Padrão Alto', multiplier: 1.4 },
  'luxo': { name: 'Padrão Luxo', multiplier: 2.0 }
}

export const regionalFactors: Record<string, any> = {
  sudeste: { name: 'Sudeste', laborMultiplier: 1.2, materialMultiplier: 1.1 },
  sul: { name: 'Sul', laborMultiplier: 1.1, materialMultiplier: 1.05 },
  centroOeste: { name: 'Centro-Oeste', laborMultiplier: 1.0, materialMultiplier: 1.15 },
  nordeste: { name: 'Nordeste', laborMultiplier: 0.8, materialMultiplier: 1.0 },
  norte: { name: 'Norte', laborMultiplier: 0.9, materialMultiplier: 1.3 }
}

export const terrainConditions: Record<string, any> = {
  plano: { name: 'Terreno Plano', multiplier: 1.0, additionalCosts: 0 },
  declive: { name: 'Terreno com Declive', multiplier: 1.15, additionalCosts: 50 },
  rochoso: { name: 'Terreno Rochoso', multiplier: 1.3, additionalCosts: 120 },
  aterro: { name: 'Necessita Aterro', multiplier: 1.2, additionalCosts: 80 },
  pantanoso: { name: 'Solo Pantanoso', multiplier: 1.4, additionalCosts: 200 }
}

export const accessibilityLevels: Record<string, any> = {
  'fácil': { name: 'Acesso Fácil', multiplier: 1.0 },
  'moderado': { name: 'Acesso Moderado', multiplier: 1.1 },
  'difícil': { name: 'Acesso Difícil', multiplier: 1.25 },
  'muito_difícil': { name: 'Acesso Muito Difícil', multiplier: 1.5 }
}

export const specialFeatures: Record<string, any> = {
  piscina: { name: 'Piscina', costPerM2: 2500 },
  energia_solar: { name: 'Energia Solar', fixedCost: 15000 },
  automacao: { name: 'Automação Residencial', costPerM2: 200 },
  ar_condicionado: { name: 'Ar Condicionado Central', costPerM2: 300 },
  churrasqueira: { name: 'Churrasqueira', fixedCost: 3500 },
  sauna: { name: 'Sauna', fixedCost: 8000 },
  elevador: { name: 'Elevador Residencial', fixedCost: 45000 },
  jardim: { name: 'Paisagismo', costPerM2: 150 }
}

export const renovationServices: Record<string, any> = {
  pintura: { name: 'Pintura Completa', costPerM2: 35, category: 'acabamento', complexity: 1, professionals: [{ name: 'Pintor', unitCost: 85, productivityFactor: 25 }], materials: [{ name: 'Tinta', unitCost: 85, quantityPerM2: 0.15 }] },
  piso: { name: 'Troca de Piso', costPerM2: 75, category: 'acabamento', complexity: 2, professionals: [{ name: 'Azulejista', unitCost: 90, productivityFactor: 12 }], materials: [{ name: 'Piso cerâmico', unitCost: 35, quantityPerM2: 1.1 }] },
  banheiro: { name: 'Reforma de Banheiro', costPerM2: 450, category: 'estrutural', complexity: 3, professionals: [{ name: 'Azulejista', unitCost: 90, productivityFactor: 8 }, { name: 'Encanador', unitCost: 110, productivityFactor: 15 }], materials: [{ name: 'Azulejo', unitCost: 35, quantityPerM2: 1.2 }] },
  cozinha: { name: 'Reforma de Cozinha', costPerM2: 650, category: 'acabamento', complexity: 3, professionals: [{ name: 'Marceneiro', unitCost: 130, productivityFactor: 6 }], materials: [{ name: 'Móveis planejados', unitCost: 800, quantityPerM2: 1.5 }] },
  telhado: { name: 'Reforma de Telhado', costPerM2: 180, category: 'estrutural', complexity: 2, professionals: [{ name: 'Telhadista', unitCost: 120, productivityFactor: 15 }], materials: [{ name: 'Telha', unitCost: 2.8, quantityPerM2: 16 }] },
  eletrica: { name: 'Reforma Elétrica', costPerM2: 120, category: 'instalação', complexity: 2, professionals: [{ name: 'Eletricista', unitCost: 120, productivityFactor: 18 }], materials: [{ name: 'Fio elétrico', unitCost: 8.5, quantityPerM2: 20 }] },
  hidraulica: { name: 'Reforma Hidráulica', costPerM2: 110, category: 'instalação', complexity: 2, professionals: [{ name: 'Encanador', unitCost: 110, productivityFactor: 16 }], materials: [{ name: 'Tubo PVC', unitCost: 12, quantityPerM2: 15 }] },
  fachada: { name: 'Reforma de Fachada', costPerM2: 85, category: 'acabamento', complexity: 2, professionals: [{ name: 'Pintor', unitCost: 85, productivityFactor: 20 }], materials: [{ name: 'Tinta externa', unitCost: 120, quantityPerM2: 0.12 }] }
}
