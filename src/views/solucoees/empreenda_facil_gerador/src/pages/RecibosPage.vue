<script setup lang="ts">
import { ref, computed, watch } from "vue";
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
import LogoUpload from "@/components/forms/LogoUpload.vue";
import { reactive } from "vue";
import { criarParte, type Parte } from "@/composables/useDocumentParties";
import { useEmpresaStore } from "@/stores/empresa";
import { useLoadingStore } from "@/stores/loading";
import { formatCurrency, parseNumber, numeroParaExtenso, escapeHtml } from "@/lib/format";
import { openGeneratedDocument, type PrintAction } from "@/lib/print";
import { notify } from "@/lib/notify";
import { gerarNumero, hojeISO } from "@/lib/docNumber";
import { compartilharWhatsApp } from "@/lib/share";

const loading = useLoadingStore();
const empresaStore = useEmpresaStore();
const empresa = empresaStore.dados;
const cliente = reactive<Parte>(criarParte());

const dados = ref({
  numero: "",
  data: hojeISO(), // preenche com a data de hoje por padrão
  valor: "",
  descricao: "",
  formaPagamento: "",
  tipoRecibo: "venda",
  observacoes: "",
});

const valorExtenso = ref("");
watch(
  () => dados.value.valor,
  (v) => {
    valorExtenso.value = numeroParaExtenso(parseNumber(v));
  }
);

const valorNumerico = computed(() => parseNumber(dados.value.valor));

const tiposRecibo = [
  { value: "venda", label: "Venda" },
  { value: "compra", label: "Compra" },
  { value: "servico", label: "Prestação de Serviços" },
];
const formasPagamento = [
  { value: "Dinheiro", label: "Dinheiro" },
  { value: "PIX", label: "PIX" },
  { value: "Cartão", label: "Cartão" },
  { value: "Cheque", label: "Cheque" },
  { value: "Transferência", label: "Transferência" },
];

const tipoTexto = () =>
  ({ venda: "VENDA", compra: "COMPRA", servico: "PRESTAÇÃO DE SERVIÇOS" })[
    dados.value.tipoRecibo
  ] ?? "VENDA";

const validar = (): boolean => {
  if (!empresa.nome.trim()) {
    notify.error("Dados incompletos", "Informe o nome do emitente.");
    return false;
  }
  if (valorNumerico.value <= 0) {
    notify.error("Valor inválido", "Informe um valor maior que zero.");
    return false;
  }
  return true;
};

const numeroAutomatico = () => {
  dados.value.numero = gerarNumero("recibo");
  notify.toast("Número gerado automaticamente");
};

const dataHoje = () => (dados.value.data = hojeISO());

const limparFormulario = async () => {
  const ok = await notify.confirm(
    "Limpar recibo?",
    "Isso vai apagar os dados do pagador e do pagamento. Os dados do emitente serão mantidos."
  );
  if (!ok) return;
  Object.assign(cliente, criarParte());
  dados.value = {
    numero: "",
    data: hojeISO(),
    valor: "",
    descricao: "",
    formaPagamento: "",
    tipoRecibo: "venda",
    observacoes: "",
  };
  notify.toast("Recibo limpo");
};

const compartilhar = () => {
  if (!validar()) return;
  compartilharWhatsApp({
    titulo: "Recibo",
    numero: dados.value.numero,
    cliente: cliente.nome,
    total: formatCurrency(valorNumerico.value),
    extra: [`Referente a: ${dados.value.descricao || "-"}`],
  });
};

const gerarHtml = (): string => {
  const e = empresa;
  const logoHtml = empresaStore.logo
    ? `<img src="${empresaStore.logo}" alt="Logo" class="logo" />`
    : "";
  return `
  <div class="header">
    ${logoHtml}
    <h1>RECIBO DE ${tipoTexto()}</h1>
    <div class="info"><h2>Nº ${escapeHtml(dados.value.numero)}</h2><p>Data: ${escapeHtml(dados.value.data)}</p></div>
  </div>
  <div class="box empresa">
    <h3>Emitente</h3>
    <p><strong>${escapeHtml(e.nome)}</strong></p>
    <p>Doc: ${escapeHtml(e.documento)} | Tel: ${escapeHtml(e.telefone)}</p>
    <p>${escapeHtml(e.endereco)}</p>
  </div>
  <p style="font-size:15px;line-height:1.7">
    Recebi de <strong>${escapeHtml(cliente.nome)}</strong>, documento <strong>${escapeHtml(cliente.documento)}</strong>,
    a importância abaixo:
  </p>
  <div class="destaque">
    <div class="valor">${formatCurrency(valorNumerico.value)}</div>
    <div class="extenso">(${escapeHtml(valorExtenso.value)})</div>
  </div>
  <div class="box">
    <p><strong>Referente a:</strong> ${escapeHtml(dados.value.descricao)}</p>
    <p><strong>Forma de pagamento:</strong> ${escapeHtml(dados.value.formaPagamento)}</p>
    ${dados.value.observacoes ? `<p><strong>Observações:</strong> ${escapeHtml(dados.value.observacoes)}</p>` : ""}
  </div>
  <div class="assinatura">
    <div class="linha"><p><strong>${escapeHtml(e.nome)}</strong></p><p>Assinatura do emitente</p></div>
  </div>`;
};

