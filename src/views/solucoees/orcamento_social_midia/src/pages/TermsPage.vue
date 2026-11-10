<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { company } from '@/config/site'
</script>

<template>
  <article class="card-surface mx-auto max-w-4xl p-8 md:p-12">
    <h1 class="mb-6 flex items-center gap-3 text-4xl font-bold text-foreground">
      <Icon icon="fa6-solid:file-contract" class="text-primary" aria-hidden="true" />
      Termos de Uso
    </h1>

    <div class="prose prose-slate max-w-none dark:prose-invert">
      <p class="text-sm text-muted-foreground">
        <strong>Última atualização:</strong> 24 de setembro de 2026
      </p>

      <h2>1. Aceitação dos Termos</h2>
      <p>
        Ao acessar e usar a <strong>Calculadora de Orçamento para Social Mídia</strong>, você
        concorda em cumprir estes Termos de Uso. Se não concordar, não deve usar a ferramenta.
      </p>

      <h2>2. Descrição do Serviço</h2>
      <ul>
        <li>Calculadora de orçamentos personalizada</li>
        <li>Geração de documentos em PDF</li>
        <li>Templates pré-configurados</li>
        <li>Cálculos automatizados</li>
      </ul>

      <h2>3. Uso Aceitável</h2>
      <p>É proibido:</p>
      <ul>
        <li>Usar a ferramenta para fins ilegais ou não autorizados</li>
        <li>Tentar acessar áreas restritas do sistema</li>
        <li>Interferir ou interromper o funcionamento da ferramenta</li>
        <li>Copiar, modificar ou distribuir o código-fonte sem autorização</li>
        <li>Utilizar técnicas de engenharia reversa</li>
      </ul>

      <h2>4. Propriedade Intelectual</h2>
      <p>
        Todo o conteúdo, design, código-fonte, logos e marcas são propriedade do
        <strong>{{ company.name }}</strong> e estão protegidos por leis de propriedade intelectual.
      </p>

      <h2>5. Gratuidade do Serviço</h2>
      <ul>
        <li>Modificar ou descontinuar recursos a qualquer momento</li>
        <li>Implementar versões premium no futuro</li>
        <li>Estabelecer limites de uso se necessário</li>
      </ul>

      <h2>6. Responsabilidades do Usuário</h2>
      <ul>
        <li>Garantir a precisão das informações inseridas</li>
        <li>Verificar todos os cálculos antes de enviar orçamentos a clientes</li>
        <li>Manter a confidencialidade de dados sensíveis</li>
        <li>Usar a ferramenta de forma ética e profissional</li>
      </ul>

      <h2>7. Limitação de Responsabilidade</h2>
      <p>A ferramenta é fornecida "como está", sem garantias. Não nos responsabilizamos por:</p>
      <ul>
        <li>Erros de cálculo resultantes de dados incorretos</li>
        <li>Perda de dados ou documentos</li>
        <li>Danos diretos ou indiretos decorrentes do uso</li>
        <li>Interrupções ou indisponibilidade do serviço</li>
      </ul>

      <h2>8. Privacidade e Dados</h2>
      <p>
        O tratamento de dados está descrito na nossa
        <RouterLink to="/politica-privacidade" class="text-primary hover:underline">
          Política de Privacidade </RouterLink
        >, parte integrante destes Termos.
      </p>

      <h2>9. Modificações nos Termos</h2>
      <p>
        Reservamo-nos o direito de modificar estes Termos a qualquer momento. O uso continuado após
        alterações constitui aceitação dos novos termos.
      </p>

      <h2>10. Lei Aplicável</h2>
      <p>
        Estes Termos são regidos pelas leis da República Federativa do Brasil, incluindo a LGPD (Lei
        nº 13.709/2018).
      </p>

      <h2>11. Contato</h2>
      <div class="rounded-lg border-l-4 border-primary bg-primary/5 p-4">
        <p>
          <strong>{{ company.name }}</strong>
        </p>
        <p>E-mail: {{ company.email }}</p>
        <p>WhatsApp: {{ company.whatsapp }}</p>
        <p>
          Website:
          <a :href="company.website" class="text-primary hover:underline">www.3wonline.com.br</a>
        </p>
      </div>
    </div>
  </article>
</template>
