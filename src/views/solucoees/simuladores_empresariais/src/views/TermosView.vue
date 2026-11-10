<script setup lang="ts">
import { Icon } from '@iconify/vue'

const atualizacao = '24 de setembro de 2026'
</script>

<template>
  <article class="bg-background py-12 md:py-16">
    <div class="container max-w-3xl">
      <header class="mb-8">
        <span class="badge-chip mb-4"><Icon icon="lucide:file-text" class="h-4 w-4" />Legal</span>
        <h1 class="mb-2 text-3xl font-bold text-foreground md:text-4xl">Termos de Uso</h1>
        <p class="text-sm text-muted-foreground">Última atualização: {{ atualizacao }}</p>
      </header>

      <div class="space-y-6 leading-relaxed text-muted-foreground">
        <section>
          <h2 class="mb-2 text-xl font-semibold text-foreground">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e utilizar os Simuladores Empresariais Pro, você concorda com estes Termos de
            Uso. Caso não concorde, não utilize a aplicação.
          </p>
        </section>
        <section>
          <h2 class="mb-2 text-xl font-semibold text-foreground">2. Natureza da Ferramenta</h2>
          <p>
            Os simuladores destinam-se exclusivamente a fins informativos e educacionais. Os
            resultados são estimativas baseadas em metodologias financeiras e
            <strong>não constituem aconselhamento financeiro, contábil ou jurídico</strong>.
            Consulte sempre um profissional qualificado antes de tomar decisões estratégicas.
          </p>
        </section>
        <section>
          <h2 class="mb-2 text-xl font-semibold text-foreground">3. Processamento de Dados</h2>
          <p>
            Todos os cálculos são realizados localmente no seu navegador. Não coletamos,
            transmitimos ou armazenamos os dados inseridos nos simuladores.
          </p>
        </section>
        <section>
          <h2 class="mb-2 text-xl font-semibold text-foreground">4. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo, design e código são de propriedade do Grupo 3w Online, salvo
            componentes de terceiros licenciados. É vedada a reprodução sem autorização.
          </p>
        </section>
        <section>
          <h2 class="mb-2 text-xl font-semibold text-foreground">
            5. Limitação de Responsabilidade
          </h2>
          <p>
            O Grupo 3w Online não se responsabiliza por decisões tomadas com base nos resultados dos
            simuladores nem por eventuais imprecisões nas estimativas.
          </p>
        </section>
        <section>
          <h2 class="mb-2 text-xl font-semibold text-foreground">6. Contato</h2>
          <p>
            Dúvidas sobre estes termos podem ser enviadas para
            <a href="mailto:contato@3wonline.com.br" class="text-primary underline"
              >contato@3wonline.com.br</a
            >.
          </p>
        </section>
      </div>
    </div>
  </article>
</template>
