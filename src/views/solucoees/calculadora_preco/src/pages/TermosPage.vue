<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const sections = [
  {
    icon: 'fa6-solid:circle-check',
    title: '1. Aceitação dos Termos',
    body: 'Ao acessar e usar a Calculadora de Preços, você aceita e concorda em cumprir estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize nossa ferramenta.',
  },
  {
    icon: 'fa6-solid:circle-info',
    title: '2. Descrição do Serviço',
    body: 'A Calculadora de Preços é uma ferramenta online gratuita desenvolvida pelo Grupo 3w Online para auxiliar usuários a calcular preços de produtos e serviços considerando custos fixos, variáveis, margem de lucro e impostos. A ferramenta é fornecida "como está" e tem fins informativos e educacionais.',
  },
]

const responsabilidades = [
  'Fornecer informações precisas e atualizadas nos campos de cálculo',
  'Utilizar a ferramenta de forma responsável e legal',
  'Não tentar violar a segurança da plataforma',
  'Consultar um profissional contábil ou financeiro para validar os resultados',
]

const limitacoes = [
  'Decisões comerciais ou financeiras tomadas com base nos cálculos realizados',
  'Prejuízos diretos ou indiretos decorrentes do uso da ferramenta',
  'Erros nos cálculos causados por dados incorretos fornecidos pelo usuário',
  'Interrupções temporárias do serviço por manutenção ou falhas técnicas',
]
</script>

<template>
  <div class="py-16">
    <div class="container max-w-4xl">
      <div class="mb-12 text-center">
        <div
          class="mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-primary"
        >
          <Icon icon="fa6-solid:file-contract" class="h-4 w-4" />
          <span class="font-semibold">Documentação Legal</span>
        </div>
        <h1 class="mb-4 text-4xl font-black text-foreground md:text-5xl">Termos de Uso</h1>
        <p class="text-muted-foreground">Última atualização: 22 de setembro de 2026</p>
      </div>

      <div class="space-y-8 rounded-3xl border border-border bg-card p-8 shadow-elegant md:p-12">
        <section v-for="s in sections" :key="s.title">
          <h2 class="mb-4 flex items-center text-2xl font-bold text-foreground">
            <Icon :icon="s.icon" class="mr-3 h-6 w-6 text-primary" />
            {{ s.title }}
          </h2>
          <p class="leading-relaxed text-muted-foreground">{{ s.body }}</p>
        </section>

        <section>
          <h2 class="mb-4 flex items-center text-2xl font-bold text-foreground">
            <Icon icon="fa6-solid:user-shield" class="mr-3 h-6 w-6 text-primary" />
            3. Responsabilidades do Usuário
          </h2>
          <ul class="space-y-3 text-muted-foreground">
            <li v-for="r in responsabilidades" :key="r" class="flex items-start gap-3">
              <Icon icon="fa6-solid:check" class="mt-1 h-4 w-4 text-green-500" />
              <span>{{ r }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="mb-4 flex items-center text-2xl font-bold text-foreground">
            <Icon icon="fa6-solid:triangle-exclamation" class="mr-3 h-6 w-6 text-primary" />
            4. Limitação de Responsabilidade
          </h2>
          <p class="mb-4 leading-relaxed text-muted-foreground">
            O <strong>Grupo 3w Online</strong> não se responsabiliza por:
          </p>
          <ul class="space-y-3 text-muted-foreground">
            <li v-for="l in limitacoes" :key="l" class="flex items-start gap-3">
              <Icon icon="fa6-solid:minus" class="mt-1 h-4 w-4 text-primary" />
              <span>{{ l }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="mb-4 flex items-center text-2xl font-bold text-foreground">
            <Icon icon="fa6-solid:shield-halved" class="mr-3 h-6 w-6 text-primary" />
            5. Propriedade Intelectual
          </h2>
          <p class="leading-relaxed text-muted-foreground">
            Todo o conteúdo, design, código-fonte e funcionalidades da Calculadora de Preços são de
            propriedade exclusiva do <strong>Grupo 3w Online</strong> e estão protegidos por leis de
            direitos autorais e propriedade intelectual.
          </p>
        </section>

        <section>
          <h2 class="mb-4 flex items-center text-2xl font-bold text-foreground">
            <Icon icon="fa6-solid:lock" class="mr-3 h-6 w-6 text-primary" />
            6. Privacidade e Dados
          </h2>
          <p class="leading-relaxed text-muted-foreground">
            Os dados inseridos nos formulários de cálculo são processados localmente no navegador e
            não são enviados para servidores externos. Para mais informações, consulte nossa
            <RouterLink to="/privacidade" class="font-semibold text-primary hover:underline">
              Política de Privacidade </RouterLink
            >.
          </p>
        </section>

        <section>
          <h2 class="mb-4 flex items-center text-2xl font-bold text-foreground">
            <Icon icon="fa6-solid:gavel" class="mr-3 h-6 w-6 text-primary" />
            7. Lei Aplicável
          </h2>
          <p class="leading-relaxed text-muted-foreground">
            Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Quaisquer
            disputas serão resolvidas no foro da comarca competente.
          </p>
        </section>

        <section>
          <h2 class="mb-4 flex items-center text-2xl font-bold text-foreground">
            <Icon icon="fa6-solid:envelope" class="mr-3 h-6 w-6 text-primary" />
            8. Contato
          </h2>
          <div class="rounded-xl bg-accent p-6 space-y-2">
            <p class="flex items-center text-foreground">
              <Icon icon="fa6-solid:envelope" class="mr-3 h-4 w-4 text-primary" />
              <strong>E-mail:</strong>&nbsp;
              <a href="mailto:contato@3wonline.com.br" class="text-primary hover:underline">
                contato@3wonline.com.br
              </a>
            </p>
            <p class="flex items-center text-foreground">
              <Icon icon="fa6-solid:globe" class="mr-3 h-4 w-4 text-primary" />
              <strong>Website:</strong>&nbsp;
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary hover:underline"
              >
                www.3wonline.com.br
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
