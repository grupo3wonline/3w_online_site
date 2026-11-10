<script setup lang="ts">
import { Icon } from '@iconify/vue'

const whatsappNumero = '5541996924829'
const whatsappDisplay = '(41) 99692-4829'
const email = 'contato@3wonline.com.br'
const mensagemWhats = encodeURIComponent(
  'Olá! Vim pela Calculadora de Preços e gostaria de falar com o Grupo 3w Online.'
)
</script>

<template>
  <!-- Hero -->
  <section class="py-16 md:py-20 px-4 bg-gradient-hero">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="section-title">
        Fale <span class="text-gradient">Conosco</span>
      </h1>
      <p class="section-subtitle">
        Tem uma dúvida, sugestão ou um projeto em mente? O Grupo 3w Online está pronto para atender
        você.
      </p>
    </div>
  </section>

  <!-- Canais de contato -->
  <section class="py-16 px-4">
    <div class="max-w-5xl mx-auto">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- WhatsApp -->
        <a
          :href="`https://wa.me/${whatsappNumero}?text=${mensagemWhats}`"
          target="_blank"
          rel="noopener noreferrer"
          class="glass-card-hover p-8 text-center flex flex-col items-center"
        >
          <div
            class="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-lg"
          >
            <Icon
              icon="fa6-brands:whatsapp"
              class="text-white text-3xl"
            />
          </div>
          <h2 class="text-xl font-bold txt-forte mb-2">WhatsApp</h2>
          <p class="txt-suave text-sm mb-3">Atendimento rápido e direto, de segunda a sexta.</p>
          <span class="text-lg font-semibold text-green-500">{{ whatsappDisplay }}</span>
          <span
            class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-500"
          >
            Iniciar conversa <Icon
              icon="fa6-solid:arrow-right"
              class="text-xs"
            />
          </span>
        </a>

        <!-- E-mail -->
        <a
          :href="`mailto:${email}`"
          class="glass-card-hover p-8 text-center flex flex-col items-center"
        >
          <div
            class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4 shadow-glow"
          >
            <Icon
              icon="fa6-solid:envelope"
              class="text-white text-3xl"
            />
          </div>
          <h2 class="text-xl font-bold txt-forte mb-2">E-mail</h2>
          <p class="txt-suave text-sm mb-3">Envie sua mensagem e responderemos em breve.</p>
          <span class="text-lg font-semibold text-primary-500 break-all">{{ email }}</span>
          <span class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-500">
            Enviar e-mail <Icon
              icon="fa6-solid:arrow-right"
              class="text-xs"
            />
          </span>
        </a>
      </div>

      <!-- Informações da empresa -->
      <div class="glass-card p-8 mt-8">
        <h2 class="text-xl font-bold txt-forte mb-6 flex items-center gap-2">
          <Icon
            icon="fa6-solid:building"
            class="text-accent-500"
          />
          Sobre o Grupo 3w Online
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon
                icon="fa6-solid:globe"
                class="text-primary-500 text-sm"
              />
            </div>
            <div>
              <div class="text-sm font-medium txt-forte">
                Site
              </div>
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-primary-500 hover:underline"
              >
                www.3wonline.com.br
              </a>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon
                icon="fa6-solid:briefcase"
                class="text-accent-500 text-sm"
              />
            </div>
            <div>
              <div class="text-sm font-medium txt-forte">
                Atuação
              </div>
              <div class="text-sm txt-suave">
                Sites e sistemas personalizados sob demanda
              </div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon
                icon="fa6-solid:clock"
                class="text-primary-500 text-sm"
              />
            </div>
            <div>
              <div class="text-sm font-medium txt-forte">
                Atendimento
              </div>
              <div class="text-sm txt-suave">
                Seg–Sex, 9h às 18h
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA persuasivo -->
      <div class="bg-gradient-cta rounded-2xl p-8 md:p-10 mt-8 text-center">
        <span
          class="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-white/15 rounded-full text-xs font-semibold text-white"
        >
          <Icon icon="fa6-solid:fire" /> Poucas vagas de projeto neste mês
        </span>
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
          Transforme sua ideia em um sistema de verdade
        </h2>
        <p class="text-white/90 mb-6 max-w-2xl mx-auto">
          Assim como esta calculadora, o <strong>Grupo 3w Online</strong> pode criar a ferramenta,
          site ou sistema que o seu negócio precisa — feito sob medida, do jeito que você imaginou.
          Não deixe seu projeto para depois: a concorrência não vai esperar.
        </p>
        <a
          :href="`https://wa.me/${whatsappNumero}?text=${mensagemWhats}`"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:-translate-y-1"
        >
          <Icon icon="fa6-brands:whatsapp" />
          Quero meu Orçamento Agora
        </a>
      </div>
    </div>
  </section>
</template>
