<script setup lang="ts">
import { site } from '@/config/site'
import { useSeo } from '@/composables/useSeo'

useSeo(() => ({
  title: 'Termos de Uso',
  description: 'Termos de Uso da Calculadora de Orçamento de Marketing Digital.',
  path: '/termos-de-uso',
}))
</script>

<template>
  <section class="cta-section !py-12">
    <div class="container relative mx-auto text-center">
      <span
        class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm"
      >
        <i class="fas fa-file-contract" aria-hidden="true"></i>
        Documento Legal
      </span>
      <h1 class="mb-2 text-3xl font-bold text-white md:text-4xl">Termos de Uso</h1>
      <p class="text-white/80">Última atualização: Janeiro de 2024</p>
    </div>
  </section>

  <section class="bg-background px-4 py-12">
    <div class="container mx-auto max-w-4xl">
      <div class="card-premium">
        <h2 class="mb-6 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-gavel text-primary" aria-hidden="true"></i>
          1. Aceitação dos Termos
        </h2>
        <p class="mb-6 text-muted-foreground">
          Ao acessar e utilizar a Calculadora de Orçamento de Marketing Digital, você concorda com
          estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá
          utilizar nossos serviços.
        </p>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-info-circle text-primary" aria-hidden="true"></i>
          2. Descrição do Serviço
        </h2>
        <p class="mb-4 text-muted-foreground">
          A Calculadora de Orçamento de Marketing Digital é uma ferramenta gratuita desenvolvida
          pelo Grupo 3w Online para auxiliar profissionais de marketing, influenciadores e criadores
          de conteúdo no cálculo de orçamentos para campanhas digitais.
        </p>
        <p class="mb-6 text-muted-foreground">
          O serviço é fornecido "como está", sem garantias de qualquer tipo, expressas ou
          implícitas.
        </p>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-user-check text-primary" aria-hidden="true"></i>
          3. Uso Permitido
        </h2>
        <p class="mb-4 text-muted-foreground">Você pode utilizar esta ferramenta para:</p>
        <ul class="mb-6 list-inside list-disc space-y-2 text-muted-foreground">
          <li>Calcular orçamentos para campanhas de marketing digital pessoais ou comerciais;</li>
          <li>Utilizar os resultados como referência para precificação de serviços;</li>
          <li>Compartilhar a ferramenta com outras pessoas interessadas.</li>
        </ul>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-ban text-primary" aria-hidden="true"></i>
          4. Uso Proibido
        </h2>
        <p class="mb-4 text-muted-foreground">É expressamente proibido:</p>
        <ul class="mb-6 list-inside list-disc space-y-2 text-muted-foreground">
          <li>Tentar acessar, modificar ou interferir em sistemas ou dados não autorizados;</li>
          <li>Utilizar a ferramenta para fins ilegais ou fraudulentos;</li>
          <li>Reproduzir, distribuir ou modificar o código-fonte sem autorização;</li>
          <li>Remover ou alterar avisos de direitos autorais ou marcas registradas;</li>
          <li>Utilizar scripts automatizados para acessar a ferramenta em massa.</li>
        </ul>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-exclamation-triangle text-primary" aria-hidden="true"></i>
          5. Limitação de Responsabilidade
        </h2>
        <p class="mb-4 text-muted-foreground">
          Os cálculos fornecidos por esta ferramenta são meramente informativos e não constituem
          aconselhamento profissional. O Grupo 3w Online não se responsabiliza por:
        </p>
        <ul class="mb-6 list-inside list-disc space-y-2 text-muted-foreground">
          <li>Decisões de negócios tomadas com base nos resultados da calculadora;</li>
          <li>Perdas financeiras ou danos decorrentes do uso da ferramenta;</li>
          <li>Interrupções no serviço ou indisponibilidade da plataforma;</li>
          <li>Erros nos cálculos ou resultados imprecisos.</li>
        </ul>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-copyright text-primary" aria-hidden="true"></i>
          6. Propriedade Intelectual
        </h2>
        <p class="mb-6 text-muted-foreground">
          Todo o conteúdo, design, código-fonte e elementos visuais desta ferramenta são de
          propriedade do Grupo 3w Online e estão protegidos por leis de direitos autorais e
          propriedade intelectual.
        </p>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-shield-alt text-primary" aria-hidden="true"></i>
          7. Privacidade
        </h2>
        <p class="mb-6 text-muted-foreground">
          O uso de seus dados pessoais está sujeito à nossa
          <RouterLink to="/politica-de-privacidade" class="text-primary hover:underline"
            >Política de Privacidade</RouterLink
          >. Recomendamos que você a leia atentamente para entender como coletamos, usamos e
          protegemos suas informações.
        </p>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-edit text-primary" aria-hidden="true"></i>
          8. Alterações nos Termos
        </h2>
        <p class="mb-6 text-muted-foreground">
          Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações
          entrarão em vigor imediatamente após a publicação. O uso continuado da ferramenta após as
          alterações constitui aceitação dos novos termos.
        </p>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-balance-scale text-primary" aria-hidden="true"></i>
          9. Lei Aplicável
        </h2>
        <p class="mb-6 text-muted-foreground">
          Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer
          disputa relacionada a estes termos será submetida ao foro da comarca onde está sediado o
          Grupo 3w Online.
        </p>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-envelope text-primary" aria-hidden="true"></i>
          10. Contato
        </h2>
        <p class="mb-4 text-muted-foreground">
          Para dúvidas sobre estes Termos de Uso, entre em contato:
        </p>
        <div class="rounded-xl bg-secondary/30 p-6">
          <p class="mb-2 font-semibold text-foreground">{{ site.developer.company }}</p>
          <p class="mb-1 text-sm text-muted-foreground">
            WhatsApp:
            <a
              :href="site.contact.whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary hover:underline"
              >{{ site.contact.whatsapp }}</a
            >
          </p>
          <p class="mb-1 text-sm text-muted-foreground">
            E-mail:
            <a :href="site.contact.emailLink" class="text-primary hover:underline">{{
              site.contact.email
            }}</a>
          </p>
          <p class="text-sm text-muted-foreground">
            Website:
            <a
              :href="site.contact.websiteLink"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary hover:underline"
              >{{ site.contact.website }}</a
            >
          </p>
        </div>
      </div>

      <div class="mt-8 text-center">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <i class="fas fa-arrow-left" aria-hidden="true"></i>
          Voltar para a página inicial
        </RouterLink>
      </div>
    </div>
  </section>
</template>
