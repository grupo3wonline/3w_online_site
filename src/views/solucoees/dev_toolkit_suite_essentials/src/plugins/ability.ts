import { AbilityBuilder, createMongoAbility, type MongoAbility } from '@casl/ability'

export type Actions = 'read' | 'use' | 'manage'
export type Subjects = 'Tool' | 'Page' | 'all'
export type AppAbility = MongoAbility<[Actions, Subjects]>

/**
 * Define as permissões da aplicação. Como não há autenticação, todo visitante
 * é tratado como convidado com permissão de leitura/uso das ferramentas públicas.
 * A estrutura fica pronta para evoluir caso surjam papéis (ex.: admin).
 */
export function defineAbilityFor(role: 'guest' | 'admin' = 'guest'): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

  if (role === 'admin') {
    can('manage', 'all')
  } else {
    can('read', 'Page')
    can(['read', 'use'], 'Tool')
  }

  return build()
}

export const ability = defineAbilityFor('guest')
