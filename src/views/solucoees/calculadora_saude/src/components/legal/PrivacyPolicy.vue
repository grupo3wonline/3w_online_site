<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const lastUpdate = computed(() => new Date().toLocaleDateString('pt-BR'));
</script>

<template>
  <div class="prose prose-emerald max-w-none dark:prose-invert">
    <div class="mb-6">
      <Icon
        icon="fa6-solid:shield-halved"
        class="mb-4 text-4xl text-brand-600 dark:text-brand-400"
        aria-hidden="true"
      />
      <p class="text-sm text-gray-600 dark:text-gray-300">
        Última atualização: {{ lastUpdate }}
      </p>
    </div>

    <div class="mb-8 border-l-4 border-brand-500 bg-brand-50 p-4 dark:bg-brand-900/20">
      <p class="mb-2 font-semibold text-gray-800 dark:text-gray-200">
        <Icon
          icon="fa6-solid:user-shield"
          class="mr-2"
          aria-hidden="true"
        />
        Compromisso com sua Privacidade
      </p>
      <p class="text-gray-700 dark:text-gray-300">
        Sua privacidade é fundamental. Esta política explica como tratamos suas informações em
        conformidade com LGPD, GDPR, CCPA e POPIA.
      </p>
    </div>

    <section class="mb-8">
      <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        1. Dados Coletados
      </h3>
      <h4 class="mb-2 font-semibold text-gray-900 dark:text-white">
        1.1 Dados que NÃO coletamos:
      </h4>
      <ul class="mb-4 ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
        <li>Não coletamos ou armazenamos dados pessoais identificáveis</li>
        <li>Não compartilhamos dados com terceiros</li>
        <li>Não realizamos registro ou autenticação de usuários</li>
      </ul>
      <h4 class="mb-2 font-semibold text-gray-900 dark:text-white">
        1.2 Dados de Armazenamento Local:
      </h4>
      <p class="mb-3 text-gray-700 dark:text-gray-300">
        Utilizamos apenas o armazenamento local do navegador (localStorage) para salvar:
      </p>
      <ul class="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
        <li><strong>Preferência de tema:</strong> Modo claro ou escuro</li>
        <li><strong>Consentimento de cookies:</strong> Sua escolha no banner de cookies</li>
      </ul>
      <p class="mt-3 text-sm italic text-gray-700 dark:text-gray-300">
        Estes dados permanecem apenas no seu dispositivo e podem ser apagados a qualquer momento.
      </p>
    </section>

    <section class="mb-8">
      <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        2. Como Seus Dados São Processados
      </h3>
      <p class="mb-3 font-semibold text-gray-700 dark:text-gray-300">
        Processamento 100% Local:
      </p>
      <ul class="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
        <li>Todos os cálculos são realizados localmente no seu navegador</li>
        <li>Os dados inseridos (altura, peso, idade) não são enviados a servidores</li>
        <li>Nenhuma informação é transmitida pela internet</li>
        <li>Você mantém controle total sobre seus dados</li>
      </ul>
    </section>

    <section class="mb-8">
      <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        3. Seus Direitos (LGPD, GDPR, CCPA, POPIA)
      </h3>
      <ul class="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
        <li><strong>Confirmação e Acesso:</strong> Confirmar se há tratamento de dados</li>
        <li><strong>Correção:</strong> Corrigir dados (você os controla localmente)</li>
        <li><strong>Exclusão:</strong> Limpar o armazenamento local a qualquer momento</li>
        <li><strong>Portabilidade:</strong> Seus dados nunca saem do seu dispositivo</li>
        <li><strong>Não venda de dados (CCPA):</strong> Nunca vendemos dados pessoais</li>
        <li><strong>Revogação de Consentimento:</strong> Rejeite o uso de cookies quando quiser</li>
      </ul>
    </section>

    <section class="mb-8">
      <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        4. Segurança
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Como não coletamos nem transmitimos dados pessoais, o risco de vazamento é minimizado. A
        aplicação aplica cabeçalhos de segurança, sanitização de entradas e política de conteúdo
        (CSP) para proteção contra ataques comuns (XSS, clickjacking).
      </p>
    </section>

    <section class="mb-8">
      <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        5. Contato
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Para exercer seus direitos ou tirar dúvidas, fale conosco pelo WhatsApp
        <a
          href="https://wa.me/5541996924829"
          target="_blank"
          rel="noopener noreferrer"
          class="text-brand-600 hover:underline dark:text-brand-400"
        >(41) 99692-4829</a>
        ou e-mail
        <a
          href="mailto:contato@3wonline.com.br"
          class="text-brand-600 hover:underline dark:text-brand-400"
        >contato@3wonline.com.br</a>.
      </p>
    </section>

    <div class="mt-8 border-l-4 border-brand-500 bg-brand-50 p-4 dark:bg-brand-900/20">
      <p class="font-semibold text-gray-800 dark:text-gray-200">
        <Icon
          icon="fa6-solid:shield-halved"
          class="mr-2 text-brand-600"
          aria-hidden="true"
        />
        Resumo: Sua privacidade está protegida
      </p>
      <p class="mt-2 text-gray-700 dark:text-gray-300">
        Esta ferramenta não coleta, armazena ou transmite dados pessoais. Tudo funciona localmente
        no seu navegador.
      </p>
    </div>
  </div>
</template>
