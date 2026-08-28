<template>
  <div class="contact-page">
    <!-- Hero — Dark Navy -->
    <section class="page-hero relative overflow-hidden">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Contato & Orçamento' }]" />

        <div class="max-w-3xl mt-4">
          <div class="inline-flex items-center gap-2 bg-primary-500/20 text-blue-200 border border-primary-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-4">
            <Icon icon="mdi:clock-fast" class="w-3.5 h-3.5 text-secondary-400" />
            <span>Resposta em até 24 Horas Úteis</span>
          </div>

          <h1 class="page-hero-title">
            Fale com a 3W Online & Solicite um Orçamento Gratuito
          </h1>
          <p class="page-hero-subtitle">
            Conte-nos sobre seu projeto ou desafio digital. Nossa equipe técnica analisará suas necessidades para desenhar a melhor solução.
          </p>

          <div class="flex flex-wrap gap-3.5 mt-6">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de um orçamento para o meu negócio."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary text-xs sm:text-sm shadow-lg font-bold"
            >
              <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1.5" />
              Atendimento Imediato no WhatsApp
            </a>
            <a href="#formulario" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold">
              <Icon icon="mdi:form-select" class="w-4 h-4 mr-1.5" />
              Preencher Formulário
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Barra de Compromisso e Segurança -->
    <div class="bg-primary-50 border-b border-primary-100 py-3 text-xs text-primary-800">
      <div class="container flex flex-wrap items-center justify-center gap-4 text-center font-medium">
        <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-green-600" /> Dados 100% Protegidos pela LGPD</span>
        <span class="text-primary-300 hidden sm:inline">•</span>
        <span class="flex items-center gap-1.5"><Icon icon="mdi:handshake" class="w-4 h-4 text-blue-600" /> Orçamento Sem Compromisso</span>
        <span class="text-primary-300 hidden sm:inline">•</span>
        <span class="flex items-center gap-1.5"><Icon icon="mdi:currency-usd" class="w-4 h-4 text-emerald-600" /> Condições Facilitadas em até 12x</span>
      </div>
    </div>

    <!-- Seção Principal: Formulário + Dados de Contato -->
    <section id="formulario" class="section-padding bg-slate-50/50">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <!-- Coluna Esquerda: Formulário de Contato -->
          <div class="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md">
            <div class="flex items-center gap-2.5 mb-2 pb-3 border-b border-gray-100">
              <div class="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                <Icon icon="mdi:email-fast-outline" class="w-5 h-5" />
              </div>
              <div>
                <h2 class="text-base sm:text-lg font-bold text-gray-900">Solicitar Proposta ou Diagnóstico</h2>
                <p class="text-xs text-gray-500">Preencha os dados e receba nosso retorno prioritário</p>
              </div>
            </div>

            <form @submit.prevent="handleSubmit" novalidate class="space-y-4 pt-2">
              <!-- Áreas de Interesse (Multi-seleção com checkboxes estilizados) -->
              <div>
                <label class="form-label text-xs">Quais serviços você tem interesse?</label>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <label
                    v-for="area in areas"
                    :key="area.value"
                    class="flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all"
                    :class="form.areas.includes(area.value) ? 'bg-primary-50/70 border-primary-500 text-primary-900 font-semibold' : 'bg-slate-50 border-gray-200 text-gray-700 hover:border-primary-300'"
                  >
                    <input
                      type="checkbox"
                      v-model="form.areas"
                      :value="area.value"
                      class="h-3.5 w-3.5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                    />
                    <span>{{ area.label }}</span>
                  </label>
                </div>
              </div>

              <!-- Nome Completo -->
              <div>
                <label for="name" class="form-label text-xs">Nome Completo <span class="text-red-500">*</span></label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  :class="{ '!border-red-500': errors.name }"
                  placeholder="Ex: Carlos Silva"
                />
                <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
              </div>

              <!-- E-mail e Telefone em 2 Colunas -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="email" class="form-label text-xs">E-mail Corporativo ou Pessoal <span class="text-red-500">*</span></label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="form-input"
                    :class="{ '!border-red-500': errors.email }"
                    placeholder="carlos@empresa.com.br"
                  />
                  <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
                </div>

                <div>
                  <label for="phone" class="form-label text-xs">WhatsApp / Telefone <span class="text-red-500">*</span></label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    v-maska
                    data-maska="(##) #####-####"
                    type="tel"
                    class="form-input"
                    :class="{ '!border-red-500': errors.phone }"
                    placeholder="(41) 99999-9999"
                  />
                  <p v-if="errors.phone" class="form-error">{{ errors.phone }}</p>
                </div>
              </div>

              <!-- Nome da Empresa / Site Atual -->
              <div>
                <label for="company" class="form-label text-xs">Nome da Empresa ou Link do Site (Opcional)</label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  class="form-input"
                  placeholder="Ex: Minha Empresa LTDA ou www.minhaempresa.com.br"
                />
              </div>

              <!-- Descrição da Necessidade / Mensagem -->
              <div>
                <label for="message" class="form-label text-xs">Descreva brevemente sua necessidade <span class="text-red-500">*</span></label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="3"
                  class="form-textarea"
                  :class="{ '!border-red-500': errors.message }"
                  placeholder="Ex: Preciso de um novo site institucional e gestão de anúncios no Google para atrair mais clientes..."
                ></textarea>
                <p v-if="errors.message" class="form-error">{{ errors.message }}</p>
              </div>

              <!-- Consentimento LGPD -->
              <div class="flex items-start gap-2.5 pt-1">
                <input
                  id="privacy"
                  v-model="form.privacy"
                  type="checkbox"
                  class="mt-1 h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                />
                <label for="privacy" class="text-[11px] text-gray-600 leading-relaxed cursor-pointer">
                  Concordo com a <RouterLink to="/privacidade" class="text-primary-600 underline font-semibold">Política de Privacidade</RouterLink> e autorizo a 3W Online a entrar em contato conforme as diretrizes da LGPD. <span class="text-red-500">*</span>
                </label>
              </div>
              <p v-if="errors.privacy" class="form-error -mt-1">{{ errors.privacy }}</p>

              <!-- Botão de Envio -->
              <div class="pt-2">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="btn-primary w-full text-xs sm:text-sm !py-3 font-bold justify-center shadow-md"
                >
                  <Icon v-if="isSubmitting" icon="mdi:loading" class="w-4 h-4 mr-2 animate-spin" />
                  <Icon v-else icon="mdi:send-outline" class="w-4 h-4 mr-2" />
                  {{ isSubmitting ? 'Processando envio...' : 'Enviar Solicitação de Orçamento' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Coluna Direita: Informações de Atendimento & Canais -->
          <div class="lg:col-span-5 space-y-6">
            <!-- Card de Canais Diretos -->
            <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-5">
              <div class="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <div class="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                  <Icon icon="mdi:headset" class="w-5 h-5" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 text-sm sm:text-base">Canais Oficiais de Contato</h3>
                  <p class="text-[11px] text-gray-500">Atendimento rápido e descomplicado</p>
                </div>
              </div>

              <!-- Lista de Contatos -->
              <div class="space-y-4 text-xs">
                <div class="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-gray-100">
                  <div class="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="mdi:whatsapp" class="w-4 h-4" />
                  </div>
                  <div class="flex-1">
                    <p class="text-[10px] uppercase font-bold text-gray-400">WhatsApp & Telefone</p>
                    <a href="tel:+5541996924829" class="text-sm font-bold text-gray-900 hover:text-primary-600 transition-colors">
                      (41) 99692-4829
                    </a>
                    <p class="text-[11px] text-green-700 font-medium">Resposta em até 24 horas úteis</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-gray-100">
                  <div class="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="mdi:email-outline" class="w-4 h-4" />
                  </div>
                  <div class="flex-1">
                    <p class="text-[10px] uppercase font-bold text-gray-400">E-mail Corporativo</p>
                    <a href="mailto:contato@3wonline.com.br" class="text-xs font-bold text-gray-900 hover:text-primary-600 transition-colors">
                      contato@3wonline.com.br
                    </a>
                    <p class="text-[11px] text-gray-500">Envio de briefing e propostas</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-gray-100">
                  <div class="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="mdi:map-marker-outline" class="w-4 h-4" />
                  </div>
                  <div class="flex-1">
                    <p class="text-[10px] uppercase font-bold text-gray-400">Localização</p>
                    <p class="text-xs font-bold text-gray-900">Curitiba, Paraná — Brasil</p>
                    <p class="text-[11px] text-gray-500">Sede própria com atendimento nacional</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-gray-100">
                  <div class="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="mdi:clock-outline" class="w-4 h-4" />
                  </div>
                  <div class="flex-1">
                    <p class="text-[10px] uppercase font-bold text-gray-400">Horário de Atendimento</p>
                    <p class="text-xs font-bold text-gray-900">Segunda a Sexta: 8h às 18h</p>
                    <p class="text-[11px] text-gray-500">Atendimento em horário comercial para todo o Brasil</p>
                  </div>
                </div>
              </div>

              <!-- Redes Sociais -->
              <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span class="text-xs text-gray-500 font-medium">Acompanhe a 3W:</span>
                <div class="flex items-center gap-2">
                  <a
                    v-for="s in socials"
                    :key="s.label"
                    :href="s.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-8 h-8 bg-slate-100 hover:bg-primary-600 hover:text-white text-gray-600 rounded-full flex items-center justify-center transition-colors"
                    :aria-label="s.label"
                  >
                    <Icon :icon="s.icon" class="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulador Rápido de Orçamento na Página de Contato -->
    <section class="testimonial-section section-padding">
      <div class="container">
        <div class="text-center mb-8">
          <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Simulação Imediata</span>
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Deseja Estimar Custos Agora?</h2>
          <p class="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto">
            Utilize nosso simulador interativo abaixo para calcular um valor referencial para seu projeto.
          </p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="website" />
        </div>
      </div>
    </section>

    <!-- FAQ — Perguntas Frequentes -->
    <section class="section-padding bg-white">
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

    <!-- CTA Final — Dark Navy -->
    <section class="cta-section">
      <div class="container text-center">
        <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Atendimento Prioritário</span>
        <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-3">Sua Empresa Pronta para o Próximo Nível</h2>
        <p class="text-sm text-blue-200 mb-8 max-w-xl mx-auto">
          Inicie agora sua parceria com o Grupo 3W Online e alcance resultados mensuráveis.
        </p>
        <div class="flex flex-col sm:flex-row gap-3.5 justify-center">
          <RouterLink to="/servicos" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-xs sm:text-sm font-bold shadow-lg">
            Ver Catálogo de Serviços
          </RouterLink>
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de falar com a equipe de atendimento."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary text-xs sm:text-sm font-bold shadow-lg"
          >
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1.5" />
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import { vMaska } from 'maska/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import PriceSimulator from '@/components/PriceSimulator.vue'
import FaqAccordion from '@/components/ui/FaqAccordion.vue'
import { FAQ_ITEMS } from '@/constants/content'
import { useSeo } from '@/composables/useSeo'

const { applySeo } = useSeo()
applySeo({
  title: 'Contato & Orçamento Gratuito | 3W Online Curitiba',
  description: 'Entre em contato com a 3W Online para orçamento gratuito. WhatsApp (41) 99692-4829. Agência em Curitiba com atendimento em todo o Brasil.',
  path: '/contato',
  keywords: 'contato 3w online, orçamento criação de sites, orçamento marketing digital, whatsapp 3w online',
})

const isSubmitting = ref(false)
const errors = reactive<Record<string, string>>({})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  privacy: false,
  areas: [] as string[],
})

