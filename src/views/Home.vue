<template>
  <div class="home-page">

    <!-- ══════════════════════════════════════════════════════════════
         #inicio ─ Hero
    ══════════════════════════════════════════════════════════════════ -->
    <section id="inicio" class="hero-gradient text-white py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="container relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1.5 rounded-full text-xs text-blue-200 mb-6">
            <Icon icon="mdi:map-marker-radius" class="w-4 h-4 text-secondary-400" />
            <span>Agência em Curitiba • Atendimento em Todo o Brasil</span>
          </div>

          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
            Transforme Seu Negócio com
            <span class="text-gradient block sm:inline"> Soluções Digitais & IA</span>
          </h1>

          <p class="text-sm md:text-lg text-blue-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Especialistas em criação de sites, sistemas sob medida, anúncios de alta conversão (Google & Meta Ads) e automação inteligente com IA para acelerar seus resultados.
          </p>

          <div class="flex flex-col sm:flex-row gap-3.5 justify-center mb-8">
            <a href="#contato" class="btn-primary !bg-primary-500 hover:!bg-primary-600 text-sm shadow-lg shadow-primary-500/25">
              <Icon icon="mdi:file-document-edit-outline" class="w-4 h-4 mr-2" />
              Solicitar Orçamento Grátis
            </a>
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de saber mais sobre os serviços da 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary text-sm shadow-lg shadow-green-600/20"
            >
              <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" />
              Falar no WhatsApp
            </a>
            <RouterLink to="/ferramentas" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-sm">
              <Icon icon="mdi:tools" class="w-4 h-4 mr-2 text-secondary-300" />
              280+ Ferramentas Grátis
            </RouterLink>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-blue-300">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-green-400" /> LGPD 100% Conforme</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:clock-check" class="w-4 h-4 text-green-400" /> Resposta Rápida</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:lock-open" class="w-4 h-4 text-green-400" /> Sem Fidelidade Forçada</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:handshake" class="w-4 h-4 text-green-400" /> Contrato Transparente</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         Stats Bar
    ══════════════════════════════════════════════════════════════════ -->
    <section class="py-10 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700/50 shadow-sm">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-2xl md:text-4xl font-extrabold text-primary-600 tracking-tight">{{ stat.value }}</div>
            <div class="text-xs sm:text-sm text-gray-500 font-medium mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         #servicos ─ Serviços em Destaque
    ══════════════════════════════════════════════════════════════════ -->
    <section id="servicos" class="section-padding bg-slate-50/50 dark:bg-slate-800/50">
      <div class="container">
        <div class="text-center mb-10 md:mb-14">
          <span class="section-label">O que fazemos</span>
          <h2 class="section-title">Soluções Estratégicas para Cada Desafio</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Do marketing digital e tráfego pago ao desenvolvimento de plataformas e automações com IA — entregamos resultados mensuráveis.
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="service in services" :key="service.id" class="service-card group">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" :class="service.iconBg">
              <Icon :icon="service.icon" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-base font-bold text-gray-900 mb-1.5 group-hover:text-primary-600 transition-colors">{{ service.title }}</h3>
            <p class="text-xs text-gray-500 mb-4 leading-relaxed">{{ service.description }}</p>
            <RouterLink :to="service.link" class="inline-flex items-center text-xs font-semibold text-primary-600 hover:text-primary-700 gap-1 mt-auto">
              Conhecer detalhes <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </RouterLink>
          </div>
        </div>
        <div class="text-center mt-10">
          <RouterLink to="/servicos" class="btn-outline text-sm">Ver Todos os Nossos Serviços</RouterLink>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         #sobre ─ Nossa Trajetória & DNA
    ══════════════════════════════════════════════════════════════════ -->
    <section id="sobre" class="section-padding bg-white dark:bg-slate-900">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="section-label">Nossa Trajetória</span>
            <h2 class="section-title">Inovação, Engenharia e Foco em Resultados Reais</h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-4">
              Fundada em 2019 em Curitiba, a <strong>3W Online</strong> nasceu com o propósito de descomplicar o universo digital para empresas que buscam acelerar suas vendas e modernizar seus processos.
            </p>
            <p class="text-sm text-gray-600 leading-relaxed mb-4">
              No <strong>Grupo 3W Online</strong>, acreditamos que a inovação nasce da coragem de desafiar o convencional e explorar novas tecnologias com rigor técnico. Nossa missão é impulsionar a mudança sustentável e fornecer ferramentas digitais de alto impacto para empresas em todo o Brasil.
            </p>
            <p class="text-sm text-gray-600 leading-relaxed mb-6">
              Acreditamos que a verdadeira transformação digital combina código limpo, design intuitivo e estratégias de marketing orientadas por dados. Não entregamos apenas sites ou anúncios: construímos ecossistemas digitais sustentáveis que trabalham 24 horas por dia pelo seu faturamento.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div v-for="b in benefits" :key="b" class="flex items-start gap-2.5 bg-slate-50 p-3 rounded-lg border border-gray-100">
                <Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span class="text-xs text-gray-700 font-medium">{{ b }}</span>
              </div>
            </div>
            <RouterLink to="/servicos" class="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700">
              Conhecer nosso portfólio de soluções <Icon icon="mdi:arrow-right" class="w-4 h-4" />
            </RouterLink>
          </div>
          <div class="relative">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Equipe Grupo 3W Online"
                class="w-full h-auto object-cover"
                loading="lazy"
                width="800"
                height="533"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-6">
                <div class="text-white">
                  <p class="text-sm font-bold">Grupo 3W Online Soluções Digitais</p>
                  <p class="text-xs text-blue-200">Sede em Curitiba/PR • Atendimento Remoto Nacional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Escuros — Prova Social -->
    <section class="testimonial-section py-14">
      <div class="container">
        <div class="text-center mb-10">
          <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-1">Métricas de Autoridade</span>
          <h2 class="text-2xl md:text-3xl font-bold text-white">Números que Comprovam Nossa Entrega</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="stat in stats" :key="stat.label" class="bg-white/5 border border-white/10 rounded-xl p-5 text-center backdrop-blur-sm">
            <div class="text-3xl md:text-4xl font-black text-primary-400 mb-1 tracking-tight">{{ stat.value }}</div>
            <div class="text-xs text-blue-200 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         Missão, Visão & Valores
    ══════════════════════════════════════════════════════════════════ -->
    <section class="section-padding bg-slate-50 dark:bg-slate-800 border-y border-gray-200/60 dark:border-slate-700/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Diretrizes Estratégicas</span>
          <h2 class="section-title">Nossos Pilares Fundamentais</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Princípios inegociáveis que orientam nossa atuação profissional e relacionamento com parceiros.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="card p-6 sm:p-8 text-center bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all">
            <div class="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Icon icon="mdi:rocket-launch-outline" class="w-7 h-7" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Missão</h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Transformar ideias em resultados concretos, desenvolvendo soluções de tecnologia e marketing que impulsionam o faturamento e a eficiência operacional dos nossos clientes.
            </p>
          </div>
          <div class="card p-6 sm:p-8 text-center bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all">
            <div class="w-14 h-14 bg-secondary-50 text-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Icon icon="mdi:eye-outline" class="w-7 h-7" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Visão</h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Ser referência em soluções digitais e automação com inteligência artificial no Brasil, reconhecida pelo rigor técnico, transparência e democratização da tecnologia.
            </p>
          </div>
          <div class="card p-6 sm:p-8 text-center bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all">
            <div class="w-14 h-14 bg-orange-50 text-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Icon icon="mdi:handshake-outline" class="w-7 h-7" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Valores</h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Inovação contínua, compromisso com entregas no prazo, respeito à privacidade (LGPD), contratos sem letras miúdas e atendimento humanizado.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         Diferenciais Competitivos
    ══════════════════════════════════════════════════════════════════ -->
    <section class="section-padding bg-white dark:bg-slate-900">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Diferenciais</span>
          <h2 class="section-title">Por que Escolher a 3W Online?</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div v-for="d in differentials" :key="d.title" class="p-5 rounded-xl border border-gray-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-3" :class="d.iconBg">
              <Icon :icon="d.icon" class="w-5 h-5 text-white" />
            </div>
            <h4 class="text-sm font-bold text-gray-900 mb-1.5">{{ d.title }}</h4>
            <p class="text-xs text-gray-500 leading-relaxed">{{ d.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         Linha do Tempo
    ══════════════════════════════════════════════════════════════════ -->
    <section class="section-padding bg-slate-50 dark:bg-slate-800 border-t border-gray-200/60 dark:border-slate-700/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Histórico de Crescimento</span>
          <h2 class="section-title">Nossa Trajetória de Sucesso</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Os principais marcos que construíram a reputação da 3W Online ao longo dos anos.
          </p>
        </div>
        <div class="max-w-4xl mx-auto space-y-6">
          <div
            v-for="item in timeline"
            :key="item.year"
            class="flex items-start gap-4 sm:gap-6 bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
          >
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 text-white flex items-center justify-center shrink-0 font-black text-sm shadow-md shadow-primary-600/20">
              {{ item.year }}
            </div>
            <div class="flex-1">
              <h3 class="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-1">{{ item.title }}</h3>
              <p class="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         #institucional ─ Certificações & Dados Jurídicos
    ══════════════════════════════════════════════════════════════════ -->
    <section id="institucional" class="section-padding bg-white dark:bg-slate-900">
      <div class="container">
        <!-- Certificações -->
        <div class="text-center mb-12">
          <span class="section-label">Credenciais</span>
          <h2 class="section-title">Certificações & Padrões Técnicos</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          <div v-for="cert in certifications" :key="cert.title" class="p-6 rounded-xl border border-gray-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" :class="cert.bgColor">
              <Icon :icon="cert.icon" class="w-6 h-6 text-white" />
            </div>
            <h4 class="font-bold text-gray-900 dark:text-white text-sm mb-1">{{ cert.title }}</h4>
            <p class="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{{ cert.desc }}</p>
          </div>
        </div>

        <!-- Dados Jurídicos -->
        <div class="text-center mb-12">
          <span class="section-label">Transparência B2B</span>
          <h2 class="section-title">Informações Jurídicas & Fiscais</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Todos os dados necessários para cadastro e homologação de fornecedores corporativos.
          </p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div class="card p-6 sm:p-8 bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-slate-700">
              <div class="w-10 h-10 rounded-lg bg-primary-600 text-white flex items-center justify-center shrink-0">
                <Icon icon="mdi:domain" class="w-6 h-6" />
              </div>
              <div>
                <h3 class="font-bold text-gray-900 dark:text-white text-base">Identificação da Empresa</h3>
                <p class="text-xs text-gray-500 dark:text-slate-400">Dados cadastrais oficiais da Receita Federal</p>
              </div>
            </div>
            <dl class="space-y-3.5 text-xs">
              <div class="flex justify-between border-b border-gray-200/60 dark:border-slate-700/60 pb-2">
                <dt class="text-gray-500 dark:text-slate-400 font-medium">Razão Social:</dt>
                <dd class="text-gray-900 dark:text-white font-bold text-right">3W Online Soluções Digitais</dd>
              </div>
              <div class="flex justify-between border-b border-gray-200/60 dark:border-slate-700/60 pb-2">
                <dt class="text-gray-500 dark:text-slate-400 font-medium">Nome Fantasia:</dt>
                <dd class="text-gray-900 dark:text-white font-bold text-right">Grupo 3W Online</dd>
              </div>
              <div class="flex justify-between border-b border-gray-200/60 dark:border-slate-700/60 pb-2">
                <dt class="text-gray-500 dark:text-slate-400 font-medium">Sede / Município:</dt>
                <dd class="text-gray-900 dark:text-white font-medium text-right">Curitiba, Paraná — Brasil</dd>
              </div>
              <div class="flex justify-between border-b border-gray-200/60 dark:border-slate-700/60 pb-2">
                <dt class="text-gray-500 dark:text-slate-400 font-medium">Ano de Fundação:</dt>
                <dd class="text-gray-900 dark:text-white font-medium text-right">2019</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-500 font-medium">Enquadramento Tributário:</dt>
                <dd class="text-gray-900 font-medium text-right">Simples Nacional (Emissão de NF-e)</dd>
              </div>
            </dl>
          </div>

          <div class="card p-6 sm:p-8 bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-slate-700">
              <div class="w-10 h-10 rounded-lg bg-green-600 text-white flex items-center justify-center shrink-0">
                <Icon icon="mdi:shield-check" class="w-6 h-6" />
              </div>
              <div>
                <h3 class="font-bold text-gray-900 dark:text-white text-base">Canais Oficiais & Compliance</h3>
                <p class="text-xs text-gray-500 dark:text-slate-400">Atendimento direto e segurança jurídica</p>
              </div>
            </div>
            <dl class="space-y-3.5 text-xs">
              <div class="flex justify-between border-b border-gray-200/60 dark:border-slate-700/60 pb-2">
                <dt class="text-gray-500 dark:text-slate-400 font-medium">Telefone / WhatsApp:</dt>
                <dd class="text-gray-900 dark:text-white font-bold text-right">(41) 99692-4829</dd>
              </div>
              <div class="flex justify-between border-b border-gray-200/60 dark:border-slate-700/60 pb-2">
                <dt class="text-gray-500 dark:text-slate-400 font-medium">E-mail Corporativo:</dt>
                <dd class="text-primary-600 dark:text-primary-400 font-medium text-right">contato@3wonline.com.br</dd>
              </div>
              <div class="flex justify-between border-b border-gray-200/60 dark:border-slate-700/60 pb-2">
                <dt class="text-gray-500 dark:text-slate-400 font-medium">Proteção de Dados:</dt>
                <dd class="text-green-700 dark:text-green-400 font-bold text-right">100% Conforme LGPD</dd>
              </div>
              <div class="flex justify-between border-b border-gray-200/60 dark:border-slate-700/60 pb-2">
                <dt class="text-gray-500 dark:text-slate-400 font-medium">Horário de Funcionamento:</dt>
                <dd class="text-gray-900 dark:text-white font-medium text-right">Seg–Sex: 8h às 18h</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-500 font-medium">Área de Atendimento:</dt>
                <dd class="text-gray-900 font-medium text-right">Todo o Território Nacional</dd>
              </div>
            </dl>
            <div class="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-2">
              <a href="#contato" class="btn-primary flex-1 text-center text-xs !py-2.5 justify-center">Enviar E-mail</a>
              <a
                href="https://wa.me/5541996924829?text=Olá! Gostaria de falar com o departamento institucional da 3W Online."
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary flex-1 text-center text-xs !py-2.5 justify-center"
              >
                <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         #ferramentas ─ Suíte de 280+ Ferramentas
    ══════════════════════════════════════════════════════════════════ -->
    <section id="ferramentas" class="section-padding bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-700/50">
      <div class="container">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span class="section-label">Suíte Digital 3W</span>
            <h2 class="section-title mb-2">Ferramentas Gratuitas para Seu Dia a Dia</h2>
            <p class="section-subtitle mb-0 max-w-xl">
              Calculadoras financeiras, geradores de dados, conversores e validadores. Processamento 100% local no seu navegador com total privacidade.
            </p>
          </div>
          <RouterLink to="/ferramentas" class="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700">
            Explorar todas as 280+ ferramentas <Icon icon="mdi:arrow-right" class="w-4 h-4" />
          </RouterLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <RouterLink
            v-for="tool in featuredTools"
            :key="tool.path"
            :to="tool.path"
            class="bg-slate-50 hover:bg-white p-4 rounded-xl border border-gray-200/80 hover:border-primary-300 hover:shadow-md transition-all group"
          >
            <div class="flex items-center gap-3 mb-2">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105" :class="tool.iconBg">
                <Icon :icon="tool.icon" class="w-5 h-5 text-white" />
              </div>
              <h4 class="text-xs font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{{ tool.name }}</h4>
            </div>
            <p class="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{{ tool.desc }}</p>
          </RouterLink>
        </div>
        <div class="mt-8 bg-gradient-to-r from-primary-50 dark:from-primary-950/40 via-blue-50 dark:via-blue-950/30 to-teal-50 dark:to-teal-950/30 rounded-2xl p-6 border border-primary-100 dark:border-primary-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center shrink-0">
              <Icon icon="mdi:lightning-bolt" class="w-5 h-5" />
            </div>
            <div>
              <h4 class="text-sm font-bold text-gray-900">Precisa de uma ferramenta personalizada ou integração com seu sistema?</h4>
              <p class="text-xs text-gray-600">Desenvolvemos utilitários, calculadoras e APIs sob medida para sua empresa.</p>
            </div>
          </div>
          <a href="#contato" class="btn-primary !py-2 !px-4 text-xs whitespace-nowrap shrink-0">Falar com Engenharia</a>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         Simulador de Orçamento
    ══════════════════════════════════════════════════════════════════ -->
    <section class="section-padding bg-slate-900 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#111d3a] to-[#162044]"></div>
      <div class="container relative z-10">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Transparência & Rapidez</span>
          <h2 class="text-2xl md:text-3xl font-extrabold mb-3">Simule o Investimento do Seu Projeto</h2>
          <p class="text-sm text-blue-200">Escolha o serviço desejado e personalize os parâmetros para obter uma estimativa em tempo real.</p>
        </div>
        <div class="flex flex-wrap justify-center gap-2 mb-8 max-w-3xl mx-auto">
          <button
            v-for="st in simulatorTypes"
            :key="st.id"
            @click="activeSimType = st.id"
            class="px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5"
            :class="activeSimType === st.id ? 'bg-primary-600 text-white border-primary-500 shadow-md' : 'bg-white/10 text-gray-300 border-white/10 hover:bg-white/15 hover:text-white'"
          >
            <Icon :icon="st.icon" class="w-4 h-4" />
            <span>{{ st.label }}</span>
          </button>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900 border border-gray-100">
          <PriceSimulator :key="activeSimType" :service-type="activeSimType" />
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         Como Funciona
    ══════════════════════════════════════════════════════════════════ -->
    <section class="section-padding bg-white dark:bg-slate-900">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Metodologia Ágil</span>
          <h2 class="section-title">Do Primeiro Contato ao Resultado</h2>
          <p class="section-subtitle">Processo estruturado e transparente para você acompanhar cada etapa</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div v-for="(step, i) in howItWorks" :key="i" class="text-center relative p-4 rounded-xl hover:bg-slate-50 transition-colors">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center mx-auto mb-4 text-lg font-bold shadow-lg shadow-primary-500/20">
              {{ i + 1 }}
            </div>
            <h4 class="text-sm font-bold text-gray-900 mb-1.5">{{ step.title }}</h4>
            <p class="text-xs text-gray-500 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
        <div class="text-center mt-10">
          <a
            href="https://wa.me/5541996924829?text=Olá! Quero iniciar meu projeto com a 3W Online."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary text-sm shadow-md"
          >
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" />
            Iniciar Meu Projeto Agora
          </a>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         Pacotes Promocionais
    ══════════════════════════════════════════════════════════════════ -->
    <section class="section-padding bg-slate-50 border-y border-gray-100">
      <div class="container">
        <div class="text-center mb-8">
          <span class="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
            <Icon icon="mdi:fire" class="w-4 h-4" /> Condições Especiais de Lançamento
          </span>
          <h2 class="section-title">Pacotes Promocionais</h2>
          <p class="section-subtitle">Aproveite condições sob medida para acelerar a presença da sua marca</p>
        </div>
        <div class="relative max-w-4xl mx-auto">
          <div class="overflow-hidden rounded-2xl">
            <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${activeOffer * 100}%)` }">

              <!-- Oferta 1 -->
              <div class="w-full flex-shrink-0 px-2">
                <div class="bg-white rounded-2xl border-2 border-primary-500 p-6 sm:p-8 shadow-xl">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <span class="inline-block bg-primary-100 text-primary-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">Marketing Digital</span>
                      <h3 class="text-xl font-bold text-gray-900 mb-2">Pacote Marketing Digital Completo</h3>
                      <p class="text-xs text-gray-600 mb-4">Gestão de redes sociais + anúncios Google/Meta + produção de conteúdo + relatórios de performance.</p>
                      <ul class="text-xs text-gray-600 space-y-2 mb-4">
                        <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500" /> Gestão de redes sociais profissional</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500" /> Criação de artes e legendas estratégicas</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500" /> Configuração e gestão de anúncios patrocinados</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500" /> Relatório mensal com métricas reais</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500" /> Suporte dedicado via WhatsApp</li>
                      </ul>
                    </div>
                    <div class="text-center bg-slate-50 p-6 rounded-xl border border-gray-100">
                      <p class="text-xs text-gray-400 line-through mb-1">De R$ 2.500/mês</p>
                      <p class="text-3xl sm:text-4xl font-extrabold text-primary-600">R$ 500<span class="text-sm font-normal text-gray-500">/mês</span></p>
                      <p class="text-xs text-gray-500 mt-1 mb-4">Primeiros 30 dias de teste — sem fidelidade</p>
                      <a href="https://wa.me/5541996924829?text=Olá! Quero o pacote Marketing Digital por R$ 500/mês!" target="_blank" rel="noopener noreferrer" class="btn-primary w-full text-xs font-bold !py-3">
                        <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1.5" /> Quero Essa Oferta
                      </a>
                      <p class="text-[10px] text-gray-400 mt-2">* Verba de mídia paga à parte</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Oferta 2 -->
              <div class="w-full flex-shrink-0 px-2">
                <div class="bg-white rounded-2xl border-2 border-blue-500 p-6 sm:p-8 shadow-xl">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <span class="inline-block bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">Criação de Sites</span>
                      <h3 class="text-xl font-bold text-gray-900 mb-2">Site Profissional Completo</h3>
                      <p class="text-xs text-gray-600 mb-4">Site institucional responsivo, ultra veloz, otimizado para SEO e pronto para converter visitantes.</p>
                      <ul class="text-xs text-gray-600 space-y-2 mb-4">
                        <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500" /> Design exclusivo e 100% responsivo</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500" /> Estrutura completa de páginas e serviços</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500" /> SEO técnico e Schema.org configurados</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500" /> Integração com WhatsApp e formulários</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500" /> Certificado SSL e alta segurança</li>
                      </ul>
                    </div>
                    <div class="text-center bg-slate-50 p-6 rounded-xl border border-gray-100">
                      <p class="text-xs text-gray-400 line-through mb-1">De R$ 4.500</p>
                      <p class="text-3xl sm:text-4xl font-extrabold text-blue-600">R$ 2.500</p>
                      <p class="text-xs text-gray-500 mt-1 mb-4">Pagamento facilitado em até 12x</p>
                      <a href="https://wa.me/5541996924829?text=Olá! Quero o site profissional por R$ 2.500!" target="_blank" rel="noopener noreferrer" class="btn-primary !bg-blue-600 hover:!bg-blue-700 w-full text-xs font-bold !py-3">
                        <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1.5" /> Quero Meu Site
                      </a>
                      <p class="text-[10px] text-gray-400 mt-2">* Entrega ágil em até 15 dias</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Oferta 3 -->
              <div class="w-full flex-shrink-0 px-2">
                <div class="bg-white rounded-2xl border-2 border-purple-500 p-6 sm:p-8 shadow-xl">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <span class="inline-block bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">Automação & IA</span>
                      <h3 class="text-xl font-bold text-gray-900 mb-2">Automação de WhatsApp com IA</h3>
                      <p class="text-xs text-gray-600 mb-4">Chatbot inteligente com IA para atendimento 24/7, qualificação de leads e integração com CRM.</p>
                      <ul class="text-xs text-gray-600 space-y-2 mb-4">
                        <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500" /> Agente inteligente treinado com dados da sua empresa</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500" /> Atendimento no WhatsApp sem filas</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500" /> Agendamento e qualificação automática</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500" /> Painel multicanal de gestão</li>
                      </ul>
                    </div>
                    <div class="text-center bg-slate-50 p-6 rounded-xl border border-gray-100">
                      <p class="text-xs text-gray-400 line-through mb-1">De R$ 8.000</p>
                      <p class="text-3xl sm:text-4xl font-extrabold text-purple-600">R$ 4.500</p>
                      <p class="text-xs text-gray-500 mt-1 mb-4">Implementação completa com suporte 60 dias</p>
                      <a href="https://wa.me/5541996924829?text=Olá! Quero a automação com IA por R$ 4.500!" target="_blank" rel="noopener noreferrer" class="btn-primary !bg-purple-600 hover:!bg-purple-700 w-full text-xs font-bold !py-3">
                        <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1.5" /> Quero Automatizar
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="flex justify-center items-center gap-4 mt-6">
            <button @click="prevOffer" class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm" aria-label="Oferta anterior">
              <Icon icon="mdi:chevron-left" class="w-5 h-5 text-gray-600" />
            </button>
            <div class="flex gap-2">
              <button v-for="(_, i) in offers" :key="i" @click="activeOffer = i" class="w-2.5 h-2.5 rounded-full transition-all" :class="activeOffer === i ? 'bg-primary-600 w-6' : 'bg-gray-300'" :aria-label="`Oferta ${i + 1}`" />
            </div>
            <button @click="nextOffer" class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm" aria-label="Próxima oferta">
              <Icon icon="mdi:chevron-right" class="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         Depoimentos
    ══════════════════════════════════════════════════════════════════ -->
    <section class="testimonial-section section-padding">
      <div class="container">
        <div class="text-center mb-12">
          <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Prova Social</span>
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">O que Nossos Clientes Dizem</h2>
          <p class="text-sm text-blue-200">Parcerias duradouras construídas com resultados mensuráveis.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="t in testimonials" :key="t.id" class="testimonial-card">
            <div class="flex mb-3 gap-0.5">
              <Icon v-for="n in 5" :key="n" icon="mdi:star" class="w-4 h-4 text-yellow-400" />
            </div>
            <p class="text-xs sm:text-sm text-gray-200 mb-5 leading-relaxed italic">"{{ t.text }}"</p>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-primary-500/20 border border-primary-500/30 rounded-full flex items-center justify-center mr-3 font-bold text-white text-xs">{{ t.avatar }}</div>
              <div>
                <h4 class="font-semibold text-white text-sm">{{ t.name }}</h4>
                <p class="text-[11px] text-blue-300">{{ t.company }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         #contato ─ Formulário & Canais
    ══════════════════════════════════════════════════════════════════ -->
    <section id="contato" class="section-padding bg-slate-50/50 dark:bg-slate-800/50">
      <div class="container">
        <!-- Header da seção -->
        <div class="text-center mb-10">
          <span class="section-label">Vamos Conversar</span>
          <h2 class="section-title">Fale com a 3W Online & Solicite um Orçamento Gratuito</h2>
          <p class="section-subtitle max-w-xl mx-auto">
            Conte-nos sobre seu projeto. Nossa equipe analisará suas necessidades para desenhar a melhor solução.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs font-medium">
            <span class="flex items-center gap-1.5 text-gray-600 dark:text-slate-300"><Icon icon="mdi:shield-check" class="w-4 h-4 text-green-600" /> Dados Protegidos pela LGPD</span>
            <span class="flex items-center gap-1.5 text-gray-600 dark:text-slate-300"><Icon icon="mdi:handshake" class="w-4 h-4 text-blue-600" /> Orçamento Sem Compromisso</span>
            <span class="flex items-center gap-1.5 text-gray-600 dark:text-slate-300"><Icon icon="mdi:currency-usd" class="w-4 h-4 text-emerald-600" /> Condições em até 12x</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <!-- Formulário -->
          <div class="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-md">
            <div class="flex items-center gap-2.5 mb-2 pb-3 border-b border-gray-100">
              <div class="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                <Icon icon="mdi:email-fast-outline" class="w-5 h-5" />
              </div>
              <div>
                <h3 class="text-base sm:text-lg font-bold text-gray-900">Solicitar Proposta ou Diagnóstico</h3>
                <p class="text-xs text-gray-500">Preencha os dados e receba nosso retorno prioritário</p>
              </div>
            </div>

            <form @submit.prevent="debouncedSubmit" novalidate autocomplete="off" class="space-y-4 pt-2">
              <div>
                <label class="form-label text-xs">Quais serviços você tem interesse?</label>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <label
                    v-for="area in areas"
                    :key="area.value"
                    class="flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all"
                    :class="form.areas.includes(area.value) ? 'bg-primary-50/70 border-primary-500 text-primary-900 font-semibold' : 'bg-slate-50 border-gray-200 text-gray-700 hover:border-primary-300'"
                  >
                    <input type="checkbox" v-model="form.areas" :value="area.value" class="h-3.5 w-3.5 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                    <span>{{ area.label }}</span>
                  </label>
                </div>
              </div>

              <div>
                <label for="name" class="form-label text-xs">Nome Completo <span class="text-red-500">*</span></label>
                <input id="name" v-model="form.name" type="text" autocomplete="name" class="form-input" :class="{ '!border-red-500': errors.name }" placeholder="Ex: Carlos Silva" @focus="trackFormStart('home-contact')" />
                <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="email" class="form-label text-xs">E-mail <span class="text-red-500">*</span></label>
                  <input id="email" v-model="form.email" type="email" autocomplete="email" class="form-input" :class="{ '!border-red-500': errors.email }" placeholder="carlos@empresa.com.br" />
                  <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
                </div>
                <div>
                  <label for="phone" class="form-label text-xs">WhatsApp / Telefone <span class="text-red-500">*</span></label>
                  <input id="phone" v-model="form.phone" v-maska data-maska="(##) #####-####" type="tel" autocomplete="tel" class="form-input" :class="{ '!border-red-500': errors.phone }" placeholder="(41) 99999-9999" />
                  <p v-if="errors.phone" class="form-error">{{ errors.phone }}</p>
                </div>
              </div>

              <div>
                <label for="company" class="form-label text-xs">Nome da Empresa ou Link do Site (Opcional)</label>
                <input id="company" v-model="form.company" type="text" autocomplete="organization" class="form-input" placeholder="Ex: Minha Empresa LTDA ou www.minhaempresa.com.br" />
              </div>

              <div>
                <label for="message" class="form-label text-xs">Descreva brevemente sua necessidade <span class="text-red-500">*</span></label>
                <textarea id="message" v-model="form.message" rows="3" autocomplete="off" class="form-textarea" :class="{ '!border-red-500': errors.message }" placeholder="Ex: Preciso de um novo site institucional e gestão de anúncios no Google para atrair mais clientes..."></textarea>
                <p v-if="errors.message" class="form-error">{{ errors.message }}</p>
              </div>

              <div class="flex items-start gap-2.5 pt-1">
                <input id="privacy" v-model="form.privacy" type="checkbox" class="mt-1 h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                <label for="privacy" class="text-[11px] text-gray-600 leading-relaxed cursor-pointer">
                  Concordo com a <RouterLink to="/privacidade" class="text-primary-600 underline font-semibold">Política de Privacidade</RouterLink> e autorizo a 3W Online a entrar em contato conforme a LGPD. <span class="text-red-500">*</span>
                </label>
              </div>
              <p v-if="errors.privacy" class="form-error -mt-1">{{ errors.privacy }}</p>

              <!-- Honeypot — invisível ao usuário, se preenchido = bot -->
              <input type="text" v-model="hpField" name="hp_field" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0;" autocomplete="off" />
              <input type="hidden" name="_csrf" :value="getToken()" />

              <!-- Cloudflare Turnstile — verificação humana explícita -->
              <div class="pt-1">
                <AppTurnstile
                  ref="turnstileRef"
                  action="contact_submit"
                  @success="turnstileToken = $event"
                  @expired="turnstileToken = ''"
                  @error="turnstileToken = ''"
                />
                <p v-if="!turnstileToken && isSubmitting === false" class="text-[10px] text-gray-400 mt-1">
                  <Icon icon="mdi:shield-check-outline" class="w-3 h-3 inline mr-0.5" />
                  Complete a verificação acima para enviar
                </p>
              </div>

              <div class="pt-2">
                <button type="submit" :disabled="isSubmitting" class="btn-primary w-full text-xs sm:text-sm !py-3 font-bold justify-center shadow-md">
                  <Icon v-if="isSubmitting" icon="mdi:loading" class="w-4 h-4 mr-2 animate-spin" />
                  <Icon v-else icon="mdi:send-outline" class="w-4 h-4 mr-2" />
                  {{ isSubmitting ? 'Processando envio...' : 'Enviar Solicitação de Orçamento' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Sidebar de Contato -->
          <div class="lg:col-span-5 space-y-6">
            <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-md space-y-5">
              <div class="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <div class="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                  <Icon icon="mdi:headset" class="w-5 h-5" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 text-sm sm:text-base">Canais Oficiais de Contato</h3>
                  <p class="text-[11px] text-gray-500">Atendimento rápido e descomplicado</p>
                </div>
              </div>
              <div class="space-y-4 text-xs">
                <div class="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600">
                  <div class="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center shrink-0 mt-0.5"><Icon icon="mdi:whatsapp" class="w-4 h-4" /></div>
                  <div class="flex-1">
                    <p class="text-[10px] uppercase font-bold text-gray-400">WhatsApp & Telefone</p>
          <a href="tel:+5541996924829" class="text-sm font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">(41) 99692-4829</a>
                    <p class="text-[11px] text-green-700 font-medium">Resposta em até 24 horas úteis</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600">
                  <div class="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5"><Icon icon="mdi:email-outline" class="w-4 h-4" /></div>
                  <div class="flex-1">
                    <p class="text-[10px] uppercase font-bold text-gray-400">E-mail Corporativo</p>
                    <a href="mailto:contato@3wonline.com.br" class="text-xs font-bold text-gray-900 hover:text-primary-600 transition-colors">contato@3wonline.com.br</a>
                    <p class="text-[11px] text-gray-500">Envio de briefing e propostas</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600">
                  <div class="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5"><Icon icon="mdi:map-marker-outline" class="w-4 h-4" /></div>
                  <div class="flex-1">
                    <p class="text-[10px] uppercase font-bold text-gray-400">Localização</p>
                    <p class="text-xs font-bold text-gray-900">Curitiba, Paraná — Brasil</p>
                    <p class="text-[11px] text-gray-500">Atendimento nacional</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600">
                  <div class="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5"><Icon icon="mdi:clock-outline" class="w-4 h-4" /></div>
                  <div class="flex-1">
                    <p class="text-[10px] uppercase font-bold text-gray-400">Horário de Atendimento</p>
                    <p class="text-xs font-bold text-gray-900">Segunda a Sexta: 8h às 18h</p>
                    <p class="text-[11px] text-gray-500">Atendimento em horário comercial para todo o Brasil</p>
                  </div>
                </div>
              </div>
              <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span class="text-xs text-gray-500 font-medium">Acompanhe a 3W:</span>
                <div class="flex items-center gap-2">
                  <a v-for="s in socials" :key="s.label" :href="s.url" target="_blank" rel="noopener noreferrer" class="w-8 h-8 bg-slate-100 hover:bg-primary-600 hover:text-white text-gray-600 rounded-full flex items-center justify-center transition-colors" :aria-label="s.label">
                    <Icon :icon="s.icon" class="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         FAQ
    ══════════════════════════════════════════════════════════════════ -->
    <section class="section-padding bg-white dark:bg-slate-900">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <span class="section-label">Tire Suas Dúvidas</span>
          <h2 class="section-title">Perguntas Frequentes</h2>
          <p class="section-subtitle">Confira respostas para as principais dúvidas sobre nossos serviços e prazos.</p>
        </div>
        <FaqAccordion :items="faqs" />
        <div class="text-center mt-8">
          <a
            href="https://wa.me/5541996924829?text=Olá! Tenho uma dúvida sobre os serviços da 3W Online."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary text-xs sm:text-sm shadow-md"
          >
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1.5" />
            Tirar Dúvida Diretamente no WhatsApp
          </a>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════
         CTA Final
    ══════════════════════════════════════════════════════════════════ -->
    <section class="cta-section">
      <div class="container text-center">
        <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-3">Dê o Próximo Passo</span>
        <h2 class="text-2xl md:text-4xl font-extrabold text-white mb-4">Pronto para Acelerar Seus Resultados?</h2>
        <p class="text-sm text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Entre em contato hoje mesmo e descubra como a 3W Online pode construir sua presença digital e gerar mais clientes para sua empresa.
        </p>
        <div class="flex flex-col sm:flex-row gap-3.5 justify-center">
          <a href="#contato" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-sm shadow-xl font-bold">
            <Icon icon="mdi:file-document-edit-outline" class="w-4 h-4 mr-2" />
            Solicitar Proposta Comercial
          </a>
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de conversar sobre soluções digitais para meu negócio."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary text-sm shadow-xl font-bold"
          >
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" />
            Atendimento Rápido no WhatsApp
          </a>
        </div>
        <p class="text-xs text-blue-300 mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <span class="flex items-center gap-1.5"><Icon icon="mdi:clock-fast" class="w-4 h-4 text-green-400" /> Resposta em até 24 horas úteis</span>
          <span class="flex items-center gap-1.5"><Icon icon="mdi:lock-open" class="w-4 h-4 text-green-400" /> Sem compromisso</span>
          <span class="flex items-center gap-1.5"><Icon icon="mdi:cash-multiple" class="w-4 h-4 text-green-400" /> Orçamento 100% gratuito</span>
        </p>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import { vMaska } from 'maska/vue'
import PriceSimulator from '@/components/PriceSimulator.vue'
import FaqAccordion from '@/components/ui/FaqAccordion.vue'
import AppTurnstile from '@/components/ui/AppTurnstile.vue'
import { FAQ_ITEMS } from '@/constants/content'
import { useSeo } from '@/composables/useSeo'
import { useHoneypot } from '@/composables/useHoneypot'
import { useCSRFToken } from '@/composables/useCSRFToken'
import { useRecaptcha } from '@/composables/useRecaptcha'
import { useFormSecurity } from '@/composables/useFormSecurity'
import { useAnalytics } from '@/composables/useAnalytics'
import { debounce } from '@/composables/useDebounce'

// ─── SEO ───────────────────────────────────────────────────────────────────────
const { applySeo } = useSeo()
applySeo({
  title: 'Agência de Marketing Digital em Curitiba | 3W Online - Sites, Sistemas e IA',
  description:
    'Agência de marketing digital em Curitiba. Criação de sites, gestão de redes sociais, anúncios Google Ads, desenvolvimento de apps, sistemas web e automação com IA.',
  path: '/',
  keywords:
    'agência marketing digital curitiba, criação de sites curitiba, gestão redes sociais, google ads, meta ads, desenvolvimento web, sistemas sob medida, automação ia',
})

// ─── Carrossel de Ofertas ────────────────────────────────────────────────────────
const activeOffer = ref(0)
const offers = [0, 1, 2]
let carouselInterval: ReturnType<typeof setInterval> | null = null

const activeSimType = ref('website')
const simulatorTypes = [
  { id: 'website',      label: 'Criação de Sites',    icon: 'mdi:web'                    },
  { id: 'ads',          label: 'Gestão de Anúncios',  icon: 'mdi:bullseye-arrow'          },
  { id: 'social-media', label: 'Redes Sociais',        icon: 'mdi:instagram'               },
  { id: 'system',       label: 'Sistemas Web',         icon: 'mdi:application-cog-outline' },
  { id: 'app',          label: 'Apps Mobile',          icon: 'mdi:cellphone'               },
  { id: 'design',       label: 'Design Gráfico',       icon: 'mdi:palette'                 },
]

const nextOffer = () => { activeOffer.value = (activeOffer.value + 1) % offers.length }
const prevOffer = () => { activeOffer.value = (activeOffer.value - 1 + offers.length) % offers.length }

onMounted(() => { carouselInterval = setInterval(nextOffer, 6000) })
onUnmounted(() => { if (carouselInterval) clearInterval(carouselInterval) })

// ─── Formulário de Contato ───────────────────────────────────────────────────────
const { hpField, isBot, resetHoneypot } = useHoneypot()
const { getToken } = useCSRFToken()
const { execute: recaptchaExecute } = useRecaptcha()
const { sanitizeFormData, detectInjectionAttempt, useSubmitGuard } = useFormSecurity()
const { trackFormSubmit, trackLead, trackFormStart } = useAnalytics()

const { isSubmitting, wasSubmittedRecently, markAsSubmitted, clearSubmitMark } =
  useSubmitGuard('home-contact')

const turnstileToken = ref('')
const turnstileRef = ref<InstanceType<typeof AppTurnstile> | null>(null)
const errors = reactive<Record<string, string>>({})

const form = reactive({
  name:    '',
  email:   '',
  phone:   '',
  company: '',
  message: '',
  privacy: false,
  areas:   [] as string[],
})

function validate(): boolean {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.name.trim() || form.name.trim().length < 3)
    errors.name = 'Informe seu nome completo'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Informe um e-mail válido'
  if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10)
    errors.phone = 'Informe um telefone/WhatsApp válido'
  if (!form.message.trim() || form.message.trim().length < 8)
    errors.message = 'Por favor, descreva resumidamente sua necessidade'
  if (!form.privacy)
    errors.privacy = 'É necessário concordar com a Política de Privacidade'
  return Object.keys(errors).length === 0
}

async function handleSubmit() {
  if (!validate()) {
    await Swal.fire({ icon: 'warning', title: 'Atenção aos Campos', text: 'Por favor, preencha todos os campos obrigatórios marcados.', confirmButtonColor: '#2563eb' })
    return
  }

  // Guard: evita reenvio dentro do cooldown (reload acidental)
  if (wasSubmittedRecently()) {
    await Swal.fire({ icon: 'info', title: 'Solicitação já enviada', text: 'Sua solicitação foi recebida. Aguarde nosso retorno ou entre em contato pelo WhatsApp.', confirmButtonColor: '#2563eb' })
    return
  }

  // Turnstile — verifica se o desafio foi completado
  if (!turnstileToken.value) {
    await Swal.fire({ icon: 'warning', title: 'Verificação necessária', text: 'Por favor, complete a verificação de segurança antes de enviar.', confirmButtonColor: '#2563eb' })
    return
  }

  // Detecção de injeção
  const suspicious = detectInjectionAttempt(form)
  if (suspicious.length > 0) {
    await Swal.fire({ icon: 'error', title: 'Dados inválidos', text: 'Foram detectados caracteres não permitidos em alguns campos. Por favor, revise e tente novamente.', confirmButtonColor: '#2563eb' })
    return
  }

  isSubmitting.value = true
  try {
    // Sanitiza inputs com DOMPurify antes de qualquer processamento
    const safeForm = sanitizeFormData({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      message: form.message,
    })

    // Executa reCAPTCHA v3 (score-based, invisível)
    const recaptchaToken = await recaptchaExecute('contact_submit')

    await new Promise((r) => setTimeout(r, 800))

    const areasSelected = form.areas.length ? form.areas.join(', ') : 'Geral'
    const msg =
      `Olá! Gostaria de um orçamento pelo site da 3W Online:\n\n` +
      `👤 Nome: ${safeForm.name}\n` +
      `📧 E-mail: ${safeForm.email}\n` +
      `📱 Telefone: ${safeForm.phone}\n` +
      `🏢 Empresa: ${safeForm.company || 'Não informada'}\n` +
      `🎯 Áreas de Interesse: ${areasSelected}\n` +
      `💬 Mensagem: ${safeForm.message}` +
      (recaptchaToken ? `\n🔒 reCAPTCHA: ${recaptchaToken.slice(0, 20)}...` : '')

    await Swal.fire({ icon: 'success', title: 'Solicitação Preparada!', text: 'Você será direcionado para o WhatsApp oficial para finalizar o atendimento.', confirmButtonColor: '#2563eb', confirmButtonText: 'Abrir WhatsApp' })
    window.open(`https://wa.me/5541996924829?text=${encodeURIComponent(msg)}`, '_blank')

    // Rastreia conversão no GA4
    trackFormSubmit('home-contact', 'Formulário de Orçamento')
    trackLead('website_contact_form', areasSelected)

    // Marca o formulário como enviado (inicia cooldown)
    markAsSubmitted()

    // Limpa o formulário
    Object.assign(form, { name: '', email: '', phone: '', company: '', message: '', privacy: false, areas: [] })
    resetHoneypot()
    turnstileToken.value = ''
    turnstileRef.value?.reset()
    clearSubmitMark() // remove cooldown imediatamente após reset bem-sucedido
  } catch {
    await Swal.fire({ icon: 'error', title: 'Ocorreu um erro', text: 'Por favor, entre em contato diretamente pelo WhatsApp: (41) 99692-4829.', confirmButtonColor: '#2563eb' })
    turnstileRef.value?.reset()
    turnstileToken.value = ''
  } finally {
    isSubmitting.value = false
  }
}

