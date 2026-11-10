import { Helmet } from "react-helmet-async";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useLocalHistory } from "@/hooks/use-history";
import { copyToClipboard, shareResult } from "@/lib/share";
import { toPng } from "html-to-image";
import { toast } from "@/hooks/use-toast";

interface NameHistoryItem {
  type: "nomes";
  params: { qty: number; repetir: boolean; total: number };
  result: string[];
  at: number;
}

function cleanNames(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((n) => n.trim())
    .filter(Boolean);
}

function sample<T>(arr: T[], qty: number, withReplacement: boolean): T[] {
  if (withReplacement) {
    const res: T[] = [];
    for (let i = 0; i < qty; i++) {
      res.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    return res;
  }
  if (qty > arr.length) return [...arr];
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, qty);
}

export default function NamesDraw() {
  const [raw, setRaw] = useState("");
  const [qty, setQty] = useState(1);
  const [repetir, setRepetir] = useState(false);
  const [result, setResult] = useState<string[] | null>(null);
  const { items, add, clear } = useLocalHistory<NameHistoryItem>("history-names", 30);
  const resultRef = useRef<HTMLDivElement>(null);

  const names = useMemo(() => cleanNames(raw), [raw]);

  const handleDraw = () => {
    if (names.length < 2) {
      toast({ title: "Lista muito curta", description: "Insira pelo menos 2 nomes.", variant: "destructive" as any });
      return;
    }
    if (!repetir && qty > names.length) {
      toast({ title: "Limite excedido", description: "Sem repetição, a quantidade não pode exceder o número de nomes.", variant: "destructive" as any });
      return;
    }
    const res = sample(names, Math.max(1, qty), repetir);
    setResult(res);
    add({ type: "nomes", params: { qty, repetir, total: names.length }, result: res, at: Date.now() });
  };

  const handleExportImage = async () => {
    if (!resultRef.current) return;
    try {
      const dataUrl = await toPng(resultRef.current);
      const link = document.createElement("a");
      link.download = "resultado-sorteio.png";
      link.href = dataUrl;
      link.click();
    } catch (e) {
      toast({ title: "Falha ao exportar", description: "Tente novamente.", variant: "destructive" as any });
    }
  };

  const handleShare = async () => {
    if (!result) return;
    await shareResult("Resultado do sorteio", `Sorteio por NOMES: ${result.join(", ")}`);
  };

  const handleCopy = async () => {
    if (!result) return;
    await copyToClipboard(result.join(", "));
  };

  return (
    <main className="container mx-auto max-w-5xl py-10">
      <Helmet>
        <title>Sorteio por Nomes | Ferramenta de Sorteios</title>
        <meta name="description" content="Cole nomes, defina a quantidade de sorteados e gere vencedores aleatoriamente com opção de repetição." />
        <link rel="canonical" href="/nomes" />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl font-bold">Sorteio por NOMES</h1>
        <p className="text-muted-foreground mt-2">Cole uma lista de participantes e defina a quantidade de ganhadores.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Participantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="names">Nomes (um por linha)</Label>
              <Textarea id="names" rows={10} value={raw} onChange={(e) => setRaw(e.target.value)} placeholder="Ana\nBruno\nCarla\n..." />
            </div>
            <div className="grid grid-cols-2 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="qty">Quantidade de sorteados</Label>
                <Input id="qty" type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
              </div>
              <div className="flex items-center gap-3">
                <Switch id="repetir" checked={repetir} onCheckedChange={setRepetir} />
                <Label htmlFor="repetir">Permitir repetição</Label>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="hero" onClick={handleDraw}>Sortear</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Resultado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div ref={resultRef} className="rounded-lg border p-4">
              {result ? (
                <ul className="space-y-2">
                  {result.map((n, i) => (
                    <li key={i} className="text-xl font-semibold">{n}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">O resultado aparecerá aqui.</p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleDraw}>Sortear novamente</Button>
              <Button variant="secondary" onClick={handleShare}>Compartilhar</Button>
              <Button variant="outline" onClick={handleCopy}>Copiar</Button>
              <Button variant="outline" onClick={handleExportImage}>Exportar imagem</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Histórico (sessão atual)</h2>
          <Button variant="ghost" onClick={clear}>Limpar histórico</Button>
        </div>
        {items.length === 0 ? (
          <p className="text-muted-foreground">Nenhum sorteio ainda.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {items.map((h, i) => (
              <Card key={i}>
                <CardContent className="py-4 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-muted-foreground">{new Date(h.at).toLocaleString()}</span>
                    <span>Resultado: <strong>{h.result.join(", ")}</strong></span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
