<script setup lang="ts">
// HomePage.vue - Landing page de vendas (hotsite) EventCalc
// Consolida as seções: Início, Calculadora, Sobre e Contato numa única página.
import CalculatorTool from '@/components/CalculatorTool.vue'

const benefits = [
  'Elimine planilhas complexas e cálculos manuais propensos a erros',
  'Apresente orçamentos profissionais para a diretoria em minutos',
  'Inclua automaticamente reserva de emergência de 11% no orçamento',
  'Divida valores entre pagantes com parcelamento automático',
  'Acesse de qualquer dispositivo, a qualquer hora, sem instalar nada',
  '100% gratuito, sem necessidade de cadastro ou login',
]

const testimonials = [
  { name: 'Marcos Silva', role: 'Gerente de RH — São Paulo', text: 'Usamos o EventCalc para planejar nosso retiro anual de 50 colaboradores. Em 2 minutos tínhamos o orçamento completo com divisão por participante. Sensacional!' },
  { name: 'Ana Oliveira', role: 'Coord. de Eventos — Curitiba', text: 'A funcionalidade de reserva de emergência me salvou! No nosso último evento tivemos gastos inesperados e a reserva de 11% cobriu tudo perfeitamente.' },
  { name: 'Ricardo Santos', role: 'Diretor Financeiro — Belo Horizonte', text: 'Simples, rápido e eficiente. Antes eu passava horas em planilhas para calcular custos de viagens da equipe. Agora faço em segundos com o EventCalc.' },
]

