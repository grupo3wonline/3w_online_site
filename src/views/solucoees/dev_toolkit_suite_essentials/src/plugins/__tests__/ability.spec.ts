import { describe, it, expect } from 'vitest'
import { defineAbilityFor } from '../ability'

describe('CASL ability', () => {
  it('convidado pode ler e usar ferramentas', () => {
    const ability = defineAbilityFor('guest')
    expect(ability.can('read', 'Tool')).toBe(true)
    expect(ability.can('use', 'Tool')).toBe(true)
    expect(ability.can('read', 'Page')).toBe(true)
  })

  it('convidado NÃO pode gerenciar tudo', () => {
    const ability = defineAbilityFor('guest')
    expect(ability.can('manage', 'all')).toBe(false)
  })

  it('admin pode gerenciar tudo', () => {
    const ability = defineAbilityFor('admin')
    expect(ability.can('manage', 'all')).toBe(true)
  })
})
