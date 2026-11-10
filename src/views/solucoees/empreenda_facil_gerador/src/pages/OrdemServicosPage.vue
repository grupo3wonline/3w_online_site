<script setup lang="ts">
import { ref } from "vue";
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
import LogoUpload from "@/components/forms/LogoUpload.vue";
import { reactive } from "vue";
import { criarParte, type Parte } from "@/composables/useDocumentParties";
import { useEmpresaStore } from "@/stores/empresa";
import { useLoadingStore } from "@/stores/loading";
import { escapeHtml } from "@/lib/format";
import { openGeneratedDocument, type PrintAction } from "@/lib/print";
import { notify } from "@/lib/notify";
import { gerarNumero, hojeISO } from "@/lib/docNumber";

const loading = useLoadingStore();
const empresaStore = useEmpresaStore();
const empresa = empresaStore.dados;
const cliente = reactive<Parte>(criarParte());

const criarDados = () => ({
  numero: "",
  dataEmissao: hojeISO(),
  dataPrevisao: "",
  prioridade: "",
  tipoServico: "",
  descricaoProblema: "",
  servicosExecutados: "",
  observacoes: "",
  responsavel: "",
  status: "aberta",
});
const dados = ref(criarDados());

const prioridades = [
  { value: "Baixa", label: "Baixa" },
  { value: "Média", label: "Média" },
  { value: "Alta", label: "Alta" },
  { value: "Urgente", label: "Urgente" },
];
const tiposServico = [
  { value: "Manutenção", label: "Manutenção" },
  { value: "Instalação", label: "Instalação" },
  { value: "Reparo", label: "Reparo" },
  { value: "Consultoria", label: "Consultoria" },
  { value: "Outro", label: "Outro" },
];
const statusOpcoes = [
  { value: "aberta", label: "Aberta" },
  { value: "andamento", label: "Em Andamento" },
  { value: "concluida", label: "Concluída" },
];
const statusLabel = () =>
  ({ aberta: "ABERTA", andamento: "EM ANDAMENTO", concluida: "CONCLUÍDA" })[dados.value.status] ??
  "ABERTA";

const validar = (): boolean => {
  if (!empresa.nome.trim()) {
    notify.error("Dados incompletos", "Informe o nome da empresa.");
    return false;
  }
  if (!dados.value.descricaoProblema.trim()) {
    notify.error("Descrição obrigatória", "Descreva o problema relatado.");
    return false;
  }
  return true;
};

const numeroAutomatico = () => {
  dados.value.numero = gerarNumero("os");
  notify.toast("Número gerado automaticamente");
};

const emissaoHoje = () => (dados.value.dataEmissao = hojeISO());
const previsaoHoje = () => (dados.value.dataPrevisao = hojeISO());

const limparFormulario = async () => {
  const ok = await notify.confirm(
    "Limpar ordem de serviço?",
    "Isso vai apagar os dados do cliente e do serviço. Os dados da empresa serão mantidos."
  );
  if (!ok) return;
  Object.assign(cliente, criarParte());
  dados.value = criarDados();
  notify.toast("Ordem de serviço limpa");
};

const gerarHtml = (): string => {
  const e = empresa;
  const logoHtml = empresaStore.logo
    ? `<img src="${empresaStore.logo}" alt="Logo" class="logo" />`
    : "";
  return `
  <div class="header">
    ${logoHtml}
    <h1>ORDEM DE SERVIÇO</h1>
    <div class="info"><h2>OS Nº ${escapeHtml(dados.value.numero)}</h2>
      <p>Emissão: ${escapeHtml(dados.value.dataEmissao)} | Previsão: ${escapeHtml(dados.value.dataPrevisao)}</p>
    </div>
  </div>
  <div class="box empresa">
    <h3>Empresa</h3><p><strong>${escapeHtml(e.nome)}</strong></p>
    <p>Doc: ${escapeHtml(e.documento)} | Tel: ${escapeHtml(e.telefone)}</p>
    <p>${escapeHtml(e.endereco)}</p>
  </div>
  <div class="box">
    <h3>Cliente</h3><p><strong>${escapeHtml(cliente.nome)}</strong></p>
    <p>Doc: ${escapeHtml(cliente.documento)} | Tel: ${escapeHtml(cliente.telefone)}</p>
    <p>${escapeHtml(cliente.endereco)}</p>
  </div>
  <div class="grid2">
    <div>
      <p><strong>Prioridade:</strong> ${escapeHtml(dados.value.prioridade)}</p>
      <p><strong>Tipo:</strong> ${escapeHtml(dados.value.tipoServico)}</p>
      <p><strong>Responsável:</strong> ${escapeHtml(dados.value.responsavel)}</p>
    </div>
    <div class="status status-${dados.value.status}">Status: ${statusLabel()}</div>
  </div>
  <div class="box">
    <h3>Descrição do Problema</h3><p>${escapeHtml(dados.value.descricaoProblema)}</p>
    <h3>Serviços a Executar</h3><p>${escapeHtml(dados.value.servicosExecutados)}</p>
    <h3>Observações</h3><p>${escapeHtml(dados.value.observacoes)}</p>
  </div>
  <div class="grid2 assinaturas">
    <div><p>_______________________</p><p>Assinatura do Cliente</p></div>
    <div><p>_______________________</p><p>Assinatura do Responsável</p></div>
  </div>`;
};

