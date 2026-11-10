/**
 * ============================================
 * PIX DECODE PRO - Application Engine
 * Desenvolvido por HOTWYL | WILLFROMBRASIL
 * Vanilla JS ES6+ | Mobile First
 * ============================================
 */

'use strict';

// ============================================
// CONFIGURAÇÕES GLOBAIS
// ============================================
const CONFIG = {
    brandColor: '#0d9488',
    errorColor: '#ef4444',
    warningColor: '#f59e0b',
    version: '2.1.4',
    storageKeys: {
        lgpd: 'pix_decode_lgpd',
        darkMode: 'pix_decode_dark_mode',
    }
};

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    checkLGPD();
    initKeyboardShortcuts();
    initScrollAnimations();

    // Auto-focus no campo (Desktop)
    if (window.innerWidth > 768) {
        const pixInput = document.getElementById('pixInput');
        if (pixInput) pixInput.focus();
    }
});

// ============================================
// DARK MODE
// ============================================
function initDarkMode() {
    const savedMode = localStorage.getItem(CONFIG.storageKeys.darkMode);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedMode === 'true' || (savedMode === null && prefersDark);

    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    updateThemeToggleIcon();

    // Escutar mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem(CONFIG.storageKeys.darkMode) === null) {
            if (e.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            updateThemeToggleIcon();
        }
    });
}

function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem(CONFIG.storageKeys.darkMode, isDark.toString());
    updateThemeToggleIcon();

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: isDark ? 'Modo Escuro ativado' : 'Modo Claro ativado',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    });
}

function updateThemeToggleIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    const icons = document.querySelectorAll('.theme-toggle-knob i');
    icons.forEach(icon => {
        icon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    });

    // Atualizar meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', isDark ? '#0f172a' : '#0d9488');
    }
}

// ============================================
// LGPD COMPLIANCE
// ============================================
function checkLGPD() {
    const consent = localStorage.getItem(CONFIG.storageKeys.lgpd);
    if (!consent) {
        const banner = document.getElementById('lgpd-banner');
        if (banner) {
            setTimeout(() => {
                banner.style.transform = 'translateY(0)';
            }, 1200);
        }
    }
}

function acceptLGPD() {
    localStorage.setItem(CONFIG.storageKeys.lgpd, 'accepted');
    hideLGPDBanner();
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Preferências de privacidade salvas!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
}

function rejectLGPD() {
    localStorage.setItem(CONFIG.storageKeys.lgpd, 'rejected');
    hideLGPDBanner();
    Swal.fire({
        icon: 'info',
        title: 'Preferências Salvas',
        html: '<p class="text-sm">Você optou por não aceitar os termos. A ferramenta continuará funcionando normalmente, porém nenhum dado será armazenado localmente.</p>',
        confirmButtonText: 'Entendido',
        confirmButtonColor: CONFIG.brandColor
    });
}

function hideLGPDBanner() {
    const banner = document.getElementById('lgpd-banner');
    if (banner) {
        banner.style.transform = 'translateY(100%)';
    }
}

// ============================================
// MOBILE MENU
// ============================================
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.getElementById('mobileMenuBtn');
    if (!menu) return;

    const isHidden = menu.classList.contains('hidden');
    menu.classList.toggle('hidden');

    if (btn) {
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = isHidden ? 'fa-solid fa-xmark text-base' : 'fa-solid fa-bars text-base';
        }
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.getElementById('mobileMenuBtn');
    if (menu) menu.classList.add('hidden');
    if (btn) {
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars text-base';
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl+Enter = Analisar
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            decodePix();
        }

        // Ctrl+Shift+V = Colar do Clipboard
        if (e.ctrlKey && e.shiftKey && e.key === 'V') {
            e.preventDefault();
            pasteFromClipboard();
        }

        // Ctrl+D = Dark Mode Toggle
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            toggleDarkMode();
        }

        // Escape = Limpar
        if (e.key === 'Escape') {
            const resultArea = document.getElementById('resultArea');
            if (resultArea && !resultArea.classList.contains('hidden')) {
                clearField();
            }
        }

        // F1 = Ajuda
        if (e.key === 'F1') {
            e.preventDefault();
            showHelp();
        }
    });
}

