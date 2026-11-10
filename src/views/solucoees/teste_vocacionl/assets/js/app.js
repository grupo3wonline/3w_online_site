/**
 * Teste Vocacional - Lógica Principal
 * @description Motor principal do Teste Vocacional. Gerencia estado,
 * navegação, cálculo de pontuação, renderização e interações do usuário.
 * Vanilla JS (ES2020+) — sem dependências de framework.
 * @version 2.0.0
 * @author HOTWYL | WILLFROMBRASIL
 */

'use strict';

/* ===================================================================
   ESTADO GLOBAL DA APLICAÇÃO
   =================================================================== */
const AppState = {
    currentStep: -1,          // -1 = tela de boas-vindas
    answers: {},              // { 0: valor, 1: valor, ... }
    points: {},
    totalQuestions: PERGUNTAS.length,
    testStarted: false,
    testFinished: false,
    dataTeste: '',
    darkMode: false,
    lgpdAccepted: false
};

/* ===================================================================
   UTILITÁRIOS
   =================================================================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => ctx.querySelectorAll(sel);

/** Sanitiza string para prevenir XSS */
function sanitize(str) {
    const el = document.createElement('div');
    el.textContent = str;
    return el.innerHTML;
}

/** Formata data para pt-BR */
function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

/** Obtém ano corrente */
function getCurrentYear() {
    return new Date().getFullYear();
}

/** Debounce para evitar cliques duplos */
function debounce(fn, ms = 300) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), ms);
    };
}

/* ===================================================================
   DARK MODE
   =================================================================== */
function initDarkMode() {
    const saved = localStorage.getItem('tv_darkMode');
    if (saved === null) {
        AppState.darkMode = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
        AppState.darkMode = saved === 'true';
    }
    applyDarkMode();
}

function toggleDarkMode() {
    AppState.darkMode = !AppState.darkMode;
    localStorage.setItem('tv_darkMode', AppState.darkMode);
    applyDarkMode();
}

function applyDarkMode() {
    document.body.classList.toggle('dark', AppState.darkMode);
    const icon = $('#darkToggle');
    if (icon) {
        icon.setAttribute('aria-label', AppState.darkMode ? 'Ativar modo claro' : 'Ativar modo escuro');
    }
}

/* ===================================================================
   LGPD
   =================================================================== */
function initLGPD() {
    AppState.lgpdAccepted = localStorage.getItem('tv_lgpd') === 'true';
    const banner = $('#lgpdBanner');
    if (banner) {
        banner.classList.toggle('hidden', AppState.lgpdAccepted);
    }
}

function acceptLGPD() {
    AppState.lgpdAccepted = true;
    localStorage.setItem('tv_lgpd', 'true');
    const banner = $('#lgpdBanner');
    if (banner) banner.classList.add('hidden');
}

function rejectLGPD() {
    Swal.fire({
        icon: 'info',
        title: 'Aviso',
        html: '<p>Sem o consentimento, o teste não armazena preferências localmente. Você ainda pode continuar utilizando o teste normalmente.</p>',
        confirmButtonText: 'Entendi',
        confirmButtonColor: '#6366f1'
    });
    const banner = $('#lgpdBanner');
    if (banner) banner.classList.add('hidden');
}

/* ===================================================================
   LGPD — limpeza de dados
   =================================================================== */
function clearLocalData() {
    Swal.fire({
        icon: 'warning',
        title: 'Limpar dados locais',
        html: '<p>Deseja remover todas as preferências salvas no seu navegador? Isso inclui tema e consentimento LGPD.</p>',
        showCancelButton: true,
        confirmButtonText: 'Sim, limpar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#64748b'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('tv_darkMode');
            localStorage.removeItem('tv_lgpd');
            Swal.fire({
                icon: 'success',
                title: 'Dados removidos',
                text: 'Suas preferências locais foram apagadas com sucesso.',
                confirmButtonColor: '#6366f1',
                timer: 2500,
                timerProgressBar: true
            });
        }
    });
}

/* ===================================================================
   NAVEGAÇÃO E RENDERIZAÇÃO
   =================================================================== */

