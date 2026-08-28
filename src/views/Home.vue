<template>
  <div class="home-page">
    <!-- Hero — Dark Navy -->
    <section class="hero-gradient text-white py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <!-- Glow Decorativo de Fundo -->
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="container relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <!-- Tag de Localização & Expertise -->
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

          <!-- CTAs de Ação Rápida -->
          <div class="flex flex-col sm:flex-row gap-3.5 justify-center mb-8">
            <RouterLink to="/contato" class="btn-primary !bg-primary-500 hover:!bg-primary-600 text-sm shadow-lg shadow-primary-500/25">
              <Icon icon="mdi:file-document-edit-outline" class="w-4 h-4 mr-2" />
              Solicitar Orçamento Grátis
            </RouterLink>

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
              120+ Ferramentas Grátis
            </RouterLink>
          </div>

          <!-- Selos de Confiança -->
          <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-blue-300">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-green-400" /> LGPD 100% Conforme</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:clock-check" class="w-4 h-4 text-green-400" /> Resposta Rápida</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:lock-open" class="w-4 h-4 text-green-400" /> Sem Fidelidade Forçada</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:handshake" class="w-4 h-4 text-green-400" /> Contrato Transparente</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof Bar / Métricas -->
    <section class="py-10 bg-white border-b border-gray-100 shadow-sm">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-2xl md:text-4xl font-extrabold text-primary-600 tracking-tight">{{ stat.value }}</div>
            <div class="text-xs sm:text-sm text-gray-500 font-medium mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Serviços em Destaque -->
    <section class="section-padding bg-slate-50/50">
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
            <h3 class="text-base font-bold text-gray-900 mb-1.5 group-hover:text-primary-600 transition-colors">
              {{ service.title }}
            </h3>
            <p class="text-xs text-gray-500 mb-4 leading-relaxed">
              {{ service.description }}
            </p>
            <RouterLink :to="service.link" class="inline-flex items-center text-xs font-semibold text-primary-600 hover:text-primary-700 gap-1 mt-auto">
              Conhecer detalhes <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </RouterLink>
          </div>
        </div>

        <div class="text-center mt-10">
          <RouterLink to="/servicos" class="btn-outline text-sm">
            Ver Todos os Nossos Serviços
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- SEÇÃO: Suíte de Mais de 120 Ferramentas Gratuitas -->
    <section class="section-padding bg-white border-y border-gray-100">
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
            Explorar todas as 120+ ferramentas <Icon icon="mdi:arrow-right" class="w-4 h-4" />
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
              <h4 class="text-xs font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                {{ tool.name }}
              </h4>
            </div>
            <p class="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
              {{ tool.desc }}
            </p>
          </RouterLink>
        </div>

        <div class="mt-8 bg-gradient-to-r from-primary-50 via-blue-50 to-teal-50 rounded-2xl p-6 border border-primary-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center shrink-0">
              <Icon icon="mdi:lightning-bolt" class="w-5 h-5" />
            </div>
            <div>
              <h4 class="text-sm font-bold text-gray-900">Precisa de uma ferramenta personalizada ou integração com seu sistema?</h4>
              <p class="text-xs text-gray-600">Desenvolvemos utilitários, calculadoras e APIs sob medida para sua empresa.</p>
            </div>
          </div>
          <RouterLink to="/contato" class="btn-primary !py-2 !px-4 text-xs whitespace-nowrap shrink-0">
            Falar com Engenharia
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- SEÇÃO: Simulador de Orçamento Interativo -->
    <section class="section-padding bg-slate-900 text-white relative overflow-hidden">
      <!-- Fundo decorativo -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#111d3a] to-[#162044]"></div>

      <div class="container relative z-10">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Transparência & Rapidez</span>
          <h2 class="text-2xl md:text-3xl font-extrabold mb-3">Simule o Investimento do Seu Projeto</h2>
          <p class="text-sm text-blue-200">
            Escolha o serviço desejado e personalize os parâmetros para obter uma estimativa de orçamento em tempo real.
          </p>
        </div>

        <!-- Seletor de Tipo de Serviço para o Simulador -->
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

        <!-- Container do Componente PriceSimulator -->
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900 border border-gray-100">
          <PriceSimulator :key="activeSimType" :service-type="activeSimType" />
        </div>
      </div>
    </section>

    <!-- How It Works — Processo em 4 Passos -->
    <section class="section-padding bg-white">
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

    <!-- Carrossel de Ofertas Especiais -->
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
              <!-- Oferta 1: Marketing Digital -->
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

              <!-- Oferta 2: Criação de Sites -->
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

              <!-- Oferta 3: Automação com IA -->
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

          <!-- Controles do Carrossel -->
          <div class="flex justify-center items-center gap-4 mt-6">
            <button @click="prevOffer" class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm" aria-label="Oferta anterior">
              <Icon icon="mdi:chevron-left" class="w-5 h-5 text-gray-600" />
            </button>
            <div class="flex gap-2">
              <button
                v-for="(_, i) in offers"
                :key="i"
                @click="activeOffer = i"
                class="w-2.5 h-2.5 rounded-full transition-all"
                :class="activeOffer === i ? 'bg-primary-600 w-6' : 'bg-gray-300'"
                :aria-label="`Oferta ${i + 1}`"
              />
            </div>
            <button @click="nextOffer" class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm" aria-label="Próxima oferta">
              <Icon icon="mdi:chevron-right" class="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Depoimentos Reais — Dark Section -->
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
              <div class="w-10 h-10 bg-primary-500/20 border border-primary-500/30 rounded-full flex items-center justify-center mr-3 font-bold text-white text-xs">
                {{ t.avatar }}
              </div>
              <div>
                <h4 class="font-semibold text-white text-sm">{{ t.name }}</h4>
                <p class="text-[11px] text-blue-300">{{ t.company }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA — Dark Navy -->
    <section class="cta-section">
      <div class="container text-center">
        <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-3">Dê o Próximo Passo</span>
        <h2 class="text-2xl md:text-4xl font-extrabold text-white mb-4">Pronto para Acelerar Seus Resultados?</h2>
        <p class="text-sm text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Entre em contato hoje mesmo e descubra como a 3W Online pode construir sua presença digital e gerar mais clientes para sua empresa.
        </p>
        <div class="flex flex-col sm:flex-row gap-3.5 justify-center">
          <RouterLink to="/contato" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-sm shadow-xl font-bold">
            <Icon icon="mdi:file-document-edit-outline" class="w-4 h-4 mr-2" />
            Solicitar Proposta Comercial
          </RouterLink>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import PriceSimulator from '@/components/PriceSimulator.vue'

const activeOffer = ref(0)
const offers = [0, 1, 2]
let carouselInterval: ReturnType<typeof setInterval> | null = null

const activeSimType = ref('website')
const simulatorTypes = [
  { id: 'website', label: 'Criação de Sites', icon: 'mdi:web' },
  { id: 'ads', label: 'Gestão de Anúncios', icon: 'mdi:bullseye-arrow' },
  { id: 'social-media', label: 'Redes Sociais', icon: 'mdi:instagram' },
  { id: 'system', label: 'Sistemas Web', icon: 'mdi:application-cog-outline' },
  { id: 'app', label: 'Apps Mobile', icon: 'mdi:cellphone' },
  { id: 'design', label: 'Design Gráfico', icon: 'mdi:palette' },
]

const nextOffer = () => {
  activeOffer.value = (activeOffer.value + 1) % offers.length
}
const prevOffer = () => {
  activeOffer.value = (activeOffer.value - 1 + offers.length) % offers.length
}

onMounted(() => {
  carouselInterval = setInterval(nextOffer, 6000)
})
onUnmounted(() => {
  if (carouselInterval) clearInterval(carouselInterval)
})

const stats = [
  { value: '150+', label: 'Projetos Entregues com Sucesso' },
  { value: '98%', label: 'Índice de Satisfação de Clientes' },
  { value: '5+ Anos', label: 'de Experiência no Mercado' },
  { value: '120+', label: 'Ferramentas Digitais Gratuitas' },
]

const services = [
  { id: 1, title: 'Criação de Sites', description: 'Sites institucionais modernos, landing pages de alta conversão e e-commerces com SEO avançado.', icon: 'mdi:web', iconBg: 'bg-blue-600', link: '/servicos/criacao-sites' },
  { id: 2, title: 'Sistemas Web Sob Medida', description: 'ERPs leves, CRMs, painéis de gestão e plataformas customizadas para sua operação.', icon: 'mdi:application-cog-outline', iconBg: 'bg-slate-700', link: '/servicos/criacao-sistemas' },
  { id: 3, title: 'Automação & Inteligência Artificial', description: 'Chatbots inteligentes, automações de atendimento no WhatsApp e integrações via API.', icon: 'mdi:robot-outline', iconBg: 'bg-purple-600', link: '/servicos/automacao-ia' },
  { id: 4, title: 'Gestão de Anúncios (Google & Meta)', description: 'Campanhas de tráfego pago de alta performance focadas em ROI e geração constante de leads.', icon: 'mdi:bullseye-arrow', iconBg: 'bg-emerald-600', link: '/servicos/gestao-anuncios' },
  { id: 5, title: 'Gestão de Redes Sociais', description: 'Planejamento editorial, design profissional, vídeos curtos e gestão de autoridade no Instagram e redes sociais.', icon: 'mdi:instagram', iconBg: 'bg-pink-600', link: '/servicos/gestao-redes-sociais' },
  { id: 6, title: 'Desenvolvimento de Apps', description: 'Aplicativos mobile modernos para iOS e Android com sincronização em tempo real.', icon: 'mdi:cellphone', iconBg: 'bg-cyan-600', link: '/servicos/desenvolvimento-apps' },
]

const featuredTools = [
  { name: 'Calculadora de ROI', desc: 'Calcule o retorno sobre investimento das suas campanhas de marketing.', icon: 'mdi:calculator-variant-outline', iconBg: 'bg-emerald-600', path: '/ferramentas/calculadora-roi' },
  { name: 'Gerador de QR Code', desc: 'Crie QR Codes personalizados para links, PIX, Wi-Fi e WhatsApp.', icon: 'mdi:qrcode', iconBg: 'bg-blue-600', path: '/ferramentas/gerador-qrcode' },
  { name: 'Gerador de CPF & CNPJ', desc: 'Gere documentos válidos instantaneamente para desenvolvimento e testes.', icon: 'mdi:card-account-details-outline', iconBg: 'bg-indigo-600', path: '/ferramentas/gerador-cpf-cnpj' },
  { name: 'Gerador de Senhas Fortes', desc: 'Crie senhas criptograficamente seguras com caracteres personalizados.', icon: 'mdi:lock-outline', iconBg: 'bg-amber-600', path: '/ferramentas/gerador-senha' },
  { name: 'Margem de Lucro & Markup', desc: 'Calcule margem bruta, margem líquida e preço ideal de venda.', icon: 'mdi:cash-multiple', iconBg: 'bg-teal-600', path: '/ferramentas/calculadora-margem-lucro' },
  { name: 'Conversor JSON / YAML', desc: 'Converta estruturas de dados entre JSON e YAML com validação de sintaxe.', icon: 'mdi:code-json', iconBg: 'bg-purple-600', path: '/ferramentas/conversor-json-yaml' },
  { name: 'Validador de CEP', desc: 'Consulte e valide CEPs brasileiros com preenchimento automático de endereço.', icon: 'mdi:map-marker-check-outline', iconBg: 'bg-cyan-600', path: '/ferramentas/validador-cep' },
  { name: 'Gerador de Gradientes CSS', desc: 'Crie gradientes modernos em CSS com código pronto para copiar.', icon: 'mdi:palette-swatch-outline', iconBg: 'bg-pink-600', path: '/ferramentas/gerador-gradiente' },
]

const howItWorks = [
  { title: '1. Diagnóstico & Descoberta', desc: 'Entendemos seu mercado, concorrentes e objetivos para traçar a melhor estratégia.' },
  { title: '2. Proposta & Planejamento', desc: 'Apresentamos um escopo transparente com prazos, entregáveis e estimativa de investimento.' },
  { title: '3. Execução de Alta Performance', desc: 'Desenvolvimento e implementação ágil com validação contínua e foco em qualidade.' },
  { title: '4. Lançamento & Acompanhamento', desc: 'Entrega, treinamento, monitoramento de métricas e suporte contínuo para o seu sucesso.' },
]

const testimonials = [
  { id: 1, name: 'João Silva', company: 'Silva & Associados', avatar: 'JS', text: 'A 3W Online transformou nossa presença digital. O novo site e a gestão de anúncios aumentaram nossas vendas em 300% em apenas 6 meses!' },
  { id: 2, name: 'Maria Santos', company: 'Boutique Elegance', avatar: 'MS', text: 'Profissionalismo e qualidade técnica excepcionais. Nosso site ficou rápido, elegante e o WhatsApp não para de receber novos contatos todo dia!' },
  { id: 3, name: 'Carlos Mendes', company: 'Logística Express', avatar: 'CM', text: 'O sistema web desenvolvido sob medida automatizou nossos processos internos. Economizamos mais de 50 horas de trabalho manual por semana!' },
]
</script>
