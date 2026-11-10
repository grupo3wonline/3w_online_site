import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Users, ShieldCheck, Zap } from "lucide-react";
import * as React from "react";

const testimonials = [
  { name: "Mariana Costa", role: "Growth Manager", quote: "Economizei horas de trabalho. Em segundos tenho listas limpas e sem duplicados!" },
  { name: "Pedro Almeida", role: "Analista de Dados", quote: "Exporto em CSV e jogo direto na minha ferramenta. Simples e eficiente." },
  { name: "Ana Rodrigues", role: "Freelancer", quote: "A interface é ótima e 100% online. Já virou parte do meu dia a dia." },
];

export default function Landing() {
  const handlePointerMove = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
  }, []);

  return (
    <header onPointerMove={handlePointerMove} className="hero-surface">
      <div className="container max-w-6xl py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl md:text-6xl font-bold tracking-tight">
            Extrator de E-mails, CPF e CNPJ — rápido, confiável e gratuito
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Extraia e valide e-mails, CPF e CNPJ em segundos. Remova duplicados, formate com/sem pontuação e exporte em TXT, CSV e XML.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#extrator">
              <Button size="lg" variant="hero">Comece Agora – É Grátis</Button>
            </a>
            <a href="#extrator">
              <Button size="lg" variant="outline">Teste agora – sem cadastro</Button>
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Users className="opacity-80" /> Milhares de profissionais</div>
            <div className="hidden md:flex items-center gap-2"><ShieldCheck className="opacity-80" /> Ferramenta confiável</div>
            <div className="hidden md:flex items-center gap-2"><Zap className="opacity-80" /> Processamento em segundos</div>
          </div>
        </div>

        <div className="mt-14">
          <Card className="mx-auto max-w-4xl card-elevated">
            <CardContent className="p-0">
              {/* Demo subtle animation */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="h-56 bg-gradient-to-br from-[hsl(var(--brand)/0.12)] to-[hsl(var(--brand-2)/0.12)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-md border bg-card/70 backdrop-blur p-4 text-center">
                    <p className="text-sm text-muted-foreground">Demonstração: cole um texto e extraia instantaneamente</p>
                    <div className="mt-3 h-2 w-64 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-1/2 animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-[hsl(var(--brand)/0.4)] to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {["Extraia E-mails, CPF e CNPJ válidos","Elimine duplicados com 1 clique","Ordene A-Z/Z-A e agrupe por blocos","CPF/CNPJ com ou sem pontuação","Exporte em TXT, CSV e XML","100% online, rápido e gratuito"].map((b, i) => (
            <div key={i} className="rounded-lg border bg-card p-5 card-elevated">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 text-[hsl(var(--brand))]" />
                <p className="text-sm leading-relaxed">{b}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-16" aria-label="Depoimentos">
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="rounded-lg border bg-card p-6 card-elevated">
                <p className="italic">“{t.quote}”</p>
                <footer className="mt-4 text-sm text-muted-foreground">{t.name} — {t.role}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-lg border bg-gradient-to-r from-[hsl(var(--brand)/0.08)] to-[hsl(var(--brand-2)/0.08)] p-6 text-center">
          <p className="text-base md:text-lg">Aproveite agora: em breve, funções avançadas serão exclusivas para membros PRO.</p>
          <div className="mt-4">
            <a href="#extrator"><Button variant="hero">Usar Agora</Button></a>
          </div>
        </section>
      </div>
    </header>
  );
}
