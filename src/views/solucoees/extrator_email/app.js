/**
 * ExtratorPro - Lógica Principal
 * Vanilla JS (ECMAScript 2020+)
 * Desenvolvido por HOTWYL | WILLFROMBRASIL
 * Processamento 100% client-side | LGPD Compliant
 */

'use strict';

// ============================================================
// Inicializar ícones Lucide
// ============================================================
lucide.createIcons();

// ============================================================
// Cache de elementos DOM
// ============================================================
const els = {
    input: document.getElementById('inputText'),
    output: document.getElementById('outputText'),
    separator: document.getElementById('separator'),
    groupSize: document.getElementById('groupSize'),
    sort: document.getElementById('sortAlphabetically'),
    lower: document.getElementById('toLowerCase'),
    removeDups: document.getElementById('removeDuplicates'),
    validateStrict: document.getElementById('validateStrict'),
    domainFilter: document.getElementById('domainFilter'),
    stats: document.getElementById('statsBadge'),
    statsDetails: document.getElementById('statsDetails'),
    domainStats: document.getElementById('domainStats'),
    domainStatsContent: document.getElementById('domainStatsContent'),
    charCount: document.getElementById('charCount'),
    btnCopy: document.getElementById('btnCopy'),
    btnDownload: document.getElementById('btnDownload'),
    btnCsv: document.getElementById('btnCsv'),
    btnExtract: document.getElementById('btnExtract'),
    themeToggle: document.getElementById('theme-toggle'),
    lgpdBanner: document.getElementById('lgpdBanner')
};

// Store para resultados
let lastExtractedEmails = [];

// ============================================================
// Helpers - SweetAlert2 com suporte a Dark Mode
// ============================================================
function getSwalTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    return {
        background: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f1f5f9' : '#1e293b',
        confirmButtonColor: '#2563eb',
        cancelButtonColor: '#6b7280'
    };
}

function swalToast(icon, title) {
    const theme = getSwalTheme();
    Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: theme.background,
        color: theme.color,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    }).fire({ icon, title });
}

