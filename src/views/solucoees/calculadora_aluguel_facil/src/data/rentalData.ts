export const propertyTypes: Record<string, any> = {
  apartamento: { name: 'Apartamento', baseMultiplier: 1.0, description: 'Imóvel em edifício residencial' },
  casa: { name: 'Casa', baseMultiplier: 0.95, description: 'Casa térrea ou sobrado' },
  studio: { name: 'Studio/Kitnet', baseMultiplier: 1.1, description: 'Imóvel compacto integrado' },
  cobertura: { name: 'Cobertura', baseMultiplier: 1.15, description: 'Último andar com área privativa' },
  sobrado: { name: 'Sobrado', baseMultiplier: 0.9, description: 'Casa com dois ou mais pavimentos' },
  loft: { name: 'Loft', baseMultiplier: 1.05, description: 'Espaço amplo e integrado' },
  comercial: { name: 'Comercial', baseMultiplier: 0.8, description: 'Imóvel para uso comercial' }
}

export const locations: Record<string, any> = {
  centro: { name: 'Centro/Área Nobre', factor: 0.008, description: 'Região central com alta valorização', avgRentRange: { min: 35, max: 60 } },
  zona_sul: { name: 'Zona Sul', factor: 0.0075, description: 'Região residencial consolidada', avgRentRange: { min: 30, max: 55 } },
  zona_norte: { name: 'Zona Norte', factor: 0.006, description: 'Região em desenvolvimento', avgRentRange: { min: 20, max: 40 } },
  zona_oeste: { name: 'Zona Oeste', factor: 0.0065, description: 'Região com boa infraestrutura', avgRentRange: { min: 25, max: 45 } },
  zona_leste: { name: 'Zona Leste', factor: 0.0055, description: 'Região em expansão', avgRentRange: { min: 18, max: 35 } },
  suburbio: { name: 'Subúrbio', factor: 0.005, description: 'Região periférica', avgRentRange: { min: 15, max: 30 } },
  beira_mar: { name: 'Beira Mar', factor: 0.012, description: 'Vista para o mar ou lago', avgRentRange: { min: 50, max: 100 } }
}

export const conditions: Record<string, any> = {
  novo: { name: 'Novo/Reformado', factor: 1.1, description: 'Imóvel novo ou recém reformado' },
  excelente: { name: 'Excelente Estado', factor: 1.05, description: 'Muito bem conservado' },
  bom: { name: 'Bom Estado', factor: 1.0, description: 'Bem conservado, uso normal' },
  regular: { name: 'Estado Regular', factor: 0.9, description: 'Precisa de pequenos reparos' },
  reformar: { name: 'Precisa Reformar', factor: 0.8, description: 'Necessita reformas significativas' }
}

export const furnishedOptions: Record<string, any> = {
  mobiliado: { name: 'Totalmente Mobiliado', factor: 1.3, description: 'Móveis e eletrodomésticos completos' },
  semi_mobiliado: { name: 'Semi-mobiliado', factor: 1.15, description: 'Móveis básicos inclusos' },
  equipado: { name: 'Equipado', factor: 1.08, description: 'Apenas eletrodomésticos fixos' },
  vazio: { name: 'Vazio', factor: 1.0, description: 'Sem móveis ou equipamentos' }
}

export const regions: Record<string, any> = {
  sudeste: { name: 'Sudeste (SP, RJ, MG, ES)', multiplier: 1.2, description: 'Região com maior demanda' },
  sul: { name: 'Sul (RS, SC, PR)', multiplier: 1.1, description: 'Mercado estável e valorizado' },
  centro_oeste: { name: 'Centro-Oeste', multiplier: 1.05, description: 'Crescimento moderado' },
  nordeste: { name: 'Nordeste', multiplier: 0.9, description: 'Mercado em desenvolvimento' },
  norte: { name: 'Norte', multiplier: 0.85, description: 'Mercado emergente' }
}

export const buildingAges: Record<string, any> = {
  novo: { name: 'Novo (0-2 anos)', factor: 1.1 },
  recente: { name: 'Recente (3-5 anos)', factor: 1.05 },
  intermediario: { name: 'Intermediário (6-15 anos)', factor: 1.0 },
  antigo: { name: 'Antigo (16-30 anos)', factor: 0.95 },
  muito_antigo: { name: 'Muito Antigo (30+ anos)', factor: 0.85 }
}

export const specialFeatures: Record<string, any> = {
  vaga_garagem: { name: 'Vaga de Garagem', addedValue: 200, type: 'fixed' },
  varanda: { name: 'Varanda/Sacada', addedValue: 8, type: 'percentage' },
  churrasqueira: { name: 'Churrasqueira', addedValue: 150, type: 'fixed' },
  piscina: { name: 'Piscina', addedValue: 15, type: 'percentage' },
  ar_condicionado: { name: 'Ar Condicionado', addedValue: 300, type: 'fixed' },
  seguranca_24h: { name: 'Segurança 24h', addedValue: 5, type: 'percentage' },
  elevador: { name: 'Elevador', addedValue: 100, type: 'fixed' },
  vista_especial: { name: 'Vista Especial', addedValue: 12, type: 'percentage' },
  energia_solar: { name: 'Energia Solar', addedValue: 250, type: 'fixed' },
  internet_alta_velocidade: { name: 'Internet Alta Velocidade', addedValue: 80, type: 'fixed' }
}

export const transportAccess: Record<string, any> = {
  excelente: { name: 'Excelente (Metro <500m)', factor: 1.15 },
  muito_bom: { name: 'Muito Bom (BRT/Metro <1km)', factor: 1.08 },
  bom: { name: 'Bom (Ônibus frequente)', factor: 1.02 },
  regular: { name: 'Regular', factor: 1.0 },
  limitado: { name: 'Limitado', factor: 0.95 }
}

export const seasonality: Record<string, any> = {
  alta_temporada: { name: 'Alta Temporada', factor: 1.25 },
  temporada_media: { name: 'Temporada Média', factor: 1.1 },
  baixa_temporada: { name: 'Baixa Temporada', factor: 0.9 },
  sem_sazonalidade: { name: 'Sem Sazonalidade', factor: 1.0 }
}

export const marketConditions: Record<string, any> = {
  aquecido: { name: 'Mercado Aquecido', factor: 1.15 },
  equilibrado: { name: 'Mercado Equilibrado', factor: 1.0 },
  em_baixa: { name: 'Mercado em Baixa', factor: 0.9 },
  instavel: { name: 'Mercado Instável', factor: 0.95 }
}

export const amenities: Record<string, any> = {
  academia: { name: 'Academia', valueAdd: 100 },
  piscina_condominio: { name: 'Piscina do Condomínio', valueAdd: 150 },
  playground: { name: 'Playground', valueAdd: 80 },
  salao_festas: { name: 'Salão de Festas', valueAdd: 120 },
  quadra_esportes: { name: 'Quadra de Esportes', valueAdd: 100 },
  coworking: { name: 'Espaço Coworking', valueAdd: 80 },
  pet_place: { name: 'Pet Place', valueAdd: 60 },
  lavanderia: { name: 'Lavanderia', valueAdd: 70 },
  bike_rack: { name: 'Bicicletário', valueAdd: 40 },
  concierge: { name: 'Concierge', valueAdd: 200 }
}
