<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { company } from '@/config/site'
</script>

<template>
  <article class="card-surface mx-auto max-w-4xl p-8 md:p-12">
    <h1 class="mb-6 flex items-center gap-3 text-4xl font-bold text-foreground">
      <Icon icon="fa6-solid:shield-halved" class="text-primary" aria-hidden="true" />
      Política de Privacidade
    </h1>

    <div class="prose prose-slate max-w-none dark:prose-invert">
      <p class="text-sm text-muted-foreground">
        <strong>Última atualização:</strong> 24 de setembro de 2026
      </p>

      <h2>1. Introdução</h2>
      <p>
        Esta Política de Privacidade descreve como a
        <strong>Calculadora de Orçamento para Social Mídia</strong>, desenvolvida pelo
        <strong>{{ company.name }}</strong
        >, coleta, usa e protege suas informações, em conformidade com a <strong>LGPD</strong> (Lei
        nº 13.709/2018 - Brasil), o <strong>GDPR</strong> (Regulamento UE 2016/679), o
        <strong>CCPA</strong> (Califórnia, EUA) e a <strong>POPIA</strong> (África do Sul).
      </p>

      <h2>2. Dados Coletados</h2>
      <h3>2.1. Processamento local</h3>
      <p>
        A aplicação funciona 100% localmente no seu navegador. Não coletamos, armazenamos ou
        transmitimos para nossos servidores quaisquer dados pessoais inseridos na ferramenta (nome
        do cliente, e-mail, valores ou observações).
      </p>
      <h3>2.2. Cookies e navegação</h3>
      <ul>
        <li>Armazenar suas preferências de consentimento de cookies</li>
        <li>Análise de tráfego anonimizada via Google Analytics 4 e Google Tag Manager</li>
        <li>Melhorar a experiência de uso</li>
      </ul>

      <h2>3. Base legal e finalidade</h2>
      <p>
        O tratamento de dados de navegação ocorre mediante o seu <strong>consentimento</strong>
        (art. 7º da LGPD; art. 6º do GDPR) e é usado exclusivamente para análise estatística,
        melhorias e correção de falhas.
      </p>

      <h2>4. Compartilhamento</h2>
      <p>
        <strong>Não vendemos, alugamos ou compartilhamos seus dados pessoais</strong> com terceiros,
        exceto quando exigido por lei ou ordem judicial. Não há venda de dados na acepção do CCPA.
      </p>

      <h2>5. Segurança</h2>
      <ul>
        <li>Processamento client-side (os dados não saem do seu dispositivo)</li>
        <li>Conexões HTTPS e cabeçalhos de segurança</li>
        <li>Sanitização de entradas para mitigar ataques (XSS/injeção)</li>
      </ul>

      <h2>6. Seus direitos</h2>
      <p>Conforme LGPD, GDPR, CCPA e POPIA, você pode:</p>
      <ul>
        <li>Confirmar a existência de tratamento e acessar seus dados</li>
        <li>Corrigir, anonimizar, bloquear ou eliminar dados</li>
        <li>Revogar o consentimento a qualquer momento (gerenciando os cookies)</li>
        <li>Solicitar portabilidade e informações sobre compartilhamento</li>
        <li>Opor-se ao tratamento (opt-out), incluindo o "Do Not Sell" do CCPA</li>
      </ul>

      <h2>7. Cookies</h2>
      <p>
        Utilizamos cookies necessários, analíticos e de marketing. Você gerencia suas escolhas pelo
        banner de consentimento ou nas configurações do navegador.
      </p>

      <h2>8. Alterações</h2>
      <p>
        Podemos atualizar esta Política periodicamente. Recomendamos revisá-la com regularidade.
      </p>

      <h2>9. Contato do Encarregado (DPO)</h2>
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
