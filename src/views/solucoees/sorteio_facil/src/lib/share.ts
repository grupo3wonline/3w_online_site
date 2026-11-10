import { toast } from "@/hooks/use-toast";

export async function shareResult(title: string, text: string) {
  try {
    if (navigator.share) {
      await navigator.share({ title, text });
      return;
    }
  } catch (err) {
    // fallback to copy if share fails
  }
  await copyToClipboard(text);
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast({ title: "Copiado!", description: "Resultado copiado para a área de transferência." });
  } catch (err) {
    toast({ title: "Erro ao copiar", description: "Não foi possível copiar. Tente manualmente.", variant: "destructive" as any });
  }
}