const styles = `
  .header{text-align:center;margin-bottom:24px}
  .header .logo{max-height:80px;max-width:220px;margin-bottom:12px;object-fit:contain}
  .info{background:#7c3aed;color:#fff;padding:12px;border-radius:8px;margin-top:8px}
  .box{border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:16px 0}
  .box.empresa{background:#f8f9fa}
  .destaque{background:#f5f3ff;border:2px solid #7c3aed;border-radius:8px;padding:18px;text-align:center;margin:18px 0}
  .destaque .valor{font-size:26px;font-weight:bold;color:#5b21b6}
  .destaque .extenso{font-style:italic;margin-top:6px}
  .assinatura{margin-top:56px;text-align:center}
  .assinatura .linha{border-top:1px solid #000;width:300px;margin:0 auto;padding-top:8px}`;

const gerar = (action: PrintAction) => {
  if (!validar()) return;
  loading.withLoading(() => {
    const ok = openGeneratedDocument(`Recibo ${dados.value.numero}`, gerarHtml(), styles, action);
    if (!ok) notify.error("Bloqueado", "Permita pop-ups para visualizar o documento.");
  }, "Gerando recibo...");
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <PageHeader
      icon="lucide:receipt"
      title="Gerador de Recibos"
      subtitle="Emita recibos de venda, compra e serviços"
      color="bg-gradient-to-br from-purple-500 to-fuchsia-600"
      :tags="['Valor por extenso', 'Múltiplos tipos', 'Formato legal']"
    />

    <div class="grid gap-8 lg:grid-cols-3">
      <div class="space-y-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Dados do Emitente</CardTitle>
            <CardDescription
              >Quem está emitindo o recibo (dados salvos automaticamente)</CardDescription
            >
          </CardHeader>
          <CardContent class="space-y-4">
            <LogoUpload v-model="empresaStore.logo" />
            <PartyFields :model-value="empresa" documento-label="CPF / CNPJ" id-prefix="emitente" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dados do Pagador</CardTitle>
            <CardDescription>Quem está pagando</CardDescription>
          </CardHeader>
          <CardContent><PartyFields :model-value="cliente" id-prefix="pagador" /></CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Recibo</CardTitle>
            <CardDescription>Informações do pagamento</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-1.5">
                <Label for="valor">Valor (R$)</Label>
                <Input id="valor" v-model="dados.valor" placeholder="1.000,00" />
              </div>
              <div class="space-y-1.5">
                <Label for="forma">Forma de Pagamento</Label>
                <SelectField id="forma" v-model="dados.formaPagamento" :options="formasPagamento" />
              </div>
            </div>
            <div v-if="valorExtenso" class="rounded-lg bg-muted/50 p-3">
              <Label class="text-xs">Valor por extenso</Label>
              <p class="text-sm capitalize italic">{{ valorExtenso }}</p>
            </div>
            <div class="space-y-1.5">
              <Label for="desc">Referente a</Label>
              <Textarea
                id="desc"
                v-model="dados.descricao"
                :rows="3"
                placeholder="Descrição do produto/serviço"
              />
            </div>
            <div class="space-y-1.5">
              <Label for="obs">Observações</Label>
              <Textarea id="obs" v-model="dados.observacoes" :rows="2" placeholder="Opcional" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="space-y-6">
        <Card>
          <CardHeader><CardTitle>Informações</CardTitle></CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-1.5">
              <Label for="num">Número</Label>
              <div class="flex gap-2">
                <Input id="num" v-model="dados.numero" placeholder="001/2026" />
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
              <Label for="data">Data</Label>
              <div class="flex gap-2">
                <Input id="data" v-model="dados.data" type="date" />
                <Button variant="outline" size="sm" title="Definir para hoje" @click="dataHoje">
                  Hoje
                </Button>
              </div>
            </div>
            <div class="space-y-1.5">
              <Label for="tipo">Tipo de Recibo</Label>
              <SelectField
                id="tipo"
                v-model="dados.tipoRecibo"
                :options="tiposRecibo"
                placeholder="Selecione"
              />
            </div>
          </CardContent>
        </Card>

        <Card class="border-primary/20 bg-gradient-card">
          <CardHeader><CardTitle>Resumo</CardTitle></CardHeader>
          <CardContent class="space-y-2">
            <div class="flex justify-between">
              <span>Tipo:</span><span class="capitalize">{{ dados.tipoRecibo }}</span>
            </div>
            <div class="flex justify-between">
              <span>Pagamento:</span><span>{{ dados.formaPagamento || "-" }}</span>
            </div>
            <Separator />
            <div class="flex justify-between text-lg font-bold text-primary">
              <span>Valor:</span><span>{{ formatCurrency(valorNumerico) }}</span>
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
