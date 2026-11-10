<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/common/ToolShell.vue'
import InfoCard from '@/components/common/InfoCard.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { decodeJwt, type DecodedJwt } from '@/lib/jwt'
import { formatDateTime } from '@/lib/datetime'
import { useCopy } from '@/composables/useClipboard'
import { toast } from '@/lib/notify'

const token = ref('')
const decoded = ref<DecodedJwt | null>(null)
const error = ref('')
const { copyText } = useCopy()

const headerJson = computed(() =>
  decoded.value ? JSON.stringify(decoded.value.header, null, 2) : ''
)
const payloadJson = computed(() =>
  decoded.value ? JSON.stringify(decoded.value.payload, null, 2) : ''
)

function decode() {
  error.value = ''
  decoded.value = null
  if (!token.value.trim()) return
  try {
    decoded.value = decodeJwt(token.value)
    toast('Token decodificado!')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Token inválido.'
    toast('Não foi possível decodificar o token.', 'error')
  }
}

function clearAll() {
  token.value = ''
  decoded.value = null
  error.value = ''
}

const example =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

function loadExample() {
  token.value = example
  decode()
}
</script>

<template>
  <ToolShell
    icon="lucide:key-round"
    title="Decodificador JWT"
    description="Decodifique e inspecione tokens JWT (header e payload) com verificação de expiração. Processamento 100% local — o token nunca sai do seu navegador."
    help="Este decodificador NÃO valida a assinatura (isso exige a chave secreta). Ele apenas lê o conteúdo do token."
  >
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Icon icon="lucide:key-round" class="h-5 w-5 text-primary" />
          Token JWT
        </CardTitle>
        <CardDescription>Cole seu token no formato header.payload.signature.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <Textarea
          v-model="token"
          placeholder="Cole seu JWT aqui..."
          class="min-h-[120px] break-all font-mono text-sm"
        />
        <div class="flex flex-wrap gap-2">
          <Button variant="brand" :disabled="!token.trim()" @click="decode">
            <Icon icon="lucide:unlock" class="h-4 w-4" />
            Decodificar
          </Button>
          <Button variant="outline" @click="loadExample">
            <Icon icon="lucide:sparkles" class="h-4 w-4" />
            Exemplo
          </Button>
          <Button variant="outline" @click="clearAll">
            <Icon icon="lucide:rotate-ccw" class="h-4 w-4" />
            Limpar
          </Button>
        </div>

        <p v-if="error" class="flex items-center gap-2 text-sm text-destructive">
          <Icon icon="lucide:alert-circle" class="h-4 w-4" />
          {{ error }}
        </p>

        <div v-if="decoded" class="space-y-4">
          <div class="flex flex-wrap items-center gap-3">
            <Badge :variant="decoded.isExpired ? 'default' : 'success'" :class="decoded.isExpired ? 'bg-destructive' : ''">
              <Icon :icon="decoded.isExpired ? 'lucide:clock-alert' : 'lucide:check'" class="mr-1 h-3.5 w-3.5" />
              {{ decoded.isExpired ? 'Expirado' : 'Válido (não expirado)' }}
            </Badge>
            <span v-if="decoded.issuedAt" class="text-xs text-muted-foreground">
              Emitido: {{ formatDateTime(decoded.issuedAt) }}
            </span>
            <span v-if="decoded.expiresAt" class="text-xs text-muted-foreground">
              Expira: {{ formatDateTime(decoded.expiresAt) }}
            </span>
          </div>

          <div class="grid gap-4 lg:grid-cols-2">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">Header</h3>
                <Button variant="outline" size="sm" @click="copyText(headerJson)">
                  <Icon icon="lucide:copy" class="h-4 w-4" />
                  Copiar
                </Button>
              </div>
              <pre class="max-h-72 overflow-auto rounded-lg border bg-muted p-4 text-xs">{{ headerJson }}</pre>
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">Payload</h3>
                <Button variant="outline" size="sm" @click="copyText(payloadJson)">
                  <Icon icon="lucide:copy" class="h-4 w-4" />
                  Copiar
                </Button>
              </div>
              <pre class="max-h-72 overflow-auto rounded-lg border bg-muted p-4 text-xs">{{ payloadJson }}</pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <InfoCard
        title="Estrutura de um JWT"
        icon="lucide:info"
        accent="text-sky-500"
        :items="[
          'Header — algoritmo e tipo do token',
          'Payload — as claims (dados)',
          'Signature — garante a integridade',
          'Separados por ponto: header.payload.signature',
        ]"
      />
      <InfoCard
        title="Segurança"
        icon="lucide:shield-alert"
        accent="text-blue-500"
        :items="[
          'A decodificação é local — nada é enviado a servidores',
          'A assinatura NÃO é verificada aqui',
          'Nunca cole tokens de produção em sites públicos',
          'claims comuns: sub, iat, exp, iss, aud',
        ]"
      />
    </div>
  </ToolShell>
</template>