function showShortcuts() {
    Swal.fire({
        title: '<i class="fa-regular fa-keyboard text-brand-600 mr-2"></i> Atalhos do Teclado',
        html: `
            <div class="text-left text-sm space-y-3 mt-2">
                <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span class="text-slate-700 font-medium">Analisar Código</span>
                    <span><kbd class="kbd-badge">Ctrl</kbd> + <kbd class="kbd-badge">Enter</kbd></span>
                </div>
                <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span class="text-slate-700 font-medium">Colar do Clipboard</span>
                    <span><kbd class="kbd-badge">Ctrl</kbd> + <kbd class="kbd-badge">Shift</kbd> + <kbd class="kbd-badge">V</kbd></span>
                </div>
                <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span class="text-slate-700 font-medium">Dark / Light Mode</span>
                    <span><kbd class="kbd-badge">Ctrl</kbd> + <kbd class="kbd-badge">D</kbd></span>
                </div>
                <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span class="text-slate-700 font-medium">Limpar / Fechar</span>
                    <span><kbd class="kbd-badge">Esc</kbd></span>
                </div>
                <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span class="text-slate-700 font-medium">Ajuda</span>
                    <span><kbd class="kbd-badge">F1</kbd></span>
                </div>
            </div>
        `,
        confirmButtonText: 'Fechar',
        confirmButtonColor: CONFIG.brandColor,
        width: '460px'
    });
}

// ============================================
// UI ACTIONS
// ============================================
function clearField() {
    const input = document.getElementById('pixInput');
    if (input) {
        input.value = '';
        input.focus();
    }
    const resultArea = document.getElementById('resultArea');
    if (resultArea) resultArea.classList.add('hidden');

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: 'Campos limpos',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    });
}

function newAnalysis() {
    clearField();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        const input = document.getElementById('pixInput');
        if (input && text) {
            input.value = text.trim();
            input.focus();
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Código colado do clipboard!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
        }
    } catch (err) {
        Swal.fire({
            icon: 'warning',
            title: 'Permissão Necessária',
            html: '<p class="text-sm">Seu navegador bloqueou o acesso à área de transferência. Cole manualmente usando <strong>Ctrl+V</strong>.</p>',
            confirmButtonColor: CONFIG.brandColor,
            confirmButtonText: 'Entendido'
        });
    }
}

function useExample() {
    const exampleEl = document.getElementById('examplePayload');
    const input = document.getElementById('pixInput');
    if (exampleEl && input) {
        input.value = exampleEl.textContent.trim();
        input.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Payload de exemplo inserido!',
            text: 'Clique em "Analisar Código Pix" para decodificar.',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true
        });
    }
}

function showHelp() {
    Swal.fire({
        title: '<i class="fa-regular fa-circle-question text-brand-600 mr-2"></i> Guia Rápido',
        html: `
            <div class="text-left text-sm space-y-4">
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p class="font-bold text-slate-700 mb-1 flex items-center gap-2">
                        <span class="w-6 h-6 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        Onde encontro o código?
                    </p>
                    <p class="text-slate-500 ml-8">No seu banco, procure por <strong>"Pix Copia e Cola"</strong> ou após escanear um QR Code, selecione "Copiar Código".</p>
                </div>
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p class="font-bold text-slate-700 mb-1 flex items-center gap-2">
                        <span class="w-6 h-6 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        O que o sistema analisa?
                    </p>
                    <p class="text-slate-500 ml-8">Extraímos o nome do recebedor, valor, cidade, chave Pix e validamos o Checksum (CRC16) para garantir que o código não foi alterado.</p>
                </div>
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p class="font-bold text-slate-700 mb-1 flex items-center gap-2">
                        <span class="w-6 h-6 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        Como verificar fraudes?
                    </p>
                    <p class="text-slate-500 ml-8">Se o CRC aparecer como <strong>"Inválido"</strong>, o código pode ter sido adulterado. Nunca pague um Pix com CRC inválido.</p>
                </div>
                <div class="p-4 bg-brand-50 rounded-xl border border-brand-100">
                    <p class="font-bold text-brand-700 mb-1 flex items-center gap-2">
                        <i class="fa-solid fa-shield-halved"></i> Privacidade Total (LGPD)
                    </p>
                    <p class="text-brand-600 ml-0">Nenhum dado é armazenado em nossos servidores. Tudo é processado em tempo real via PHP 8 e descartado imediatamente.</p>
                </div>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p class="text-xs text-slate-400 flex items-center gap-1.5">
                        <i class="fa-regular fa-keyboard"></i>
                        Use <kbd class="kbd-badge">F1</kbd> para abrir esta ajuda a qualquer momento
                    </p>
                </div>
            </div>
        `,
        icon: 'info',
        confirmButtonText: 'Entendido',
        confirmButtonColor: CONFIG.brandColor,
        width: '520px'
    });
}