// ============================================================
// Dark Mode
// ============================================================
function initTheme() {
    const saved = localStorage.getItem('extrator-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('extrator-theme', isDark ? 'dark' : 'light');

    // Re-render Lucide icons para atualizar os ícones de sol/lua
    requestAnimationFrame(() => lucide.createIcons());

    swalToast('success', isDark ? 'Modo escuro ativado' : 'Modo claro ativado');
}

els.themeToggle.addEventListener('click', toggleTheme);
initTheme();

// ============================================================
// LGPD Consent Banner
// ============================================================
function initLgpd() {
    const consent = localStorage.getItem('extrator-lgpd-consent');
    if (!consent) {
        // Exibir banner após curto delay
        setTimeout(() => {
            els.lgpdBanner.classList.add('show');
        }, 1000);
    }
}

function acceptLgpd() {
    localStorage.setItem('extrator-lgpd-consent', 'accepted');
    localStorage.setItem('extrator-lgpd-date', new Date().toISOString());
    els.lgpdBanner.classList.remove('show');
    swalToast('success', 'Preferências de privacidade salvas!');
}

function showLgpdPolicy(event) {
    if (event) event.preventDefault();
    const theme = getSwalTheme();

    Swal.fire({
        title: 'Política de Privacidade & LGPD',
        html: `
            <div style="text-align: left; font-size: 13px; line-height: 1.8; max-height: 60vh; overflow-y: auto;">
                <h3 style="font-size: 15px; font-weight: 700; margin: 16px 0 8px; color: ${theme.color};">1. Controlador dos Dados</h3>
                <p>Este sistema é desenvolvido e mantido por <strong>HOTWYL | WILLFROMBRASIL</strong>. 
                O ExtratorPro é uma ferramenta de processamento local que opera inteiramente no navegador do usuário.</p>

                <h3 style="font-size: 15px; font-weight: 700; margin: 16px 0 8px; color: ${theme.color};">2. Dados Coletados</h3>
                <p><strong>Nenhum dado pessoal é coletado, armazenado ou transmitido a servidores externos.</strong></p>
                <ul style="margin: 8px 0; padding-left: 20px;">
                    <li>Não utilizamos cookies de rastreamento</li>
                    <li>Não coletamos dados de navegação</li>
                    <li>Não armazenamos e-mails processados</li>
                    <li>Não compartilhamos dados com terceiros</li>
                    <li>Não utilizamos ferramentas de analytics</li>
                </ul>

                <h3 style="font-size: 15px; font-weight: 700; margin: 16px 0 8px; color: ${theme.color};">3. Armazenamento Local (LocalStorage)</h3>
                <p>Utilizamos o LocalStorage do navegador <strong>exclusivamente</strong> para:</p>
                <ul style="margin: 8px 0; padding-left: 20px;">
                    <li><strong>Preferência de tema:</strong> Salvar sua escolha entre modo claro/escuro</li>
                    <li><strong>Consentimento LGPD:</strong> Registrar que você leu esta política</li>
                </ul>
                <p>Esses dados ficam armazenados apenas no seu dispositivo e podem ser removidos a qualquer momento limpando os dados do navegador.</p>

                <h3 style="font-size: 15px; font-weight: 700; margin: 16px 0 8px; color: ${theme.color};">4. Processamento de Dados</h3>
                <p>Todo o processamento de e-mails ocorre <strong>100% localmente</strong> no seu navegador via JavaScript.
                Nenhuma requisição HTTP é feita com os dados inseridos. Os textos e e-mails processados existem apenas 
                na memória do seu navegador durante o uso e são descartados ao fechar ou recarregar a página.</p>

                <h3 style="font-size: 15px; font-weight: 700; margin: 16px 0 8px; color: ${theme.color};">5. Seus Direitos (LGPD - Lei nº 13.709/2018)</h3>
                <p>Como nenhum dado pessoal é coletado ou armazenado por nós, os direitos previstos nos artigos 17 a 22 
                da LGPD são automaticamente respeitados. Você tem total controle sobre seus dados em todo momento.</p>

                <h3 style="font-size: 15px; font-weight: 700; margin: 16px 0 8px; color: ${theme.color};">6. Responsabilidade do Usuário</h3>
                <p>O usuário é responsável por garantir que possui autorização legal para processar os endereços de e-mail 
                inseridos na ferramenta, em conformidade com a LGPD e demais legislações aplicáveis.</p>

                <h3 style="font-size: 15px; font-weight: 700; margin: 16px 0 8px; color: ${theme.color};">7. Contato</h3>
                <p>Para dúvidas sobre esta política de privacidade, entre em contato com o desenvolvedor 
                <strong>HOTWYL | WILLFROMBRASIL</strong>.</p>

                <p style="margin-top: 16px; font-size: 11px; color: #9ca3af;">
                    Última atualização: ${new Date().toLocaleDateString('pt-BR')} | Em conformidade com a Lei nº 13.709/2018 (LGPD)
                </p>
            </div>
        `,
        icon: 'info',
        confirmButtonText: 'Entendi e Aceito',
        showCancelButton: true,
        cancelButtonText: 'Fechar',
        width: '680px',
        ...theme
    }).then((result) => {
        if (result.isConfirmed) {
            acceptLgpd();
        }
    });
}

initLgpd();

// ============================================================
// Character Counter
// ============================================================
els.input.addEventListener('input', () => {
    const len = els.input.value.length;
    els.charCount.textContent = len.toLocaleString('pt-BR') + ' caracteres';
});

// ============================================================
// Keyboard Shortcuts
// ============================================================
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter = Extrair
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        extractEmails();
    }
    // Ctrl+D = Dark mode toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
});

// ============================================================
// Core: Extração de E-mails
// ============================================================
function extractEmails() {
    const text = els.input.value;

    if (!text.trim()) {
        const theme = getSwalTheme();
        Swal.fire({
            icon: 'warning',
            title: 'Campo Vazio',
            text: 'Por favor, insira ou cole algum texto contendo endereços de e-mail para extrair.',
            confirmButtonText: 'Entendi',
            ...theme
        });
        return;
    }

    // Feedback visual no botão
    const btnText = els.btnExtract.innerHTML;
    els.btnExtract.innerHTML = '<div class="spinner"></div> Processando...';
    els.btnExtract.disabled = true;

    // Usar requestAnimationFrame para não bloquear a UI
    requestAnimationFrame(() => {
        try {
            performExtraction(text);
        } catch (error) {
            console.error('Erro na extração:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro na Extração',
                text: 'Ocorreu um erro inesperado. Tente novamente.',
                ...getSwalTheme()
            });
        } finally {
            // Restaurar botão
            setTimeout(() => {
                els.btnExtract.innerHTML = btnText;
                els.btnExtract.disabled = false;
                lucide.createIcons();
            }, 300);
        }
    });
}