const debouncedSubmit = debounce(async () => {
  if (isBot.value) return  // Bloqueia bots (honeypot)
  await handleSubmit()
}, 400)

// ─── Dados Estáticos ─────────────────────────────────────────────────────────────
const stats = [
  { value: '150+', label: 'Projetos Entregues com Sucesso' },
  { value: '98%',  label: 'Índice de Satisfação de Clientes' },
  { value: '5+ Anos', label: 'de Experiência no Mercado' },
  { value: '280+', label: 'Ferramentas Digitais Gratuitas' },
]

const services = [
  { id: 1, title: 'Criação de Sites',                   description: 'Sites institucionais modernos, landing pages de alta conversão e e-commerces com SEO avançado.',                        icon: 'mdi:web',                   iconBg: 'bg-blue-600',   link: '/servicos/criacao-sites'       },
  { id: 2, title: 'Sistemas Web Sob Medida',             description: 'ERPs leves, CRMs, painéis de gestão e plataformas customizadas para sua operação.',                                   icon: 'mdi:application-cog-outline',iconBg: 'bg-slate-700',  link: '/servicos/criacao-sistemas'    },
  { id: 3, title: 'Automação & Inteligência Artificial', description: 'Chatbots inteligentes, automações de atendimento no WhatsApp e integrações via API.',                                  icon: 'mdi:robot-outline',          iconBg: 'bg-purple-600', link: '/servicos/automacao-ia'        },
  { id: 4, title: 'Gestão de Anúncios (Google & Meta)', description: 'Campanhas de tráfego pago de alta performance focadas em ROI e geração constante de leads.',                           icon: 'mdi:bullseye-arrow',         iconBg: 'bg-emerald-600',link: '/servicos/gestao-anuncios'    },
  { id: 5, title: 'Gestão de Redes Sociais',            description: 'Planejamento editorial, design profissional, vídeos curtos e gestão de autoridade no Instagram e redes sociais.',      icon: 'mdi:instagram',             iconBg: 'bg-pink-600',   link: '/servicos/gestao-redes-sociais'},
  { id: 6, title: 'Desenvolvimento de Apps',            description: 'Aplicativos mobile modernos para iOS e Android com sincronização em tempo real.',                                       icon: 'mdi:cellphone',             iconBg: 'bg-cyan-600',   link: '/servicos/desenvolvimento-apps'},
]

