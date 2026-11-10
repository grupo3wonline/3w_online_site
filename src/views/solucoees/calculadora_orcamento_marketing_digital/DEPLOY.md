# Guia de Deploy — HostGator (hospedagem compartilhada)

Aplicação estática (Vue 3 SPA) servida em um subdiretório. Não requer Node no
servidor: basta enviar o conteúdo do build.

## 1. Gerar o build de produção

```bash
npm install
npm run build
```

O resultado fica em `dist/`. O build já inclui:

- `index.html` com SEO, GA4/GTM e JSON-LD
- `assets/` com JS/CSS/fontes versionados por hash (cache-busting)
- `.htaccess` (SPA fallback + segurança + cache)
- `robots.txt`, `sitemap.xml`, `manifest.json` e favicons

## 2. Enviar para a HostGator

O `homepage`/`base` do projeto é `/calculadora_orcamento_marketing_digital/`.
Portanto, envie **todo o conteúdo de `dist/`** para dentro da pasta com esse nome
no servidor (via cPanel > Gerenciador de Arquivos ou FTP):

```
public_html/calculadora_orcamento_marketing_digital/
├── index.html
├── .htaccess
├── manifest.json
├── robots.txt
├── sitemap.xml
├── favicon.svg / apple-touch-icon.svg
└── assets/...
```

Importante:

- Envie o `.htaccess` (arquivos ocultos: ative "Mostrar arquivos ocultos" no
  Gerenciador de Arquivos do cPanel).
- Não crie uma subpasta `dist` no servidor — o conteúdo de `dist/` vai
  diretamente para `.../calculadora_orcamento_marketing_digital/`.

## 3. Verificar

- Acesse `https://SEU-DOMINIO/calculadora_orcamento_marketing_digital/`
- Navegue para `/contato`, `/termos-de-uso`, `/politica-de-privacidade` e
  recarregue a página (F5) — o `.htaccess` garante que a SPA responda sem 404.
- Confira no navegador (aba Rede) se GA4/GTM carregam e se os headers de
  segurança estão presentes.

## 4. Variáveis de ambiente (opcional)

Antes do `npm run build`, ajuste `.env` se necessário:

- `VITE_APP_URL` — URL pública canônica.
- `VITE_GA4_ID` / `VITE_GTM_ID` — já preenchidos com os IDs do projeto.
- `VITE_SENTRY_DSN` — deixe vazio para não carregar o Sentry; preencha para ativar
  o monitoramento de erros.

## 5. Google Search Console

Após publicar, cadastre o domínio no Search Console e envie o sitemap:
`https://SEU-DOMINIO/calculadora_orcamento_marketing_digital/sitemap.xml`.
