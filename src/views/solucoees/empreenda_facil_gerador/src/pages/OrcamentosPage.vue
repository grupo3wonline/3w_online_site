<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import PageHeader from "@/components/forms/PageHeader.vue";
import PartyFields from "@/components/forms/PartyFields.vue";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardTitle from "@/components/ui/CardTitle.vue";
import CardDescription from "@/components/ui/CardDescription.vue";
import CardContent from "@/components/ui/CardContent.vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";
import Textarea from "@/components/ui/Textarea.vue";
import SelectField from "@/components/ui/Select.vue";
import Separator from "@/components/ui/Separator.vue";
import HelpTooltip from "@/components/ui/HelpTooltip.vue";
import LogoUpload from "@/components/forms/LogoUpload.vue";
import { reactive } from "vue";
import { criarParte, type Parte } from "@/composables/useDocumentParties";
import { useEmpresaStore } from "@/stores/empresa";
import { useLoadingStore } from "@/stores/loading";
import { formatCurrency, escapeHtml, parseNumber } from "@/lib/format";
import { openGeneratedDocument, type PrintAction } from "@/lib/print";
import { notify } from "@/lib/notify";
import { gerarNumero, hojeISO } from "@/lib/docNumber";
import { compartilharWhatsApp } from "@/lib/share";

interface ItemOrcamento {
  id: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
}

const loading = useLoadingStore();
const empresaStore = useEmpresaStore();
const empresa = empresaStore.dados; // persistido e compartilhado
const cliente = reactive<Parte>(criarParte());

const dados = ref({
  numero: "",
  validade: "",
  observacoes: "",
  formaPagamento: "",
  descontoTipo: "percentual",
  descontoValor: "",
  taxaValor: "",
});
const itens = ref<ItemOrcamento[]>([
  { id: crypto.randomUUID(), descricao: "", quantidade: 1, valorUnitario: 0 },
]);

const formasPagamento = [
  { value: "À Vista", label: "À Vista" },
  { value: "Cartão", label: "Cartão" },
  { value: "PIX", label: "PIX" },
  { value: "Boleto", label: "Boleto" },
  { value: "Parcelado", label: "Parcelado" },
];

const totalItem = (i: ItemOrcamento) => (i.quantidade || 0) * (i.valorUnitario || 0);
const subtotal = computed(() => itens.value.reduce((s, i) => s + totalItem(i), 0));

const desconto = computed(() => {
  const v = parseNumber(dados.value.descontoValor);
  if (v <= 0) return 0;
  return dados.value.descontoTipo === "percentual"
    ? Math.min(subtotal.value, (subtotal.value * v) / 100)
    : Math.min(subtotal.value, v);
});

const baseComDesconto = computed(() => Math.max(0, subtotal.value - desconto.value));

// Taxa/imposto adicional em percentual, aplicado após o desconto.
const taxa = computed(() => {
  const pct = parseNumber(dados.value.taxaValor);
  if (pct <= 0) return 0;
  return (baseComDesconto.value * pct) / 100;
});

const total = computed(() => baseComDesconto.value + taxa.value);

const adicionarItem = () =>
  itens.value.push({ id: crypto.randomUUID(), descricao: "", quantidade: 1, valorUnitario: 0 });

const duplicarItem = (id: string) => {
  const idx = itens.value.findIndex((i) => i.id === id);
  if (idx === -1) return;
  const original = itens.value[idx];
  itens.value.splice(idx + 1, 0, { ...original, id: crypto.randomUUID() });
};

const removerItem = (id: string) => {
  if (itens.value.length > 1) itens.value = itens.value.filter((i) => i.id !== id);
};

const numeroAutomatico = () => {
  dados.value.numero = gerarNumero("orcamento");
  notify.toast("Número gerado automaticamente");
};

const validadeHoje = () => (dados.value.validade = hojeISO());