const featuredTools = [
  { name: 'Calculadora de ROI',       desc: 'Calcule o retorno sobre investimento das suas campanhas.',           icon: 'mdi:calculator-variant-outline', iconBg: 'bg-emerald-600', path: '/ferramentas/calculadora-roi'         },
  { name: 'Gerador de QR Code',       desc: 'Crie QR Codes personalizados para links, PIX, Wi-Fi e WhatsApp.',   icon: 'mdi:qrcode',                     iconBg: 'bg-blue-600',    path: '/ferramentas/gerador-qrcode'          },
  { name: 'Gerador de CPF & CNPJ',    desc: 'Gere documentos válidos instantaneamente para testes.',              icon: 'mdi:card-account-details-outline',iconBg: 'bg-indigo-600', path: '/ferramentas/gerador-cpf-cnpj'        },
  { name: 'Gerador de Senhas Fortes', desc: 'Crie senhas criptograficamente seguras com caracteres personalizados.',icon: 'mdi:lock-outline',              iconBg: 'bg-amber-600',   path: '/ferramentas/gerador-senha'           },
  { name: 'Margem de Lucro & Markup', desc: 'Calcule margem bruta, margem líquida e preço ideal de venda.',      icon: 'mdi:cash-multiple',              iconBg: 'bg-teal-600',    path: '/ferramentas/calculadora-margem-lucro'},
  { name: 'Conversor JSON / YAML',    desc: 'Converta estruturas de dados entre JSON e YAML com validação.',     icon: 'mdi:code-json',                  iconBg: 'bg-purple-600',  path: '/ferramentas/conversor-json-yaml'     },
  { name: 'Validador de CEP',         desc: 'Consulte e valide CEPs com preenchimento automático de endereço.',   icon: 'mdi:map-marker-check-outline',   iconBg: 'bg-cyan-600',    path: '/ferramentas/validador-cep'           },
  { name: 'Gerador de Gradientes CSS',desc: 'Crie gradientes modernos em CSS com código pronto para copiar.',     icon: 'mdi:palette-swatch-outline',     iconBg: 'bg-pink-600',    path: '/ferramentas/gerador-gradiente'       },
]

