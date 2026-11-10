<script setup lang="ts">
import { Icon } from '@iconify/vue'

const atualizacao = '24 de setembro de 2026'

const leis = [
  { sigla: 'LGPD', nome: 'Lei Geral de Proteção de Dados (Brasil)' },
  { sigla: 'GDPR', nome: 'General Data Protection Regulation (União Europeia)' },
  { sigla: 'CCPA', nome: 'California Consumer Privacy Act (EUA)' },
  { sigla: 'POPIA', nome: 'Protection of Personal Information Act (África do Sul)' },
]

const direitos = [
  'Acessar os dados que eventualmente tratamos',
  'Solicitar correção de dados incompletos ou desatualizados',
  'Solicitar a exclusão de dados',
  'Revogar o consentimento a qualquer momento',
  'Opor-se ao tratamento e solicitar portabilidade',
]
</script>

<template>
  <article class="bg-background py-12 md:py-16">
    <div class="container max-w-3xl">
      <header class="mb-8">
        <span class="badge-chip mb-4"
          ><Icon icon="lucide:shield-check" class="h-4 w-4" />Privacidade</span
        >
        <h1 class="mb-2 text-3xl font-bold text-foreground md:text-4xl">Política de Privacidade</h1>
        <p class="text-sm text-muted-foreground">Última atualização: {{ atualizacao }}</p>
      </header>

      <div class="space-y-6 leading-relaxed text-muted-foreground">
        <section>
          <h2 class="mb-2 text-xl font-semibold text-foreground">1. Compromisso e Conformidade</h2>
          <p class="mb-4">
            Levamos sua privacidade a sério. Esta política está em conformidade com as principais
            leis globais de proteção de dados:
          </p>
          <ul class="grid gap-2 sm:grid-cols-2">
            <li v-for="lei in leis" :key="lei.sigla" class="flex items-start gap-2">
              <Icon
                icon="lucide:check-circle-2"
                class="mt-0.5 h-4 w-4 flex-shrink-0 text-success"
              />
              <span
                ><strong class="text-foreground">{{ lei.sigla }}</strong> — {{ lei.nome }}</span
              >
            </li>
          </ul>
        </section>

        <section>
          <h2 class="mb-2 text-xl font-semibold text-foreground">2. Dados dos Simuladores</h2>
          <p>
            Os valores inseridos nos simuladores são processados
            <strong>exclusivamente no seu navegador</strong> (client-side). Não são enviados aos
            nossos servidores, não são armazenados e não são compartilhados com terceiros.
          </p>
        </section>

        <section>
          <h2 class="mb-2 text-xl font-semibold text-foreground">3. Cookies e Analytics</h2>
          <p>
            Utilizamos Google Analytics 4 e Google Tag Manager para medir audiência de forma
            agregada e anônima. Você pode aceitar ou recusar cookies no banner de consentimento. A
            recusa não impede o uso dos simuladores.
          </p>
        </section>

        <section>
          <h2 class="mb-2 text-xl font-semibold text-foreground">4. Seus Direitos</h2>
          <ul class="space-y-2">
            <li v-for="d in direitos" :key="d" class="flex items-start gap-2">
              <Icon
                icon="lucide:check-circle-2"
                class="mt-0.5 h-4 w-4 flex-shrink-0 text-success"
              />{{ d }}
            </li>
          </ul>
        </section>

        <section>
          <h2 class="mb-2 text-xl font-semibold text-foreground">5. Encarregado de Dados (DPO)</h2>
          <p>
            Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato
            pelo e-mail
            <a href="mailto:contato@3wonline.com.br" class="text-primary underline"
              >contato@3wonline.com.br</a
            >.
          </p>
        </section>
      </div>
    </div>
  </article>
</template>