function performExtraction(text) {
    const startTime = performance.now();

    // Regex avançado para e-mail (RFC 5322 simplificado)
    const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/gi;

    let emails = text.match(emailRegex);

    if (!emails || emails.length === 0) {
        updateOutput('', 0);
        const theme = getSwalTheme();
        Swal.fire({
            icon: 'info',
            title: 'Nenhum E-mail Encontrado',
            html: '<p>Nenhum endereço de e-mail válido foi identificado no texto inserido.</p><p style="margin-top:8px;font-size:13px;color:#9ca3af;">Verifique se o texto contém endereços no formato: <strong>usuario@dominio.com</strong></p>',
            confirmButtonText: 'OK',
            ...theme
        });
        return;
    }

    const totalFound = emails.length;

    // 1. Forçar minúsculas
    if (els.lower.checked) {
        emails = emails.map(e => e.toLowerCase());
    }

    // 2. Remover pontos finais e caracteres inválidos no final
    emails = emails.map(e => e.replace(/[.]+$/, ''));

    // 3. Validação rígida (opcional)
    if (els.validateStrict.checked) {
        const strictRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        emails = emails.filter(e => strictRegex.test(e));
    }

    // 4. Remover duplicatas
    let uniqueEmails;
    if (els.removeDups.checked) {
        uniqueEmails = [...new Set(emails)];
    } else {
        uniqueEmails = [...emails];
    }

    // 5. Filtrar por domínio
    const domainFilter = els.domainFilter.value.trim().toLowerCase();
    if (domainFilter) {
        uniqueEmails = uniqueEmails.filter(e => {
            const domain = e.split('@')[1];
            return domain?.includes(domainFilter) ?? false;
        });
    }

    // 6. Ordenar
    if (els.sort.checked) {
        uniqueEmails.sort((a, b) => a.localeCompare(b, 'pt-BR'));
    }

    // 7. Calcular estatísticas de domínio
    const domainMap = {};
    uniqueEmails.forEach(e => {
        const domain = e.split('@')[1] || 'desconhecido';
        domainMap[domain] = (domainMap[domain] || 0) + 1;
    });

    // 8. Formatar saída
    let separator = els.separator.value;
    if (separator === 'newline') separator = '\n';
    if (separator === String.raw`\t`) separator = '\t';

    let resultString = '';
    const groupSize = Number.parseInt(els.groupSize.value, 10) || 0;

    if (groupSize > 0) {
        const chunks = [];
        for (let i = 0; i < uniqueEmails.length; i += groupSize) {
            chunks.push(uniqueEmails.slice(i, i + groupSize).join(separator));
        }
        resultString = chunks.join('\n\n');
    } else {
        resultString = uniqueEmails.join(separator);
    }

    const elapsed = (performance.now() - startTime).toFixed(1);

    // Guardar para downloads
    lastExtractedEmails = uniqueEmails;

    // 9. Atualizar UI
    updateOutput(resultString, uniqueEmails.length);
    updateDomainStats(domainMap);
    updateStatsDetails(totalFound, uniqueEmails.length, elapsed);

    // Feedback
    swalToast('success', `${uniqueEmails.length} e-mails extraídos em ${elapsed}ms!`);
}

// ============================================================
// UI Updates
// ============================================================
function updateOutput(text, count) {
    els.output.value = text;
    if (count > 0) {
        els.stats.textContent = `${count.toLocaleString('pt-BR')} e-mails únicos`;
        els.stats.classList.remove('hidden');
        els.btnCopy.disabled = false;
        els.btnDownload.disabled = false;
        els.btnCsv.disabled = false;
    } else {
        els.stats.classList.add('hidden');
        els.btnCopy.disabled = true;
        els.btnDownload.disabled = true;
        els.btnCsv.disabled = true;
        els.domainStats.classList.add('hidden');
        els.statsDetails.classList.add('hidden');
        lastExtractedEmails = [];
    }
}