const howItWorks = [
  { title: '1. Diagnóstico & Descoberta',      desc: 'Entendemos seu mercado, concorrentes e objetivos para traçar a melhor estratégia.'                       },
  { title: '2. Proposta & Planejamento',        desc: 'Apresentamos um escopo transparente com prazos, entregáveis e estimativa de investimento.'                },
  { title: '3. Execução de Alta Performance',  desc: 'Desenvolvimento e implementação ágil com validação contínua e foco em qualidade.'                        },
  { title: '4. Lançamento & Acompanhamento',   desc: 'Entrega, treinamento, monitoramento de métricas e suporte contínuo para o seu sucesso.'                  },
]

const testimonials = [
  { id: 1, name: 'João Silva',   company: 'Silva & Associados', avatar: 'JS', text: 'A 3W Online transformou nossa presença digital. O novo site e a gestão de anúncios aumentaram nossas vendas em 300% em apenas 6 meses!'             },
  { id: 2, name: 'Maria Santos', company: 'Boutique Elegance',  avatar: 'MS', text: 'Profissionalismo e qualidade técnica excepcionais. Nosso site ficou rápido, elegante e o WhatsApp não para de receber novos contatos todo dia!'     },
  { id: 3, name: 'Carlos Mendes',company: 'Logística Express',  avatar: 'CM', text: 'O sistema web desenvolvido sob medida automatizou nossos processos internos. Economizamos mais de 50 horas de trabalho manual por semana!'         },
]