const styles = `
  .header{text-align:center;margin-bottom:24px}
  .header .logo{max-height:80px;max-width:220px;margin-bottom:12px;object-fit:contain}
  .info{background:#7c3aed;color:#fff;padding:12px;border-radius:8px;margin-top:8px}
  .box{border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:16px 0}
  .box.empresa{background:#f8f9fa}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0}
  .status{padding:12px;border-radius:6px;text-align:center;font-weight:bold;align-self:start}
  .status-aberta{background:#fef3c7;color:#92400e}
  .status-andamento{background:#dbeafe;color:#1e40af}
  .status-concluida{background:#d1fae5;color:#065f46}
  .assinaturas{margin-top:48px;text-align:center}`;

const gerar = (action: PrintAction) => {
  if (!validar()) return;
  loading.withLoading(() => {
    const ok = openGeneratedDocument(`OS ${dados.value.numero}`, gerarHtml(), styles, action);
    if (!ok) notify.error("Bloqueado", "Permita pop-ups para visualizar o documento.");
  }, "Gerando ordem de serviço...");
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <PageHeader
      icon="lucide:file-text"
      title="Gerador de Ordem de Serviço"
      subtitle="Gere ordens de serviço detalhadas e organizadas"
      color="bg-gradient-to-br from-emerald-500 to-green-600"
      :tags="['Controle de status', 'Prioridades', 'Assinaturas']"
    />

    <div class="grid gap-8 lg:grid-cols-3">
      <div class="space-y-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Dados da Empresa</CardTitle>
            <CardDescription>Dados salvos automaticamente no seu navegador</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <LogoUpload v-model="empresaStore.logo" />
            <PartyFields :model-value="empresa" documento-label="CNPJ" id-prefix="empresa" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Dados do Cliente</CardTitle></CardHeader>
          <CardContent><PartyFields :model-value="cliente" id-prefix="cliente" /></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Serviço</CardTitle>
            <CardDescription>Informações técnicas da OS</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-1.5">
              <Label for="prob">Descrição do Problema</Label>
              <Textarea
                id="prob"
                v-model="dados.descricaoProblema"
                :rows="4"
                placeholder="Descreva o problema relatado"
              />
            </div>
            <div class="space-y-1.5">
              <Label for="serv">Serviços a Executar</Label>
              <Textarea
                id="serv"
                v-model="dados.servicosExecutados"
                :rows="4"
                placeholder="Liste os serviços"
              />
            </div>
            <div class="space-y-1.5">
              <Label for="obs">Observações Gerais</Label>
              <Textarea
                id="obs"
                v-model="dados.observacoes"
                :rows="3"
                placeholder="Materiais, notas, etc."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="space-y-6">
        <Card>
          <CardHeader><CardTitle>Informações da OS</CardTitle></CardHeader>
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
              <Label for="emis">Data de Emissão</Label>
              <div class="flex gap-2">
                <Input id="emis" v-model="dados.dataEmissao" type="date" />
                <Button variant="outline" size="sm" title="Definir para hoje" @click="emissaoHoje">
                  Hoje
                </Button>
              </div>
            </div>
            <div class="space-y-1.5">
              <Label for="prev">Previsão de Conclusão</Label>
              <div class="flex gap-2">
                <Input id="prev" v-model="dados.dataPrevisao" type="date" />
                <Button variant="outline" size="sm" title="Definir para hoje" @click="previsaoHoje">
                  Hoje
                </Button>
              </div>
            </div>
            <div class="space-y-1.5">
              <Label for="prio">Prioridade</Label>
              <SelectField id="prio" v-model="dados.prioridade" :options="prioridades" />
            </div>
            <div class="space-y-1.5">
              <Label for="tsrv">Tipo de Serviço</Label>
              <SelectField id="tsrv" v-model="dados.tipoServico" :options="tiposServico" />
            </div>
            <div class="space-y-1.5">
              <Label for="resp">Responsável Técnico</Label>
              <Input id="resp" v-model="dados.responsavel" placeholder="Nome do técnico" />
            </div>
            <div class="space-y-1.5">
              <Label for="stat">Status</Label>
              <SelectField
                id="stat"
                v-model="dados.status"
                :options="statusOpcoes"
                placeholder="Selecione"
              />
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
            <Button variant="ghost" class="w-full text-destructive" @click="limparFormulario">
              <Icon icon="lucide:eraser" class="h-4 w-4" /> Limpar formulário
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
