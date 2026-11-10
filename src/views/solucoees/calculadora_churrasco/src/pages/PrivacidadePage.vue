<template>
  <div class="bg-background">
    <section class="bg-gradient-to-br from-bbq-warm via-background to-bbq-warm/50 py-16 dark:from-background dark:via-background dark:to-background lg:py-20">
      <div class="container mx-auto px-4">
        <AppBreadcrumb />
        <div class="mx-auto max-w-3xl text-center">
          <span class="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-bbq-orange">Privacidade</span>
          <h1 class="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Política de <span class="text-bbq-orange">Privacidade</span>
          </h1>
          <p class="text-lg text-muted-foreground">
            Transparência total sobre dados. Em conformidade com LGPD, GDPR, CCPA e POPIA.
          </p>
        </div>
      </div>
    </section>

    <section class="py-12 lg:py-16">
      <div class="container mx-auto px-4">
        <!-- Destaque privacy-first -->
        <div class="mx-auto mb-10 max-w-3xl rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
          <div class="flex items-start gap-4">
            <i class="fa-solid fa-shield-halved mt-1 text-2xl text-green-600"></i>
            <div>
              <h2 class="mb-1 text-lg font-bold text-foreground">Coleta zero de dados</h2>
              <p class="text-sm text-muted-foreground">
                A Calculadora de Churrasco funciona <strong>100% no seu navegador</strong>. Não temos
                servidor de dados, não exigimos cadastro e <strong>não coletamos nem armazenamos</strong>
                as informações que você digita. Todo cálculo acontece localmente no seu dispositivo.
              </p>
            </div>
          </div>
        </div>

        <div class="mx-auto max-w-3xl space-y-8">
          <article v-for="secao in secoes" :key="secao.titulo">
            <h2 class="mb-3 flex items-center gap-2 text-xl font-bold text-foreground">
              <i :class="secao.icone + ' text-bbq-orange'"></i>{{ secao.titulo }}
            </h2>
            <p class="leading-relaxed text-muted-foreground">{{ secao.conteudo }}</p>
          </article>

          <!-- Conformidade global -->
          <article>
            <h2 class="mb-3 flex items-center gap-2 text-xl font-bold text-foreground">
              <i class="fa-solid fa-globe text-bbq-orange"></i>Conformidade com leis globais
            </h2>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div v-for="lei in leis" :key="lei.sigla" class="rounded-xl bg-card p-4 shadow-sm">
                <h3 class="mb-1 font-semibold text-foreground">{{ lei.sigla }}</h3>
                <p class="text-sm text-muted-foreground">{{ lei.desc }}</p>
              </div>
            </div>
          </article>

          <!-- Direitos do titular -->
          <article>
            <h2 class="mb-3 flex items-center gap-2 text-xl font-bold text-foreground">
              <i class="fa-solid fa-user-shield text-bbq-orange"></i>Seus direitos
            </h2>
            <p class="mb-3 text-muted-foreground">
              Como não coletamos dados pessoais, não há informações suas sob nossa guarda. Ainda
              assim, você pode a qualquer momento:
            </p>
            <ul class="space-y-2">
              <li v-for="d in direitos" :key="d" class="flex items-center gap-2 text-sm text-muted-foreground">
                <i class="fa-solid fa-check text-bbq-orange"></i>{{ d }}
              </li>
            </ul>
          </article>

          <!-- Contato DPO -->
          <div class="rounded-2xl bg-gradient-to-r from-bbq-orange/10 to-bbq-red/10 p-6">
            <h2 class="mb-2 text-lg font-bold text-foreground">Dúvidas sobre privacidade?</h2>
            <p class="mb-4 text-sm text-muted-foreground">
              Fale com o Grupo 3W Online, responsável pelo desenvolvimento e manutenção desta ferramenta.
            </p>
            <div class="flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:contato@3wonline.com.br"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-bbq-orange to-bbq-red px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
              >
                <i class="fa-solid fa-envelope"></i> contato@3wonline.com.br
              </a>
              <a
                href="https://wa.me/5541996924829"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold transition-all hover:bg-muted"
              >
                <i class="fa-brands fa-whatsapp"></i> WhatsApp (41) 99692-4829
              </a>
            </div>
          </div>

          <p class="text-center text-xs text-muted-foreground">
            Última atualização: {{ atualizadoEm }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'

const atualizadoEm = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })

const secoes = [
  {
    icone: 'fa-solid fa-cookie-bite',
    titulo: 'Cookies e tecnologias',
    conteudo:
      'Utilizamos apenas cookies essenciais para o funcionamento e, mediante seu consentimento, cookies analíticos (Google Analytics 4) para entender o uso agregado e anônimo do site. Você controla essa escolha pelo banner de cookies e pode revogar o consentimento a qualquer momento limpando o armazenamento do navegador.',
  },
  {
    icone: 'fa-solid fa-database',
    titulo: 'Quais dados tratamos',
    conteudo:
      'Os números que você informa (convidados e duração) são processados apenas na memória do seu navegador para gerar o cálculo e nunca são enviados a nenhum servidor. Preferências como tema (claro/escuro) e consentimento de cookies ficam salvas localmente no seu próprio dispositivo (localStorage).',
  },
  {
    icone: 'fa-solid fa-share-nodes',
    titulo: 'Compartilhamento',
    conteudo:
      'Não vendemos, alugamos ou compartilhamos dados pessoais com terceiros. Serviços de terceiros usados são limitados a análise anônima (GA4/GTM) e fontes/ícones via CDN, sujeitos às suas próprias políticas.',
  },
]

const leis = [
  { sigla: 'LGPD (Brasil)', desc: 'Lei Geral de Proteção de Dados nº 13.709/2018.' },
  { sigla: 'GDPR (União Europeia)', desc: 'Regulamento Geral de Proteção de Dados (UE) 2016/679.' },
  { sigla: 'CCPA (Califórnia, EUA)', desc: 'California Consumer Privacy Act.' },
  { sigla: 'POPIA (África do Sul)', desc: 'Protection of Personal Information Act.' },
]

const direitos = [
  'Recusar cookies não essenciais',
  'Revogar o consentimento a qualquer momento',
  'Solicitar esclarecimentos sobre o tratamento de dados',
  'Utilizar a ferramenta sem qualquer identificação',
]
</script>
