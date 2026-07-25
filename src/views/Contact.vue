<template>
  <div>
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Contato' }]" />
        <h1 class="page-hero-title">Transforme Seu Negócio Hoje Mesmo</h1>
        <p class="page-hero-subtitle">
          Mais de 150 empresas já confiam na 3W Online. Veja o que oferecemos e descubra como impulsionar seu negócio.
        </p>
        <div class="flex flex-wrap gap-3 mt-6">
          <RouterLink to="/servicos" class="btn-primary !bg-primary-500 hover:!bg-primary-600 text-sm">Orçamento Gratuito</RouterLink>
          <a href="https://wa.me/5541996924829?text=Olá! Gostaria de falar com um especialista." target="_blank" class="btn-secondary text-sm">
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1" /> Fale Conosco
          </a>
        </div>
      </div>
    </section>

    <!-- Vagas Limitadas Badge -->
    <div class="bg-green-50 border-b border-green-100 py-3">
      <div class="container flex items-center justify-center gap-2 text-xs text-green-800">
        <Icon icon="mdi:check-circle" class="w-4 h-4 text-green-600" />
        <strong>Vagas Limitadas</strong> — Agende uma consultoria gratuita enquanto ainda há vagas disponíveis
      </div>
    </div>

    <!-- Contact Section: Form + Info -->
    <section class="section-padding">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Left: Form -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <Icon icon="mdi:email-check" class="w-5 h-5 text-primary-600" />
              <h2 class="text-lg font-bold text-gray-900">Receba uma Análise Gratuita do Seu Negócio</h2>
            </div>

            <form @submit.prevent="handleSubmit" autocomplete="off" novalidate class="space-y-4">
              <!-- Áreas de interesse (checkboxes) -->
              <div>
                <label class="form-label">Áreas de interesse</label>
                <div class="grid grid-cols-2 gap-2">
                  <label v-for="area in areas" :key="area.value" class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" v-model="form.areas" :value="area.value" class="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                    {{ area.label }}
                  </label>
                </div>
              </div>

              <div>
                <label for="name" class="form-label">Nome completo <span class="text-red-500">*</span></label>
                <input id="name" v-model="form.name" type="text" autocomplete="off" class="form-input" :class="{ '!border-red-500': errors.name }" placeholder="Seu nome completo" />
                <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="email" class="form-label">E-mail <span class="text-red-500">*</span></label>
                  <input id="email" v-model="form.email" type="email" autocomplete="off" class="form-input" :class="{ '!border-red-500': errors.email }" placeholder="seu@email.com" />
                  <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
                </div>
                <div>
                  <label for="phone" class="form-label">Telefone <span class="text-red-500">*</span></label>
                  <input id="phone" v-model="form.phone" v-maska data-maska="(##) #####-####" type="tel" autocomplete="off" class="form-input" :class="{ '!border-red-500': errors.phone }" placeholder="(XX) XXXXX-XXXX" />
                  <p v-if="errors.phone" class="form-error">{{ errors.phone }}</p>
                </div>
              </div>

              <div>
                <label for="company" class="form-label">Empresa / Site</label>
                <input id="company" v-model="form.company" type="text" autocomplete="off" class="form-input" placeholder="Nome da empresa ou URL do site" />
              </div>

              <div>
                <label for="message" class="form-label">Mensagem <span class="text-red-500">*</span></label>
                <textarea id="message" v-model="form.message" rows="3" autocomplete="off" class="form-textarea" :class="{ '!border-red-500': errors.message }" placeholder="Conte-nos sobre seu projeto ou necessidade..."></textarea>
                <p v-if="errors.message" class="form-error">{{ errors.message }}</p>
              </div>

              <div class="flex items-start gap-2">
                <input id="privacy" v-model="form.privacy" type="checkbox" class="mt-1 h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                <label for="privacy" class="text-[11px] text-gray-600 leading-relaxed">
                  Concordo com a <RouterLink to="/privacidade" class="text-primary-600 underline">Política de Privacidade</RouterLink> e autorizo o contato conforme a LGPD. <span class="text-red-500">*</span>
                </label>
              </div>
              <p v-if="errors.privacy" class="form-error -mt-2">{{ errors.privacy }}</p>

              <button type="submit" :disabled="isSubmitting" class="btn-primary w-full">
                <Icon v-if="isSubmitting" icon="mdi:loading" class="w-5 h-5 mr-2 animate-spin" />
                <Icon v-else icon="mdi:send" class="w-5 h-5 mr-2" />
                {{ isSubmitting ? 'Enviando...' : 'Enviar Solicitação' }}
              </button>
            </form>

            <!-- Social Links -->
            <div class="mt-6 flex items-center gap-3">
              <span class="text-xs text-gray-500">Siga-nos:</span>
              <a v-for="s in socials" :key="s.label" :href="s.url" target="_blank" rel="noopener noreferrer" class="w-8 h-8 bg-gray-100 hover:bg-primary-100 rounded-full flex items-center justify-center transition-colors" :aria-label="s.label">
                <Icon :icon="s.icon" class="w-4 h-4 text-gray-600" />
              </a>
            </div>
          </div>

          <!-- Right: Contact Info -->
          <div class="space-y-6">
            <div>
              <div class="flex items-center gap-2 mb-4">
                <Icon icon="mdi:headset" class="w-5 h-5 text-primary-600" />
                <h2 class="text-lg font-bold text-gray-900">Centro de Atendimento</h2>
              </div>

              <div class="space-y-4">
                <div v-for="info in contactInfo" :key="info.label" class="flex items-start gap-3">
                  <div class="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon :icon="info.icon" class="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p class="text-[11px] text-gray-500 uppercase tracking-wide">{{ info.label }}</p>
                    <p class="text-sm text-gray-900 font-medium">{{ info.value }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Hours -->
            <div class="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 class="font-semibold text-gray-900 text-sm mb-3">
                <Icon icon="mdi:clock-outline" class="w-4 h-4 inline mr-1 text-primary-600" />
                Formas de contato
              </h3>
              <div class="space-y-3">
                <a href="https://wa.me/5541996924829?text=Olá! Gostaria de uma análise gratuita do meu negócio." target="_blank" rel="noopener noreferrer" class="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
                  <div class="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <Icon icon="mdi:whatsapp" class="w-5 h-5 text-white" />
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900 text-sm">WhatsApp</p>
                    <p class="text-[11px] text-gray-500">Resposta imediata</p>
                  </div>
                  <Icon icon="mdi:chevron-right" class="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                </a>

                <a href="mailto:contato@3wonline.com.br" class="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
                  <div class="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <Icon icon="mdi:email" class="w-5 h-5 text-white" />
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900 text-sm">E-mail</p>
                    <p class="text-[11px] text-gray-500">contato@3wonline.com.br</p>
                  </div>
                  <Icon icon="mdi:chevron-right" class="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </a>

                <a href="tel:+5541996924829" class="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors group">
                  <div class="w-9 h-9 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                    <Icon icon="mdi:phone" class="w-5 h-5 text-white" />
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900 text-sm">Telefone</p>
                    <p class="text-[11px] text-gray-500">(41) 99692-4829</p>
                  </div>
                  <Icon icon="mdi:chevron-right" class="w-4 h-4 text-gray-400 group-hover:text-gray-700" />
                </a>
              </div>

              <div class="mt-4 pt-4 border-t border-gray-200">
                <p class="text-xs text-gray-600"><Icon icon="mdi:clock" class="w-3.5 h-3.5 inline mr-1" /> <strong>Horário:</strong> Seg–Sex: 8h–18h</p>
                <p class="text-xs text-gray-600 mt-1"><Icon icon="mdi:map-marker" class="w-3.5 h-3.5 inline mr-1" /> <strong>Local:</strong> Curitiba, Paraná — Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="testimonial-section section-padding">
      <div class="container">
        <div class="text-center mb-8">
          <span class="text-xs font-semibold text-blue-300 uppercase tracking-wider block mb-2">Calculadora de Projetos</span>
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Estime Custos e Prazos</h2>
          <p class="text-sm text-blue-200">Entenderemos seu negócio e mostraremos o necessário para decolar na internet.</p>
        </div>
        <div class="max-w-4xl mx-auto">
          <PriceSimulator service-type="website" />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-padding">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <span class="section-label">Dúvidas?</span>
          <h2 class="section-title">Perguntas Frequentes</h2>
          <p class="section-subtitle">Tire suas dúvidas antes de entrar em contato</p>
        </div>
        <FaqAccordion :items="faqs" />
        <div class="text-center mt-6">
          <a href="https://wa.me/5541996924829?text=Olá! Tenho uma dúvida sobre os serviços." target="_blank" class="btn-primary text-sm">
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Tirar Outra Dúvida
          </a>
        </div>
      </div>
    </section>

    <!-- Testimonials Dark -->
    <section class="testimonial-section section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <span class="text-xs font-semibold text-blue-300 uppercase tracking-wider block mb-2">🗣️ O que Nossos Clientes Dizem</span>
          <h2 class="text-2xl md:text-3xl font-bold text-white">Resultados que falam por si</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <div v-for="t in testimonials" :key="t.name" class="testimonial-card">
            <p class="text-sm text-gray-300 italic mb-4 leading-relaxed">"{{ t.text }}"</p>
            <div class="flex items-center">
              <div class="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center mr-2">
                <span class="text-primary-300 font-semibold text-[10px]">{{ t.avatar }}</span>
              </div>
              <div>
                <p class="text-white text-xs font-semibold">{{ t.name }}</p>
                <p class="text-blue-300 text-[10px]">{{ t.company }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-8">
          <RouterLink to="/portfolio" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-sm">
            <Icon icon="mdi:briefcase-check" class="w-4 h-4 mr-2" /> Ver Portfólio Completo
          </RouterLink>
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
  { value: 'marketing', label: 'Marketing Digital' },
  { value: 'sites', label: 'Criação de Sites' },
  { value: 'sistemas', label: 'Sistemas Web' },
  { value: 'redes', label: 'Redes Sociais' },
  { value: 'anuncios', label: 'Gestão de Anúncios' },
  { value: 'automacao', label: 'Automação e IA' },
]

const contactInfo = [
  { label: 'Telefone / WhatsApp', value: '(41) 99692-4829', icon: 'mdi:phone' },
  { label: 'E-mail', value: 'contato@3wonline.com.br', icon: 'mdi:email' },
  { label: 'Localização', value: 'Curitiba, Paraná — Brasil', icon: 'mdi:map-marker' },
]

const socials = [
  { label: 'Facebook', url: 'https://www.facebook.com/grupo3wonline', icon: 'mdi:facebook' },
  { label: 'Instagram', url: 'https://www.instagram.com/grupo3wonline', icon: 'mdi:instagram' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/grupo3wonline', icon: 'mdi:linkedin' },
]

const testimonials = [
  { name: 'João Silva', company: 'Silva & Associados', avatar: 'JS', text: 'Aumentamos as vendas em 300% em 6 meses com a 3W Online!' },
  { name: 'Maria Santos', company: 'Boutique Elegance', avatar: 'MS', text: 'Site incrível e redes sociais gerando clientes todo dia!' },
  { name: 'Carlos Oliveira', company: 'Tech Solutions', avatar: 'CO', text: 'Parceria que só traz resultados. Recomendo!' },
]

const faqs = FAQ_ITEMS.slice(0, 5)

function validate(): boolean {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.name.trim() || form.name.trim().length < 3) errors.name = 'Informe seu nome completo'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'E-mail inválido'
  if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) errors.phone = 'Telefone inválido'
  if (!form.message.trim() || form.message.trim().length < 10) errors.message = 'Mínimo 10 caracteres'
  if (!form.privacy) errors.privacy = 'Aceite a Política de Privacidade'
  return Object.keys(errors).length === 0
}

