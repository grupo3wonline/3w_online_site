# Deploy na HostGator (hospedagem compartilhada)

A aplicação é uma SPA Vue 3 servida em um subdiretório:
`https://www.3wonline.com.br/calculadora_empresarial/`

## 1. Gerar o build de produção

```bash
npm install
npm run build
```

O build é gerado na pasta `dist/`, já contendo `.htaccess`, `sitemap.xml` e `robots.txt`.

## 2. Enviar os arquivos

Envie **todo o conteúdo da pasta `dist/`** (incluindo o arquivo oculto `.htaccess`)
para a pasta do subdiretório no servidor, via cPanel File Manager ou FTP:

```
public_html/calculadora_empresarial/
```

> Importante: envie o conteúdo de `dist/`, e não a pasta `dist` em si.
> No FTP, habilite a exibição de arquivos ocultos para não esquecer o `.htaccess`.

## 3. Verificações pós-deploy

- Acesse `https://www.3wonline.com.br/calculadora_empresarial/` — deve carregar a home.
- Acesse uma rota interna direto pela URL (ex: `/calculadora_empresarial/calculadora-juros`)
  e recarregue a página (F5). O `.htaccess` garante que o roteamento no cliente funcione
  (sem erro 404 do Apache).
- Confirme HTTPS (o `.htaccess` força o redirecionamento).
- Confira `robots.txt` e `sitemap.xml` acessíveis na raiz do subdiretório.

## 4. SEO / Analytics

- Cadastre o sitemap no Google Search Console:
  `https://www.3wonline.com.br/calculadora_empresarial/sitemap.xml`
- GA4 (`G-J06THXX0MW`) e GTM (`GTM-WVMJV7G6`) já estão no `index.html`,
  com Consent Mode iniciando negado até o aceite do usuário (LGPD/GDPR).

## Alteração do subdiretório

Se o caminho mudar, ajuste em três lugares e refaça o build:

- `vite.config.js` → `base`
- `src/router/index.js` → `createWebHistory('/novo_caminho/')`
- `public/.htaccess` → `RewriteBase` e `ErrorDocument`
- `src/config/site.js` → `basePath`
