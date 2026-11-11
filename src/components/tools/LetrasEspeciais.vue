<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const input = ref('Olá Mundo!')
const estiloAtivo = ref('bold')

const estilos: { id: string; label: string; fn: (c: string) => string }[] = [
  { id: 'bold', label: '𝗡egrito', fn: c => mapChar(c, 0x1D400, 0x1D41A, 0x1D7CE) },
  { id: 'italic', label: '𝘐tálico', fn: c => mapChar(c, 0x1D434, 0x1D44E, 0x1D7CE) },
  { id: 'bolditalic', label: '𝙱𝚘𝚕𝚍 𝙸𝚝𝚊𝚕𝚒𝚌', fn: c => mapChar(c, 0x1D468, 0x1D482, 0x1D7CE) },
  { id: 'script', label: '𝒮𝒸𝓇𝒾𝓅𝓉', fn: c => mapChar(c, 0x1D49C, 0x1D4B6, 0x1D7CE) },
  { id: 'fraktur', label: '𝔉𝔯𝔞𝔨𝔱𝔲𝔯', fn: c => mapChar(c, 0x1D504, 0x1D51E, 0x1D7CE) },
  { id: 'double', label: '𝔻𝕠𝕦𝕓𝕝𝕖', fn: c => mapChar(c, 0x1D538, 0x1D552, 0x1D7D8) },
  { id: 'mono', label: '𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎', fn: c => mapChar(c, 0x1D670, 0x1D68A, 0x1D7F6) },
  { id: 'circled', label: 'Ⓒⓘⓡⓒⓛⓔⓓ', fn: (c) => { const a=c.charCodeAt(0); if(a>=65&&a<=90)return String.fromCodePoint(0x24B6+a-65); if(a>=97&&a<=122)return String.fromCodePoint(0x24D0+a-97); if(a>=48&&a<=57)return ['⓪','①','②','③','④','⑤','⑥','⑦','⑧','⑨'][a-48]; return c } },
  { id: 'wide', label: 'Ｗｉｄｅ', fn: (c) => { const a=c.charCodeAt(0); if((a>=65&&a<=90)||(a>=97&&a<=122))return String.fromCodePoint(0xFF21+(a-(a>=97?97:65)+(a>=97?26:0))); if(a>=48&&a<=57)return String.fromCodePoint(0xFF10+a-48); return c } },
  { id: 'upsidedown', label: 'uʍop ǝpᴉsdn', fn: c => { const map: Record<string,string> = {a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',m:'ɯ',n:'u',o:'o',p:'d',q:'q',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z',A:'∀',B:'ᗺ',C:'Ɔ',D:'ᗡ',E:'Ǝ',F:'Ⅎ',G:'פ',H:'H',I:'I',J:'ſ',K:'ʞ',L:'˥',M:'W',N:'N',O:'O',P:'Ԁ',Q:'Q',R:'ɹ',S:'S',T:'┴',U:'∩',V:'Λ',W:'M',X:'X',Y:'⅄',Z:'Z'}; return map[c]||c } },
  { id: 'bubble', label: '🅑🅤🅑🅑🅛🅔', fn: (c) => { const a=c.charCodeAt(0); if(a>=65&&a<=90)return ['🅐','🅑','🅒','🅓','🅔','🅕','🅖','🅗','🅘','🅙','🅚','🅛','🅜','🅝','🅞','🅟','🅠','🅡','🅢','🅣','🅤','🅥','🅦','🅧','🅨','🅩'][a-65]; return c } },
  { id: 'strikethrough', label: 'S̶t̶r̶i̶k̶e̶', fn: c => c + '\u0336' },
  { id: 'underline', label: 'U̲n̲d̲e̲r̲l̲i̲n̲e̲', fn: c => c + '\u0332' },
  { id: 'tilde', label: 'T̃ĩl̃d̃ẽ', fn: c => c + '\u0303' },
]

function mapChar(c: string, upperStart: number, lowerStart: number, digitStart: number): string {
  const a = c.charCodeAt(0)
  if (a >= 65 && a <= 90) return String.fromCodePoint(upperStart + a - 65)
  if (a >= 97 && a <= 122) return String.fromCodePoint(lowerStart + a - 97)
  if (a >= 48 && a <= 57) return String.fromCodePoint(digitStart + a - 48)
  return c
}

const estilo = computed(() => estilos.find(e => e.id === estiloAtivo.value)!)
const resultado = computed(() => {
  if (!estilo.value) return input.value
  return Array.from(input.value).map(c => estilo.value.fn(c)).join('')
})

function copiar(text: string) {
  navigator.clipboard.writeText(text)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false })
}
</script>

<template>
  <ToolShell title="Letras Especiais / Personalizadas" description="Transforme seu texto em diferentes estilos de fontes unicode, negrito, itálico, circulado e mais."
    icon="fa-font" icon-gradient="from-fuchsia-500 to-pink-700" orb-color="pink"
    :quick-tips="['14 estilos','Resultado instantâneo','Funciona em redes sociais']"
    :tips="[{title:'Uso',text:'Digite seu texto, selecione o estilo e copie o resultado.'}]">

    <div class="mb-4">
      <label class="text-xs text-blue-300 mb-1 block">Texto de entrada</label>
      <input v-model="input" class="w-full input-aurora text-lg" placeholder="Digite seu texto..." />
    </div>

    <div class="glass-panel p-4 mb-4">
      <p class="text-xs text-blue-300 mb-3">Escolha o estilo:</p>
      <div class="flex flex-wrap gap-2">
        <button v-for="e in estilos" :key="e.id" @click="estiloAtivo = e.id"
          :class="['px-3 py-1.5 rounded-lg text-sm transition-all border',
            estiloAtivo===e.id?'bg-fuchsia-600 text-white border-fuchsia-500':'bg-white/5 text-blue-200 border-white/10 hover:bg-white/10']">
          {{ e.label }}
        </button>
      </div>
    </div>

    <div class="glass-panel p-4 space-y-3">
      <label class="text-xs text-blue-300 block">Resultado:</label>
      <div class="p-4 bg-white/5 rounded-lg text-2xl text-white min-h-16 font-normal leading-relaxed break-all">
        {{ resultado }}
      </div>
      <button @click="copiar(resultado)" class="flex items-center gap-2 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-lg text-sm font-semibold transition-colors">
        <Icon icon="mdi:content-copy" class="w-4 h-4" /> Copiar
      </button>
    </div>

    <!-- All styles preview -->
    <div class="mt-5 glass-panel p-4 space-y-2">
      <p class="text-xs text-blue-300 mb-3 font-semibold">Todos os estilos (clique para copiar):</p>
      <div v-for="e in estilos" :key="e.id"
        class="flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer group transition-colors"
        @click="copiar(Array.from(input).map(c => e.fn(c)).join(''))">
        <div>
          <span class="text-[10px] text-blue-400 block">{{ e.label }}</span>
          <span class="text-white text-lg">{{ Array.from(input).map(c => e.fn(c)).join('') }}</span>
        </div>
        <Icon icon="mdi:content-copy" class="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 shrink-0" />
      </div>
    </div>
  </ToolShell>
</template>