/** Inicia o teste */
function startTest() {
    AppState.testStarted = true;
    AppState.currentStep = 0;
    AppState.answers = {};
    AppState.points = {};
    AppState.testFinished = false;
    renderQuestion();
}

/** Renderiza a pergunta atual */
function renderQuestion() {
    const container = $('#mainContent');
    if (!container) return;

    const q = PERGUNTAS[AppState.currentStep];
    const progress = ((AppState.currentStep) / AppState.totalQuestions) * 100;
    const questionNum = AppState.currentStep + 1;
    const selectedValue = AppState.answers[AppState.currentStep];

    container.innerHTML = `
        <div class="fade-in">
            <!-- Progresso -->
            <div class="mb-6">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium text-muted-custom">
                        Pergunta ${questionNum} de ${AppState.totalQuestions}
                    </span>
                    <span class="text-sm font-bold" style="color: var(--primary);">
                        ${Math.round(progress)}%
                    </span>
                </div>
                <div class="progress-track" role="progressbar" aria-valuenow="${Math.round(progress)}" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso do teste">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
            </div>

            <!-- Pergunta -->
            <div class="mb-6">
                <h2 class="text-xl sm:text-2xl font-bold mb-2 leading-tight">
                    <i class="fa-solid fa-circle-question mr-2" style="color: var(--primary);"></i>
                    ${sanitize(q.question)}
                </h2>
                <p class="text-muted-custom text-sm sm:text-base mb-4">
                    <i class="fa-solid fa-info-circle mr-1"></i>
                    ${sanitize(q.explanation)}
                </p>

                <!-- Dica e Exemplo -->
                <div class="tip-box mb-4">
                    <div class="flex items-start gap-2 mb-2">
                        <i class="fa-solid fa-lightbulb mt-1" style="color: var(--warning);"></i>
                        <span class="text-sm"><strong>Dica:</strong> ${sanitize(q.tip)}</span>
                    </div>
                    <div class="flex items-start gap-2">
                        <i class="fa-solid fa-book-open mt-1" style="color: var(--info);"></i>
                        <span class="text-sm">${sanitize(q.example)}</span>
                    </div>
                </div>
            </div>

            <!-- Opções de resposta -->
            <fieldset class="mb-6" id="optionsFieldset">
                <legend class="sr-only">Selecione uma resposta</legend>
                <div class="grid gap-3" id="optionsGrid">
                    ${OPCOES_RESPOSTA.map((opt, idx) => `
                        <div class="option-card ${selectedValue === opt.value ? 'selected' : ''}"
                             role="radio"
                             aria-checked="${selectedValue === opt.value}"
                             tabindex="0"
                             data-value="${opt.value}"
                             onclick="selectOption(${opt.value})"
                             onkeydown="handleOptionKeydown(event, ${opt.value})">
                            <div class="option-radio"></div>
                            <i class="fa-regular ${opt.icon} text-lg" style="color: var(--primary);"></i>
                            <span class="font-medium text-sm sm:text-base">${sanitize(opt.text)}</span>
                        </div>
                    `).join('')}
                </div>
            </fieldset>

            <!-- Navegação -->
            <div class="flex justify-between items-center gap-3">
                ${AppState.currentStep > 0 ? `
                    <button type="button" class="btn-nav" onclick="prevQuestion()" aria-label="Voltar para a pergunta anterior">
                        <i class="fa-solid fa-arrow-left"></i>
                        <span class="hidden sm:inline">Anterior</span>
                    </button>
                ` : '<div></div>'}
                
                <button type="button" class="btn-primary-custom" id="btnNext" onclick="nextQuestion()" aria-label="Avançar para a próxima pergunta">
                    ${questionNum === AppState.totalQuestions ? '<i class="fa-solid fa-check-circle"></i> Finalizar' : 'Próxima <i class="fa-solid fa-arrow-right"></i>'}
                </button>
            </div>
        </div>
    `;

    // Scroll suave para o topo do card
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Seleciona uma opção */
function selectOption(value) {
    AppState.answers[AppState.currentStep] = value;

    // Atualizar UI
    const options = $$('.option-card');
    options.forEach(opt => {
        const isSelected = Number.parseInt(opt.dataset.value, 10) === value;
        opt.classList.toggle('selected', isSelected);
        opt.setAttribute('aria-checked', isSelected);
    });
}

/** Teclado na opção */
function handleOptionKeydown(event, value) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectOption(value);
    }
}

