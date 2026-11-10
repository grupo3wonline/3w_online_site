import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Download, ClipboardCopy, RotateCcw, Rocket, List, FileDown, Trash2 } from "lucide-react";

function chunk<T>(arr: T[], size: number): T[][] {
  if (!size || size <= 0) return [arr];
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const CPF_REGEX = /(\d{3}\.?\d{3}\.?\d{3}-?\d{2})/g;
const CNPJ_REGEX = /(\d{2}\.?\d{3}\.?\d{3}\/??\d{4}-?\d{2})/g;

const onlyDigits = (s: string) => s.replace(/\D/g, "");

function isValidCPF(cpfRaw: string) {
  const cpf = onlyDigits(cpfRaw);
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let d1 = (sum * 10) % 11;
  if (d1 === 10) d1 = 0;
  if (d1 !== parseInt(cpf[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  let d2 = (sum * 10) % 11;
  if (d2 === 10) d2 = 0;
  return d2 === parseInt(cpf[10]);
}

function isValidCNPJ(cnpjRaw: string) {
  const cnpj = onlyDigits(cnpjRaw);
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  const calc = (base: string, weights: number[]) => {
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += parseInt(base[i]) * weights[i];
    }
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };
  const d1 = calc(cnpj.slice(0, 12), [5,4,3,2,9,8,7,6,5,4,3,2]);
  if (d1 !== parseInt(cnpj[12])) return false;
  const d2 = calc(cnpj.slice(0, 13), [6,5,4,3,2,9,8,7,6,5,4,3,2]);
  return d2 === parseInt(cnpj[13]);
}

export default function EmailExtractor() {
const [text, setText] = useState("");
const [dedupe, setDedupe] = useState(true);
const [mode, setMode] = useState<"email" | "cpf" | "cnpj">("email");
const [separator, setSeparator] = useState<"comma" | "semicolon" | "newline">("comma");
const [groupSize, setGroupSize] = useState<number>(0);
const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
const [docFormat, setDocFormat] = useState<"formatted" | "raw">("formatted");
const [results, setResults] = useState<string[]>([]);
const [elapsed, setElapsed] = useState<number>(0);
const [page, setPage] = useState(1);
const perPage = 100;

  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const extractFromText = (t: string): string[] => {
    if (!t) return [];
    if (mode === "email") {
      const matches = t.match(EMAIL_REGEX) || [];
      const normalized = matches.map(e => e.trim().toLowerCase());
      return dedupe ? Array.from(new Set(normalized)) : normalized;
    } else if (mode === "cpf") {
      const matches = t.match(CPF_REGEX) || [];
      const normalized = matches.map(onlyDigits).filter(isValidCPF);
      return dedupe ? Array.from(new Set(normalized)) : normalized;
    } else {
      const matches = t.match(CNPJ_REGEX) || [];
      const normalized = matches.map(onlyDigits).filter(isValidCNPJ);
      return dedupe ? Array.from(new Set(normalized)) : normalized;
    }
  };

  const hasPotentialMatches = useMemo(() => {
    if (!text) return false;
    const pattern = mode === "email" ? EMAIL_REGEX : mode === "cpf" ? CPF_REGEX : CNPJ_REGEX;
    return (text.match(pattern) || []).length > 0;
  }, [text, mode]);
  const canExtract = hasPotentialMatches;

  function formatCPF(d: string) {
    const v = onlyDigits(d);
    return `${v.slice(0,3)}.${v.slice(3,6)}.${v.slice(6,9)}-${v.slice(9,11)}`;
  }
  function formatCNPJ(d: string) {
    const v = onlyDigits(d);
    return `${v.slice(0,2)}.${v.slice(2,5)}.${v.slice(5,8)}/${v.slice(8,12)}-${v.slice(12,14)}`;
  }

  const finalResults = useMemo(() => {
    let arr = results;
    if (mode !== "email") {
      arr = results.map((r) => docFormat === "formatted" ? (mode === "cpf" ? formatCPF(r) : formatCNPJ(r)) : r);
    }
    if (sortOrder === "asc") return [...arr].sort((a, b) => a.localeCompare(b, "pt-BR"));
    if (sortOrder === "desc") return [...arr].sort((a, b) => b.localeCompare(a, "pt-BR"));
    return arr;
  }, [results, mode, docFormat, sortOrder]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return finalResults.slice(start, start + perPage);
  }, [page, finalResults]);

  const formattedOutput = useMemo(() => {
    const sep = separator === "comma" ? "," : separator === "semicolon" ? ";" : "\n";
    const groups = chunk(finalResults, groupSize || finalResults.length);
    return groups.map(g => g.join(sep)).join("\n\n");
  }, [finalResults, separator, groupSize]);

  function extract() {
    const t0 = performance.now();
    const unique = extractFromText(text);
    const dt = performance.now() - t0;
    setResults(unique);
    setElapsed(dt);
    setPage(1);
    const label = mode === "email" ? "e-mails" : mode === "cpf" ? "CPFs" : "CNPJs";
    if (unique.length) {
      toast({ title: "Extração concluída", description: `${unique.length} ${label} encontrados em ${Math.round(dt)}ms.` });
    } else {
      const singular = label.endsWith("s") ? label.slice(0, -1) : label;
      toast({ title: `Nenhum ${singular} válido encontrado`, description: "Verifique o texto ou tente outro tipo." });
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(formattedOutput).then(() =>
      toast({ title: "Copiado!", description: "Lista copiada para a área de transferência." })
    );
  }

  function downloadFile(filename: string, content: string, mime: string) {
    const blob = new Blob([content], { type: mime + ";charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportTXT() { downloadFile(`${mode}-extraidos.txt`, formattedOutput, "text/plain"); }
  function exportCSV() {
    const header = mode === "email" ? "email" : mode;
    const csv = [header, ...finalResults].join("\n");
    downloadFile(`${mode}-extraidos.csv`, csv, "text/csv");
  }
  function exportXML() {
    const rootTag = mode === "email" ? "emails" : mode === "cpf" ? "cpfs" : "cnpjs";
    const itemTag = mode === "email" ? "email" : mode;
    const xml = `<${rootTag}>\n${finalResults.map(e => `  <${itemTag}>${e}</${itemTag}>`).join("\n")}\n</${rootTag}>`;
    downloadFile(`${mode}-extraidos.xml`, xml, "application/xml");
  }

  function fillExample() {
    const demo = `Olá! Entre em contato: contato@empresa.com, vendas@empresa.com.br, suporte@exemplo.io.\nTambém temos parceiros: maria.silva+news@gmail.com; joao_souza@provedor.net; contato@empresa.com`;
    setText(demo);
  }

  return (
    <section id="extrator" className="py-16">
      <div className="container max-w-5xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Extrator de E-mails, CPF e CNPJ</h2>
          <p className="mt-2 text-muted-foreground">Cole seu texto e extraia e-mails, CPF e CNPJ válidos em segundos.</p>
        </div>

        <Card className="card-elevated">
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-xl">Entrada de texto</CardTitle>
            <div className="flex gap-2">
              <Button variant="subtle" onClick={fillExample} type="button">Preencher exemplo</Button>
              <Button variant="ghost" onClick={() => setText("")} type="button" aria-label="Limpar texto">
                <RotateCcw className="mr-2" /> Limpar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              value={text}
              onChange={(e) => {
                if (e.target.value.length <= 100000) setText(e.target.value);
              }}
              className="min-h-[220px]"
              placeholder="Cole aqui até 100.000 caracteres..."
            />

            <div className="grid gap-4 md:grid-cols-5">
              <div className="space-y-1">
                <Label>Tipo de dado</Label>
                <Select value={mode} onValueChange={(v: any) => setMode(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">E-mail</SelectItem>
                    <SelectItem value="cpf">CPF</SelectItem>
                    <SelectItem value="cnpj">CNPJ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {mode !== "email" && (
                <div className="space-y-1">
                  <Label>Formato (CPF/CNPJ)</Label>
                  <Select value={docFormat} onValueChange={(v: any) => setDocFormat(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formatted">Com pontuação</SelectItem>
                      <SelectItem value="raw">Sem pontuação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Checkbox id="dedupe" checked={dedupe} onCheckedChange={(v) => setDedupe(!!v)} />
                <Label htmlFor="dedupe">Eliminar duplicados</Label>
              </div>

              <div className="space-y-1">
                <Label>Separador</Label>
                <Select value={separator} onValueChange={(v: any) => setSeparator(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o separador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comma">Vírgula (,)</SelectItem>
                    <SelectItem value="semicolon">Ponto e vírgula (;)</SelectItem>
                    <SelectItem value="newline">Quebra de linha (\n)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Ordenar</Label>
                <Select value={sortOrder} onValueChange={(v: any) => setSortOrder(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sem ordenação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sem ordenação</SelectItem>
                    <SelectItem value="asc">A-Z (crescente)</SelectItem>
                    <SelectItem value="desc">Z-A (decrescente)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="group">Agrupar em blocos</Label>
                <Input id="group" type="number" min={0} placeholder="Ex: 50 (0 = sem agrupamento)"
                  value={groupSize || ''}
                  onChange={(e) => setGroupSize(Math.max(0, Number(e.target.value)))} />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="hero" onClick={extract} disabled={!canExtract}>
                <Rocket className="mr-2" /> {mode === "email" ? "Extrair E-mails" : mode === "cpf" ? "Extrair CPF" : "Extrair CNPJ"}
              </Button>
              <Button type="button" onClick={copyToClipboard} disabled={results.length === 0}>
                <ClipboardCopy className="mr-2" /> Copiar
              </Button>
              <Button type="button" variant="secondary" onClick={exportTXT} disabled={results.length === 0}>
                <FileDown className="mr-2" /> Baixar .TXT
              </Button>
              <Button type="button" variant="secondary" onClick={exportCSV} disabled={results.length === 0}>
                <FileDown className="mr-2" /> Baixar .CSV
              </Button>
              <Button type="button" variant="secondary" onClick={exportXML} disabled={results.length === 0}>
                <FileDown className="mr-2" /> Baixar .XML
              </Button>
              <Button type="button" variant="ghost" onClick={() => { setResults([]); toast({ title: "Resultados limpos", description: "Os itens extraídos foram removidos." }); }} disabled={results.length === 0}>
                <Trash2 className="mr-2" /> Limpar extraídos
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>Total: <strong className="text-foreground">{total}</strong></span>
              <span>Tempo: {Math.round(elapsed)} ms</span>
              <span>Tamanho da entrada: {text.length.toLocaleString()} chars</span>
            </div>

            <Tabs defaultValue="formatado" className="w-full">
              <TabsList>
                <TabsTrigger value="formatado">Formatado</TabsTrigger>
                <TabsTrigger value="lista"><List className="mr-2" />Lista</TabsTrigger>
              </TabsList>
              <TabsContent value="formatado">
                <Textarea readOnly value={formattedOutput} className="min-h-[160px]" />
              </TabsContent>
              <TabsContent value="lista">
                {pageItems.length === 0 ? (
                  <p className="text-muted-foreground">Sem resultados. Extraia primeiro.</p>
                ) : (
                  <div className="space-y-3">
                    <ul className="grid gap-1 md:grid-cols-2">
                      {pageItems.map((e, i) => (
                        <li key={i} className="rounded-md border bg-card px-3 py-2 text-sm">{e}</li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Página {page} de {totalPages}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Anterior</Button>
                        <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Próxima</Button>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
