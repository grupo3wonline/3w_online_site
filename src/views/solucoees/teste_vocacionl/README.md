# Teste Vocacional Online

> Descubra suas habilidades, pontos fortes e receba orientações personalizadas para sua carreira profissional.

## Sobre

O **Teste Vocacional Online** é uma aplicação web gratuita desenvolvida para auxiliar pessoas a identificarem suas aptidões e receberem recomendações de carreira. O teste é composto por **20 perguntas** que avaliam diferentes áreas de competência profissional.

## Funcionalidades

- **20 perguntas** cobrindo 19 áreas de habilidade profissional
- **Resultado detalhado** com pontos fortes e áreas de desenvolvimento
- **Recomendações de carreira** personalizadas por área
- **Dicas e orientações** em cada pergunta
- **Modo escuro/claro** com alternância automática
- **Impressão de resultados** formatada para A4
- **Compartilhamento** de resultados (Web Share API)
- **Atalhos de teclado** para navegação rápida
- **100% responsivo** (Mobile First)
- **Conformidade com a LGPD** (Lei nº 13.709/2018)
- **Acessibilidade** (ARIA, skip links, foco visível)

## Tecnologias

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura semântica |
| **CSS3** | Estilos customizados, animações |
| **JavaScript (ES2020+)** | Lógica da aplicação (Vanilla JS) |
| **Tailwind CSS 3.4** | Framework CSS utilitário (CDN) |
| **SweetAlert2** | Alertas e modais interativos |
| **Font Awesome 6.5** | Ícones vetoriais |
| **Google Fonts (Inter)** | Tipografia |

## Estrutura de Arquivos

```
teste_vocacional/
├── index.html              # Página principal (HTML5 semântico)
├── .htaccess               # Segurança e configuração Apache
├── README.md               # Documentação
├── LICENSE                 # Licença do projeto
└── assets/
    ├── css/
    │   └── styles.css      # Estilos customizados (Dark Mode, animações)
    └── js/
        ├── questions.js    # Banco de perguntas e recomendações
        └── app.js          # Lógica principal da aplicação
```

## Segurança

A aplicação implementa diversas camadas de proteção:

- **Headers HTTP de segurança** (X-Frame-Options, CSP, HSTS, etc.)
- **Proteção contra XSS** via sanitização de strings
- **Proteção contra SQL Injection** via .htaccess
- **Bloqueio de métodos HTTP** desnecessários (TRACE, PUT, DELETE)
- **Bloqueio de user-agents** maliciosos
- **Desabilitação de listagem** de diretórios
- **Compressão GZIP** para performance
- **Cache otimizado** para assets estáticos
- **LGPD** — nenhum dado pessoal coletado; localStorage apenas com consentimento

## Como Usar

1. Acesse a página do teste
2. Clique em **"Iniciar Teste"**
3. Responda cada pergunta selecionando a opção desejada
4. Ao finalizar, confira seus **pontos fortes** e **áreas de desenvolvimento**
5. Imprima ou compartilhe seus resultados

## Requisitos

- Navegador moderno com JavaScript habilitado
- Servidor Apache com `mod_rewrite` (para .htaccess)
- Conexão com internet (CDNs)

## Autor

Desenvolvido por **HOTWYL | WILLFROMBRASIL**

---

&copy; WILLFROMBRASIL&trade; Company Inc. Todos os direitos reservados.
