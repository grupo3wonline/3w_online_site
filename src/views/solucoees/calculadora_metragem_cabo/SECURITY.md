# Segurança e Conformidade

Documento sobre as medidas de segurança aplicadas e o escopo real deste projeto.

## Natureza da aplicação

A Calculadora de Metragem de Cabos é uma **aplicação web 100% pública e client-side**
(SPA em Vue 3 servida como arquivos estáticos). **Não há backend, banco de dados,
autenticação, login nem armazenamento de dados no servidor.** Todo o processamento
ocorre no navegador do usuário; o histórico de cálculos fica apenas em `localStorage`.

## Medidas de segurança aplicadas

- **HTTPS obrigatório** e HSTS (via `.htaccess`).
- **Cabeçalhos de segurança**: `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`,
  `Referrer-Policy`, `Permissions-Policy` e uma **Content Security Policy** restritiva
  que só libera GTM/GA, Google Fonts, Iconify e Sentry.
- **Sem segredos no código**: chaves públicas (GA/GTM) são de rastreamento e projetadas
  para o cliente; nenhuma credencial sensível é embarcada. Variáveis ficam em `.env`
  (ignorado pelo Git).
- **Links externos** usam `rel="noopener noreferrer"`.
- **Consentimento de cookies** com Google Consent Mode negado por padrão até o aceite
  (LGPD, GDPR, CCPA, POPIA).
- **Sanitização**: o app não injeta HTML de terceiros; conteúdo dinâmico usa interpolação
  segura do Vue. `drop_console` no build de produção.
- **Dependências**: `npm audit` em produção retorna **0 vulnerabilidades**. As dependências
  são fixadas por faixa e pertencem a pacotes amplamente mantidos.
- **Monitoramento de erros** opcional via Sentry (ativado só com DSN configurado).

## Itens do pedido que NÃO se aplicam (e por quê)

Estes requisitos pressupõem backend/autenticação, inexistentes aqui:

- **CASL / controle de permissões (RBAC)**: não há usuários, sessões ou recursos
  protegidos. Sem backend, não existe autorização a aplicar.
- **"Cada usuário acessa somente seus dados"**: não há contas nem dados de usuário no
  servidor. O único dado é o histórico local, isolado por navegador por natureza.
- **Testes de carga / stress / penetração**: um site estático não tem endpoints de
  aplicação para carga/stress; a resiliência depende da hospedagem/CDN. Testes de
  intrusão em conteúdo estático não têm superfície de ataque de aplicação.

Caso um backend seja adicionado no futuro, estes itens devem ser reavaliados
(autenticação, CASL, testes de carga com k6/Artillery e varredura de segurança).

## Vulnerabilidades de desenvolvimento conhecidas

`npm audit` acusa vulnerabilidades **moderate apenas em devDependencies** do ecossistema
de testes (`vitest`/`esbuild`), cuja correção exige versão beta (`vitest@5`). Como não
afetam o bundle de produção, optou-se por manter o `vitest@3` estável. Reavaliar quando
houver release estável.