function updateDomainStats(domainMap) {
    const sorted = Object.entries(domainMap).sort((a, b) => b[1] - a[1]);

    if (sorted.length === 0) {
        els.domainStats.classList.add('hidden');
        return;
    }

    const colors = [
        'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
        'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
        'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
        'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
        'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
        'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
    ];

    // Mostrar top 8 domínios
    const top = sorted.slice(0, 8);
    els.domainStatsContent.innerHTML = top.map((entry, i) => {
        const [domain, count] = entry;
        const colorClass = colors[i % colors.length];
        return `<span class="domain-tag ${colorClass}" title="${count} e-mails do domínio @${domain}">@${domain} <strong>${count}</strong></span>`;
    }).join('');

    if (sorted.length > 8) {
        const remaining = sorted.slice(8).reduce((sum, entry) => sum + entry[1], 0);
        els.domainStatsContent.innerHTML += `<span class="domain-tag bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300" title="Outros domínios">+${sorted.length - 8} outros (${remaining})</span>`;
    }

    els.domainStats.classList.remove('hidden');
}

function updateStatsDetails(total, unique, elapsed) {
    const dupsRemoved = total - unique;
    let html = `<span title="Total bruto encontrado">${total.toLocaleString('pt-BR')} encontrados</span>`;
    if (dupsRemoved > 0) {
        html += ` · <span class="text-orange-400" title="Duplicatas removidas">${dupsRemoved.toLocaleString('pt-BR')} duplicatas</span>`;
    }
    html += ` · <span class="text-green-400" title="Tempo de processamento">${elapsed}ms</span>`;
    els.statsDetails.innerHTML = html;
    els.statsDetails.classList.remove('hidden');
}

// ============================================================
// Funções Auxiliares
// ============================================================
async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        if (text) {
            els.input.value = text;
            els.input.focus();
            els.charCount.textContent = text.length.toLocaleString('pt-BR') + ' caracteres';
            swalToast('success', 'Texto colado com sucesso!');
        }
    } catch (err) {
        console.warn('Clipboard API não disponível:', err);
        const theme = getSwalTheme();
        Swal.fire({
            icon: 'warning',
            title: 'Acesso Negado',
            html: '<p>Não foi possível acessar a área de transferência.</p><p style="margin-top:8px;font-size:13px;">Use <kbd style="padding:2px 6px;background:#f1f5f9;border-radius:4px;font-size:12px;border:1px solid #e2e8f0;">Ctrl+V</kbd> para colar diretamente no campo de texto.</p>',
            confirmButtonText: 'OK',
            ...theme
        });
    }
}

function loadSampleData() {
    const sampleText = `Olá João,

Seguem os contatos da equipe de vendas para o projeto:
- Gerente: carlos.santos@empresa.com.br
- Coordenadora: maria.silva@empresa.com.br
- Analista: pedro.alves@gmail.com

Os fornecedores são:
contato@fornecedor1.com, suporte@fornecedor2.com.br; financeiro@fornecedor1.com

Lista de leads da campanha de marketing digital:
ana.costa@yahoo.com.br
roberto.lima@hotmail.com
JULIANA.MENDES@OUTLOOK.COM
marcos.souza@gmail.com
patricia@startup.io
dev@techcompany.com
rh@empresa.com.br
carlos.santos@empresa.com.br (duplicado proposital)

HTML copiado: <a href="mailto:contato@loja.com.br">contato@loja.com.br</a>
Texto sujo: entre em contato em vendas@marketplace.com para mais info.

Newsletter: news@blog.com.br, editor@revista.com, assinante123@gmail.com
Suporte técnico: helpdesk@software.com | ti@corporacao.com.br`;

    els.input.value = sampleText;
    els.charCount.textContent = sampleText.length.toLocaleString('pt-BR') + ' caracteres';
    els.input.focus();
    swalToast('info', 'Dados de exemplo carregados! Clique em "Extrair" para testar.');
}

