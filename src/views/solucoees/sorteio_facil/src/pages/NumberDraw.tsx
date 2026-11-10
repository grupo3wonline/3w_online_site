import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useLocalHistory } from "@/hooks/use-history";
import { copyToClipboard, shareResult } from "@/lib/share";
import { toast } from "@/hooks/use-toast";

interface NumberHistoryItem {
  type: "numero";
  params: { min: number; max: number; qty: number; repetir: boolean };
  result: number[];
  at: number;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sampleUnique(min: number, max: number, qty: number): number[] {
  const pool: number[] = [];
  for (let n = min; n <= max; n++) pool.push(n);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, qty);
}

export default function NumberDraw() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [qty, setQty] = useState(1);
  const [repetir, setRepetir] = useState(false);
  const [result, setResult] = useState<number[] | null>(null);
  const { items, add, clear } = useLocalHistory<NumberHistoryItem>(
    "history-number",
    30
  );

  const handleDraw = () => {
    if (min > max) {
      toast({ title: "Intervalo inválido", description: "Mínimo deve ser <= máximo.", variant: "destructive" as any });
      return;
    }
    if (qty <= 0) {
      toast({ title: "Quantidade inválida", description: "Informe um número positivo.", variant: "destructive" as any });
      return;
    }
    const rangeSize = max - min + 1;
    if (!repetir && qty > rangeSize) {
      toast({ title: "Limite excedido", description: "Sem repetição, a quantidade não pode exceder o tamanho do intervalo.", variant: "destructive" as any });
      return;
    }

    let res: number[];
    if (repetir) {
      res = Array.from({ length: qty }, () => randomInt(min, max));
    } else {
      res = sampleUnique(min, max, qty);
    }
    setResult(res);
    add({ type: "numero", params: { min, max, qty, repetir }, result: res, at: Date.now() });
  };

  const handleShare = async () => {
    if (!result) return;
    const text = `Sorteio por NÚMEROS: ${result.join(", ")}`;
    await shareResult("Resultado do sorteio", text);
  };

  const handleCopy = async () => {
    if (!result) return;
    await copyToClipboard(result.join(", "));
  };

  return (
    <main className="container mx-auto max-w-5xl py-10">
      <Helmet>
        <title>Sorteio por Números | Ferramenta de Sorteios</title>
        <meta name="description" content="Sorteie números aleatórios entre um intervalo com opção de repetição e múltiplos ganhadores." />
        <link rel="canonical" href="/numero" />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl font-bold">Sorteio por NÚMEROS</h1>
        <p className="text-muted-foreground mt-2">Defina o intervalo, a quantidade e sorteie com transparência.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Parâmetros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min">Número mínimo</Label>
                <Input id="min" type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max">Número máximo</Label>
                <Input id="max" type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qty">Quantidade de sorteados</Label>
              <Input id="qty" type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Switch id="repetir" checked={repetir} onCheckedChange={setRepetir} />
                <Label htmlFor="repetir">Permitir repetição</Label>
              </div>
              <Button variant="hero" onClick={handleDraw}>Sortear</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Resultado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result ? (
              <div>
                <div className="text-2xl font-semibold tracking-wide">{result.join(" · ")}</div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button onClick={handleDraw}>Sortear novamente</Button>
                  <Button variant="secondary" onClick={handleShare}>Compartilhar</Button>
                  <Button variant="outline" onClick={handleCopy}>Copiar</Button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">O resultado aparecerá aqui.</p>
            )}
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