const compartilhar = () => {
  if (!validar()) return;
  compartilharWhatsApp({
    titulo: "Orçamento",
    numero: dados.value.numero,
    cliente: cliente.nome,
    total: formatCurrency(total.value),
    extra: [`Itens: ${itens.value.length}`],
  });
};

const validar = (): boolean => {
  if (!empresa.nome.trim()) {
    notify.error("Dados incompletos", "Informe o nome da sua empresa.");
    return false;
  }
  if (itens.value.every((i) => !i.descricao.trim())) {
    notify.error("Sem itens", "Adicione ao menos um item com descrição.");
    return false;
  }
  return true;
};

const limparFormulario = async () => {
  const ok = await notify.confirm(
    "Limpar orçamento?",
    "Isso vai apagar os itens, o cliente e o desconto. Os dados da empresa serão mantidos."
  );
  if (!ok) return;
  Object.assign(cliente, criarParte());
  itens.value = [{ id: crypto.randomUUID(), descricao: "", quantidade: 1, valorUnitario: 0 }];
  dados.value = {
    numero: "",
    validade: "",
    observacoes: "",
    formaPagamento: "",
    descontoTipo: "percentual",
    descontoValor: "",
    taxaValor: "",
  };
  notify.toast("Orçamento limpo");
};

const gerarHtml = (): string => {
  const linhas = itens.value
    .map(
      (i) => `<tr>
        <td>${escapeHtml(i.descricao)}</td>
        <td style="text-align:center">${i.quantidade}</td>
        <td style="text-align:right">${formatCurrency(i.valorUnitario)}</td>
        <td style="text-align:right">${formatCurrency(totalItem(i))}</td>
      </tr>`
    )
    .join("");

  const e = empresa;
  const logoHtml = empresaStore.logo
    ? `<img src="${empresaStore.logo}" alt="Logo" class="logo" />`
    : "";
  const temAjuste = desconto.value > 0 || taxa.value > 0;
  const descontoHtml = temAjuste
    ? `<p class="subtotal">Subtotal: ${formatCurrency(subtotal.value)}</p>
       ${desconto.value > 0 ? `<p class="subtotal">Desconto: -${formatCurrency(desconto.value)}</p>` : ""}
       ${taxa.value > 0 ? `<p class="subtotal">Taxa/Impostos: +${formatCurrency(taxa.value)}</p>` : ""}`
    : "";

  return `
    <div class="header">${logoHtml}<h1>ORÇAMENTO</h1>
      <p>Nº ${escapeHtml(dados.value.numero)} &nbsp;|&nbsp; Validade: ${escapeHtml(dados.value.validade)}</p>
    </div>
    <div class="box empresa">
      <h3>Empresa</h3>
      <p><strong>${escapeHtml(e.nome)}</strong></p>
      <p>Doc: ${escapeHtml(e.documento)}</p>
      <p>${escapeHtml(e.endereco)}</p>
      <p>Tel: ${escapeHtml(e.telefone)} | E-mail: ${escapeHtml(e.email)}</p>
    </div>
    <div class="box">
      <h3>Cliente</h3>
      <p><strong>${escapeHtml(cliente.nome)}</strong></p>
      <p>Doc: ${escapeHtml(cliente.documento)}</p>
      <p>${escapeHtml(cliente.endereco)}</p>
      <p>Tel: ${escapeHtml(cliente.telefone)} | E-mail: ${escapeHtml(cliente.email)}</p>
    </div>
    <table>
      <thead><tr><th>Descrição</th><th>Qtd</th><th>Valor Unit.</th><th>Total</th></tr></thead>
      <tbody>${linhas}</tbody>
    </table>
    ${descontoHtml}
    <p class="total">VALOR TOTAL: ${formatCurrency(total.value)}</p>
    <div class="box">
      <p><strong>Forma de pagamento:</strong> ${escapeHtml(dados.value.formaPagamento)}</p>
      <p><strong>Observações:</strong> ${escapeHtml(dados.value.observacoes)}</p>
    </div>`;
};

