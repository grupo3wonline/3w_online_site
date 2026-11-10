<script setup lang="ts">
import LegalLayout from '@/components/common/LegalLayout.vue'
import { COMPANY } from '@/config/site'
import { formatLongDate } from '@/lib/datetime'

const updated = formatLongDate(new Date(2026, 8, 24))
</script>

<template>
  <LegalLayout title="Termos de Uso" :updated="updated">
    <p>
      Bem-vindo ao <strong>Dev Toolkit Suite Essentials</strong>. Ao acessar e utilizar esta
      aplicação, você concorda com os termos descritos abaixo.
    </p>

    <h2>1. Uso da aplicação</h2>
    <p>
      As ferramentas são fornecidas gratuitamente para fins profissionais e educacionais. Você se
      compromete a utilizá-las de forma lícita e a não empregá-las para atividades que violem leis ou
      direitos de terceiros.
    </p>

    <h2>2. Processamento local</h2>
    <p>
      Todo o processamento ocorre no seu navegador. Você é responsável pelo conteúdo que insere nas
      ferramentas e por manter cópias de segurança de seus dados.
    </p>

    <h2>3. Isenção de garantias</h2>
    <p>
      As ferramentas são fornecidas "no estado em que se encontram". Embora nos esforcemos por
      precisão, não garantimos que os resultados estejam livres de erros. O
      <strong>gerador de MD5</strong>, por exemplo, não deve ser usado para fins de segurança
      criptográfica.
    </p>

    <h2>4. Limitação de responsabilidade</h2>
    <p>
      O {{ COMPANY.name }} não se responsabiliza por danos diretos ou indiretos decorrentes do uso ou
      da impossibilidade de uso desta aplicação.
    </p>

    <h2>5. Propriedade intelectual</h2>
    <p>
      A marca, o design e o código desta aplicação pertencem ao {{ COMPANY.name }}. É proibida a
      reprodução sem autorização.
    </p>

    <h2>6. Alterações</h2>
    <p>
      Estes termos podem ser atualizados periodicamente. O uso continuado após alterações implica
      concordância com a versão vigente.
    </p>

    <h2>7. Contato</h2>
    <p>
      Dúvidas sobre estes termos? Fale com o {{ COMPANY.name }} pelo e-mail
      <a :href="`mailto:${COMPANY.email}`">{{ COMPANY.email }}</a> ou WhatsApp
      <a :href="COMPANY.whatsappLink" target="_blank" rel="noopener noreferrer">{{ COMPANY.whatsapp }}</a>.
    </p>
  </LegalLayout>
</template>
