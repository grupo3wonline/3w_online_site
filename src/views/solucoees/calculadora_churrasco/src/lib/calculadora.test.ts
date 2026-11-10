import { describe, it, expect } from 'vitest'
import { ZodError } from 'zod'
import {
  calcularChurrasco,
  calcularCarne,
  calcularCusto,
  churrascoSchema,
  gerarResumoTexto,
  PRESETS,
  PRECOS_PADRAO,
  LIMITES,
  type ChurrascoInput,
} from './calculadora'

const base: ChurrascoInput = { homens: 4, mulheres: 3, criancas: 1, duracao: 4, apetite: 'normal' }

describe('churrascoSchema (validação)', () => {
  it('aceita entrada válida', () => {
    expect(() => churrascoSchema.parse(base)).not.toThrow()
  })

  it('rejeita quando não há nenhuma pessoa', () => {
    expect(() =>
      churrascoSchema.parse({ homens: 0, mulheres: 0, criancas: 0, duracao: 4 }),
    ).toThrow(ZodError)
  })

  it('rejeita valores negativos', () => {
    expect(() => churrascoSchema.parse({ ...base, homens: -1 })).toThrow(ZodError)
  })

  it('rejeita duração acima do máximo', () => {
    expect(() =>
      churrascoSchema.parse({ ...base, duracao: LIMITES.duracaoMax + 1 }),
    ).toThrow(ZodError)
  })

  it('rejeita mais pessoas que o limite', () => {
    expect(() =>
      churrascoSchema.parse({ ...base, homens: LIMITES.pessoasMax + 1 }),
    ).toThrow(ZodError)
  })

  it('rejeita valores não inteiros de pessoas', () => {
    expect(() => churrascoSchema.parse({ ...base, homens: 2.5 })).toThrow(ZodError)
  })
})

describe('calcularCarne', () => {
  it('retorna min <= media <= max', () => {
    const { min, max, media } = calcularCarne(base)
    expect(min).toBeLessThanOrEqual(media)
    expect(media).toBeLessThanOrEqual(max)
  })

  it('mais pessoas resultam em mais carne', () => {
    const poucos = calcularCarne({ homens: 1, mulheres: 0, criancas: 0, duracao: 4 })
    const muitos = calcularCarne({ homens: 10, mulheres: 0, criancas: 0, duracao: 4 })
    expect(muitos.max).toBeGreaterThan(poucos.max)
  })

  it('mais duração resulta em mais carne', () => {
    const curto = calcularCarne({ ...base, duracao: 2 })
    const longo = calcularCarne({ ...base, duracao: 8 })
    expect(longo.max).toBeGreaterThan(curto.max)
  })
})

describe('calcularChurrasco', () => {
  it('lança ZodError para entrada inválida', () => {
    expect(() => calcularChurrasco({ homens: 0, mulheres: 0, criancas: 0, duracao: 0 })).toThrow()
  })

  it('produz o resultado completo esperado', () => {
    const r = calcularChurrasco(base)
    expect(r.adultos).toBe(7)
    expect(r.criancas).toBe(1)
    expect(r.duracao).toBe(4)
    expect(r.acompanhamentos).toHaveLength(5)
    expect(r.bebidas).toHaveLength(8)
    expect(r.destilados).toHaveLength(6)
  })

  it('formata a carne com 2 casas decimais', () => {
    const r = calcularChurrasco(base)
    expect(r.carneMin).toMatch(/^\d+\.\d{2}$/)
    expect(r.carneMax).toMatch(/^\d+\.\d{2}$/)
  })

  it('não gera quantidades negativas', () => {
    const r = calcularChurrasco({ homens: 1, mulheres: 0, criancas: 0, duracao: 1 })
    const numeros = [...r.acompanhamentos, ...r.bebidas, ...r.destilados].map((i) =>
      parseFloat(i.value),
    )
    numeros.forEach((n) => expect(n).toBeGreaterThanOrEqual(0))
  })

  it('caso limite: apenas crianças ainda calcula carne', () => {
    const r = calcularChurrasco({ homens: 0, mulheres: 0, criancas: 5, duracao: 4 })
    expect(parseFloat(r.carneMax)).toBeGreaterThan(0)
  })
})

describe('apetite', () => {
  it('assume normal quando não informado', () => {
    const r = calcularChurrasco({ homens: 2, mulheres: 2, criancas: 0, duracao: 4 })
    expect(r.apetite).toBe('normal')
  })

  it('reforçado gera mais carne que leve', () => {
    const leve = calcularChurrasco({ ...base, apetite: 'leve' })
    const reforcado = calcularChurrasco({ ...base, apetite: 'reforcado' })
    expect(parseFloat(reforcado.carneMax)).toBeGreaterThan(parseFloat(leve.carneMax))
  })

  it('reforçado aumenta a quantidade de bebidas', () => {
    const normal = calcularChurrasco({ ...base, apetite: 'normal' })
    const reforcado = calcularChurrasco({ ...base, apetite: 'reforcado' })
    const cervejaNormal = normal.bebidas.find((b) => b.label === 'Cerveja')!.qtd
    const cervejaReforcado = reforcado.bebidas.find((b) => b.label === 'Cerveja')!.qtd
    expect(cervejaReforcado).toBeGreaterThanOrEqual(cervejaNormal)
  })
})

describe('calcularCusto', () => {
  it('retorna total positivo com preços padrão', () => {
    const r = calcularChurrasco(base)
    const { total, itens } = calcularCusto(r)
    expect(total).toBeGreaterThan(0)
    expect(itens.length).toBeGreaterThan(0)
    expect(itens[0].label).toBe('Carne')
  })

  it('o total é a soma dos subtotais', () => {
    const r = calcularChurrasco(base)
    const { total, itens } = calcularCusto(r)
    const soma = itens.reduce((acc, i) => acc + i.subtotal, 0)
    expect(total).toBeCloseTo(soma, 5)
  })

  it('preços maiores aumentam o total', () => {
    const r = calcularChurrasco(base)
    const barato = calcularCusto(r, PRECOS_PADRAO).total
    const caro = calcularCusto(
      r,
      Object.fromEntries(Object.entries(PRECOS_PADRAO).map(([k, v]) => [k, v * 2])),
    ).total
    expect(caro).toBeGreaterThan(barato)
  })
})

describe('PRESETS', () => {
  it('todos os presets produzem entradas válidas', () => {
    for (const preset of PRESETS) {
      expect(() => calcularChurrasco(preset.input)).not.toThrow()
    }
  })
})

describe('gerarResumoTexto', () => {
  it('inclui as seções principais e os totais', () => {
    const r = calcularChurrasco(base)
    const texto = gerarResumoTexto(r)
    expect(texto).toContain('CALCULADORA DE CHURRASCO')
    expect(texto).toContain('CARNES')
    expect(texto).toContain('ACOMPANHAMENTOS')
    expect(texto).toContain('BEBIDAS')
    expect(texto).toContain('DESTILADOS')
    expect(texto).toContain(`Adultos: ${r.adultos}`)
  })

  it('inclui o custo quando informado', () => {
    const r = calcularChurrasco(base)
    const { total } = calcularCusto(r)
    const texto = gerarResumoTexto(r, total)
    expect(texto).toContain('CUSTO ESTIMADO')
  })
})
