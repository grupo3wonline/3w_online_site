<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import PageHeader from "@/components/forms/PageHeader.vue";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardTitle from "@/components/ui/CardTitle.vue";
import CardDescription from "@/components/ui/CardDescription.vue";
import CardContent from "@/components/ui/CardContent.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";
import SelectField from "@/components/ui/Select.vue";
import Separator from "@/components/ui/Separator.vue";
import HelpTooltip from "@/components/ui/HelpTooltip.vue";
import { formatCurrency, parseNumber } from "@/lib/format";
import { precoPorMargem, precoPorMarkup, simularParcelamento } from "@/lib/finance";

// ===== Simulador de Preço de Venda =====
const preco = ref({ custo: "", metodo: "margem", percentual: "" });

const metodos = [
  { value: "margem", label: "Margem sobre a venda (%)" },
  { value: "markup", label: "Markup sobre o custo (%)" },
];

const resultadoPreco = computed(() => {
  const custo = parseNumber(preco.value.custo);
  const pct = parseNumber(preco.value.percentual);
  return preco.value.metodo === "markup" ? precoPorMarkup(custo, pct) : precoPorMargem(custo, pct);
});

const margemLiquidaPct = computed(() => {
  const { precoVenda, lucro } = resultadoPreco.value;
  return precoVenda > 0 ? (lucro / precoVenda) * 100 : 0;
});

// ===== Simulador de Parcelamento =====
const parc = ref({ valor: "", parcelas: "12", juros: "" });

const resultadoParc = computed(() =>
  simularParcelamento(
    parseNumber(parc.value.valor),
    parseInt(parc.value.parcelas || "1", 10),
    parseNumber(parc.value.juros)
  )
);

const tabelaParcelas = computed(() => {
  const n = Math.max(1, parseInt(parc.value.parcelas || "1", 10));
  return Array.from({ length: Math.min(n, 60) }, (_, i) => ({
    numero: i + 1,
    valor: resultadoParc.value.valorParcela,
  }));
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <PageHeader
      icon="lucide:trending-up"
      title="Simulador de Preço e Parcelamento"
      subtitle="Calcule o preço de venda ideal e simule parcelas com juros"
      color="bg-gradient-to-br from-amber-500 to-orange-600"
      :tags="['Precificação', 'Margem e markup', 'Parcelamento']"
    />

    <div class="grid gap-8 lg:grid-cols-2">
      <!-- Preço de venda -->
      <div class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Icon icon="lucide:tag" class="h-5 w-5 text-primary" />
              Preço de Venda
              <HelpTooltip
                text="Margem sobre a venda considera o lucro como % do preço final. Markup aplica um acréscimo sobre o custo."
              />
            </CardTitle>
            <CardDescription>A partir do custo, descubra o preço ideal</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-1.5">
              <Label for="custo">Custo do produto/serviço (R$)</Label>
              <Input id="custo" v-model="preco.custo" placeholder="100,00" />
            </div>
            <div class="space-y-1.5">
              <Label for="metodo">Método de cálculo</Label>
              <SelectField
                id="metodo"
                v-model="preco.metodo"
                :options="metodos"
                placeholder="Método"
              />
            </div>
            <div class="space-y-1.5">
              <Label for="pct">
                {{ preco.metodo === "markup" ? "Markup (%)" : "Margem (%)" }}
              </Label>
              <Input id="pct" v-model="preco.percentual" placeholder="30" />
            </div>
          </CardContent>
        </Card>

        <Card class="border-primary/20 bg-gradient-card">
          <CardHeader><CardTitle>Resultado</CardTitle></CardHeader>
          <CardContent class="space-y-2">
            <div class="flex justify-between text-muted-foreground">
              <span>Custo:</span><span>{{ formatCurrency(parseNumber(preco.custo)) }}</span>
            </div>
            <div class="flex justify-between text-muted-foreground">
              <span>Lucro:</span><span>{{ formatCurrency(resultadoPreco.lucro) }}</span>
            </div>
            <div class="flex justify-between text-muted-foreground">
              <span>Markup:</span><span>{{ resultadoPreco.markup.toFixed(2) }}x</span>
            </div>
            <div class="flex justify-between text-muted-foreground">
              <span>Margem líquida:</span><span>{{ margemLiquidaPct.toFixed(1) }}%</span>
            </div>
            <Separator />
            <div class="flex justify-between text-xl font-bold text-primary">
              <span>Preço de venda:</span
              ><span>{{ formatCurrency(resultadoPreco.precoVenda) }}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Parcelamento -->
      <div class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Icon icon="lucide:credit-card" class="h-5 w-5 text-primary" />
              Parcelamento
              <HelpTooltip
                text="Simulação pela Tabela Price (juros compostos). Deixe os juros em 0 para parcelas iguais sem acréscimo."
              />
            </CardTitle>
            <CardDescription>Simule as parcelas de uma venda</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-1.5">
              <Label for="valor-parc">Valor total (R$)</Label>
              <Input id="valor-parc" v-model="parc.valor" placeholder="1.200,00" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <Label for="n-parc">Nº de parcelas</Label>
                <Input id="n-parc" v-model="parc.parcelas" type="number" min="1" max="60" />
              </div>
              <div class="space-y-1.5">
                <Label for="juros">Juros ao mês (%)</Label>
                <Input id="juros" v-model="parc.juros" placeholder="0" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card class="border-primary/20 bg-gradient-card">
          <CardHeader><CardTitle>Resultado</CardTitle></CardHeader>
          <CardContent class="space-y-2">
            <div class="flex justify-between text-lg font-bold text-primary">
              <span>Valor da parcela:</span>
              <span>{{ formatCurrency(resultadoParc.valorParcela) }}</span>
            </div>
            <Separator />
            <div class="flex justify-between text-muted-foreground">
              <span>Total pago:</span><span>{{ formatCurrency(resultadoParc.totalPago) }}</span>
            </div>
            <div class="flex justify-between text-muted-foreground">
              <span>Total de juros:</span
              ><span>{{ formatCurrency(resultadoParc.totalJuros) }}</span>
            </div>
          </CardContent>
        </Card>

        <Card v-if="tabelaParcelas.length">
          <CardHeader><CardTitle class="text-base">Detalhamento</CardTitle></CardHeader>
          <CardContent>
            <ul class="max-h-56 space-y-1 overflow-y-auto text-sm">
              <li
                v-for="p in tabelaParcelas"
                :key="p.numero"
                class="flex justify-between rounded px-2 py-1 odd:bg-muted/40"
              >
                <span>Parcela {{ p.numero }}</span>
                <span class="font-medium">{{ formatCurrency(p.valor) }}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
