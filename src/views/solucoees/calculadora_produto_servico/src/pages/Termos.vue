<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
</script>

<template>
  <section class="py-16 md:py-20 px-4 bg-gradient-hero">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="section-title">
        <Icon
          icon="fa6-solid:file-contract"
          class="text-primary-500 inline-block mr-2"
        />
        Termos de <span class="text-gradient">Uso</span>
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
            1. Aceitação dos Termos
          </h2>
          <p>
            Ao acessar e utilizar a
            <strong class="txt-forte">Calculadora de Preço para Produto e Serviço</strong>, você
            concorda com estes Termos de Uso. Se não concordar com algum termo, recomendamos que não
            utilize a ferramenta.
          </p>
        </div>

        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            2. Descrição do Serviço
          </h2>
          <p>
            A Calculadora de Preços é uma ferramenta gratuita de auxílio à precificação de produtos e
            serviços. Os cálculos são realizados com base nos dados fornecidos pelo usuário e servem
            como referência, não constituindo aconselhamento financeiro ou tributário.
          </p>
        </div>

        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            3. Uso Adequado
          </h2>
          <p>O usuário compromete-se a:</p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>Utilizar a ferramenta apenas para fins lícitos</li>
            <li>Não tentar comprometer a segurança ou integridade da aplicação</li>
            <li>Não utilizar engenharia reversa ou técnicas para extrair código-fonte</li>
            <li>Não disseminar conteúdo malicioso através da plataforma</li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            4. Isenção de Responsabilidade
          </h2>
          <p>
            Os resultados fornecidos pela calculadora são estimativas baseadas nos dados inseridos
            pelo usuário. O <strong class="txt-forte">Grupo 3w Online</strong> não se responsabiliza
            por decisões tomadas com base nos resultados da ferramenta. Recomendamos consultar um
            profissional de contabilidade ou finanças para decisões comerciais importantes.
          </p>
        </div>

        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            5. Propriedade Intelectual
          </h2>
          <p>
            Todo o conteúdo, design, código-fonte e funcionalidades desta aplicação são de propriedade
            do Grupo 3w Online e protegidos por leis de propriedade intelectual. É proibida a
            reprodução total ou parcial sem autorização prévia.
          </p>
        </div>

        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            6. Privacidade
          </h2>
          <p>
            Os dados inseridos na calculadora são processados localmente no navegador do usuário e não
            são armazenados em servidores. Para mais informações, consulte nossa
            <RouterLink
              to="/politica-de-privacidade"
              class="text-primary-500 hover:underline"
            >
              Política de Privacidade
            </RouterLink>.
          </p>
        </div>

        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            7. Modificações
          </h2>
          <p>
            Reservamo-nos o direito de modificar estes Termos a qualquer momento. Alterações
            significativas serão comunicadas através da plataforma. O uso continuado da ferramenta após
            alterações constitui aceitação dos novos termos.
          </p>
        </div>

        <div>
          <h2 class="text-lg font-bold txt-forte mb-3">
            8. Contato
          </h2>
          <p>
            Em caso de dúvidas sobre estes Termos, entre em contato através da nossa
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