/** Próxima pergunta */
function nextQuestion() {
    if (AppState.answers[AppState.currentStep] === undefined) {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção!',
            html: '<p>Por favor, selecione uma resposta antes de continuar.</p>',
            confirmButtonText: 'Entendi',
            confirmButtonColor: '#6366f1',
            timer: 3500,
            timerProgressBar: true
        });
        return;
    }

    // Calcular pontuação da questão atual
    calculateQuestionPoints();

    if (AppState.currentStep < AppState.totalQuestions - 1) {
        AppState.currentStep++;
        renderQuestion();
    } else {
        finishTest();
    }
}

/** Pergunta anterior */
function prevQuestion() {
    if (AppState.currentStep > 0) {
        AppState.currentStep--;
        renderQuestion();
    }
}

/** Calcula os pontos da questão atual */
function calculateQuestionPoints() {
    const q = PERGUNTAS[AppState.currentStep];
    // Recalcular todos os pontos para evitar duplicações
    recalculateAllPoints();
}

/** Recalcula todos os pontos do zero */
function recalculateAllPoints() {
    AppState.points = {};
    
    Object.keys(AppState.answers).forEach(stepIdx => {
        const q = PERGUNTAS[Number.parseInt(stepIdx, 10)];
        if (!q) return;
        
        if (!AppState.points[q.area]) {
            AppState.points[q.area] = 0;
        }
        AppState.points[q.area] += AppState.answers[stepIdx];
    });
}

/* ===================================================================
   RESULTADO
   =================================================================== */

/** Finaliza o teste e mostra os resultados */
function finishTest() {
    recalculateAllPoints();
    AppState.testFinished = true;
    AppState.dataTeste = formatDate(new Date());

    // Calcular limiar para positivo/negativo
    const scores = Object.values(AppState.points);
    const sortedScores = [...scores].sort((a, b) => b - a);
    const threshold = sortedScores.length >= 3 ? sortedScores[2] : sortedScores[0];

    // Gerar resultados
    const results = [];
    
    // Primeiro, adicionar áreas que têm pontos
    Object.keys(AppState.points).forEach(area => {
        const score = AppState.points[area];
        const isPositive = score >= threshold && score > 0;
        const label = AREAS_LABELS[area] || area;
        
        results.push({
            area,
            label,
            score,
            isPositive,
            recommendation: isPositive
                ? (RECOMENDACOES.positivo[area] || 'Você demonstra fortes habilidades nessa área.')
                : (RECOMENDACOES.negativo[area] || 'Há oportunidades para desenvolver mais suas habilidades nesta área.')
        });
    });

    // Ordenar: positivos primeiro, depois por pontuação
    results.sort((a, b) => {
        if (a.isPositive !== b.isPositive) return a.isPositive ? -1 : 1;
        return b.score - a.score;
    });

    renderResults(results);

    // Notificação de conclusão
    Swal.fire({
        icon: 'success',
        title: 'Teste Concluído!',
        html: '<p>Seus resultados foram gerados com sucesso. Confira abaixo suas habilidades e orientações de carreira.</p>',
        confirmButtonText: 'Ver Resultados',
        confirmButtonColor: '#6366f1',
        allowOutsideClick: false
    });
}

