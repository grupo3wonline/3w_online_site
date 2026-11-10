<template>
  <div class="flex flex-col h-screen overflow-hidden bg-gray-900 text-white font-sans">
    <!-- App Navbar -->
    <nav class="bg-gray-800 border-b border-gray-700 h-16 flex items-center justify-between px-4 shrink-0 z-20 shadow-lg">
      <div class="flex items-center gap-3">
        <router-link to="/" class="flex items-center gap-3 group">
          <div class="bg-gradient-to-br from-indigo-500 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
             <i class="fas fa-code text-white text-sm"></i>
          </div>
          <div>
            <h1 class="font-bold text-lg tracking-tight group-hover:text-purple-400 transition-colors">CodeMaster <span class="text-xs text-purple-400 font-normal border border-purple-500/50 rounded px-1 ml-1 bg-purple-900/20">Studio</span></h1>
            <p class="text-[10px] text-gray-400 uppercase tracking-wider hidden sm:block">HTML • CSS • JS • PHP</p>
          </div>
        </router-link>
      </div>

      <div class="flex items-center gap-2 sm:gap-3">
        <button @click="runCode" class="group bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 shadow-md hover:shadow-green-500/20" title="Executar código (Ctrl+Enter)">
          <i class="fas fa-play text-xs group-hover:scale-110 transition-transform"></i> <span class="hidden sm:inline">Executar</span>
        </button>
        
        <button @click="saveToLocal" class="bg-gray-700 hover:bg-gray-600 p-2 rounded-md text-gray-300 transition-colors" title="Salvar no Navegador">
          <i class="fas fa-save"></i>
        </button>

        <button @click="downloadCode" class="bg-gray-700 hover:bg-gray-600 p-2 rounded-md text-gray-300 transition-colors" title="Baixar projeto (.html)">
          <i class="fas fa-download"></i>
        </button>

        <button @click="showHelp" class="bg-blue-600 hover:bg-blue-500 p-2 rounded-md text-white transition-colors animate-pulse" title="Ajuda e Dicas">
          <i class="fas fa-question-circle"></i>
        </button>
      </div>
    </nav>

    <!-- Main Workspace -->
    <main class="flex-1 flex flex-col md:flex-row overflow-hidden relative">
      <!-- Mobile Tabs -->
      <div class="md:hidden flex bg-gray-800 border-b border-gray-700 shrink-0 overflow-x-auto">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          class="flex-1 min-w-[60px] py-3 text-xs font-medium border-b-2 transition-colors"
          :class="[
            activeTab === tab.id ? tab.activeClass : 'border-transparent text-gray-400 hover:bg-gray-700/50'
          ]">
          <span v-if="tab.id !== 'result'">{{ tab.label }}</span>
          <i v-else class="fas fa-eye"></i>
        </button>
      </div>

      <!-- Editors Container -->
      <div class="flex-1 flex flex-col md:w-1/3 md:border-r border-gray-700 bg-editor-bg transition-all duration-300"
          :class="{ 'hidden': activeTab === 'result' && isMobile }">
        
        <!-- HTML Editor -->
        <div class="flex-1 flex flex-col min-h-0 border-b border-gray-700 md:h-1/4 relative group" :class="{ 'hidden': isMobile && activeTab !== 'html' }">
          <div class="flex justify-between items-center bg-gray-800 px-3 py-1 text-xs select-none border-t border-gray-700 md:border-t-0">
            <span class="flex items-center gap-2 text-gray-400 font-bold"><i class="fab fa-html5 text-orange-500"></i> HTML</span>
             <button @click="copyCode(htmlCode)" class="text-gray-500 hover:text-white" title="Copiar"><i class="far fa-copy"></i></button>
          </div>
          <textarea v-model="htmlCode" class="code-input" spellcheck="false" placeholder="<!-- HTML -->"></textarea>
        </div>

        <!-- CSS Editor -->
        <div class="flex-1 flex flex-col min-h-0 border-b border-gray-700 md:h-1/4 relative group" :class="{ 'hidden': isMobile && activeTab !== 'css' }">
           <div class="flex justify-between items-center bg-gray-800 px-3 py-1 text-xs select-none border-t border-gray-700 md:border-t-0">
            <span class="flex items-center gap-2 text-gray-400 font-bold"><i class="fab fa-css3-alt text-blue-500"></i> CSS</span>
             <button @click="copyCode(cssCode)" class="text-gray-500 hover:text-white" title="Copiar"><i class="far fa-copy"></i></button>
          </div>
          <textarea v-model="cssCode" class="code-input" spellcheck="false" placeholder="/* CSS */"></textarea>
        </div>

        <!-- JS Editor -->
        <div class="flex-1 flex flex-col min-h-0 border-b border-gray-700 md:h-1/4 relative group" :class="{ 'hidden': isMobile && activeTab !== 'js' }">
           <div class="flex justify-between items-center bg-gray-800 px-3 py-1 text-xs select-none border-t border-gray-700 md:border-t-0">
            <span class="flex items-center gap-2 text-gray-400 font-bold"><i class="fab fa-js text-yellow-500"></i> JS</span>
             <button @click="copyCode(jsCode)" class="text-gray-500 hover:text-white" title="Copiar"><i class="far fa-copy"></i></button>
          </div>
          <textarea v-model="jsCode" class="code-input" spellcheck="false" placeholder="// JavaScript"></textarea>
        </div>

        <!-- PHP Editor -->
        <div class="flex-1 flex flex-col min-h-0 md:h-1/4 relative group" :class="{ 'hidden': isMobile && activeTab !== 'php' }">
           <div class="flex justify-between items-center bg-gray-800 px-3 py-1 text-xs select-none border-t border-gray-700 md:border-t-0">
            <span class="flex items-center gap-2 text-gray-400 font-bold"><i class="fab fa-php text-purple-500"></i> PHP (Simulado)</span>
             <button @click="copyCode(phpCode)" class="text-gray-500 hover:text-white" title="Copiar"><i class="far fa-copy"></i></button>
          </div>
          <textarea v-model="phpCode" class="code-input" spellcheck="false" placeholder="&lt;?php // PHP ?&gt;"></textarea>
        </div>
      </div>

      <!-- Preview -->
      <div class="flex-1 bg-white relative flex flex-col h-full w-full" 
           :class="{ 'hidden': isMobile && activeTab !== 'result', 'flex': !isMobile || activeTab === 'result' }">
         <div class="bg-gray-100 border-b border-gray-300 px-3 py-2 flex justify-between items-center h-10 shrink-0">
            <span class="text-gray-600 text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                <i class="fas fa-desktop"></i> Resultado / Preview
            </span>
             <span class="text-gray-400 text-[10px]">Auto-refresh: 800ms</span>
        </div>
        <iframe ref="previewFrame" class="w-full h-full bg-white border-none" sandbox="allow-scripts allow-modals allow-same-origin"></iframe>
        
        <!-- Loading -->
        <div v-if="isLoading" class="absolute inset-0 bg-white/80 z-50 flex items-center justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-500 text-[10px] py-1 px-4 flex justify-between items-center border-t border-gray-700 shrink-0">
       <div class="flex gap-4">
        <span>&copy; 2026 CodeMaster v3.0</span>
        <router-link to="/sobre" class="hover:text-gray-300">Sobre</router-link>
        <router-link to="/contato" class="hover:text-gray-300">Contato</router-link>
        <router-link to="/politica-privacidade" class="hover:text-gray-300">Privacidade</router-link>
       </div>
       <div class="flex gap-4">
          <span class="hidden sm:inline">Desenvolvido por <a href="https://www.3wonline.com.br" target="_blank" class="hover:text-purple-400">Grupo 3w Online</a></span>
          <span><i class="fas fa-check-circle text-green-500"></i> PHP Simulator Active</span>
       </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import Swal from 'sweetalert2';

