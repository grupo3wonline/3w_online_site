# Guia de Deploy — HostGator (hospedagem compartilhada)

A aplicação é uma SPA estática servida no subdiretório `/calculadora_metragem_cabo/`.

## 1. Gerar o build

```sh
npm install
npm run build
```

Isso roda a verificação de tipos (`vue-tsc`) e gera a pasta `dist/` com todos os arquivos
estáticos, incluindo `.htaccess`, `manifest.json`, `robots.txt`, `sitemap.xml` e `favicon.svg`.

## 2. Enviar os arquivos

Envie **o conteúdo de `dist/`** (não a pasta em si) para:

```
public_html/calculadora_metragem_cabo/
```

Você pode usar o Gerenciador de Arquivos do cPanel (upload de um .zip e extrair) ou FTP
(FileZilla). A estrutura final no servidor deve ficar:

```
public_html/calculadora_metragem_cabo/
├── index.html
├── .htaccess
├── manifest.json
├── robots.txt
├── sitemap.xml
├── favicon.svg
└── assets/
    ├── *.js
    └── *.css
```

## 3. Verificar módulos Apache

O `.htaccess` depende de:

- `mod_rewrite` (SPA fallback e HTTPS)
- `mod_headers` (headers de segurança / CSP)
- `mod_deflate` (compressão gzip)
- `mod_expires` (cache)

Na HostGator esses módulos normalmente já vêm habilitados. Se algum não estiver, o site
ainda funciona, mas sem o recurso correspondente.

## 4. Checklist pós-deploy

- [ ] Acessar `https://app.3wonline.com/calculadora_metragem_cabo/` (home carrega)
- [ ] Recarregar (F5) em `/calculadora` e `/politica-de-privacidade` — não pode dar 404
      (valida o SPA fallback do `.htaccess`)
- [ ] Testar cálculo na calculadora
- [ ] Alternar tema claro/escuro
- [ ] Banner de cookies aparece e persiste a escolha
- [ ] Rota inexistente mostra a página 404
- [ ] Verificar GA4/GTM no tempo real do Google Analytics (após aceitar cookies)

## 5. Pendências de arte (opcional, para SEO/redes sociais)

Adicione em `public/` antes do build (ou direto na pasta publicada):

- `og-image.jpg` — 1200×630 px (compartilhamento em redes sociais)
- `favicon.ico` — se quiser um ícone clássico além do `favicon.svg`

## Observação sobre a URL

O código usa `history mode` com base `/calculadora_metragem_cabo/`. Caso o subdiretório de
publicação mude, ajuste em três lugares e refaça o build:

- `vite.config.ts` → `base`
- `src/config/site.ts` → `SITE.base` (e `.env` → `VITE_APP_BASE_URL`)
- `public/.htaccess` → `RewriteBase` e a regra de fallback