const areas = [
  { value: 'sites', label: 'Criação de Sites' },
  { value: 'sistemas', label: 'Sistemas Sob Medida' },
  { value: 'anuncios', label: 'Google & Meta Ads' },
  { value: 'automacao', label: 'Automação & IA' },
  { value: 'redes', label: 'Redes Sociais' },
  { value: 'apps', label: 'Apps Mobile' },
]

const socials = [
  { label: 'Instagram', url: 'https://www.instagram.com/grupo3wonline', icon: 'mdi:instagram' },
  { label: 'Facebook', url: 'https://www.facebook.com/grupo3wonline', icon: 'mdi:facebook' },
  { label: 'WhatsApp', url: 'https://wa.me/5541996924829', icon: 'mdi:whatsapp' },
]

const faqs = FAQ_ITEMS.slice(0, 6)

function validate(): boolean {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.name.trim() || form.name.trim().length < 3) errors.name = 'Informe seu nome completo'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Informe um e-mail válido'
  if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) errors.phone = 'Informe um telefone/WhatsApp válido'
  if (!form.message.trim() || form.message.trim().length < 8) errors.message = 'Por favor, descreva resumidamente sua necessidade'
  if (!form.privacy) errors.privacy = 'É necessário concordar com a Política de Privacidade'
  return Object.keys(errors).length === 0
}

