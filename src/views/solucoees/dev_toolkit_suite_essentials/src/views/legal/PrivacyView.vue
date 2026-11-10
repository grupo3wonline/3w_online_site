<script setup lang="ts">
import LegalLayout from '@/components/common/LegalLayout.vue'
import { COMPANY } from '@/config/site'
import { formatLongDate } from '@/lib/datetime'

const updated = formatLongDate(new Date(2026, 8, 24))
</script>

<template>
  <LegalLayout title="Política de Privacidade" :updated="updated">
    <p>
      Esta Política de Privacidade descreve como o <strong>Dev Toolkit Suite Essentials</strong>,
      uma iniciativa do {{ COMPANY.name }}, trata informações. Nosso princípio central é
      <strong>Local-First</strong>: as ferramentas processam seus dados inteiramente no seu
      navegador, e o conteúdo que você digita ou envia (textos, arquivos) nunca é transmitido aos
      nossos servidores.
    </p>

    <h2>1. Conformidade legal</h2>
    <p>
      Estamos comprometidos com as principais legislações globais de privacidade, incluindo a
      <strong>LGPD</strong> (Lei Geral de Proteção de Dados — Brasil), o <strong>GDPR</strong>
      (Regulamento Geral de Proteção de Dados — União Europeia), o <strong>CCPA</strong> (California
      Consumer Privacy Act — EUA) e a <strong>POPIA</strong> (Protection of Personal Information Act
      — África do Sul).
    </p>

    <h2>2. Dados que processamos</h2>
    <ul>
      <li>
        <strong>Conteúdo das ferramentas:</strong> processado localmente no navegador e não coletado
        por nós.
      </li>
      <li>
        <strong>Dados de navegação:</strong> com o seu consentimento, usamos Google Analytics 4 e
        Google Tag Manager para métricas agregadas e anônimas (com IP anonimizado).
      </li>
      <li><strong>Preferências:</strong> tema e consentimento de cookies ficam no seu dispositivo (localStorage).</li>
    </ul>

    <h2>3. Base legal e consentimento</h2>
    <p>
      Ferramentas de análise só são ativadas após o seu consentimento explícito no banner de
      cookies. Você pode recusar a qualquer momento — nesse caso, o rastreamento permanece desativado.
    </p>

    <h2>4. Seus direitos</h2>
    <p>
      Você tem direito de acesso, correção, exclusão, portabilidade e revogação do consentimento.
      Como não armazenamos dados pessoais em nossos servidores, a maior parte do controle está no seu
      próprio dispositivo. Para exercer direitos ou tirar dúvidas, contate
      <a :href="`mailto:${COMPANY.email}`">{{ COMPANY.email }}</a>.
    </p>

    <h2>5. Cookies</h2>
    <p>
      Utilizamos cookies estritamente necessários e, mediante consentimento, cookies de análise.
      Você pode gerenciar cookies nas configurações do seu navegador.
    </p>

    <h2>6. Segurança</h2>
    <p>
      Adotamos boas práticas de segurança, como processamento local, cabeçalhos HTTP de proteção e
      transmissão via HTTPS. Ainda assim, nenhum método é 100% infalível.
    </p>

    <h2>7. Contato</h2>
    <p>
      {{ COMPANY.name }} — {{ COMPANY.tagline }}.<br />
      E-mail: <a :href="`mailto:${COMPANY.email}`">{{ COMPANY.email }}</a><br />
      WhatsApp: <a :href="COMPANY.whatsappLink" target="_blank" rel="noopener noreferrer">{{ COMPANY.whatsapp }}</a><br />
      Site: <a :href="COMPANY.site" target="_blank" rel="noopener noreferrer">www.3wonline.com.br</a>
    </p>
  </LegalLayout>
</template>
