<script setup lang="ts">
import { Icon } from '@iconify/vue'
import InfoCard from '@/components/ui/InfoCard.vue'

const atualizado = new Date().toLocaleDateString('pt-BR')
</script>

<template>
  <div class="container max-w-4xl py-8">
    <header class="mb-8 text-center">
      <div class="mb-4 flex justify-center">
        <div class="rounded-full bg-primary/10 p-4">
          <Icon icon="lucide:file-text" class="h-12 w-12 text-primary" />
        </div>
      </div>
      <h1 class="mb-2 text-4xl font-bold">Termos de Uso</h1>
      <p class="text-muted-foreground">Última atualização: {{ atualizado }}</p>
    </header>

    <div class="space-y-6">
      <InfoCard icon="lucide:alert-circle" title="1. Aceitação dos Termos">
        <p class="leading-relaxed">
          Ao acessar e utilizar a Calculadora de IMC, você declara que leu, compreendeu e concorda
          em cumprir estes Termos de Uso. Se não concordar com qualquer parte destes termos, não
          deverá utilizar nossos serviços.
        </p>
      </InfoCard>

      <InfoCard icon="lucide:scale" title="2. Descrição do Serviço">
        <p class="leading-relaxed">A Calculadora de IMC é uma ferramenta digital gratuita que oferece:</p>
        <ul class="mt-3 list-disc space-y-2 pl-6">
          <li>Cálculo de Índice de Massa Corporal (IMC)</li>
          <li>Estimativas de necessidades calóricas diárias</li>
          <li>Recomendações de ingestão de água</li>
          <li>Orientações nutricionais gerais</li>
          <li>Informações sobre os 8 remédios naturais para saúde</li>
          <li>Geração de relatórios em PDF</li>
        </ul>
      </InfoCard>

      <InfoCard icon="lucide:users" title="3. Responsabilidades do Usuário">
        <p class="leading-relaxed">O usuário compromete-se a:</p>
        <ul class="mt-3 list-disc space-y-2 pl-6">
          <li>Fornecer informações verídicas nos formulários</li>
          <li>Utilizar a ferramenta apenas para fins pessoais e informativos</li>
          <li>Não reproduzir, distribuir ou comercializar o conteúdo sem autorização</li>
          <li>Consultar profissionais de saúde antes de iniciar qualquer dieta ou programa de exercícios</li>
          <li>Entender que os cálculos são estimativas e podem variar conforme características individuais</li>
        </ul>
      </InfoCard>

      <InfoCard icon="lucide:shield" title="4. Limitação de Responsabilidade">
        <p class="leading-relaxed">
          <strong>AVISO IMPORTANTE:</strong> a Calculadora de IMC é uma ferramenta informativa e
          educacional. Os resultados são baseados em fórmulas científicas gerais e não substituem:
        </p>
        <ul class="mt-3 list-disc space-y-2 pl-6">
          <li>Consultas médicas</li>
          <li>Acompanhamento nutricional profissional</li>
          <li>Orientação de educadores físicos</li>
          <li>Diagnósticos ou tratamentos médicos</li>
        </ul>
        <p class="mt-3 leading-relaxed">
          Não nos responsabilizamos por decisões tomadas exclusivamente com base nas informações
          fornecidas pela ferramenta.
        </p>
      </InfoCard>

      <InfoCard icon="lucide:clock" title="5. Modificações dos Termos">
        <p class="leading-relaxed">
          Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações
          entram em vigor imediatamente após a publicação. O uso continuado do serviço após as
          modificações constitui aceitação dos novos termos.
        </p>
      </InfoCard>

      <InfoCard variant="highlight">
        <p class="text-center text-sm">
          Em caso de dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail:
          <a href="mailto:contato@3wonline.com.br" class="font-medium text-primary">
            contato@3wonline.com.br
          </a>
        </p>
      </InfoCard>
    </div>
  </div>
</template>
