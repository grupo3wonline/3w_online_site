<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const slugTabMap: Record<string, string> = {
  'area-circulo':'circulo','area-quadrado':'quadrado','area-retangulo':'retangulo',
  'area-triangulo':'triangulo','area-pentagono':'pentagono','area-hexagono':'hexagono',
  'area-poligono-regular':'poligono','area-losango':'losango','area-trapezio':'trapezio',
  'area-paralelogramo':'paralelogramo','area-elipse':'elipse',
  'area-coroa-circular':'coroa','area-setor-circular':'setor',
}
const aba = ref('circulo')
onMounted(() => { aba.value = slugTabMap[route.params.slug as string] || 'circulo' })
watch(() => route.params.slug, (s) => { if (s) aba.value = slugTabMap[s as string] || aba.value })

const figuras = [
  { id: 'circulo', label: 'Círculo', icon: '⬤' },
  { id: 'quadrado', label: 'Quadrado', icon: '■' },
  { id: 'retangulo', label: 'Retângulo', icon: '▬' },
  { id: 'triangulo', label: 'Triângulo', icon: '▲' },
  { id: 'losango', label: 'Losango', icon: '◆' },
  { id: 'trapezio', label: 'Trapézio', icon: '⬟' },
  { id: 'paralelogramo', label: 'Paralelogramo', icon: '▱' },
  { id: 'elipse', label: 'Elipse', icon: '⬭' },
  { id: 'pentagono', label: 'Pentágono', icon: '⬠' },
  { id: 'hexagono', label: 'Hexágono', icon: '⬡' },
  { id: 'poligono', label: 'Polígono Regular', icon: '◐' },
  { id: 'coroa', label: 'Coroa Circular', icon: '◎' },
  { id: 'setor', label: 'Setor Circular', icon: '◔' },
]

// Inputs
const raio = ref(5); const lado = ref(4); const base = ref(6); const altura = ref(4)
const baseMaior = ref(8); const baseMenor = ref(5); const dMaior = ref(10); const dMenor = ref(6)
const semiEixoA = ref(5); const semiEixoB = ref(3); const lados = ref(6)
const raioExterno = ref(5); const raioInterno = ref(3)
const anguloSetor = ref(90)

const formula = computed<string>(() => {
  switch(aba.value){
    case 'circulo': return `A = π × r² = π × ${raio.value}² ≈`
    case 'quadrado': return `A = l² = ${lado.value}² =`
    case 'retangulo': return `A = b × h = ${base.value} × ${altura.value} =`
    case 'triangulo': return `A = (b × h) / 2 = (${base.value} × ${altura.value}) / 2 =`
    case 'losango': return `A = (D × d) / 2 = (${dMaior.value} × ${dMenor.value}) / 2 =`
    case 'trapezio': return `A = (B + b) × h / 2 = (${baseMaior.value} + ${baseMenor.value}) × ${altura.value} / 2 =`
    case 'paralelogramo': return `A = b × h = ${base.value} × ${altura.value} =`
    case 'elipse': return `A = π × a × b = π × ${semiEixoA.value} × ${semiEixoB.value} ≈`
    case 'pentagono': return `A = (5/4) × l² × tan(54°) = (5/4) × ${lado.value}² × tan(54°) ≈`
    case 'hexagono': return `A = (3√3/2) × l² = (3√3/2) × ${lado.value}² ≈`
    case 'poligono': return `A = (n × l²) / (4 × tan(π/n)) com n=${lados.value}, l=${lado.value} ≈`
    case 'coroa': return `A = π × (R² - r²) = π × (${raioExterno.value}² - ${raioInterno.value}²) ≈`
    case 'setor': return `A = (θ/360) × π × r² = (${anguloSetor.value}/360) × π × ${raio.value}² ≈`
    default: return ''
  }
})

const area = computed<number>(() => {
  switch(aba.value){
    case 'circulo': return Math.PI * raio.value ** 2
    case 'quadrado': return lado.value ** 2
    case 'retangulo': return base.value * altura.value
    case 'triangulo': return (base.value * altura.value) / 2
    case 'losango': return (dMaior.value * dMenor.value) / 2
    case 'trapezio': return ((baseMaior.value + baseMenor.value) * altura.value) / 2
    case 'paralelogramo': return base.value * altura.value
    case 'elipse': return Math.PI * semiEixoA.value * semiEixoB.value
    case 'pentagono': return (5/4) * lado.value**2 * Math.tan(54 * Math.PI/180)
    case 'hexagono': return (3 * Math.sqrt(3) / 2) * lado.value**2
    case 'poligono': return (lados.value * lado.value**2) / (4 * Math.tan(Math.PI / lados.value))
    case 'coroa': return Math.PI * (raioExterno.value**2 - raioInterno.value**2)
    case 'setor': return (anguloSetor.value / 360) * Math.PI * raio.value**2
    default: return 0
  }
})

const areaFmt = computed(() => area.value.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 6}))

function copiar() {
  navigator.clipboard.writeText(areaFmt.value)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false })
}
</script>

