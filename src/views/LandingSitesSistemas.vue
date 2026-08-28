<template>
  <div class="landing-sites-sistemas-page">
    <!-- Hero / Primeira Dobra — Dark Navy com Escassez & Confiança -->
    <section class="page-hero relative overflow-hidden py-16 md:py-24">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Criação de Sites & Sistemas' }]" />

        <div class="max-w-4xl mt-4">
          <!-- Selo de Escassez -->
          <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-200 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Icon icon="mdi:lightning-bolt" class="w-4 h-4 text-secondary-400" />
            <span>APENAS 2 NOVOS PROJETOS INICIADOS POR SEMANA • DESENVOLVIMENTO EXCLUSIVO</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Sites Modernos & Sistemas Web que <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-400">Multiplicam Suas Vendas</span>
          </h1>

          <p class="text-base sm:text-lg text-blue-200 mb-8 max-w-3xl leading-relaxed">
            Desenvolvimento de alta performance com Vue 3 e TypeScript. Sites que carregam em menos de 1.5s, ranqueiam no Google e sistemas sob medida sem mensalidades por usuário.
          </p>

          <!-- CTAs Principais -->
          <div class="flex flex-wrap gap-4 items-center mb-10">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de um orçamento para criação de site/sistema sob medida."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-sm sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Solicitar Orçamento no WhatsApp
            </a>
            <a href="#simulador" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
              <Icon icon="mdi:calculator" class="w-4 h-4 mr-1.5" />
              Simular Meu Projeto
            </a>
          </div>

          <!-- Elementos de Confiança Próximos ao CTA -->
          <div class="flex flex-wrap items-center gap-6 text-xs text-blue-200">
            <span class="flex items-center gap-1.5"><Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-400" /> 30 Dias de Garantia Total</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:code-braces" class="w-4 h-4 text-secondary-400" /> Código 100% Próprio</span>
            <span class="flex items-center gap-1.5"><Icon icon="mdi:speedometer" class="w-4 h-4 text-cyan-400" /> Carregamento em &lt; 1.5s</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Prova Social Imediata -->
    <section class="bg-slate-900 text-white py-6 border-y border-white/10">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">+150</div>
            <div class="text-xs text-slate-300">Sites & Sistemas Entregues</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-primary-400 mb-1">&lt; 1.5s</div>
            <div class="text-xs text-slate-300">Tempo de Carregamento Médio</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-secondary-400 mb-1">0 R$</div>
            <div class="text-xs text-slate-300">Mensalidade por Usuário</div>
          </div>
          <div class="p-2">
            <div class="text-2xl sm:text-4xl font-black text-emerald-400 mb-1">98%</div>
            <div class="text-xs text-slate-300">Índice de Aprovação de Clientes</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problema / O Custo da Inação (Dor) -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">O Diagnóstico</span>
          <h2 class="section-title">Seu Site e Seus Processos Estão Afastando Clientes?</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Um site lento ou processos manuais desorganizados custam muito mais caro do que investir na tecnologia correta.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <!-- Card de Problemas -->
          <div class="p-6 sm:p-8 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:alert-octagon" class="w-5 h-5 text-red-600" />
                Sintomas de Sites & Sistemas Obsoletos:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-red-800">
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Sites Lentos no Celular:</strong> 53% dos visitantes fecham a página se ela demora mais de 3 segundos para abrir.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Temas Prontos Genéricos:</strong> Layouts batidos que não transmitem credibilidade e parecem cópias de concorrentes.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Falta de SEO Técnico:</strong> Seu site é invisível para quem busca no Google sem pagar anúncios.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Planilhas Confusas:</strong> Erros humanos, perda de dados e retrabalho contínuo da equipe.</span>
                </li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-red-100 rounded-xl text-xs text-red-900 font-semibold text-center">
              ⚠️ Um site amador faz sua empresa parecer pequena mesmo quando você é o melhor do mercado.
            </div>
          </div>

          <!-- Card de Solução -->
          <div class="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:check-decagram" class="w-5 h-5 text-emerald-600" />
                O Padrão de Engenharia 3W Online:
              </h3>
              <ul class="space-y-3.5 text-xs sm:text-sm text-emerald-800">
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Velocidade Imbatível:</strong> Arquitetura SPA moderna que carrega instantaneamente em qualquer conexão.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Design Exclusivo de Alto Padrão:</strong> Identidade visual refinada para elevar o valor percebido da sua marca.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>SEO Estruturado Nativo:</strong> Marcação semântica e metadados para colocar suas páginas no topo do Google.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Sistemas Sob Medida Sem Licenças:</strong> Painel intuitivo moldado exatamente à rotina dos seus colaboradores.</span>
                </li>
              </ul>
            </div>
            <div class="mt-6 p-3.5 bg-emerald-100 rounded-xl text-xs text-emerald-900 font-semibold text-center">
              🚀 Código 100% proprietário entregue com transferência de direitos.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Como Funciona em 4 Passos -->
    <section class="section-padding bg-slate-50 border-y border-gray-200/60">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Metodologia Ágil</span>
          <h2 class="section-title">Como Desenvolvemos Seu Projeto</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Processo transparente com validações constantes para garantir que o resultado final supere suas expectativas.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              1
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Briefing & Estratégia</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Mapeamos as necessidades, público-alvo e os objetivos comerciais do projeto.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-secondary-50 text-secondary-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              2
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Design & Prototipagem</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Criamos o layout visual exclusivo para sua aprovação antes de qualquer linha de código.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              3
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Codificação & Testes</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Desenvolvimento ágil com Vue 3, testes de responsividade e otimização de velocidade.</p>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 font-black text-lg">
              4
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">Publicação & Garantia</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Subida em produção com SSL, domínio e 30 dias de garantia técnica integral.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Casos Reais & Depoimentos -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Depoimentos</span>
          <h2 class="section-title">O que Nossos Clientes Dizem</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Projetos reais que geraram crescimento e organização para empresas de diversos setores.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "O site novo desenvolvido pela 3W Online aumentou em <strong>+140% as solicitações de orçamento</strong> pelo WhatsApp. O carregamento é quase instantâneo."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Guilherme Prado</div>
              <div class="text-[11px] text-gray-500">Sócio • Escritório de Engenharia</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:speedometer" class="w-3.5 h-3.5" /> 99/100 no Google PageSpeed
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "Substituímos 4 planilhas pesadas por um sistema web exclusivo. Economizamos mais de <strong>20 horas por semana</strong> na conferência de pedidos."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Fernanda Meirelles</div>
              <div class="text-[11px] text-gray-500">Gerente de Operações • Distribuidora</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:clock-check-outline" class="w-3.5 h-3.5" /> 20h Economizadas/Semana
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col justify-between shadow-sm">
            <div>
              <div class="flex items-center gap-1 text-amber-400 mb-3">
                <Icon v-for="i in 5" :key="i" icon="mdi:star" class="w-4 h-4" />
              </div>
              <p class="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                "A entrega foi feita rigorosamente dentro do prazo acordado e com suporte impecável. Qualquer dúvida técnica que tínhamos era respondida em minutos."
              </p>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="font-bold text-xs text-gray-900">Lucas Silveira</div>
              <div class="text-[11px] text-gray-500">CEO • Startup de Tecnologia</div>
              <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <Icon icon="mdi:shield-check" class="w-3.5 h-3.5" /> Suporte VIP 5 Estrelas
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Oferta Irresistível + Bônus Inclusos -->
    <section class="section-padding bg-gradient-to-b from-slate-900 to-[#0a1628] text-white">
      <div class="container max-w-4xl">
        <div class="text-center mb-10">
          <span class="inline-flex items-center gap-1 bg-secondary-500/20 text-secondary-300 border border-secondary-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Icon icon="mdi:gift-outline" class="w-4 h-4 text-secondary-400" />
            <span>PACOTE COMPLETO DE DESENVOLVIMENTO</span>
          </span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3">O Que Está Incluso no Seu Projeto</h2>
          <p class="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto">
            Uma solução turn-key pronta para operar e gerar receita.
          </p>
        </div>

        <div class="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div class="space-y-4 mb-8">
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Design 100% Exclusivo & Responsivo:</strong> Adaptado perfeitamente a computadores, tablets e celulares.</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Botões de Conversão WhatsApp:</strong> Integração com mensagens pré-formatadas para facilitar o contato do cliente.</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Painel Administrativo Intuitivo:</strong> Atualize textos, fotos e produtos sem depender de programador.</span>
            </div>
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-100"><strong>Transferência Total de Código:</strong> Você é o dono legal e definitivo de todo o software criado.</span>
            </div>
          </div>

          <!-- Bônus Gratuitos -->
          <div class="pt-6 border-t border-white/10">
            <h4 class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-4">🎁 Bônus Especiais Inclusos no Contrato:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 1: Otimização SEO</div>
                <div class="text-[11px] text-blue-200">Indexação e tags para ranquear no Google. <span class="line-through text-gray-400">R$ 700</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 2: Hospedagem + SSL</div>
                <div class="text-[11px] text-blue-200">1 ano de infraestrutura em nuvem segura. <span class="line-through text-gray-400">R$ 450</span> <strong>GRÁTIS</strong></div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs font-bold text-white mb-1">Bônus 3: Treinamento em Vídeo</div>
                <div class="text-[11px] text-blue-200">Gravação passo a passo de como operar o site. <span class="line-through text-gray-400">R$ 350</span> <strong>GRÁTIS</strong></div>
              </div>
            </div>
          </div>

          <!-- Garantia Incondicional & CTA -->
          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:shield-check" class="w-10 h-10 text-emerald-400 shrink-0" />
              <div class="text-xs">
                <div class="font-bold text-white">30 Dias de Garantia Técnica</div>
                <div class="text-blue-200">Suporte e correções gratuitas para sua total tranquilidade.</div>
              </div>
            </div>
            <a
              href="https://wa.me/5541996924829?text=Olá! Quero garantir minha vaga para criar meu site/sistema com todos os bônus inclusos."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-sm !py-3.5 !px-6 font-bold shadow-lg shrink-0 whitespace-nowrap"
            >
              Garantir Projeto no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulador de Preço Integrado -->
    <section id="simulador" class="testimonial-section section-padding">
      <div class="container">
        <div class="text-center mb-10 max-w-2xl mx-auto">
          <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Simulação Imediata</span>
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">Calcule a Estimativa do Seu Projeto</h2>
          <p class="text-xs sm:text-sm text-blue-200">Obtenha um valor referencial em menos de 1 minuto.</p>
        </div>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900">
          <PriceSimulator service-type="website" />
        </div>
      </div>
    </section>

    <!-- Quebra de Objeções & FAQ Decisivo -->
    <section class="section-padding bg-white">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <span class="section-label">Perguntas Decisivas</span>
          <h2 class="section-title">Dúvidas Frequentes sobre Criação de Sites & Sistemas</h2>
          <p class="section-subtitle">Tudo sobre prazos, custos e metodologia de entrega.</p>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- CTA Final — Dark Navy -->
    <section class="cta-section">
      <div class="container text-center max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
          <Icon icon="mdi:clock-alert" class="w-4 h-4 text-rose-400" />
          <span>Agenda Aberta para Início Imediato</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4">
          Pronto para ter um site profissional que converte visitantes em clientes?
        </h2>
        <p class="text-sm sm:text-base text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          Converse com nossos engenheiros de software e receba uma proposta técnica sob medida para sua empresa.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de uma proposta sob medida para desenvolvimento de site/sistema."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary !bg-green-500 hover:!bg-green-600 !text-white text-xs sm:text-base !py-4 !px-8 font-bold shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5" />
            Falar com Engenheiro no WhatsApp
          </a>
          <RouterLink to="/contato" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs sm:text-sm font-semibold !py-4 !px-6">
            Enviar Mensagem por Formulário
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import PriceSimulator from '@/components/PriceSimulator.vue'
import FaqAccordion from '@/components/ui/FaqAccordion.vue'
import { useSeo } from '@/composables/useSeo'

