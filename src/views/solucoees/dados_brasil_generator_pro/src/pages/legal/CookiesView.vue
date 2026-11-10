<script setup lang="ts">
import LegalLayout from '@/components/common/LegalLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useConsentStore } from '@/stores/consent'
import { toast } from '@/lib/alerts'

const consent = useConsentStore()

function acceptAll() {
  consent.acceptAll()
  toast('Preferências salvas!')
}
function rejectAll() {
  consent.rejectAll()
  toast('Cookies analíticos desativados.')
}
</script>

<template>
  <LegalLayout title="Política de Cookies" updated="24/09/2026">
    <p>
      Utilizamos cookies e tecnologias semelhantes para o funcionamento do site e, mediante seu consentimento,
      para análise de uso. Você controla suas preferências a qualquer momento.
    </p>

    <h2>Tipos de cookies</h2>
    <ul>
      <li><strong>Necessários:</strong> essenciais para o funcionamento (tema, consentimento). Sempre ativos.</li>
      <li><strong>Analíticos:</strong> métricas anônimas via Google Analytics 4. Ativados só com seu consentimento.</li>
      <li><strong>Marketing:</strong> não utilizamos cookies de marketing por padrão.</li>
    </ul>

    <h2>Gerenciar preferências</h2>
    <p>Altere seu consentimento agora:</p>
    <div class="flex flex-wrap gap-3 not-prose">
      <BaseButton size="sm" @click="acceptAll">Aceitar analíticos</BaseButton>
      <BaseButton size="sm" variant="outline" @click="rejectAll">Rejeitar analíticos</BaseButton>
    </div>
    <p class="text-sm">
      Estado atual:
      <strong>{{ consent.analyticsAllowed ? 'Cookies analíticos ativos' : 'Somente cookies necessários' }}</strong>
    </p>
  </LegalLayout>
</template>
