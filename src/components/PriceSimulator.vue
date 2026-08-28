<template>
  <div class="price-simulator">
    <div class="flex items-center gap-2 mb-2">
      <Icon icon="mdi:calculator" class="w-6 h-6 text-primary-600" />
      <h3 class="text-lg font-bold text-gray-900">Simulador de Orçamento</h3>
    </div>
    <p class="text-sm text-gray-600 mb-6">
      <Icon icon="mdi:information-outline" class="w-4 h-4 inline mr-1" />
      Configure suas necessidades e receba uma prévia de orçamento personalizado.
    </p>

    <div class="space-y-4">
      <!-- Social Media Fields -->
      <template v-if="serviceType === 'social-media'">
        <div>
          <label class="form-label">Quantas redes sociais deseja gerenciar?</label>
          <select v-model="form.socialNetworks" class="form-select" autocomplete="off">
            <option value="1">1 Rede Social</option>
            <option value="2">2 Redes Sociais</option>
            <option value="3">3 Redes Sociais</option>
            <option value="4">4 Redes Sociais</option>
            <option value="5">5+ Redes Sociais</option>
          </select>
        </div>
        <div>
          <label class="form-label">Frequência de postagens</label>
          <select v-model="form.postFrequency" class="form-select" autocomplete="off">
            <option value="3">3x por semana</option>
            <option value="5">5x por semana (Seg-Sex)</option>
            <option value="7">Diário (7x por semana)</option>
          </select>
        </div>
        <div>
          <label class="form-label">Criação de conteúdo inclui</label>
          <select v-model="form.contentType" class="form-select" autocomplete="off">
            <option value="feed">Apenas Feed (imagens)</option>
            <option value="feed-stories">Feed + Stories</option>
            <option value="feed-stories-reels">Feed + Stories + Reels</option>
            <option value="completo">Completo (Feed + Stories + Reels + Lives)</option>
          </select>
        </div>
        <div>
          <label class="form-label">Relatório de desempenho</label>
          <select v-model="form.reportFrequency" class="form-select" autocomplete="off">
            <option value="mensal">Mensal</option>
            <option value="quinzenal">Quinzenal</option>
            <option value="semanal">Semanal</option>
          </select>
        </div>
      </template>

      <!-- Ads Fields -->
      <template v-if="serviceType === 'ads'">
        <div>
          <label class="form-label">Plataformas de anúncios</label>
          <select v-model="form.adsPlatform" class="form-select" autocomplete="off">
            <option value="google">Apenas Google Ads</option>
            <option value="meta">Apenas Meta Ads (Facebook/Instagram)</option>
            <option value="both">Google Ads + Meta Ads</option>
            <option value="all">Google Ads + Meta Ads + TikTok Ads</option>
          </select>
        </div>
        <div>
          <label class="form-label">Investimento mensal em mídia (verba de anúncios)</label>
          <select v-model="form.adsBudget" class="form-select" autocomplete="off">
            <option value="500">Até R$ 500/mês</option>
            <option value="1000">R$ 500 a R$ 1.000/mês</option>
            <option value="2000">R$ 1.000 a R$ 2.000/mês</option>
            <option value="5000">R$ 2.000 a R$ 5.000/mês</option>
            <option value="10000">R$ 5.000 a R$ 10.000/mês</option>
            <option value="20000">Acima de R$ 10.000/mês</option>
          </select>
        </div>
        <div>
          <label class="form-label">Objetivo principal</label>
          <select v-model="form.adsGoal" class="form-select" autocomplete="off">
            <option value="leads">Geração de Leads</option>
            <option value="vendas">Vendas Online (E-commerce)</option>
            <option value="trafego">Tráfego para o Site</option>
            <option value="branding">Reconhecimento de Marca</option>
            <option value="app">Instalações de App</option>
          </select>
        </div>
        <div>
          <label class="form-label">Inclui criação de landing pages?</label>
          <select v-model="form.adsLanding" class="form-select" autocomplete="off">
            <option value="nao">Não</option>
            <option value="1">Sim, 1 landing page</option>
            <option value="3">Sim, até 3 landing pages</option>
          </select>
        </div>
      </template>

      <!-- Website Fields -->
      <template v-if="serviceType === 'website'">
        <div>
          <label class="form-label">Tipo de site</label>
          <select v-model="form.websiteType" class="form-select" autocomplete="off">
            <option value="onepage">Landing Page / One Page</option>
            <option value="institucional">Site Institucional (até 10 páginas)</option>
            <option value="institucional-plus">Site Institucional Completo (10+ páginas)</option>
            <option value="ecommerce-small">E-commerce (até 100 produtos)</option>
            <option value="ecommerce-large">E-commerce (100+ produtos)</option>
            <option value="portal">Blog/Portal de Conteúdo</option>
          </select>
        </div>
        <div>
          <label class="form-label">Design</label>
          <select v-model="form.websiteDesign" class="form-select" autocomplete="off">
            <option value="template">Template personalizado</option>
            <option value="custom">Design exclusivo (do zero)</option>
          </select>
        </div>
        <div>
          <label class="form-label">Funcionalidades extras</label>
          <select v-model="form.websiteFeatures" class="form-select" autocomplete="off">
            <option value="basico">Básico (formulário, mapa, redes sociais)</option>
            <option value="intermediario">Intermediário (blog, chat, integrações)</option>
            <option value="avancado">Avançado (login, painel admin, API)</option>
          </select>
        </div>
        <div>
          <label class="form-label">SEO e marketing digital</label>
          <select v-model="form.websiteSeo" class="form-select" autocomplete="off">
            <option value="basico">SEO básico (meta tags, sitemap)</option>
            <option value="avancado">SEO avançado + Google Analytics + Pixels</option>
          </select>
        </div>
      </template>

      <!-- App Fields -->
      <template v-if="serviceType === 'app'">
        <div>
          <label class="form-label">Plataforma</label>
          <select v-model="form.appPlatform" class="form-select" autocomplete="off">
            <option value="android">Apenas Android</option>
            <option value="ios">Apenas iOS</option>
            <option value="both">Android + iOS (Híbrido)</option>
          </select>
        </div>
        <div>
          <label class="form-label">Tipo de aplicativo</label>
          <select v-model="form.appType" class="form-select" autocomplete="off">
            <option value="simples">App Simples (informativo/catálogo)</option>
            <option value="intermediario">App Intermediário (login, perfil, notificações)</option>
            <option value="complexo">App Complexo (pagamentos, geolocalização, chat)</option>
            <option value="marketplace">Marketplace / App com múltiplos usuários</option>
          </select>
        </div>
        <div>
          <label class="form-label">Design UI/UX</label>
          <select v-model="form.appDesign" class="form-select" autocomplete="off">
            <option value="template">Baseado em componentes padrão</option>
            <option value="custom">Design exclusivo UI/UX</option>
          </select>
        </div>
        <div>
          <label class="form-label">Backend / API</label>
          <select v-model="form.appBackend" class="form-select" autocomplete="off">
            <option value="existente">Usar API/backend existente</option>
            <option value="novo">Criar backend do zero</option>
          </select>
        </div>
      </template>

      <!-- System Fields -->
      <template v-if="serviceType === 'system'">
        <div>
          <label class="form-label">Tipo de sistema</label>
          <select v-model="form.systemType" class="form-select" autocomplete="off">
            <option value="crm">CRM (Gestão de Clientes)</option>
            <option value="erp">ERP / Gestão Empresarial</option>
            <option value="agendamento">Sistema de Agendamento</option>
            <option value="estoque">Controle de Estoque</option>
            <option value="financeiro">Financeiro / Faturamento</option>
            <option value="educacional">Plataforma EAD/Educacional</option>
            <option value="saas">SaaS (Software como Serviço)</option>
            <option value="personalizado">Sistema 100% Personalizado</option>
          </select>
        </div>
        <div>
          <label class="form-label">Número de módulos/funcionalidades</label>
          <select v-model="form.systemModules" class="form-select" autocomplete="off">
            <option value="3">Até 3 módulos</option>
            <option value="5">4-6 módulos</option>
            <option value="8">7-10 módulos</option>
            <option value="12">10+ módulos</option>
          </select>
        </div>
        <div>
          <label class="form-label">Integrações externas</label>
          <select v-model="form.systemIntegrations" class="form-select" autocomplete="off">
            <option value="0">Nenhuma</option>
            <option value="2">1-2 integrações (ex: pagamento, e-mail)</option>
            <option value="5">3-5 integrações</option>
            <option value="8">6+ integrações complexas</option>
          </select>
        </div>
        <div>
          <label class="form-label">Número estimado de usuários</label>
          <select v-model="form.systemUsers" class="form-select" autocomplete="off">
            <option value="10">Até 10 usuários</option>
            <option value="50">11-50 usuários</option>
            <option value="200">51-200 usuários</option>
            <option value="1000">200+ usuários</option>
          </select>
        </div>
      </template>

      <!-- Consulting Fields -->
      <template v-if="serviceType === 'consulting'">
        <div>
          <label class="form-label">Tipo de consultoria</label>
          <select v-model="form.consultingType" class="form-select" autocomplete="off">
            <option value="diagnostico">Diagnóstico + Plano de Ação</option>
            <option value="acompanhamento">Acompanhamento Mensal</option>
            <option value="imersao">Imersão Estratégica (workshop)</option>
          </select>
        </div>
        <div>
          <label class="form-label">Canais a serem analisados</label>
          <select v-model="form.consultingChannels" class="form-select" autocomplete="off">
            <option value="1">1-2 canais</option>
            <option value="3">3-4 canais</option>
            <option value="5">5+ canais (análise completa)</option>
          </select>
        </div>
        <div>
          <label class="form-label">Inclui análise de concorrência?</label>
          <select v-model="form.consultingCompetitor" class="form-select" autocomplete="off">
            <option value="nao">Não</option>
            <option value="3">Sim (até 3 concorrentes)</option>
            <option value="5">Sim (até 5 concorrentes)</option>
          </select>
        </div>
      </template>

      <!-- Campaign Fields -->
      <template v-if="serviceType === 'campaign'">
        <div>
          <label class="form-label">Tipo de campanha</label>
          <select v-model="form.campaignType" class="form-select" autocomplete="off">
            <option value="digital">Campanha 100% Digital</option>
            <option value="mista">Campanha Mista (Digital + Offline)</option>
            <option value="lancamento">Lançamento de Produto/Serviço</option>
            <option value="sazonal">Campanha Sazonal/Promocional</option>
          </select>
        </div>
        <div>
          <label class="form-label">Duração da campanha</label>
          <select v-model="form.campaignDuration" class="form-select" autocomplete="off">
            <option value="7">1 semana</option>
            <option value="15">15 dias</option>
            <option value="30">30 dias</option>
            <option value="60">60+ dias</option>
          </select>
        </div>
        <div>
          <label class="form-label">Produção de materiais</label>
          <select v-model="form.campaignMaterials" class="form-select" autocomplete="off">
            <option value="basico">Básico (peças para redes sociais)</option>
            <option value="intermediario">Intermediário (redes + e-mail + banner)</option>
            <option value="completo">Completo (redes + vídeo + material impresso)</option>
          </select>
        </div>
      </template>

      <!-- Design Fields -->
      <template v-if="serviceType === 'design'">
        <div>
          <label class="form-label">Tipo de projeto</label>
          <select v-model="form.designType" class="form-select" autocomplete="off">
            <option value="logo">Logo / Marca</option>
            <option value="identidade">Identidade Visual Completa</option>
            <option value="social">Pacote Social Media (templates)</option>
            <option value="material">Material Impresso (cartão, folder, catálogo)</option>
            <option value="embalagem">Design de Embalagem</option>
            <option value="apresentacao">Apresentação Corporativa</option>
          </select>
        </div>
        <div>
          <label class="form-label">Quantidade de peças/variações</label>
          <select v-model="form.designQuantity" class="form-select" autocomplete="off">
            <option value="1">1-3 peças</option>
            <option value="5">4-8 peças</option>
            <option value="10">9-15 peças</option>
            <option value="20">16+ peças (pacote)</option>
          </select>
        </div>
        <div>
          <label class="form-label">Precisa de manual de marca?</label>
          <select v-model="form.designManual" class="form-select" autocomplete="off">
            <option value="nao">Não</option>
            <option value="basico">Sim, básico (logo + cores + tipografia)</option>
            <option value="completo">Sim, completo (com aplicações e regras)</option>
          </select>
        </div>
      </template>

      <!-- Advertising Fields -->
      <template v-if="serviceType === 'advertising'">
        <div>
          <label class="form-label">Canais de publicidade</label>
          <select v-model="form.advertisingChannels" class="form-select" autocomplete="off">
            <option value="digital">Apenas Digital</option>
            <option value="offline">Apenas Offline (TV, rádio, outdoor)</option>
            <option value="misto">Digital + Offline (integrado)</option>
          </select>
        </div>
        <div>
          <label class="form-label">Abrangência</label>
          <select v-model="form.advertisingReach" class="form-select" autocomplete="off">
            <option value="local">Local (cidade/bairro)</option>
            <option value="regional">Regional (estado)</option>
            <option value="nacional">Nacional</option>
          </select>
        </div>
        <div>
          <label class="form-label">Produção de conteúdo</label>
          <select v-model="form.advertisingProduction" class="form-select" autocomplete="off">
            <option value="basico">Peças gráficas (estático)</option>
            <option value="video">Vídeo institucional/publicitário</option>
            <option value="completo">Pacote completo (gráfico + vídeo + áudio)</option>
          </select>
        </div>
      </template>

      <!-- Business Organization Fields -->
      <template v-if="serviceType === 'business'">
        <div>
          <label class="form-label">Tamanho da equipe comercial</label>
          <select v-model="form.businessTeam" class="form-select" autocomplete="off">
            <option value="1">1-2 pessoas</option>
            <option value="5">3-5 pessoas</option>
            <option value="10">6-10 pessoas</option>
            <option value="20">10+ pessoas</option>
          </select>
        </div>
        <div>
          <label class="form-label">Já possui CRM?</label>
          <select v-model="form.businessCrm" class="form-select" autocomplete="off">
            <option value="nao">Não, preciso implementar</option>
            <option value="sim-ajuste">Sim, mas preciso otimizar</option>
            <option value="sim-troca">Sim, mas quero trocar</option>
          </select>
        </div>
        <div>
          <label class="form-label">Inclui treinamento da equipe?</label>
          <select v-model="form.businessTraining" class="form-select" autocomplete="off">
            <option value="nao">Não</option>
            <option value="basico">Sim, treinamento básico (1 sessão)</option>
            <option value="completo">Sim, programa completo (4 sessões)</option>
          </select>
        </div>
      </template>

      <!-- PR Fields -->
      <template v-if="serviceType === 'pr'">
        <div>
          <label class="form-label">Tipo de assessoria</label>
          <select v-model="form.prType" class="form-select" autocomplete="off">
            <option value="assessoria">Assessoria de Imprensa contínua</option>
            <option value="pontual">Projeto pontual (evento/lançamento)</option>
            <option value="crise">Gestão de Crise</option>
          </select>
        </div>
        <div>
          <label class="form-label">Abrangência de mídia</label>
          <select v-model="form.prMedia" class="form-select" autocomplete="off">
            <option value="regional">Regional</option>
            <option value="nacional">Nacional</option>
            <option value="especializada">Mídia especializada/segmentada</option>
          </select>
        </div>
        <div>
          <label class="form-label">Inclui produção de conteúdo?</label>
          <select v-model="form.prContent" class="form-select" autocomplete="off">
            <option value="nao">Não (apenas distribuição)</option>
            <option value="sim">Sim (releases, artigos, comunicados)</option>
          </select>
        </div>
      </template>

      <!-- Common: Deadline -->
      <div>
        <label class="form-label">Prazo desejado</label>
        <select v-model="form.deadline" class="form-select" autocomplete="off">
          <option value="normal">Normal</option>
          <option value="urgent">Urgente (acréscimo de 30%)</option>
          <option value="express">Express (acréscimo de 60%)</option>
        </select>
        <p class="form-hint">Prazos menores têm acréscimo no valor do projeto</p>
      </div>
    </div>

    <!-- Result -->
    <div class="mt-6 p-5 bg-primary-50 rounded-xl border border-primary-200">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h4 class="font-semibold text-primary-900 text-sm">Prévia de Orçamento</h4>
          <p class="text-xs text-primary-700 mt-0.5">Valores estimados com base nas opções selecionadas</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-primary-600">
            R$ {{ calculatedPrice.toLocaleString('pt-BR') }}
          </div>
          <div class="text-xs text-primary-600 font-medium">
            {{ priceLabel }}
          </div>
        </div>
      </div>
      <p class="text-[11px] text-gray-500 mt-3 border-t border-primary-100 pt-3">
        <Icon icon="mdi:alert-circle-outline" class="w-3 h-3 inline mr-0.5" />
        Esta é uma estimativa prévia. O valor final será definido após análise detalhada do projeto.
      </p>
    </div>

    <div class="mt-4 flex flex-col sm:flex-row gap-3">
      <button @click="requestQuote" class="btn-primary flex-1 text-sm">
        <Icon icon="mdi:file-document-edit" class="w-4 h-4 mr-2" />
        Solicitar Orçamento Detalhado
      </button>
      <button @click="contactWhatsApp" class="btn-outline flex-1 text-sm !border-green-500 !text-green-600 hover:!bg-green-500 hover:!text-white">
        <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" />
        Falar no WhatsApp
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
  serviceType: string
}