// ============================================
// LEGAL MODALS
// ============================================
function showPrivacyPolicy() {
    Swal.fire({
        title: '<i class="fa-solid fa-shield-halved text-brand-600 mr-2"></i> Política de Privacidade',
        html: `
            <div class="text-left text-sm space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                <p class="text-slate-500 leading-relaxed">Em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong>, informamos:</p>
                
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 class="font-bold text-slate-700 mb-2">1. Coleta de Dados</h4>
                    <p class="text-slate-500">O Pix Decode Pro <strong>não coleta, armazena ou transmite</strong> dados pessoais. Os códigos Pix inseridos são processados exclusivamente em memória (RAM) do servidor e descartados imediatamente após a análise.</p>
                </div>
                
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 class="font-bold text-slate-700 mb-2">2. Cookies e Armazenamento Local</h4>
                    <p class="text-slate-500">Utilizamos apenas <strong>localStorage</strong> para salvar suas preferências de tema (claro/escuro) e consentimento LGPD. Nenhum cookie de rastreamento é utilizado.</p>
                </div>
                
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 class="font-bold text-slate-700 mb-2">3. Compartilhamento</h4>
                    <p class="text-slate-500">Nenhum dado é compartilhado com terceiros, parceiros comerciais ou anunciantes.</p>
                </div>
                
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 class="font-bold text-slate-700 mb-2">4. Segurança</h4>
                    <p class="text-slate-500">Toda comunicação é protegida por criptografia SSL/TLS. Os headers de segurança HTTP (X-Frame-Options, X-XSS-Protection, etc.) estão habilitados.</p>
                </div>
                
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 class="font-bold text-slate-700 mb-2">5. Seus Direitos</h4>
                    <p class="text-slate-500">Como não armazenamos dados pessoais, não há dados a serem acessados, corrigidos ou excluídos. Você pode revogar o consentimento de cookies a qualquer momento limpando o armazenamento local do navegador.</p>
                </div>
                
                <p class="text-xs text-slate-400 text-center mt-4">Última atualização: Fevereiro de 2026</p>
            </div>
        `,
        confirmButtonText: 'Fechar',
        confirmButtonColor: CONFIG.brandColor,
        width: '600px'
    });
}

