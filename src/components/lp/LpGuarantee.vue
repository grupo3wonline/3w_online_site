<!--
  LpGuarantee.vue — Seção de garantia e risco reversal.

  Elimina a principal objeção restante: "e se não funcionar?".
  Exibe: selo visual de garantia, bullets de risco reversal e CTA final.
-->
<template>
  <section class="section-padding bg-gradient-to-br from-emerald-950 via-slate-900 to-[#0a1628] text-white relative overflow-hidden print:hidden">
    <!-- Orbs -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="container relative z-10">
      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        <!-- Lado esquerdo: Selo de garantia -->
        <div class="flex flex-col items-center md:items-start text-center md:text-left">
          <!-- Medalha de garantia -->
          <div class="relative mb-6">
            <div class="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-2xl shadow-emerald-500/30 mx-auto md:mx-0">
              <div class="text-center">
                <i class="fas fa-shield-halved text-4xl text-white mb-0.5" aria-hidden="true"></i>
                <div class="text-[11px] font-black text-emerald-100 uppercase tracking-wider leading-tight">
                  Garantia<br>Total
                </div>
              </div>
            </div>
            <!-- Badge de dias -->
            <div class="absolute -bottom-3 -right-3 w-14 h-14 rounded-full bg-amber-400 flex items-center justify-center shadow-lg border-2 border-white/20 md:right-auto md:-right-6">
              <div class="text-center">
                <div class="text-xl font-black text-amber-900 leading-none">{{ days }}</div>
                <div class="text-[9px] font-bold text-amber-800 leading-none uppercase">Dias</div>
              </div>
            </div>
          </div>

          <h3 class="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
            Garantia Incondicional de <span class="text-emerald-400">{{ days }} Dias</span>
          </h3>
          <p class="text-sm text-blue-200 leading-relaxed">
            {{ description }}
          </p>
        </div>

        <!-- Lado direito: Bullets de risco reversal -->
        <div class="space-y-4">
          <div class="p-5 bg-white/5 border border-emerald-500/20 rounded-2xl backdrop-blur-sm">
            <h4 class="text-sm font-bold text-emerald-300 mb-4 flex items-center gap-2">
              <i class="fas fa-check-double" aria-hidden="true"></i>
              O que a garantia cobre:
            </h4>
            <ul class="space-y-3">
              <li
                v-for="item in items"
                :key="item"
                class="flex items-start gap-2.5 text-xs text-blue-100 leading-relaxed"
              >
                <i class="fas fa-circle-check text-emerald-400 shrink-0 mt-0.5" aria-hidden="true"></i>
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- CTA de garantia -->
          <a
            :href="ctaUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white text-sm font-black py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-green-500/30 hover:scale-[1.02]"
            @click="trackClick"
          >
            <i class="fab fa-whatsapp text-base" aria-hidden="true"></i>
            {{ ctaLabel }}
          </a>

          <p class="text-[11px] text-center text-blue-300/70">
            <i class="fas fa-lock mr-1 text-emerald-400" aria-hidden="true"></i>
            Sem burocracia. Sem fidelidade forçada. Cancele quando quiser.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  days?:        number
  description?: string
  items?:       string[]
  ctaLabel?:    string
  ctaUrl?:      string
}>(), {
  days:        30,
  description: 'Se após 30 dias você não estiver satisfeito com os resultados, você pode cancelar sem qualquer multa ou justificativa. Seu investimento protegido por completo.',
  items:       () => [
    'Sem multa de cancelamento — você pode sair quando quiser',
    'Sem contratos de longa duração — pagamento mensal recorrente',
    'Reembolso integral se não iniciarmos dentro do prazo acordado',
    'Suporte direto com o gerente de conta via WhatsApp',
    'Relatórios completos de desempenho a qualquer momento',
  ],
  ctaLabel: 'Começar com Garantia Total Agora',
  ctaUrl:   'https://wa.me/5541996924829?text=Olá! Quero iniciar com a garantia de 30 dias.',
})

function trackClick() {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event: 'lp_guarantee_cta_click' })
  }
}
</script>