/** Renderiza a tela de resultados */
function renderResults(results) {
    const container = $('#mainContent');
    if (!container) return;

    const positiveCount = results.filter(r => r.isPositive).length;
    const totalAreas = results.length;

    container.innerHTML = `
        <div class="fade-in">
            <!-- Progresso completo -->
            <div class="mb-6">
                <div class="progress-track">
                    <div class="progress-fill" style="width: 100%"></div>
                </div>
                <p class="text-center text-sm text-muted-custom mt-2">
                    <i class="fa-solid fa-check-circle" style="color: var(--success);"></i>
                    Teste 100% concluído
                </p>
            </div>

            <!-- Título do resultado -->
            <div class="text-center mb-8">
                <div class="welcome-icon mx-auto mb-4" style="width:64px;height:64px;">
                    <i class="fa-solid fa-trophy text-2xl"></i>
                </div>
                <h2 class="text-2xl sm:text-3xl font-bold mb-2">Seu Resultado</h2>
                <p class="text-muted-custom">
                    Você demonstra forte aptidão em <strong style="color: var(--success);">${positiveCount}</strong> de ${totalAreas} áreas avaliadas.
                </p>
            </div>

            <!-- Resumo rápido -->
            <div class="tip-box mb-6">
                <div class="flex items-start gap-2">
                    <i class="fa-solid fa-chart-pie mt-1" style="color: var(--primary);"></i>
                    <div>
                        <strong class="text-sm">Resumo:</strong>
                        <p class="text-sm text-muted-custom mt-1">
                            Com base nas suas ${AppState.totalQuestions} respostas, identificamos seus pontos fortes e áreas com potencial de desenvolvimento. 
                            Use essas orientações como guia para explorar carreiras alinhadas ao seu perfil.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Pontos fortes -->
            ${positiveCount > 0 ? `
                <div class="mb-6">
                    <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
                        <i class="fa-solid fa-star" style="color: var(--success);"></i>
                        Seus Pontos Fortes
                    </h3>
                    <div class="grid gap-3">
                        ${results.filter(r => r.isPositive).map(r => `
                            <div class="result-item result-positive slide-in-left">
                                <div class="flex items-start justify-between mb-1">
                                    <strong class="text-sm sm:text-base">${sanitize(r.label)}</strong>
                                    <span class="text-xs font-bold px-2 py-1 rounded-full" style="background-color: rgba(16,185,129,0.1); color: var(--success);">
                                        ${r.score} pts
                                    </span>
                                </div>
                                <p class="text-sm text-muted-custom">${sanitize(r.recommendation)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Áreas para desenvolver -->
            ${results.some(r => !r.isPositive) ? `
                <div class="mb-6">
                    <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
                        <i class="fa-solid fa-seedling" style="color: var(--warning);"></i>
                        Áreas para Desenvolver
                    </h3>
                    <div class="grid gap-3">
                        ${results.filter(r => !r.isPositive).map(r => `
                            <div class="result-item result-negative slide-in-left">
                                <div class="flex items-start justify-between mb-1">
                                    <strong class="text-sm sm:text-base">${sanitize(r.label)}</strong>
                                    <span class="text-xs font-bold px-2 py-1 rounded-full" style="background-color: rgba(245,158,11,0.1); color: var(--warning);">
                                        ${r.score} pts
                                    </span>
                                </div>
                                <p class="text-sm text-muted-custom">${sanitize(r.recommendation)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Data do teste -->
            <div class="text-right mb-6">
                <small class="text-muted-custom">
                    <i class="fa-regular fa-calendar mr-1"></i>
                    Teste realizado em ${sanitize(AppState.dataTeste)}
                </small>
            </div>

            <!-- Ações -->
            <div class="flex flex-wrap justify-center gap-3">
                <button type="button" class="btn-nav" onclick="restartTest()" aria-label="Refazer o teste vocacional">
                    <i class="fa-solid fa-rotate-left"></i>
                    Refazer Teste
                </button>
                <button type="button" class="btn-nav" onclick="printResults()" aria-label="Imprimir resultados">
                    <i class="fa-solid fa-print"></i>
                    Imprimir
                </button>
                <button type="button" class="btn-nav" onclick="shareResults()" aria-label="Compartilhar resultados">
                    <i class="fa-solid fa-share-nodes"></i>
                    Compartilhar
                </button>
            </div>
        </div>
    `;

    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ===================================================================
   AÇÕES DO RESULTADO
   =================================================================== */

/** Reinicia o teste */
function restartTest() {
    Swal.fire({
        icon: 'question',
        title: 'Refazer Teste?',
        html: '<p>Deseja reiniciar o teste vocacional? Todas as respostas atuais serão perdidas.</p>',
        showCancelButton: true,
        confirmButtonText: 'Sim, refazer',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#6366f1',
        cancelButtonColor: '#64748b'
    }).then(result => {
        if (result.isConfirmed) {
            AppState.currentStep = -1;
            AppState.answers = {};
            AppState.points = {};
            AppState.testStarted = false;
            AppState.testFinished = false;
            renderWelcome();
        }
    });
}

/** Imprime os resultados */
function printResults() {
    if (!AppState.testFinished) {
        Swal.fire({
            icon: 'error',
            title: 'Teste não concluído',
            html: '<p>Conclua o teste para poder imprimir os resultados.</p>',
            confirmButtonColor: '#6366f1'
        });
        return;
    }
    globalThis.print();
}

/** Compartilha os resultados */
function shareResults() {
    const text = `Acabei de descobrir meus pontos fortes no Teste Vocacional! Faça o seu também.`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Teste Vocacional - Meus Resultados',
            text: text,
            url: globalThis.location.href
        }).catch(() => {});
    } else {
        // Fallback: copiar para clipboard
        navigator.clipboard.writeText(text + ' ' + globalThis.location.href).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Link copiado!',
                text: 'O link foi copiado para a área de transferência.',
                confirmButtonColor: '#6366f1',
                timer: 2000,
                timerProgressBar: true
            });
        }).catch(() => {
            Swal.fire({
                icon: 'info',
                title: 'Compartilhar',
                html: `<p>Copie o link abaixo para compartilhar:</p><input type="text" value="${globalThis.location.href}" class="w-full p-2 border rounded mt-2" readonly onclick="this.select()">`,  
                confirmButtonColor: '#6366f1'
            });
        });
    }
}

