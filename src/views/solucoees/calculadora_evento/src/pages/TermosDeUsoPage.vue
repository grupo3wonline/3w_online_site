<script setup lang="ts">
// TermosDeUsoPage.vue - Termos de Uso
</script>

<template>
  <div>
    <!-- Breadcrumb -->
    <nav class="container-max pt-6" aria-label="Breadcrumb">
      <ol class="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          <router-link to="/" class="hover:text-primary transition-colors">
            <i class="fa-solid fa-house mr-1"></i>
            Início
          </router-link>
        </li>
        <li><i class="fa-solid fa-chevron-right text-xs"></i></li>
        <li class="text-foreground font-medium">Termos de Uso</li>
      </ol>
    </nav>

    <!-- Hero Section -->
    <section class="section-padding pb-12">
      <div class="container-max text-center">
        <div class="animate-fade-in-up max-w-3xl mx-auto">
          <span class="badge-primary mb-6 inline-flex">
            <i class="fa-solid fa-file-contract mr-2"></i>
            Legal
          </span>

          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Termos de
            <span class="text-gradient">Uso</span>
          </h1>

          <p class="text-muted-foreground">
            Última atualização: 15 de Janeiro de 2025
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="pb-16">
      <div class="container-max">
        <div class="max-w-4xl mx-auto space-y-8">

          <!-- 1. Aceitação dos Termos -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</span>
              Aceitação dos Termos
            </h2>
            <p class="text-muted-foreground leading-relaxed">
              Ao acessar e utilizar o EventCalc ("Serviço"), você concorda com estes Termos de Uso.
              Se você não concordar com qualquer parte destes termos, não utilize o Serviço.
              O uso continuado do EventCalc após a publicação de alterações constitui aceitação
              dos termos modificados.
            </p>
          </div>

          <!-- 2. Descrição do Serviço -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">2</span>
              Descrição do Serviço
            </h2>
            <p class="text-muted-foreground leading-relaxed mb-4">
              O EventCalc é uma calculadora online gratuita destinada ao cálculo estimado de custos
              para eventos corporativos. O Serviço permite:
            </p>
            <ul class="space-y-2 text-muted-foreground">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle text-[4px] text-primary mt-2.5"></i>
                <span>Calcular custos estimados de hospedagem e alimentação</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle text-[4px] text-primary mt-2.5"></i>
                <span>Dividir despesas entre participantes pagantes</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle text-[4px] text-primary mt-2.5"></i>
                <span>Calcular parcelas de pagamento</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle text-[4px] text-primary mt-2.5"></i>
                <span>Estimar reserva de emergência (11% sobre o subtotal)</span>
              </li>
            </ul>
          </div>

          <!-- 3. Uso Permitido -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">3</span>
              Uso Permitido
            </h2>
            <p class="text-muted-foreground leading-relaxed mb-4">
              Você se compromete a utilizar o EventCalc apenas para fins legítimos e de acordo com
              estes Termos. É vedado:
            </p>
            <ul class="space-y-2 text-muted-foreground">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-xmark text-destructive mt-1"></i>
                <span>Utilizar o Serviço para qualquer finalidade ilícita ou fraudulenta</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-xmark text-destructive mt-1"></i>
                <span>Tentar acessar, adulterar ou comprometer os sistemas do Serviço</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-xmark text-destructive mt-1"></i>
                <span>Reproduzir, distribuir ou criar obras derivadas sem autorização</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-xmark text-destructive mt-1"></i>
                <span>Utilizar scripts automatizados para sobrecarregar o Serviço</span>
              </li>
            </ul>
          </div>

          <!-- 4. Propriedade Intelectual -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">4</span>
              Propriedade Intelectual
            </h2>
            <p class="text-muted-foreground leading-relaxed">
              Todo o conteúdo do EventCalc, incluindo mas não limitado a textos, gráficos, logotipos,
              ícones, código-fonte, design e layout, é de propriedade do Grupo 3W Online e está
              protegido pelas leis brasileiras de direitos autorais e propriedade intelectual.
              O uso do Serviço não transfere qualquer direito de propriedade intelectual ao usuário.
            </p>
          </div>

          <!-- 5. Precisão dos Cálculos -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-sm font-bold text-accent">5</span>
              Precisão dos Cálculos
            </h2>
            <div class="p-4 rounded-lg bg-accent/5 border border-accent/20 mb-4">
              <p class="text-sm text-muted-foreground flex items-start gap-2">
                <i class="fa-solid fa-triangle-exclamation text-accent mt-0.5"></i>
                <span>
                  Os resultados fornecidos pelo EventCalc são <strong>estimativas</strong> e não devem ser
                  considerados como orçamentos definitivos ou propostas comerciais.
                </span>
              </p>
            </div>
            <p class="text-muted-foreground leading-relaxed">
              O EventCalc utiliza valores de referência (como R$ 42,83 por pessoa/refeição) que podem
              não refletir os preços praticados em sua região ou período. Recomendamos sempre validar
              os valores com fornecedores reais antes de tomar decisões financeiras.
            </p>
          </div>

          <!-- 6. Limitação de Responsabilidade -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">6</span>
              Limitação de Responsabilidade
            </h2>
            <p class="text-muted-foreground leading-relaxed mb-4">
              O EventCalc é fornecido "como está" (as is), sem garantias de qualquer tipo,
              expressas ou implícitas. O Grupo 3W Online não se responsabiliza por:
            </p>
            <ul class="space-y-2 text-muted-foreground">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle text-[4px] text-primary mt-2.5"></i>
                <span>Decisões tomadas com base nos resultados da calculadora</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle text-[4px] text-primary mt-2.5"></i>
                <span>Prejuízos financeiros decorrentes do uso do Serviço</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle text-[4px] text-primary mt-2.5"></i>
                <span>Indisponibilidade temporária ou permanente do Serviço</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle text-[4px] text-primary mt-2.5"></i>
                <span>Diferenças entre os valores estimados e custos reais</span>
              </li>
            </ul>
          </div>

          <!-- 7. Privacidade -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">7</span>
              Privacidade
            </h2>
            <p class="text-muted-foreground leading-relaxed">
              O uso do EventCalc também está sujeito à nossa
              <router-link to="/politica-de-privacidade" class="text-primary hover:underline">
                Política de Privacidade
              </router-link>,
              que descreve como coletamos, usamos e protegemos suas informações.
              Ao utilizar o Serviço, você concorda com as práticas descritas na Política de Privacidade.
            </p>
          </div>

          <!-- 8. Modificações -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">8</span>
              Modificações dos Termos
            </h2>
            <p class="text-muted-foreground leading-relaxed">
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento.
              As alterações entram em vigor imediatamente após sua publicação nesta página.
              A data de "última atualização" no topo deste documento será modificada para
              refletir a data da revisão mais recente.
            </p>
          </div>

          <!-- 9. Links para Terceiros -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">9</span>
              Links para Terceiros
            </h2>
            <p class="text-muted-foreground leading-relaxed">
              O EventCalc pode conter links para sites de terceiros. Esses links são fornecidos
              apenas para conveniência e não implicam endosso ou responsabilidade pelo conteúdo
              de sites externos. Recomendamos que você leia os termos de uso e políticas de
              privacidade de qualquer site de terceiros que visite.
            </p>
          </div>

          <!-- 10. Lei Aplicável -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">10</span>
              Lei Aplicável
            </h2>
            <p class="text-muted-foreground leading-relaxed">
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil.
              Qualquer disputa decorrente do uso do EventCalc será submetida ao foro da
              comarca da sede do Grupo 3W Online, com renúncia a qualquer outro, por mais
              privilegiado que seja.
            </p>
          </div>

          <!-- 11. Contato -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-sm font-bold text-secondary">11</span>
              Contato
            </h2>
            <p class="text-muted-foreground leading-relaxed mb-4">
              Para dúvidas sobre estes Termos de Uso, entre em contato:
            </p>
            <div class="p-4 rounded-lg bg-muted/30 space-y-2">
              <p class="text-sm font-medium">Grupo 3W Online</p>
              <p class="text-sm text-muted-foreground flex items-center gap-2">
                <i class="fa-solid fa-globe text-primary"></i>
                <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">
                  www.3wonline.com.br
                </a>
              </p>
              <p class="text-sm text-muted-foreground flex items-center gap-2">
                <i class="fa-solid fa-envelope text-primary"></i>
                <a href="mailto:contato@3wonline.com.br" class="text-primary hover:underline">
                  contato@3wonline.com.br
                </a>
              </p>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <router-link
              to="/"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-hero text-primary-foreground btn-glow transition-all duration-300 hover:scale-105"
            >
              <i class="fa-solid fa-house"></i>
              Voltar ao Início
            </router-link>
            <router-link
              to="/politica-de-privacidade"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-border/50 text-foreground hover:bg-muted/50 transition-all duration-300"
            >
              <i class="fa-solid fa-shield-halved"></i>
              Política de Privacidade
            </router-link>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>
