<script setup lang="ts">
import { useSeo } from "@/composables/useSeo";

const updatedAt = new Date().toLocaleDateString("pt-BR");

useSeo(() => ({
  title: "Termos de Uso",
  description: "Termos de Uso da Calculadora de Projetos para Programadores — Grupo 3w Online.",
  path: "/termos-de-uso",
  robots: "index, follow",
}));
</script>

<template>
  <article class="container-app max-w-4xl py-12">
    <h1 class="mb-2 text-3xl font-bold text-foreground">
      Termos de Uso
    </h1>
    <p class="mb-8 text-sm text-muted-foreground">
      Última atualização: {{ updatedAt }}
    </p>

    <div class="prose prose-slate max-w-none dark:prose-invert">
      <section>
        <h2>1. Aceitação dos Termos</h2>
        <p>
          Ao acessar e usar a Calculadora de Projetos ("Serviço"), fornecida pelo Grupo 3w Online,
          você concorda em cumprir estes Termos de Uso e todas as leis aplicáveis. Se você não
          concordar com algum destes termos, está proibido de usar ou acessar este site.
        </p>
      </section>

      <section>
        <h2>2. Uso da Licença</h2>
        <p>
          É concedida permissão para usar a ferramenta para fins pessoais ou comerciais de
          estimativa de projetos. No entanto, você não deve:
        </p>
        <ul>
          <li>Modificar ou copiar o código-fonte do software;</li>
          <li>Usar o serviço para qualquer finalidade ilegal ou não autorizada;</li>
          <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site.</li>
        </ul>
      </section>

      <section>
        <h2>3. Isenção de Responsabilidade</h2>
        <p>
          Os materiais e cálculos no site são fornecidos "como estão". O Grupo 3w Online não oferece
          garantias, expressas ou implícitas, e isenta todas as demais garantias, incluindo, sem
          limitação, garantias implícitas de comercialização, adequação a um fim específico ou não
          violação de propriedade intelectual.
        </p>
        <p>
          Não garantimos que os orçamentos gerados reflitam com exatidão os preços de mercado em
          todas as regiões ou situações, servindo apenas como uma estimativa de referência.
        </p>
      </section>

      <section>
        <h2>4. Limitações</h2>
        <p>
          Em nenhum caso o Grupo 3w Online ou seus fornecedores serão responsáveis por quaisquer
          danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção
          dos negócios) decorrentes do uso ou da incapacidade de usar os materiais.
        </p>
      </section>

      <section>
        <h2>5. Contato</h2>
        <p>
          Para dúvidas sobre estes termos, entre em contato através do nosso site oficial:
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.3wonline.com.br </a>, pelo e-mail
          <a href="mailto:contato@3wonline.com.br">contato@3wonline.com.br</a> ou WhatsApp
          <a
            href="https://wa.me/5541996924829"
            target="_blank"
            rel="noopener noreferrer"
          >
            (41) 99692-4829 </a>.
        </p>
      </section>
    </div>
  </article>
</template>
