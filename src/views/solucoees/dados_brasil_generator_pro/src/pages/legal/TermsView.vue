<script setup lang="ts">
import LegalLayout from '@/components/common/LegalLayout.vue'
import { siteConfig } from '@/config/site'
</script>

<template>
  <LegalLayout title="Termos de Uso" updated="24/09/2026">
    <p>
      Ao acessar e utilizar o <strong>{{ siteConfig.name }}</strong>, você concorda com estes Termos de Uso.
      Leia com atenção.
    </p>

    <h2>1. Finalidade das ferramentas</h2>
    <p>
      Todos os dados gerados (CPF, CNPJ, cartões, etc.) são <strong>fictícios</strong> e apenas
      matematicamente válidos, destinados exclusivamente a <strong>testes de software, desenvolvimento e fins
      educacionais</strong>. Não pertencem a pessoas ou entidades reais.
    </p>

    <h2>2. Uso proibido</h2>
    <ul>
      <li>É <strong>estritamente proibido</strong> utilizar os dados para fraudes, falsidade ideológica ou qualquer atividade ilegal.</li>
      <li>Não use as ferramentas para prejudicar terceiros ou violar leis vigentes.</li>
    </ul>
    <p>O usuário é o único responsável pelo uso que faz das ferramentas.</p>

    <h2>3. Isenção de garantias</h2>
    <p>
      As ferramentas são fornecidas "no estado em que se encontram", sem garantias de qualquer tipo. Não nos
      responsabilizamos por eventuais danos decorrentes do uso.
    </p>

    <h2>4. Propriedade intelectual</h2>
    <p>
      O código, design e conteúdo são de propriedade da {{ siteConfig.developer.company }}. O uso das ferramentas
      não transfere quaisquer direitos de propriedade intelectual.
    </p>

    <h2>5. Alterações</h2>
    <p>Estes termos podem ser atualizados a qualquer momento. O uso contínuo implica aceitação das mudanças.</p>

    <h2>6. Contato</h2>
    <p>
      Dúvidas? Fale com a {{ siteConfig.developer.company }}:
      <a :href="`mailto:${siteConfig.developer.email}`">{{ siteConfig.developer.email }}</a>.
    </p>
  </LegalLayout>
</template>
