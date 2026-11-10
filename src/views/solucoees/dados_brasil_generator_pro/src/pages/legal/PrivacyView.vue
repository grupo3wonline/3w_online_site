<script setup lang="ts">
import LegalLayout from '@/components/common/LegalLayout.vue'
import { siteConfig } from '@/config/site'
</script>

<template>
  <LegalLayout title="Política de Privacidade" updated="24/09/2026">
    <p>
      Esta Política de Privacidade descreve como o <strong>{{ siteConfig.name }}</strong>, mantido pela
      {{ siteConfig.developer.company }}, trata informações ao usar esta aplicação. Estamos comprometidos com a
      conformidade às principais leis globais de privacidade: <strong>LGPD</strong> (Brasil),
      <strong>GDPR</strong> (União Europeia), <strong>CCPA</strong> (Califórnia/EUA) e <strong>POPIA</strong>
      (África do Sul).
    </p>

    <h2>1. Processamento local dos dados</h2>
    <p>
      Todas as ferramentas de geração e validação funcionam <strong>inteiramente no seu navegador</strong>. Os
      valores que você digita ou gera <strong>não são enviados</strong> aos nossos servidores nem armazenados por
      nós. O processamento é local e efêmero.
    </p>

    <h2>2. Dados que coletamos</h2>
    <ul>
      <li><strong>Preferências:</strong> tema (claro/escuro) e consentimento de cookies, salvos localmente no seu dispositivo (localStorage).</li>
      <li><strong>Dados analíticos (opcional):</strong> métricas anônimas de uso via Google Analytics 4, somente se você consentir.</li>
      <li><strong>Diagnóstico de erros (opcional):</strong> relatórios de erro anônimos para melhorar a estabilidade.</li>
    </ul>

    <h2>3. Base legal (LGPD/GDPR)</h2>
    <p>
      Tratamos dados analíticos com base no seu <strong>consentimento</strong> (art. 7º, I da LGPD; art. 6(1)(a)
      do GDPR), que pode ser retirado a qualquer momento na
      <a href="/dados_brasil_generator_pro/cookies">Política de Cookies</a>.
    </p>

    <h2>4. Seus direitos</h2>
    <p>Você pode, a qualquer momento:</p>
    <ul>
      <li>Acessar, corrigir ou excluir seus dados (LGPD art. 18; GDPR arts. 15-17).</li>
      <li>Retirar o consentimento e desativar cookies analíticos.</li>
      <li>Optar por não vender/compartilhar dados (CCPA — "Do Not Sell or Share").</li>
      <li>Solicitar informações sobre o tratamento (POPIA).</li>
    </ul>

    <h2>5. Cookies</h2>
    <p>
      Utilizamos cookies necessários (funcionamento) e, mediante consentimento, cookies analíticos. Detalhes na
      <a href="/dados_brasil_generator_pro/cookies">Política de Cookies</a>.
    </p>

    <h2>6. Contato do controlador</h2>
    <p>
      Dúvidas sobre privacidade? Fale com a {{ siteConfig.developer.company }} pelo e-mail
      <a :href="`mailto:${siteConfig.developer.email}`">{{ siteConfig.developer.email }}</a> ou WhatsApp
      {{ siteConfig.developer.whatsapp }}.
    </p>
  </LegalLayout>
</template>