const styles = `
  .header{text-align:center;margin-bottom:24px}
  .header .logo{max-height:80px;max-width:220px;margin-bottom:12px;object-fit:contain}
  .box{border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:16px}
  .box.empresa{background:#f8f9fa}
  table{width:100%;border-collapse:collapse;margin:16px 0}
  th,td{border:1px solid #e5e7eb;padding:10px}
  th{background:#7c3aed;color:#fff;text-align:left}
  .subtotal{text-align:right;margin:4px 0;color:#4b5563}
  .total{text-align:right;font-size:18px;font-weight:bold;margin-top:8px}`;

const gerar = (action: PrintAction) => {
  if (!validar()) return;
  loading.withLoading(() => {
    const ok = openGeneratedDocument(
      `Orçamento ${dados.value.numero}`,
      gerarHtml(),
      styles,
      action
    );
    if (!ok) notify.error("Bloqueado", "Permita pop-ups para visualizar o documento.");
  }, "Gerando orçamento...");
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <PageHeader
      icon="lucide:calculator"
      title="Gerador de Orçamentos"
      subtitle="Crie orçamentos profissionais com cálculo automático"
      :tags="['Cálculo automático', 'Layout profissional', 'Pronto para impressão']"
    />

    <div class="grid gap-8 lg:grid-cols-3">
      <div class="space-y-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              Dados da Empresa
              <HelpTooltip
                text="Salvos automaticamente no seu navegador e reaproveitados nos outros geradores."
              />
            </CardTitle>
            <CardDescription>Informações e logo que aparecerão no orçamento</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <LogoUpload v-model="empresaStore.logo" />
            <PartyFields :model-value="empresa" documento-label="CNPJ" id-prefix="empresa" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dados do Cliente</CardTitle>
            <CardDescription>Para quem é o orçamento</CardDescription>
          </CardHeader>
          <CardContent><PartyFields :model-value="cliente" id-prefix="cliente" /></CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              Itens do Orçamento
              <HelpTooltip
                text="O total de cada item é calculado automaticamente (quantidade x valor unitário)."
              />
            </CardTitle>
            <CardDescription>Adicione os produtos ou serviços</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div
              v-for="(item, idx) in itens"
              :key="item.id"
              class="rounded-lg border border-border bg-muted/30 p-4"
            >
              <div class="mb-3 flex items-center justify-between">
                <h4 class="font-medium">Item {{ idx + 1 }}</h4>
                <div class="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Duplicar item"
                    title="Duplicar item"
                    @click="duplicarItem(item.id)"
                  >
                    <Icon icon="lucide:copy" class="h-4 w-4" />
                  </Button>
                  <Button
                    v-if="itens.length > 1"
                    variant="ghost"
                    size="icon"
                    class="text-destructive"
                    aria-label="Remover item"
                    title="Remover item"
                    @click="removerItem(item.id)"
                  >
                    <Icon icon="lucide:trash-2" class="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div class="space-y-3">
                <Textarea
                  v-model="item.descricao"
                  placeholder="Descrição do produto/serviço"
                  :rows="2"
                />
                <div class="grid gap-3 md:grid-cols-3">
                  <div class="space-y-1.5">
                    <Label>Quantidade</Label>
                    <Input v-model.number="item.quantidade" type="number" min="0" step="1" />
                  </div>
                  <div class="space-y-1.5">
                    <Label>Valor Unitário</Label>
                    <Input
                      v-model.number="item.valorUnitario"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0,00"
                    />
                  </div>
                  <div class="space-y-1.5">
                    <Label>Total</Label>
                    <Input :model-value="formatCurrency(totalItem(item))" readonly />
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" class="w-full" @click="adicionarItem">
              <Icon icon="lucide:plus" class="h-4 w-4" />
              Adicionar item
            </Button>
          </CardContent>
        </Card>
      </div>

      <div class="space-y-6">
        <Card>
          <CardHeader><CardTitle>Dados do Orçamento</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-1.5">
              <Label for="numero">Número</Label>
              <div class="flex gap-2">
                <Input id="numero" v-model="dados.numero" placeholder="001/2026" />
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Gerar número automático"
                  title="Gerar número automático"
                  @click="numeroAutomatico"
                >
                  <Icon icon="lucide:wand-2" class="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div class="space-y-1.5">
              <Label for="validade">Validade</Label>
              <div class="flex gap-2">
                <Input id="validade" v-model="dados.validade" type="date" />
                <Button variant="outline" size="sm" title="Definir para hoje" @click="validadeHoje">
                  Hoje
                </Button>
              </div>
            </div>
            <div class="space-y-1.5">
              <Label for="pgto">Forma de Pagamento</Label>
              <SelectField id="pgto" v-model="dados.formaPagamento" :options="formasPagamento" />
            </div>
            <div class="space-y-1.5">
              <Label for="obs">Observações</Label>
              <Textarea
                id="obs"
                v-model="dados.observacoes"
                :rows="3"
                placeholder="Informações adicionais"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              Desconto e Taxas
              <HelpTooltip
                text="O desconto (% ou R$) é aplicado sobre o subtotal. A taxa/imposto (%) é aplicada depois, sobre o valor com desconto."
              />
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div class="space-y-1.5">
              <Label>Desconto</Label>
              <div class="grid grid-cols-2 gap-2">
                <SelectField
                  v-model="dados.descontoTipo"
                  :options="[
                    { value: 'percentual', label: 'Percentual (%)' },
                    { value: 'valor', label: 'Valor (R$)' },
                  ]"
                  placeholder="Tipo"
                />
                <Input id="desconto-valor" v-model="dados.descontoValor" placeholder="0" />
              </div>
            </div>
            <div class="space-y-1.5">
              <Label for="taxa-valor">Taxa / Impostos (%)</Label>
              <Input id="taxa-valor" v-model="dados.taxaValor" placeholder="0" />
            </div>
          </CardContent>
        </Card>

        <Card class="border-primary/20 bg-gradient-card">
          <CardHeader><CardTitle>Resumo</CardTitle></CardHeader>
          <CardContent class="space-y-2">
            <div class="flex justify-between">
              <span>Itens:</span><span>{{ itens.length }}</span>
            </div>
            <div class="flex justify-between text-muted-foreground">
              <span>Subtotal:</span><span>{{ formatCurrency(subtotal) }}</span>
            </div>
            <div v-if="desconto > 0" class="flex justify-between text-destructive">
              <span>Desconto:</span><span>-{{ formatCurrency(desconto) }}</span>
            </div>
            <div v-if="taxa > 0" class="flex justify-between text-muted-foreground">
              <span>Taxa/Impostos:</span><span>+{{ formatCurrency(taxa) }}</span>
            </div>
            <Separator />
            <div class="flex justify-between text-lg font-bold text-primary">
              <span>Total:</span><span>{{ formatCurrency(total) }}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Ações</CardTitle></CardHeader>
          <CardContent class="space-y-3">
            <Button variant="outline" class="w-full" @click="gerar('preview')">
              <Icon icon="lucide:eye" class="h-4 w-4" /> Visualizar
            </Button>
            <Button class="w-full" @click="gerar('print')">
              <Icon icon="lucide:printer" class="h-4 w-4" /> Imprimir / Salvar PDF
            </Button>
            <Button variant="success" class="w-full" @click="compartilhar">
              <Icon icon="lucide:message-circle" class="h-4 w-4" /> Compartilhar no WhatsApp
            </Button>
            <Button variant="ghost" class="w-full text-destructive" @click="limparFormulario">
              <Icon icon="lucide:eraser" class="h-4 w-4" /> Limpar formulário
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