async function handleSubmit() {
  if (!validate()) {
    await Swal.fire({ icon: 'warning', title: 'Campos obrigatórios', text: 'Preencha todos os campos corretamente.', confirmButtonColor: '#2563eb' })
    return
  }
  isSubmitting.value = true
  try {
    await new Promise((r) => setTimeout(r, 1500))
    const areasText = form.areas.length ? form.areas.join(', ') : 'Não especificado'
    const msg = `Análise Gratuita - Site 3W Online\n\nNome: ${form.name}\nEmail: ${form.email}\nTel: ${form.phone}\nEmpresa: ${form.company || 'N/A'}\nÁreas: ${areasText}\nMensagem: ${form.message}`
    await Swal.fire({ icon: 'success', title: 'Solicitação enviada!', text: 'Você será redirecionado para o WhatsApp.', confirmButtonColor: '#2563eb' })
    window.open(`https://wa.me/5541996924829?text=${encodeURIComponent(msg)}`, '_blank')
    Object.assign(form, { name: '', email: '', phone: '', company: '', message: '', privacy: false, areas: [] })
  } catch {
    await Swal.fire({ icon: 'error', title: 'Erro', text: 'Tente novamente ou contate pelo WhatsApp.', confirmButtonColor: '#2563eb' })
  } finally {
    isSubmitting.value = false
  }
}
</script>