const props = defineProps<Props>()

const form = reactive({
  // Social Media
  socialNetworks: '2',
  postFrequency: '5',
  contentType: 'feed-stories',
  reportFrequency: 'mensal',
  // Ads
  adsPlatform: 'both',
  adsBudget: '2000',
  adsGoal: 'leads',
  adsLanding: 'nao',
  // Website
  websiteType: 'institucional',
  websiteDesign: 'template',
  websiteFeatures: 'basico',
  websiteSeo: 'basico',
  // App
  appPlatform: 'both',
  appType: 'intermediario',
  appDesign: 'custom',
  appBackend: 'novo',
  // System
  systemType: 'crm',
  systemModules: '5',
  systemIntegrations: '2',
  systemUsers: '50',
  // Consulting
  consultingType: 'diagnostico',
  consultingChannels: '3',
  consultingCompetitor: '3',
  // Campaign
  campaignType: 'digital',
  campaignDuration: '30',
  campaignMaterials: 'intermediario',
  // Design
  designType: 'identidade',
  designQuantity: '5',
  designManual: 'basico',
  // Advertising
  advertisingChannels: 'digital',
  advertisingReach: 'local',
  advertisingProduction: 'basico',
  // Business
  businessTeam: '5',
  businessCrm: 'nao',
  businessTraining: 'basico',
  // PR
  prType: 'assessoria',
  prMedia: 'regional',
  prContent: 'sim',
  // Common
  deadline: 'normal',
})

