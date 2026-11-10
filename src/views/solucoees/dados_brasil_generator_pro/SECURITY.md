# Segurança — Dados Brasil Generator Pro

## Medidas aplicadas

### Front-end
- **Processamento 100% local:** nenhum dado digitado/gerado é enviado a servidores.
- **Proteção XSS:** o renderizador de Markdown (`src/lib/markdown.ts`) escapa todo o HTML de entrada antes de processar e só permite links `http/https`. É o único ponto que usa `v-html`.
- **Geração criptográfica:** senhas e UUIDs usam `crypto.getRandomValues` / `crypto.randomUUID`.
- **Inputs:** todos os formulários usam `autocomplete="off"`.
- **Consentimento (LGPD/GDPR/CCPA/POPIA):** Google Consent Mode v2 inicia com tudo **negado**; analytics só é ativado após opt-in explícito.

### Servidor (`public/.htaccess`)
- SPA fallback com `RewriteBase /dados_brasil_generator_pro/`.
- Headers: `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security` (HTTPS), `Cross-Origin-Opener-Policy`.
- CSP restritiva permitindo apenas: GTM/GA, Google Fonts, API do Iconify e Sentry.
- `Options -Indexes` (sem listagem de diretórios) e bloqueio de arquivos sensíveis (`.env`, `.git`, configs).
- GZIP + cache de longo prazo para assets com hash.

## Auditoria de dependências (`npm audit`)

As vulnerabilidades remanescentes estão **exclusivamente em ferramentas de desenvolvimento** (`esbuild`, `vite`, `vite-node`, `vitest`) e afetam apenas o **servidor de desenvolvimento local**. Elas **não fazem parte do bundle de produção** publicado na Hostgator.

A correção completa exigiria atualizar Vite 5→8 e Vitest 2→5 (mudanças que quebram a configuração atual). Optou-se por manter as versões estáveis atuais e reavaliar em uma janela de manutenção dedicada. Rode `npm audit` periodicamente para acompanhar.
