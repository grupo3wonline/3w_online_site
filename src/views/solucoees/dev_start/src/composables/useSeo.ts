import { useHead } from '@unhead/vue'
import { computed, type MaybeRefOrGetter, toValue } from 'vue'

interface SeoOptions {
  title?: MaybeRefOrGetter<string>
  description?: MaybeRefOrGetter<string>
  path?: MaybeRefOrGetter<string>
}

const BASE_URL = 'https://www.3wonline.com.br/dev_start'

/**
 * Define título, descrição e tags Open Graph/Twitter por rota.
 * Suporta SEO, SEM, GEO e AEO (dados canônicos + descrições ricas).
 */
export function useSeo(options: SeoOptions) {
  const title = computed(() => toValue(options.title) ?? 'DevStart Academy')
  const description = computed(
    () => toValue(options.description) ?? 'Aprenda programação de forma gamificada.',
  )
  const url = computed(() => `${BASE_URL}${toValue(options.path) ?? ''}`)

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    link: [{ rel: 'canonical', href: url }],
  })
}