// --- State ---
const htmlCode = ref('');
const cssCode = ref('');
const jsCode = ref('');
const phpCode = ref('');
const activeTab = ref('html');
const isLoading = ref(false);
const previewFrame = ref(null);
const isMobile = ref(false);

const tabs = [
    { id: 'html', label: 'HTML', activeClass: 'border-orange-500 text-orange-400 bg-gray-700/50' },
    { id: 'css', label: 'CSS', activeClass: 'border-blue-500 text-blue-400 bg-gray-700/50' },
    { id: 'js', label: 'JS', activeClass: 'border-yellow-500 text-yellow-400 bg-gray-700/50' },
    { id: 'php', label: 'PHP', activeClass: 'border-purple-500 text-purple-400 bg-gray-700/50' },
    { id: 'result', label: 'Result', activeClass: 'border-white text-white bg-gray-700/50' }
];

// --- Default Content ---
const defaultHTML = `<!-- HTML Principal -->
<div class="container">
  <h1>CodeMaster Studio</h1>
  <p>Comece a editar agora mesmo.</p>
</div>`;
const defaultCSS = `body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  color: #334155;
  padding: 2rem;
}
.container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}
h1 { color: #7c3aed; }
.php-output {
  background: #f3e8ff;
  border-left: 4px solid #7c3aed;
  padding: 1rem;
  margin-top: 1rem;
  font-family: monospace;
}`;
const defaultJS = `console.log("Ready");`;
const defaultPHP = `<?php
$msg = "Suporte a PHP Simulado!";
echo "<div class='php-output'>";
echo "$msg";
echo "</div>";
?>`;