// ─── Dados de Sobre / Institucional ──────────────────────────────────────────────
const benefits = [
  'Mais de 5 anos de experiência e 150+ projetos entregues com sucesso',
  'Métricas claras e relatórios transparentes com foco em ROI real',
  'Desenvolvimento de software ágil com código limpo e seguro',
  'Total conformidade com a LGPD e práticas de segurança digital',
]

const differentials = [
  { title: 'Tecnologia de Ponta',       desc: 'Aplicações desenvolvidas em Vue 3, TypeScript, Vite e arquitetura moderna de nuvem.',                       icon: 'mdi:code-tags',         iconBg: 'bg-blue-600'   },
  { title: 'Automação com IA',           desc: 'Integrações de ponta com modelos LLM e automações de atendimento 24h no WhatsApp.',                         icon: 'mdi:robot',             iconBg: 'bg-purple-600' },
  { title: 'Sem Fidelidade Forçada',     desc: 'Conquistamos sua parceria mês a mês através de entregas consistentes e resultados mensuráveis.',             icon: 'mdi:lock-open-outline',  iconBg: 'bg-emerald-600'},
  { title: 'Atendimento Humanizado',     desc: 'Comunicação rápida e direta com engenheiros e estrategistas sem burocracia.',                               icon: 'mdi:account-group',     iconBg: 'bg-amber-600'  },
  { title: 'Segurança & Compliance',     desc: 'Processos estruturados e proteção rigorosa de dados segundo a LGPD.',                                       icon: 'mdi:shield-check-outline',iconBg: 'bg-cyan-600'  },
  { title: 'Preços Transparentes',       desc: 'Sem custos ocultos: simulador de estimativas em tempo real antes de fechar negócio.',                       icon: 'mdi:calculator',        iconBg: 'bg-slate-700'  },
]

