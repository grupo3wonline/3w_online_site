<script setup lang="ts">
import PageHeader from "@/components/forms/PageHeader.vue";
import { siteConfig } from "@/config/site";

const atualizado = "24 de setembro de 2026";

const leis = [
  { sigla: "LGPD", nome: "Lei Geral de Proteção de Dados (Brasil)" },
  { sigla: "GDPR", nome: "General Data Protection Regulation (União Europeia)" },
  { sigla: "CCPA", nome: "California Consumer Privacy Act (EUA)" },
  { sigla: "POPIA", nome: "Protection of Personal Information Act (África do Sul)" },
];
</script>

<template>
  <div class="container mx-auto max-w-3xl px-4 py-8">
    <PageHeader
      icon="lucide:shield-check"
      title="Política de Privacidade"
      subtitle="Como tratamos seus dados"
      :tags="['LGPD', 'GDPR', 'CCPA', 'POPIA']"
    />

    <article class="space-y-6 text-muted-foreground">
      <p class="text-sm">Última atualização: {{ atualizado }}</p>

      <section>
        <h2 class="mb-2 text-lg font-semibold text-foreground">1. Nosso compromisso</h2>
        <p>
          O {{ siteConfig.name }} respeita sua privacidade e está em conformidade com as principais
          leis globais de proteção de dados:
        </p>
        <ul class="mt-3 space-y-1">
          <li v-for="l in leis" :key="l.sigla">
            <strong class="text-foreground">{{ l.sigla }}</strong> — {{ l.nome }}
          </li>
        </ul>
      </section>

      <section>
        <h2 class="mb-2 text-lg font-semibold text-foreground">2. Dados que processamos</h2>
        <p>
          Os dados que você digita nos geradores (empresa, cliente, itens) são processados
          <strong class="text-foreground">exclusivamente no seu navegador</strong> para gerar o
          documento. Eles não são enviados nem armazenados em nossos servidores.
        </p>
      </section>

      <section>
        <h2 class="mb-2 text-lg font-semibold text-foreground">3. Cookies e análise</h2>
        <p>
          Utilizamos cookies e ferramentas de análise (Google Analytics 4 e Google Tag Manager) para
          entender o uso do site e melhorá-lo. Você controla o consentimento pelo banner de cookies
          e pode rejeitá-los a qualquer momento.
        </p>
      </section>

      <section>
        <h2 class="mb-2 text-lg font-semibold text-foreground">4. Seus direitos</h2>
        <p>
          Você tem direito de acessar, corrigir, portar e solicitar a exclusão de seus dados, além
          de revogar consentimentos. Como não armazenamos os dados dos documentos, o controle é
          integralmente seu.
        </p>
      </section>

      <section>
        <h2 class="mb-2 text-lg font-semibold text-foreground">5. Contato do controlador</h2>
        <p>
          Para exercer seus direitos ou tirar dúvidas, contate o {{ siteConfig.company.name }} em
          <a :href="`mailto:${siteConfig.company.email}`" class="text-primary hover:underline">{{
            siteConfig.company.email
          }}</a
          >.
        </p>
      </section>
    </article>
  </div>
</template>
