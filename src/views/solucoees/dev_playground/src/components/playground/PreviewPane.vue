<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

type Viewport = 'mobile' | 'tablet' | 'desktop'

const props = defineProps<{
  html: string
  css: string
  js: string
  refreshKey: number
  viewport: Viewport
}>()
const emit = defineEmits<{
  refresh: []
  'update:viewport': [v: Viewport]
  fullscreen: []
}>()

const widths: Record<Viewport, string> = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%',
}

const viewports: { key: Viewport; icon: string; label: string }[] = [
  { key: 'mobile', icon: 'lucide:smartphone', label: 'Celular (375px)' },
  { key: 'tablet', icon: 'lucide:tablet', label: 'Tablet (768px)' },
  { key: 'desktop', icon: 'lucide:monitor', label: 'Desktop (100%)' },
]

const srcDoc = computed(() => {
  return `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${props.css}</style></head>
<body>${props.html}
<script>
(function(){
  var orig={log:console.log,error:console.error,warn:console.warn,info:console.info};
  function send(type){
    var args=Array.prototype.slice.call(arguments,1);
    var msg=args.map(function(a){try{return typeof a==='object'?JSON.stringify(a,null,2):String(a)}catch(e){return String(a)}}).join(' ');
    parent.postMessage({type:'console',level:type,message:msg,timestamp:Date.now()},'*');
  }
  ['log','error','warn','info'].forEach(function(m){console[m]=function(){orig[m].apply(console,arguments);send.apply(null,[m].concat(Array.prototype.slice.call(arguments)))}});
  window.addEventListener('error',function(e){send('error',e.message+' ('+e.filename+':'+e.lineno+')')});
  window.addEventListener('unhandledrejection',function(e){send('error','Promise rejeitada: '+e.reason)});
  try{${props.js}}catch(err){console.error('Erro JavaScript:',err.message)}
})();
<\/script>
</body></html>`
})
</script>

<template>
  <div class="flex h-full flex-col bg-card">
    <div class="flex items-center justify-between border-b border-editor-border bg-editor-header px-4 py-2">
      <span
        class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-editor-foreground"
      >
        <Icon icon="lucide:eye" class="h-4 w-4" /> Preview
      </span>
      <div class="flex items-center gap-1">
        <!-- Seletor de viewport -->
        <button
          v-for="vp in viewports"
          :key="vp.key"
          type="button"
          :title="vp.label"
          :aria-label="vp.label"
          class="rounded p-1.5 transition-colors"
          :class="
            viewport === vp.key
              ? 'bg-primary text-white'
              : 'text-editor-foreground/70 hover:bg-white/10'
          "
          @click="emit('update:viewport', vp.key)"
        >
          <Icon :icon="vp.icon" class="h-4 w-4" />
        </button>
        <span class="mx-1 h-4 w-px bg-editor-border" />
        <button
          type="button"
          title="Tela cheia"
          aria-label="Preview em tela cheia"
          class="rounded p-1.5 text-editor-foreground/70 hover:bg-white/10"
          @click="emit('fullscreen')"
        >
          <Icon icon="lucide:maximize-2" class="h-4 w-4" />
        </button>
        <button
          type="button"
          title="Atualizar"
          aria-label="Atualizar preview"
          class="rounded p-1.5 text-editor-foreground/70 hover:bg-white/10"
          @click="emit('refresh')"
        >
          <Icon icon="lucide:refresh-cw" class="h-4 w-4" />
        </button>
      </div>
    </div>
    <div class="flex flex-1 justify-center overflow-auto bg-muted/30 p-2">
      <iframe
        :key="refreshKey"
        :srcdoc="srcDoc"
        title="Preview do código"
        class="h-full border-0 bg-white shadow-md transition-all duration-300"
        :style="{ width: widths[viewport], maxWidth: '100%' }"
        sandbox="allow-scripts"
      />
    </div>
  </div>
</template>
