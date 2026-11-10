import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'

export interface PlaygroundState {
  html: string
  css: string
  js: string
  php: string
}

const DEFAULTS: PlaygroundState = {
  html: `<div class="container">
  <h1>Bem-vindo ao DevPlayground</h1>
  <p>Comece a codificar e veja os resultados ao vivo!</p>
  <button id="btn">Clique aqui</button>
</div>`,
  css: `.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  font-family: system-ui, sans-serif;
  text-align: center;
}
h1 { color: #7c3aed; margin-bottom: 20px; }
button {
  background: #7c3aed; color: #fff; border: none;
  padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 16px;
}
button:hover { background: #6d28d9; }`,
  js: `document.getElementById('btn').addEventListener('click', () => {
  console.log('Olá do DevPlayground!');
  alert('Olá do DevPlayground!');
});`,
  php: `<?php
echo "Olá do PHP!\\n";
$numeros = [1, 2, 3, 4, 5];
foreach ($numeros as $num) {
  echo $num . " ";
}
`,
}

/** Codifica o estado para compartilhamento via URL (base64 seguro para URL). */
export function encodeState(state: PlaygroundState): string {
  const json = JSON.stringify(state)
  return btoa(unescape(encodeURIComponent(json)))
}

export function decodeState(encoded: string): PlaygroundState | null {
  try {
    const json = decodeURIComponent(escape(atob(encoded)))
    const parsed = JSON.parse(json)
    if (typeof parsed.html === 'string' && typeof parsed.css === 'string') {
      return { html: parsed.html, css: parsed.css, js: parsed.js ?? '', php: parsed.php ?? '' }
    }
  } catch {
    // ignora payload inválido
  }
  return null
}

/**
 * Estado do playground com auto-save no localStorage.
 * Se houver `?code=` na URL, importa esse estado na inicialização.
 */
export function usePlayground() {
  const html = useStorage('dp-code-html', DEFAULTS.html)
  const css = useStorage('dp-code-css', DEFAULTS.css)
  const js = useStorage('dp-code-js', DEFAULTS.js)
  const php = useStorage('dp-code-php', DEFAULTS.php)
  const savedAt = ref<number | null>(null)

  // Importa estado compartilhado por URL, se existir
  const params = new URLSearchParams(window.location.search)
  const shared = params.get('code')
  if (shared) {
    const decoded = decodeState(shared)
    if (decoded) {
      html.value = decoded.html
      css.value = decoded.css
      js.value = decoded.js
      php.value = decoded.php
    }
  }

  // Marca o horário de salvamento sempre que algo muda
  watch([html, css, js, php], () => {
    savedAt.value = Date.now()
  })

  function reset() {
    html.value = DEFAULTS.html
    css.value = DEFAULTS.css
    js.value = DEFAULTS.js
    php.value = DEFAULTS.php
  }

  function clearAll() {
    html.value = ''
    css.value = ''
    js.value = ''
    php.value = ''
  }

  function shareUrl(): string {
    const encoded = encodeState({ html: html.value, css: css.value, js: js.value, php: php.value })
    const base = `${window.location.origin}${window.location.pathname}`
    return `${base}?code=${encoded}`
  }

  return { html, css, js, php, savedAt, reset, clearAll, shareUrl, DEFAULTS }
}