// --- PHP Transpiler (Ported) ---
const transpilePHP = (code) => {
    let output = code;
    // Simple regex parser logic from original
    let variables = {};
    const varRegex = /\$([a-zA-Z0-9_]+)\s*=\s*(["'])(.*?)\2;|^\$([a-zA-Z0-9_]+)\s*=\s*([0-9.]+);/gm;
    let match;
    while ((match = varRegex.exec(output)) !== null) {
        if (match[3] !== undefined) variables[match[1]] = match[3];
        if (match[5] !== undefined) variables[match[4]] = match[5];
    }
    output = output.replace(varRegex, '');
    output = output.replace(/echo\s*(["'])(.*?)\1;/g, '$2');
    for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`\\$${key}`, 'g');
        output = output.replace(regex, value);
    }
    output = output.replace(/<\?php/g, '').replace(/\?>/g, '');
    return output;
};

// --- Logic ---
const updatePreview = () => {
    if (!previewFrame.value) return;
    
    let phpResult = "";
    try {
        phpResult = transpilePHP(phpCode.value);
    } catch (e) {
        phpResult = "<!-- PHP Error -->";
    }

    const source = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${cssCode.value}</style>
        </head>
        <body>
            ${htmlCode.value}
            ${phpResult}
            <script>${jsCode.value}<\/script>
        </body>
        </html>
    `;
    
    const doc = previewFrame.value.contentWindow.document;
    doc.open();
    doc.write(source);
    doc.close();

    // Persist
    localStorage.setItem('cm_html', htmlCode.value);
    localStorage.setItem('cm_css', cssCode.value);
    localStorage.setItem('cm_js', jsCode.value);
    localStorage.setItem('cm_php', phpCode.value);
};

const runCode = () => {
    isLoading.value = true;
    setTimeout(() => {
        updatePreview();
        isLoading.value = false;
        
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Executado',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
        });
    }, 300);
};

// Debounce
let timeout;
const debouncedUpdate = () => {
    clearTimeout(timeout);
    timeout = setTimeout(updatePreview, 800);
};

watch([htmlCode, cssCode, jsCode, phpCode], () => {
    debouncedUpdate();
});

const saveToLocal = () => {
    localStorage.setItem('cm_html', htmlCode.value);
    localStorage.setItem('cm_css', cssCode.value);
    localStorage.setItem('cm_js', jsCode.value);
    localStorage.setItem('cm_php', phpCode.value);
    Swal.fire({
        icon: 'success',
        title: 'Salvo!',
        text: 'Seu código foi salvo no navegador.',
        background: '#1f2937', // Dark theme for sweetalert to match app
        color: '#fff',
        confirmButtonColor: '#7c3aed'
    });
};

const downloadCode = () => {
    const phpResult = transpilePHP(phpCode.value); // For download we might want static result or raw PHP? 
    // Original behavior: include raw PHP in comments and static result in body for valid HTML
    const content = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Projeto CodeMaster</title>
    <style>${cssCode.value}</style>
</head>
<body>
    ${htmlCode.value}
    <!-- PHP Output -->
    ${phpResult}
    <!-- Raw PHP Source -->
    <!-- 
    ${phpCode.value.replace(/-->/g, '-- >')} 
    -->
    <script>${jsCode.value}<\/script>
</body>
</html>`;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projeto-codemaster.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const copyCode = (text) => {
    navigator.clipboard.writeText(text).then(() => {
         Swal.fire({
            toast: true,
            position: 'top',
            icon: 'success',
            title: 'Copiado!',
            showConfirmButton: false,
            timer: 1000,
            background: '#374151',
            color: '#fff'
        });
    });
};

const showHelp = () => {
    Swal.fire({
        title: '<strong style="color:#7c3aed">Dicas CodeMaster</strong>',
        html: `
            <div class="text-left text-sm space-y-2 text-gray-300">
                <p>Use <strong>Ctrl + Enter</strong> para executar forçadamente.</p>
                <p>O PHP é simulado via JavaScript. Suporta:</p>
                <ul class="list-disc pl-5">
                    <li>Variables: <code>$var = "val";</code></li>
                    <li>Echo: <code>echo "text";</code></li>
                    <li>Variables in string: <code>"Hello $name"</code></li>
                </ul>
            </div>
        `,
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#7c3aed'
    });
};

onMounted(() => {
    // Load
    htmlCode.value = localStorage.getItem('cm_html') || defaultHTML;
    cssCode.value = localStorage.getItem('cm_css') || defaultCSS;
    jsCode.value = localStorage.getItem('cm_js') || defaultJS;
    phpCode.value = localStorage.getItem('cm_php') || defaultPHP;

    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768; // Tailwind md breakpoint
    });
    isMobile.value = window.innerWidth < 768;

    nextTick(updatePreview);

    // Ctrl+Enter
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
    });
});
</script>

<style scoped>
/* Specific overrides if needed */
</style>
