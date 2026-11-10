<script setup lang="ts">
// PoliticaDePrivacidadePage.vue - Política de Privacidade (LGPD)
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
        <li class="text-foreground font-medium">Política de Privacidade</li>
      </ol>
    </nav>

    <!-- Hero Section -->
    <section class="section-padding pb-12">
      <div class="container-max text-center">
        <div class="animate-fade-in-up max-w-3xl mx-auto">
          <span class="badge-primary mb-6 inline-flex">
            <i class="fa-solid fa-shield-halved mr-2"></i>
            Privacidade
          </span>

          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Política de
            <span class="text-gradient">Privacidade</span>
          </h1>

          <p class="text-muted-foreground">
            Última atualização: 15 de Janeiro de 2025
          </p>
        </div>
      </div>
    </section>

    <!-- LGPD Highlight -->
    <section class="pb-12">
      <div class="container-max">
        <div class="max-w-4xl mx-auto">
          <div class="grid sm:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-secondary/5 border border-secondary/20 flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <i class="fa-solid fa-scale-balanced text-secondary"></i>
              </div>
              <div>
                <h3 class="font-semibold text-sm mb-1">Conformidade LGPD</h3>
                <p class="text-xs text-muted-foreground">
                  Esta política atende aos requisitos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
                </p>
              </div>
            </div>
            <div class="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <i class="fa-solid fa-user-shield text-primary"></i>
              </div>
              <div>
                <h3 class="font-semibold text-sm mb-1">Seus Direitos</h3>
                <p class="text-xs text-muted-foreground">
                  Você tem direito de acessar, corrigir, excluir e portar seus dados pessoais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="pb-16">
      <div class="container-max">
        <div class="max-w-4xl mx-auto space-y-8">

          <!-- 1. Introdução -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</span>
              Introdução
            </h2>
            <p class="text-muted-foreground leading-relaxed">
              O Grupo 3W Online ("nós", "nosso") opera o EventCalc e está comprometido com a
              proteção da privacidade dos seus usuários. Esta Política de Privacidade descreve
              como coletamos, utilizamos, armazenamos e protegemos suas informações pessoais
              em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).
            </p>
          </div>

          <!-- 2. Dados Coletados -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">2</span>
              Dados Coletados
            </h2>
            <p class="text-muted-foreground leading-relaxed mb-4">
              O EventCalc coleta o mínimo de dados necessário para seu funcionamento:
            </p>

            <div class="space-y-4">
              <div class="p-4 rounded-lg bg-muted/30">
                <h3 class="font-medium text-sm mb-2 flex items-center gap-2">
                  <i class="fa-solid fa-cookie text-accent"></i>
                  Dados de Navegação (automáticos)
                </h3>
                <ul class="space-y-1 text-sm text-muted-foreground">
                  <li>• Endereço IP (anonimizado)</li>
                  <li>• Tipo de navegador e sistema operacional</li>
                  <li>• Páginas visitadas e tempo de permanência</li>
                  <li>• Dados de cookies (mediante consentimento)</li>
                </ul>
              </div>

              <div class="p-4 rounded-lg bg-muted/30">
                <h3 class="font-medium text-sm mb-2 flex items-center gap-2">
                  <i class="fa-solid fa-calculator text-primary"></i>
                  Dados da Calculadora
                </h3>
                <ul class="space-y-1 text-sm text-muted-foreground">
                  <li>• Os dados inseridos na calculadora <strong>não são armazenados</strong> em nossos servidores</li>
                  <li>• Todos os cálculos são processados localmente no seu navegador</li>
                  <li>• Nenhum dado financeiro é transmitido ou registrado</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 3. Como Utilizamos -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">3</span>
              Como Utilizamos seus Dados
            </h2>
            <p class="text-muted-foreground leading-relaxed mb-4">
              Os dados de navegação coletados são utilizados exclusivamente para:
            </p>
            <ul class="space-y-2 text-muted-foreground">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle-check text-secondary mt-0.5"></i>
                <span>Análise estatística de uso (Google Analytics)</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle-check text-secondary mt-0.5"></i>
                <span>Melhoria contínua da experiência do usuário</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle-check text-secondary mt-0.5"></i>
                <span>Identificação e correção de problemas técnicos</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle-check text-secondary mt-0.5"></i>
                <span>Garantia de segurança e prevenção de abusos</span>
              </li>
            </ul>
          </div>

          <!-- 4. Compartilhamento -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">4</span>
              Compartilhamento de Dados
            </h2>
            <p class="text-muted-foreground leading-relaxed mb-4">
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros,
              exceto nas seguintes situações:
            </p>
            <ul class="space-y-2 text-muted-foreground">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle text-[4px] text-primary mt-2.5"></i>
                <span>Prestadores de serviço essenciais (hospedagem, analytics) sob contratos de confidencialidade</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle text-[4px] text-primary mt-2.5"></i>
                <span>Cumprimento de obrigações legais ou ordens judiciais</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-circle text-[4px] text-primary mt-2.5"></i>
                <span>Proteção dos direitos e segurança do Grupo 3W Online e seus usuários</span>
              </li>
            </ul>
          </div>

          <!-- 5. Cookies -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-sm font-bold text-accent">5</span>
              Cookies
            </h2>
            <p class="text-muted-foreground leading-relaxed mb-4">
              Utilizamos cookies para melhorar sua experiência. Os tipos de cookies utilizados são:
            </p>
            <div class="space-y-3">
              <div class="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <span class="badge-success text-[10px]">Essenciais</span>
                <span class="text-sm text-muted-foreground">Necessários para o funcionamento básico (preferência de tema, consentimento de cookies)</span>
              </div>
              <div class="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <span class="badge-primary text-[10px]">Analíticos</span>
                <span class="text-sm text-muted-foreground">Google Analytics para entender como os usuários utilizam o Serviço (requer consentimento)</span>
              </div>
            </div>
            <p class="text-sm text-muted-foreground mt-4">
              Você pode gerenciar suas preferências de cookies a qualquer momento através do
              banner de consentimento ou das configurações do seu navegador.
            </p>
          </div>

          <!-- 6. Segurança -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">6</span>
              Segurança dos Dados
            </h2>
            <p class="text-muted-foreground leading-relaxed mb-4">
              Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados:
            </p>
            <ul class="space-y-2 text-muted-foreground">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-lock text-primary mt-0.5"></i>
                <span>Conexão criptografada via HTTPS/TLS</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-server text-primary mt-0.5"></i>
                <span>Hospedagem em servidores com certificação de segurança</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-shield-halved text-primary mt-0.5"></i>
                <span>Monitoramento contínuo contra ameaças</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-key text-primary mt-0.5"></i>
                <span>Controle de acesso restrito aos dados</span>
              </li>
            </ul>
          </div>

          <!-- 7. Direitos LGPD -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-sm font-bold text-secondary">7</span>
              Seus Direitos (LGPD)
            </h2>
            <p class="text-muted-foreground leading-relaxed mb-4">
              Conforme a LGPD, você possui os seguintes direitos sobre seus dados pessoais:
            </p>
            <div class="grid sm:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-muted/30 flex items-center gap-2">
                <i class="fa-solid fa-eye text-primary text-sm"></i>
                <span class="text-sm">Acesso aos dados</span>
              </div>
              <div class="p-3 rounded-lg bg-muted/30 flex items-center gap-2">
                <i class="fa-solid fa-pen text-primary text-sm"></i>
                <span class="text-sm">Correção de dados</span>
              </div>
              <div class="p-3 rounded-lg bg-muted/30 flex items-center gap-2">
                <i class="fa-solid fa-trash text-primary text-sm"></i>
                <span class="text-sm">Exclusão de dados</span>
              </div>
              <div class="p-3 rounded-lg bg-muted/30 flex items-center gap-2">
                <i class="fa-solid fa-file-export text-primary text-sm"></i>
                <span class="text-sm">Portabilidade</span>
              </div>
              <div class="p-3 rounded-lg bg-muted/30 flex items-center gap-2">
                <i class="fa-solid fa-ban text-primary text-sm"></i>
                <span class="text-sm">Revogação do consentimento</span>
              </div>
              <div class="p-3 rounded-lg bg-muted/30 flex items-center gap-2">
                <i class="fa-solid fa-circle-info text-primary text-sm"></i>
                <span class="text-sm">Informação sobre compartilhamento</span>
              </div>
            </div>
            <p class="text-sm text-muted-foreground mt-4">
              Para exercer seus direitos, entre em contato pelo e-mail:
              <a href="mailto:contato@3wonline.com.br" class="text-primary hover:underline">contato@3wonline.com.br</a>
            </p>
          </div>

          <!-- 8. Retenção -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">8</span>
              Retenção de Dados
            </h2>
            <p class="text-muted-foreground leading-relaxed">
              Mantemos dados de navegação apenas pelo período necessário para cumprir as
              finalidades descritas nesta política. Dados analíticos agregados (sem identificação
              pessoal) podem ser mantidos indefinidamente para fins estatísticos. Após o período
              de retenção, os dados são anonimizados ou excluídos de forma segura.
            </p>
          </div>

          <!-- 9. Transferência Internacional -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">9</span>
              Transferência Internacional
            </h2>
            <p class="text-muted-foreground leading-relaxed">
              Alguns dos nossos prestadores de serviço (como Google Analytics) podem processar
              dados em servidores localizados fora do Brasil. Nesses casos, garantimos que as
              transferências são realizadas em conformidade com a LGPD, mediante cláusulas
              contratuais padrão ou para países com nível adequado de proteção de dados.
            </p>
          </div>

          <!-- 10. Menores -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">10</span>
              Menores de Idade
            </h2>
            <p class="text-muted-foreground leading-relaxed">
              O EventCalc não se destina a menores de 18 anos. Não coletamos intencionalmente
              dados de crianças ou adolescentes. Se tomarmos conhecimento de que coletamos dados
              de um menor sem autorização dos pais ou responsáveis, tomaremos medidas para
              excluir essas informações.
            </p>
          </div>

          <!-- 11. Alterações -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">11</span>
              Alterações nesta Política
            </h2>
            <p class="text-muted-foreground leading-relaxed">
              Esta Política de Privacidade pode ser atualizada periodicamente. Alterações
              significativas serão comunicadas através de aviso no próprio Serviço.
              A data de "última atualização" no topo deste documento indica quando a última
              revisão foi realizada. Recomendamos revisitar esta página periodicamente.
            </p>
          </div>

          <!-- 12. Contato / DPO -->
          <div class="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-sm font-bold text-secondary">12</span>
              Contato e Encarregado (DPO)
            </h2>
            <p class="text-muted-foreground leading-relaxed mb-4">
              Para questões relacionadas à privacidade e proteção de dados, entre em contato
              com nosso Encarregado de Proteção de Dados (DPO):
            </p>
            <div class="p-4 rounded-lg bg-muted/30 space-y-2">
              <p class="text-sm font-medium">Grupo 3W Online — Encarregado de Dados</p>
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
            <p class="text-xs text-muted-foreground mt-4">
              Prazo de resposta: até 15 dias úteis, conforme previsto pela LGPD.
            </p>
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
              to="/termos-de-uso"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-border/50 text-foreground hover:bg-muted/50 transition-all duration-300"
            >
              <i class="fa-solid fa-file-contract"></i>
              Termos de Uso
            </router-link>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>