function showTermsOfUse() {
    Swal.fire({
        title: '<i class="fa-solid fa-file-contract text-brand-600 mr-2"></i> Termos de Uso',
        html: `
            <div class="text-left text-sm space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 class="font-bold text-slate-700 mb-2">1. Propósito</h4>
                    <p class="text-slate-500">O Pix Decode Pro é uma ferramenta gratuita de análise e decodificação de payloads Pix (BR Code), para fins educacionais, de segurança e validação.</p>
                </div>
                
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 class="font-bold text-slate-700 mb-2">2. Uso Adequado</h4>
                    <p class="text-slate-500">É proibido utilizar esta ferramenta para fins ilícitos, fraudes, engenharia social ou qualquer atividade que viole a legislação brasileira.</p>
                </div>
                
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 class="font-bold text-slate-700 mb-2">3. Isenção de Responsabilidade</h4>
                    <p class="text-slate-500">A ferramenta é fornecida "como está". Não nos responsabilizamos por decisões financeiras tomadas com base nas análises realizadas. Sempre confirme os dados no aplicativo oficial do seu banco.</p>
                </div>
                
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 class="font-bold text-slate-700 mb-2">4. Propriedade Intelectual</h4>
                    <p class="text-slate-500">Todo o código-fonte, design e conteúdo são de propriedade de HOTWYL | WILLFROMBRASIL. Direitos reservados.</p>
                </div>
                
                <p class="text-xs text-slate-400 text-center mt-4">Última atualização: Fevereiro de 2026</p>
            </div>
        `,
        confirmButtonText: 'Fechar',
        confirmButtonColor: CONFIG.brandColor,
        width: '600px'
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observar seções
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
}

// ============================================
// MOTOR PRINCIPAL - DECODE PIX
// ============================================
async function decodePix() {
    const input = document.getElementById('pixInput');
    const pixCode = input ? input.value.trim() : '';
    const resultArea = document.getElementById('resultArea');
    const loading = document.getElementById('loading');
    const btnAnalyze = document.getElementById('btnAnalyze');

    if (!pixCode) {
        Swal.fire({
            icon: 'warning',
            title: 'Código Ausente',
            html: `
                <div class="text-sm text-slate-500">
                    <p class="mb-3">Por favor, cole um payload Pix (BR Code) para iniciar a análise.</p>
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p class="text-xs"><strong>Exemplo:</strong> <code class="text-brand-600">00020126580014BR.GOV.BCB.PIX...</code></p>
                    </div>
                </div>
            `,
            confirmButtonColor: CONFIG.brandColor,
            confirmButtonText: 'Entendido'
        });
        if (input) input.focus();
        return;
    }

    // Validação client-side básica
    if (!pixCode.startsWith('00')) {
        Swal.fire({
            icon: 'error',
            title: 'Formato Inválido',
            html: '<p class="text-sm text-slate-500">O código Pix deve iniciar com <strong>"00"</strong>. Verifique se copiou corretamente o código completo "Pix Copia e Cola" do seu banco.</p>',
            confirmButtonColor: CONFIG.errorColor,
            confirmButtonText: 'Tentar Novamente'
        });
        return;
    }

    // UI Feedback
    if (resultArea) resultArea.classList.add('hidden');
    if (loading) loading.classList.remove('hidden');
    if (btnAnalyze) {
        btnAnalyze.disabled = true;
        btnAnalyze.classList.add('opacity-75', 'cursor-wait');
    }

    try {
        // Verificação de protocolo
        if (window.location.protocol === 'file:') {
            throw new Error('A aplicação deve ser executada através de um servidor local (ex: Laragon, Apache, XAMPP). O protocolo "file://" não suporta requisições POST ao PHP.');
        }

        const response = await fetch('app.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ pixCode: pixCode })
        }).catch(err => {
            if (err.message === 'Failed to fetch') {
                throw new Error('Não foi possível conectar ao servidor. Verifique se o seu servidor local (Laragon/Apache/XAMPP) está ativo.');
            }
            throw err;
        });

        if (!response.ok) {
            let errorMessage = 'Erro no processamento.';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                errorMessage = `Erro do Servidor (${response.status}): O servidor não retornou uma resposta válida.`;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();

        // Delay para feedback visual
        await new Promise(resolve => setTimeout(resolve, 600));

        if (loading) loading.classList.add('hidden');
        renderData(data);
        if (resultArea) {
            resultArea.classList.remove('hidden');
            resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

    } catch (error) {
        if (loading) loading.classList.add('hidden');
        console.error('PixDecode Error:', error);

        Swal.fire({
            icon: 'error',
            title: 'Análise Interrompida',
            text: error.message,
            confirmButtonColor: CONFIG.errorColor,
            footer: '<span class="text-xs text-slate-400"><i class="fa-solid fa-lightbulb text-yellow-500 mr-1"></i> Dica: Certifique-se de acessar via http://localhost/...</span>'
        });
    } finally {
        if (btnAnalyze) {
            btnAnalyze.disabled = false;
            btnAnalyze.classList.remove('opacity-75', 'cursor-wait');
        }
    }
}

// ============================================
// RENDER DATA
// ============================================
function renderData(apiResponse) {
    const data = apiResponse.data;
    const grid = document.getElementById('detailsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    // Atualiza Highlights
    const receiverEl = document.getElementById('displayReceiver');
    const amountEl = document.getElementById('displayAmount');
    if (receiverEl) receiverEl.textContent = data['59'] ? data['59'].value : 'Recebedor Não Identificado';
    if (amountEl) amountEl.textContent = data['54'] ? data['54'].value : 'Valor em Aberto';

    // Status de Integridade (CRC)
    const crcBadge = document.getElementById('crcStatusBadge');
    const crcIcon = document.getElementById('crcIcon');
    const crcLabel = document.getElementById('crcLabel');

    if (apiResponse.crc_valid) {
        if (crcBadge) crcBadge.className = "bg-emerald-500/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 sm:gap-3 border border-emerald-500/30";
        if (crcIcon) crcIcon.className = "fa-solid fa-shield-check text-emerald-400";
        if (crcLabel) crcLabel.textContent = "Assinatura Válida";
    } else {
        if (crcBadge) crcBadge.className = "bg-red-500/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 sm:gap-3 border border-red-500/30 text-red-200";
        if (crcIcon) crcIcon.className = "fa-solid fa-triangle-exclamation text-red-400";
        if (crcLabel) crcLabel.textContent = "Assinatura Inválida";

        Swal.fire({
            icon: 'warning',
            title: 'Código Corrompido',
            html: `
                <div class="text-sm text-slate-500 space-y-3">
                    <p>O Checksum (CRC16) deste código é <strong class="text-red-600">inválido</strong>.</p>
                    <div class="p-3 bg-red-50 rounded-xl border border-red-100">
                        <p class="text-red-600 text-xs"><i class="fa-solid fa-triangle-exclamation mr-1"></i> O código pode ter sido alterado, corrompido ou copiado incorretamente.</p>
                    </div>
                    <p class="text-xs text-slate-400">Recomendação: Não realize pagamentos com este código sem confirmação.</p>
                </div>
            `,
            confirmButtonColor: CONFIG.errorColor,
            confirmButtonText: 'Entendido'
        });
    }

    // Sidebar Info
    const pixVersion = document.getElementById('pixVersion');
    const pixCountry = document.getElementById('pixCountry');
    const pixTxId = document.getElementById('pixTxId');
    if (pixVersion) pixVersion.textContent = data['01'] ? data['01'].value : 'v1.0';
    if (pixCountry) pixCountry.textContent = data['58'] ? data['58'].value : 'Brasil';
    if (pixTxId) pixTxId.textContent = `TXID: ${data.txid ? data.txid.value : 'NÃO GERADO'}`;

    // Tag Icons Map
    const tagIcons = {
        '00': 'fa-solid fa-hashtag',
        '01': 'fa-solid fa-flag',
        '52': 'fa-solid fa-store',
        '53': 'fa-solid fa-coins',
        '54': 'fa-solid fa-money-bill-wave',
        '58': 'fa-solid fa-globe',
        '59': 'fa-solid fa-user',
        '60': 'fa-solid fa-city',
        '63': 'fa-solid fa-shield-check',
        'gui': 'fa-solid fa-server',
        'pixKey': 'fa-solid fa-key',
        'description': 'fa-solid fa-file-lines',
        'txid': 'fa-solid fa-fingerprint',
    };

    // Renderiza Cards Detalhados
    Object.keys(data).forEach(key => {
        const item = data[key];
        if (!item.label) return;

        const icon = tagIcons[key] || tagIcons[item.id] || 'fa-solid fa-tag';
        const card = document.createElement('div');
        card.className = "p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 transition-all group";
        card.innerHTML = `
            <div class="flex items-center justify-between mb-1.5">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <i class="${icon} text-brand-500 text-[9px]"></i> ${item.label}
                </span>
                <span class="text-[9px] mono-font text-slate-300">TAG ${item.id || key}</span>
            </div>
            <div class="text-slate-700 font-bold break-all group-hover:text-brand-700 transition-colors text-sm">
                ${escapeHtml(item.value)}
            </div>
        `;
        grid.appendChild(card);
    });

    // Armazena chave para cópia rápida
    window.currentPixKey = data.pixKey ? data.pixKey.value : null;
    window.lastDecodedData = data;
    const copyBtn = document.getElementById('copyKeyBtn');
    if (copyBtn) {
        if (!window.currentPixKey) {
            copyBtn.classList.add('opacity-50', 'pointer-events-none');
        } else {
            copyBtn.classList.remove('opacity-50', 'pointer-events-none');
        }
    }
}

// ============================================
// COPY FUNCTIONS
// ============================================
function copyCleanKey() {
    if (!window.currentPixKey) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: 'Nenhuma chave Pix disponível',
            showConfirmButton: false,
            timer: 2000
        });
        return;
    }

    navigator.clipboard.writeText(window.currentPixKey).then(() => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Chave Pix copiada!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    }).catch(() => {
        fallbackCopy(window.currentPixKey);
    });
}

function copyResultsAsJSON() {
    const data = window.lastDecodedData || null;
    const input = document.getElementById('pixInput');
    const textToCopy = data ? JSON.stringify(data, null, 2) : (input ? input.value : '');
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Dados copiados!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    }).catch(() => {
        fallbackCopy(textToCopy);
    });
}

// Fallback para navegadores antigos
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Copiado!',
            showConfirmButton: false,
            timer: 2000
        });
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Erro ao copiar',
            text: 'Não foi possível copiar automaticamente. Selecione e copie manualmente.',
            confirmButtonColor: CONFIG.brandColor
        });
    }
    document.body.removeChild(textarea);
}

// ============================================
// UTILITIES
// ============================================
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}
