<?php
/**
 * ExtratorPro - Plataforma de Extração de E-mails
 * PHP 8+ | HTML5 | CSS3 | JS Vanilla | Tailwind CSS | SweetAlert2
 * Desenvolvido por HOTWYL | WILLFROMBRASIL
 * Compatível com LGPD | Mobile First | Dark Mode
 */

declare(strict_types=1);

// Headers de segurança
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: camera=(), microphone=(), geolocation=()');
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://unpkg.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';");

$anoAtual = date('Y');
$versao = '2.0.0';
?>
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- SEO -->
    <title>Extrator de E-mails Profissional | Rápido, Seguro e Gratuito - ExtratorPro</title>
    <meta name="description" content="Ferramenta online profissional para extrair, organizar e exportar listas de e-mails. Processamento 100% local no navegador, compatível com LGPD. Extraia leads de textos, HTML e CSV.">
    <meta name="keywords" content="extrator de emails, extrair emails, lista de emails, leads, email marketing, organizar emails, LGPD, ferramenta gratuita">
    <meta name="author" content="HOTWYL | WILLFROMBRASIL">
    <meta name="robots" content="index, follow">
    <meta name="language" content="pt-BR">
    <link rel="canonical" href="<?= 'https://' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . ($_SERVER['REQUEST_URI'] ?? '/') ?>">

    <!-- Open Graph / Social -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="ExtratorPro - Extrator de E-mails Profissional">
    <meta property="og:description" content="Extraia, organize e exporte listas de e-mails instantaneamente. 100% seguro e compatível com LGPD.">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="ExtratorPro">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="ExtratorPro - Extrator de E-mails Profissional">
    <meta name="twitter:description" content="Extraia, organize e exporte listas de e-mails em segundos.">

    <!-- PWA / Mobile -->
    <meta name="theme-color" content="#2563eb" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="mobile-web-app-capable" content="yes">

    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "ExtratorPro",
        "description": "Ferramenta online profissional para extrair, organizar e exportar listas de e-mails.",
        "url": "<?= 'https://' . ($_SERVER['HTTP_HOST'] ?? 'localhost') ?>",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        },
        "author": {
            "@type": "Person",
            "name": "HOTWYL | WILLFROMBRASIL"
        }
    }
    </script>

    <!-- Preconnect para performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="tailwind.js"></script>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- App CSS -->
    <link rel="stylesheet" href="app.css">
