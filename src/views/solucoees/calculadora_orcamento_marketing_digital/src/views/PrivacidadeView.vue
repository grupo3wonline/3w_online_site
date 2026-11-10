<script setup lang="ts">
import { site } from '@/config/site'
import { useSeo } from '@/composables/useSeo'
import { useConsentStore } from '@/stores/consent'

const consent = useConsentStore()

useSeo(() => ({
  title: 'Política de Privacidade',
  description:
    'Política de Privacidade em conformidade com LGPD, GDPR, CCPA e POPIA da Calculadora de Orçamento de Marketing Digital.',
  path: '/politica-de-privacidade',
}))

const laws = [
  { code: 'LGPD', region: 'Brasil', desc: 'Lei nº 13.709/2018' },
  { code: 'GDPR', region: 'União Europeia', desc: 'Regulamento (UE) 2016/679' },
  { code: 'CCPA', region: 'Califórnia (EUA)', desc: 'California Consumer Privacy Act' },
  { code: 'POPIA', region: 'África do Sul', desc: 'Protection of Personal Information Act' },
]
</script>

<template>
  <section class="cta-section !py-12">
    <div class="container relative mx-auto text-center">
      <span
        class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm"
      >
        <i class="fas fa-shield-alt" aria-hidden="true"></i>
        Documento Legal
      </span>
      <h1 class="mb-2 text-3xl font-bold text-white md:text-4xl">Política de Privacidade</h1>
      <p class="text-white/80">Última atualização: Janeiro de 2024</p>
    </div>
  </section>

  <section class="bg-background px-4 py-12">
    <div class="container mx-auto max-w-4xl">
      <div class="card-premium">
        <!-- Conformidade Global -->
        <div class="mb-8 rounded-xl border border-green-500/20 bg-green-500/10 p-5">
          <div class="mb-4 flex items-center gap-4">
            <div
              class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-500/20"
            >
              <i class="fas fa-shield-halved text-xl text-green-500" aria-hidden="true"></i>
            </div>
            <div>
              <h3 class="font-semibold text-foreground">
                Conformidade com Leis Globais de Privacidade
              </h3>
              <p class="text-sm text-muted-foreground">
                Esta política atende às principais legislações internacionais de proteção de dados.
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div
              v-for="law in laws"
              :key="law.code"
              class="rounded-lg bg-background/50 p-3 text-center"
            >
              <div class="font-bold text-foreground">{{ law.code }}</div>
              <div class="text-xs text-muted-foreground">{{ law.region }}</div>
              <div class="mt-1 text-[10px] text-muted-foreground/70">{{ law.desc }}</div>
            </div>
          </div>
        </div>

        <h2 class="mb-6 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-info-circle text-primary" aria-hidden="true"></i>
          1. Introdução
        </h2>
        <p class="mb-6 text-muted-foreground">
          O Grupo 3w Online está comprometido em proteger sua privacidade. Esta Política de
          Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações
          pessoais quando você utiliza a Calculadora de Orçamento de Marketing Digital, em
          conformidade com a LGPD (Brasil), GDPR (União Europeia), CCPA (Califórnia/EUA) e POPIA
          (África do Sul).
        </p>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-database text-primary" aria-hidden="true"></i>
          2. Dados Coletados
        </h2>
        <p class="mb-4 text-muted-foreground">
          A Calculadora de Orçamento de Marketing Digital coleta os seguintes tipos de dados:
        </p>
        <h3 class="mb-3 mt-6 text-lg font-semibold text-foreground">2.1. Dados de Uso</h3>
        <ul class="mb-4 list-inside list-disc space-y-2 text-muted-foreground">
          <li>
            Dados inseridos na calculadora (seguidores, taxas, duração) — processados localmente;
          </li>
          <li>Preferências de tema (claro/escuro) — armazenadas localmente no navegador;</li>
          <li>Consentimento de cookies — armazenado localmente no navegador.</li>
        </ul>
        <h3 class="mb-3 mt-6 text-lg font-semibold text-foreground">
          2.2. Dados de Navegação (via cookies)
        </h3>
        <ul class="mb-6 list-inside list-disc space-y-2 text-muted-foreground">
          <li>Endereço IP anônimo;</li>
          <li>Tipo de navegador e dispositivo;</li>
          <li>Páginas visitadas e tempo de permanência;</li>
          <li>Origem do tráfego (referência).</li>
        </ul>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-cogs text-primary" aria-hidden="true"></i>
          3. Como Utilizamos seus Dados
        </h2>
        <ul class="mb-6 list-inside list-disc space-y-2 text-muted-foreground">
          <li>Fornecer e melhorar nossos serviços;</li>
          <li>Analisar o uso da ferramenta para otimização;</li>
          <li>Personalizar sua experiência de navegação;</li>
          <li>Gerar estatísticas anônimas de uso;</li>
          <li>Cumprir obrigações legais quando aplicável.</li>
        </ul>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-cookie-bite text-primary" aria-hidden="true"></i>
          4. Cookies e Tecnologias Similares
        </h2>
        <h3 class="mb-3 mt-6 text-lg font-semibold text-foreground">4.1. Cookies Essenciais</h3>
        <p class="mb-4 text-muted-foreground">
          Necessários para o funcionamento básico do site (preferências de tema, consentimento).
        </p>
        <h3 class="mb-3 mt-6 text-lg font-semibold text-foreground">4.2. Cookies de Análise</h3>
        <p class="mb-4 text-muted-foreground">
          Google Analytics 4 (GA4) e Google Tag Manager (GTM) para análise de tráfego e
          comportamento, ativados somente após o seu consentimento.
        </p>
        <p class="mb-4 text-muted-foreground">
          Você pode gerenciar suas preferências de cookies a qualquer momento clicando no botão
          abaixo ou nas configurações do seu navegador.
        </p>
        <button type="button" class="btn-primary mb-6 text-sm" @click="consent.reset()">
          <i class="fas fa-sliders" aria-hidden="true"></i>
          Redefinir preferências de cookies
        </button>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-lock text-primary" aria-hidden="true"></i>
          5. Segurança dos Dados
        </h2>
        <ul class="mb-6 list-inside list-disc space-y-2 text-muted-foreground">
          <li>Processamento local dos dados da calculadora (não enviamos para servidores);</li>
          <li>Conexão segura via HTTPS;</li>
          <li>Minimização de dados coletados;</li>
          <li>Anonimização de dados de navegação quando possível.</li>
        </ul>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-user-shield text-primary" aria-hidden="true"></i>
          6. Seus Direitos
        </h2>
        <p class="mb-4 text-muted-foreground">
          De acordo com a LGPD, GDPR, CCPA e POPIA, você tem os seguintes direitos:
        </p>
        <ul class="mb-6 list-inside list-disc space-y-2 text-muted-foreground">
          <li><strong>Acesso:</strong> Solicitar quais dados pessoais temos sobre você;</li>
          <li>
            <strong>Correção:</strong> Solicitar a correção de dados incompletos ou incorretos;
          </li>
          <li><strong>Exclusão:</strong> Solicitar a exclusão de seus dados pessoais;</li>
          <li><strong>Portabilidade:</strong> Solicitar seus dados em formato estruturado;</li>
          <li><strong>Revogação:</strong> Revogar o consentimento para tratamento de dados;</li>
          <li>
            <strong>Oposição:</strong> Opor-se ao tratamento de dados em determinadas situações;
          </li>
          <li>
            <strong>Não discriminação (CCPA):</strong> Não sofrer discriminação por exercer seus
            direitos de privacidade;
          </li>
          <li>
            <strong>Informação:</strong> Ser informado sobre com quem seus dados são compartilhados.
          </li>
        </ul>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-share-alt text-primary" aria-hidden="true"></i>
          7. Compartilhamento de Dados
        </h2>
        <ul class="mb-6 list-inside list-disc space-y-2 text-muted-foreground">
          <li><strong>Google Analytics:</strong> Para análise de tráfego (dados anonimizados);</li>
          <li><strong>Google Tag Manager:</strong> Para gerenciamento de tags e rastreamento;</li>
          <li><strong>Autoridades competentes:</strong> Quando exigido por lei.</li>
        </ul>
        <p class="mb-6 text-muted-foreground">
          Não vendemos ou alugamos seus dados pessoais a terceiros para fins de marketing.
        </p>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-clock text-primary" aria-hidden="true"></i>
          8. Retenção de Dados
        </h2>
        <p class="mb-6 text-muted-foreground">
          Os dados são retidos apenas pelo tempo necessário para cumprir as finalidades para as
          quais foram coletados, ou conforme exigido por lei. Os dados de navegação são retidos por
          até 26 meses no Google Analytics.
        </p>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-child text-primary" aria-hidden="true"></i>
          9. Menores de Idade
        </h2>
        <p class="mb-6 text-muted-foreground">
          Nossa ferramenta não é direcionada a menores de 18 anos. Não coletamos intencionalmente
          dados de menores. Se você é responsável por um menor e acredita que coletamos seus dados,
          entre em contato para que possamos removê-los.
        </p>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-edit text-primary" aria-hidden="true"></i>
          10. Alterações nesta Política
        </h2>
        <p class="mb-6 text-muted-foreground">
          Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você a
          revise regularmente. A data da última atualização está indicada no topo desta página.
        </p>

        <h2 class="mb-6 mt-8 flex items-center gap-3 text-2xl font-bold text-foreground">
          <i class="fas fa-envelope text-primary" aria-hidden="true"></i>
          11. Contato e Encarregado (DPO)
        </h2>
        <p class="mb-4 text-muted-foreground">
          Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, entre
          em contato:
        </p>
        <div class="rounded-xl bg-secondary/30 p-6">
          <p class="mb-2 font-semibold text-foreground">{{ site.developer.company }}</p>
          <p class="mb-2 text-sm text-muted-foreground">
            Encarregado de Proteção de Dados (DPO/DPB): Disponível sob solicitação
          </p>
          <p class="mb-1 text-sm text-muted-foreground">
            WhatsApp:
            <a
              :href="site.contact.whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary hover:underline"
              >{{ site.contact.whatsapp }}</a
            >
          </p>
          <p class="mb-1 text-sm text-muted-foreground">
            E-mail:
            <a :href="site.contact.emailLink" class="text-primary hover:underline">{{
              site.contact.email
            }}</a>
          </p>
          <p class="text-sm text-muted-foreground">
            Website:
            <a
              :href="site.contact.websiteLink"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary hover:underline"
              >{{ site.contact.website }}</a
            >
          </p>
        </div>
      </div>

      <div class="mt-8 text-center">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <i class="fas fa-arrow-left" aria-hidden="true"></i>
          Voltar para a página inicial
        </RouterLink>
      </div>
    </div>
  </section>
</template>