async function handleSubmit() {
  if (!validate()) {
    await Swal.fire({
      icon: 'warning',
      title: 'Atenção aos Campos',
      text: 'Por favor, preencha todos os campos obrigatórios marcados.',
      confirmButtonColor: '#2563eb',
    })
    return
  }

  isSubmitting.value = true
  try {
    await new Promise((r) => setTimeout(r, 1000))
    const areasSelected = form.areas.length ? form.areas.join(', ') : 'Geral'
    const msg = `Olá! Gostaria de um orçamento pelo site da 3W Online:\n\n👤 Nome: ${form.name}\n📧 E-mail: ${form.email}\n📱 Telefone: ${form.phone}\n🏢 Empresa: ${form.company || 'Não informada'}\n🎯 Áreas de Interesse: ${areasSelected}\n💬 Mensagem: ${form.message}`

    await Swal.fire({
      icon: 'success',
      title: 'Solicitação Preparada!',
      text: 'Você será direcionado para o WhatsApp oficial para finalizar o atendimento com nossos consultores.',
      confirmButtonColor: '#2563eb',
      confirmButtonText: 'Abrir WhatsApp',
    })

    window.open(`https://wa.me/5541996924829?text=${encodeURIComponent(msg)}`, '_blank')
    Object.assign(form, { name: '', email: '', phone: '', company: '', message: '', privacy: false, areas: [] })
  } catch {
    await Swal.fire({
      icon: 'error',
      title: 'Ocorreu um erro',
      text: 'Por favor, entre em contato diretamente pelo WhatsApp: (41) 99692-4829.',
      confirmButtonColor: '#2563eb',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
