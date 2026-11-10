<script setup lang="ts">
import { useConsentStore } from "@/stores/consent";
import { useSeo } from "@/composables/useSeo";
import BaseButton from "@/components/ui/BaseButton.vue";

const consent = useConsentStore();
const updatedAt = new Date().toLocaleDateString("pt-BR");

useSeo(() => ({
  title: "Política de Privacidade",
  description:
    "Política de Privacidade em conformidade com LGPD, GDPR, CCPA e POPIA — Calculadora de Programadores.",
  path: "/politica-de-privacidade",
  robots: "index, follow",
}));
</script>

<template>
  <article class="container-app max-w-4xl py-12">
    <h1 class="mb-2 text-3xl font-bold text-foreground">
      Política de Privacidade
    </h1>
    <p class="mb-8 text-sm text-muted-foreground">
      Última atualização: {{ updatedAt }}
    </p>

    <div class="prose prose-slate max-w-none dark:prose-invert">
      <p>
        A sua privacidade é importante para nós. É política do Grupo 3w Online respeitar a sua
        privacidade em relação a qualquer informação que possamos coletar no site Calculadora de
        Projetos. Esta política está alinhada às principais normas globais de proteção de dados:
        <strong>LGPD</strong> (Brasil), <strong>GDPR</strong> (União Europeia),
        <strong>CCPA</strong> (Califórnia/EUA) e <strong>POPIA</strong> (África do Sul).
      </p>

      <section>
        <h2>1. Coleta de Dados</h2>
        <p>
          Coletamos informações apenas quando realmente precisamos delas para lhe fornecer um serviço
          (como cookies para preferências de tema e de consentimento). Fazemo-lo por meios justos e
          legais, com o seu conhecimento e consentimento.
        </p>
      </section>

      <section>
        <h2>2. Uso de Dados</h2>
        <p>
          As informações de projetos inseridas na calculadora (nomes de clientes, valores, etc.) são
          processadas <strong>localmente no seu navegador</strong> e não são enviadas para nossos
          servidores, garantindo total confidencialidade dos seus dados comerciais.
        </p>
        <p>
          Com o seu consentimento, utilizamos ferramentas de análise (Google Analytics) para
          entender como os visitantes usam o site. Esses dados são anônimos e agregados.
        </p>
      </section>

      <section>
        <h2>3. Base Legal (LGPD / GDPR)</h2>
        <p>
          O tratamento de dados se dá com base no <strong>consentimento</strong> (art. 7º, I da LGPD;
          art. 6º(1)(a) do GDPR) e no <strong>legítimo interesse</strong> para segurança e melhoria
          do serviço. Você pode revogar o consentimento a qualquer momento.
        </p>
      </section>

      <section>
        <h2>4. Seus Direitos</h2>
        <ul>
          <li><strong>LGPD:</strong> acesso, correção, anonimização, portabilidade e eliminação dos dados.</li>
          <li><strong>GDPR:</strong> direito de acesso, retificação, apagamento ("esquecimento") e oposição.</li>
          <li><strong>CCPA:</strong> saber quais dados são coletados, solicitar exclusão e não venda de dados pessoais.</li>
          <li><strong>POPIA:</strong> acesso, correção e objeção ao tratamento de informações pessoais.</li>
        </ul>
        <p>
          Como esta ferramenta opera majoritariamente de forma local, não mantemos bases de dados de
          usuários. Ainda assim, você pode exercer seus direitos pelo e-mail
          <a href="mailto:contato@3wonline.com.br">contato@3wonline.com.br</a>.
        </p>
      </section>

      <section>
        <h2>5. Cookies e Consentimento</h2>
        <p>
          Utilizamos cookies essenciais (necessários) e, mediante consentimento, cookies de análise.
          Você pode rever a sua decisão a qualquer momento:
        </p>
        <BaseButton
          class="not-prose"
          variant="outline"
          @click="consent.reopen()"
        >
          Gerenciar preferências de cookies
        </BaseButton>
      </section>

      <section>
        <h2>6. Contato do Encarregado (DPO)</h2>
        <p>
          Para questões relacionadas à privacidade e proteção de dados, entre em contato pelo e-mail
          <a href="mailto:contato@3wonline.com.br">contato@3wonline.com.br</a> ou WhatsApp
          <a
            href="https://wa.me/5541996924829"
            target="_blank"
            rel="noopener noreferrer"
          >
            (41) 99692-4829</a>.
        </p>
      </section>
    </div>
  </article>
</template>
