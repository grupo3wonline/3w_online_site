<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { APP_NAME, DEVELOPER_CREDITS } from '@/constants'
</script>

<template>
  <div class="mx-auto max-w-3xl space-y-8 px-4 pb-16 pt-4 sm:px-6 sm:pt-6">
    <div class="glass-card rounded-2xl p-6 sm:p-8">
      <div class="mb-6 flex items-center gap-3">
        <div class="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
          <Icon icon="mdi:shield-check-outline" class="h-6 w-6 text-emerald-400" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-white">Política de Privacidade</h1>
          <p class="text-xs text-slate-400">
            Lei Geral de Proteção de Dados (LGPD) — Lei nº 13.709/2018
          </p>
        </div>
      </div>

      <div class="space-y-6 text-sm leading-relaxed text-slate-300">
        <section>
          <h2 class="mb-2 flex items-center gap-2 text-base font-bold text-white">
            <Icon icon="mdi:database-off-outline" class="h-5 w-5 text-emerald-400" />
            1. Dados Coletados
          </h2>
          <p>
            O <strong class="text-white">{{ APP_NAME }}</strong>
            <strong class="text-emerald-400">
              não coleta, armazena, transmite ou processa nenhum dado pessoal
            </strong>
            dos seus usuários.
          </p>
          <p class="mt-2">
            Todos os arquivos carregados na ferramenta são processados
            <strong class="text-white">exclusivamente no navegador do usuário</strong>
            (lado do cliente), utilizando tecnologias JavaScript locais. Nenhuma informação
            é enviada a servidores externos.
          </p>
        </section>

        <hr class="border-slate-800" />

        <section>
          <h2 class="mb-2 flex items-center gap-2 text-base font-bold text-white">
            <Icon icon="mdi:monitor-cellphone" class="h-5 w-5 text-emerald-400" />
            2. Processamento Local
          </h2>
          <ul class="ml-4 list-disc space-y-1 text-slate-400">
            <li>Os arquivos Excel e CSV são lidos e processados inteiramente no navegador</li>
            <li>Nenhuma requisição HTTP é feita com dados do usuário</li>
            <li>Os dados existem apenas na memória temporária do navegador durante o uso</li>
            <li>Ao fechar ou recarregar a página, todos os dados são descartados</li>
          </ul>
        </section>

        <hr class="border-slate-800" />

        <section>
          <h2 class="mb-2 flex items-center gap-2 text-base font-bold text-white">
            <Icon icon="mdi:cookie-off-outline" class="h-5 w-5 text-emerald-400" />
            3. Cookies e Rastreamento
          </h2>
          <p>
            Esta aplicação
            <strong class="text-emerald-400">não utiliza cookies</strong>, não emprega
            ferramentas de analytics e não realiza qualquer tipo de rastreamento de navegação.
          </p>
        </section>

        <hr class="border-slate-800" />

        <section>
          <h2 class="mb-2 flex items-center gap-2 text-base font-bold text-white">
            <Icon icon="mdi:account-check-outline" class="h-5 w-5 text-emerald-400" />
            4. Direitos do Titular
          </h2>
          <p>
            Como nenhum dado pessoal é coletado, os direitos previstos na LGPD (acesso,
            correção, exclusão, portabilidade, etc.) não se aplicam diretamente. Contudo,
            reafirmamos nosso compromisso com a transparência e a privacidade.
          </p>
        </section>

        <hr class="border-slate-800" />

        <section>
          <h2 class="mb-2 flex items-center gap-2 text-base font-bold text-white">
            <Icon icon="mdi:security" class="h-5 w-5 text-emerald-400" />
            5. Segurança
          </h2>
          <ul class="ml-4 list-disc space-y-1 text-slate-400">
            <li>Validação de tipo e tamanho de arquivo antes do processamento</li>
            <li>Verificação de integridade (magic bytes) para arquivos binários</li>
            <li>Content Security Policy (CSP) para prevenir injeção de scripts</li>
            <li>Nenhum dado é persistido em disco ou banco de dados</li>
          </ul>
        </section>

        <hr class="border-slate-800" />

        <section>
          <h2 class="mb-2 flex items-center gap-2 text-base font-bold text-white">
            <Icon icon="mdi:email-outline" class="h-5 w-5 text-emerald-400" />
            6. Contato
          </h2>
          <p>
            Para dúvidas sobre esta política de privacidade, entre em contato com o
            desenvolvedor:
            <strong class="text-emerald-400">{{ DEVELOPER_CREDITS }}</strong
            >.
          </p>
        </section>
      </div>

      <div
        class="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center text-xs text-slate-400"
      >
        Última atualização: Julho de 2026
      </div>
    </div>
  </div>
</template>
