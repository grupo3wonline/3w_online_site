<script setup lang="ts">
import PageHeader from "@/components/forms/PageHeader.vue";
import { siteConfig } from "@/config/site";

const atualizado = "24 de setembro de 2026";
</script>

<template>
  <div class="container mx-auto max-w-3xl px-4 py-8">
    <PageHeader
      icon="lucide:file-check"
      title="Termos de Uso"
      subtitle="Condições para utilização do serviço"
    />

    <article class="prose-legal space-y-6 text-muted-foreground">
      <p class="text-sm">Última atualização: {{ atualizado }}</p>

      <section>
        <h2 class="mb-2 text-lg font-semibold text-foreground">1. Aceitação dos termos</h2>
        <p>
          Ao utilizar o {{ siteConfig.name }}, você concorda com estes Termos de Uso. Caso não
          concorde, recomendamos não utilizar o serviço.
        </p>
      </section>

      <section>
        <h2 class="mb-2 text-lg font-semibold text-foreground">2. Descrição do serviço</h2>
        <p>
          O {{ siteConfig.name }} oferece geradores gratuitos de orçamentos, ordens de serviço e
          recibos. Os documentos são gerados localmente no seu navegador. Nenhum dado inserido é
          armazenado em nossos servidores.
        </p>
      </section>

      <section>
        <h2 class="mb-2 text-lg font-semibold text-foreground">3. Responsabilidade do usuário</h2>
        <p>
          Você é o único responsável pela veracidade e legalidade das informações inseridas nos
          documentos gerados, bem como pelo uso que fizer deles. O serviço não substitui orientação
          contábil ou jurídica profissional.
        </p>
      </section>

      <section>
        <h2 class="mb-2 text-lg font-semibold text-foreground">4. Limitação de responsabilidade</h2>
        <p>
          O serviço é fornecido "como está", sem garantias. Não nos responsabilizamos por eventuais
          perdas decorrentes do uso dos documentos gerados.
        </p>
      </section>

      <section>
        <h2 class="mb-2 text-lg font-semibold text-foreground">5. Propriedade intelectual</h2>
        <p>
          A marca, o layout e o código do {{ siteConfig.name }} pertencem ao
          {{ siteConfig.company.name }}. Os documentos que você gera são de sua propriedade.
        </p>
      </section>

      <section>
        <h2 class="mb-2 text-lg font-semibold text-foreground">6. Contato</h2>
        <p>
          Dúvidas sobre estes termos podem ser enviadas para
          <a :href="`mailto:${siteConfig.company.email}`" class="text-primary hover:underline">{{
            siteConfig.company.email
          }}</a
          >.
        </p>
      </section>
    </article>
  </div>
</template>
