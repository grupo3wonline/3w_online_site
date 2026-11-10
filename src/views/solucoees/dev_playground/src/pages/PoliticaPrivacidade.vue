<script setup lang="ts">
import LegalShell from '@/components/legal/LegalShell.vue'
import { useHead } from '@/composables/useHead'
import { company } from '@/config/site'

useHead({
  title: 'Política de Privacidade',
  description:
    'Política de Privacidade do DevPlayground em conformidade com LGPD, GDPR, CCPA e POPIA.',
  path: '/privacidade',
})
</script>

<template>
  <LegalShell title="Política de Privacidade" icon="lucide:shield-check" updated-at="Fevereiro de 2026">
    <p>
      A sua privacidade é prioridade para o <strong>DevPlayground</strong> e para a
      <strong>{{ company.name }}</strong>. Esta política explica como tratamos seus dados, em
      conformidade com as principais leis globais de proteção de dados:
      <strong>LGPD</strong> (Brasil), <strong>GDPR</strong> (União Europeia),
      <strong>CCPA</strong> (Califórnia/EUA) e <strong>POPIA</strong> (África do Sul).
    </p>

    <h2>1. Dados que Coletamos</h2>
    <p>
      O DevPlayground foi desenhado com privacidade por padrão (<em>privacy by design</em>). O
      código que você escreve é processado <strong>localmente no seu navegador</strong> e não é
      enviado nem armazenado em nossos servidores.
    </p>
    <ul>
      <li><strong>Dados técnicos anônimos:</strong> métricas agregadas de uso via Google Analytics 4;</li>
      <li><strong>Preferências locais:</strong> tema e consentimento de cookies (armazenados no seu dispositivo);</li>
      <li>Não coletamos nome, e-mail ou dados sensíveis sem seu consentimento explícito.</li>
    </ul>

    <h2>2. Base Legal e Finalidade</h2>
    <p>
      Tratamos dados com base no seu consentimento e no legítimo interesse de melhorar a plataforma.
      As finalidades são: operação do serviço, análise estatística agregada e melhoria contínua da
      experiência.
    </p>

    <h2>3. Cookies</h2>
    <p>
      Utilizamos apenas cookies essenciais e de análise. Você pode aceitar ou recusar cookies não
      essenciais no banner de consentimento. Cookies essenciais garantem o funcionamento básico.
    </p>

    <h2>4. Seus Direitos</h2>
    <p>Independentemente da sua localização, você tem direito a:</p>
    <ul>
      <li>Acessar, corrigir ou excluir seus dados pessoais;</li>
      <li>Revogar o consentimento a qualquer momento;</li>
      <li>Solicitar a portabilidade dos dados (GDPR/LGPD);</li>
      <li>Optar por não vender seus dados — nós nunca vendemos (CCPA);</li>
      <li>Apresentar reclamação à autoridade competente (ex.: ANPD, no Brasil).</li>
    </ul>

    <h2>5. Compartilhamento de Dados</h2>
    <p>
      <strong>Não vendemos nem compartilhamos</strong> seus dados pessoais com terceiros para fins
      de marketing. Utilizamos apenas o Google Analytics/Tag Manager para métricas anônimas.
    </p>

    <h2>6. Segurança</h2>
    <p>
      Adotamos medidas técnicas e organizacionais para proteger seus dados: HTTPS, cabeçalhos de
      segurança, sandbox de execução de código e minimização de coleta de dados.
    </p>

    <h2>7. Retenção</h2>
    <p>
      Preferências ficam no seu dispositivo até você limpá-las. Métricas anônimas seguem a política
      de retenção do Google Analytics.
    </p>

    <h2>8. Encarregado de Dados (DPO) e Contato</h2>
    <p>
      Para exercer seus direitos ou tirar dúvidas sobre privacidade, contate a
      <strong>{{ company.name }}</strong> pelo e-mail
      <a :href="company.emailLink">{{ company.email }}</a> ou WhatsApp
      <a :href="company.whatsapp.link" target="_blank" rel="noopener noreferrer">{{
        company.whatsapp.display
      }}</a
      >.
    </p>
  </LegalShell>
</template>