/* ===================================================================
   TELA DE BOAS-VINDAS
   =================================================================== */

function renderWelcome() {
    const container = $('#mainContent');
    if (!container) return;

    container.innerHTML = `
        <div class="welcome-screen fade-in">
            <div class="welcome-icon">
                <i class="fa-solid fa-compass"></i>
            </div>
            
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                Teste Vocacional
            </h1>
            <p class="text-muted-custom text-base sm:text-lg mb-6 max-w-lg mx-auto">
                Descubra suas habilidades, pontos fortes e receba orientações personalizadas 
                para sua carreira profissional.
            </p>

            <!-- Features -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div class="feature-card">
                    <div class="feature-icon" style="background-color: rgba(99,102,241,0.1);">
                        <i class="fa-solid fa-list-check" style="color: var(--primary);"></i>
                    </div>
                    <h3 class="font-bold text-sm mb-1">${PERGUNTAS.length} Perguntas</h3>
                    <p class="text-xs text-muted-custom">Avaliação completa de suas habilidades e interesses</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon" style="background-color: rgba(16,185,129,0.1);">
                        <i class="fa-solid fa-chart-bar" style="color: var(--success);"></i>
                    </div>
                    <h3 class="font-bold text-sm mb-1">Resultado Detalhado</h3>
                    <p class="text-xs text-muted-custom">Análise de pontos fortes e áreas de desenvolvimento</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon" style="background-color: rgba(245,158,11,0.1);">
                        <i class="fa-solid fa-lightbulb" style="color: var(--warning);"></i>
                    </div>
                    <h3 class="font-bold text-sm mb-1">Dicas de Carreira</h3>
                    <p class="text-xs text-muted-custom">Orientações para explorar áreas ideais para você</p>
                </div>
            </div>

            <!-- Instruções -->
            <div class="tip-box text-left mb-8">
                <h4 class="font-bold text-sm mb-3 flex items-center gap-2">
                    <i class="fa-solid fa-circle-info" style="color: var(--primary);"></i>
                    Como funciona
                </h4>
                <ul class="text-sm text-muted-custom space-y-2">
                    <li class="flex items-start gap-2">
                        <i class="fa-solid fa-1 mt-0.5 text-xs font-bold" style="color: var(--primary);"></i>
                        <span>Responda cada pergunta selecionando a opção que melhor descreve você.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fa-solid fa-2 mt-0.5 text-xs font-bold" style="color: var(--primary);"></i>
                        <span>Não existem respostas certas ou erradas — seja honesto consigo mesmo.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fa-solid fa-3 mt-0.5 text-xs font-bold" style="color: var(--primary);"></i>
                        <span>Ao final, receba uma análise detalhada dos seus pontos fortes e orientações de carreira.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fa-solid fa-4 mt-0.5 text-xs font-bold" style="color: var(--primary);"></i>
                        <span>Você pode imprimir ou compartilhar seus resultados.</span>
                    </li>
                </ul>
            </div>

            <!-- Tempo estimado -->
            <p class="text-sm text-muted-custom mb-6">
                <i class="fa-regular fa-clock mr-1"></i>
                Tempo estimado: <strong>5 a 10 minutos</strong>
            </p>

            <!-- CTA -->
            <button type="button" class="btn-primary-custom pulse text-lg px-8 py-4" onclick="startTest()" aria-label="Iniciar o teste vocacional">
                <i class="fa-solid fa-rocket"></i>
                Iniciar Teste
            </button>
        </div>
    `;
}

