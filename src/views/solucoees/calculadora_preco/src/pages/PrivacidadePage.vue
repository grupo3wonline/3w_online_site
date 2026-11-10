<script setup lang="ts">
import { Icon } from '@iconify/vue'

const direitos = [
  { icon: 'fa6-solid:eye', title: 'Acesso', desc: 'Saber quais dados temos sobre você' },
  { icon: 'fa6-solid:pen', title: 'Correção', desc: 'Corrigir dados incompletos ou inexatos' },
  { icon: 'fa6-solid:trash', title: 'Exclusão', desc: 'Solicitar a exclusão de seus dados' },
  {
    icon: 'fa6-solid:ban',
    title: 'Revogação',
    desc: 'Retirar consentimento a qualquer momento',
  },
]

const leis = [
  { sigla: 'LGPD', desc: 'Lei Geral de Proteção de Dados (Brasil — Lei nº 13.709/2018)' },
  { sigla: 'GDPR', desc: 'General Data Protection Regulation (União Europeia)' },
  { sigla: 'CCPA', desc: 'California Consumer Privacy Act (Estados Unidos)' },
  { sigla: 'POPIA', desc: 'Protection of Personal Information Act (África do Sul)' },
]

const seguranca = [
  'Criptografia SSL/HTTPS para transmissão de dados',
  'Processamento local de dados sensíveis da calculadora',
  'Servidores seguros com proteção contra ataques',
  'Acesso restrito a dados por colaboradores autorizados',
]
</script>

<template>
  <div class="py-16">
    <div class="container max-w-4xl">
      <div class="mb-12 text-center">
        <div
          class="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-6 py-3 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        >
          <Icon icon="fa6-solid:shield-halved" class="h-4 w-4" />
          <span class="font-semibold">Proteção de Dados — LGPD, GDPR, CCPA e POPIA</span>
        </div>
        <h1 class="mb-4 text-4xl font-black text-foreground md:text-5xl">
          Política de Privacidade
        </h1>
        <p class="text-muted-foreground">Última atualização: 22 de setembro de 2026</p>
      </div>

      <div class="space-y-8 rounded-3xl border border-border bg-card p-8 shadow-elegant md:p-12">
        <section>
          <h2 class="mb-4 flex items-center text-2xl font-bold text-foreground">
            <Icon icon="fa6-solid:circle-info" class="mr-3 h-6 w-6 text-green-600" />
            1. Introdução
          </h2>
          <p class="leading-relaxed text-muted-foreground">
            O <strong class="text-primary">Grupo 3w Online</strong> está comprometido em proteger
            sua privacidade e seus dados pessoais em conformidade com as principais leis globais de
            privacidade.
          </p>
          <div class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div v-for="lei in leis" :key="lei.sigla" class="rounded-xl bg-accent p-4">
              <p class="font-bold text-primary">{{ lei.sigla }}</p>
              <p class="text-sm text-muted-foreground">{{ lei.desc }}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="mb-4 flex items-center text-2xl font-bold text-foreground">
            <Icon icon="fa6-solid:database" class="mr-3 h-6 w-6 text-green-600" />
            2. Dados Coletados
          </h2>
          <div class="space-y-4">
            <div class="rounded-xl bg-green-50 p-6 dark:bg-green-900/20">
              <h3 class="mb-2 flex items-center font-bold text-foreground">
                <Icon icon="fa6-solid:calculator" class="mr-2 h-4 w-4 text-green-600" />
                Dados de Uso da Calculadora
              </h3>
              <p class="text-muted-foreground">
                Os valores inseridos nos campos de cálculo são processados
                <strong class="text-green-600">localmente no seu navegador</strong> e
                <strong>não são enviados</strong> para nossos servidores.
              </p>
            </div>
            <div class="rounded-xl bg-blue-50 p-6 dark:bg-blue-900/20">
              <h3 class="mb-2 flex items-center font-bold text-foreground">
                <Icon icon="fa6-solid:chart-line" class="mr-2 h-4 w-4 text-blue-600" />
                Dados Analíticos
              </h3>
              <p class="text-muted-foreground">
                Utilizamos Google Analytics e Google Tag Manager para coletar dados anônimos de
                navegação (páginas visitadas, dispositivo, localização aproximada e origem do
                tráfego), sempre mediante seu consentimento.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="mb-4 flex items-center text-2xl font-bold text-foreground">
            <Icon icon="fa6-solid:user-check" class="mr-3 h-6 w-6 text-green-600" />
            3. Seus Direitos
          </h2>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div v-for="d in direitos" :key="d.title" class="rounded-xl bg-accent p-4">
              <h4 class="mb-2 flex items-center font-bold text-foreground">
                <Icon :icon="d.icon" class="mr-2 h-4 w-4 text-primary" />
                {{ d.title }}
              </h4>
              <p class="text-sm text-muted-foreground">{{ d.desc }}</p>
            </div>
          </div>
          <p class="mt-4 leading-relaxed text-muted-foreground">
            Para exercer seus direitos, entre em contato pelo e-mail:
            <a
              href="mailto:contato@3wonline.com.br"
              class="font-semibold text-primary hover:underline"
            >
              contato@3wonline.com.br</a
            >.
          </p>
        </section>

        <section>
          <h2 class="mb-4 flex items-center text-2xl font-bold text-foreground">
            <Icon icon="fa6-solid:lock" class="mr-3 h-6 w-6 text-green-600" />
            4. Segurança dos Dados
          </h2>
          <ul class="space-y-3 text-muted-foreground">
            <li v-for="s in seguranca" :key="s" class="flex items-start gap-3">
              <Icon icon="fa6-solid:shield-halved" class="mt-1 h-4 w-4 text-green-500" />
              <span>{{ s }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="mb-4 flex items-center text-2xl font-bold text-foreground">
            <Icon icon="fa6-solid:envelope" class="mr-3 h-6 w-6 text-green-600" />
            5. Encarregado de Dados (DPO)
          </h2>
          <div class="rounded-xl bg-green-50 p-6 space-y-3 dark:bg-green-900/20">
            <p class="flex items-center text-foreground">
              <Icon icon="fa6-solid:building" class="mr-3 h-4 w-4 text-green-600" />
              <strong>Empresa:</strong>&nbsp;Grupo 3w Online
            </p>
            <p class="flex items-center text-foreground">
              <Icon icon="fa6-solid:envelope" class="mr-3 h-4 w-4 text-green-600" />
              <strong>E-mail:</strong>&nbsp;
              <a href="mailto:contato@3wonline.com.br" class="text-primary hover:underline">
                contato@3wonline.com.br
              </a>
            </p>
          </div>
        </section>

        <div class="rounded-xl bg-accent p-6 text-center">
          <Icon icon="fa6-solid:circle-check" class="mx-auto mb-4 h-10 w-10 text-green-500" />
          <p class="mb-2 text-lg font-semibold text-foreground">
            Seus dados e privacidade são importantes para nós!
          </p>
          <p class="text-muted-foreground">
            Estamos comprometidos em proteger suas informações conforme LGPD, GDPR, CCPA e POPIA.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