<template>
  <ToolShell title="Calculadora de Áreas" description="Calcule a área de 13 figuras geométricas com fórmulas explicadas."
    icon="fa-shapes" icon-gradient="from-teal-500 to-cyan-700" orb-color="teal"
    :quick-tips="['13 figuras','Fórmulas explicadas','Resultado imediato']"
    :tips="[{title:'Dica',text:'Todas as medidas devem estar na mesma unidade. O resultado estará nessa unidade ao quadrado.'}]">

    <div class="tab-row">
      <button v-for="f in figuras" :key="f.id" @click="aba = f.id"
        :class="['flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border',
          aba===f.id?'bg-teal-600 text-white border-teal-500':'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">
        <span class="text-base leading-none">{{ f.icon }}</span>{{ f.label }}
      </button>
    </div>

    <div class="glass-panel p-5 space-y-4">
      <!-- Inputs por figura -->
      <div class="grid sm:grid-cols-2 gap-3">
        <div v-if="['circulo','setor'].includes(aba)"><label class="text-xs text-blue-300 mb-1 block">Raio (r)</label><input v-model.number="raio" type="number" step="0.01" min="0" class="w-full input-aurora" /></div>
        <div v-if="['setor'].includes(aba)"><label class="text-xs text-blue-300 mb-1 block">Ângulo (θ em graus)</label><input v-model.number="anguloSetor" type="number" min="0" max="360" class="w-full input-aurora" /></div>
        <div v-if="['quadrado','pentagono','hexagono','poligono'].includes(aba)"><label class="text-xs text-blue-300 mb-1 block">Lado (l)</label><input v-model.number="lado" type="number" step="0.01" min="0" class="w-full input-aurora" /></div>
        <div v-if="['retangulo','triangulo','trapezio','paralelogramo'].includes(aba)"><label class="text-xs text-blue-300 mb-1 block">Base (b)</label><input v-model.number="base" type="number" step="0.01" min="0" class="w-full input-aurora" /></div>
        <div v-if="['retangulo','triangulo','trapezio','paralelogramo'].includes(aba)"><label class="text-xs text-blue-300 mb-1 block">Altura (h)</label><input v-model.number="altura" type="number" step="0.01" min="0" class="w-full input-aurora" /></div>
        <div v-if="['losango'].includes(aba)"><label class="text-xs text-blue-300 mb-1 block">Diagonal Maior (D)</label><input v-model.number="dMaior" type="number" step="0.01" min="0" class="w-full input-aurora" /></div>
        <div v-if="['losango'].includes(aba)"><label class="text-xs text-blue-300 mb-1 block">Diagonal Menor (d)</label><input v-model.number="dMenor" type="number" step="0.01" min="0" class="w-full input-aurora" /></div>
        <div v-if="['trapezio'].includes(aba)"><label class="text-xs text-blue-300 mb-1 block">Base Maior (B)</label><input v-model.number="baseMaior" type="number" step="0.01" min="0" class="w-full input-aurora" /></div>
        <div v-if="['trapezio'].includes(aba)"><label class="text-xs text-blue-300 mb-1 block">Base Menor (b)</label><input v-model.number="baseMenor" type="number" step="0.01" min="0" class="w-full input-aurora" /></div>
        <div v-if="['elipse'].includes(aba)"><label class="text-xs text-blue-300 mb-1 block">Semi-eixo maior (a)</label><input v-model.number="semiEixoA" type="number" step="0.01" min="0" class="w-full input-aurora" /></div>
        <div v-if="['elipse'].includes(aba)"><label class="text-xs text-blue-300 mb-1 block">Semi-eixo menor (b)</label><input v-model.number="semiEixoB" type="number" step="0.01" min="0" class="w-full input-aurora" /></div>
        <div v-if="['poligono'].includes(aba)"><label class="text-xs text-blue-300 mb-1 block">Número de lados (n)</label><input v-model.number="lados" type="number" step="1" min="3" max="20" class="w-full input-aurora" /></div>
        <div v-if="['coroa'].includes(aba)"><label class="text-xs text-blue-300 mb-1 block">Raio externo (R)</label><input v-model.number="raioExterno" type="number" step="0.01" min="0" class="w-full input-aurora" /></div>
        <div v-if="['coroa'].includes(aba)"><label class="text-xs text-blue-300 mb-1 block">Raio interno (r)</label><input v-model.number="raioInterno" type="number" step="0.01" min="0" class="w-full input-aurora" /></div>
      </div>

      <!-- Resultado -->
      <div class="p-4 bg-white/5 rounded-xl space-y-2">
        <p class="text-xs text-blue-300 font-mono">{{ formula }} <strong class="text-white">{{ areaFmt }}</strong> u²</p>
        <div class="flex items-center gap-4">
          <div>
            <p class="text-xs text-blue-300">Área</p>
            <p class="text-3xl font-bold font-mono text-green-400">{{ areaFmt }}</p>
            <p class="text-xs text-blue-300">unidades²</p>
          </div>
          <button @click="copiar" class="btn-glass text-sm py-1.5 px-3"><Icon icon="mdi:content-copy" class="w-4 h-4 mr-1 inline" />Copiar</button>
        </div>
      </div>
    </div>
  </ToolShell>
</template>