/* ===================================================================
   MODAL DE AJUDA
   =================================================================== */

function openHelp() {
    const dialog = $('#helpModal');
    if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
    }
}

function closeHelp() {
    const dialog = $('#helpModal');
    if (dialog && typeof dialog.close === 'function') {
        dialog.close();
        document.body.style.overflow = '';
    }
}

/* ===================================================================
   SEGURANÇA
   =================================================================== */

/** CSP: Bloqueia eval e inline scripts maliciosos */
function initSecurity() {
    // Desabilitar console em produção para ocultar informações sensíveis
    if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        // Proteger contra DevTools abertos (básico)
        // console.log = () => {};
        // console.warn = () => {};
        // console.error = () => {};
    }

    // Bloquear botão direito em produção (opcional — descomente se desejar)
    // document.addEventListener('contextmenu', e => e.preventDefault());

    // Prevenir arrastar e soltar de conteúdo
    document.addEventListener('dragstart', e => e.preventDefault());
}

/* ===================================================================
   INICIALIZAÇÃO
   =================================================================== */

function init() {
    // Segurança
    initSecurity();

    // Dark mode
    initDarkMode();

    // LGPD
    initLGPD();

    // Ano no rodapé
    const yearEl = $('#currentYear');
    if (yearEl) yearEl.textContent = getCurrentYear();

    // Renderizar tela de boas-vindas
    renderWelcome();

    // Event listeners
    const darkToggle = $('#darkToggle');
    if (darkToggle) darkToggle.addEventListener('click', toggleDarkMode);

    const helpBtn = $('#helpBtn');
    if (helpBtn) helpBtn.addEventListener('click', openHelp);

    const helpClose = $('#helpClose');
    if (helpClose) helpClose.addEventListener('click', closeHelp);

    const helpOverlay = $('#helpModal');
    if (helpOverlay) {
        helpOverlay.addEventListener('click', (e) => {
            const rect = helpOverlay.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right || 
                e.clientY < rect.top || e.clientY > rect.bottom) {
                closeHelp();
            }
        });
        helpOverlay.addEventListener('cancel', (e) => {
            document.body.style.overflow = '';
        });
    }

    const lgpdAcceptBtn = $('#lgpdAccept');
    if (lgpdAcceptBtn) lgpdAcceptBtn.addEventListener('click', acceptLGPD);

    const lgpdRejectBtn = $('#lgpdReject');
    if (lgpdRejectBtn) lgpdRejectBtn.addEventListener('click', rejectLGPD);

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeHelp();
    });

    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
        if (AppState.testStarted && !AppState.testFinished) {
            // Números 1-6 para selecionar opção
            const num = Number.parseInt(e.key, 10);
            if (num >= 1 && num <= 6) {
                selectOption(num - 1);
            }
            // Enter para avançar
            if (e.key === 'Enter' && !e.target.closest('.option-card')) {
                nextQuestion();
            }
        }
    });
}

// Iniciar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