const timeline = [
  { year: '2019', title: 'Fundação da 3W Online em Curitiba',           description: 'Início das operações com foco no desenvolvimento de sites institucionais modernos e marketing digital de performance para PMEs.'                             },
  { year: '2020', title: 'Expansão para Sistemas & Aplicativos',         description: 'Ampliação do portfólio com desenvolvimento de software sob medida, plataformas web e integração de APIs.'                                                   },
  { year: '2021', title: 'Consolidação em Tráfego Pago & Parcerias',    description: 'Certificações em Google Ads e Meta Ads, atingindo mais de 50 projetos entregues com alto retorno sobre investimento.'                                        },
  { year: '2022', title: 'Atendimento em Escala Nacional',               description: 'Expansão da carteira de clientes para múltiplos estados do Brasil com suporte remoto ágil e de alta qualidade.'                                            },
  { year: '2023', title: 'Pioneirismo em Automação & Inteligência Artificial', description: 'Implantação de agentes inteligentes com LLMs, automações de WhatsApp e ferramentas de produtividade para empresas.'                                 },
  { year: '2024+',title: 'Marca de 150+ Projetos & Suíte de 280+ Ferramentas', description: 'Lançamento da suíte digital com mais de 280 utilitários gratuitos client-side e consolidação como referência em tecnologia.'                       },
]

