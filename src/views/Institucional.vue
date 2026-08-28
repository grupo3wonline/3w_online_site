<template>
  <div class="institucional-page">
    <!-- Hero Section — Dark Navy -->
    <section class="page-hero relative overflow-hidden">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Institucional' }]" />

        <div class="max-w-3xl mt-4">
          <div class="inline-flex items-center gap-2 bg-primary-500/20 text-blue-200 border border-primary-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-4">
            <Icon icon="mdi:shield-account" class="w-3.5 h-3.5 text-secondary-400" />
            <span>Governança, Conformidade & Transparência</span>
          </div>

          <h1 class="page-hero-title">
            Grupo 3W Online Soluções Digitais
          </h1>
          <p class="page-hero-subtitle">
            Transformando negócios através da engenharia de software, inteligência artificial e marketing digital de alta performance desde 2019.
          </p>

          <div class="flex flex-wrap gap-3.5 mt-6">
            <RouterLink to="/contato" class="btn-primary text-xs sm:text-sm shadow-lg">
              <Icon icon="mdi:email-fast-outline" class="w-4 h-4 mr-1.5" />
              Falar com a Diretoria
            </RouterLink>
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de conversar com a 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary text-xs sm:text-sm shadow-lg"
            >
              <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1.5" />
              Canal WhatsApp Corporativo
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Visão Geral Institucional -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="section-label">Quem Somos</span>
            <h2 class="section-title">Mais do que uma Agência: Sua Parceira de Engenharia & Crescimento</h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-4">
              No <strong>Grupo 3W Online</strong>, acreditamos que a inovação nasce da coragem de desafiar o convencional e explorar novas tecnologias com rigor técnico. Nossa missão é impulsionar a mudança sustentável e fornecer ferramentas digitais de alto impacto para empresas em todo o Brasil.
            </p>
            <p class="text-sm text-gray-600 leading-relaxed mb-4">
              Iniciamos nossas atividades em 2019 em Curitiba com foco em desenvolvimento web e campanhas de conversão. Ao longo dessa jornada, evoluímos para uma software house moderna e agência full service, entregando mais de 150 projetos de alta complexidade.
            </p>
            <p class="text-sm text-gray-600 leading-relaxed mb-6">
              Nosso compromisso é com parcerias duradouras, métricas transparentes e total conformidade com as legislações brasileiras e padrões de segurança de dados.
            </p>

            <!-- Métricas Principais -->
            <div class="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
              <div class="text-center p-3 bg-slate-50 rounded-xl border border-gray-100">
                <div class="text-2xl sm:text-3xl font-extrabold text-primary-600">150+</div>
                <div class="text-[11px] text-gray-500 font-medium">Projetos Entregues</div>
              </div>
              <div class="text-center p-3 bg-slate-50 rounded-xl border border-gray-100">
                <div class="text-2xl sm:text-3xl font-extrabold text-primary-600">5+</div>
                <div class="text-[11px] text-gray-500 font-medium">Anos de Atuação</div>
              </div>
              <div class="text-center p-3 bg-slate-50 rounded-xl border border-gray-100">
                <div class="text-2xl sm:text-3xl font-extrabold text-primary-600">98%</div>
                <div class="text-[11px] text-gray-500 font-medium">Aprovação de Clientes</div>
              </div>
            </div>
          </div>

          <div class="relative">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Ambiente Corporativo 3W Online"
              class="w-full h-auto rounded-2xl shadow-xl border border-gray-100"
              loading="lazy"
              width="800"
              height="533"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Pilares Fundamentais: Missão, Visão e Valores -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
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

    <!-- Dados Jurídicos, Fiscais e Compliance B2B -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Transparência B2B</span>
          <h2 class="section-title">Informações Jurídicas & Fiscais</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Todos os dados necessários para cadastro e homologação de fornecedores corporativos.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Card Jurídico -->
          <div class="card p-6 sm:p-8 bg-slate-50 border border-gray-200">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div class="w-10 h-10 rounded-lg bg-primary-600 text-white flex items-center justify-center shrink-0">
                <Icon icon="mdi:domain" class="w-6 h-6" />
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-base">Identificação da Empresa</h3>
                <p class="text-xs text-gray-500">Dados cadastrais oficiais da Receita Federal</p>
              </div>
            </div>

            <dl class="space-y-3.5 text-xs">
              <div class="flex justify-between border-b border-gray-200/60 pb-2">
                <dt class="text-gray-500 font-medium">Razão Social:</dt>
                <dd class="text-gray-900 font-bold text-right">3W Online Soluções Digitais</dd>
              </div>
              <div class="flex justify-between border-b border-gray-200/60 pb-2">
                <dt class="text-gray-500 font-medium">Nome Fantasia:</dt>
                <dd class="text-gray-900 font-bold text-right">Grupo 3W Online</dd>
              </div>
              <div class="flex justify-between border-b border-gray-200/60 pb-2">
                <dt class="text-gray-500 font-medium">Sede / Município:</dt>
                <dd class="text-gray-900 font-medium text-right">Curitiba, Paraná — Brasil</dd>
              </div>
              <div class="flex justify-between border-b border-gray-200/60 pb-2">
                <dt class="text-gray-500 font-medium">Ano de Fundação:</dt>
                <dd class="text-gray-900 font-medium text-right">2019</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-500 font-medium">Enquadramento Tributário:</dt>
                <dd class="text-gray-900 font-medium text-right">Simples Nacional (Emissão de NF-e)</dd>
              </div>
            </dl>
          </div>

          <!-- Card de Contatos Oficiais & Compliance -->
          <div class="card p-6 sm:p-8 bg-slate-50 border border-gray-200">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div class="w-10 h-10 rounded-lg bg-green-600 text-white flex items-center justify-center shrink-0">
                <Icon icon="mdi:shield-check" class="w-6 h-6" />
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-base">Canais Oficiais & Compliance</h3>
                <p class="text-xs text-gray-500">Atendimento direto e segurança jurídica</p>
              </div>
            </div>

            <dl class="space-y-3.5 text-xs">
              <div class="flex justify-between border-b border-gray-200/60 pb-2">
                <dt class="text-gray-500 font-medium">Telefone / WhatsApp:</dt>
                <dd class="text-gray-900 font-bold text-right">(41) 99692-4829</dd>
              </div>
              <div class="flex justify-between border-b border-gray-200/60 pb-2">
                <dt class="text-gray-500 font-medium">E-mail Corporativo:</dt>
                <dd class="text-primary-600 font-medium text-right">contato@3wonline.com.br</dd>
              </div>
              <div class="flex justify-between border-b border-gray-200/60 pb-2">
                <dt class="text-gray-500 font-medium">Proteção de Dados:</dt>
                <dd class="text-green-700 font-bold text-right">100% Conforme LGPD</dd>
              </div>
              <div class="flex justify-between border-b border-gray-200/60 pb-2">
                <dt class="text-gray-500 font-medium">Horário de Funcionamento:</dt>
                <dd class="text-gray-900 font-medium text-right">Seg–Sex: 8h às 18h</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-500 font-medium">Área de Atendimento:</dt>
                <dd class="text-gray-900 font-medium text-right">Todo o Território Nacional</dd>
              </div>
            </dl>

            <div class="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-2">
              <RouterLink to="/contato" class="btn-primary flex-1 text-center text-xs !py-2.5 justify-center">
                Enviar E-mail
              </RouterLink>
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

    <!-- Linha do Tempo / Trajetória -->
    <section class="section-padding bg-slate-50 border-t border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Histórico de Crescimento</span>
          <h2 class="section-title">Nossa Trajetória de Sucesso</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Os principais marcos que construíram a reputação da 3W Online ao longo dos anos.
          </p>
        </div>

        <div class="max-w-4xl mx-auto space-y-6">
          <div v-for="item in timeline" :key="item.year" class="flex items-start gap-4 sm:gap-6 bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 text-white flex items-center justify-center shrink-0 font-black text-sm shadow-md shadow-primary-600/20">
              {{ item.year }}
            </div>
            <div class="flex-1">
              <h3 class="text-sm sm:text-base font-bold text-gray-900 mb-1">{{ item.title }}</h3>
              <p class="text-xs text-gray-600 leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Certificações e Alianças Tecnológicas -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Credenciais</span>
          <h2 class="section-title">Certificações & Padrões Técnicos</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div v-for="cert in certifications" :key="cert.title" class="p-6 rounded-xl border border-gray-100 bg-slate-50 text-center hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" :class="cert.bgColor">
              <Icon :icon="cert.icon" class="w-6 h-6 text-white" />
            </div>
            <h4 class="font-bold text-gray-900 text-sm mb-1">{{ cert.title }}</h4>
            <p class="text-xs text-gray-500 leading-relaxed">{{ cert.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final — Dark Navy -->
    <section class="cta-section">
      <div class="container text-center">
        <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Construa o Futuro da Sua Empresa</span>
        <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-3">Pronto para iniciar sua parceria com o Grupo 3W Online?</h2>
        <p class="text-sm text-blue-200 mb-8 max-w-xl mx-auto">
          Entre em contato com nossa diretoria comercial e descubra como nossas soluções podem acelerar seus resultados.
        </p>
        <div class="flex flex-col sm:flex-row gap-3.5 justify-center">
          <RouterLink to="/contato" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-xs sm:text-sm font-bold shadow-lg">
            Solicitar Contato Comercial
          </RouterLink>
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de conversar sobre uma parceria com a 3W Online."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary text-xs sm:text-sm font-bold shadow-lg"
          >
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1.5" />
            Atendimento no WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import { useSeo } from '@/composables/useSeo'

const { applySeo } = useSeo()
applySeo({
  title: 'Institucional | Grupo 3W Online - Missão, Visão e Governança',
  description: 'Conheça o Grupo 3W Online: história, missão, visão, governança e conformidade LGPD da agência e software house em Curitiba.',
  path: '/institucional',
  keywords: 'institucional 3w online, razão social 3w online, agência curitiba pr, história 3w online',
})

const timeline = [
  {
    year: '2019',
    title: 'Fundação da 3W Online em Curitiba',
    description: 'Início das operações com foco no desenvolvimento de sites institucionais modernos e marketing digital de performance para PMEs.',
  },
  {
    year: '2020',
    title: 'Expansão para Sistemas & Aplicativos',
    description: 'Ampliação do portfólio com desenvolvimento de software sob medida, plataformas web e integração de APIs.',
  },
  {
    year: '2021',
    title: 'Consolidação em Tráfego Pago & Parcerias',
    description: 'Certificações em Google Ads e Meta Ads, atingindo mais de 50 projetos entregues com alto retorno sobre investimento.',
  },
  {
    year: '2022',
    title: 'Atendimento em Escala Nacional',
    description: 'Expansão da carteira de clientes para múltiplos estados do Brasil com suporte remoto ágil e de alta qualidade.',
  },
  {
    year: '2023',
    title: 'Pioneirismo em Automação & Inteligência Artificial',
    description: 'Implantação de agentes inteligentes com LLMs, automações de WhatsApp e ferramentas de produtividade para empresas.',
  },
  {
    year: '2024+',
    title: 'Marca de 150+ Projetos & Suíte de 120+ Ferramentas',
    description: 'Lançamento da suíte digital com mais de 120 utilitários gratuitos client-side e consolidação como referência em tecnologia.',
  },
]

const certifications = [
  {
    title: 'Google Partner',
    desc: 'Especialistas certificados em Google Ads, Search, Display e Analytics.',
    icon: 'mdi:google',
    bgColor: 'bg-blue-600',
  },
  {
    title: 'Meta Business',
    desc: 'Gestão avançada de campanhas no Facebook Ads e Instagram Ads.',
    icon: 'mdi:facebook',
    bgColor: 'bg-indigo-600',
  },
  {
    title: 'LGPD Compliance',
    desc: 'Processamento de dados em conformidade rigorosa com a legislação brasileira.',
    icon: 'mdi:shield-check',
    bgColor: 'bg-emerald-600',
  },
  {
    title: 'Cloud de Alta Performance',
    desc: 'Arquiteturas resilientes com CDN global e SSL de alta criptografia.',
    icon: 'mdi:cloud-check',
    bgColor: 'bg-purple-600',
  },
]
</script>