const isRecurring = computed(() => {
  return ['social-media', 'ads', 'consulting', 'pr', 'business'].includes(props.serviceType)
})

const priceLabel = computed(() => {
  if (isRecurring.value) return '/ mês (recorrente)'
  return 'valor estimado do projeto'
})

const serviceLabel = computed(() => {
  const labels: Record<string, string> = {
    'social-media': 'Gestão de Redes Sociais',
    ads: 'Gestão de Anúncios',
    website: 'Criação de Sites',
    app: 'Desenvolvimento de App',
    system: 'Criação de Sistema',
    consulting: 'Consultoria em Marketing',
    campaign: 'Planejamento de Campanha',
    design: 'Design Gráfico',
    advertising: 'Publicidade e Propaganda',
    business: 'Organização Comercial',
    pr: 'Relações Públicas',
  }
  return labels[props.serviceType] ?? props.serviceType
})

const calculatedPrice = computed(() => {
  let basePrice = 0

  switch (props.serviceType) {
    case 'social-media': {
      const networks = parseInt(form.socialNetworks)
      const frequency = parseInt(form.postFrequency)
      const contentMultiplier: Record<string, number> = { feed: 1, 'feed-stories': 1.3, 'feed-stories-reels': 1.6, completo: 2 }
      const reportMultiplier: Record<string, number> = { mensal: 1, quinzenal: 1.15, semanal: 1.3 }
      basePrice = (600 + networks * 350) * (frequency / 5) * (contentMultiplier[form.contentType] ?? 1) * (reportMultiplier[form.reportFrequency] ?? 1)
      break
    }
    case 'ads': {
      const platformPrice: Record<string, number> = { google: 1200, meta: 1200, both: 1800, all: 2500 }
      const budget = parseInt(form.adsBudget)
      const landingPrice: Record<string, number> = { nao: 0, '1': 800, '3': 2000 }
      basePrice = (platformPrice[form.adsPlatform] ?? 1200) + budget * 0.1 + (landingPrice[form.adsLanding] ?? 0)
      break
    }
    case 'website': {
      const typePrice: Record<string, number> = { onepage: 1800, institucional: 3500, 'institucional-plus': 5500, 'ecommerce-small': 8000, 'ecommerce-large': 14000, portal: 6000 }
      const designMultiplier: Record<string, number> = { template: 1, custom: 1.5 }
      const featureMultiplier: Record<string, number> = { basico: 1, intermediario: 1.3, avancado: 1.6 }
      const seoPrice: Record<string, number> = { basico: 0, avancado: 800 }
      basePrice = (typePrice[form.websiteType] ?? 3500) * (designMultiplier[form.websiteDesign] ?? 1) * (featureMultiplier[form.websiteFeatures] ?? 1) + (seoPrice[form.websiteSeo] ?? 0)
      break
    }
    case 'app': {
      const platformMultiplier: Record<string, number> = { android: 1, ios: 1, both: 1.6 }
      const typePrice: Record<string, number> = { simples: 8000, intermediario: 15000, complexo: 25000, marketplace: 40000 }
      const designMultiplier: Record<string, number> = { template: 0.85, custom: 1 }
      const backendMultiplier: Record<string, number> = { existente: 0.7, novo: 1 }
      basePrice = (typePrice[form.appType] ?? 15000) * (platformMultiplier[form.appPlatform] ?? 1) * (designMultiplier[form.appDesign] ?? 1) * (backendMultiplier[form.appBackend] ?? 1)
      break
    }
    case 'system': {
      const typeBase: Record<string, number> = { crm: 15000, erp: 25000, agendamento: 8000, estoque: 12000, financeiro: 18000, educacional: 22000, saas: 30000, personalizado: 20000 }
      const modules = parseInt(form.systemModules)
      const integrations = parseInt(form.systemIntegrations)
      const usersMultiplier: Record<string, number> = { '10': 1, '50': 1.1, '200': 1.25, '1000': 1.5 }
      basePrice = ((typeBase[form.systemType] ?? 15000) + modules * 2000 + integrations * 1500) * (usersMultiplier[form.systemUsers] ?? 1)
      break
    }
    case 'consulting': {
      const typePrice: Record<string, number> = { diagnostico: 2500, acompanhamento: 3500, imersao: 5000 }
      const channels = parseInt(form.consultingChannels)
      const competitorPrice: Record<string, number> = { nao: 0, '3': 800, '5': 1500 }
      basePrice = (typePrice[form.consultingType] ?? 2500) + channels * 300 + (competitorPrice[form.consultingCompetitor] ?? 0)
      break
    }
    case 'campaign': {
      const typePrice: Record<string, number> = { digital: 4000, mista: 7000, lancamento: 8000, sazonal: 5000 }
      const durationMultiplier: Record<string, number> = { '7': 0.7, '15': 0.85, '30': 1, '60': 1.4 }
      const materialsMultiplier: Record<string, number> = { basico: 1, intermediario: 1.4, completo: 2 }
      basePrice = (typePrice[form.campaignType] ?? 4000) * (durationMultiplier[form.campaignDuration] ?? 1) * (materialsMultiplier[form.campaignMaterials] ?? 1)
      break
    }
    case 'design': {
      const typePrice: Record<string, number> = { logo: 1200, identidade: 2500, social: 1000, material: 800, embalagem: 1500, apresentacao: 800 }
      const quantity = parseInt(form.designQuantity)
      const manualPrice: Record<string, number> = { nao: 0, basico: 600, completo: 1500 }
      basePrice = (typePrice[form.designType] ?? 1200) + quantity * 150 + (manualPrice[form.designManual] ?? 0)
      break
    }
    case 'advertising': {
      const channelPrice: Record<string, number> = { digital: 5000, offline: 8000, misto: 12000 }
      const reachMultiplier: Record<string, number> = { local: 1, regional: 1.5, nacional: 2.5 }
      const productionMultiplier: Record<string, number> = { basico: 1, video: 1.8, completo: 2.5 }
      basePrice = (channelPrice[form.advertisingChannels] ?? 5000) * (reachMultiplier[form.advertisingReach] ?? 1) * (productionMultiplier[form.advertisingProduction] ?? 1)
      break
    }
    case 'business': {
      const team = parseInt(form.businessTeam)
      const crmPrice: Record<string, number> = { nao: 2000, 'sim-ajuste': 1000, 'sim-troca': 1500 }
      const trainingPrice: Record<string, number> = { nao: 0, basico: 1500, completo: 4000 }
      basePrice = 2500 + team * 300 + (crmPrice[form.businessCrm] ?? 0) + (trainingPrice[form.businessTraining] ?? 0)
      break
    }
    case 'pr': {
      const typePrice: Record<string, number> = { assessoria: 3500, pontual: 5000, crise: 8000 }
      const mediaMultiplier: Record<string, number> = { regional: 1, nacional: 1.8, especializada: 1.4 }
      const contentPrice: Record<string, number> = { nao: 0, sim: 1200 }
      basePrice = (typePrice[form.prType] ?? 3500) * (mediaMultiplier[form.prMedia] ?? 1) + (contentPrice[form.prContent] ?? 0)
      break
    }
    default:
      basePrice = 1500
  }

  const deadlineMultiplier: Record<string, number> = { normal: 1, urgent: 1.3, express: 1.6 }
  return Math.round(basePrice * (deadlineMultiplier[form.deadline] ?? 1))
})

function requestQuote(): void {
  const message = `Olá! Fiz uma simulação no site e gostaria de um orçamento detalhado.\n\nServiço: ${serviceLabel.value}\nEstimativa: R$ ${calculatedPrice.value.toLocaleString('pt-BR')} ${isRecurring.value ? '/mês' : ''}\nPrazo: ${form.deadline}\n\nPodemos conversar sobre o projeto?`
  window.open(`https://wa.me/5541996924829?text=${encodeURIComponent(message)}`, '_blank')
}

function contactWhatsApp(): void {
  const message = `Olá! Tenho interesse no serviço de ${serviceLabel.value} e gostaria de conversar sobre meu projeto.`
  window.open(`https://wa.me/5541996924829?text=${encodeURIComponent(message)}`, '_blank')
}
</script>
