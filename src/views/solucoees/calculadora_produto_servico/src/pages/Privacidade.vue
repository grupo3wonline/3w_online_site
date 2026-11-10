<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
</script>

<template>
  <section class="py-16 md:py-20 px-4 bg-gradient-hero">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="section-title">
        <Icon
          icon="fa6-solid:shield-halved"
          class="text-accent-500 inline-block mr-2"
        />
        Política de <span class="text-gradient">Privacidade</span>
      </h1>
      <p class="text-sm txt-fraco">
        Última atualização: 23 de setembro de 2026
      </p>
    </div>
  </section>

  <section class="py-16 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="glass-card p-8 md:p-10 space-y-8 txt-suave leading-relaxed text-sm">
        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            1. Informações Gerais
          </h2>
          <p>
            Esta Política descreve como a <strong class="txt-forte">Calculadora de Preços</strong>, do
            <strong class="txt-forte">Grupo 3w Online</strong>, coleta, utiliza e protege dados. Estamos
            comprometidos com a conformidade às principais normas globais de privacidade:
            <strong class="txt-forte">LGPD</strong> (Brasil, Lei 13.709/2018),
            <strong class="txt-forte">GDPR</strong> (União Europeia),
            <strong class="txt-forte">CCPA</strong> (Califórnia, EUA) e
            <strong class="txt-forte">POPIA</strong> (África do Sul).
          </p>
        </div>

        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            2. Dados Coletados
          </h2>
          <ul class="list-disc list-inside space-y-1">
            <li><strong class="txt-forte">Navegação:</strong> o GA4 coleta dados de acesso e interação, mediante consentimento</li>
            <li><strong class="txt-forte">Cookies:</strong> técnicos (essenciais) e analíticos (opcionais)</li>
          </ul>
          <p class="mt-2">
            <strong class="text-accent-500">Os dados inseridos na calculadora são processados localmente no seu navegador e NÃO são
              enviados a servidores.</strong>
          </p>
        </div>

        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            3. Base Legal e Finalidade
          </h2>
          <ul class="list-disc list-inside space-y-1">
            <li>Consentimento do titular (banner de cookies)</li>
            <li>Análise de tráfego e melhoria da experiência (GA4)</li>
            <li>Resposta a contatos iniciados por você (WhatsApp/e-mail)</li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            4. Compartilhamento
          </h2>
          <p>Não vendemos nem compartilhamos dados pessoais com terceiros para marketing.</p>
        </div>

        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            5. Segurança
          </h2>
          <p>
            Preferências são armazenadas via localStorage no seu dispositivo. Não mantemos bancos de
            dados com informações pessoais desta ferramenta. A aplicação adota boas práticas de
            segurança, como comunicação via HTTPS e cabeçalhos de proteção.
          </p>
        </div>

        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            6. Seus Direitos (LGPD / GDPR / CCPA / POPIA)
          </h2>
          <ul class="list-disc list-inside space-y-1">
            <li><strong class="txt-forte">Acesso</strong> aos seus dados</li>
            <li><strong class="txt-forte">Retificação</strong> de dados incorretos</li>
            <li><strong class="txt-forte">Exclusão</strong> de dados pessoais</li>
            <li><strong class="txt-forte">Revogação</strong> do consentimento a qualquer momento</li>
            <li><strong class="txt-forte">Portabilidade</strong> dos dados</li>
            <li><strong class="txt-forte">Oposição / Opt-out</strong> ao tratamento e à venda de dados (CCPA)</li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            7. Cookies e Consentimento
          </h2>
          <p>
            Utilizamos cookies essenciais e analíticos. O banner de cookies permite aceitar ou recusar,
            e a preferência é aplicada via Google Consent Mode. Você pode limpar os cookies do navegador
            para redefinir sua escolha.
          </p>
        </div>

        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            8. Contato (Encarregado / DPO)
          </h2>
          <p>
            Para exercer seus direitos ou tirar dúvidas, acesse a
            <RouterLink
              to="/contato"
              class="text-primary-500 hover:underline"
            >
              página de contato
            </RouterLink>
            ou visite
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary-500 hover:underline"
            >www.3wonline.com.br</a>.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
