<script setup lang="ts">
import { Icon } from '@iconify/vue'
import InfoCard from '@/components/ui/InfoCard.vue'

const atualizado = new Date().toLocaleDateString('pt-BR')
</script>

<template>
  <div class="container max-w-4xl py-8">
    <header class="mb-8 text-center">
      <div class="mb-4 flex justify-center">
        <div class="rounded-full bg-primary/10 p-4">
          <Icon icon="lucide:shield" class="h-12 w-12 text-primary" />
        </div>
      </div>
      <h1 class="mb-2 text-4xl font-bold">Política de Privacidade</h1>
      <p class="text-muted-foreground">
        Em conformidade com LGPD (Lei nº 13.709/2018), GDPR, CCPA e POPIA.
      </p>
      <p class="mt-2 text-sm text-muted-foreground">Última atualização: {{ atualizado }}</p>
    </header>

    <div class="space-y-6">
      <InfoCard icon="lucide:database" title="1. Dados Coletados">
        <p class="leading-relaxed">
          A Calculadora de IMC coleta os seguintes dados fornecidos voluntariamente pelo usuário:
        </p>
        <ul class="mt-3 list-disc space-y-2 pl-6">
          <li><strong>Dados físicos:</strong> altura, peso, idade e sexo</li>
          <li><strong>Estilo de vida:</strong> nível de atividade física</li>
          <li><strong>Preferências:</strong> tema visual (claro/escuro) e consentimento de cookies</li>
        </ul>
        <p class="mt-3 leading-relaxed">
          <strong>Importante:</strong> todos os dados são processados exclusivamente no seu navegador
          (localStorage) e NÃO são enviados a servidores externos nem armazenados em bancos de dados
          remotos.
        </p>
      </InfoCard>

      <InfoCard icon="lucide:eye" title="2. Finalidade do Tratamento">
        <p class="leading-relaxed">Os dados são utilizados exclusivamente para:</p>
        <ul class="mt-3 list-disc space-y-2 pl-6">
          <li>Calcular e exibir seu IMC, metas calóricas e recomendações personalizadas</li>
          <li>Gerar relatórios em PDF para download</li>
          <li>Salvar suas preferências de tema visual</li>
          <li>Registrar seu consentimento quanto aos cookies e termos de uso</li>
        </ul>
      </InfoCard>

      <InfoCard icon="lucide:lock" title="3. Armazenamento e Segurança">
        <p class="leading-relaxed">
          <strong>Armazenamento local:</strong> todos os dados ficam no seu navegador via
          localStorage. Isso significa que:
        </p>
        <ul class="mt-3 list-disc space-y-2 pl-6">
          <li>Os dados não são transmitidos pela internet</li>
          <li>Os dados não são acessíveis por terceiros</li>
          <li>Os dados permanecem apenas no seu dispositivo</li>
          <li>Você tem controle total sobre seus dados</li>
        </ul>
      </InfoCard>

      <InfoCard icon="lucide:user-check" title="4. Seus Direitos (LGPD / GDPR / CCPA / POPIA)">
        <p class="leading-relaxed">Você tem os seguintes direitos:</p>
        <ul class="mt-3 list-disc space-y-2 pl-6">
          <li><strong>Acesso:</strong> visualizar todos os dados armazenados a qualquer momento</li>
          <li><strong>Retificação:</strong> modificar seus dados recalculando as metas</li>
          <li><strong>Exclusão:</strong> limpar todos os dados pelo navegador ou pelo botão "Limpar"</li>
          <li><strong>Portabilidade:</strong> exportar seus dados através do relatório PDF</li>
          <li><strong>Revogação do consentimento:</strong> limpar cookies e dados a qualquer momento</li>
        </ul>
      </InfoCard>

      <InfoCard icon="lucide:trash-2" title="5. Como Excluir Seus Dados">
        <p class="leading-relaxed">Para excluir completamente seus dados:</p>
        <ol class="mt-3 list-decimal space-y-2 pl-6">
          <li>Use o botão "Limpar" na calculadora para apagar os dados inseridos</li>
          <li>Limpe o localStorage do navegador (Configurações → Privacidade → Limpar dados)</li>
          <li>Exclua os cookies do site</li>
        </ol>
      </InfoCard>

      <InfoCard icon="lucide:file-check" title="6. Cookies Utilizados">
        <p class="leading-relaxed">Utilizamos apenas cookies essenciais para:</p>
        <ul class="mt-3 list-disc space-y-2 pl-6">
          <li><strong>Preferência de tema:</strong> salvar sua escolha entre claro e escuro</li>
          <li><strong>Consentimento:</strong> registrar sua aceitação dos termos e cookies</li>
        </ul>
        <p class="mt-3 leading-relaxed">
          Ferramentas de medição (Google Analytics/Tag Manager) são carregadas apenas para fins
          estatísticos e podem ser bloqueadas pelo navegador do usuário.
        </p>
      </InfoCard>

      <InfoCard variant="highlight">
        <h3 class="mb-2 text-center font-semibold text-foreground">Contato do Controlador de Dados</h3>
        <p class="text-center text-sm">
          Para exercer seus direitos ou tirar dúvidas sobre privacidade, entre em contato:
          <br />
          <a href="mailto:contato@3wonline.com.br" class="font-medium text-primary">
            contato@3wonline.com.br
          </a>
        </p>
      </InfoCard>
    </div>
  </div>
</template>