</head>
<body class="bg-gray-50 text-gray-800 dark:bg-dark-bg dark:text-gray-100 transition-colors-all flex flex-col min-h-screen antialiased">

    <!-- LGPD Cookie Consent Banner -->
    <div id="lgpdBanner" class="fixed bottom-0 left-0 right-0 z-[100] transform translate-y-full transition-transform duration-500 ease-out" role="dialog" aria-label="Consentimento de Cookies LGPD">
        <div class="bg-white dark:bg-dark-card border-t border-gray-200 dark:border-gray-700 shadow-2xl">
            <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div class="flex items-start gap-3 flex-1">
                        <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0 mt-0.5">
                            <i data-lucide="shield" class="w-5 h-5 text-blue-600 dark:text-blue-400"></i>
                        </div>
                        <div>
                            <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-1">Sua Privacidade é Importante</h4>
                            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                Este site utiliza armazenamento local apenas para salvar suas preferências de tema (modo claro/escuro). 
                                <strong>Nenhum dado pessoal é coletado, armazenado ou transmitido a servidores externos.</strong> 
                                Todo o processamento ocorre localmente no seu navegador, em conformidade com a 
                                <button type="button" onclick="showLgpdPolicy(event)" class="text-primary-600 dark:text-primary-400 underline hover:text-primary-700 bg-transparent border-none cursor-pointer p-0 font-inherit text-inherit">Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</button>.
                            </p>
                        </div>
                    </div>
                    <div class="flex gap-2 w-full sm:w-auto flex-shrink-0">
                        <button onclick="acceptLgpd()" class="flex-1 sm:flex-none px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
                            Aceitar
                        </button>
                        <button onclick="showLgpdPolicy(event)" class="flex-1 sm:flex-none px-5 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg transition-colors">
                            Saber Mais
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Skip Navigation (Acessibilidade) -->
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg">
        Pular para o conteúdo principal
    </a>

    <!-- Header / Navbar -->
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-dark-card/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <a href="#" class="flex items-center gap-2.5 group" aria-label="ExtratorPro - Página Inicial">
                    <div class="p-2 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-xl shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all duration-300 group-hover:scale-105">
                        <i data-lucide="mail" class="w-6 h-6 text-white"></i>
                    </div>
                    <div>
                        <h1 class="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Extrator<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Pro</span>
                        </h1>
                        <p class="text-[10px] text-gray-500 dark:text-gray-400 font-medium hidden sm:block tracking-wide uppercase">Inteligência de Leads</p>
                    </div>
                </a>

                <!-- Nav Actions -->
                <nav class="flex items-center gap-2 sm:gap-3" aria-label="Navegação principal">
                    <!-- Help Button -->
                    <button onclick="showHelp()" class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 group" aria-label="Ajuda" title="Central de Ajuda">
                        <i data-lucide="help-circle" class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"></i>
                    </button>

                    <!-- LGPD/Privacy Button -->
                    <button onclick="showLgpdPolicy(event)" class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 group" aria-label="Política de Privacidade" title="Política de Privacidade (LGPD)">
                        <i data-lucide="shield-check" class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors"></i>
                    </button>

                    <!-- Theme Toggle -->
                    <button id="theme-toggle" class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 group" aria-label="Alternar entre tema claro e escuro" title="Alternar Tema (Ctrl+D)">
                        <i data-lucide="moon" class="w-5 h-5 hidden dark:block text-yellow-400 group-hover:text-yellow-300 transition-colors"></i>
                        <i data-lucide="sun" class="w-5 h-5 block dark:hidden text-orange-500 group-hover:text-orange-400 transition-colors"></i>
                    </button>

                    <!-- Como Usar Link -->
                    <a href="#como-usar" class="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
                        <i data-lucide="book-open" class="w-4 h-4"></i>
                        Como Usar
                    </a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main id="main-content" class="flex-grow container max-w-6xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8" role="main">

        <!-- Hero Section -->
        <section class="text-center mb-8 sm:mb-10 space-y-4" aria-label="Apresentação">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-semibold border border-primary-200 dark:border-primary-800 mb-2 animate-fade-in">
                <i data-lucide="sparkles" class="w-3 h-3"></i> v<?= htmlspecialchars($versao) ?> — Rápido, Seguro & Gratuito
            </div>

            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                Transforme Texto em <br class="sm:hidden">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 animate-gradient">Listas Valiosas de E-mails</span>
            </h2>

            <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Cole qualquer texto — HTML, CSV, conversas ou dados brutos — e extraia, limpe e organize 
                todos os endereços de e-mail <strong>instantaneamente</strong>.
            </p>

            <div class="flex flex-wrap justify-center gap-3 mt-2">
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold border border-green-200 dark:border-green-800">
                    <i data-lucide="shield-check" class="w-3 h-3"></i> LGPD Compliant
                </div>
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-800">
                    <i data-lucide="monitor-smartphone" class="w-3 h-3"></i> 100% Local
                </div>
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs font-semibold border border-purple-200 dark:border-purple-800">
                    <i data-lucide="zap" class="w-3 h-3"></i> Processamento Instantâneo
                </div>
            </div>
        </section>

        <!-- Application Card -->
        <section class="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50 overflow-hidden transition-colors-all" aria-label="Ferramenta de Extração">

            <div class="grid lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-700">

                <!-- Coluna Esquerda: Input e Controles -->
                <div class="p-5 sm:p-8 space-y-5">

                    <!-- Input Area -->
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <label for="inputText" class="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                <i data-lucide="file-text" class="w-4 h-4 text-primary-500"></i> Texto de Origem
                                <button type="button" onclick="showTooltip('input')" class="tooltip-btn" aria-label="Ajuda sobre campo de texto de origem" title="Dica: Cole qualquer tipo de texto contendo e-mails">
                                    <i data-lucide="info" class="w-3.5 h-3.5 text-gray-400 hover:text-primary-500 transition-colors"></i>
                                </button>
                            </label>
                            <span id="charCount" class="text-xs text-gray-400 font-mono tabular-nums">0 caracteres</span>
                        </div>
                        <div class="relative group">
                            <textarea
                                id="inputText"
                                class="w-full h-64 sm:h-72 lg:h-80 p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm font-mono resize-none shadow-inner placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                placeholder="Exemplo:&#10;&#10;Contate joao@email.com para vendas.&#10;Suporte: suporte@empresa.com.br&#10;Lista: maria.silva@uol.com.br, admin@site.com&#10;HTML: &lt;a href='mailto:contato@loja.com'&gt;&#10;&#10;Aceita textos, HTML, CSV, listas mistas..."
                                autocomplete="off"
                                spellcheck="false"
                                aria-describedby="inputHelp"
                            ></textarea>
                            <p id="inputHelp" class="sr-only">Cole qualquer texto contendo endereços de e-mail. A ferramenta identificará e extrairá automaticamente todos os e-mails válidos.</p>

                            <!-- Floating Action Buttons -->
                            <div class="absolute bottom-3 right-3 flex gap-2">
                                <button type="button" onclick="pasteFromClipboard()" class="p-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 text-xs font-medium text-gray-600 dark:text-gray-200 transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95" title="Colar da área de transferência (Ctrl+V)" aria-label="Colar texto da área de transferência">
                                    <i data-lucide="clipboard-paste" class="w-3.5 h-3.5"></i>
                                    <span class="hidden sm:inline">Colar</span>
                                </button>
                                <button type="button" onclick="loadSampleData()" class="p-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 text-xs font-medium text-gray-600 dark:text-gray-200 transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95" title="Carregar exemplo de texto para teste" aria-label="Carregar dados de exemplo">
                                    <i data-lucide="test-tubes" class="w-3.5 h-3.5"></i>
                                    <span class="hidden sm:inline">Exemplo</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Options Grid -->
                    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                <i data-lucide="settings-2" class="w-3.5 h-3.5"></i> Configurações
                            </h3>
                            <button type="button" onclick="showTooltip('config')" class="tooltip-btn" aria-label="Ajuda sobre configurações" title="Dica: Personalize a saída dos seus e-mails">
                                <i data-lucide="help-circle" class="w-3.5 h-3.5 text-gray-400 hover:text-primary-500 transition-colors"></i>
                            </button>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <!-- Separator -->
                            <div class="space-y-1.5">
                                <label for="separator" class="text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                                    Separador de Saída
                                    <button type="button" onclick="showTooltip('separator')" class="tooltip-btn" title="Define como os e-mails serão separados na lista final">
                                        <i data-lucide="info" class="w-3 h-3 text-gray-400"></i>
                                    </button>
                                </label>
                                <select id="separator" class="w-full rounded-lg border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm py-2.5 px-3 focus:ring-primary-500 focus:border-primary-500 dark:text-white transition-colors" autocomplete="off">
                                    <option value="newline">Nova Linha (Padrão)</option>
                                    <option value=", ">Vírgula (,)</option>
                                    <option value="; ">Ponto e Vírgula (;)</option>
                                    <option value=" | ">Pipe (|)</option>
                                    <option value=" : ">Dois Pontos (:)</option>
                                    <option value="\t">Tab</option>
                                </select>
                            </div>

                            <!-- Grouping -->
                            <div class="space-y-1.5">
                                <label for="groupSize" class="text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                                    Agrupar a cada
                                    <button type="button" onclick="showTooltip('group')" class="tooltip-btn" title="Insere linha em branco a cada X e-mails. Útil para envios em lote por SMTP.">
                                        <i data-lucide="info" class="w-3 h-3 text-gray-400"></i>
                                    </button>
                                </label>
                                <input type="number" id="groupSize" placeholder="Ex: 50 (0 = sem grupo)" min="0" max="10000" class="w-full rounded-lg border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm py-2.5 px-3 focus:ring-primary-500 focus:border-primary-500 dark:text-white transition-colors" autocomplete="off">
                            </div>

                            <!-- Domain Filter -->
                            <div class="space-y-1.5 sm:col-span-2">
                                <label for="domainFilter" class="text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                                    Filtrar por Domínio
                                    <button type="button" onclick="showTooltip('domain')" class="tooltip-btn" title="Filtre e-mails por domínio específico. Ex: gmail.com">
                                        <i data-lucide="info" class="w-3 h-3 text-gray-400"></i>
                                    </button>
                                </label>
                                <input type="text" id="domainFilter" placeholder="Ex: gmail.com (vazio = todos)" class="w-full rounded-lg border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm py-2.5 px-3 focus:ring-primary-500 focus:border-primary-500 dark:text-white transition-colors" autocomplete="off" spellcheck="false">
                            </div>

                            <!-- Toggles -->
                            <div class="sm:col-span-2 grid grid-cols-2 gap-3 mt-1">
                                <label class="flex items-center gap-2.5 cursor-pointer group p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700/50 transition-colors">
                                    <input type="checkbox" id="sortAlphabetically" checked class="w-4 h-4 text-primary-600 rounded border-gray-300 dark:border-gray-500 focus:ring-primary-500 transition cursor-pointer" autocomplete="off">
                                    <span class="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors select-none">Ordem A-Z</span>
                                </label>

                                <label class="flex items-center gap-2.5 cursor-pointer group p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700/50 transition-colors">
                                    <input type="checkbox" id="toLowerCase" checked class="w-4 h-4 text-primary-600 rounded border-gray-300 dark:border-gray-500 focus:ring-primary-500 transition cursor-pointer" autocomplete="off">
                                    <span class="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors select-none">Forçar Minúsculas</span>
                                </label>

                                <label class="flex items-center gap-2.5 cursor-pointer group p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700/50 transition-colors">
                                    <input type="checkbox" id="removeDuplicates" checked class="w-4 h-4 text-primary-600 rounded border-gray-300 dark:border-gray-500 focus:ring-primary-500 transition cursor-pointer" autocomplete="off">
                                    <span class="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors select-none">Remover Duplicatas</span>
                                </label>

                                <label class="flex items-center gap-2.5 cursor-pointer group p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700/50 transition-colors">
                                    <input type="checkbox" id="validateStrict" class="w-4 h-4 text-primary-600 rounded border-gray-300 dark:border-gray-500 focus:ring-primary-500 transition cursor-pointer" autocomplete="off">
                                    <span class="text-sm text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors select-none flex items-center gap-1">
                                        Validação Rígida
                                        <button type="button" onclick="event.preventDefault(); showTooltip('strict')" class="tooltip-btn" title="Aplica validação mais estrita nos e-mails encontrados">
                                            <i data-lucide="info" class="w-3 h-3 text-gray-400"></i>
                                        </button>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Extract Button -->
                    <button onclick="extractEmails()" id="btnExtract" class="w-full py-3.5 px-4 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 active:from-primary-800 active:to-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800" aria-label="Extrair e-mails do texto inserido">
                        <i data-lucide="zap" class="w-5 h-5"></i>
                        Extrair E-mails Agora
                    </button>

                    <!-- Keyboard Shortcut Hint -->
                    <p class="text-center text-xs text-gray-400 dark:text-gray-500">
                        <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono border border-gray-200 dark:border-gray-600">Ctrl</kbd> +
                        <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono border border-gray-200 dark:border-gray-600">Enter</kbd>
                        para extrair rapidamente
                    </p>
                </div>

                <!-- Coluna Direita: Resultados -->
                <div class="p-5 sm:p-8 bg-gray-50/50 dark:bg-dark-card flex flex-col">

                    <!-- Stats Bar -->
                    <div class="flex flex-wrap justify-between items-center mb-3 gap-2">
                        <label for="outputText" class="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                            <i data-lucide="list-checks" class="w-4 h-4 text-green-500"></i> Resultado
                        </label>
                        <div class="flex items-center gap-2">
                            <div id="statsBadge" class="hidden px-2.5 py-1 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-xs font-bold tabular-nums">
                                0 e-mails
                            </div>
                            <div id="statsDetails" class="hidden text-xs text-gray-400 tabular-nums">
                                <!-- Filled by JS -->
                            </div>
                        </div>
                    </div>

                    <!-- Output Textarea -->
                    <div class="relative flex-grow">
                        <textarea
                            id="outputText"
                            readonly
                            class="w-full h-64 sm:h-full min-h-[280px] lg:min-h-[400px] p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm font-mono resize-none shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            placeholder="Os e-mails extraídos aparecerão aqui...&#10;&#10;➊ Cole o texto na área ao lado&#10;➋ Ajuste as configurações&#10;➌ Clique em 'Extrair E-mails Agora'&#10;➍ Copie ou baixe o resultado"
                            onclick="this.select()"
                            aria-label="Lista de e-mails extraídos"
                        ></textarea>
                    </div>

                    <!-- Domain Statistics -->
                    <div id="domainStats" class="hidden mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <h4 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <i data-lucide="bar-chart-3" class="w-3 h-3"></i> Domínios Encontrados
                        </h4>
                        <div id="domainStatsContent" class="flex flex-wrap gap-1.5">
                            <!-- Filled by JS -->
                        </div>
                    </div>

                    <!-- Action Bar -->
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4">
                        <button onclick="copyToClipboard()" id="btnCopy" disabled class="py-2.5 px-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-200 font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md active:scale-95" title="Copiar lista para área de transferência" aria-label="Copiar e-mails">
                            <i data-lucide="copy" class="w-4 h-4"></i> Copiar
                        </button>

                        <button onclick="downloadList('txt')" id="btnDownload" disabled class="py-2.5 px-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 text-gray-700 dark:text-gray-200 font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md active:scale-95" title="Baixar como arquivo .txt" aria-label="Baixar como TXT">
                            <i data-lucide="download" class="w-4 h-4"></i> .TXT
                        </button>

                        <button onclick="downloadList('csv')" id="btnCsv" disabled class="py-2.5 px-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 text-gray-700 dark:text-gray-200 font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md active:scale-95" title="Baixar como arquivo .csv para Excel/Sheets" aria-label="Baixar como CSV">
                            <i data-lucide="file-spreadsheet" class="w-4 h-4"></i> .CSV
                        </button>

                        <button onclick="clearAll()" class="py-2.5 px-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 text-gray-700 dark:text-gray-200 font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 text-sm hover:shadow-md active:scale-95" title="Limpar todos os campos" aria-label="Limpar campos">
                            <i data-lucide="trash-2" class="w-4 h-4"></i> Limpar
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- SEO Content / How to Use / Tips -->
        <section id="como-usar" class="mt-10 sm:mt-14 scroll-mt-20" aria-label="Como usar e informações">
            <div class="text-center mb-8">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                    Como <span class="text-primary-600">Funciona</span>
                </h2>
                <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">Simples, rápido e seguro em 3 passos</p>
            </div>

            <!-- Steps -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div class="relative bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group">
                    <div class="absolute -top-3 -left-3 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">1</div>
                    <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i data-lucide="clipboard-paste" class="w-6 h-6 text-blue-600 dark:text-blue-400"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 dark:text-white text-base mb-2">Cole o Texto</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Cole qualquer texto contendo e-mails: HTML, planilhas, conversas, listas misturadas ou dados brutos.</p>
                </div>

                <div class="relative bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group">
                    <div class="absolute -top-3 -left-3 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">2</div>
                    <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i data-lucide="settings-2" class="w-6 h-6 text-purple-600 dark:text-purple-400"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 dark:text-white text-base mb-2">Configure</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Escolha separador, agrupamento, ordem e filtros. Personalize a saída para sua necessidade específica.</p>
                </div>

                <div class="relative bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group">
                    <div class="absolute -top-3 -left-3 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">3</div>
                    <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i data-lucide="download" class="w-6 h-6 text-green-600 dark:text-green-400"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 dark:text-white text-base mb-2">Exporte</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Copie a lista limpa para a área de transferência ou baixe como arquivo .TXT ou .CSV pronto para uso.</p>
                </div>
            </div>

            <!-- Info Cards -->
            <div class="grid md:grid-cols-3 gap-6 text-sm">
                <article class="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                    <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                        <i data-lucide="info" class="w-5 h-5 text-blue-600 dark:text-blue-400"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 dark:text-white text-lg mb-3">Para que serve?</h3>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Ideal para profissionais de <strong>marketing digital</strong>, recrutadores, vendedores e equipes de CRM. 
                        Extraia leads de textos "sujos", páginas HTML salvas, listas de CSV bagunçadas, 
                        e-mails copiados de conversas de chat, documentos ou planilhas.
                    </p>
                    <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800/30">
                        <p class="text-xs text-blue-700 dark:text-blue-300 font-medium">
                            <i data-lucide="lightbulb" class="w-3 h-3 inline mr-1"></i>
                            <strong>Exemplo:</strong> Copie o conteúdo HTML de uma página de contatos e cole aqui — todos os e-mails serão extraídos automaticamente.
                        </p>
                    </div>
                </article>

                <article class="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                    <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                        <i data-lucide="lightbulb" class="w-5 h-5 text-purple-600 dark:text-purple-400"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 dark:text-white text-lg mb-3">Dicas Avançadas</h3>
                    <ul class="space-y-2.5 text-gray-600 dark:text-gray-400">
                        <li class="flex items-start gap-2">
                            <i data-lucide="check-circle-2" class="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"></i>
                            <span>Use <strong>"Agrupar"</strong> para criar blocos de envio (ex: 50 por vez) e evitar bloqueios de SMTP.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i data-lucide="check-circle-2" class="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"></i>
                            <span>Ative <strong>"Forçar Minúsculas"</strong> para evitar duplicatas como User@mail e user@mail.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i data-lucide="check-circle-2" class="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"></i>
                            <span>Use <strong>"Filtrar por Domínio"</strong> para segmentar e-mails por provedor (gmail.com, outlook.com).</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i data-lucide="check-circle-2" class="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"></i>
                            <span>Atalho: <kbd class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono border">Ctrl+Enter</kbd> extrai rapidamente.</span>
                        </li>
                    </ul>
                </article>

                <article class="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                    <div class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                        <i data-lucide="shield-check" class="w-5 h-5 text-green-600 dark:text-green-400"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 dark:text-white text-lg mb-3">Privacidade & LGPD</h3>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                        Priorizamos a segurança dos seus dados. <strong>Nenhum e-mail é enviado para servidores externos.</strong> 
                        Todo o processamento ocorre <strong>100% localmente no seu dispositivo</strong> via JavaScript.
                    </p>
                    <div class="space-y-2">
                        <div class="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <i data-lucide="check" class="w-4 h-4"></i>
                            <span class="text-xs font-medium">Zero coleta de dados pessoais</span>
                        </div>
                        <div class="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <i data-lucide="check" class="w-4 h-4"></i>
                            <span class="text-xs font-medium">Zero cookies de rastreamento</span>
                        </div>
                        <div class="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <i data-lucide="check" class="w-4 h-4"></i>
                            <span class="text-xs font-medium">Conformidade com Lei nº 13.709/2018</span>
                        </div>
                    </div>
                    <button onclick="showLgpdPolicy(event)" class="mt-3 w-full py-2 px-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                        Ler Política Completa de Privacidade
                    </button>
                </article>
            </div>

            <!-- FAQ / Accordion -->
            <div class="mt-10 max-w-3xl mx-auto">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
                    Perguntas <span class="text-primary-600">Frequentes</span>
                </h2>

                <div class="space-y-3" id="faqAccordion">
                    <details class="group bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <summary class="flex items-center justify-between p-4 cursor-pointer text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors list-none">
                            <span class="flex items-center gap-2"><i data-lucide="help-circle" class="w-4 h-4 text-primary-500"></i> Meus dados são enviados para algum servidor?</span>
                            <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-open:rotate-180"></i>
                        </summary>
                        <div class="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
                            <strong>Não.</strong> Absolutamente nenhum dado é transmitido. Todo o processamento ocorre 100% no seu navegador (client-side) usando JavaScript puro. Nenhuma requisição HTTP é feita com seus dados. Isso garante total conformidade com a LGPD.
                        </div>
                    </details>

                    <details class="group bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <summary class="flex items-center justify-between p-4 cursor-pointer text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors list-none">
                            <span class="flex items-center gap-2"><i data-lucide="help-circle" class="w-4 h-4 text-primary-500"></i> Existe limite de e-mails para extrair?</span>
                            <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-open:rotate-180"></i>
                        </summary>
                        <div class="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
                            Não há limite imposto pela ferramenta. O único limite é a capacidade do seu navegador. Em testes, processamos listas com mais de <strong>100.000 e-mails</strong> sem problemas.
                        </div>
                    </details>

                    <details class="group bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <summary class="flex items-center justify-between p-4 cursor-pointer text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors list-none">
                            <span class="flex items-center gap-2"><i data-lucide="help-circle" class="w-4 h-4 text-primary-500"></i> Quais formatos de texto são aceitos?</span>
                            <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-open:rotate-180"></i>
                        </summary>
                        <div class="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
                            A ferramenta aceita <strong>qualquer formato de texto</strong>: texto puro, HTML, CSV, JSON, XML, markdown, código-fonte, e-mails copiados de clientes de e-mail, conversas de WhatsApp, Telegram, ou qualquer outro texto que contenha endereços de e-mail.
                        </div>
                    </details>

                    <details class="group bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <summary class="flex items-center justify-between p-4 cursor-pointer text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors list-none">
                            <span class="flex items-center gap-2"><i data-lucide="help-circle" class="w-4 h-4 text-primary-500"></i> A ferramenta funciona no celular?</span>
                            <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-open:rotate-180"></i>
                        </summary>
                        <div class="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
                            <strong>Sim!</strong> A interface é totalmente responsiva e foi projetada com abordagem Mobile First. Funciona perfeitamente em smartphones, tablets e desktops de qualquer tamanho.
                        </div>
                    </details>

                    <details class="group bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <summary class="flex items-center justify-between p-4 cursor-pointer text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors list-none">
                            <span class="flex items-center gap-2"><i data-lucide="help-circle" class="w-4 h-4 text-primary-500"></i> Preciso estar online para usar?</span>
                            <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-open:rotate-180"></i>
                        </summary>
                        <div class="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
                            A página precisa ser carregada inicialmente com conexão à internet (para carregar os recursos CDN). Após o carregamento, toda a funcionalidade opera offline.
                        </div>
                    </details>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-dark-card border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors-all" role="contentinfo">
        <div class="max-w-7xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <!-- Left: Copyright -->
                <div class="text-center md:text-left space-y-1">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        &copy; <?= $anoAtual ?> <strong>ExtratorPro</strong> v<?= htmlspecialchars($versao) ?>. Todos os direitos reservados.
                    </p>
                    <p class="text-xs text-gray-400 dark:text-gray-500">
                        Ferramenta gratuita para extração e organização de e-mails. Processamento 100% local.
                    </p>
                </div>

                <!-- Center: Links -->
                <div class="flex items-center gap-4 text-xs">
                    <button onclick="showLgpdPolicy(event)" class="text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                        Política de Privacidade
                    </button>
                    <span class="text-gray-300 dark:text-gray-600">|</span>
                    <button onclick="showHelp()" class="text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                        Ajuda
                    </button>
                    <span class="text-gray-300 dark:text-gray-600">|</span>
                    <a href="#como-usar" class="text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                        Como Usar
                    </a>
                </div>

                <!-- Right: Developer Credit -->
                <div class="flex items-center gap-2.5">
                    <span class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Desenvolvido por</span>
                    <span class="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-750 rounded-lg text-xs font-black text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 shadow-sm tracking-wide">
                        HOTWYL | WILLFROMBRASIL
                    </span>
                </div>
            </div>

            <!-- LGPD Small Notice -->
            <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50 text-center">
                <p class="text-[10px] text-gray-400 dark:text-gray-600 leading-relaxed max-w-2xl mx-auto">
                    Este sistema opera em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). 
                    Nenhum dado pessoal é coletado, armazenado ou transmitido a terceiros. Todo o processamento ocorre localmente no dispositivo do usuário.
                </p>
            </div>
        </div>
    </footer>

    <!-- App Script -->
    <script src="app.js"></script>
</body>
</html>