const certifications = [
  { title: 'Google Partner',      desc: 'Especialistas certificados em Google Ads, Search, Display e Analytics.',   icon: 'mdi:google',       bgColor: 'bg-blue-600'   },
  { title: 'Meta Business',       desc: 'Gestão avançada de campanhas no Facebook Ads e Instagram Ads.',             icon: 'mdi:facebook',     bgColor: 'bg-indigo-600' },
  { title: 'LGPD Compliance',     desc: 'Processamento de dados em conformidade rigorosa com a legislação brasileira.',icon: 'mdi:shield-check',bgColor: 'bg-emerald-600'},
  { title: 'Cloud de Alta Performance', desc: 'Arquiteturas resilientes com CDN global e SSL de alta criptografia.', icon: 'mdi:cloud-check',  bgColor: 'bg-purple-600' },
]

// ─── Dados de Contato ────────────────────────────────────────────────────────────
const areas = [
  { value: 'sites',    label: 'Criação de Sites'      },
  { value: 'sistemas', label: 'Sistemas Sob Medida'   },
  { value: 'anuncios', label: 'Google & Meta Ads'     },
  { value: 'automacao',label: 'Automação & IA'        },
  { value: 'redes',    label: 'Redes Sociais'         },
  { value: 'apps',     label: 'Apps Mobile'           },
]

const socials = [
  { label: 'Instagram', url: 'https://www.instagram.com/grupo3wonline', icon: 'mdi:instagram' },
  { label: 'Facebook',  url: 'https://www.facebook.com/grupo3wonline',  icon: 'mdi:facebook'  },
  { label: 'WhatsApp',  url: 'https://wa.me/5541996924829',             icon: 'mdi:whatsapp'  },
]

const faqs = FAQ_ITEMS.slice(0, 6)
</script>
