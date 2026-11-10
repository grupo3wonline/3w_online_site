import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLocalHistory } from "@/hooks/use-history";
import { copyToClipboard, shareResult } from "@/lib/share";
import { toast } from "@/hooks/use-toast";

interface GroupHistoryItem {
  type: "grupos";
  params: { mode: "count" | "size"; value: number; total: number };
  result: string[][];
  at: number;
}

function cleanNames(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((n) => n.trim())
    .filter(Boolean);
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function GroupsDraw() {
  const [raw, setRaw] = useState("");
  const [mode, setMode] = useState<"count" | "size">("count");
  const [value, setValue] = useState(2);
  const [result, setResult] = useState<string[][] | null>(null);
  const { items, add, clear } = useLocalHistory<GroupHistoryItem>("history-groups", 20);

  const names = useMemo(() => cleanNames(raw), [raw]);

  const handleDraw = () => {
    if (names.length < 2) {
      toast({ title: "Lista muito curta", description: "Insira pelo menos 2 nomes.", variant: "destructive" as any });
      return;
    }
    const shuffled = shuffle(names);
    let groups: string[][] = [];

    if (mode === "count") {
      const groupsCount = Math.max(1, value);
      for (let i = 0; i < groupsCount; i++) groups.push([]);
      shuffled.forEach((name, idx) => {
        groups[idx % groupsCount].push(name);
      });
    } else {
      const size = Math.max(1, value);
      for (let i = 0; i < shuffled.length; i += size) {
        groups.push(shuffled.slice(i, i + size));
      }
    }

    setResult(groups);
    add({ type: "grupos", params: { mode, value, total: names.length }, result: groups, at: Date.now() });
  };

  const handleShare = async () => {
    if (!result) return;
    const text = result.map((g, i) => `Grupo ${i + 1}: ${g.join(", ")}`).join("\n");
    await shareResult("Grupos sorteados", text);
  };

  const handleCopy = async () => {
    if (!result) return;
    const text = result.map((g, i) => `Grupo ${i + 1}: ${g.join(", ")}`).join("\n");
    await copyToClipboard(text);
  };

  return (
    <main className="container mx-auto max-w-6xl py-10">
      <Helmet>
        <title>Sorteio por Grupos | Ferramenta de Sorteios</title>
        <meta name="description" content="Divida uma lista de nomes em grupos aleatórios por número de grupos ou tamanho do grupo." />
        <link rel="canonical" href="/grupos" />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl font-bold">Sorteio por GRUPOS</h1>
        <p className="text-muted-foreground mt-2">Defina como quer agrupar e gere os grupos com um clique.</p>
      </header>

      <section className="grid lg:grid-cols-2 gap-6">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Participantes e Configurações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="names">Nomes (um por linha)</Label>
              <Textarea id="names" rows={10} value={raw} onChange={(e) => setRaw(e.target.value)} placeholder="Ana\nBruno\nCarla\n..." />
            </div>

            <div className="space-y-2">
              <Label>Modo de agrupamento</Label>
              <RadioGroup value={mode} onValueChange={(v) => setMode(v as any)} className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="count" id="count" />
                  <Label htmlFor="count">Número de grupos</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="size" id="size" />
                  <Label htmlFor="size">Pessoas por grupo</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">{mode === "count" ? "Quantidade de grupos" : "Tamanho do grupo"}</Label>
              <Input id="value" type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
            </div>

            <div className="flex justify-end">
              <Button variant="hero" onClick={handleDraw}>Gerar grupos</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Resultado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {result.map((g, i) => (
                  <div key={i} className="rounded-md border p-3">
                    <div className="font-semibold mb-2">Grupo {i + 1}</div>
                    <ul className="text-sm space-y-1">
                      {g.map((n, idx) => (
                        <li key={idx}>{n}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Os grupos aparecerão aqui.</p>
            )}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleDraw}>Gerar novamente</Button>
              <Button variant="secondary" onClick={handleShare}>Compartilhar</Button>
              <Button variant="outline" onClick={handleCopy}>Copiar</Button>
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
                <CardContent className="py-4 text-sm space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-muted-foreground">{new Date(h.at).toLocaleString()}</span>
                    <span className="font-medium">{h.params.mode === "count" ? `${h.params.value} grupos` : `${h.params.value} por grupo`}</span>
                  </div>
                  <div className="text-muted-foreground truncate">{h.result.map((g, idx) => `G${idx + 1}(${g.length})`).join(" • ")}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