function copyToClipboard() {
    const text = els.output.value;
    if (!text) return;

    // API moderna com fallback
    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback();
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    els.output.select();
    els.output.setSelectionRange(0, 99999);
    document.execCommand('copy');
    showCopyFeedback();
}

function showCopyFeedback() {
    const theme = getSwalTheme();
    Swal.fire({
        icon: 'success',
        title: 'Copiado!',
        text: `${lastExtractedEmails.length} e-mails copiados para a área de transferência.`,
        timer: 1800,
        showConfirmButton: false,
        ...theme
    });

    // Visual feedback no botão
    const originalText = els.btnCopy.innerHTML;
    els.btnCopy.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i> Copiado!';
    els.btnCopy.classList.add('border-green-500', 'text-green-600');
    lucide.createIcons();
    setTimeout(() => {
        els.btnCopy.innerHTML = originalText;
        els.btnCopy.classList.remove('border-green-500', 'text-green-600');
        lucide.createIcons();
    }, 2000);
}

function downloadList(format = 'txt') {
    if (lastExtractedEmails.length === 0) return;

    let content, mimeType, extension;
    const date = new Date().toISOString().slice(0, 10);

    if (format === 'csv') {
        content = 'Email\n' + lastExtractedEmails.join('\n');
        mimeType = 'text/csv;charset=utf-8;';
        extension = 'csv';
    } else {
        content = els.output.value;
        mimeType = 'text/plain;charset=utf-8;';
        extension = 'txt';
    }

    // BOM para UTF-8 (compatibilidade com Excel)
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `extrator-emails-${date}-${lastExtractedEmails.length}.${extension}`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();

    // Cleanup
    setTimeout(() => {
        a.remove();
        URL.revokeObjectURL(url);
    }, 100);

    swalToast('success', `Arquivo .${extension.toUpperCase()} baixado com ${lastExtractedEmails.length} e-mails!`);
}

function clearAll() {
    if (!els.input.value && !els.output.value) return;

    const theme = getSwalTheme();
    Swal.fire({
        title: 'Limpar Tudo?',
        text: 'Isso removerá os textos de entrada e saída. Esta ação não pode ser desfeita.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, limpar',
        cancelButtonText: 'Cancelar',
        ...theme,
        customClass: {
            confirmButton: 'swal2-confirm',
            cancelButton: 'swal2-cancel'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            els.input.value = '';
            els.domainFilter.value = '';
            els.groupSize.value = '';
            els.charCount.textContent = '0 caracteres';
            updateOutput('', 0);
            els.domainStats.classList.add('hidden');
            els.statsDetails.classList.add('hidden');
            lastExtractedEmails = [];
            swalToast('success', 'Campos limpos com sucesso!');
        }
    });
}

// ============================================================
// Tooltips / Help System
// ============================================================
const tooltipMessages = {
    input: {
        title: 'Texto de Origem',
        text: 'Cole aqui qualquer tipo de texto contendo endereços de e-mail: HTML de páginas web, planilhas copiadas, conversas de chat, listas CSV, código-fonte, ou texto puro. A ferramenta identificará automaticamente todos os e-mails válidos.'
    },
    config: {
        title: 'Configurações de Extração',
        text: 'Personalize como os e-mails serão processados e formatados na saída. Você pode escolher o separador, agrupar em lotes, filtrar por domínio e aplicar transformações como ordenação e remoção de duplicatas.'
    },
    separator: {
        title: 'Separador de Saída',
        text: 'Define o caractere que separa cada e-mail na lista final. Use "Nova Linha" para listas verticais, "Vírgula" para uso em campos CC/BCC, ou "Tab" para colar em planilhas.'
    },
    group: {
        title: 'Agrupamento de E-mails',
        text: 'Insere uma linha em branco a cada X e-mails. Útil para criar blocos de envio e evitar bloqueios de SMTP. Exemplo: valor "50" cria grupos de 50 e-mails separados por linhas em branco.'
    },
    domain: {
        title: 'Filtro por Domínio',
        text: 'Filtre os e-mails extraídos por um domínio específico. Exemplo: digite "gmail.com" para extrair apenas endereços do Gmail. Deixe vazio para extrair todos os domínios.'
    },
    strict: {
        title: 'Validação Rígida',
        text: 'Quando ativada, aplica uma validação mais rigorosa nos e-mails encontrados, exigindo formato completo com TLD (extensão) de pelo menos 2 caracteres. Remove e-mails com formatos incomuns ou potencialmente inválidos.'
    }
};

