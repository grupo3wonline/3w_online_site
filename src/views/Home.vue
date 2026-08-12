<template>
  <div>
    <!-- Hero — Dark Navy -->
    <section class="hero-gradient text-white py-20 md:py-28 lg:py-36 relative overflow-hidden">
      <div class="container relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Transforme Seu Negócio com
            <span class="text-gradient">Soluções Digitais</span>
          </h1>
          <p class="text-sm md:text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
            Especialistas em marketing digital, desenvolvimento web e soluções tecnológicas que realmente geram resultados.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <RouterLink to="/contato" class="btn-primary !bg-primary-500 hover:!bg-primary-600 !text-sm">
              <Icon icon="mdi:file-document-edit" class="w-4 h-4 mr-2" /> Orçamento Gratuito
            </RouterLink>
            <a href="https://wa.me/5541996924829?text=Olá! Gostaria de saber mais sobre os serviços da 3W Online." target="_blank" rel="noopener noreferrer" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 !text-sm">
              <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Falar no WhatsApp
            </a>
          </div>
          <div class="flex items-center justify-center gap-4 text-xs text-blue-300">
            <span class="flex items-center gap-1"><Icon icon="mdi:shield-check" class="w-4 h-4 text-green-400" /> LGPD</span>
            <span class="flex items-center gap-1"><Icon icon="mdi:clock-check" class="w-4 h-4 text-green-400" /> Resposta em 24h</span>
            <span class="flex items-center gap-1"><Icon icon="mdi:lock-open" class="w-4 h-4 text-green-400" /> Sem fidelidade</span>
          </div>
        </div>
      </div>
      <!-- Badge flutuante -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div class="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 text-green-300 text-xs px-4 py-2 rounded-full">
          <Icon icon="mdi:check-circle" class="w-4 h-4" />
          <span class="font-medium">Vagas Limitadas</span> — Entre em contato hoje
        </div>
      </div>
    </section>

    <!-- Social Proof Bar -->
    <section class="py-12 md:py-16 bg-white border-b border-gray-100">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-2xl md:text-4xl font-bold text-primary-600">{{ stat.value }}</div>
            <div class="text-xs text-gray-500 mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-10 md:mb-14">
          <span class="section-label">Nossos Serviços</span>
          <h2 class="section-title">Soluções para Cada Desafio</h2>
          <p class="section-subtitle max-w-2xl mx-auto">Do marketing digital ao desenvolvimento de sistemas — entregamos resultados mensuráveis.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="service in services" :key="service.id" class="service-card">
            <div class="w-11 h-11 rounded-full flex items-center justify-center mb-4" :class="service.iconBg">
              <Icon :icon="service.icon" class="w-5 h-5 text-white" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-1">{{ service.title }}</h3>
            <p class="text-xs text-gray-500 mb-3 leading-relaxed">{{ service.description }}</p>
            <RouterLink :to="service.link" class="inline-flex items-center text-xs font-semibold text-primary-600 hover:text-primary-700 gap-1">
              Saiba mais <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5" />
            </RouterLink>
          </div>
        </div>
        <div class="text-center mt-8">
          <RouterLink to="/servicos" class="btn-outline text-sm">Ver Todos os Serviços</RouterLink>
        </div>
      </div>
    </section>

    <!-- Results / Case Numbers -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Resultados Comprovados</span>
          <h2 class="section-title">Números que Falam por Si</h2>
          <p class="section-subtitle">Veja o impacto real que geramos para nossos clientes</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <div v-for="r in results" :key="r.title" class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">{{ r.value }}</div>
            <h4 class="text-sm font-semibold text-gray-900 mb-1">{{ r.title }}</h4>
            <p class="text-xs text-gray-500">{{ r.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works — Process -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Como Funciona</span>
          <h2 class="section-title">Do Contato ao Resultado em 4 Passos</h2>
          <p class="section-subtitle">Processo simples e transparente para você começar a crescer</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div v-for="(step, i) in howItWorks" :key="i" class="text-center">
            <div class="w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto mb-4 text-lg font-bold shadow-lg shadow-primary-200">{{ i + 1 }}</div>
            <h4 class="text-sm font-semibold text-gray-900 mb-1">{{ step.title }}</h4>
            <p class="text-[11px] text-gray-500 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
        <div class="text-center mt-10">
          <a href="https://wa.me/5541996924829?text=Olá! Quero começar meu projeto com a 3W Online." target="_blank" rel="noopener noreferrer" class="btn-primary text-sm">
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Iniciar Meu Projeto
          </a>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Por que a 3W Online?</span>
          <h2 class="section-title">Expertise que Gera Resultados Reais</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="d in differentials" :key="d.title" class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <div class="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                <Icon :icon="d.icon" class="w-4 h-4 text-primary-600" />
              </div>
              <h4 class="font-semibold text-gray-900 text-sm mb-1">{{ d.title }}</h4>
              <p class="text-[11px] text-gray-500 leading-relaxed">{{ d.description }}</p>
            </div>
          </div>
          <div>
            <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Equipe 3W Online" class="w-full rounded-xl shadow-lg" loading="lazy" width="800" height="533" />
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials — Dark Section -->
    <section class="testimonial-section section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <span class="text-xs font-semibold text-blue-300 uppercase tracking-wider block mb-2">Depoimentos</span>
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">O que Nossos Clientes Dizem</h2>
          <p class="text-sm text-blue-200">Resultados reais de quem confia em nosso trabalho.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="t in testimonials" :key="t.id" class="testimonial-card">
            <div class="flex mb-3">
              <Icon v-for="n in 5" :key="n" icon="mdi:star" class="w-4 h-4 text-yellow-400" />
            </div>
            <p class="text-sm text-gray-300 mb-5 leading-relaxed italic">"{{ t.text }}"</p>
            <div class="flex items-center">
              <div class="w-9 h-9 bg-primary-500/20 rounded-full flex items-center justify-center mr-3">
                <span class="text-primary-300 font-semibold text-xs">{{ t.avatar }}</span>
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

    <!-- Guarantee / Trust -->
    <section class="section-padding">
      <div class="container">
        <div class="max-w-4xl mx-auto bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-primary-100">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span class="section-label">Nosso Compromisso</span>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">Satisfação Garantida ou seu Dinheiro de Volta</h2>
              <p class="text-sm text-gray-600 leading-relaxed mb-4">
                Se nos primeiros 30 dias você não estiver satisfeito com nosso trabalho, devolvemos 100% do valor investido. Sem burocracia, sem perguntas.
              </p>
              <ul class="space-y-2">
                <li class="flex items-center gap-2 text-sm text-gray-700">
                  <Icon icon="mdi:check-decagram" class="w-5 h-5 text-green-500 flex-shrink-0" /> Garantia de 30 dias
                </li>
                <li class="flex items-center gap-2 text-sm text-gray-700">
                  <Icon icon="mdi:check-decagram" class="w-5 h-5 text-green-500 flex-shrink-0" /> Contrato transparente
                </li>
                <li class="flex items-center gap-2 text-sm text-gray-700">
                  <Icon icon="mdi:check-decagram" class="w-5 h-5 text-green-500 flex-shrink-0" /> Sem fidelidade obrigatória
                </li>
                <li class="flex items-center gap-2 text-sm text-gray-700">
                  <Icon icon="mdi:check-decagram" class="w-5 h-5 text-green-500 flex-shrink-0" /> Suporte dedicado durante todo o projeto
                </li>
              </ul>
            </div>
            <div class="text-center">
              <div class="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-green-100">
                <Icon icon="mdi:shield-check" class="w-16 h-16 text-green-500" />
              </div>
              <p class="text-sm font-semibold text-gray-900 mt-4">Garantia Total</p>
              <p class="text-xs text-gray-500">30 dias sem risco</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Offers Carousel -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-8">
          <span class="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <Icon icon="mdi:fire" class="w-4 h-4" /> Ofertas por tempo limitado
          </span>
          <h2 class="section-title">Ofertas Especiais</h2>
          <p class="section-subtitle">Aproveite condições exclusivas para impulsionar seu negócio</p>
        </div>

        <!-- Carousel Controls -->
        <div class="relative max-w-4xl mx-auto">
          <div class="overflow-hidden rounded-2xl">
            <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${activeOffer * 100}%)` }">
              <!-- Offer 1: Marketing Digital -->
              <div class="w-full flex-shrink-0 px-2">
                <div class="bg-white rounded-2xl border-2 border-primary-500 p-8 shadow-lg">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <span class="inline-block bg-primary-100 text-primary-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">Marketing Digital</span>
                      <h3 class="text-xl font-bold text-gray-900 mb-2">Pacote Marketing Digital Completo</h3>
                      <p class="text-sm text-gray-600 mb-4">Gestão de redes sociais + anúncios + produção de conteúdo + relatórios de performance</p>
                      <ul class="text-sm text-gray-600 space-y-2 mb-4">
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Gestão de redes sociais</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Produção de conteúdo</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Gestão de anúncios</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Relatório de performance</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Suporte via WhatsApp</li>
                      </ul>
                    </div>
                    <div class="text-center">
                      <p class="text-xs text-gray-500 line-through mb-1">De R$ 2.500/mês</p>
                      <p class="text-4xl font-bold text-primary-600">R$ 500<span class="text-lg font-normal text-gray-500">/mês</span></p>
                      <p class="text-xs text-gray-500 mt-1 mb-4">Primeiros 30 dias — sem fidelidade</p>
                      <a href="https://wa.me/5541996924829?text=Olá! Quero o pacote Marketing Digital por R$ 500/mês!" target="_blank" rel="noopener noreferrer" class="btn-primary w-full text-sm">
                        <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Quero Essa Oferta
                      </a>
                      <p class="text-[10px] text-gray-400 mt-2">* Valor de mídia não incluso</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Offer 2: Criação de Sites -->
              <div class="w-full flex-shrink-0 px-2">
                <div class="bg-white rounded-2xl border-2 border-blue-500 p-8 shadow-lg">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <span class="inline-block bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">Criação de Sites</span>
                      <h3 class="text-xl font-bold text-gray-900 mb-2">Site Profissional Completo</h3>
                      <p class="text-sm text-gray-600 mb-4">Site institucional responsivo, otimizado para SEO e pronto para converter visitantes em clientes</p>
                      <ul class="text-sm text-gray-600 space-y-2 mb-4">
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Design responsivo exclusivo</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Até 10 páginas</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> SEO básico configurado</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Formulário de contato + WhatsApp</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Painel administrativo</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> SSL + Hospedagem 1 ano</li>
                      </ul>
                    </div>
                    <div class="text-center">
                      <p class="text-xs text-gray-500 line-through mb-1">De R$ 4.500</p>
                      <p class="text-4xl font-bold text-blue-600">R$ 2.500<span class="text-lg font-normal text-gray-500"></span></p>
                      <p class="text-xs text-gray-500 mt-1 mb-4">Pagamento único — entrega em 15 dias</p>
                      <a href="https://wa.me/5541996924829?text=Olá! Quero o site profissional por R$ 2.500!" target="_blank" rel="noopener noreferrer" class="btn-primary !bg-blue-600 hover:!bg-blue-700 w-full text-sm">
                        <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Quero Meu Site
                      </a>
                      <p class="text-[10px] text-gray-400 mt-2">* Domínio .com.br incluso no primeiro ano</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Offer 3: Automação com IA -->
              <div class="w-full flex-shrink-0 px-2">
                <div class="bg-white rounded-2xl border-2 border-purple-500 p-8 shadow-lg">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <span class="inline-block bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">Automação com IA</span>
                      <h3 class="text-xl font-bold text-gray-900 mb-2">Automação Inteligente para Seu Negócio</h3>
                      <p class="text-sm text-gray-600 mb-4">Chatbot com IA + automação de WhatsApp + integração com suas ferramentas atuais</p>
                      <ul class="text-sm text-gray-600 space-y-2 mb-4">
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Chatbot inteligente (GPT)</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Automação de WhatsApp</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Fluxos automatizados (n8n)</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Integração com CRM/ERP</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Atendimento multicanal (Chatwoot)</li>
                        <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Treinamento da equipe</li>
                      </ul>
                    </div>
                    <div class="text-center">
                      <p class="text-xs text-gray-500 line-through mb-1">De R$ 8.000</p>
                      <p class="text-4xl font-bold text-purple-600">R$ 4.500<span class="text-lg font-normal text-gray-500"></span></p>
                      <p class="text-xs text-gray-500 mt-1 mb-4">Implementação completa — suporte 60 dias</p>
                      <a href="https://wa.me/5541996924829?text=Olá! Quero a automação com IA por R$ 4.500!" target="_blank" rel="noopener noreferrer" class="btn-primary !bg-purple-600 hover:!bg-purple-700 w-full text-sm">
                        <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Quero Automatizar
                      </a>
                      <p class="text-[10px] text-gray-400 mt-2">* Inclui OmniRoute, Evolution API e n8n</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Carousel Navigation -->
          <div class="flex justify-center items-center gap-4 mt-6">
            <button @click="prevOffer" class="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors" aria-label="Oferta anterior">
              <Icon icon="mdi:chevron-left" class="w-5 h-5 text-gray-600" />
            </button>
            <div class="flex gap-2">
              <button v-for="(_, i) in offers" :key="i" @click="activeOffer = i" class="w-2.5 h-2.5 rounded-full transition-colors" :class="activeOffer === i ? 'bg-primary-600' : 'bg-gray-300'" :aria-label="`Oferta ${i + 1}`" />
            </div>
            <button @click="nextOffer" class="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors" aria-label="Próxima oferta">
              <Icon icon="mdi:chevron-right" class="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Who We Help -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Para Quem</span>
          <h2 class="section-title">Nossos Serviços São para Você se...</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <div v-for="persona in personas" :key="persona.title" class="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <Icon :icon="persona.icon" class="w-8 h-8 text-primary-600 mb-3" />
            <h4 class="text-sm font-semibold text-gray-900 mb-2">{{ persona.title }}</h4>
            <p class="text-xs text-gray-500 leading-relaxed">{{ persona.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA — Dark -->
    <section class="cta-section">
      <div class="container text-center">
        <span class="text-xs font-semibold text-blue-300 uppercase tracking-wider block mb-3">Comece sua transformação digital</span>
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">Pronto para Impulsionar Seu Negócio?</h2>
        <p class="text-sm text-blue-200 mb-6 max-w-xl mx-auto">Entre em contato e descubra como nossa equipe pode ajudar você a alcançar resultados extraordinários.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink to="/contato" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-sm">
            Falar com Especialista
          </RouterLink>
          <a href="https://wa.me/5541996924829?text=Olá! Gostaria de conversar sobre soluções digitais para meu negócio." target="_blank" rel="noopener noreferrer" class="btn-secondary text-sm">
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> WhatsApp
          </a>
        </div>
        <p class="text-xs text-blue-300 mt-6 flex items-center justify-center gap-4">
          <span class="flex items-center gap-1"><Icon icon="mdi:clock-fast" class="w-3.5 h-3.5" /> Resposta em até 2h</span>
          <span class="flex items-center gap-1"><Icon icon="mdi:lock-open" class="w-3.5 h-3.5" /> Sem compromisso</span>
          <span class="flex items-center gap-1"><Icon icon="mdi:cash-multiple" class="w-3.5 h-3.5" /> Orçamento grátis</span>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const activeOffer = ref(0)
const offers = [0, 1, 2]
let carouselInterval: ReturnType<typeof setInterval> | null = null

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
  { value: '150+', label: 'Projetos Entregues' },
  { value: '98%', label: 'Clientes Satisfeitos' },
  { value: '5+', label: 'Anos de Experiência' },
  { value: '24/7', label: 'Suporte Disponível' },
]

const services = [
  { id: 1, title: 'Gestão de Redes Sociais', description: 'Estratégia, criação de conteúdo e gestão completa das suas redes.', icon: 'mdi:instagram', iconBg: 'bg-pink-500', link: '/servicos/gestao-redes-sociais' },
  { id: 2, title: 'Criação de Sites', description: 'Sites profissionais, responsivos e otimizados para conversão.', icon: 'mdi:web', iconBg: 'bg-blue-500', link: '/servicos/criacao-sites' },
  { id: 3, title: 'Gestão de Anúncios', description: 'Campanhas no Google Ads e Meta Ads com foco em ROI.', icon: 'mdi:bullseye-arrow', iconBg: 'bg-green-500', link: '/servicos/gestao-anuncios' },
  { id: 4, title: 'Desenvolvimento de Apps', description: 'Aplicativos mobile modernos para iOS e Android.', icon: 'mdi:cellphone', iconBg: 'bg-purple-500', link: '/servicos/desenvolvimento-apps' },
  { id: 5, title: 'Design Gráfico', description: 'Identidade visual e peças criativas que destacam sua marca.', icon: 'mdi:palette', iconBg: 'bg-orange-500', link: '/servicos/design-grafico' },
  { id: 6, title: 'Marketing Digital', description: 'Estratégia completa para crescimento sustentável.', icon: 'mdi:chart-line', iconBg: 'bg-indigo-500', link: '/servicos/marketing-digital' },
]

const results = [
  { value: '+300%', title: 'Aumento em Vendas', desc: 'Média de crescimento nos primeiros 6 meses de gestão' },
  { value: '-60%', title: 'Custo por Lead', desc: 'Redução no custo de aquisição com campanhas otimizadas' },
  { value: '4.8x', title: 'ROI Médio', desc: 'Retorno sobre o investimento em marketing digital' },
]

const howItWorks = [
  { title: 'Contato', desc: 'Fale conosco pelo WhatsApp ou formulário e conte seu desafio' },
  { title: 'Diagnóstico', desc: 'Analisamos seu cenário atual e identificamos oportunidades' },
  { title: 'Proposta', desc: 'Receba um plano estratégico personalizado com prazos e valores' },
  { title: 'Resultados', desc: 'Executamos, mensuramos e otimizamos para crescimento contínuo' },
]

const differentials = [
  { title: 'Expertise Comprovada', icon: 'mdi:trophy', description: '5+ anos, 150+ projetos entregues para clientes de todo o Brasil.' },
  { title: 'Resultados Mensuráveis', icon: 'mdi:chart-bar', description: 'Focamos em métricas que impactam o negócio, com relatórios transparentes.' },
  { title: 'Atendimento Personalizado', icon: 'mdi:account-heart', description: 'Cada projeto recebe estratégia e atenção exclusiva.' },
  { title: 'Tecnologia Atualizada', icon: 'mdi:rocket-launch', description: 'Melhores ferramentas e práticas modernas do mercado.' },
]

const testimonials = [
  { id: 1, name: 'João Silva', company: 'Silva & Associados', avatar: 'JS', text: 'A 3W Online transformou nossa presença digital. Aumentamos as vendas em 300% em apenas 6 meses!' },
  { id: 2, name: 'Maria Santos', company: 'Boutique Elegance', avatar: 'MS', text: 'Nosso site ficou incrível e as redes sociais estão gerando clientes todo dia!' },
  { id: 3, name: 'Carlos Oliveira', company: 'Tech Solutions', avatar: 'CO', text: 'A equipe entende o negócio e entrega com qualidade. Recomendo sem hesitar!' },
]

const personas = [
  { title: 'Quer mais clientes', icon: 'mdi:account-group', desc: 'Precisa atrair novos clientes e não sabe por onde começar no digital.' },
  { title: 'Quer presença online', icon: 'mdi:web', desc: 'Não tem site ou suas redes sociais estão paradas sem gerar resultados.' },
  { title: 'Quer escalar vendas', icon: 'mdi:trending-up', desc: 'Já vende mas quer aumentar o volume com estratégia digital.' },
  { title: 'Precisa de um sistema', icon: 'mdi:cog', desc: 'Quer automatizar processos internos com tecnologia sob medida.' },
  { title: 'Quer profissionalizar', icon: 'mdi:star', desc: 'Precisa de uma identidade visual forte e comunicação profissional.' },
  { title: 'Quer lançar um app', icon: 'mdi:cellphone-check', desc: 'Tem uma ideia de aplicativo e precisa de uma equipe para executar.' },
]
</script>
