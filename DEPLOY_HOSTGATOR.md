# Guia de Publicação & Deploy na Hospedagem Compartilhada HostGator

Este guia explica como hospedar e publicar o portal da **3W Online** (`www.3wonline.com.br`) na infraestrutura da **HostGator** (cPanel / Apache / PHP).

---

## 🏗️ 1. Como a Aplicação está Estruturada

O site foi construído em **Vue 3 + Vite + TypeScript**. Ao rodar o comando:
```bash
npm run build
```
O Vite compila todos os arquivos TypeScript, estilos e componentes para a pasta **`dist/`**.

A pasta `dist/` gerada é **100% estática, autônoma e otimizada**, contendo:
- `index.html` — Documento raiz da Single Page Application (SPA).
- `.htaccess` — Configurações para o Apache da HostGator (HTTPS forçado, Roteamento SPA, Cache de 1 ano, Gzip, Proteção de arquivos).
- `404.html`, `403.html`, `500.html` — Páginas de erro personalizadas do servidor Apache.
- `robots.txt` & `sitemap.xml` — Regras de indexação e mapa do site para SEO e AEO.
- `llms.txt` — Arquivo de contexto estruturado para motores de busca de Inteligência Artificial (ChatGPT, Perplexity, Gemini, Claude).
- `favicon.svg` — Ícone oficial da marca.
- `assets/` — Bundles de CSS e JavaScript minificados com hash de cache busting.

---

## 🚀 2. Passo a Passo para Publicação na HostGator

### Opção A: Via Gerenciador de Arquivos do cPanel (Mais Rápido)

1. **Gerar o pacote de produção**:
   No terminal do projeto, execute:
   ```bash
   npm run build
   ```
2. **Compactar o conteúdo da pasta `dist/`**:
   - Acesse a pasta `dist/`.
   - Selecione todos os arquivos e pastas internos (incluindo o arquivo oculto `.htaccess`).
   - Crie um arquivo zip (ex: `deploy.zip`).
3. **Acessar o cPanel da HostGator**:
   - Faça login no portal do cliente HostGator e abra o **cPanel**.
   - Abra o **Gerenciador de Arquivos** (*File Manager*).
   - Certifique-se de marcar a opção **"Mostrar arquivos ocultos (dotfiles)"** nas preferências do Gerenciador de Arquivos (ícone de engrenagem no canto superior direito).
4. **Fazer Upload para a pasta pública**:
   - Navegue até a pasta `public_html` (ou o subdomínio correspondente).
   - Clique em **Carregar** (*Upload*) e envie o arquivo `deploy.zip`.
5. **Extrair**:
   - Clique com o botão direito sobre o `deploy.zip` no cPanel e selecione **Extrair** (*Extract*).
   - Confirme a extração diretamente na raiz da pasta `public_html`.
   - Exclua o arquivo `.zip` temporário.

---

### Opção B: Via FTP (FileZilla / WinSCP)

1. Conecte-se ao servidor HostGator via FTP:
   - **Host**: `ftp.seudominio.com.br` ou IP do servidor informado no cPanel
   - **Usuário**: seu usuário do cPanel
   - **Senha**: sua senha do cPanel
   - **Porta**: 21
2. Abra a pasta remota `/public_html`.
3. No painel local, abra a pasta `dist/` do projeto.
4. Arraste **todos os arquivos e pastas de `dist/`** para dentro de `/public_html`.
5. Verifique se o arquivo `.htaccess` foi transferido com sucesso.

---

## ⚙️ 3. Recursos Ativos no `.htaccess` da HostGator

O arquivo `.htaccess` incluído já vem 100% pré-configurado com:
1. **Redirecionamento HTTPS Automático**: Força todo o tráfego HTTP para `https://www.3wonline.com.br` com código 301.
2. **Fallback SPA (Vue Router)**: Redireciona qualquer rota interna (ex: `/servicos/criacao-sites`, `/ferramentas`, `/sobre`) para o `index.html`, evitando o clássico erro 404 ao recarregar a página.
3. **Compressão Gzip (`mod_deflate`)**: Reduz o tamanho de transferência de JS, CSS, JSON e SVG em até 70%.
4. **Cache de Alta Performance (`mod_expires` e `mod_headers`)**:
   - Arquivos estáticos em `/assets/` recebem cache imutável de 1 ano.
   - `index.html` recebe política `no-cache` para que qualquer nova publicação seja visualizada instantaneamente pelos clientes sem cache preso.
5. **Páginas de Erro Nativas (Fallback)**: `ErrorDocument 404 /404.html`, `ErrorDocument 403 /403.html` e `ErrorDocument 500 /500.html`.
6. **Segurança Reforçada**: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, bloqueio a arquivos ocultos `.git`, `.env` e arquivos de build.

---

## ✅ 4. Checklist Pós-Deploy

- [ ] Acessar `https://www.3wonline.com.br` e verificar o carregamento imediato.
- [ ] Testar rotas diretas na barra de endereço (ex: `https://www.3wonline.com.br/servicos/criacao-sites`) e recarregar (`F5`) para testar o fallback SPA.
- [ ] Testar uma URL inexistente (ex: `https://www.3wonline.com.br/pagina-inexistente`) e confirmar a exibição da página de erro 404.
- [ ] Testar o botão flutuante de WhatsApp e formulário de contato.
- [ ] Verificar a Central de Cookies LGPD/GDPR/CCPA/POPIA no rodapé.