function showTooltip(key) {
    const tip = tooltipMessages[key];
    if (!tip) return;

    const theme = getSwalTheme();
    Swal.fire({
        title: tip.title,
        text: tip.text,
        icon: 'info',
        confirmButtonText: 'Entendi',
        ...theme,
        width: '480px',
        customClass: {
            popup: 'animate__animated animate__fadeIn'
        }
    });
}

function showHelp() {
    const theme = getSwalTheme();
    Swal.fire({
        title: 'Central de Ajuda',
        html: `
            <div style="text-align: left; font-size: 13px; line-height: 1.8; max-height: 55vh; overflow-y: auto;">
                <h3 style="font-size: 15px; font-weight: 700; margin: 12px 0 8px;">O que é o ExtratorPro?</h3>
                <p>Uma ferramenta online gratuita e segura para extrair endereços de e-mail de qualquer texto. 
                   Todo o processamento é feito localmente no seu navegador — nenhum dado sai do seu dispositivo.</p>

                <h3 style="font-size: 15px; font-weight: 700; margin: 16px 0 8px;">Como usar</h3>
                <ol style="padding-left: 20px; margin: 8px 0;">
                    <li><strong>Cole o texto</strong> na área "Texto de Origem" (aceita qualquer formato)</li>
                    <li><strong>Configure</strong> as opções de extração conforme sua necessidade</li>
                    <li><strong>Clique em "Extrair E-mails Agora"</strong> ou use <kbd style="padding:1px 5px;background:#f1f5f9;border-radius:3px;font-size:11px;border:1px solid #e2e8f0;">Ctrl+Enter</kbd></li>
                    <li><strong>Copie ou baixe</strong> o resultado em .TXT ou .CSV</li>
                </ol>

                <h3 style="font-size: 15px; font-weight: 700; margin: 16px 0 8px;">Atalhos de Teclado</h3>
                <table style="width:100%; border-collapse: collapse; font-size: 12px;">
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 6px 0;"><kbd style="padding:1px 5px;background:#f1f5f9;border-radius:3px;border:1px solid #e2e8f0;">Ctrl+Enter</kbd></td>
                        <td style="padding: 6px 0;">Extrair e-mails</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 6px 0;"><kbd style="padding:1px 5px;background:#f1f5f9;border-radius:3px;border:1px solid #e2e8f0;">Ctrl+D</kbd></td>
                        <td style="padding: 6px 0;">Alternar tema claro/escuro</td>
                    </tr>
                </table>

                <h3 style="font-size: 15px; font-weight: 700; margin: 16px 0 8px;">Dicas Avançadas</h3>
                <ul style="padding-left: 20px; margin: 8px 0;">
                    <li>Use o botão <strong>"Exemplo"</strong> para carregar dados de teste e experimentar</li>
                    <li>Ative <strong>"Validação Rígida"</strong> para filtrar e-mails com formatos incomuns</li>
                    <li>Use <strong>"Filtrar por Domínio"</strong> para segmentar por provedor</li>
                    <li>O agrupamento é ideal para envios em lote via SMTP</li>
                    <li>Exporte em <strong>.CSV</strong> para importar diretamente no Excel ou Google Sheets</li>
                </ul>

                <h3 style="font-size: 15px; font-weight: 700; margin: 16px 0 8px;">Segurança & Privacidade</h3>
                <p>Todo o processamento ocorre 100% no seu navegador. Nenhum dado é transmitido para servidores. 
                   Compatível com a LGPD (Lei nº 13.709/2018).</p>
            </div>
        `,
        icon: 'question',
        confirmButtonText: 'Fechar',
        ...theme,
        width: '620px'
    });
}

// ============================================================
// Performance: Debounce para input
// ============================================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Atualizar contador com debounce
const debouncedCharCount = debounce(() => {
    els.charCount.textContent = els.input.value.length.toLocaleString('pt-BR') + ' caracteres';
}, 50);

els.input.addEventListener('input', debouncedCharCount);

// ============================================================
// Init: Re-render ícones após carregamento completo
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});