const services = [
  'Sites e Landing Pages',
  'Sistemas Web',
  'E-commerce',
  'Apps Mobile',
  'Integrações API',
  'Consultoria TI',
]
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section class="relative overflow-hidden section-padding">
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl"></div>
      </div>

      <div class="container-max text-center">
        <div class="animate-fade-in-up max-w-4xl mx-auto">
          <span class="badge-primary mb-6 inline-flex">
            <i class="fa-solid fa-calculator mr-2"></i>
            Calculadora Profissional de Eventos
          </span>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Calcule custos de eventos com
            <span class="text-gradient">precisão absoluta</span>
          </h1>

          <p class="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Planeje retiros corporativos, viagens de equipe e eventos empresariais
            com estimativas detalhadas de custos, divisão inteligente entre participantes
            e controle total do orçamento.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="#calculadora"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-hero text-primary-foreground btn-glow shadow-glow transition-all duration-300 hover:scale-105"
            >
              <i class="fa-solid fa-calculator"></i>
              Calcular Agora — Grátis
            </a>

            <a
              href="#sobre"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border border-border/50 bg-card text-foreground hover:bg-muted/50 transition-all duration-300"
            >
              <i class="fa-solid fa-circle-info"></i>
              Saiba Mais
            </a>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span class="inline-flex items-center gap-2"><i class="fa-solid fa-shield-halved text-secondary"></i> 100% Gratuito</span>
            <span class="inline-flex items-center gap-2"><i class="fa-solid fa-lock text-secondary"></i> Sem Cadastro</span>
            <span class="inline-flex items-center gap-2"><i class="fa-solid fa-bolt text-secondary"></i> Resultado Instantâneo</span>
            <span class="inline-flex items-center gap-2"><i class="fa-solid fa-mobile-screen text-secondary"></i> Mobile Friendly</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ STATS ============ -->
    <section class="py-12 bg-muted/30">
      <div class="container-max">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center animate-fade-in-up">
            <div class="text-3xl md:text-4xl font-bold text-gradient mb-1">10.000+</div>
            <div class="text-sm text-muted-foreground">Eventos Calculados</div>
          </div>
          <div class="text-center animate-fade-in-up animation-delay-200">
            <div class="text-3xl md:text-4xl font-bold text-gradient mb-1">98%</div>
            <div class="text-sm text-muted-foreground">Satisfação</div>
          </div>
          <div class="text-center animate-fade-in-up animation-delay-400">
            <div class="text-3xl md:text-4xl font-bold text-gradient mb-1">&lt; 1s</div>
            <div class="text-sm text-muted-foreground">Cálculo</div>
          </div>
          <div class="text-center animate-fade-in-up animation-delay-600">
            <div class="text-3xl md:text-4xl font-bold text-gradient mb-1">24/7</div>
            <div class="text-sm text-muted-foreground">Disponível</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ FEATURES ============ -->
    <section class="section-padding">
      <div class="container-max">
        <div class="text-center mb-12">
          <span class="badge-success mb-4 inline-flex"><i class="fa-solid fa-star mr-2"></i> Funcionalidades</span>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Tudo que você precisa para <span class="text-gradient">planejar seu evento</span>
          </h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            Ferramentas pensadas para facilitar o planejamento financeiro de eventos corporativos de qualquer porte.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="feature-card text-center">
            <div class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <i class="fa-solid fa-bullseye text-2xl text-primary"></i>
            </div>
            <h3 class="font-semibold text-lg mb-2">Cálculo Preciso</h3>
            <p class="text-sm text-muted-foreground">Algoritmo otimizado que considera todas as variáveis do seu evento para resultados exatos.</p>
          </div>
          <div class="feature-card text-center">
            <div class="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <i class="fa-solid fa-users-gear text-2xl text-secondary"></i>
            </div>
            <h3 class="font-semibold text-lg mb-2">Divisão Inteligente</h3>
            <p class="text-sm text-muted-foreground">Divida custos entre participantes pagantes com parcelamento flexível e justo.</p>
          </div>
          <div class="feature-card text-center">
            <div class="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <i class="fa-solid fa-bolt text-2xl text-accent"></i>
            </div>
            <h3 class="font-semibold text-lg mb-2">Resultados Instantâneos</h3>
            <p class="text-sm text-muted-foreground">Obtenha estimativas completas em menos de 1 segundo, sem espera ou processamento.</p>
          </div>
          <div class="feature-card text-center">
            <div class="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <i class="fa-solid fa-piggy-bank text-2xl text-destructive"></i>
            </div>
            <h3 class="font-semibold text-lg mb-2">Reserva de Emergência</h3>
            <p class="text-sm text-muted-foreground">Cálculo automático de 11% de reserva para imprevistos, garantindo segurança financeira.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ CALCULADORA (Ferramenta) ============ -->
    <section id="calculadora" class="section-padding bg-muted/30 scroll-mt-24">
      <div class="container-max">
        <div class="text-center mb-10">
          <span class="badge-primary mb-4 inline-flex"><i class="fa-solid fa-calculator mr-2"></i> Ferramenta</span>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Calculadora de <span class="text-gradient">Custos para Eventos</span>
          </h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            Insira os dados do seu evento para obter uma estimativa precisa de todos os custos com divisão inteligente entre participantes.
          </p>
        </div>

        <CalculatorTool />
      </div>
    </section>

    <!-- ============ BENEFITS ============ -->
    <section class="section-padding">
      <div class="container-max">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="badge-accent mb-4 inline-flex"><i class="fa-solid fa-check-double mr-2"></i> Benefícios</span>
            <h2 class="text-3xl md:text-4xl font-bold mb-6">Por que usar o <span class="text-gradient">EventCalc?</span></h2>
            <p class="text-muted-foreground mb-8">
              Nossa calculadora foi desenvolvida especificamente para organizadores de eventos corporativos
              que precisam de agilidade e confiança nos números.
            </p>
            <ul class="space-y-4">
              <li v-for="benefit in benefits" :key="benefit" class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i class="fa-solid fa-check text-xs text-secondary"></i>
                </div>
                <span>{{ benefit }}</span>
              </li>
            </ul>
          </div>

          <div class="relative">
            <div class="bg-card rounded-2xl p-8 shadow-card border border-border/50">
              <div class="space-y-4">
                <div class="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span class="text-sm font-medium">Estadia (5 dias)</span>
                  <span class="font-semibold text-primary">R$ 7.500,00</span>
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span class="text-sm font-medium">Alimentação (40 pessoas)</span>
                  <span class="font-semibold text-primary">R$ 17.132,00</span>
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span class="text-sm font-medium">Outras Despesas</span>
                  <span class="font-semibold text-primary">R$ 3.000,00</span>
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg bg-accent/10">
                  <span class="text-sm font-medium">Reserva (11%)</span>
                  <span class="font-semibold text-accent">R$ 3.039,52</span>
                </div>
                <div class="border-t border-border/50 pt-4 flex items-center justify-between">
                  <span class="font-semibold">Total Geral</span>
                  <span class="text-xl font-bold text-gradient">R$ 30.671,52</span>
                </div>
              </div>
            </div>
            <div class="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
            <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ SOBRE ============ -->
    <section id="sobre" class="section-padding bg-muted/30 scroll-mt-24">
      <div class="container-max">
        <div class="text-center mb-12">
          <span class="badge-primary mb-4 inline-flex"><i class="fa-solid fa-building mr-2"></i> Sobre</span>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Conhecendo o <span class="text-gradient">EventCalc</span></h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            Uma ferramenta profissional e gratuita para cálculo de custos de eventos corporativos,
            desenvolvida pelo Grupo 3W Online com foco em precisão, simplicidade e eficiência.
          </p>
        </div>

        <!-- Missão -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span class="badge-success mb-4 inline-flex"><i class="fa-solid fa-crosshairs mr-2"></i> Nossa Missão</span>
            <h3 class="text-2xl md:text-3xl font-bold mb-4">
              Simplificar o planejamento financeiro de <span class="text-gradient">eventos corporativos</span>
            </h3>
            <p class="text-muted-foreground mb-4">
              Sabemos que organizar eventos envolve inúmeras variáveis e que o controle financeiro
              pode ser uma dor de cabeça. Por isso, criamos o EventCalc: uma ferramenta intuitiva
              que elimina a complexidade dos cálculos e entrega resultados precisos em segundos.
            </p>
            <p class="text-muted-foreground">
              Nossa missão é fornecer aos organizadores de eventos corporativos uma solução
              confiável, acessível e profissional para estimar custos com segurança.
            </p>
          </div>
          <div class="bg-card rounded-2xl p-8 shadow-card border border-border/50">
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-eye text-primary"></i></div>
                <div><h4 class="font-semibold mb-1">Visão</h4><p class="text-sm text-muted-foreground">Ser a referência em ferramentas de planejamento financeiro para eventos no Brasil.</p></div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-heart text-secondary"></i></div>
                <div><h4 class="font-semibold mb-1">Propósito</h4><p class="text-sm text-muted-foreground">Democratizar o acesso a ferramentas profissionais de planejamento de eventos.</p></div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-handshake text-accent"></i></div>
                <div><h4 class="font-semibold mb-1">Compromisso</h4><p class="text-sm text-muted-foreground">Manter a ferramenta 100% gratuita, sem anúncios invasivos e sem necessidade de cadastro.</p></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Como Funciona -->
        <div class="text-center mb-10">
          <span class="badge-accent mb-4 inline-flex"><i class="fa-solid fa-route mr-2"></i> Como Funciona</span>
          <h3 class="text-2xl md:text-3xl font-bold mb-4">Simples como <span class="text-gradient">1, 2, 3</span></h3>
          <p class="text-muted-foreground max-w-2xl mx-auto">Em três passos rápidos, você obtém um orçamento completo e detalhado para seu evento.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div class="text-center relative">
            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border-2 border-primary/20"><span class="text-2xl font-bold text-primary">1</span></div>
            <h4 class="font-semibold text-lg mb-2">Informe os Dados</h4>
            <p class="text-sm text-muted-foreground">Preencha o valor da diária, número de participantes, duração do evento e despesas extras.</p>
          </div>
          <div class="text-center relative">
            <div class="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4 border-2 border-secondary/20"><span class="text-2xl font-bold text-secondary">2</span></div>
            <h4 class="font-semibold text-lg mb-2">Configure o Pagamento</h4>
            <p class="text-sm text-muted-foreground">Defina quantos participantes pagantes e em quantas parcelas dividir o valor total.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20"><span class="text-2xl font-bold text-accent">3</span></div>
            <h4 class="font-semibold text-lg mb-2">Obtenha Resultados</h4>
            <p class="text-sm text-muted-foreground">Receba instantaneamente o detalhamento completo: estadia, alimentação, reserva e valor por parcela.</p>
          </div>
        </div>

        <!-- Valores -->
        <div class="text-center mb-10">
          <span class="badge-primary mb-4 inline-flex"><i class="fa-solid fa-gem mr-2"></i> Nossos Valores</span>
          <h3 class="text-2xl md:text-3xl font-bold mb-4">O que nos <span class="text-gradient">guia</span></h3>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="feature-card text-center">
            <div class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><i class="fa-solid fa-bullseye text-2xl text-primary"></i></div>
            <h4 class="font-semibold text-lg mb-2">Precisão</h4>
            <p class="text-sm text-muted-foreground">Algoritmos validados para garantir resultados exatos e confiáveis em cada cálculo.</p>
          </div>
          <div class="feature-card text-center">
            <div class="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4"><i class="fa-solid fa-wand-magic-sparkles text-2xl text-secondary"></i></div>
            <h4 class="font-semibold text-lg mb-2">Simplicidade</h4>
            <p class="text-sm text-muted-foreground">Interface intuitiva que qualquer pessoa consegue usar sem treinamento prévio.</p>
          </div>
          <div class="feature-card text-center">
            <div class="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4"><i class="fa-solid fa-rocket text-2xl text-accent"></i></div>
            <h4 class="font-semibold text-lg mb-2">Inovação</h4>
            <p class="text-sm text-muted-foreground">Tecnologias modernas e boas práticas de desenvolvimento para a melhor experiência.</p>
          </div>
          <div class="feature-card text-center">
            <div class="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-4"><i class="fa-solid fa-award text-2xl text-destructive"></i></div>
            <h4 class="font-semibold text-lg mb-2">Qualidade</h4>
            <p class="text-sm text-muted-foreground">Código limpo, design profissional e atenção a cada detalhe da experiência do usuário.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ DICAS ============ -->
    <section class="section-padding">
      <div class="container-max">
        <div class="text-center mb-12">
          <span class="badge-primary mb-4 inline-flex"><i class="fa-solid fa-lightbulb mr-2"></i> Dicas</span>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Dicas para <span class="text-gradient">planejar seu evento</span></h2>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="feature-card">
            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4"><i class="fa-solid fa-calendar-check text-primary"></i></div>
            <h3 class="font-semibold mb-2">Planeje com Antecedência</h3>
            <p class="text-sm text-muted-foreground">Comece o planejamento financeiro com pelo menos 3 meses de antecedência. Isso permite negociar melhores preços com fornecedores e ter tempo para ajustes no orçamento.</p>
          </div>
          <div class="feature-card">
            <div class="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-4"><i class="fa-solid fa-hand-holding-dollar text-secondary"></i></div>
            <h3 class="font-semibold mb-2">Reserve para Imprevistos</h3>
            <p class="text-sm text-muted-foreground">Sempre inclua uma margem de segurança no orçamento. O EventCalc calcula automaticamente 11% de reserva, mas você pode considerar até 15% para eventos de grande porte.</p>
          </div>
          <div class="feature-card">
            <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4"><i class="fa-solid fa-people-group text-accent"></i></div>
            <h3 class="font-semibold mb-2">Defina os Pagantes</h3>
            <p class="text-sm text-muted-foreground">Identifique antecipadamente quantos participantes serão responsáveis pelo pagamento. Quanto mais pagantes, menor o valor individual de cada parcela.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ DEPOIMENTOS ============ -->
    <section class="section-padding bg-muted/30">
      <div class="container-max">
        <div class="text-center mb-12">
          <span class="badge-success mb-4 inline-flex"><i class="fa-solid fa-comments mr-2"></i> Depoimentos</span>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">O que dizem nossos <span class="text-gradient">usuários</span></h2>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="t in testimonials" :key="t.name" class="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <div class="flex items-center gap-1 mb-4" aria-label="5 estrelas">
              <i v-for="n in 5" :key="n" class="fa-solid fa-star text-accent text-sm"></i>
            </div>
            <p class="text-sm text-muted-foreground mb-4">"{{ t.text }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><i class="fa-solid fa-user text-primary text-sm"></i></div>
              <div>
                <div class="font-medium text-sm">{{ t.name }}</div>
                <div class="text-xs text-muted-foreground">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ CONTATO ============ -->
    <section id="contato" class="section-padding scroll-mt-24">
      <div class="container-max">
        <div class="text-center mb-12">
          <span class="badge-primary mb-4 inline-flex"><i class="fa-solid fa-envelope mr-2"></i> Contato</span>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Fale <span class="text-gradient">Conosco</span></h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            Tem dúvidas, sugestões ou precisa de um orçamento para um projeto personalizado?
            Entre em contato com o Grupo 3W Online. Estamos prontos para ajudar.
          </p>
        </div>

        <div class="max-w-3xl mx-auto mb-16">
          <div class="grid sm:grid-cols-2 gap-6 mb-8">
            <a
              href="https://wa.me/5541996924829?text=Ol%C3%A1%2C%20vim%20pelo%20EventCalc%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
              target="_blank"
              rel="noopener noreferrer"
              class="group bg-card rounded-xl p-6 shadow-card border border-border/50 card-hover text-center"
            >
              <div class="w-16 h-16 rounded-full bg-[#25d366]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <i class="fa-brands fa-whatsapp text-3xl text-[#25d366]"></i>
              </div>
              <h3 class="font-bold text-lg mb-1">WhatsApp</h3>
              <p class="text-primary font-medium mb-2">(41) 99692-4829</p>
              <p class="text-sm text-muted-foreground mb-4">Resposta rápida em horário comercial</p>
              <span class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25d366] text-white font-medium text-sm transition-all group-hover:opacity-90">
                <i class="fa-brands fa-whatsapp"></i> Iniciar Conversa
              </span>
            </a>

            <a
              href="mailto:contato@3wonline.com.br"
              class="group bg-card rounded-xl p-6 shadow-card border border-border/50 card-hover text-center"
            >
              <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <i class="fa-solid fa-envelope text-3xl text-primary"></i>
              </div>
              <h3 class="font-bold text-lg mb-1">E-mail</h3>
              <p class="text-primary font-medium mb-2">contato@3wonline.com.br</p>
              <p class="text-sm text-muted-foreground mb-4">Retorno em até 24 horas úteis</p>
              <span class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-hero text-white font-medium text-sm transition-all group-hover:opacity-90">
                <i class="fa-solid fa-paper-plane"></i> Enviar E-mail
              </span>
            </a>
          </div>

          <div class="grid sm:grid-cols-3 gap-4">
            <div class="bg-card rounded-xl p-5 border border-border/50 text-center">
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3"><i class="fa-solid fa-globe text-primary"></i></div>
              <h3 class="font-semibold text-sm mb-1">Website</h3>
              <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="text-xs text-primary hover:underline">www.3wonline.com.br</a>
            </div>
            <div class="bg-card rounded-xl p-5 border border-border/50 text-center">
              <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3"><i class="fa-solid fa-clock text-accent"></i></div>
              <h3 class="font-semibold text-sm mb-1">Horário</h3>
              <p class="text-xs text-muted-foreground">Seg a Sex, 9h às 18h</p>
            </div>
            <div class="bg-card rounded-xl p-5 border border-border/50 text-center">
              <div class="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-3"><i class="fa-solid fa-location-dot text-secondary"></i></div>
              <h3 class="font-semibold text-sm mb-1">Localização</h3>
              <p class="text-xs text-muted-foreground">Brasil — Atendimento Remoto</p>
            </div>
          </div>
        </div>

        <!-- Sobre a empresa desenvolvedora -->
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="badge-primary mb-4 inline-flex"><i class="fa-solid fa-laptop-code mr-2"></i> Sobre a Empresa</span>
            <h3 class="text-2xl md:text-3xl font-bold mb-4"><span class="text-gradient">Grupo 3W Online</span></h3>
            <p class="text-muted-foreground mb-4">
              O Grupo 3W Online é especialista em desenvolvimento de sites, sistemas web e
              soluções digitais personalizadas sob demanda. Criamos ferramentas que simplificam
              processos e impulsionam resultados para empresas de todos os portes.
            </p>
            <p class="text-muted-foreground mb-6">
              O EventCalc é apenas uma das nossas soluções gratuitas. Se você precisa de um sistema
              sob medida para sua empresa, entre em contato para um orçamento sem compromisso.
            </p>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="svc in services" :key="svc" class="flex items-center gap-2 text-sm">
                <i class="fa-solid fa-circle-check text-secondary"></i>
                <span>{{ svc }}</span>
              </div>
            </div>
          </div>

          <div class="bg-card rounded-2xl p-8 shadow-card border border-border/50 text-center">
            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"><i class="fa-solid fa-rocket text-2xl text-primary"></i></div>
            <h3 class="text-xl font-bold mb-3">Vamos conversar?</h3>
            <p class="text-sm text-muted-foreground mb-6">Conte-nos sobre seu projeto e receba uma proposta personalizada em até 48 horas úteis.</p>
            <div class="space-y-3">
              <a href="https://wa.me/5541996924829?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20para%20um%20projeto." target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-[#25d366] text-white transition-all duration-300 hover:opacity-90">
                <i class="fa-brands fa-whatsapp"></i> Chamar no WhatsApp
              </a>
              <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-border/50 text-foreground hover:bg-muted/50 transition-all duration-300">
                <i class="fa-solid fa-globe"></i> Visitar 3W Online
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ CTA FINAL ============ -->
    <section class="section-padding bg-muted/30">
      <div class="container-max">
        <div class="cta-section text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Precisa de um sistema personalizado para sua empresa?</h2>
          <p class="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-lg">
            O EventCalc foi desenvolvido pelo Grupo 3W Online, especialista em criação de sites,
            sistemas web e soluções digitais sob medida. Da ideia ao produto final — transformamos
            ideias em ferramentas poderosas que impulsionam negócios.
          </p>
          <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg bg-white text-primary hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
            <i class="fa-solid fa-arrow-right"></i> Solicitar Orçamento
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