const { applySeo } = useSeo()
applySeo({
  title: 'Criação de Sites e Sistemas Web Sob Medida em Curitiba | 3W Online',
  description: 'Criação de sites profissionais, landing pages e sistemas sob medida em Curitiba. Carregamento ultrarrápido em menos de 1.5s, código limpo e 30 dias de garantia.',
  path: '/lp-sites-sistemas',
  keywords: 'criação de sites curitiba, desenvolvimento sistemas curitiba, landing pages alta conversão, software house curitiba',
})

const faqs = [
  { question: 'Quanto tempo demora para desenvolver um site ou sistema?', answer: 'Sites institucionais e landing pages de alta conversão costumam ser entregues em 7 a 15 dias úteis. Sistemas web sob medida têm prazos médios de 15 a 30 dias úteis, com entregas parciais para validação contínua.' },
  { question: 'O código-fonte será da minha empresa ou fico preso à 3W Online?', answer: 'O código é 100% de sua propriedade. Após a conclusão e pagamento do projeto, fornecemos o repositório completo e arquivos finais para sua empresa hospedar onde preferir.' },
  { question: 'Como funciona a garantia pós-entrega?', answer: 'Todos os nossos projetos contam com 30 dias de garantia técnica gratuita pós-publicação. Se qualquer problema ou instabilidade ocorrer, corrigimos sem qualquer custo adicional.' },
  { question: 'Vocês ajudam a registrar o domínio e hospedar o site?', answer: 'Sim! Como bônus exclusivo, fornecemos a configuração completa de domínio, hospedagem SSD e certificado SSL de segurança grátis no primeiro ano.' },
  { question: 'Consigo atualizar o conteúdo do site sozinho depois?', answer: 'Com certeza! Desenvolvemos áreas administrativas intuitivas e fornecemos um treinamento gravado em vídeo ensinando como alterar textos, fotos e produtos com facilidade.' },
  { question: 'Quais as formas de pagamento disponíveis?', answer: 'Facilitamos o pagamento com 5% de desconto no PIX, parcelamento em até 12x no cartão de crédito ou faturamento via boleto com emissão de NF-e para pessoa jurídica.' },
]
</script>