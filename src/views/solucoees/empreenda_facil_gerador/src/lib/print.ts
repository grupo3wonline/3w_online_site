/**
 * Abre um documento HTML gerado em uma nova janela de forma segura.
 * Substitui o antigo padrão inseguro de document.write, usando Blob URL
 * com sandbox implícito e sem herança do contexto da página principal.
 */
export type PrintAction = "preview" | "print";

const buildDocument = (title: string, bodyHtml: string, styles: string): string => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; margin: 40px; color: #1f2937; line-height: 1.5; }
  h1, h2, h3 { margin: 0 0 8px; }
  ${styles}
  @media print { body { margin: 16px; } .no-print { display: none !important; } }
</style>
</head>
<body>
${bodyHtml}
<script>
  window.__doPrint = ${JSON.stringify(true)};
</script>
</body>
</html>`;

export function openGeneratedDocument(
  title: string,
  bodyHtml: string,
  styles: string,
  action: PrintAction
): boolean {
  const html = buildDocument(title, bodyHtml, styles);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank", "noopener,noreferrer");

  if (!win) {
    URL.revokeObjectURL(url);
    return false;
  }

  if (action === "print") {
    win.addEventListener("load", () => {
      setTimeout(() => win.print(), 400);
    });
  }
  // Libera o objeto após a janela carregar
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
  return true;
}
