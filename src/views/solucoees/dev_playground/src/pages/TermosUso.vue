<script setup lang="ts">
import LegalShell from '@/components/legal/LegalShell.vue'
import { useHead } from '@/composables/useHead'
import { company } from '@/config/site'

useHead({
  title: 'Termos de Uso',
  description: 'Termos de Uso do DevPlayground — regras e condições de utilização da plataforma.',
  path: '/termos',
})
</script>

<template>
  <LegalShell title="Termos de Uso" icon="lucide:file-text" updated-at="Fevereiro de 2026">
    <p>
      Bem-vindo ao <strong>DevPlayground</strong>. Ao acessar e utilizar esta plataforma, você
      concorda com os termos e condições descritos abaixo. Leia com atenção.
    </p>

    <h2>1. Aceitação dos Termos</h2>
    <p>
      Ao utilizar o DevPlayground, você declara ter lido, compreendido e aceitado integralmente
      estes Termos de Uso. Caso não concorde, recomendamos que não utilize a plataforma.
    </p>

    <h2>2. Descrição do Serviço</h2>
    <p>
      O DevPlayground é um editor de código online gratuito que permite escrever, testar e
      visualizar código HTML, CSS, JavaScript e PHP diretamente no navegador, com preview em tempo
      real e console integrado.
    </p>

    <h2>3. Uso Aceitável</h2>
    <p>Você concorda em utilizar a plataforma apenas para fins legítimos. É proibido:</p>
    <ul>
      <li>Executar código malicioso, vírus ou scripts que comprometam a segurança;</li>
      <li>Tentar sobrecarregar, invadir ou explorar vulnerabilidades da infraestrutura;</li>
      <li>Utilizar a plataforma para atividades ilegais ou que violem direitos de terceiros;</li>
      <li>Reproduzir, distribuir ou comercializar a ferramenta sem autorização.</li>
    </ul>

    <h2>4. Propriedade Intelectual</h2>
    <p>
      O código que você escreve é de sua propriedade. A marca, a interface e o software do
      DevPlayground pertencem à <strong>{{ company.name }}</strong> e são protegidos por direitos
      autorais.
    </p>

    <h2>5. Isenção de Responsabilidade</h2>
    <p>
      A plataforma é fornecida "como está", sem garantias de disponibilidade ininterrupta. Não nos
      responsabilizamos por perdas de dados, código não salvo ou danos decorrentes do uso.
    </p>

    <h2>6. Execução de Código</h2>
    <p>
      A execução de código ocorre em ambiente isolado (sandbox). Ainda assim, você é o único
      responsável pelo código que executa e por seus efeitos.
    </p>

    <h2>7. Alterações nos Termos</h2>
    <p>
      Podemos atualizar estes termos periodicamente. Alterações relevantes serão comunicadas nesta
      página, com a data de atualização revisada.
    </p>

    <h2>8. Contato</h2>
    <p>
      Dúvidas sobre estes termos? Fale com a <strong>{{ company.name }}</strong> pelo e-mail
      <a :href="company.emailLink">{{ company.email }}</a> ou pelo WhatsApp
      <a :href="company.whatsapp.link" target="_blank" rel="noopener noreferrer">{{
        company.whatsapp.display
      }}</a
      >.
    </p>
  </LegalShell>
</template>
